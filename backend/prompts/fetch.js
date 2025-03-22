import Groq from "groq-sdk";
import prisma from "../db/db.config.js";
const groq = new Groq();

export const postPrompt = async(req,res)=> {

  const { userPrompt } = req.body;

  // Set headers for Server-Sent Events (SSE)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let fullResponse = '';

  try {
    const stream = await getGroqChatStream(userPrompt);
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;

      // Send the chunk to the client as SSE data
      res.write(`data: ${JSON.stringify({ content })}\n\n`);

    const response =  await prisma.conversation.create({
      data:{
        prompt: userPrompt,
        response: fullResponse,
      }
    })

    if(response.length>0){
    return  res.status(200).json(response);
    }
    
  }
  } catch (error) {
    return res.status(500).json("Error in postprompt",error.messages);
  }
}

export async function getGroqChatStream(userPrompt) {
  return groq.chat.completions.create({
    //
    // Required parameters
    //
    messages: [
      // Set an optional system message. This sets the behavior of the
      // assistant and can be used to provide specific instructions for
      // how it should behave throughout the conversation.
      {
         role: "system",
        content: "You are a helpful legal advisor with expert knowledge of Indian law. Provide accurate and clear explanations regarding Indian legal provisions, regulations, and procedures. Always include a disclaimer that your advice is for informational purposes only and does not substitute for professional legal counsel."
      },
      // Set a user message for the assistant to respond to.
      {
        role: "user",
        content: `${userPrompt.trim()}`,
      },
    ],

    // The language model which will generate the completion.
    model: "llama-3.3-70b-versatile",

    //
    // Optional parameters
    //

    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0.5,

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_completion_tokens: 1024,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    stop: null,

    // If set, partial message deltas will be sent.
    stream: true,
  });
}


export const fetchData = async(req,res)=>{

  try {
    const chatRes = await prisma.conversation.findMany({
      where:{
        userId:req.user.id
      },
      select:{
        prompt:true,
        response:true
      }
    });

    if(chatRes.length === 0){
      return res.status(404).json([]);
    }

    res.status(200).json(chatRes);
  } catch (error) {
    console.error("error in fetchprompt:", error);
    res.status(500).json({
      error: "Failed to fetch chat history",
      details: error.message
    });
  }
}
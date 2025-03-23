import Groq from "groq-sdk";
import prisma from "../db/db.config.js";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const postPrompt = async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // ✅ Ensure user authentication
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    let fullResponse = '';

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        prompt: userPrompt,
        response: ''  // Initialize with empty response
      }
    });

    const conversationId = conversation.id;

    const stream = await getGroqChatStream(userPrompt);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;

      // ✅ Store response incrementally in DB
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { response: fullResponse }
      });
    }

    // ✅ Send the final response
    res.status(200).json({
      conversationId,
      prompt: userPrompt,
      response: fullResponse
    });

  } catch (error) {
    console.error('Error in postPrompt:', error.message);
    res.status(500).json({ error: 'Error in postPrompt' });
  }
};





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
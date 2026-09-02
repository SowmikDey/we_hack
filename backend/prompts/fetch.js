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
    messages: [
      {
        role: "system",
        content:
          "You are a helpful legal advisor with expert knowledge of Indian law. Provide accurate and clear explanations regarding Indian legal provisions, regulations, and procedures. Always include a disclaimer that your advice is for informational purposes only and does not substitute for professional legal counsel.If asked anything outside law field reply explicitly, Sorry I don't have answer regarding this question."
      },
      {
        role: "user",
        content: userPrompt.trim(),
      },
    ],

    model: "openai/gpt-oss-120b",

    temperature: 0.5,
    max_completion_tokens: 1024,
    top_p: 1,
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

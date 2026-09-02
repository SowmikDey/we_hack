import Groq from "groq-sdk";
import prisma from "../db/db.config.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// ======================================================
// POST PROMPT
// ======================================================

export const postPrompt = async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // ------------------------------------------
    // Validate user prompt
    // ------------------------------------------

    if (!userPrompt || typeof userPrompt !== "string" || !userPrompt.trim()) {
      return res.status(400).json({
        error: "User prompt is required",
      });
    }

    // ------------------------------------------
    // Ensure user authentication
    // ------------------------------------------

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: "User not authenticated",
      });
    }

    // ------------------------------------------
    // Create conversation in database
    // ------------------------------------------

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        prompt: userPrompt.trim(),
        response: "",
      },
    });

    const conversationId = conversation.id;

    let fullResponse = "";

    try {
      // ------------------------------------------
      // Get Groq streaming response
      // ------------------------------------------

      const stream = await getGroqChatStream(userPrompt);

      // ------------------------------------------
      // Read streaming response
      // ------------------------------------------

      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content || "";

        if (content) {
          fullResponse += content;
        }
      }

      // ------------------------------------------
      // Save final response to database
      // ------------------------------------------

      await prisma.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          response: fullResponse,
        },
      });

    } catch (groqError) {
      console.error(
        "Groq API Error:",
        groqError?.message || groqError
      );

      // Update DB with error information
      await prisma.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          response: "Unable to generate response.",
        },
      });

      return res.status(500).json({
        error: "Failed to generate AI response",
        details: groqError?.message || "Unknown Groq error",
      });
    }

    // ------------------------------------------
    // Send final response
    // ------------------------------------------

    return res.status(200).json({
      conversationId,
      prompt: userPrompt.trim(),
      response: fullResponse,
    });

  } catch (error) {
    console.error(
      "Error in postPrompt:",
      error?.message || error
    );

    return res.status(500).json({
      error: "Error in postPrompt",
      details: error?.message || "Unknown server error",
    });
  }
};


// ======================================================
// GROQ CHAT STREAM
// ======================================================

export async function getGroqChatStream(userPrompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a helpful legal advisor specializing in Indian law.

Your responsibilities:

1. Provide clear and accurate information about Indian laws,
   legal provisions, regulations, rights, procedures, and legal concepts.

2. Explain legal concepts in simple and understandable language.

3. When relevant, mention the applicable Indian laws, sections,
   acts, regulations, or legal procedures.

4. Do not invent laws, sections, court judgments, or legal provisions.
   If you are uncertain about a specific legal detail, clearly state
   that you are uncertain.

5. Your responses are for informational and educational purposes only
   and do not replace advice from a qualified lawyer.

6. Always include an appropriate disclaimer that the response is
   informational and does not substitute for professional legal counsel.

7. If the user asks something that is clearly unrelated to law,
   respond exactly with:
   "Sorry, I don't have an answer regarding this question as I am
   designed to assist with Indian legal matters."
        `.trim(),
      },

      {
        role: "user",
        content: userPrompt.trim(),
      },
    ],

    // ------------------------------------------
    // GROQ MODEL
    // ------------------------------------------

    model: "openai/gpt-oss-120b",

    // ------------------------------------------
    // Generation parameters
    // ------------------------------------------

    temperature: 0.5,

    // Increased because GPT-OSS is a reasoning model
    max_completion_tokens: 4096,

    top_p: 1,

    // Enable streaming
    stream: true,
  });
}


// ======================================================
// FETCH CHAT HISTORY
// ======================================================

export const fetchData = async (req, res) => {
  try {
    // ------------------------------------------
    // Ensure authentication
    // ------------------------------------------

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: "User not authenticated",
      });
    }

    // ------------------------------------------
    // Fetch user's conversations
    // ------------------------------------------

    const chatRes = await prisma.conversation.findMany({
      where: {
        userId: userId,
      },

      select: {
        prompt: true,
        response: true,
      },
    });

    // ------------------------------------------
    // No chat history
    // ------------------------------------------

    if (chatRes.length === 0) {
      return res.status(404).json([]);
    }

    // ------------------------------------------
    // Return chat history
    // ------------------------------------------

    return res.status(200).json(chatRes);

  } catch (error) {
    console.error(
      "Error in fetchData:",
      error?.message || error
    );

    return res.status(500).json({
      error: "Failed to fetch chat history",
      details: error?.message || "Unknown server error",
    });
  }
};

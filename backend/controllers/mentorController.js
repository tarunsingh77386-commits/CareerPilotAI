const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askMentor = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are CareerPilot AI, a helpful career mentor for MCA/BCA students. Answer in simple Hinglish. Question: ${question}`,
    });

    res.status(200).json({
      answer: response.text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  askMentor,
};
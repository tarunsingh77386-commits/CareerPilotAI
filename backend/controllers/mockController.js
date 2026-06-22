const generateMockInterview = (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({
        message: "Skills are required",
      });
    }

    const mockQuestions = skills.map((skill) => ({
      skill,
      question: `Explain your experience with ${skill}.`,
      sampleAnswer: `I have basic understanding of ${skill} and I have used it in projects. I can improve more by building practical applications.`,
    }));

    res.status(200).json({
      mockQuestions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateMockInterview,
};
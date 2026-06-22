const generateQuestions = (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({
        message: "Skills are required",
      });
    }

    const questionBank = {
      html: ["What are semantic tags in HTML?", "Difference between div and span?"],
      css: ["What is Flexbox?", "Difference between class and id in CSS?"],
      javascript: ["Difference between var, let and const?", "What is closure in JavaScript?"],
      react: ["What is Virtual DOM?", "What are props and state in React?"],
      node: ["What is Node.js?", "What is middleware in Express.js?"],
      mongodb: ["What is MongoDB?", "Difference between SQL and NoSQL?"],
      java: ["Explain OOP concepts.", "Difference between method overloading and overriding?"],
      python: ["What are lists and tuples?", "What is indentation in Python?"],
      sql: ["What is JOIN in SQL?", "Difference between primary key and foreign key?"],
      git: ["What is Git?", "Difference between git pull and git fetch?"],
    };

    let questions = [];

    skills.forEach((skill) => {
      const key = skill.toLowerCase();
      if (questionBank[key]) {
        questions = [...questions, ...questionBank[key]];
      }
    });

    res.status(200).json({
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateQuestions,
};
const generateRoadmap = (req, res) => {
  try {
    const { goal } = req.body;

    let roadmap = [];

    if (goal.toLowerCase().includes("full stack")) {
      roadmap = [
        "Month 1 → HTML, CSS, JavaScript",
        "Month 2 → React.js",
        "Month 3 → Node.js + Express.js",
        "Month 4 → MongoDB",
        "Month 5 → Full Stack Project",
        "Month 6 → Interview Preparation",
      ];
    } else if (goal.toLowerCase().includes("java")) {
      roadmap = [
        "Month 1 → Core Java",
        "Month 2 → OOP + Collections",
        "Month 3 → JDBC + MySQL",
        "Month 4 → Spring Boot",
        "Month 5 → Java Project",
        "Month 6 → Interview Preparation",
      ];
    } else {
      roadmap = [
        "Month 1 → Learn Fundamentals",
        "Month 2 → Build Projects",
        "Month 3 → Improve Skills",
        "Month 4 → Portfolio Building",
        "Month 5 → Mock Interviews",
        "Month 6 → Job Applications",
      ];
    }

    res.status(200).json({
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateRoadmap,
};
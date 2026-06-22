const recommendJobs = (req, res) => {
  const { skills } = req.body;

  if (!skills || skills.length === 0) {
    return res.status(400).json({ message: "Skills are required" });
  }

  const lowerSkills = skills.map((skill) => skill.toLowerCase());
  let jobs = [];

  if (lowerSkills.includes("react") || lowerSkills.includes("javascript")) {
    jobs.push("Frontend Developer", "React Developer", "UI Developer");
  }

  if (lowerSkills.includes("node") || lowerSkills.includes("mongodb")) {
    jobs.push("Backend Developer", "MERN Stack Developer");
  }

  if (lowerSkills.includes("java") || lowerSkills.includes("sql")) {
    jobs.push("Java Developer", "Software Engineer");
  }

  if (lowerSkills.includes("python")) {
    jobs.push("Python Developer", "Data Analyst");
  }

  if (jobs.length === 0) {
    jobs = ["Software Developer Intern", "Junior Developer"];
  }

  res.status(200).json({
    jobs: [...new Set(jobs)],
  });
};

module.exports = {
  recommendJobs,
};
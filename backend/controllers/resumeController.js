const pdfParse = require("pdf-parse");
const fs = require("fs");

const analyzeResume = async (req, res) => {
  console.log("FILE =", req.file);

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  try {
    const pdfBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(pdfBuffer);

    const text = data.text.toLowerCase();

    const skills = [
      "html",
      "css",
      "javascript",
      "react",
      "node",
      "mongodb",
      "java",
      "python",
      "sql",
      "git",
    ];

    const foundSkills = skills.filter((skill) =>
      text.includes(skill)
    );

    const missingSkills = skills.filter(
      (skill) => !foundSkills.includes(skill)
    );

    const atsScore = Math.round(
      (foundSkills.length / skills.length) * 100
    );

    // Uploaded file delete kar do
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      atsScore,
      skillsFound: foundSkills,
      missingSkills,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};
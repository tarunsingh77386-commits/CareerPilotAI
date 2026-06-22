const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const jobRoutes = require("./routes/jobRoutes");
const mockRoutes = require("./routes/mockRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("CareerPilot AI Backend Running 🚀");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Resume Routes
app.use("/api/resume", resumeRoutes);

// Mentor Routes
app.use("/api/mentor", mentorRoutes);

// Interview Routes
app.use("/api/interview", interviewRoutes);

// Roadmap Routes
app.use("/api/roadmap", roadmapRoutes);

// Job Recommendation Routes
app.use("/api/jobs", jobRoutes);

// Mock Interview Routes
app.use("/api/mock", mockRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
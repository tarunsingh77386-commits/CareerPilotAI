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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://careerpilot-aiv1.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("CareerPilot AI Backend Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/mock", mockRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
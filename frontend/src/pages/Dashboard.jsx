import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

import {
  FaChartLine,
  FaBrain,
  FaMicrophone,
  FaMapMarkedAlt,
  FaBriefcase,
  FaFileAlt,
  FaRobot,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaUserTie,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h2 className={`text-3xl font-bold mt-3 ${color}`}>{value}</h2>
      </div>
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

const Card = ({ children, className = "", id }) => (
  <div
    id={id}
    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl border border-slate-200 p-6 transition-all scroll-mt-28 ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="mb-5">
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    </div>
    {subtitle && <p className="text-sm text-slate-500 mt-2">{subtitle}</p>}
  </div>
);

function Dashboard() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [atsScore, setAtsScore] = useState(0);
  const [skillsFound, setSkillsFound] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);

  const [mentorQuestion, setMentorQuestion] = useState("");
  const [mentorAnswer, setMentorAnswer] = useState("");

  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [mockQuestions, setMockQuestions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleResumeAnalyze = async () => {
    if (!resume) return alert("Please select a PDF Resume");

    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const res = await axios.post(
        "https://careerpilot-backend-vax2.onrender.com/api/resume/analyze",
        formData
      );

      setAtsScore(res.data.atsScore);
      setSkillsFound(res.data.skillsFound);
      setMissingSkills(res.data.missingSkills);
      alert("Resume Analyzed Successfully 🚀");
    } catch (error) {
      console.log(error);
      alert("Resume Analysis Failed");
    }
  };

  const handleAskMentor = () => {
    if (!mentorQuestion.trim()) return alert("Please ask something");

    setMentorAnswer(
      "AI Mentor Suggestion: Focus on DSA, Git, Projects, and strong resume keywords."
    );
  };

  const handleGenerateQuestions = async () => {
    if (skillsFound.length === 0) {
      return alert("Please analyze your resume first");
    }

    try {
      const res = await axios.post(
        "https://careerpilot-backend-vax2.onrender.com/api/interview/questions",
        { skills: skillsFound }
      );

      setInterviewQuestions(res.data.questions);
      alert("Interview Questions Generated 🚀");
    } catch (error) {
      console.log(error);
      alert("Question Generation Failed");
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!goal.trim()) return alert("Please enter your career goal");

    try {
      const res = await axios.post(
        "https://careerpilot-backend-vax2.onrender.com/api/roadmap/generate",
        { goal }
      );

      setRoadmap(res.data.roadmap);
      alert("Roadmap Generated 🚀");
    } catch (error) {
      console.log(error);
      alert("Roadmap Generation Failed");
    }
  };

  const handleRecommendJobs = async () => {
    if (skillsFound.length === 0) {
      return alert("Please analyze your resume first");
    }

    try {
      const res = await axios.post(
        "https://careerpilot-backend-vax2.onrender.com/api/jobs/recommend",
        { skills: skillsFound }
      );

      setRecommendedJobs(res.data.jobs);
      alert("Jobs Recommended 🚀");
    } catch (error) {
      console.log(error);
      alert("Job Recommendation Failed");
    }
  };

  const handleGenerateMockInterview = async () => {
    if (skillsFound.length === 0) {
      return alert("Please analyze your resume first");
    }

    try {
      const res = await axios.post(
        "https://careerpilot-backend-vax2.onrender.com/api/mock/generate",
        { skills: skillsFound }
      );

      setMockQuestions(res.data.mockQuestions);
      alert("Mock Interview Generated 🚀");
    } catch (error) {
      console.log(error);
      alert("Mock Interview Failed");
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(20);
    doc.text("CareerPilot AI Report", 20, y);

    y += 20;
    doc.setFontSize(14);
    doc.text(`ATS Score: ${atsScore}%`, 20, y);

    y += 15;
    doc.text("Skills Found:", 20, y);
    y += 10;
    skillsFound.forEach((skill) => {
      doc.text(`- ${skill}`, 25, y);
      y += 8;
    });

    y += 5;
    doc.text("Missing Skills:", 20, y);
    y += 10;
    missingSkills.forEach((skill) => {
      doc.text(`- ${skill}`, 25, y);
      y += 8;
    });

    y += 5;
    doc.text("Interview Questions:", 20, y);
    y += 10;
    interviewQuestions.forEach((q, i) => {
      doc.text(`${i + 1}. ${q}`, 25, y);
      y += 8;
    });

    y += 5;
    doc.text("Mock Interview:", 20, y);
    y += 10;
    mockQuestions.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.question}`, 25, y);
      y += 8;
    });

    y += 5;
    doc.text("Recommended Jobs:", 20, y);
    y += 10;
    recommendedJobs.forEach((job) => {
      doc.text(`- ${job}`, 25, y);
      y += 8;
    });

    y += 5;
    doc.text("Roadmap:", 20, y);
    y += 10;
    roadmap.forEach((step) => {
      doc.text(`- ${step}`, 25, y);
      y += 8;
    });

    doc.save("CareerPilot_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <div
            id="dashboard"
            className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl mb-8 scroll-mt-28"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 left-16 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <p className="text-cyan-200 text-sm font-semibold">
                AI Career Analytics Dashboard
              </p>

              <h1 className="text-4xl font-bold mt-3">Welcome Back, {localStorage.getItem("name") || "User"}</h1>

              <p className="text-slate-300 mt-4 max-w-2xl leading-relaxed">
                Analyze resumes, detect skill gaps, generate interview questions,
                build roadmaps, recommend jobs and download career reports.
              </p>

              <div className="flex flex-wrap gap-4 mt-7">
                <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl border border-white/10 text-sm">
                  ATS Score: <b>{atsScore}%</b>
                </div>
                <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl border border-white/10 text-sm">
                  Skills: <b>{skillsFound.length}</b>
                </div>
                <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl border border-white/10 text-sm">
                  Jobs: <b>{recommendedJobs.length}</b>
                </div>
                <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl border border-white/10 text-sm">
                  Mock: <b>{mockQuestions.length}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6">
            <StatCard title="ATS Score" value={`${atsScore}%`} icon={<FaChartLine className="text-emerald-600 text-xl" />} color="text-emerald-600" bg="bg-emerald-50" />
            <StatCard title="Skills Found" value={skillsFound.length} icon={<FaBrain className="text-blue-600 text-xl" />} color="text-blue-600" bg="bg-blue-50" />
            <StatCard title="Questions" value={interviewQuestions.length} icon={<FaMicrophone className="text-purple-600 text-xl" />} color="text-purple-600" bg="bg-purple-50" />
            <StatCard title="Mock Interview" value={mockQuestions.length} icon={<FaUserTie className="text-cyan-600 text-xl" />} color="text-cyan-600" bg="bg-cyan-50" />
            <StatCard title="Roadmap Steps" value={roadmap.length} icon={<FaMapMarkedAlt className="text-orange-600 text-xl" />} color="text-orange-600" bg="bg-orange-50" />
            <StatCard title="Jobs" value={recommendedJobs.length} icon={<FaBriefcase className="text-pink-600 text-xl" />} color="text-pink-600" bg="bg-pink-50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card id="resume">
              <SectionTitle icon={<FaFileAlt className="text-blue-600 text-xl" />} title="Resume Analyzer" subtitle="Upload your resume and generate ATS score with skill analysis." />

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="border border-slate-300 bg-slate-50 p-4 w-full rounded-xl text-sm"
              />

              <button
                onClick={handleResumeAnalyze}
                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Analyze Resume
              </button>
            </Card>

            <Card id="mentor">
              <SectionTitle icon={<FaRobot className="text-emerald-600 text-xl" />} title="AI Career Mentor" subtitle="Ask career questions and get instant guidance." />

              <input
                type="text"
                placeholder="Ask anything..."
                value={mentorQuestion}
                onChange={(e) => setMentorQuestion(e.target.value)}
                className="border border-slate-300 bg-slate-50 p-4 w-full rounded-xl text-sm"
              />

              <button
                onClick={handleAskMentor}
                className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Ask AI
              </button>

              {mentorAnswer && (
                <p className="mt-5 bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-slate-700 text-sm">
                  {mentorAnswer}
                </p>
              )}
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card id="skills">
              <SectionTitle icon={<FaChartLine className="text-emerald-600 text-xl" />} title="Resume Analysis Result" subtitle="View your ATS score, detected skills and missing skills." />

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5">
                <p className="text-sm text-slate-500">ATS Score</p>
                <h3 className="text-4xl font-bold text-emerald-600 mt-2">
                  {atsScore}%
                </h3>
              </div>

              <h3 className="font-semibold text-emerald-700 mb-3">Skills Found</h3>

              <div className="flex flex-wrap gap-2 mb-5">
                {skillsFound.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    <FaCheckCircle /> {skill}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold text-red-700 mb-3">Missing Skills</h3>

              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    <FaTimesCircle /> {skill}
                  </span>
                ))}
              </div>
            </Card>

            <Card id="interview">
              <SectionTitle icon={<FaMicrophone className="text-purple-600 text-xl" />} title="Interview Question Generator" subtitle="Generate technical questions based on detected skills." />

              <button
                onClick={handleGenerateQuestions}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Generate Interview Questions
              </button>

              <ul className="mt-5 space-y-3">
                {interviewQuestions.map((question, index) => (
                  <li
                    key={index}
                    className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-slate-700 text-sm"
                  >
                    <b>{index + 1}.</b> {question}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card id="mock">
              <SectionTitle icon={<FaUserTie className="text-cyan-600 text-xl" />} title="Mock Interview" subtitle="Practice interview questions generated from your resume skills." />

              <button
                onClick={handleGenerateMockInterview}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Generate Mock Interview
              </button>

              <div className="mt-5 space-y-4">
                {mockQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl"
                  >
                    <h4 className="font-bold text-slate-800 text-sm">
                      {index + 1}. {item.question}
                    </h4>

                    <p className="text-sm text-slate-600 mt-2">
                      <strong>Sample Answer:</strong> {item.sampleAnswer}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card id="jobs">
              <SectionTitle icon={<FaBriefcase className="text-pink-600 text-xl" />} title="Job Recommendation" subtitle="Recommend suitable roles based on resume skills." />

              <button
                onClick={handleRecommendJobs}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Recommend Jobs
              </button>

              <ul className="mt-5 space-y-3">
                {recommendedJobs.map((job, index) => (
                  <li
                    key={index}
                    className="bg-pink-50 border border-pink-200 p-4 rounded-xl text-slate-700 text-sm"
                  >
                    {job}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card id="roadmap">
              <SectionTitle icon={<FaMapMarkedAlt className="text-orange-600 text-xl" />} title="Roadmap Generator" subtitle="Generate a career roadmap based on your goal." />

              <input
                type="text"
                placeholder="Enter your goal e.g. Full Stack Developer"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="border border-slate-300 bg-slate-50 p-4 w-full rounded-xl text-sm"
              />

              <button
                onClick={handleGenerateRoadmap}
                className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Generate Roadmap
              </button>

              <ul className="mt-5 space-y-3">
                {roadmap.map((step, index) => (
                  <li
                    key={index}
                    className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-slate-700 text-sm"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </Card>

            <div
              id="report"
              className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl border border-slate-800 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <FaDownload className="text-cyan-400 text-2xl" />
                <h2 className="text-2xl font-bold">Career Report</h2>
              </div>

              <p className="text-slate-300 mt-4 max-w-2xl text-sm leading-relaxed">
                Download a complete career report including ATS score, skills,
                roadmap, interview questions, mock interview and job recommendations.
              </p>

              <button
                onClick={handleGeneratePDF}
                className="mt-6 bg-white text-slate-900 hover:bg-slate-100 px-7 py-4 rounded-xl font-semibold shadow-lg"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
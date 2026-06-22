import {
  FaHome,
  FaFileAlt,
  FaBrain,
  FaRobot,
  FaMicrophone,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#1E293B] text-white p-6 shadow-2xl">

      <div className="mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          CareerPilot
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          AI Career Platform
        </p>
      </div>

      <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-lg">
            T
          </div>

          <div>
            <h3 className="font-semibold">
              Tarun Kumar
            </h3>

            <p className="text-xs text-gray-400">
              MCA Student
            </p>
          </div>
        </div>
      </div>

      <ul className="space-y-3">

        <li className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer shadow-lg">
          <FaHome />
          <span>Dashboard</span>
        </li>

        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
          <FaFileAlt />
          <span>Resume Analyzer</span>
        </li>

        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
          <FaBrain />
          <span>Skill Gap Analysis</span>
        </li>

        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
          <FaRobot />
          <span>AI Mentor</span>
        </li>

        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
          <FaMicrophone />
          <span>Mock Interview</span>
        </li>

        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer">
          <FaBriefcase />
          <span>Job Recommendations</span>
        </li>

      </ul>

      <div className="mt-10">
        <button className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 p-3 rounded-xl transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;
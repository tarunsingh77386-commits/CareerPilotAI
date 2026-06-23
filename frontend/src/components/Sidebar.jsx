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
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      alert(`${id} section not found`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, id: "dashboard" },
    { name: "Resume Analyzer", icon: <FaFileAlt />, id: "resume" },
    { name: "Skill Gap Analysis", icon: <FaBrain />, id: "skills" },
    { name: "AI Mentor", icon: <FaRobot />, id: "mentor" },
    { name: "Mock Interview", icon: <FaMicrophone />, id: "mock" },
    { name: "Job Recommendations", icon: <FaBriefcase />, id: "jobs" },
  ];

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#1E293B] text-white p-6 shadow-2xl sticky top-0">
      <div className="mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          CareerPilot
        </h1>
        <p className="text-gray-400 text-sm mt-1">AI Career Platform</p>
      </div>

      <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-lg">
            {(localStorage.getItem("name") || "U").charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold">{localStorage.getItem("name") || "User"}</h3>
            <p className="text-xs text-gray-400">MCA Student</p>
          </div>
        </div>
      </div>

      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition cursor-pointer text-left ${
                index === 0
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 p-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
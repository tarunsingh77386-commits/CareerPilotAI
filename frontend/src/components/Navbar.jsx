function Navbar() {
  return (
    <div className="h-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-8 flex justify-between items-center shadow-sm">
      
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
          CareerPilot AI 🚀
        </h1>

        <p className="text-sm text-gray-500">
          Personal AI Career Coach
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="font-semibold text-gray-800">
          {localStorage.getItem("name") || "User"} 👋
          </p>

          <p className="text-xs text-gray-500">
            MCA Student
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          T
        </div>
      </div>
    </div>
  );
}

export default Navbar;
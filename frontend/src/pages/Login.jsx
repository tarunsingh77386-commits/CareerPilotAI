import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://careerpilot-backend-vax2.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("course", res.data.user.course);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#242424] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl min-h-[680px] bg-white rounded-[28px] overflow-hidden shadow-2xl border-[6px] border-[#444] grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#f6f7fb] px-10 py-8 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              C
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              CareerPilot <span className="text-orange-500">AI</span>
            </h1>
          </div>

          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Sign In
            </h2>

            <p className="text-center text-gray-500 text-sm mb-8">
              Continue your career journey
            </p>

            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 mb-4 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 mb-5 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-full font-semibold shadow-lg transition"
            >
              Sign In
            </button>

            <div className="mt-8 bg-blue-100/80 rounded-xl p-5">
              <h3 className="font-bold text-blue-900 text-sm mb-2">
                💡 New to CareerPilot AI?
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Create an account to analyze your resume, generate roadmaps,
                interview questions and job recommendations.
              </p>

              <button
                onClick={() => navigate("/register")}
                className="mt-4 text-blue-700 font-semibold hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            CareerPilot AI · Version 1.0
          </p>
        </div>

        <div className="relative bg-gradient-to-b from-orange-300 via-purple-500 to-black overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_55%)]"></div>

          <div className="absolute top-12 left-12 w-20 h-20 bg-red-400 rotate-12 shadow-xl"></div>
          <div className="absolute top-24 right-16 w-16 h-16 bg-purple-500 rotate-45 shadow-xl"></div>
          <div className="absolute bottom-20 left-20 w-14 h-14 bg-orange-400 rotate-12 shadow-xl"></div>
          <div className="absolute bottom-28 right-28 w-14 h-14 bg-white rotate-45 shadow-xl"></div>

          <div className="relative z-10 text-center text-white px-10">
            <h1 className="text-6xl font-bold leading-tight drop-shadow-xl">
              You Upload
              <br />
              We <span className="italic font-serif">Analyze</span>
            </h1>

            <p className="mt-6 text-white/80 max-w-md mx-auto">
              AI powered resume analysis, skill gap detection, career roadmap
              and job recommendation system.
            </p>

            <div className="mt-16 mx-auto w-80 bg-red-500 rounded-t-3xl rounded-b-xl p-5 shadow-2xl">
              <div className="bg-white text-gray-800 p-4 rounded-lg text-left text-xs shadow-lg">
                <p>ATS Score Generated...</p>
                <p>Skills Matched...</p>
                <p>Roadmap Created...</p>
                <p>Jobs Recommended...</p>
              </div>

              <div className="grid grid-cols-8 gap-2 mt-4">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 rounded bg-red-800/70 shadow-inner"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 h-full w-24 bg-black/60 rounded-r-full blur-sm"></div>
          <div className="absolute right-0 top-0 h-full w-24 bg-black/60 rounded-l-full blur-sm"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
// EcoQuest - Authentication & User Registration Modal
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.AuthModal = function({ isOpen, onClose, onLoginPersona, onRegisterUser }) {
    if (!isOpen) return null;

    const [isSignUp, setIsSignUp] = useState(false);
    const [role, setRole] = useState("student"); // "student" | "teacher"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("Greenwood Institute of Technology");
    const [classGrade, setClassGrade] = useState("B.Tech CSE - 2nd Year");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignUp) {
        onRegisterUser({
          name: name || (role === "student" ? "New Student" : "New Faculty"),
          email: email || "user@college.edu",
          role,
          institution,
          classGrade
        });
      } else {
        // Quick default login based on role
        if (role === "teacher") {
          onLoginPersona("teacher");
        } else {
          onLoginPersona("student1");
        }
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-800 to-green-700 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full text-lg"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌱</span>
              <span className="font-heading font-extrabold tracking-wide text-xl">EcoQuest</span>
            </div>
            <h3 className="text-xl font-bold font-heading">
              {isSignUp ? "Create Your Eco Account" : "Welcome Back, Eco Champion!"}
            </h3>
            <p className="text-emerald-100 text-xs mt-1">
              {isSignUp
                ? "Join thousands of students and educators turning learning into planet-saving action."
                : "Log in to track your XP, complete eco missions, and climb campus leaderboards."}
            </p>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {/* Quick Demo Personas - Highly requested for CEP presentation! */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  ⚡ Quick Demo Login (1-Click)
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">CEP Evaluator Mode</span>
              </div>
              <p className="text-xs text-emerald-700 mb-3">
                Experience the platform immediately with realistic pre-configured profiles:
              </p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => { onLoginPersona("student1"); onClose(); }}
                  className="flex items-center justify-between bg-white hover:bg-emerald-100/50 p-2.5 rounded-xl border border-emerald-200 text-left transition-all text-xs text-slate-800 font-medium group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                    />
                    <div>
                      <div className="font-bold text-emerald-900 group-hover:text-emerald-700">Aarav Sharma (Student)</div>
                      <div className="text-[11px] text-slate-500">B.Tech Year 2 • Level 3 Eco Warrior • 1,420 XP</div>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-colors">Select →</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onLoginPersona("student2"); onClose(); }}
                  className="flex items-center justify-between bg-white hover:bg-emerald-100/50 p-2.5 rounded-xl border border-emerald-200 text-left transition-all text-xs text-slate-800 font-medium group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                    />
                    <div>
                      <div className="font-bold text-emerald-900 group-hover:text-emerald-700">Priya Patel (Student)</div>
                      <div className="text-[11px] text-slate-500">Env Tech • Level 2 Sprout Scout • 1,140 XP</div>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-colors">Select →</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onLoginPersona("teacher"); onClose(); }}
                  className="flex items-center justify-between bg-white hover:bg-emerald-100/50 p-2.5 rounded-xl border border-emerald-200 text-left transition-all text-xs text-slate-800 font-medium group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                    />
                    <div>
                      <div className="font-bold text-emerald-900 group-hover:text-emerald-700">Prof. Ananya Sen (Teacher/Admin)</div>
                      <div className="text-[11px] text-slate-500">Dept. Coordinator • Verification Queue Access</div>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-colors">Select →</span>
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Or enter details</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Role Selector Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  role === "student" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🎒 Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  role === "teacher" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                👩‍🏫 Teacher / Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === "student" ? "e.g. Aarav Sharma" : "e.g. Prof. Ananya Sen"}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@school.edu"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">School or College</label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Greenwood Institute of Technology"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {role === "student" ? "Class / Grade / Branch" : "Department"}
                    </label>
                    <input
                      type="text"
                      value={classGrade}
                      onChange={(e) => setClassGrade(e.target.value)}
                      placeholder={role === "student" ? "e.g. B.Tech CSE - 2nd Year" : "e.g. Dept. of Environmental Engineering"}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                {isSignUp ? "Complete Registration" : "Sign In & Continue"}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "New student or teacher? Create an Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
})();

// EcoQuest - Responsive Top Navigation Bar
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.Navbar = function({
    currentPage,
    onNavigate,
    currentUser,
    personaKey,
    onSwitchPersona,
    onOpenAuth,
    soundEnabled,
    onToggleSound
  }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

    const isTeacher = currentUser && currentUser.role === "teacher";

    const navItems = [
      { id: "home", label: "Home", icon: "home" },
      { id: "learn", label: "Learn", icon: "book-open" },
      { id: "quizzes", label: "Quizzes", icon: "help-circle" },
      { id: "games", label: "Games", icon: "gamepad-2" },
      { id: "missions", label: "Eco Missions", icon: "target" },
      { id: "leaderboard", label: "Leaderboard", icon: "trophy" },
      { id: "badges", label: "Badges", icon: "award" },
      { id: "impact", label: "Impact", icon: "bar-chart-2" },
      {
        id: isTeacher ? "teacher-dashboard" : "student-dashboard",
        label: isTeacher ? "Teacher Portal" : "Dashboard",
        icon: "layout",
        highlight: isTeacher
      }
    ];

    return (
      <header className="sticky top-0 z-40 w-full glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <span className="text-2xl font-black font-heading tracking-tight text-emerald-950 flex items-center gap-1">
                  Eco<span className="text-emerald-600">Quest</span>
                </span>
                <span className="hidden sm:block text-[10px] font-semibold text-emerald-700 tracking-wider uppercase -mt-1">
                  Gamified Environmental Learning
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id ||
                  (item.id === "student-dashboard" && currentPage === "student-dashboard") ||
                  (item.id === "teacher-dashboard" && currentPage === "teacher-dashboard");
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all relative ${
                      isActive
                        ? "text-emerald-900 bg-emerald-100/80 shadow-sm"
                        : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60"
                    }`}
                  >
                    {item.label}
                    {item.highlight && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-emerald-600 text-white rounded-full font-bold animate-pulse">
                        Pro
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: Quick Persona Switcher + Sound Toggle + Profile */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Sound Toggle */}
              <button
                onClick={onToggleSound}
                title={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
                className={`p-2 rounded-xl border text-sm transition-all ${
                  soundEnabled
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200"
                }`}
              >
                {soundEnabled ? "🔊" : "🔇"}
              </button>

              {/* Fast Persona Switcher dropdown for presentation! */}
              <div className="relative">
                <button
                  onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 transition-all"
                  title="Switch Demo Role for Presentation"
                >
                  <span className="text-[10px] text-emerald-600 uppercase tracking-wider">Role:</span>
                  <span className="font-bold">
                    {personaKey === "teacher" ? "Prof. Sen (Teacher)" : personaKey === "student2" ? "Priya (Student)" : "Aarav (Student)"}
                  </span>
                  <span className="text-[10px]">▼</span>
                </button>

                {personaDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-emerald-100 p-2 z-50 animate-fadeIn">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Quick Demo Switcher
                    </div>
                    <button
                      onClick={() => { onSwitchPersona("student1"); setPersonaDropdownOpen(false); }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${
                        personaKey === "student1" ? "bg-emerald-100 text-emerald-900 font-bold" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>🎒</span>
                      <div>
                        <div className="font-semibold">Aarav Sharma</div>
                        <div className="text-[10px] text-slate-500">Student • Level 3 • 1,420 XP</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { onSwitchPersona("student2"); setPersonaDropdownOpen(false); }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${
                        personaKey === "student2" ? "bg-emerald-100 text-emerald-900 font-bold" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>🎒</span>
                      <div>
                        <div className="font-semibold">Priya Patel</div>
                        <div className="text-[10px] text-slate-500">Student • Level 2 • 1,140 XP</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { onSwitchPersona("teacher"); setPersonaDropdownOpen(false); }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${
                        personaKey === "teacher" ? "bg-emerald-100 text-emerald-900 font-bold" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>👩‍🏫</span>
                      <div>
                        <div className="font-semibold">Prof. Ananya Sen</div>
                        <div className="text-[10px] text-slate-500">Teacher • Verification Queue</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Student Stats Pill (if student) */}
              {!isTeacher && currentUser && (
                <div
                  onClick={() => onNavigate("student-dashboard")}
                  className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-2xl shadow-sm hover:shadow transition-all group"
                  title="View Student Dashboard"
                >
                  <span className="text-xs font-extrabold bg-emerald-800/60 px-2 py-0.5 rounded-lg border border-emerald-400/30">
                    Lvl {currentUser.level}
                  </span>
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>✨ {currentUser.xp} XP</span>
                  </div>
                  <div className="text-xs flex items-center text-amber-300 font-bold" title="5 Day Streak!">
                    🔥 {currentUser.streakDays || 5}d
                  </div>
                </div>
              )}

              {/* Profile Avatar / Login */}
              {currentUser ? (
                <button
                  onClick={() => onNavigate("profile")}
                  className={`flex items-center gap-2 p-1 pl-2 rounded-2xl border transition-all ${
                    currentPage === "profile" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-300"
                  }`}
                  title="View Profile"
                >
                  <span className="text-xs font-bold text-slate-700 hidden xl:inline">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-400 shadow-sm"
                  />
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onToggleSound}
                className="sm:hidden p-1.5 rounded-lg text-sm bg-slate-100"
              >
                {soundEnabled ? "🔊" : "🔇"}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              >
                <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-left rounded-xl text-xs font-bold ${
                    currentPage === item.id ? "bg-emerald-100 text-emerald-900" : "text-slate-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Persona for Demo
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { onSwitchPersona("student1"); setMobileMenuOpen(false); }}
                  className={`flex-1 p-2 rounded-xl text-xs font-semibold border ${
                    personaKey === "student1" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-700"
                  }`}
                >
                  Aarav (Student)
                </button>
                <button
                  onClick={() => { onSwitchPersona("teacher"); setMobileMenuOpen(false); }}
                  className={`flex-1 p-2 rounded-xl text-xs font-semibold border ${
                    personaKey === "teacher" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-700"
                  }`}
                >
                  Prof. Sen (Teacher)
                </button>
              </div>

              <button
                onClick={() => { onNavigate("profile"); setMobileMenuOpen(false); }}
                className="w-full mt-2 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200"
              >
                View Full Profile
              </button>
            </div>
          </div>
        )}
      </header>
    );
  };
})();

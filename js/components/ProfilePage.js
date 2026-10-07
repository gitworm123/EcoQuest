// EcoQuest - User Profile & Account Settings Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.ProfilePage = function({
    currentUser,
    personaKey,
    onSwitchPersona,
    onResetDemoData,
    onNavigate
  }) {
    if (!currentUser) return null;

    const allBadges = window.EcoQuestData.badges;
    const userBadges = currentUser.badges || [];
    const isTeacher = currentUser.role === "teacher";

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-100/60 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-emerald-400 shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                    {currentUser.name}
                  </h1>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    {isTeacher ? "Faculty" : `Level ${currentUser.level} ${currentUser.levelTitle}`}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {currentUser.classGrade || currentUser.department} • {currentUser.institution}
                </p>
                <div className="text-xs text-slate-400 flex items-center gap-3 pt-1">
                  <span>✉️ {currentUser.email}</span>
                  {currentUser.rollNumber && <span>• ID: {currentUser.rollNumber}</span>}
                  <span>• Joined {currentUser.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Demo Switcher inside Profile */}
            <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 w-full sm:w-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-2">
                ⚡ Switch Demo Persona
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSwitchPersona("student1")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    personaKey === "student1" ? "bg-emerald-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Aarav (Student)
                </button>
                <button
                  onClick={() => onSwitchPersona("student2")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    personaKey === "student2" ? "bg-emerald-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Priya (Student)
                </button>
                <button
                  onClick={() => onSwitchPersona("teacher")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    personaKey === "teacher" ? "bg-emerald-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Prof. Sen (Teacher)
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-600 leading-relaxed max-w-2xl">
            <strong>Bio:</strong> {currentUser.bio}
          </div>
        </div>

        {/* METRICS & OVERVIEW */}
        {!isTeacher && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 font-semibold block">Total Eco-Experience</span>
              <span className="text-3xl font-black text-emerald-950 font-heading block mt-1">
                {currentUser.xp} XP
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">Level {currentUser.level}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 font-semibold block">Verified Missions</span>
              <span className="text-3xl font-black text-teal-950 font-heading block mt-1">
                {currentUser.completedMissions?.length || 0}
              </span>
              <span className="text-[10px] text-teal-600 font-bold">Field Challenges</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 font-semibold block">Badges Unlocked</span>
              <span className="text-3xl font-black text-amber-950 font-heading block mt-1">
                {userBadges.length}
              </span>
              <span className="text-[10px] text-amber-600 font-bold">Eco Accolades</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 font-semibold block">Consecutive Streak</span>
              <span className="text-3xl font-black text-orange-600 font-heading block mt-1">
                🔥 {currentUser.streakDays} Days
              </span>
              <span className="text-[10px] text-orange-600 font-bold">Active Participation</span>
            </div>
          </div>
        )}

        {/* BADGES RIBBON */}
        {!isTeacher && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">
                  Earned Badges & Achievements ({userBadges.length})
                </h3>
                <p className="text-xs text-slate-500">Official sustainability credentials unlocked by this student</p>
              </div>
              <button
                onClick={() => onNavigate("badges")}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View Full Showcase →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
              {allBadges.map((badge) => {
                const isEarned = userBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      isEarned
                        ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-400 opacity-50 grayscale"
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.emoji}</div>
                    <div className="text-xs font-bold line-clamp-1">{badge.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {isEarned ? "Unlocked" : "Locked"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RECENT ACTIVITY LOG */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-heading text-slate-900 border-b border-slate-100 pb-2">
            Activity Timeline
          </h3>

          <div className="space-y-3">
            {(currentUser.recentActivities || []).map((act, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {act.type === "quiz" ? "🧠" : act.type === "badge" ? "🏆" : "📸"}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">{act.title}</span>
                    <div className="text-[10px] text-slate-400">{act.timestamp}</div>
                  </div>
                </div>
                {act.xpEarned > 0 && (
                  <span className="text-xs font-bold text-emerald-700">+{act.xpEarned} XP</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DEMO DATA RESET CONTROLS (Vital for CEP evaluator!) */}
        <div className="bg-rose-50/70 rounded-3xl p-6 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-rose-950 font-heading">
              CEP Presentation Controls: Reset Demo Data
            </h4>
            <p className="text-xs text-rose-700 mt-0.5">
              Restore initial state, verification queue items, and default XP values for a fresh evaluation run.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm("Reset all local demo data back to clean factory state?")) {
                onResetDemoData();
              }
            }}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
          >
            Reset Demo Data
          </button>
        </div>
      </div>
    );
  };
})();

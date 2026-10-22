// EcoQuest - Footer Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  window.EcoQuestComponents.Footer = function({ onNavigate }) {
    return (
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Brand & Purpose */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <span className="text-xl">🌿</span>
                </div>
                <span className="text-2xl font-black font-heading tracking-tight text-white">
                  Eco<span className="text-emerald-400">Quest</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Empowering students and educators to transform textbook environmental theory into measurable, real-world climate action through gamification, AI personalization, and verified field missions.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 border border-emerald-800 text-emerald-400">
                  🎓 College CEP Demonstration Platform
                </span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <button onClick={() => onNavigate("home")} className="hover:text-emerald-400 transition-colors">
                    Home & Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("learn")} className="hover:text-emerald-400 transition-colors">
                    Topic Curriculum
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("quizzes")} className="hover:text-emerald-400 transition-colors">
                    Interactive Quizzes
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("games")} className="hover:text-emerald-400 transition-colors">
                    Eco Mini-Games
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("missions")} className="hover:text-emerald-400 transition-colors">
                    Real-World Missions
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("leaderboard")} className="hover:text-emerald-400 transition-colors">
                    Eco Leaderboards
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("badges")} className="hover:text-emerald-400 transition-colors">
                    Badges & Rewards
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Core Topics */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
                7 Core Topics
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-500">▪</span> Waste Management
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-cyan-500">▪</span> Water Conservation
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-500">▪</span> Climate Change
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-yellow-500">▪</span> Renewable Energy
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-green-500">▪</span> Biodiversity
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-slate-400">▪</span> Pollution Control
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-teal-400">▪</span> Sustainable Living
                </li>
              </ul>
            </div>

            {/* Col 4: UN SDG Alignment */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
                UN SDG Alignment
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-emerald-400">Goal 13: Climate Action</div>
                  <div className="text-[11px] text-slate-400">Carbon offset and emissions education</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-cyan-400">Goal 6: Clean Water</div>
                  <div className="text-[11px] text-slate-400">Aquifer recharge & conservation</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-amber-400">Goal 12: Circular Economy</div>
                  <div className="text-[11px] text-slate-400">Source segregation & zero single-use plastic</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>
              © 2026 EcoQuest Platform. Developed for Academic Community Engagement & Environmental Education.
            </p>
            <div className="flex gap-4">
              <span className="text-emerald-500 font-medium">● 100% Client-Side Ready</span>
              <span>● AI Diagnostic Engine</span>
              <span>● Teacher Verification System</span>
            </div>
          </div>
        </div>
      </footer>
    );
  };
})();

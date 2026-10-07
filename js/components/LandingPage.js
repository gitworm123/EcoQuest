// EcoQuest - Landing Page Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  window.EcoQuestComponents.LandingPage = function({ onNavigate, globalImpact }) {
    const topics = window.EcoQuestData.topics;

    return (
      <div className="space-y-24 pb-20">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden hero-gradient pt-12 pb-20 lg:pt-16 lg:pb-32">
          {/* Subtle nature circle blobs */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 right-10 w-[400px] h-[400px] bg-lime-200/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
                  🌱 Transforming Environmental Education in Schools & Colleges
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
                  Learn. Play. Act. <br />
                  <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 bg-clip-text text-transparent">
                    Save the Planet.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-700 font-medium max-w-2xl leading-relaxed">
                  Turn environmental learning into real-world action. Bridge the gap between classroom textbooks and daily sustainable habits through interactive quizzes, verified field missions, and friendly campus competition.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => onNavigate("learn")}
                    className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Start Your Eco Journey</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => onNavigate("missions")}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-300 rounded-2xl font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explore Missions</span>
                    <span>🎯</span>
                  </button>
                </div>

                {/* Quick Trust Badges */}
                <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600">✓</span> Verified Photo Proof
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600">✓</span> Teacher-Verified XP
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600">✓</span> AI Diagnostic Engine
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Environmental Illustration & Interactive Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Main Composite Card */}
                  <div className="rounded-3xl p-6 glass-panel shadow-2xl relative border-2 border-emerald-200/80 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-300/40 to-transparent rounded-bl-full pointer-events-none"></div>

                    {/* Image / Graphic container */}
                    <div className="relative rounded-2xl overflow-hidden mb-5 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                        alt="Students planting trees and engaging in real-world environmental action"
                        className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                        <div className="text-white">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-500 rounded-full">
                            Active Campus Mission
                          </span>
                          <h4 className="text-sm font-bold mt-1">Greenwood Tree Planting Drive</h4>
                          <p className="text-[11px] text-emerald-200">24 Saplings planted this weekend</p>
                        </div>
                      </div>
                    </div>

                    {/* Floating mini stats cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg font-bold">
                          🌳
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-semibold">Trees Planted</div>
                          <div className="text-base font-black text-emerald-950">
                            {globalImpact.treesPlanted.toLocaleString()}+
                          </div>
                        </div>
                      </div>

                      <div className="bg-cyan-50/80 border border-cyan-200 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-lg font-bold">
                          💧
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-semibold">Water Conserved</div>
                          <div className="text-base font-black text-cyan-950">
                            {(globalImpact.waterSavedLiters / 1000).toFixed(0)}k Liters
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Student progress badge */}
                    <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                          className="w-8 h-8 rounded-full border border-emerald-400"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-800">Aarav Sharma</div>
                          <div className="text-[10px] text-emerald-700 font-semibold">Level 3 • Eco Warrior</div>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                        +350 XP Unlocked!
                      </span>
                    </div>
                  </div>

                  {/* Decorative badge top right */}
                  <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-950 px-3 py-1.5 rounded-2xl text-xs font-extrabold shadow-lg rotate-3 flex items-center gap-1.5 border border-amber-300 animate-float">
                    <span>🏆</span> 85+ Campuses Joined
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REAL-TIME IMPACT COUNTERS BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-teal-950 rounded-3xl p-8 sm:p-10 shadow-2xl border border-emerald-700/50 text-white">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                Collective Environmental Impact
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading mt-1">
                Real-World Results, Not Just Exam Grades
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 mt-2">
                Every verified student mission directly updates institutional and municipal sustainability benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl mb-1">🌳</div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-300">
                  {globalImpact.treesPlanted.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-100/80 font-medium mt-1">Native Trees Planted</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl mb-1">♻️</div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-teal-300">
                  {(globalImpact.wasteRecycledKg / 1000).toFixed(1)} Tons
                </div>
                <div className="text-xs text-emerald-100/80 font-medium mt-1">Waste Recycled & Segregated</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl mb-1">🥤</div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-amber-300">
                  {globalImpact.plasticAvoidedItems.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-100/80 font-medium mt-1">Single-Use Plastics Avoided</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl mb-1">💧</div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-cyan-300">
                  {(globalImpact.waterSavedLiters / 1000).toFixed(0)}k Liters
                </div>
                <div className="text-xs text-emerald-100/80 font-medium mt-1">Fresh Water Conserved</div>
              </div>

              <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl mb-1">⚡</div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-yellow-300">
                  {(globalImpact.energySavedKwh / 1000).toFixed(1)} MWh
                </div>
                <div className="text-xs text-emerald-100/80 font-medium mt-1">Clean Electricity Saved</div>
              </div>
            </div>
          </div>
        </section>

        {/* THE CORE PROBLEM & OUR SOLUTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Why EcoQuest?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mt-3">
              Solving the Classroom-to-Action Gap
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Most students memorize definitions of biodiversity and climate change for exams, but don't segregate waste at home or conserve water in daily life. EcoQuest closes this gap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl font-bold mb-4">
                ✕
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                The Old Approach: Passive Theory
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Textbooks focus on dry rote memorization. No practical habits are instilled, and individual environmental contribution is neither measured nor rewarded.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-emerald-200 shadow-md relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold mb-4">
                🎮
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                The EcoQuest Engine: Gamification
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Bite-sized quizzes give instant feedback, awarding XP and badges. Class and college leaderboards stimulate healthy peer motivation and teamwork.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-teal-200 shadow-md relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-bold mb-4">
                📸
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Real Action: Verified Proof
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Students plant trees, audit electricity, and segregate waste. Teachers verify submitted photo evidence, turning school projects into certified civic impact.
              </p>
            </div>
          </div>
        </section>

        {/* 4-STEP GAMIFIED LEARNING JOURNEY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-50/60 rounded-3xl p-8 sm:p-12 border border-emerald-200">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                How It Works
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
                The Complete Student Journey
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm relative">
                <div className="text-xs font-black text-emerald-600 mb-2">STEP 01</div>
                <div className="text-2xl mb-2">📖</div>
                <h4 className="font-bold text-sm text-slate-900">Explore Curriculum</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Dive into 7 core environmental topics with actionable takeaways and interactive facts.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm relative">
                <div className="text-xs font-black text-emerald-600 mb-2">STEP 02</div>
                <div className="text-2xl mb-2">🧠</div>
                <h4 className="font-bold text-sm text-slate-900">Quizzes & AI Insights</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Test your skills across 3 difficulties. Our AI engine pinpoints weak topics and guides your learning.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm relative">
                <div className="text-xs font-black text-emerald-600 mb-2">STEP 03</div>
                <div className="text-2xl mb-2">🌿</div>
                <h4 className="font-bold text-sm text-slate-900">Take Real Missions</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Plant saplings, avoid plastic, and conserve water. Upload timestamped photo proof.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm relative">
                <div className="text-xs font-black text-emerald-600 mb-2">STEP 04</div>
                <div className="text-2xl mb-2">🏆</div>
                <h4 className="font-bold text-sm text-slate-900">Verify & Level Up</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Faculty verify your actions. Earn verified XP, unlock prestigious badges, and top leaderboards!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 CORE TOPICS SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Curriculum Focus
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-slate-900 mt-3">
                7 Core Environmental Disciplines
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Rigorous, research-backed curriculum mapped to UN Sustainable Development Goals.
              </p>
            </div>

            <button
              onClick={() => onNavigate("learn")}
              className="px-5 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition-all self-start md:self-auto"
            >
              Explore Full Curriculum →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topics.map((t) => (
              <div
                key={t.id}
                onClick={() => onNavigate("learn")}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    {t.id === "waste-management" ? "🗑️" :
                     t.id === "water-conservation" ? "💧" :
                     t.id === "climate-change" ? "🔥" :
                     t.id === "renewable-energy" ? "⚡" :
                     t.id === "biodiversity" ? "🌳" :
                     t.id === "pollution" ? "🌫️" : "♻️"}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {t.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-semibold">{t.readTime}</span>
                  <span className="text-slate-400 group-hover:text-emerald-600 font-bold">Start Learning →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 sm:p-14 bg-gradient-to-tr from-emerald-800 via-green-700 to-teal-800 text-white shadow-2xl text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                Get Started Today
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
                Ready to Become a Campus Climate Champion?
              </h2>
              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
                Join over 15,000 students and educators taking real ecological action right now. Take your first quiz or start your first eco-mission!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate("quizzes")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Take Practice Quiz
                </button>
                <button
                  onClick={() => onNavigate("missions")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-400/50 text-white rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5"
                >
                  Browse Real-World Missions
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
})();

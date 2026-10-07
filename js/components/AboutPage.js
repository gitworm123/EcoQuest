// EcoQuest - About Page Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  window.EcoQuestComponents.AboutPage = function({ onNavigate }) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Project Overview & Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            About EcoQuest
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            A gamified environmental education platform engineered specifically for schools, colleges, and university campuses to turn classroom environmental science into certified civic action.
          </p>
        </div>

        {/* 1. THE PROBLEM */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                The Core Problem
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Environmental Education is Trapped in Textbooks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Conventional environmental education across schools and colleges suffers from fundamental shortcomings:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Theoretical Bias:</strong> Students memorize carbon cycles and endangered species for exams, but lack habits of segregating daily waste or unplugging vampire devices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>No Measurable Impact:</strong> Academic curricula provide no mechanism to measure whether a student's knowledge leads to actual water saved or trees planted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Lack of Verification:</strong> Teachers rarely have structured tools to monitor and verify students' practical community environmental activities.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-rose-50/50 rounded-2xl p-6 sm:p-8 border border-rose-100">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3">
                The Disconnect in Numbers
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm">
                  <div className="text-2xl font-black text-rose-600">89%</div>
                  <div className="text-xs text-slate-600 mt-1">
                    of students score high marks on environmental science examinations.
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm">
                  <div className="text-2xl font-black text-rose-600">&lt; 14%</div>
                  <div className="text-xs text-slate-600 mt-1">
                    actively segregate household waste or practice urban water harvesting.
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 italic">
                Source: National Environmental Literacy & Behavior Survey for Higher Education Institutions.
              </p>
            </div>
          </div>
        </section>

        {/* 2. AIM & 5 CORE OBJECTIVES */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Our Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-3">
              Aim & Key Objectives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Transform passive listeners into active ecological changemakers through incentives, data, and faculty guidance.
            </p>
          </div>

          {/* Aim Box */}
          <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-600/40">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-black tracking-widest text-emerald-300">
                Primary Aim
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading mt-2 leading-relaxed">
                "To make environmental education interactive, practical, measurable, and fun by gamifying both conceptual learning and real-world planetary stewardship."
              </h3>
            </div>
          </div>

          {/* 5 Objectives Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold mb-3">
                01
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-heading">
                Gamified Concept Mastery
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Provide instant-feedback multiple-choice quizzes across 3 tiers (Beginner, Intermediate, Advanced) with comprehensive scientific explanations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-lg font-bold mb-3">
                02
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-heading">
                Real-World Action Verification
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect textbook lessons to field missions (tree planting, plastic refusal, composting) validated through student photo uploads and faculty verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg font-bold mb-3">
                03
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-heading">
                AI Diagnostic Personalization
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Continuously analyze student quiz performance to identify weak topics and recommend remedial curriculum lessons and tailored field challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-lg font-bold mb-3">
                04
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-heading">
                Campus-Wide Peer Motivation
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Foster healthy inter-class and inter-college rivalries through student, department, and institutional leaderboards with prestige badges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-lg font-bold mb-3">
                05
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-heading">
                Quantifiable Institutional Metrics
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Aggregate real-time metrics of trees planted, water saved, and waste diverted to provide verifiable sustainability data for NAAC, NIRF, and CEP accreditation.
              </p>
            </div>
          </div>
        </section>

        {/* 3. HOW THE PLATFORM WORKS */}
        <section className="bg-emerald-50/70 rounded-3xl p-8 sm:p-12 border border-emerald-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">
              System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-3">
              How the EcoQuest Platform Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">Phase 1: Diagnosis</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">Interactive Diagnostic Quizzes</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Students take topic-based quizzes with timer pressure. Wrong answers trigger scientifically detailed explanations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700">
                → Generates Topic Proficiency Matrix
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">Phase 2: Action</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">Real-World Mission Submission</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Students carry out physical challenges in their dorm, home, or campus and submit timestamped photo proof along with impact estimates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700">
                → Queued into Faculty Verification Engine
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">Phase 3: Recognition</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">Verification, Badges & Leaderboard</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Educators verify the submission, unlocking student XP, awarding digital badges, advancing levels, and advancing campus rank.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700">
                → Updates Global & Campus Green Dashboards
              </div>
            </div>
          </div>
        </section>

        {/* 4. TARGET USERS BREAKDOWN */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-slate-900 text-center">
            Designed for the Entire Academic Ecosystem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl mb-2">🎒</div>
              <h3 className="font-bold text-base text-slate-900">For Students</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Earn XP, collect rare environmental badges, compete on class leaderboards, and graduate with verified sustainability certificates for resumes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl mb-2">👩‍🏫</div>
              <h3 className="font-bold text-base text-slate-900">For Teachers</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Review student photo submissions in 1 click, track class weak topics on visual diagnostic charts, and easily document student community service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="text-3xl mb-2">🏛️</div>
              <h3 className="font-bold text-base text-slate-900">For Institutions</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Generate campus-wide carbon offset audits, document green initiatives for college accreditation, and demonstrate civic community engagement.
              </p>
            </div>
          </div>
        </section>

        {/* 5. UN SDG ALIGNMENT */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
              United Nations Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mt-2">
              Aligned with 5 UN Sustainable Development Goals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              EcoQuest curriculum and missions directly track indicators outlined in the UN 2030 Agenda for Sustainable Development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-xs font-bold text-amber-400">SDG 12</div>
              <div className="text-sm font-bold text-white mt-1">Responsible Consumption</div>
              <div className="text-[11px] text-slate-400 mt-1">Waste segregation & upcycling</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-xs font-bold text-emerald-400">SDG 13</div>
              <div className="text-sm font-bold text-white mt-1">Climate Action</div>
              <div className="text-[11px] text-slate-400 mt-1">Decarbonization & tree planting</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-xs font-bold text-cyan-400">SDG 6</div>
              <div className="text-sm font-bold text-white mt-1">Clean Water & Sanitation</div>
              <div className="text-[11px] text-slate-400 mt-1">Rainwater harvesting & audit</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-xs font-bold text-yellow-400">SDG 7</div>
              <div className="text-sm font-bold text-white mt-1">Clean Energy</div>
              <div className="text-[11px] text-slate-400 mt-1">Solar awareness & vampire loads</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-xs font-bold text-green-400">SDG 15</div>
              <div className="text-sm font-bold text-white mt-1">Life on Land</div>
              <div className="text-[11px] text-slate-400 mt-1">Native flora & pollinators</div>
            </div>
          </div>
        </section>
      </div>
    );
  };
})();

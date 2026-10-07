// EcoQuest - Student Dashboard Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.StudentDashboard = function({
    currentUser,
    onNavigate,
    onStartTopicQuiz
  }) {
    if (!currentUser) return null;

    const topics = window.EcoQuestData.topics;
    const allQuizzes = window.EcoQuestData.quizzes;
    const allMissions = window.EcoQuestData.missions;

    // Run AI Engine recommendation analysis
    const aiRecommendations = window.EcoQuestUtils.aiEngine.getRecommendations(
      currentUser,
      topics,
      allQuizzes,
      allMissions
    );

    const levelProgress = Math.round(
      ((currentUser.xp - currentUser.prevLevelXp) / (currentUser.nextLevelXp - currentUser.prevLevelXp)) * 100
    );

    const activeMissionsList = allMissions.filter(m =>
      (currentUser.inProgressMissions || []).includes(m.id)
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* STUDENT WELCOME & LEVEL PROGRESSION BANNER */}
        <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                    {currentUser.name}
                  </h1>
                  <span className="text-xs bg-emerald-500/80 px-2.5 py-0.5 rounded-full font-bold">
                    Lvl {currentUser.level}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                  {currentUser.classGrade} • {currentUser.institution}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-emerald-300 font-semibold">
                  <span className="flex items-center gap-1">🔥 {currentUser.streakDays}-Day Streak</span>
                  <span>•</span>
                  <span>🏅 Rank #{currentUser.rank || 1} on Campus Board</span>
                </div>
              </div>
            </div>

            {/* Level Progression Progress Bar */}
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/10 md:w-80">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-emerald-300">Level {currentUser.level}: {currentUser.levelTitle}</span>
                <span className="text-white">{currentUser.xp} / {currentUser.nextLevelXp} XP</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-green-300 h-3 rounded-full progress-glow transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, levelProgress))}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-emerald-200/80 mt-2 text-right">
                {currentUser.nextLevelXp - currentUser.xp} XP to Level {currentUser.level + 1}
              </div>
            </div>
          </div>
        </div>

        {/* 6 TOP STAT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl mb-1 block">✨</span>
            <div className="text-xl font-black text-emerald-950 font-heading">{currentUser.xp}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Total XP Points</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl mb-1 block">🏆</span>
            <div className="text-xl font-black text-amber-950 font-heading">Level {currentUser.level}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">{currentUser.levelTitle}</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl mb-1 block">🏅</span>
            <div className="text-xl font-black text-teal-950 font-heading">{currentUser.badges?.length || 0}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Badges Earned</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl mb-1 block">🎯</span>
            <div className="text-xl font-black text-cyan-950 font-heading">{currentUser.completedMissions?.length || 0}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Missions Verified</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl mb-1 block">🧠</span>
            <div className="text-xl font-black text-purple-950 font-heading">82%</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Avg Quiz Accuracy</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl mb-1 block">👑</span>
            <div className="text-xl font-black text-emerald-700 font-heading">#{currentUser.rank || 1}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Campus Standing</div>
          </div>
        </div>

        {/* AI PERSONALIZED LEARNING SECTION */}
        {aiRecommendations && (
          <section className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-green-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md">
                  🤖
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 block">
                    AI Diagnostic Engine
                  </span>
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    Recommended For You: Strengthen Your Weak Areas
                  </h3>
                </div>
              </div>

              <span className="text-xs bg-emerald-200/80 text-emerald-900 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
                {aiRecommendations.improvementEstimate}
              </span>
            </div>

            {/* Diagnostic Insight Note */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-xs text-slate-700 space-y-1">
              <strong className="text-emerald-900 font-bold block">
                {aiRecommendations.diagnosticInsight}
              </strong>
              <p className="text-slate-600">
                {aiRecommendations.actionPlan}
              </p>
            </div>

            {/* 3 Dynamic Recommendation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Rec 1: Topic Lesson */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider">
                    Recommended Reading
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">
                    {aiRecommendations.recommendedLesson.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    ⏱️ {aiRecommendations.recommendedLesson.readTime} • {aiRecommendations.recommendedLesson.badge}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("learn")}
                  className="mt-4 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Read Lesson Guide →
                </button>
              </div>

              {/* Rec 2: Practice Quiz */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-600 tracking-wider">
                    Recommended Quiz
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">
                    {aiRecommendations.weakestTopic.title} ({aiRecommendations.recommendedQuiz.difficulty})
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Earn up to +{aiRecommendations.recommendedQuiz.xpValue * 3} XP with instant feedback
                  </p>
                </div>
                <button
                  onClick={() => onStartTopicQuiz(aiRecommendations.weakestTopic.id)}
                  className="mt-4 w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold transition-colors"
                >
                  Take Practice Quiz →
                </button>
              </div>

              {/* Rec 3: Real Mission */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-teal-600 tracking-wider">
                    Bridge Theory to Action
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">
                    {aiRecommendations.recommendedMission.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    +{aiRecommendations.recommendedMission.xp} XP • Verified photo submission
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("missions")}
                  className="mt-4 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  Start Field Mission →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* TOPIC MASTERY PROGRESS BARS & ACTIVE MISSIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Col: Topic Mastery Matrix */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">
                  Topic Learning Progress & Mastery
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated based on your quiz accuracy and field mission submissions.
                </p>
              </div>
              <button
                onClick={() => onNavigate("quizzes")}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Boost Scores →
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(currentUser.topicProficiency || {}).map(([topicId, score]) => {
                const topic = topics.find(t => t.id === topicId) || { title: topicId };
                const isWeak = score < 60;

                return (
                  <div key={topicId} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <span>{topic.title}</span>
                        {isWeak && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.2 rounded-full">
                            Needs Practice
                          </span>
                        )}
                      </span>
                      <span className={`font-bold ${isWeak ? "text-rose-600" : "text-emerald-700"}`}>
                        {score}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-400" : "bg-rose-400"
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: Active Missions & Impact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Personal Environmental Impact Box */}
            <div className="bg-emerald-950 text-white p-6 rounded-3xl shadow-md border border-emerald-800 space-y-4">
              <h3 className="text-base font-bold font-heading text-emerald-200">
                Your Cumulative Environmental Impact
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl">🌳</div>
                  <div className="text-lg font-black text-emerald-300 font-heading">
                    {currentUser.impactMetrics?.treesPlanted || 0}
                  </div>
                  <div className="text-[10px] text-emerald-100/80">Trees Planted</div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl">💧</div>
                  <div className="text-lg font-black text-cyan-300 font-heading">
                    {currentUser.impactMetrics?.waterSavedLiters || 0} L
                  </div>
                  <div className="text-[10px] text-emerald-100/80">Water Saved</div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl">♻️</div>
                  <div className="text-lg font-black text-teal-300 font-heading">
                    {currentUser.impactMetrics?.wasteRecycledKg || 0} kg
                  </div>
                  <div className="text-[10px] text-emerald-100/80">Waste Recycled</div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl">🥤</div>
                  <div className="text-lg font-black text-amber-300 font-heading">
                    {currentUser.impactMetrics?.plasticAvoidedItems || 0}
                  </div>
                  <div className="text-[10px] text-emerald-100/80">Plastics Avoided</div>
                </div>
              </div>
            </div>

            {/* Active Missions in Progress */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-bold text-sm text-slate-900 font-heading">
                  Active Missions ({activeMissionsList.length})
                </h4>
                <button
                  onClick={() => onNavigate("missions")}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3">
                {activeMissionsList.length ? (
                  activeMissionsList.map(m => (
                    <div key={m.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{m.title}</div>
                        <div className="text-[11px] text-slate-500">+{m.xp} XP • {m.category}</div>
                      </div>
                      <button
                        onClick={() => onNavigate("missions")}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
                      >
                        Submit
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 py-2">
                    No missions in progress. Explore the Missions page to pick your next green challenge!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY TIMELINE */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-heading text-slate-900 border-b border-slate-100 pb-2">
            Recent Eco Activity History
          </h3>
          <div className="space-y-3">
            {(currentUser.recentActivities || []).map((act, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {act.type === "quiz" ? "🧠" : act.type === "badge" ? "🏆" : "📸"}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">{act.title}</div>
                    <div className="text-[11px] text-slate-500">{act.timestamp}</div>
                  </div>
                </div>

                <div className="text-right">
                  {act.xpEarned > 0 && (
                    <span className="text-xs font-extrabold text-emerald-700">
                      +{act.xpEarned} XP
                    </span>
                  )}
                  {act.status && (
                    <span className="text-[10px] block font-semibold text-slate-500">
                      {act.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
})();

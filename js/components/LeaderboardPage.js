// EcoQuest - Multi-Tier Leaderboard Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.LeaderboardPage = function({ currentUser }) {
    const leaderboards = window.EcoQuestData.leaderboards;
    const [activeTab, setActiveTab] = useState("students"); // "students" | "classes" | "departments" | "colleges"
    const [timeframe, setTimeframe] = useState("all-time"); // "all-time" | "month" | "week"

    const currentData = leaderboards[activeTab] || [];
    const top3 = currentData.slice(0, 3);
    const rest = currentData.slice(3);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Eco Prestige Rankings
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Campus Sustainability Leaderboards
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Track real-time rankings across students, classes, academic departments, and partner institutions.
          </p>
        </div>

        {/* CONTROLS: CATEGORY TABS & TIMEFRAME */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-3xl border border-slate-200/90 shadow-sm">
          {/* Main 4 Tiers */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: "students", label: "Students", icon: "🎒" },
              { id: "classes", label: "Classes", icon: "🏫" },
              { id: "departments", label: "Departments", icon: "🏢" },
              { id: "colleges", label: "Colleges & Schools", icon: "🏛️" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.EcoQuestUtils.audio.playClick();
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/60"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Timeframe Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl self-end sm:self-auto">
            {[
              { id: "all-time", label: "All Time" },
              { id: "month", label: "This Month" },
              { id: "week", label: "This Week" }
            ].map(tf => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  timeframe === tf.id
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* TOP 3 PODIUM (if applicable) */}
        {top3.length >= 3 && (
          <div className="pt-8 pb-4">
            <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 max-w-3xl mx-auto">
              {/* 2nd Place Podium */}
              <div className="w-full sm:w-1/3 order-2 sm:order-1 flex flex-col items-center">
                <div className="text-2xl mb-1">🥈</div>
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md w-full text-center hover:-translate-y-1 transition-transform relative">
                  <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden border-2 border-slate-300 mb-2 shadow-sm">
                    {top3[1].avatar ? (
                      <img src={top3[1].avatar} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">2</div>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                    {top3[1].name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{top3[1].institution || top3[1].grade}</p>
                  <div className="mt-3 py-1 px-3 bg-slate-100 rounded-xl text-xs font-black text-slate-800">
                    {top3[1].xp.toLocaleString()} XP
                  </div>
                </div>
                <div className="w-full h-16 sm:h-20 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-2xl mt-2 flex items-center justify-center font-black text-slate-400 text-lg">
                  2nd
                </div>
              </div>

              {/* 1st Place Podium (TALLER & GLOWING) */}
              <div className="w-full sm:w-1/3 order-1 sm:order-2 flex flex-col items-center -mt-6">
                <div className="text-3xl mb-1 animate-bounce">👑</div>
                <div className="bg-gradient-to-b from-amber-50/60 to-white rounded-3xl p-6 border-2 border-amber-300 shadow-xl w-full text-center hover:-translate-y-1 transition-transform relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full shadow-sm">
                    Champion
                  </span>
                  <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400 mb-2 shadow-md">
                    {top3[0].avatar ? (
                      <img src={top3[0].avatar} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-amber-200 flex items-center justify-center font-bold text-amber-900 text-xl">1</div>
                    )}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 line-clamp-1">
                    {top3[0].name}
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-semibold line-clamp-1">{top3[0].institution || top3[0].grade}</p>
                  <div className="mt-3 py-1.5 px-3 bg-amber-100 border border-amber-200 rounded-xl text-xs font-black text-amber-900">
                    ✨ {top3[0].xp.toLocaleString()} XP
                  </div>
                </div>
                <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-2xl mt-2 flex items-center justify-center font-black text-amber-700 text-xl">
                  1st
                </div>
              </div>

              {/* 3rd Place Podium */}
              <div className="w-full sm:w-1/3 order-3 flex flex-col items-center">
                <div className="text-2xl mb-1">🥉</div>
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md w-full text-center hover:-translate-y-1 transition-transform relative">
                  <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden border-2 border-amber-600/30 mb-2 shadow-sm">
                    {top3[2].avatar ? (
                      <img src={top3[2].avatar} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center font-bold text-orange-900">3</div>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                    {top3[2].name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{top3[2].institution || top3[2].grade}</p>
                  <div className="mt-3 py-1 px-3 bg-amber-50/80 rounded-xl text-xs font-black text-amber-900">
                    {top3[2].xp.toLocaleString()} XP
                  </div>
                </div>
                <div className="w-full h-12 sm:h-16 bg-gradient-to-t from-orange-200/60 to-orange-100/60 rounded-t-2xl mt-2 flex items-center justify-center font-black text-orange-800 text-base">
                  3rd
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RANKINGS TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold text-[10px]">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">{activeTab === "students" ? "Student" : activeTab === "classes" ? "Class" : activeTab === "departments" ? "Department" : "Institution"}</th>
                  <th className="py-4 px-6">Affiliation</th>
                  <th className="py-4 px-6">Missions Done</th>
                  <th className="py-4 px-6">Badges</th>
                  <th className="py-4 px-6 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {currentData.map((item, index) => {
                  const isCurrent = currentUser && item.id === currentUser.id;
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isCurrent
                          ? "bg-emerald-50/90 font-bold border-l-4 border-l-emerald-600"
                          : index % 2 === 0
                          ? "bg-white hover:bg-slate-50/80"
                          : "bg-slate-50/40 hover:bg-slate-50"
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                            item.rank === 1
                              ? "bg-amber-400 text-amber-950 shadow-sm"
                              : item.rank === 2
                              ? "bg-slate-200 text-slate-800"
                              : item.rank === 3
                              ? "bg-amber-700/20 text-amber-900"
                              : "text-slate-500"
                          }`}>
                            {item.rank}
                          </span>
                          <span className={`text-[10px] font-bold ${
                            item.trend?.startsWith("+") ? "text-emerald-600" : item.trend?.startsWith("-") ? "text-rose-500" : "text-slate-400"
                          }`}>
                            {item.trend}
                          </span>
                        </div>
                      </td>

                      {/* Name / Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {item.avatar && (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                            />
                          )}
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-extrabold">YOU</span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{item.grade || item.city || item.head || ""}</div>
                          </div>
                        </div>
                      </td>

                      {/* Affiliation */}
                      <td className="py-4 px-6 text-slate-500">
                        {item.institution || item.city || "Greenwood Network"}
                      </td>

                      {/* Missions */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs">
                          🎯 {item.missionsCompleted}
                        </span>
                      </td>

                      {/* Badges */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs">
                          🏅 {item.badgesCount}
                        </span>
                      </td>

                      {/* XP */}
                      <td className="py-4 px-6 text-right">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-black text-xs">
                          {item.xp.toLocaleString()} XP
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
})();

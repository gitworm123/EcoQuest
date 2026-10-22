// EcoQuest - Eco Mini-Games Hub (3 playable games per environmental topic)
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  function GameCard({ game, progress, isStudent, onPlay }) {
    const bonus = window.EcoQuestData.miniGameRules.firstCompletionBonus;
    return (
      <div className="eq-game-card bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden">
        <div className={`relative h-28 bg-gradient-to-br ${game.gradient} flex items-center justify-center overflow-hidden`}>
          <span className="eq-game-card-icon text-6xl drop-shadow-lg select-none" aria-hidden="true">{game.icon}</span>
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm">
            {game.mechanic}
          </span>
          {progress && (
            <span className="absolute top-3 right-3 bg-emerald-700 text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm">
              ✓ Best {progress.bestPercent}%
            </span>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-base font-extrabold font-heading text-slate-900">{game.title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed mt-1.5 flex-1">{game.description}</p>
          <div className="flex flex-wrap items-center gap-1.5 mt-4 text-[10px] font-bold">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">⏱️ {game.duration}</span>
            {isStudent ? (
              progress ? (
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                  +{progress.totalXpEarned} XP earned • {progress.plays} {progress.plays === 1 ? "play" : "plays"}
                </span>
              ) : (
                <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">✨ Up to +{game.xp + bonus} XP</span>
              )
            ) : (
              <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md">Practice mode</span>
            )}
          </div>
          <button
            onClick={() => onPlay(game.id)}
            className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span>{progress ? "Play Again" : "Play Now"}</span>
            <span>▶</span>
          </button>
        </div>
      </div>
    );
  }

  window.EcoQuestComponents.GamesPage = function({
    currentUser,
    initialTopicId,
    onNavigate,
    onOpenLesson,
    onStartTopicQuiz,
    onGameComplete
  }) {
    const topics = window.EcoQuestData.topics;
    const games = window.EcoQuestData.miniGames;
    const topicEmoji = window.EcoQuestData.topicEmoji;

    const [topicFilter, setTopicFilter] = useState(initialTopicId || "all");
    const [activeGameId, setActiveGameId] = useState(null);

    const isStudent = currentUser && currentUser.role === "student";
    const progress = isStudent ? currentUser.gameProgress || {} : {};
    const completedCount = games.filter(g => progress[g.id]).length;
    const arcadeXp = Object.values(progress).reduce((sum, p) => sum + (p.totalXpEarned || 0), 0);

    const activeGame = games.find(g => g.id === activeGameId);
    const visibleTopics = topicFilter === "all" ? topics : topics.filter(t => t.id === topicFilter);

    const openGame = (gameId) => {
      window.EcoQuestUtils.audio.playClick();
      setActiveGameId(gameId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const backToGames = () => {
      window.EcoQuestUtils.audio.playClick();
      if (activeGame) setTopicFilter(activeGame.topicId);
      setActiveGameId(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ───────── Game player view ─────────
    if (activeGame) {
      const topic = topics.find(t => t.id === activeGame.topicId);
      return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-5">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <button onClick={() => { setActiveGameId(null); setTopicFilter("all"); }} className="hover:text-emerald-700 hover:underline">
              Mini-Games
            </button>
            <span>›</span>
            <button onClick={backToGames} className="hover:text-emerald-700 hover:underline">
              {topicEmoji[topic.id]} {topic.title}
            </button>
            <span>›</span>
            <span className="text-slate-800 font-bold">{activeGame.title}</span>
          </nav>
          <window.EcoQuestGameKit.GameShell
            key={activeGame.id}
            game={activeGame}
            topic={topic}
            currentUser={currentUser}
            onBackToGames={backToGames}
            onOpenLesson={onOpenLesson}
            onGameComplete={onGameComplete}
          />
        </div>
      );
    }

    // ───────── Hub view ─────────
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Eco Arcade
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Interactive Eco Mini-Games
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            {games.length} quick, playable games — three for every environmental topic. Sort, build, match and solve your way to real-world eco knowledge in under two minutes each.
          </p>
        </div>

        {/* PROGRESS STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <span className="text-3xl">🎮</span>
            <div className="flex-1">
              <div className="text-xs text-slate-500 font-semibold">Games completed</div>
              <div className="text-xl font-black font-heading text-emerald-950">{isStudent ? `${completedCount} / ${games.length}` : "—"}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(completedCount / games.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <span className="text-3xl">✨</span>
            <div>
              <div className="text-xs text-slate-500 font-semibold">XP earned from games</div>
              <div className="text-xl font-black font-heading text-amber-900">{isStudent ? `+${arcadeXp} XP` : "—"}</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <span className="text-3xl">📏</span>
            <div className="text-[11px] text-slate-600 leading-snug">
              {isStudent ? (
                <>XP scales with your score. Replays only add XP when you beat your best. Progress is saved in this browser.</>
              ) : (
                <>You're in the teacher role: games run in practice mode. Switch to a student role to earn XP and badges.</>
              )}
            </div>
          </div>
        </div>

        {/* TOPIC FILTER */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm" role="tablist" aria-label="Filter games by topic">
          {[{ id: "all", title: `All Topics (${topics.length})` }, ...topics].map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={topicFilter === t.id}
              onClick={() => { window.EcoQuestUtils.audio.playClick(); setTopicFilter(t.id); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                topicFilter === t.id ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.id === "all" ? "🌍 " : `${topicEmoji[t.id]} `}{t.title}
            </button>
          ))}
        </div>

        {/* TOPIC SECTIONS */}
        {visibleTopics.map(topic => {
          const topicGames = games.filter(g => g.topicId === topic.id);
          const done = topicGames.filter(g => progress[g.id]).length;
          return (
            <section key={topic.id} className="space-y-4" aria-labelledby={`games-${topic.id}`}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl shrink-0">{topicEmoji[topic.id]}</span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold block">{topic.sdgGoal}</span>
                    <h2 id={`games-${topic.id}`} className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900">{topic.title}</h2>
                  </div>
                  {isStudent && (
                    <span className={`ml-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${done === topicGames.length ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                      {done === topicGames.length ? "🎮 Topic cleared" : `${done}/${topicGames.length} done`}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenLesson(topic.id)}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors"
                  >
                    📖 Read Lesson
                  </button>
                  <button
                    onClick={() => onStartTopicQuiz(topic.id)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    ⚡ Topic Quiz
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {topicGames.map(g => (
                  <GameCard key={g.id} game={g} progress={progress[g.id]} isStudent={isStudent} onPlay={openGame} />
                ))}
              </div>
            </section>
          );
        })}

        <div className="text-center">
          <button
            onClick={() => onNavigate("learn")}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            ← Back to the Learn page
          </button>
        </div>
      </div>
    );
  };
})();

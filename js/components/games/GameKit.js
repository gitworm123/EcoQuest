// EcoQuest - Mini-Game Kit (shared shell, HUD, feedback panels & drag/tap helpers)
window.EcoQuestGameKit = window.EcoQuestGameKit || {};
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useEffect, useRef } = React;
  const kit = window.EcoQuestGameKit;

  kit.sfx = {
    click: () => window.EcoQuestUtils.audio.playClick(),
    correct: () => window.EcoQuestUtils.audio.playCorrect(),
    wrong: () => window.EcoQuestUtils.audio.playWrong(),
    xp: () => window.EcoQuestUtils.audio.playXP(),
    win: () => window.EcoQuestUtils.audio.playLevelUp()
  };

  kit.shuffle = function(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  /**
   * Props for a non-<button> element that should behave like a button
   * (needed for draggable tiles, since Firefox won't drag <button> elements).
   */
  kit.pressable = function(onActivate, label) {
    return {
      role: "button",
      tabIndex: 0,
      "aria-label": label,
      onClick: onActivate,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate(e);
        }
      }
    };
  };

  /**
   * Unified drag-and-drop + tap-to-select + keyboard interaction.
   * Mouse users can drag; touch & keyboard users select an item, then a target.
   */
  kit.useDragTap = function(onPlace) {
    const [selected, setSelected] = useState(null);
    const [overTarget, setOverTarget] = useState(null);
    const placeRef = useRef(onPlace);
    placeRef.current = onPlace;

    const place = (itemId, targetId) => {
      setSelected(null);
      setOverTarget(null);
      placeRef.current(itemId, targetId);
    };

    const itemProps = (itemId, label, disabled) => {
      if (disabled) return { "aria-disabled": true };
      return {
        ...kit.pressable(() => {
          kit.sfx.click();
          setSelected(prev => (prev === itemId ? null : itemId));
        }, label),
        draggable: true,
        "aria-pressed": selected === itemId,
        onDragStart: (e) => {
          e.dataTransfer.setData("text/plain", String(itemId));
          e.dataTransfer.effectAllowed = "move";
          setSelected(itemId);
        },
        onDragEnd: () => setOverTarget(null)
      };
    };

    const targetProps = (targetId, label) => ({
      ...kit.pressable(() => {
        if (selected !== null) place(selected, targetId);
      }, label),
      onDragOver: (e) => {
        e.preventDefault();
        if (overTarget !== targetId) setOverTarget(targetId);
      },
      onDragLeave: () => setOverTarget(prev => (prev === targetId ? null : prev)),
      onDrop: (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        if (id) place(id, targetId);
      }
    });

    return { selected, setSelected, overTarget, itemProps, targetProps, place };
  };

  /** Countdown timer that only ticks while `running` is true. */
  kit.useCountdown = function(seconds, running) {
    const [left, setLeft] = useState(seconds);
    useEffect(() => {
      if (!running || left <= 0) return undefined;
      const t = setTimeout(() => setLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    }, [running, left]);
    return left;
  };

  /** Runs `onKey(e)` for keydown events while mounted (ignores typing in inputs). */
  kit.useKeys = function(onKey) {
    const ref = useRef(onKey);
    ref.current = onKey;
    useEffect(() => {
      const handler = (e) => {
        const tag = (e.target && e.target.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
        ref.current(e);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, []);
  };

  /** Score + progress header shown at the top of every game. */
  kit.GameHud = function({ score, current, total, label, extra }) {
    const pct = total ? Math.min(100, Math.round((current / total) * 100)) : 0;
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            {label || `Progress ${current}/${total}`}
          </span>
          <div className="flex items-center gap-2">
            {extra}
            <span key={score} className="eq-pop text-xs font-extrabold bg-amber-100 text-amber-900 px-3 py-1 rounded-full" aria-live="polite">
              ⭐ {score} pts
            </span>
          </div>
        </div>
        <div
          className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Game progress"
        >
          <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
        </div>
      </div>
    );
  };

  kit.TimerPill = function({ seconds }) {
    return (
      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
        seconds <= 10 ? "bg-rose-100 text-rose-700 animate-pulse" : "bg-slate-100 text-slate-700"
      }`}>
        ⏱️ {seconds}s
      </span>
    );
  };

  /** Immediate correct / incorrect / info feedback. */
  kit.Feedback = function({ tone, title, children, onNext, nextLabel }) {
    const styles = {
      good: "bg-emerald-50 border-emerald-300 text-emerald-950",
      bad: "bg-rose-50 border-rose-300 text-rose-950",
      info: "bg-sky-50 border-sky-200 text-sky-950"
    };
    const icons = { good: "✅", bad: "❌", info: "💡" };
    return (
      <div role="status" aria-live="polite" className={`eq-slide-up p-4 rounded-2xl border space-y-2 ${styles[tone] || styles.info}`}>
        <div className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
          <span>{icons[tone] || icons.info}</span>
          <span>{title}</span>
        </div>
        {children && <div className="text-xs leading-relaxed">{children}</div>}
        {onNext && (
          <div className="flex justify-end pt-1">
            <button
              autoFocus
              onClick={() => { kit.sfx.click(); onNext(); }}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              {nextLabel || "Continue"} →
            </button>
          </div>
        )}
      </div>
    );
  };

  /** Between-round card with a learning takeaway. */
  kit.RoundBreak = function({ title, fact, onNext, nextLabel, children }) {
    return (
      <div className="eq-slide-up text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-4">
        <div className="text-4xl">🌱</div>
        <h3 className="text-xl font-extrabold font-heading text-emerald-950">{title}</h3>
        {children}
        {fact && (
          <p className="text-xs sm:text-sm text-emerald-900 bg-white/80 rounded-2xl p-4 border border-emerald-100 max-w-lg mx-auto">
            <strong className="block text-[11px] uppercase tracking-wider text-emerald-700 mb-1">Eco Fact</strong>
            {fact}
          </p>
        )}
        <button
          autoFocus
          onClick={() => { kit.sfx.click(); onNext(); }}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-600/30 transition-all"
        >
          {nextLabel || "Next Round"} →
        </button>
      </div>
    );
  };

  kit.starsFor = function(pct) {
    return pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
  };

  /**
   * GameShell — intro → play → completion flow shared by every mini-game.
   * Each game component receives `{ game, onFinish }` and calls
   * onFinish({ score, maxScore, summary }) exactly once.
   */
  kit.GameShell = function({ game, topic, currentUser, onBackToGames, onOpenLesson, onGameComplete }) {
    const [phase, setPhase] = useState("intro"); // "intro" | "play" | "done"
    const [runId, setRunId] = useState(0);
    const [result, setResult] = useState(null);
    const containerRef = useRef(null);
    const finishedRef = useRef(false);

    const GameComponent = window.EcoQuestGames[game.id];
    const isStudent = currentUser && currentUser.role === "student";
    const progress = isStudent ? (currentUser.gameProgress || {})[game.id] : null;
    const bonus = window.EcoQuestData.miniGameRules.firstCompletionBonus;

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, [phase, runId]);

    const start = () => {
      kit.sfx.click();
      finishedRef.current = false;
      setResult(null);
      setRunId(r => r + 1);
      setPhase("play");
    };

    const finish = ({ score, maxScore, summary }) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      const safeScore = Math.max(0, Math.min(score, maxScore));
      const pct = maxScore ? Math.round((safeScore / maxScore) * 100) : 0;
      const reward = window.EcoQuestUtils.storage.recordGameResult({
        gameId: game.id,
        topicId: game.topicId,
        title: game.title,
        score: safeScore,
        maxScore,
        xpValue: game.xp
      });

      kit.sfx.win();
      if (pct >= 60 && typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      setResult({ score: safeScore, maxScore, pct, summary: summary || [], reward });
      setPhase("done");
      if (onGameComplete) onGameComplete(game, reward);
    };

    if (!GameComponent) {
      return (
        <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center text-sm text-rose-800">
          This game failed to load. Please refresh the page.
        </div>
      );
    }

    return (
      <div ref={containerRef} className="scroll-mt-24 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Title Bar */}
        <div className={`bg-gradient-to-r ${game.gradient} px-5 sm:px-8 py-5 text-white flex items-center justify-between gap-4`}>
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl sm:text-4xl drop-shadow">{game.icon}</span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/80 block">
                {topic.title} • {game.mechanic}
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold font-heading leading-tight drop-shadow-sm">{game.title}</h2>
            </div>
          </div>
          {phase === "play" && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={start}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/35 rounded-xl text-[11px] font-bold backdrop-blur-sm transition-colors"
                title="Restart this game"
              >
                ↺ <span className="hidden sm:inline">Restart</span>
              </button>
              <button
                onClick={onBackToGames}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/35 rounded-xl text-[11px] font-bold backdrop-blur-sm transition-colors"
                title="Quit and go back to the games list (progress in this run is not saved)"
              >
                ✕ <span className="hidden sm:inline">Quit</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-8">
          {/* INTRO */}
          {phase === "intro" && (
            <div className="eq-slide-up space-y-6">
              <p className="text-sm text-slate-700 leading-relaxed">{game.description}</p>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">How to play</h3>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {game.howTo.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 shrink-0 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">⏱️ {game.duration}</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">🖱️ Mouse • 👆 Touch • ⌨️ Keyboard</span>
                {isStudent ? (
                  <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                    ✨ Up to +{game.xp} XP{!progress ? ` (+${bonus} first-time bonus)` : ""}
                  </span>
                ) : (
                  <span className="bg-sky-100 text-sky-900 px-3 py-1 rounded-full">
                    🎓 Practice mode — switch to a student role to earn XP
                  </span>
                )}
                {progress && (
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    🏅 Your best: {progress.bestPercent}% ({progress.plays} {progress.plays === 1 ? "play" : "plays"})
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  autoFocus
                  onClick={start}
                  className="flex-1 sm:flex-initial px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-extrabold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>▶</span>
                  <span>Start Game</span>
                </button>
                <button
                  onClick={onBackToGames}
                  className="px-6 py-3.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-2xl text-xs font-bold transition-colors"
                >
                  ← Back to Games
                </button>
              </div>
            </div>
          )}

          {/* PLAY */}
          {phase === "play" && (
            <GameComponent key={runId} game={game} onFinish={finish} />
          )}

          {/* COMPLETE */}
          {phase === "done" && result && (
            <div className="eq-slide-up space-y-6">
              <div className="text-center space-y-2">
                <div className="text-5xl eq-pop">{result.pct >= 90 ? "🏆" : result.pct >= 60 ? "🌟" : "🌱"}</div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
                  Game Complete
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 pt-1">
                  {result.pct === 100 ? "Perfect Score!" : result.pct >= 80 ? "Excellent Work!" : result.pct >= 50 ? "Nice Effort!" : "Keep Practising!"}
                </h3>
                <div className="text-2xl tracking-widest" aria-label={`${kit.starsFor(result.pct)} out of 3 stars`}>
                  {[1, 2, 3].map(s => (
                    <span key={s} className={s <= kit.starsFor(result.pct) ? "" : "opacity-20 grayscale"}>⭐</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center">
                  <span className="text-xs text-emerald-700 font-semibold block">Final Score</span>
                  <span className="text-3xl font-black text-emerald-950 block mt-1">{result.score}<span className="text-base text-emerald-700">/{result.maxScore}</span></span>
                </div>
                <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-200 text-center">
                  <span className="text-xs text-cyan-700 font-semibold block">Accuracy</span>
                  <span className="text-3xl font-black text-cyan-950 block mt-1">{result.pct}%</span>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-center">
                  <span className="text-xs text-amber-700 font-semibold block">XP Earned</span>
                  {result.reward ? (
                    <>
                      <span className="text-3xl font-black text-amber-950 block mt-1">+{result.reward.xpEarned}</span>
                      <span className="text-[10px] text-amber-700 font-medium block">
                        {result.reward.firstCompletion
                          ? `Includes +${result.reward.bonus} first-completion bonus`
                          : result.reward.xpEarned > 0
                          ? "New personal best — bonus for improving!"
                          : `Beat your best (${result.reward.previousBestPercent}%) to earn more`}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl font-black text-amber-950 block mt-1">Practice</span>
                      <span className="text-[10px] text-amber-700 font-medium block">XP is only awarded to student roles</span>
                    </>
                  )}
                </div>
              </div>

              {result.reward && result.reward.badgeUnlocked && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-emerald-100 border border-amber-300 flex items-center gap-3">
                  <span className="text-3xl">{result.reward.badgeUnlocked.emoji || "🏅"}</span>
                  <div>
                    <div className="text-xs font-bold text-amber-950 uppercase tracking-wide">New Badge Unlocked!</div>
                    <div className="text-sm font-bold text-emerald-900">{result.reward.badgeUnlocked.name}</div>
                    <div className="text-[11px] text-slate-600">{result.reward.badgeUnlocked.description}</div>
                  </div>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">📘 What you learned</div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{game.takeaway}</p>
                {result.summary.length > 0 && (
                  <ul className="space-y-1.5 pt-2 border-t border-white/10">
                    {result.summary.map((line, idx) => (
                      <li key={idx} className="text-[11px] sm:text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-amber-300">↻</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {result.reward && (
                <p className="text-[11px] text-slate-500 text-center">
                  Progress is saved in this browser's local storage for {currentUser.name}. It is not uploaded to a server.
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={onBackToGames}
                    className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    ← Back to Games
                  </button>
                  <button
                    onClick={() => onOpenLesson(game.topicId)}
                    className="px-5 py-3 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    📖 Back to Topic Lesson
                  </button>
                </div>
                <button
                  autoFocus
                  onClick={start}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-600/30 transition-all"
                >
                  🔁 Replay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
})();

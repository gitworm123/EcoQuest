// EcoQuest - Climate Change Mini-Games
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useEffect, useRef } = React;
  const kit = window.EcoQuestGameKit;

  const formatKg = (kg) => (kg === 0 ? "≈ 0 kg" : kg < 1 ? `~${kg} kg` : `~${kg.toLocaleString()} kg`);

  // ───────────── 1. Carbon Footprint Challenge ─────────────
  window.EcoQuestGames["carbon-footprint"] = function({ game, onFinish }) {
    const [rounds] = useState(() =>
      game.content.rounds.map(r => (Math.random() < 0.5 ? r : { ...r, a: r.b, b: r.a }))
    );
    const [idx, setIdx] = useState(0);
    const [choice, setChoice] = useState(null); // "a" | "b"
    const [score, setScore] = useState(0);
    const [yourKg, setYourKg] = useState(0);
    const [bestKg, setBestKg] = useState(0);
    const misses = useRef([]);

    const round = rounds[idx];
    const lowSide = round.a.kg <= round.b.kg ? "a" : "b";
    const maxKg = Math.max(round.a.kg, round.b.kg) || 1;

    const pick = (side) => {
      if (choice) return;
      const ok = side === lowSide;
      setChoice(side);
      setYourKg(k => k + round[side].kg);
      setBestKg(k => k + round[lowSide].kg);
      if (ok) {
        kit.sfx.correct();
        setScore(s => s + 10);
      } else {
        kit.sfx.wrong();
        misses.current.push(`${round.context}: ${round[lowSide].label} (${formatKg(round[lowSide].kg)}) beats ${round[side].label} (${formatKg(round[side].kg)}).`);
      }
    };

    const next = () => {
      if (idx + 1 < rounds.length) {
        setIdx(idx + 1);
        setChoice(null);
      } else {
        onFinish({ score, maxScore: rounds.length * 10, summary: misses.current });
      }
    };

    kit.useKeys((e) => {
      if (choice) return;
      if (e.key === "ArrowLeft") pick("a");
      if (e.key === "ArrowRight") pick("b");
    });

    const card = (side) => {
      const opt = round[side];
      const revealed = !!choice;
      const isLow = side === lowSide;
      const chosen = choice === side;
      return (
        <button
          key={side + idx}
          onClick={() => pick(side)}
          disabled={revealed}
          aria-label={`${opt.label}${side === "a" ? " (left arrow)" : " (right arrow)"}`}
          className={`quiz-option-btn eq-bounce-in flex-1 p-5 rounded-3xl border-2 text-center space-y-2 ${
            !revealed
              ? "bg-white border-slate-200 hover:border-amber-400"
              : isLow
              ? "bg-emerald-50 border-emerald-400"
              : "bg-rose-50 border-rose-300"
          } ${chosen ? "ring-4 ring-offset-2 " + (isLow ? "ring-emerald-300" : "ring-rose-300") : ""}`}
        >
          <div className="text-5xl">{opt.emoji}</div>
          <div className="text-sm font-bold text-slate-900">{opt.label}</div>
          {revealed ? (
            <div className="space-y-1 pt-1">
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${isLow ? "bg-emerald-500" : "bg-rose-500"}`}
                  style={{ width: `${Math.max(3, (opt.kg / maxKg) * 100)}%` }}
                ></div>
              </div>
              <div className={`text-xs font-extrabold ${isLow ? "text-emerald-800" : "text-rose-800"}`}>
                {formatKg(opt.kg)} CO₂e {isLow ? "✓ lower" : ""}
              </div>
            </div>
          ) : (
            <div className="text-[10px] font-bold text-slate-400">{side === "a" ? "← Left" : "Right →"}</div>
          )}
        </button>
      );
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={idx + (choice ? 1 : 0)}
          total={rounds.length}
          label={`Round ${idx + 1}/${rounds.length}`}
          extra={<span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">👣 {Math.round(yourKg * 10) / 10} kg (best {Math.round(bestKg * 10) / 10})</span>}
        />

        <div className="text-center">
          <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-700">Which is lower-carbon?</span>
          <h3 className="text-lg sm:text-xl font-extrabold font-heading text-slate-900">{round.context}</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
          {card("a")}
          <div className="self-center text-xs font-black text-slate-400">VS</div>
          {card("b")}
        </div>

        {choice && (
          <kit.Feedback
            key={idx}
            tone={choice === lowSide ? "good" : "bad"}
            title={choice === lowSide ? "Correct! +10" : `Not quite — ${round[lowSide].label} is lower`}
            onNext={next}
            nextLabel={idx + 1 < rounds.length ? "Next Round" : "See Results"}
          >
            {round.why} <span className="text-slate-500">(Approximate values; real figures vary.)</span>
          </kit.Feedback>
        )}
      </div>
    );
  };

  // ───────────── 2. Climate Match-Up (memory) ─────────────
  const TAG_STYLES = {
    Gas: "bg-sky-100 text-sky-800",
    Activity: "bg-amber-100 text-amber-800",
    Impact: "bg-rose-100 text-rose-800",
    Problem: "bg-slate-200 text-slate-800",
    Solution: "bg-emerald-100 text-emerald-800"
  };

  window.EcoQuestGames["climate-match-up"] = function({ game, onFinish }) {
    const { pairs } = game.content;
    const [cards] = useState(() =>
      kit.shuffle(pairs.flatMap(p => [
        { key: p.id + "-a", pairId: p.id, ...p.a },
        { key: p.id + "-b", pairId: p.id, ...p.b }
      ]))
    );
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [misses, setMisses] = useState(0);
    const [lastPair, setLastPair] = useState(null);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const done = matched.length === pairs.length;
    const bonus = Math.max(0, 20 - 2 * Math.max(0, misses - 6));
    const score = matched.length * 10 + (done ? bonus : 0);

    const flip = (i) => {
      const card = cards[i];
      if (flipped.length === 2 || flipped.includes(i) || matched.includes(card.pairId)) return;
      kit.sfx.click();
      const next = [...flipped, i];
      setFlipped(next);
      if (next.length === 2) {
        const [c1, c2] = next.map(n => cards[n]);
        if (c1.pairId === c2.pairId) {
          kit.sfx.correct();
          setMatched(m => [...m, c1.pairId]);
          setLastPair(pairs.find(p => p.id === c1.pairId));
          setFlipped([]);
        } else {
          setMisses(m => m + 1);
          timer.current = setTimeout(() => {
            kit.sfx.wrong();
            setFlipped([]);
          }, 950);
        }
      }
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={matched.length}
          total={pairs.length}
          label={`Pairs found: ${matched.length}/${pairs.length}`}
          extra={<span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">❌ {misses} misses</span>}
        />

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map((card, i) => {
            const isMatched = matched.includes(card.pairId);
            const isUp = isMatched || flipped.includes(i);
            return (
              <button
                key={card.key}
                onClick={() => flip(i)}
                disabled={isMatched}
                aria-label={isUp ? `${card.tag}: ${card.text}${isMatched ? " (matched)" : ""}` : `Hidden card ${i + 1}`}
                className={`eq-flip-card aspect-[3/4] sm:aspect-[4/3] ${isUp ? "is-flipped" : ""}`}
              >
                <div className="eq-flip-inner">
                  <div className="eq-flip-front rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-md flex items-center justify-center text-2xl sm:text-3xl hover:brightness-110">
                    🌍
                  </div>
                  <div className={`eq-flip-back rounded-2xl border-2 p-1.5 sm:p-2 flex flex-col items-center justify-center gap-1 text-center ${
                    isMatched ? "bg-emerald-50 border-emerald-400" : "bg-white border-orange-300"
                  }`}>
                    <span className={`text-[8px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${TAG_STYLES[card.tag]}`}>{card.tag}</span>
                    <span className="text-lg sm:text-2xl">{card.emoji}</span>
                    <span className="text-[9px] sm:text-xs font-bold text-slate-800 leading-tight">{card.text}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {lastPair && !done && (
          <kit.Feedback key={lastPair.id} tone="good" title={`Match! ${lastPair.a.text} ↔ ${lastPair.b.text} (+10)`}>
            {lastPair.why}
          </kit.Feedback>
        )}

        {done && (
          <kit.RoundBreak
            title={`All pairs matched! Efficiency bonus +${bonus}`}
            fact={lastPair && lastPair.why}
            onNext={() => onFinish({
              score,
              maxScore: pairs.length * 10 + 20,
              summary: misses > 6 ? [`You had ${misses} mismatches. Try remembering card positions — 6 or fewer earns the full bonus.`] : []
            })}
            nextLabel="See Results"
          />
        )}
      </div>
    );
  };

  // ───────────── 3. Build a Climate-Smart City ─────────────
  window.EcoQuestGames["climate-smart-city"] = function({ game, onFinish }) {
    const { budget, target, tiles: TILE, layout, tools, fact } = game.content;
    const [grid, setGrid] = useState(() => layout.map(base => ({ base, current: base })));
    const [tool, setTool] = useState(null);
    const [info, setInfo] = useState({ tone: "info", title: "Pick an upgrade, then tap a tile", text: "Coal plants, car roads and inefficient buildings are the city's biggest emitters. Empty lots can become mini-forests." });
    const [shakeIdx, setShakeIdx] = useState(null);

    const baseEmissions = layout.reduce((sum, t) => sum + TILE[t].emissions, 0);
    const emissions = grid.reduce((sum, t) => sum + TILE[t.current].emissions, 0);
    const spent = grid.reduce((sum, t) => {
      const tl = tools.find(x => x.id === t.current);
      return sum + (t.current !== t.base && tl ? tl.cost : 0);
    }, 0);
    const left = budget - spent;
    const score = Math.max(0, Math.min(100, Math.round((100 * (baseEmissions - emissions)) / baseEmissions)));

    kit.useKeys((e) => { if (e.key === "Escape") setTool(null); });

    const bad = (i, title, text) => {
      kit.sfx.wrong();
      setShakeIdx({ i, key: Date.now() });
      setInfo({ tone: "bad", title, text });
    };

    const clickTile = (i) => {
      const tile = grid[i];
      const upgraded = tile.current !== tile.base;
      if (!tool) {
        if (upgraded) {
          kit.sfx.click();
          const refund = tools.find(t => t.id === tile.current).cost;
          setGrid(g => g.map((t, j) => (j === i ? { ...t, current: t.base } : t)));
          setInfo({ tone: "info", title: `Undone — ${refund} coins refunded`, text: `${TILE[tile.base].label} restored.` });
        } else {
          const fits = tools.filter(t => t.fits.includes(tile.base)).map(t => t.label);
          setInfo({
            tone: "info",
            title: `${TILE[tile.base].emoji} ${TILE[tile.base].label} — ${TILE[tile.base].emissions} emission units`,
            text: fits.length ? `Upgrade options: ${fits.join(" or ")}.` : "Homes stay as they are in this city plan."
          });
        }
        return;
      }
      const tl = tools.find(t => t.id === tool);
      if (upgraded) return bad(i, "Already upgraded", "Tap it with no tool selected to undo, or choose another tile.");
      if (!tl.fits.includes(tile.base)) {
        const where = tl.fits.map(f => TILE[f].label.toLowerCase()).join(" / ");
        return bad(i, `${tl.label} can't go on a ${TILE[tile.base].label.toLowerCase()}`, `${tl.label} only replaces: ${where}.`);
      }
      if (tl.cost > left) return bad(i, "Not enough budget!", `${tl.label} costs ${tl.cost} coins — you have ${left}. Undo a tile or choose a cheaper upgrade.`);
      kit.sfx.correct();
      setGrid(g => g.map((t, j) => (j === i ? { ...t, current: tl.id } : t)));
      setInfo({ tone: "good", title: `${tl.emoji} ${tl.label} built! (−${tl.cost} coins)`, text: tl.why });
    };

    const finish = () => {
      const summary = [];
      if (score < target) summary.push(`Your city reached ${score}/100 — the climate-smart target is ${target}. Tip: replace both coal plants first; they are the biggest emitters.`);
      if (grid.some(t => t.base === "empty" && t.current === "empty") && left >= 5) summary.push("You still had budget and empty lots — mini-forests are a cheap way to absorb CO₂.");
      onFinish({ score, maxScore: 100, summary });
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={score}
          total={100}
          label={`Sustainability ${score}/100 • Target ${target}`}
          extra={<span className={`text-xs font-bold px-3 py-1 rounded-full ${left < 10 ? "bg-rose-100 text-rose-700" : "bg-yellow-100 text-yellow-900"}`}>🪙 {left} coins</span>}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Toolbox */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Toolbox</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {tools.map(t => (
                <button
                  key={t.id}
                  onClick={() => { kit.sfx.click(); setTool(prev => (prev === t.id ? null : t.id)); }}
                  aria-pressed={tool === t.id}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-left transition-all ${
                    tool === t.id ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300/50" : "border-slate-200 bg-white hover:border-amber-300"
                  } ${t.cost > left ? "opacity-50" : ""}`}
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs font-extrabold text-slate-900">{t.label}</span>
                    <span className="block text-[10px] text-slate-500">on {t.fits.map(f => TILE[f].label.toLowerCase()).join(", ")}</span>
                  </span>
                  <span className="text-[11px] font-extrabold text-yellow-800">🪙{t.cost}</span>
                </button>
              ))}
            </div>
          </div>

          {/* City grid */}
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Your city</h3>
              <span className="text-[11px] font-bold text-slate-600">🏭 Emissions: {emissions} / {baseEmissions} units</span>
            </div>
            <div className={`grid grid-cols-4 gap-1.5 sm:gap-2 p-2 rounded-2xl transition-colors duration-700 ${
              score >= target ? "bg-emerald-200" : score >= 40 ? "bg-lime-100" : "bg-stone-300"
            }`}>
              {grid.map((t, i) => {
                const upgraded = t.current !== t.base;
                const td = TILE[t.current];
                return (
                  <button
                    key={i}
                    onClick={() => clickTile(i)}
                    aria-label={`${td.label}${upgraded ? " (upgraded — tap with no tool to undo)" : ""}`}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-all ${
                      upgraded ? "bg-emerald-50 border-emerald-400 eq-pop" : t.base === "empty" ? "bg-amber-100/70 border-amber-200" : td.emissions >= 10 ? "bg-stone-100 border-stone-400" : "bg-white border-slate-200"
                    } ${tool ? "hover:ring-4 hover:ring-amber-300/60 cursor-pointer" : "hover:brightness-95"} ${shakeIdx && shakeIdx.i === i ? "eq-shake" : ""}`}
                  >
                    <span className="text-2xl sm:text-4xl">{t.current === "empty" ? "⬜" : td.emoji}</span>
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-600 leading-tight text-center line-clamp-2">{td.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 relative overflow-hidden" aria-hidden="true">
              <div className={`h-3 rounded-full transition-all duration-500 ${score >= target ? "bg-emerald-500" : "bg-amber-400"}`} style={{ width: `${score}%` }}></div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-slate-800" style={{ left: `${target}%` }}></div>
            </div>
          </div>
        </div>

        <kit.Feedback key={info.title} tone={info.tone} title={info.title}>{info.text}</kit.Feedback>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="text-[11px] text-slate-600">
            {score >= target ? "🎉 Your city is climate-smart! Finish now or keep optimising." : `Reach ${target}+ to make your city climate-smart. ${fact}`}
          </p>
          <button
            onClick={finish}
            className={`shrink-0 px-6 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              score >= target ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            🏁 Finish City
          </button>
        </div>
      </div>
    );
  };
})();

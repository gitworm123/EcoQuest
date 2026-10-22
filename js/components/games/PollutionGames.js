// EcoQuest - Pollution Mini-Games
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useEffect, useRef } = React;
  const kit = window.EcoQuestGameKit;

  // ───────────── 1. Pollution Detective ─────────────
  window.EcoQuestGames["pollution-detective"] = function({ game, onFinish }) {
    const { timeLimit, suspects, cases, fact } = game.content;
    const [caseIdx, setCaseIdx] = useState(0);
    const [solved, setSolved] = useState([]);
    const [wrongThisCase, setWrongThisCase] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [shake, setShake] = useState(null);
    const [over, setOver] = useState(false);
    const misses = useRef({}); // culprit -> review note
    const timeLeft = kit.useCountdown(timeLimit, !over);

    useEffect(() => {
      if (!over && timeLeft <= 0) {
        kit.sfx.wrong();
        setOver(true);
      }
    }, [timeLeft, over]);

    const current = cases[caseIdx];

    const accuse = (s) => {
      if (over || solved.includes(s.id)) return;
      if (s.id === current.culprit) {
        const pts = wrongThisCase === 0 ? 10 : 5;
        kit.sfx.correct();
        setScore(sc => sc + pts);
        setSolved(v => [...v, s.id]);
        setFeedback({ tone: "good", title: `Case solved: ${s.label} — ${s.type} pollution (+${pts})`, text: current.why, key: s.id });
        setWrongThisCase(0);
        if (caseIdx + 1 < cases.length) setCaseIdx(caseIdx + 1);
        else setOver(true);
      } else {
        kit.sfx.wrong();
        misses.current[current.culprit] = `"${current.clue}" → ${suspects.find(x => x.id === current.culprit).label}. ${current.why}`;
        setWrongThisCase(w => w + 1);
        setShake({ id: s.id, key: Date.now() });
        setFeedback({
          tone: "bad",
          title: s.type ? `Not this one — the ${s.label.toLowerCase()} causes ${s.type.toLowerCase()} pollution, but doesn't match this clue` : `Innocent! The ${s.label.toLowerCase()} isn't polluting`,
          text: "Re-read the clue: what kind of pollution is described, and where would it come from?",
          key: s.id + Date.now()
        });
      }
    };

    const unsolved = cases.slice(caseIdx).filter(c => !solved.includes(c.culprit));

    return (
      <div className="space-y-4">
        <kit.GameHud
          score={score}
          current={solved.length}
          total={cases.length}
          label={`Cases solved: ${solved.length}/${cases.length}`}
          extra={<kit.TimerPill seconds={timeLeft} />}
        />

        {!over && (
          <div className="eq-slide-up p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3" key={caseIdx} aria-live="polite">
            <span className="text-3xl">🕵️</span>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-amber-700">Case file #{caseIdx + 1}</div>
              <p className="text-sm font-bold text-amber-950">{current.clue}</p>
            </div>
          </div>
        )}

        {/* Town scene */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-slate-300 select-none">
          <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <rect width="160" height="40" fill="#cbd5e1" />
            <rect y="38" width="160" height="52" fill="#86efac" />
            <path d="M0,58 C30,52 50,70 80,66 S130,80 160,72 L160,90 L0,90 Z" fill="#60a5fa" />
            <path d="M0,62 C30,56 50,74 80,70 S130,84 160,76" stroke="#bfdbfe" strokeWidth="0.6" fill="none" />
            <rect x="0" y="44" width="160" height="5" fill="#94a3b8" />
            <line x1="0" y1="46.5" x2="160" y2="46.5" stroke="#f8fafc" strokeWidth="0.4" strokeDasharray="3 3" />
            <rect x="120" y="12" width="40" height="28" fill="#bef264" opacity="0.7" />
          </svg>
          {suspects.map(s => {
            const isSolved = solved.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => accuse(s)}
                disabled={over || isSolved}
                aria-label={`${s.label}${isSolved ? " — solved" : ""}`}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-xl px-1 py-0.5 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                  isSolved ? "bg-emerald-100/90 ring-2 ring-emerald-500" : "hover:bg-white/60 hover:scale-110"
                } ${shake && shake.id === s.id ? "eq-shake" : ""}`}
              >
                <span className={`text-2xl sm:text-4xl ${isSolved ? "grayscale-0" : ""}`}>{s.emoji}</span>
                <span className="text-[8px] sm:text-[10px] font-extrabold text-slate-800 bg-white/80 rounded px-1 leading-tight whitespace-nowrap">
                  {isSolved ? `✓ ${s.type}` : s.label}
                </span>
              </button>
            );
          })}
        </div>

        {feedback && !over && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {over && (
          <kit.RoundBreak
            title={solved.length === cases.length ? "All cases closed! 🔍" : `Time's up! ${solved.length}/${cases.length} cases solved`}
            fact={fact}
            onNext={() => onFinish({
              score,
              maxScore: cases.length * 10,
              summary: [
                ...Object.values(misses.current),
                ...unsolved
                  .filter(c => !misses.current[c.culprit])
                  .map(c => `Unsolved: "${c.clue}" → ${suspects.find(x => x.id === c.culprit).label}. ${c.why}`)
              ]
            })}
            nextLabel="See Results"
          />
        )}
      </div>
    );
  };

  // ───────────── 2. Clean Air Challenge ─────────────
  const AQI_BANDS = [
    { max: 50, label: "Good", color: "#22c55e", sky: "#bae6fd" },
    { max: 100, label: "Satisfactory", color: "#84cc16", sky: "#cbe9f5" },
    { max: 200, label: "Moderate", color: "#eab308", sky: "#e2e8d0" },
    { max: 300, label: "Poor", color: "#f97316", sky: "#d6cbb5" },
    { max: 400, label: "Very Poor", color: "#ef4444", sky: "#b8a99a" },
    { max: 9999, label: "Severe", color: "#7f1d1d", sky: "#8c7b70" }
  ];
  const bandFor = (aqi) => AQI_BANDS.find(b => aqi <= b.max);
  const TIER_POINTS = [0, 8, 15];

  window.EcoQuestGames["clean-air-challenge"] = function({ game, onFinish }) {
    const { startAqi, targetAqi, decisions, fact } = game.content;
    const [deck] = useState(() => decisions.map(d => ({ ...d, options: kit.shuffle(d.options) })));
    const [idx, setIdx] = useState(0);
    const [aqi, setAqi] = useState(startAqi);
    const [score, setScore] = useState(0);
    const [chosen, setChosen] = useState(null);
    const misses = useRef([]);

    const d = deck[idx];
    const band = bandFor(aqi);
    const best = d.options.find(o => o.tier === 2);

    const choose = (i) => {
      if (chosen !== null) return;
      const opt = d.options[i];
      setChosen(i);
      setAqi(a => Math.max(20, Math.min(500, a + opt.effect)));
      setScore(s => s + TIER_POINTS[opt.tier]);
      if (opt.tier === 2) kit.sfx.correct();
      else if (opt.tier === 1) kit.sfx.click();
      else kit.sfx.wrong();
      if (opt.tier < 2) misses.current.push(`${d.situation} Best: "${best.label}". ${d.why}`);
    };

    kit.useKeys((e) => {
      const i = Number(e.key) - 1;
      if (chosen === null && i >= 0 && i < d.options.length) choose(i);
    });

    const next = () => {
      if (idx + 1 < deck.length) {
        setIdx(idx + 1);
        setChosen(null);
      } else {
        const bonus = aqi <= targetAqi ? 10 : 0;
        onFinish({
          score: score + bonus,
          maxScore: deck.length * TIER_POINTS[2] + 10,
          summary: [...misses.current, aqi <= targetAqi ? `Target reached: final AQI ${aqi} (+10 bonus).` : `Final AQI ${aqi} — the target was ${targetAqi} or below.`]
        });
      }
    };

    const markerPct = Math.min(100, (aqi / 500) * 100);
    const opt = chosen !== null ? d.options[chosen] : null;

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={idx + (chosen !== null ? 1 : 0)} total={deck.length} label={`Decision ${idx + 1}/${deck.length}`} />

        {/* City & AQI meter */}
        <div className="rounded-3xl overflow-hidden border-2 border-slate-200">
          <div className="relative h-32 sm:h-40 transition-colors duration-700" style={{ backgroundColor: band.sky }}>
            <div className="absolute top-3 left-4 text-3xl" style={{ opacity: Math.max(0.25, 1 - aqi / 400) }}>☀️</div>
            <div
              className="absolute inset-0 transition-opacity duration-700 eq-smog"
              style={{ opacity: Math.min(0.85, Math.max(0, (aqi - 50) / 350)) }}
              aria-hidden="true"
            ></div>
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around text-3xl sm:text-4xl" aria-hidden="true">
              <span>🏢</span><span>🏫</span><span>🌳</span><span>🏬</span><span>🏠</span><span>🌳</span><span>🏥</span>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 rounded-2xl px-3 py-2 text-center shadow">
              <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">AQI</div>
              <div key={aqi} className="eq-pop text-2xl font-black" style={{ color: band.color }}>{aqi}</div>
              <div className="text-[10px] font-extrabold" style={{ color: band.color }}>{band.label}</div>
            </div>
          </div>
          <div className="p-3 bg-white">
            <div className="relative h-3 rounded-full overflow-hidden flex" aria-hidden="true">
              {AQI_BANDS.map((b, i) => {
                const prev = i === 0 ? 0 : AQI_BANDS[i - 1].max;
                const width = (Math.min(b.max, 500) - prev) / 5;
                return <div key={b.label} style={{ width: `${width}%`, backgroundColor: b.color }}></div>;
              })}
            </div>
            <div className="relative h-4">
              <div className="absolute -top-1 -translate-x-1/2 text-xs transition-all duration-700" style={{ left: `${markerPct}%` }}>▲</div>
              <div className="absolute -top-1 -translate-x-1/2 text-[9px] font-bold text-slate-500" style={{ left: `${(targetAqi / 500) * 100}%` }}>|goal</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl">{d.emoji}</div>
          <h3 className="text-base sm:text-lg font-extrabold font-heading text-slate-900">{d.situation}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {d.options.map((o, i) => {
            const isChosen = chosen === i;
            const reveal = chosen !== null;
            return (
              <button
                key={o.label}
                onClick={() => choose(i)}
                disabled={reveal}
                className={`quiz-option-btn p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold flex items-start gap-2 ${
                  !reveal
                    ? "bg-white border-slate-200 hover:border-sky-400 text-slate-800"
                    : o.tier === 2
                    ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                    : isChosen
                    ? "bg-rose-50 border-rose-300 text-rose-950"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                } ${isChosen ? "ring-4 ring-sky-200" : ""}`}
              >
                <kbd className="eq-kbd shrink-0">{i + 1}</kbd>
                <span className="flex-1">{o.label}</span>
                {reveal && (
                  <span className={`shrink-0 text-[11px] font-extrabold ${o.effect <= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                    {o.effect > 0 ? `+${o.effect}` : o.effect}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {opt && (
          <kit.Feedback
            key={idx}
            tone={opt.tier === 2 ? "good" : opt.tier === 1 ? "info" : "bad"}
            title={opt.tier === 2 ? `Cleanest choice! AQI ${opt.effect} (+15)` : opt.tier === 1 ? `Helps a little: AQI ${opt.effect} (+8)` : `That made the air worse: AQI +${opt.effect}`}
            onNext={next}
            nextLabel={idx + 1 < deck.length ? "Next Decision" : "See Results"}
          >
            {d.why}
            {idx + 1 === deck.length && <span className="block mt-1 font-semibold">{fact}</span>}
          </kit.Feedback>
        )}
      </div>
    );
  };

  // ───────────── 3. Pollution Sorting Game ─────────────
  window.EcoQuestGames["pollution-sorting"] = function({ game, onFinish }) {
    const { types, scenarios, fact } = game.content;
    const [deck] = useState(() => kit.shuffle(scenarios));
    const [idx, setIdx] = useState(0);
    const [step, setStep] = useState("type"); // "type" | "measure" | "review"
    const [typeOk, setTypeOk] = useState(null);
    const [measure, setMeasure] = useState(null);
    const [score, setScore] = useState(0);
    const [columns, setColumns] = useState({}); // typeId -> [{ scenario, ok }]
    const [shake, setShake] = useState(null);
    const misses = useRef([]);

    const sc = deck[idx];

    const classify = (scId, typeId) => {
      if (step !== "type" || String(scId) !== sc.id) return;
      const ok = typeId === sc.type;
      if (ok) {
        kit.sfx.correct();
        setScore(s => s + 5);
      } else {
        kit.sfx.wrong();
        setShake({ id: typeId, key: Date.now() });
        misses.current.push(`"${sc.text}" is ${sc.type} pollution.`);
      }
      setTypeOk(ok);
      setColumns(c => ({ ...c, [sc.type]: [...(c[sc.type] || []), { id: sc.id, emoji: sc.emoji, ok }] }));
      setStep("measure");
    };

    const dnd = kit.useDragTap(classify);

    const pickMeasure = (i) => {
      if (step !== "measure") return;
      setMeasure(i);
      if (i === sc.answer) {
        kit.sfx.correct();
        setScore(s => s + 5);
      } else {
        kit.sfx.wrong();
        misses.current.push(`Best prevention for "${sc.text}": ${sc.options[sc.answer]}.`);
      }
      setStep("review");
    };

    kit.useKeys((e) => {
      if (step === "type") {
        const t = types.find(x => x.key === e.key);
        if (t) classify(sc.id, t.id);
      } else if (step === "measure") {
        const i = Number(e.key) - 1;
        if (i >= 0 && i < sc.options.length) pickMeasure(i);
      }
    });

    const next = () => {
      if (idx + 1 < deck.length) {
        setIdx(idx + 1);
        setStep("type");
        setTypeOk(null);
        setMeasure(null);
      } else {
        onFinish({ score, maxScore: deck.length * 10, summary: misses.current });
      }
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={idx + (step === "review" ? 1 : 0)}
          total={deck.length}
          label={`Scenario ${idx + 1}/${deck.length} • Step ${step === "type" ? "1: Classify" : "2: Prevent"}`}
        />

        {/* Scenario card */}
        <div className="flex justify-center">
          <div
            key={sc.id}
            {...(step === "type" ? dnd.itemProps(sc.id, `Scenario: ${sc.text}. Select, then choose a pollution type.`) : {})}
            className={`eq-bounce-in max-w-md w-full rounded-3xl bg-white border-2 shadow-lg p-5 text-center ${
              step === "type" ? "eq-draggable " + (dnd.selected === sc.id ? "border-emerald-500 ring-4 ring-emerald-300/40" : "border-slate-200") : "border-slate-200"
            }`}
          >
            <div className="text-4xl">{sc.emoji}</div>
            <p className="text-sm sm:text-base font-bold text-slate-900 mt-1">{sc.text}</p>
            {step === "type" && <p className="text-[10px] text-slate-400 mt-1">Drag me to a column, tap a column, or press 1–4</p>}
          </div>
        </div>

        {/* Type columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {types.map(t => (
            <div
              key={t.id}
              {...(step === "type"
                ? { ...dnd.targetProps(t.id, `${t.label} pollution (key ${t.key})`), ...kit.pressable(() => classify(sc.id, t.id), `${t.label} pollution (key ${t.key})`) }
                : {})}
              className={`rounded-2xl border-2 p-3 min-h-[96px] transition-all ${
                step === "type"
                  ? dnd.overTarget === t.id
                    ? "border-emerald-500 bg-emerald-50 scale-[1.03] cursor-pointer"
                    : "border-slate-300 bg-slate-50 hover:border-emerald-400 cursor-pointer"
                  : "border-slate-200 bg-slate-50/60"
              } ${shake && shake.id === t.id ? "eq-shake" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">{t.emoji} {t.label}</span>
                <kbd className="eq-kbd">{t.key}</kbd>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {(columns[t.id] || []).map(c => (
                  <span key={c.id} className={`eq-pop text-lg rounded-lg px-1 ${c.ok ? "bg-emerald-100" : "bg-amber-100"}`} title={c.ok ? "Sorted correctly" : "Moved here after a mistake"}>
                    {c.emoji}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {step !== "type" && (
          <div className="eq-slide-up space-y-3">
            <div className={`text-xs font-bold px-3 py-2 rounded-xl ${typeOk ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}>
              {typeOk ? `✅ Correct — this is ${sc.type} pollution (+5)` : `❌ This is actually ${sc.type} pollution`}
            </div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Step 2: Choose the best prevention measure</h4>
            <div className="space-y-2">
              {sc.options.map((o, i) => {
                const reveal = step === "review";
                return (
                  <button
                    key={o}
                    autoFocus={i === 0 && step === "measure"}
                    onClick={() => pickMeasure(i)}
                    disabled={reveal}
                    className={`quiz-option-btn w-full p-3 rounded-2xl border-2 text-left text-xs sm:text-sm font-medium flex items-center gap-2 ${
                      !reveal
                        ? "bg-white border-slate-200 hover:border-emerald-400 text-slate-800"
                        : i === sc.answer
                        ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold"
                        : measure === i
                        ? "bg-rose-50 border-rose-300 text-rose-950"
                        : "bg-slate-50 border-slate-200 text-slate-400"
                    }`}
                  >
                    <kbd className="eq-kbd shrink-0">{i + 1}</kbd>
                    <span>{o}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "review" && (
          <kit.Feedback
            key={sc.id}
            tone={measure === sc.answer ? "good" : "bad"}
            title={measure === sc.answer ? "Great prevention choice! (+5)" : "Better option highlighted in green"}
            onNext={next}
            nextLabel={idx + 1 < deck.length ? "Next Scenario" : "See Results"}
          >
            {sc.why}
            {idx + 1 === deck.length && <span className="block mt-1 font-semibold">{fact}</span>}
          </kit.Feedback>
        )}
      </div>
    );
  };
})();

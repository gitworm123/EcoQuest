// EcoQuest - Renewable Energy Mini-Games
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useRef } = React;
  const kit = window.EcoQuestGameKit;

  const PAIR_COLORS = [
    "bg-amber-100 border-amber-400 text-amber-950",
    "bg-sky-100 border-sky-400 text-sky-950",
    "bg-emerald-100 border-emerald-400 text-emerald-950",
    "bg-rose-100 border-rose-400 text-rose-950",
    "bg-violet-100 border-violet-400 text-violet-950",
    "bg-teal-100 border-teal-400 text-teal-950"
  ];

  // ───────────── 1. Energy Source Matcher ─────────────
  window.EcoQuestGames["energy-source-matcher"] = function({ game, onFinish }) {
    const { pairs, fact } = game.content;
    const [left] = useState(() => kit.shuffle(pairs));
    const [right] = useState(() => kit.shuffle(pairs));
    const [matched, setMatched] = useState({}); // id -> color index
    const [attempts, setAttempts] = useState({});
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [shake, setShake] = useState(null);
    const misses = useRef([]);

    const count = Object.keys(matched).length;
    const done = count === pairs.length;

    const connect = (sourceId, descId) => {
      const src = pairs.find(p => p.id === String(sourceId));
      if (!src || matched[src.id] !== undefined || matched[descId] !== undefined) return;
      const tries = attempts[src.id] || 0;
      if (src.id === descId) {
        const pts = tries === 0 ? 10 : 5;
        kit.sfx.correct();
        setScore(s => s + pts);
        setMatched(m => ({ ...m, [src.id]: Object.keys(m).length % PAIR_COLORS.length }));
        setFeedback({ tone: "good", title: `${src.emoji} ${src.source} connected! (+${pts})`, text: src.why, key: src.id });
      } else {
        kit.sfx.wrong();
        if (tries === 0) misses.current.push(`${src.source}: ${src.desc}`);
        setAttempts(a => ({ ...a, [src.id]: tries + 1 }));
        setShake({ id: descId, key: Date.now() });
        setFeedback({ tone: "bad", title: `That's not how ${src.source} works`, text: "Read the description again — what natural force or material is it using?", key: src.id + tries });
      }
    };

    const dnd = kit.useDragTap(connect);

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={count} total={pairs.length} label={`Connections: ${count}/${pairs.length}`} />
        <p className="text-[11px] text-center text-slate-500">
          {dnd.selected ? "Now choose the matching description →" : "Select an energy source (or drag it onto a description)."}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="space-y-2">
            {left.map(p => {
              const colorIdx = matched[p.id];
              const isDone = colorIdx !== undefined;
              return (
                <div
                  key={p.id}
                  {...dnd.itemProps(p.id, `${p.source}. Select, then choose its description.`, isDone)}
                  className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all ${
                    isDone
                      ? PAIR_COLORS[colorIdx] + " eq-pop"
                      : dnd.selected === p.id
                      ? "bg-white border-emerald-500 ring-4 ring-emerald-300/40 eq-draggable"
                      : "bg-white border-slate-200 hover:border-amber-400 eq-draggable"
                  }`}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="flex-1">{p.source}</span>
                  {isDone && <span>🔗</span>}
                </div>
              );
            })}
          </div>
          <div className="space-y-2">
            {right.map(p => {
              const colorIdx = matched[p.id];
              const isDone = colorIdx !== undefined;
              return (
                <div
                  key={p.id}
                  {...(isDone ? {} : dnd.targetProps(p.id, `Description: ${p.desc}`))}
                  className={`p-2.5 sm:p-3 rounded-2xl border-2 text-[11px] sm:text-xs leading-snug font-medium transition-all min-h-[52px] flex items-center ${
                    isDone
                      ? PAIR_COLORS[colorIdx]
                      : dnd.overTarget === p.id
                      ? "bg-emerald-50 border-emerald-500"
                      : dnd.selected
                      ? "bg-white border-dashed border-emerald-300 cursor-pointer hover:bg-emerald-50"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  } ${shake && shake.id === p.id ? "eq-shake" : ""}`}
                >
                  {p.desc}
                </div>
              );
            })}
          </div>
        </div>

        {feedback && !done && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {done && (
          <kit.RoundBreak
            title="All sources connected! ⚡"
            fact={fact}
            onNext={() => onFinish({ score, maxScore: pairs.length * 10, summary: misses.current })}
            nextLabel="See Results"
          />
        )}
      </div>
    );
  };

  // ───────────── 2. Build the Solar System ─────────────
  const LEVEL_POINTS = [50, 35, 20];

  window.EcoQuestGames["build-solar-system"] = function({ game, onFinish }) {
    const { parts, levels, fact } = game.content;
    const [levelIdx, setLevelIdx] = useState(0);
    const level = levels[levelIdx];
    const [slots, setSlots] = useState(() => level.sequence.map(() => null));
    const [tests, setTests] = useState(0);
    const [powered, setPowered] = useState(false);
    const [wrongSlots, setWrongSlots] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const misses = useRef([]);

    const used = slots.filter(Boolean);
    const tray = level.tray.filter(id => !used.includes(id));
    const allFilled = slots.every(Boolean);

    const putInSlot = (partId, slotIdx) => {
      if (powered) return;
      const id = String(partId);
      if (!parts[id] || used.includes(id)) return;
      kit.sfx.click();
      setSlots(s => s.map((v, i) => (i === slotIdx ? id : v)));
      setWrongSlots(w => w.filter(i => i !== slotIdx));
      setFeedback(null);
    };

    const dnd = kit.useDragTap((partId, slotIdx) => putInSlot(partId, Number(slotIdx)));

    const clearSlot = (i) => {
      if (powered || !slots[i]) return;
      kit.sfx.click();
      setSlots(s => s.map((v, j) => (j === i ? null : v)));
      setWrongSlots(w => w.filter(x => x !== i));
    };

    const test = () => {
      const wrong = slots.map((id, i) => (id === level.sequence[i] ? null : i)).filter(i => i !== null);
      if (wrong.length === 0) {
        const pts = LEVEL_POINTS[Math.min(tests, LEVEL_POINTS.length - 1)];
        kit.sfx.xp();
        setScore(s => s + pts);
        setPowered(true);
        setWrongSlots([]);
        setFeedback({ tone: "good", title: `It works! Power is flowing (+${pts})`, text: level.why });
      } else {
        kit.sfx.wrong();
        setTests(t => t + 1);
        setWrongSlots(wrong);
        const first = wrong[0];
        const placed = slots[first];
        const need = parts[level.sequence[first]];
        if (tests === 0) misses.current.push(`${level.title}: correct order is ${level.sequence.map(id => parts[id].label).join(" → ")}.`);
        setFeedback({
          tone: "bad",
          title: `No power — ${wrong.length} part${wrong.length > 1 ? "s" : ""} in the wrong place`,
          text: placed === "diesel"
            ? "A diesel generator burns fossil fuel — it doesn't belong in a solar kit!"
            : `Hint: slot ${first + 1} needs the part that does this — ${need.desc}`
        });
      }
    };

    const nextLevel = () => {
      const next = levelIdx + 1;
      if (next < levels.length) {
        setLevelIdx(next);
        setSlots(levels[next].sequence.map(() => null));
        setTests(0);
        setPowered(false);
        setWrongSlots([]);
        setFeedback(null);
      } else {
        onFinish({ score, maxScore: levels.length * LEVEL_POINTS[0], summary: misses.current });
      }
    };

    const load = parts[level.sequence[level.sequence.length - 1]];

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={levelIdx + (powered ? 1 : 0)}
          total={levels.length}
          label={level.title}
          extra={<span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">🧪 Tests: {tests + (powered ? 1 : 0)}</span>}
        />

        {/* Circuit */}
        <div className={`rounded-3xl p-4 sm:p-5 border-2 transition-colors duration-700 ${powered ? "bg-amber-50 border-amber-300" : "bg-slate-900 border-slate-700"}`}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <div className={`flex flex-col items-center px-2 ${powered ? "" : "opacity-80"}`}>
              <span className={`text-3xl sm:text-4xl ${powered ? "eq-spin-slow" : ""}`}>☀️</span>
              <span className={`text-[10px] font-bold ${powered ? "text-amber-800" : "text-slate-300"}`}>Sunlight</span>
            </div>
            {slots.map((partId, i) => {
              const part = partId ? parts[partId] : null;
              const wrong = wrongSlots.includes(i);
              return (
                <React.Fragment key={i}>
                  <span className={`eq-wire w-5 sm:w-8 h-1.5 rounded-full ${powered ? "is-live" : "bg-slate-600"}`} aria-hidden="true"></span>
                  <div
                    {...(part
                      ? kit.pressable(() => clearSlot(i), `Slot ${i + 1}: ${part.label}. Activate to remove.`)
                      : dnd.targetProps(i, `Empty slot ${i + 1}`))}
                    className={`w-[74px] sm:w-24 min-h-[84px] rounded-2xl border-2 flex flex-col items-center justify-center p-1.5 text-center transition-all ${
                      part
                        ? powered
                          ? "bg-white border-emerald-400"
                          : wrong
                          ? "bg-rose-50 border-rose-400 eq-shake cursor-pointer"
                          : "bg-white border-sky-300 cursor-pointer hover:border-rose-300"
                        : dnd.overTarget === i
                        ? "border-amber-400 bg-amber-100/20 scale-105"
                        : dnd.selected
                        ? "border-dashed border-amber-300 cursor-pointer animate-pulse"
                        : "border-dashed border-slate-500"
                    }`}
                  >
                    {part ? (
                      <>
                        <span className={`text-2xl sm:text-3xl ${powered && partId === "acfan" ? "eq-spin" : ""} ${powered && partId === "dclamp" ? "eq-glow" : ""}`}>{part.emoji}</span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight">{part.label}</span>
                      </>
                    ) : (
                      <span className={`text-[10px] font-bold ${powered ? "text-amber-700" : "text-slate-400"}`}>Slot {i + 1}</span>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <p className={`text-center text-[11px] mt-3 ${powered ? "text-amber-800 font-bold" : "text-slate-400"}`}>
            {powered ? `⚡ The ${load.label} is running on sunshine!` : `Goal: power the ${load.label}.`}
          </p>
        </div>

        {!powered && (
          <>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">Parts tray</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tray.map(id => (
                  <div
                    key={id}
                    {...dnd.itemProps(id, `${parts[id].label}: ${parts[id].desc}`)}
                    className={`eq-draggable flex items-center gap-2 p-2.5 rounded-xl border-2 bg-white ${
                      dnd.selected === id ? "border-emerald-500 ring-4 ring-emerald-300/40" : "border-slate-200 hover:border-amber-400"
                    }`}
                  >
                    <span className="text-2xl">{parts[id].emoji}</span>
                    <span className="min-w-0">
                      <span className="block text-xs font-extrabold text-slate-900">{parts[id].label}</span>
                      <span className="block text-[10px] text-slate-500 leading-tight">{parts[id].desc}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={test}
                disabled={!allFilled}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-extrabold shadow-md shadow-amber-500/30 transition-all"
              >
                ⚡ Switch ON
              </button>
            </div>
          </>
        )}

        {feedback && (
          <kit.Feedback
            key={feedback.title}
            tone={feedback.tone}
            title={feedback.title}
            onNext={powered ? nextLevel : null}
            nextLabel={levelIdx + 1 < levels.length ? "Next Level" : "See Results"}
          >
            {feedback.text}
            {powered && levelIdx + 1 === levels.length && <span className="block mt-1 font-semibold">{fact}</span>}
          </kit.Feedback>
        )}
      </div>
    );
  };

  // ───────────── 3. Power the City ─────────────
  const SOURCES = [
    { id: "solar", label: "Solar", emoji: "☀️" },
    { id: "wind", label: "Wind", emoji: "🌬️" },
    { id: "hydro", label: "Hydro", emoji: "💧" },
    { id: "battery", label: "Battery", emoji: "🔋" }
  ];

  window.EcoQuestGames["power-the-city"] = function({ game, onFinish }) {
    const { batteryCapacity, hydroReservoir, hydroPerRound, step, rounds, fact } = game.content;
    const [idx, setIdx] = useState(0);
    const [set, setSet] = useState({ solar: 0, wind: 0, hydro: 0, battery: 0 });
    const [battery, setBattery] = useState(0);
    const [hydroLeft, setHydroLeft] = useState(hydroReservoir);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null);
    const log = useRef([]);

    const round = rounds[idx];
    const caps = {
      solar: round.solar,
      wind: round.wind,
      hydro: Math.min(hydroPerRound, hydroLeft),
      battery: battery
    };
    const supply = set.solar + set.wind + set.hydro + set.battery;
    const diff = supply - round.demand;

    const adjust = (id, delta) => {
      if (result) return;
      kit.sfx.click();
      setSet(s => ({ ...s, [id]: Math.max(0, Math.min(caps[id], s[id] + delta)) }));
    };

    const lockIn = () => {
      const newHydro = hydroLeft - set.hydro;
      let newBattery = battery - set.battery;
      let pts, tone, title, text;
      if (supply < round.demand) {
        kit.sfx.wrong();
        pts = 0; tone = "bad";
        title = `Blackout! Short by ${round.demand - supply} MW`;
        text = "The city needed more power. Tip: store surplus solar at noon and save hydro for the evening peak.";
        log.current.push(`${round.time}: blackout — supply ${supply} MW vs demand ${round.demand} MW.`);
      } else {
        const surplus = supply - round.demand;
        const charge = Math.min(surplus, batteryCapacity - newBattery);
        const wasted = surplus - charge;
        newBattery += charge;
        if (wasted > 0) {
          kit.sfx.click();
          pts = 15; tone = "info";
          title = `Lights on — but ${wasted} MW wasted (+15)`;
          text = `The battery was full, so ${wasted} MW had to be curtailed. Matching supply to demand avoids waste.`;
          log.current.push(`${round.time}: ${wasted} MW wasted because the battery was full.`);
        } else {
          kit.sfx.correct();
          pts = 25; tone = "good";
          title = charge > 0 ? `Lights on! ${charge} MW stored in the battery (+25)` : "Lights on — perfectly balanced! (+25)";
          text = round.fact;
        }
      }
      setScore(s => s + pts);
      setHydroLeft(newHydro);
      setBattery(newBattery);
      setResult({ tone, title, text });
    };

    const next = () => {
      if (idx + 1 < rounds.length) {
        setIdx(idx + 1);
        setSet({ solar: 0, wind: 0, hydro: 0, battery: 0 });
        setResult(null);
      } else {
        onFinish({ score, maxScore: rounds.length * 25, summary: log.current });
      }
    };

    const gaugePct = Math.min(100, (supply / (round.demand * 1.5)) * 100);
    const demandPct = (round.demand / (round.demand * 1.5)) * 100;

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={idx + (result ? 1 : 0)} total={rounds.length} label={`${round.emoji} ${round.time} — ${round.label} (${idx + 1}/${rounds.length})`} />

        <div className={`rounded-3xl p-4 sm:p-5 border-2 ${idx === 3 ? "bg-indigo-950 border-indigo-800 text-white" : idx === 2 ? "bg-orange-50 border-orange-200" : "bg-sky-50 border-sky-200"}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{idx === 3 ? "🌃" : "🏙️"}</span>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-extrabold opacity-70">City demand</div>
                <div className="text-2xl font-black font-heading">{round.demand} MW</div>
              </div>
            </div>
            <div className="flex gap-3 text-[11px] font-bold">
              <div className="text-center">
                <div>🔋 Battery</div>
                <div className="w-20 h-2.5 bg-slate-300 rounded-full overflow-hidden mt-1">
                  <div className="h-2.5 bg-emerald-500 transition-all duration-500" style={{ width: `${(battery / batteryCapacity) * 100}%` }}></div>
                </div>
                <div className="mt-0.5">{battery}/{batteryCapacity} MW</div>
              </div>
              <div className="text-center">
                <div>💧 Reservoir</div>
                <div className="w-20 h-2.5 bg-slate-300 rounded-full overflow-hidden mt-1">
                  <div className="h-2.5 bg-sky-500 transition-all duration-500" style={{ width: `${(hydroLeft / hydroReservoir) * 100}%` }}></div>
                </div>
                <div className="mt-0.5">{hydroLeft}/{hydroReservoir} MW</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-[11px] font-bold mb-1">
              <span>Supply: {supply} MW</span>
              <span className={diff < 0 ? "text-rose-500" : diff === 0 ? "text-emerald-500" : "text-amber-500"}>
                {diff < 0 ? `${-diff} MW short` : diff === 0 ? "Balanced ✓" : `+${diff} MW surplus → battery`}
              </span>
            </div>
            <div className="relative w-full h-4 bg-slate-300/70 rounded-full overflow-hidden" aria-hidden="true">
              <div className={`h-4 rounded-full transition-all duration-300 ${diff < 0 ? "bg-rose-400" : "bg-emerald-500"}`} style={{ width: `${gaugePct}%` }}></div>
              <div className="absolute top-0 bottom-0 w-1 bg-slate-900" style={{ left: `${demandPct}%` }} title="Demand"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SOURCES.map(src => (
            <div key={src.id} className={`p-3 rounded-2xl border-2 bg-white text-center ${caps[src.id] === 0 ? "opacity-60 border-slate-200" : "border-slate-200"}`}>
              <div className="text-2xl">{src.emoji}</div>
              <div className="text-xs font-extrabold text-slate-900">{src.label}</div>
              <div className="text-[10px] text-slate-500 mb-2">max {caps[src.id]} MW</div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => adjust(src.id, -step)}
                  disabled={!!result || set[src.id] === 0}
                  aria-label={`Decrease ${src.label}`}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-black text-slate-700"
                >−</button>
                <span className="w-10 text-sm font-black text-slate-900" aria-live="polite">{set[src.id]}</span>
                <button
                  onClick={() => adjust(src.id, step)}
                  disabled={!!result || set[src.id] + step > caps[src.id]}
                  aria-label={`Increase ${src.label}`}
                  className="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 disabled:opacity-40 font-black text-emerald-800"
                >+</button>
              </div>
            </div>
          ))}
        </div>

        {!result ? (
          <div className="flex justify-center">
            <button
              onClick={lockIn}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-extrabold shadow-md shadow-emerald-600/30 transition-all"
            >
              🔒 Lock In {round.time}
            </button>
          </div>
        ) : (
          <kit.Feedback
            key={idx}
            tone={result.tone}
            title={result.title}
            onNext={next}
            nextLabel={idx + 1 < rounds.length ? `Next: ${rounds[idx + 1].time}` : "See Results"}
          >
            {result.text}
            {idx + 1 === rounds.length && <span className="block mt-1 font-semibold">{fact}</span>}
          </kit.Feedback>
        )}
      </div>
    );
  };
})();

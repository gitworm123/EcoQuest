// EcoQuest - Biodiversity & Wildlife Mini-Games
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useRef } = React;
  const kit = window.EcoQuestGameKit;

  // ───────────── 1. Habitat Matching ─────────────
  window.EcoQuestGames["habitat-matching"] = function({ game, onFinish }) {
    const { habitats, animals, fact } = game.content;
    const [tray, setTray] = useState(() => kit.shuffle(animals));
    const [homes, setHomes] = useState({}); // habitatId -> [animal]
    const [attempts, setAttempts] = useState({});
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [shake, setShake] = useState(null);
    const misses = useRef([]);

    const placed = animals.length - tray.length;
    const done = tray.length === 0;

    const release = (animalId, habitatId) => {
      const animal = tray.find(a => a.id === String(animalId));
      if (!animal) return;
      const habitat = habitats.find(h => h.id === habitatId);
      const tries = attempts[animal.id] || 0;
      if (animal.habitat === habitatId) {
        const pts = tries === 0 ? 10 : 5;
        kit.sfx.correct();
        setScore(s => s + pts);
        setTray(t => t.filter(a => a.id !== animal.id));
        setHomes(h => ({ ...h, [habitatId]: [...(h[habitatId] || []), animal] }));
        setFeedback({ tone: "good", title: `${animal.emoji} ${animal.name} is home in the ${habitat.label}! (+${pts})`, text: animal.why, key: animal.id });
      } else {
        kit.sfx.wrong();
        if (tries === 0) misses.current.push(`${animal.name} → ${habitats.find(h => h.id === animal.habitat).label}: ${animal.why}`);
        setAttempts(a => ({ ...a, [animal.id]: tries + 1 }));
        setShake({ id: habitatId, key: Date.now() });
        setFeedback({ tone: "bad", title: `The ${animal.name.toLowerCase()} can't survive in the ${habitat.label.toLowerCase()}`, text: `Hint: ${animal.why}`, key: animal.id + tries });
      }
    };

    const dnd = kit.useDragTap(release);

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={placed} total={animals.length} label={`Animals home: ${placed}/${animals.length}`} />

        {!done && (
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">Animals needing a home</h3>
            <div className="flex flex-wrap gap-2">
              {tray.map(a => (
                <div
                  key={a.id}
                  {...dnd.itemProps(a.id, `${a.name}. Select, then choose a habitat.`)}
                  className={`eq-draggable eq-bounce-in flex items-center gap-2 px-3 py-2 rounded-2xl border-2 bg-white text-xs font-bold text-slate-800 shadow-sm ${
                    dnd.selected === a.id ? "border-emerald-500 ring-4 ring-emerald-300/40" : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <span className="text-2xl">{a.emoji}</span>
                  <span>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {habitats.map(h => (
            <div
              key={h.id}
              {...dnd.targetProps(h.id, `${h.label} habitat`)}
              className={`relative rounded-3xl p-3 sm:p-4 min-h-[130px] bg-gradient-to-br ${h.bg} text-white shadow-md transition-all ${
                dnd.overTarget === h.id ? "scale-[1.03] ring-4 ring-white/80" : dnd.selected ? "cursor-pointer hover:ring-4 hover:ring-white/50" : ""
              } ${shake && shake.id === h.id ? "eq-shake" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-extrabold font-heading drop-shadow">{h.label}</span>
                <span className="text-3xl opacity-80">{h.emoji}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(homes[h.id] || []).map(a => (
                  <span key={a.id} className="eq-pop text-[10px] sm:text-[11px] font-bold bg-white/90 text-slate-800 rounded-full px-2 py-0.5">
                    {a.emoji} {a.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {feedback && !done && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {done && (
          <kit.RoundBreak
            title="Every animal is home! 🏡"
            fact={fact}
            onNext={() => onFinish({ score, maxScore: animals.length * 10, summary: misses.current })}
            nextLabel="See Results"
          />
        )}
      </div>
    );
  };

  // ───────────── 2. Food Chain Puzzle ─────────────
  const CHAIN_POINTS = [30, 20, 10];
  const ENERGY = ["100%", "10%", "1%", "0.1%", "0.01%"];

  window.EcoQuestGames["food-chain-puzzle"] = function({ game, onFinish }) {
    const { chains } = game.content;
    const [chainIdx, setChainIdx] = useState(0);
    const chain = chains[chainIdx];
    const [tray, setTray] = useState(() => kit.shuffle(chain.organisms));
    const [slots, setSlots] = useState(() => chain.organisms.map(() => null));
    const [checks, setChecks] = useState(0);
    const [wrong, setWrong] = useState([]);
    const [solved, setSolved] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const misses = useRef([]);

    const placeAt = (orgId, slotIdx) => {
      if (solved) return;
      const org = tray.find(o => o.id === String(orgId));
      if (!org) return;
      const target = slotIdx === undefined ? slots.findIndex(s => s === null) : slotIdx;
      if (target < 0) return;
      kit.sfx.click();
      const displaced = slots[target];
      setSlots(s => s.map((v, i) => (i === target ? org : v)));
      setTray(t => [...t.filter(o => o.id !== org.id), ...(displaced ? [displaced] : [])]);
      setWrong(w => w.filter(i => i !== target));
      setFeedback(null);
    };

    const removeAt = (i) => {
      if (solved || !slots[i]) return;
      kit.sfx.click();
      setTray(t => [...t, slots[i]]);
      setSlots(s => s.map((v, j) => (j === i ? null : v)));
      setWrong(w => w.filter(x => x !== i));
    };

    const check = () => {
      const bad = slots.map((o, i) => (o.id === chain.organisms[i].id ? null : i)).filter(i => i !== null);
      if (bad.length === 0) {
        const pts = CHAIN_POINTS[Math.min(checks, CHAIN_POINTS.length - 1)];
        kit.sfx.correct();
        setScore(s => s + pts);
        setSolved(true);
        setWrong([]);
        setFeedback({ tone: "good", title: `${chain.name} food chain complete! (+${pts})`, text: chain.fact });
      } else {
        kit.sfx.wrong();
        if (checks === 0) misses.current.push(`${chain.name}: ${chain.organisms.map(o => o.name).join(" → ")}`);
        setChecks(c => c + 1);
        setWrong(bad);
        setFeedback({ tone: "bad", title: `${bad.length} link${bad.length > 1 ? "s are" : " is"} in the wrong place`, text: "Start with the producer that makes food from sunlight. Each arrow means 'is eaten by'." });
      }
    };

    const nextChain = () => {
      const next = chainIdx + 1;
      if (next < chains.length) {
        setChainIdx(next);
        setTray(kit.shuffle(chains[next].organisms));
        setSlots(chains[next].organisms.map(() => null));
        setChecks(0);
        setWrong([]);
        setSolved(false);
        setFeedback(null);
      } else {
        onFinish({ score, maxScore: chains.length * CHAIN_POINTS[0], summary: misses.current });
      }
    };

    const allFilled = slots.every(Boolean);

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={chainIdx + (solved ? 1 : 0)}
          total={chains.length}
          label={`${chain.emoji} ${chain.name} chain (${chainIdx + 1}/${chains.length})`}
        />

        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-lime-50 border border-emerald-200 p-4">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {slots.map((org, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-emerald-600 font-black text-lg" aria-hidden="true">→</span>}
                <div
                  {...(org
                    ? kit.pressable(() => removeAt(i), `Link ${i + 1}: ${org.name}. Activate to remove.`)
                    : { onDragOver: (e) => e.preventDefault(), onDrop: (e) => { e.preventDefault(); placeAt(e.dataTransfer.getData("text/plain"), i); }, "aria-label": `Empty link ${i + 1}` })}
                  className={`w-[70px] sm:w-24 min-h-[92px] rounded-2xl border-2 flex flex-col items-center justify-center p-1.5 text-center transition-all ${
                    org
                      ? solved
                        ? "bg-white border-emerald-500"
                        : wrong.includes(i)
                        ? "bg-rose-50 border-rose-400 eq-shake cursor-pointer"
                        : "bg-white border-emerald-300 cursor-pointer hover:border-rose-300"
                      : "border-dashed border-emerald-300 bg-white/50"
                  }`}
                >
                  {org ? (
                    <>
                      <span className="text-2xl sm:text-3xl">{org.emoji}</span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 leading-tight">{org.name}</span>
                      {solved && <span className="text-[9px] text-emerald-700 font-semibold leading-tight">{org.role}</span>}
                    </>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-700/70">{i === 0 ? "Producer" : `Link ${i + 1}`}</span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>

          {solved && (
            <div className="mt-4 space-y-1.5 eq-slide-up" aria-label="Energy available at each level">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 text-center">⚡ Energy passed up the chain (~10% rule)</div>
              {slots.map((org, i) => (
                <div key={org.id} className="flex items-center gap-2">
                  <span className="w-24 text-[10px] font-bold text-slate-700 truncate">{org.emoji} {org.name}</span>
                  <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full eq-grow" style={{ width: `${Math.max(2, 100 / Math.pow(10, i))}%` }}></div>
                  </div>
                  <span className="w-12 text-[10px] font-extrabold text-slate-700 text-right">{ENERGY[i]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {!solved && (
          <>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">Organisms (tap to add to the next link)</h3>
              <div className="flex flex-wrap gap-2">
                {tray.map(o => (
                  <div
                    key={o.id}
                    {...kit.pressable(() => placeAt(o.id), `${o.name}. Activate to add to the next empty link.`)}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", o.id)}
                    className="eq-draggable eq-bounce-in flex items-center gap-2 px-3 py-2 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-400 text-xs font-bold text-slate-800 shadow-sm"
                  >
                    <span className="text-2xl">{o.emoji}</span>
                    <span>{o.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={check}
                disabled={!allFilled}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-extrabold shadow-md shadow-emerald-600/30 transition-all"
              >
                ✔ Check Chain
              </button>
            </div>
          </>
        )}

        {feedback && (
          <kit.Feedback
            key={feedback.title}
            tone={feedback.tone}
            title={feedback.title}
            onNext={solved ? nextChain : null}
            nextLabel={chainIdx + 1 < chains.length ? "Next Ecosystem" : "See Results"}
          >
            {feedback.text}
          </kit.Feedback>
        )}
      </div>
    );
  };

  // ───────────── 3. Save the Habitat ─────────────
  const WILDLIFE = ["🦋", "🐝", "🐦", "🐸", "🐞", "🦔", "🐿️", "🦉", "🦎", "🦌"];

  window.EcoQuestGames["save-the-habitat"] = function({ game, onFinish }) {
    const { cards, fact } = game.content;
    const [deck] = useState(() => kit.shuffle(cards));
    const [idx, setIdx] = useState(0);
    const [health, setHealth] = useState(50);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState(null); // { protect, ok }
    const misses = useRef([]);

    const card = deck[idx];

    const decide = (protect) => {
      if (answer) return;
      const ok = protect === card.good;
      if (ok) {
        kit.sfx.correct();
        setScore(s => s + 10);
        setHealth(h => Math.min(100, h + 10));
      } else {
        kit.sfx.wrong();
        setHealth(h => Math.max(0, h - 10));
        misses.current.push(`"${card.text}" — ${card.good ? "this helps" : "this harms"} biodiversity. ${card.why}`);
      }
      setAnswer({ protect, ok });
    };

    const next = () => {
      if (idx + 1 < deck.length) {
        setIdx(idx + 1);
        setAnswer(null);
      } else {
        onFinish({ score, maxScore: deck.length * 10, summary: misses.current });
      }
    };

    kit.useKeys((e) => {
      if (answer) return;
      if (e.key === "ArrowRight") decide(true);
      if (e.key === "ArrowLeft") decide(false);
    });

    const visible = Math.round(health / 10);

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={idx + (answer ? 1 : 0)} total={deck.length} label={`Proposal ${idx + 1}/${deck.length}`} />

        {/* Ecosystem scene */}
        <div
          className="rounded-3xl p-4 border-2 border-green-200 transition-all duration-700"
          style={{ background: `linear-gradient(to bottom, hsl(${100 + health * 0.4}, ${30 + health * 0.4}%, 88%), hsl(${80 + health * 0.6}, ${25 + health * 0.45}%, 70%))` }}
        >
          <div className="flex items-center justify-between text-xs font-extrabold text-emerald-950 mb-2">
            <span>🌿 Ecosystem health</span>
            <span>{health}%</span>
          </div>
          <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden mb-3">
            <div className={`h-3 rounded-full transition-all duration-500 ${health >= 60 ? "bg-emerald-500" : health >= 40 ? "bg-amber-400" : "bg-rose-500"}`} style={{ width: `${health}%` }}></div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 min-h-[40px] text-2xl sm:text-3xl" aria-label={`${visible} kinds of wildlife visible`}>
            {WILDLIFE.slice(0, visible).map(w => <span key={w} className="eq-pop eq-bob">{w}</span>)}
            {visible < 4 && <span className="text-xl opacity-70">🗑️ 🏚️</span>}
          </div>
        </div>

        {/* Proposal card */}
        <div
          key={card.id}
          className={`eq-bounce-in max-w-xl mx-auto rounded-3xl bg-white border-2 shadow-lg p-5 sm:p-6 text-center space-y-3 transition-all duration-300 ${
            answer ? (answer.protect ? "eq-swipe-right" : "eq-swipe-left") : "border-slate-200"
          } ${answer ? (answer.ok ? "border-emerald-400" : "border-rose-400") : ""}`}
        >
          <div className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400">Proposal for the campus reserve</div>
          <div className="text-5xl">{card.emoji}</div>
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{card.text}</p>
        </div>

        {!answer ? (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => decide(false)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 text-rose-800 text-sm font-extrabold transition-all"
            >
              ← Reject ✕
            </button>
            <button
              onClick={() => decide(true)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-md shadow-emerald-600/30 transition-all"
            >
              Protect ✓ →
            </button>
          </div>
        ) : (
          <kit.Feedback
            key={`feedback-${card.id}`}
            tone={answer.ok ? "good" : "bad"}
            title={answer.ok ? `Good call! +10 — this ${card.good ? "helps" : "harms"} wildlife` : `Careful — this actually ${card.good ? "helps" : "harms"} wildlife`}
            onNext={next}
            nextLabel={idx + 1 < deck.length ? "Next Proposal" : "See Results"}
          >
            {card.why}
            {idx + 1 === deck.length && <span className="block mt-1 font-semibold">{fact}</span>}
          </kit.Feedback>
        )}
      </div>
    );
  };
})();

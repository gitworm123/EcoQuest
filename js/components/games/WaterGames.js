// EcoQuest - Water Conservation Mini-Games
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useEffect, useRef } = React;
  const kit = window.EcoQuestGameKit;

  // ───────────── 1. Save the Water ─────────────
  window.EcoQuestGames["save-the-water"] = function({ game, onFinish }) {
    const { timeLimit, rooms, spots, fact } = game.content;
    const wasteTotal = spots.filter(s => s.waste).length;

    const [handled, setHandled] = useState({}); // id -> "fixed" | "fine"
    const [fixes, setFixes] = useState(0);
    const [wrongs, setWrongs] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [over, setOver] = useState(false);
    const [bonus, setBonus] = useState(0);
    const timeLeft = kit.useCountdown(timeLimit, !over);

    const score = Math.max(0, fixes * 10 - wrongs * 5) + bonus;

    useEffect(() => {
      if (!over && timeLeft <= 0) {
        kit.sfx.wrong();
        setOver(true);
      }
    }, [timeLeft, over]);

    const inspect = (spot) => {
      if (over || handled[spot.id]) return;
      if (spot.waste) {
        kit.sfx.correct();
        const nextFixes = fixes + 1;
        setFixes(nextFixes);
        setHandled(h => ({ ...h, [spot.id]: "fixed" }));
        setFeedback({ tone: "good", title: `Fixed: ${spot.label} (+10)`, text: spot.why, key: spot.id });
        if (nextFixes === wasteTotal) {
          setBonus(Math.min(20, Math.ceil(timeLeft / 2)));
          setOver(true);
        }
      } else {
        kit.sfx.wrong();
        setWrongs(w => w + 1);
        setHandled(h => ({ ...h, [spot.id]: "fine" }));
        setFeedback({ tone: "bad", title: `That's already water-wise! (−5)`, text: spot.why, key: spot.id });
      }
    };

    const missed = spots.filter(s => s.waste && !handled[s.id]);

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={fixes}
          total={wasteTotal}
          label={`Water wasters fixed: ${fixes}/${wasteTotal}`}
          extra={<kit.TimerPill seconds={timeLeft} />}
        />

        {/* House scene */}
        <div className="rounded-3xl overflow-hidden border-2 border-sky-200 bg-gradient-to-b from-sky-100 to-sky-50">
          <svg viewBox="0 0 400 40" className="w-full block" aria-hidden="true">
            <polygon points="20,40 200,4 380,40" fill="#b45309" />
            <polygon points="40,40 200,10 360,40" fill="#d97706" />
          </svg>
          <div className="grid grid-cols-2 gap-2 p-2 sm:p-3 bg-amber-50/60">
            {rooms.map(room => (
              <div
                key={room.id}
                className={`rounded-2xl border p-2 sm:p-3 ${
                  room.id === "garden" ? "col-span-2 bg-green-100/80 border-green-300" :
                  room.id === "roof" ? "col-span-2 bg-orange-50 border-orange-200" :
                  "bg-white/90 border-slate-200"
                }`}
              >
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  {room.emoji} {room.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {spots.filter(s => s.room === room.id).map(spot => {
                    const state = handled[spot.id];
                    return (
                      <button
                        key={spot.id}
                        onClick={() => inspect(spot)}
                        disabled={over || !!state}
                        aria-label={`${spot.label}${state === "fixed" ? " — fixed" : state === "fine" ? " — already water-wise" : ""}`}
                        className={`relative flex-1 min-w-[120px] flex items-center gap-2 p-2 rounded-xl border-2 text-left transition-all ${
                          state === "fixed"
                            ? "bg-emerald-100 border-emerald-400 eq-pop"
                            : state === "fine"
                            ? "bg-slate-100 border-slate-300 opacity-80"
                            : "bg-white border-sky-200 hover:border-sky-500 hover:-translate-y-0.5 hover:shadow-md eq-bob"
                        }`}
                      >
                        <span className="text-2xl sm:text-3xl">{spot.emoji}</span>
                        <span className={`text-[11px] sm:text-xs font-bold leading-tight ${state === "fixed" ? "text-emerald-900 line-through decoration-2" : "text-slate-800"}`}>
                          {spot.label}
                        </span>
                        {state && (
                          <span className="absolute -top-2 -right-2 text-base">{state === "fixed" ? "✅" : "👍"}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {feedback && !over && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {over && (
          <kit.RoundBreak
            title={missed.length === 0 ? `All leaks fixed! Time bonus +${bonus}` : "Time's up!"}
            fact={fact}
            onNext={() => onFinish({
              score,
              maxScore: wasteTotal * 10 + 20,
              summary: missed.map(s => `Missed: ${s.label} — ${s.why}`)
            })}
            nextLabel="See Results"
          >
            {missed.length > 0 && (
              <p className="text-xs text-slate-600">You missed {missed.length} water waster{missed.length > 1 ? "s" : ""} — they're listed on the results screen.</p>
            )}
          </kit.RoundBreak>
        )}
      </div>
    );
  };

  // ───────────── 2. Water Cycle Jigsaw ─────────────
  const SLOT_POS = {
    1: { left: 18, top: 50 },
    2: { left: 53, top: 50 },
    3: { left: 38, top: 24 },
    4: { left: 77, top: 28 },
    5: { left: 58, top: 76 },
    6: { left: 85, top: 90 }
  };

  function WaterCycleDiagram() {
    return (
      <svg viewBox="0 0 400 250" className="w-full h-full" aria-hidden="true">
        <rect x="0" y="0" width="400" height="250" fill="#e0f2fe" />
        <circle cx="38" cy="34" r="20" fill="#facc15" />
        <circle cx="38" cy="34" r="27" fill="#facc15" opacity="0.25" />
        {/* Clouds */}
        <g fill="#ffffff">
          <ellipse cx="150" cy="38" rx="34" ry="15" />
          <ellipse cx="172" cy="30" rx="22" ry="14" />
          <ellipse cx="130" cy="31" rx="18" ry="12" />
        </g>
        <g fill="#94a3b8">
          <ellipse cx="300" cy="40" rx="38" ry="16" />
          <ellipse cx="322" cy="31" rx="22" ry="14" />
          <ellipse cx="280" cy="32" rx="18" ry="12" />
        </g>
        {/* Rain */}
        <g stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" className="eq-rain">
          {[275, 290, 305, 320, 335].map((x, i) => (
            <line key={x} x1={x} y1={62 + (i % 2) * 6} x2={x - 5} y2={80 + (i % 2) * 6} />
          ))}
        </g>
        {/* Mountains */}
        <polygon points="230,175 320,70 400,160 400,175" fill="#64748b" />
        <polygon points="300,94 320,70 340,94 330,90 320,97 310,90" fill="#f8fafc" />
        {/* Ground & ocean */}
        <rect x="0" y="170" width="400" height="80" fill="#4ade80" />
        <path d="M0,168 L130,168 Q150,190 135,250 L0,250 Z" fill="#2563eb" />
        <path d="M10,180 q10,-6 20,0 t20,0 t20,0 t20,0" stroke="#bfdbfe" strokeWidth="2" fill="none" />
        {/* Soil / groundwater */}
        <rect x="150" y="215" width="250" height="35" fill="#a16207" />
        <line x1="150" y1="238" x2="400" y2="238" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 5" />
        {/* River */}
        <path d="M300,172 C260,182 230,196 190,192 S150,200 130,206" stroke="#3b82f6" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Trees */}
        <text x="198" y="160" fontSize="26" textAnchor="middle">🌳</text>
        <text x="228" y="164" fontSize="22" textAnchor="middle">🌲</text>
        {/* Arrows */}
        <g stroke="#0369a1" strokeWidth="2.5" fill="none" strokeDasharray="5 4" className="eq-flow-up">
          <path d="M55,160 C45,140 65,120 55,96" />
          <path d="M90,160 C80,140 100,120 90,96" />
          <path d="M210,138 C204,124 214,112 208,98" />
        </g>
        <g stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeDasharray="4 4">
          <path d="M330,200 L330,232" />
          <path d="M360,200 L360,232" />
        </g>
      </svg>
    );
  }

  window.EcoQuestGames["water-cycle-jigsaw"] = function({ game, onFinish }) {
    const { pieces, fact } = game.content;
    const [tray, setTray] = useState(() => kit.shuffle(pieces));
    const [filled, setFilled] = useState({}); // slot -> piece
    const [attempts, setAttempts] = useState({});
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [shake, setShake] = useState(null);
    const misses = useRef([]);

    const placedCount = Object.keys(filled).length;
    const done = placedCount === pieces.length;

    const drop = (pieceId, slot) => {
      const piece = pieces.find(p => p.id === String(pieceId));
      if (!piece || filled[slot]) return;
      const tries = attempts[piece.id] || 0;
      if (piece.slot === slot) {
        const pts = tries === 0 ? 10 : 5;
        kit.sfx.correct();
        setScore(s => s + pts);
        setFilled(f => ({ ...f, [slot]: piece }));
        setTray(t => t.filter(p => p.id !== piece.id));
        setFeedback({ tone: "good", title: `${piece.label} locked in! (+${pts})`, text: piece.why, key: piece.id });
      } else {
        kit.sfx.wrong();
        if (tries === 0) misses.current.push(`${piece.label}: ${piece.why}`);
        setAttempts(a => ({ ...a, [piece.id]: tries + 1 }));
        setShake({ slot, key: Date.now() });
        setFeedback({ tone: "bad", title: `${piece.label} doesn't fit slot ${slot}`, text: `Hint: ${piece.why}`, key: piece.id + tries });
      }
    };

    const dnd = kit.useDragTap((pieceId, slot) => drop(pieceId, Number(slot)));

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={placedCount} total={pieces.length} label={`Pieces placed: ${placedCount}/${pieces.length}`} />

        <div className="relative w-full max-w-2xl mx-auto aspect-[8/5] rounded-2xl overflow-hidden border-2 border-sky-200 shadow-inner">
          <WaterCycleDiagram />
          {Object.keys(SLOT_POS).map(k => {
            const slot = Number(k);
            const piece = filled[slot];
            const pos = SLOT_POS[slot];
            return (
              <div
                key={slot}
                {...(piece ? {} : dnd.targetProps(slot, `Diagram slot ${slot}`))}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl text-center transition-all ${
                  piece
                    ? "bg-emerald-600 text-white px-1.5 sm:px-2.5 py-1 shadow-lg eq-pop"
                    : `bg-white/85 border-2 border-dashed px-2 sm:px-3 py-1 sm:py-1.5 ${
                        dnd.overTarget === slot ? "border-emerald-500 scale-110" : dnd.selected ? "border-emerald-400 cursor-pointer animate-pulse" : "border-sky-500"
                      }`
                } ${shake && shake.slot === slot ? "eq-shake" : ""}`}
              >
                {piece ? (
                  <span className="text-[9px] sm:text-xs font-extrabold whitespace-nowrap">{piece.emoji} {piece.label}</span>
                ) : (
                  <span className="text-[10px] sm:text-xs font-extrabold text-sky-800">{slot} ?</span>
                )}
              </div>
            );
          })}
        </div>

        {!done && (
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">Puzzle pieces</h3>
            <div className="flex flex-wrap gap-2.5">
              {tray.map(piece => (
                <div
                  key={piece.id}
                  {...dnd.itemProps(piece.id, `${piece.label} piece. Select, then choose a diagram slot.`)}
                  className={`eq-piece eq-draggable px-4 py-2.5 text-xs font-extrabold text-sky-950 bg-sky-100 border-2 ${
                    dnd.selected === piece.id ? "border-emerald-500 ring-4 ring-emerald-300/40 bg-emerald-50" : "border-sky-300 hover:border-sky-500"
                  }`}
                >
                  🧩 {piece.emoji} {piece.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {feedback && !done && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {done && (
          <kit.RoundBreak
            title="Water cycle complete! 💧"
            fact={fact}
            onNext={() => onFinish({ score, maxScore: pieces.length * 10, summary: misses.current })}
            nextLabel="See Results"
          />
        )}
      </div>
    );
  };

  // ───────────── 3. Clean the River ─────────────
  const RIVER_TINTS = ["#6b7f4f", "#5c8466", "#4f8a8b", "#3b82c4", "#2563eb"];

  window.EcoQuestGames["clean-the-river"] = function({ game, onFinish }) {
    const { actions, items, wildlife, fact } = game.content;
    const [removed, setRemoved] = useState([]);
    const [protectedIds, setProtectedIds] = useState([]);
    const [active, setActive] = useState(null);
    const [score, setScore] = useState(0);
    const [penalty, setPenalty] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const misses = useRef([]);

    const done = removed.length === items.length;
    const tint = RIVER_TINTS[Math.round((removed.length / items.length) * (RIVER_TINTS.length - 1))];
    const total = Math.max(0, score - penalty);

    const choose = (actionId) => {
      if (!active) return;
      const right = actions.find(a => a.id === active.kind);
      if (actionId === active.kind) {
        kit.sfx.correct();
        setScore(s => s + 10);
        setFeedback({ tone: "good", title: `${active.name}: ${right.label} (+10)`, text: active.why, key: active.id });
      } else {
        kit.sfx.wrong();
        misses.current.push(`${active.name} → ${right.label}: ${active.why}`);
        setFeedback({ tone: "bad", title: `${active.name} needed: ${right.label}`, text: active.why, key: active.id });
      }
      setRemoved(r => [...r, active.id]);
      setActive(null);
    };

    kit.useKeys((e) => {
      if (!active) return;
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < actions.length) choose(actions[idx].id);
      if (e.key === "Escape") setActive(null);
    });

    const touchWildlife = (w) => {
      if (protectedIds.includes(w.id) || done) return;
      kit.sfx.wrong();
      setPenalty(p => p + 5);
      setProtectedIds(p => [...p, w.id]);
      setActive(null);
      setFeedback({ tone: "bad", title: `Leave the ${w.name.toLowerCase()} alone! (−5)`, text: w.why, key: w.id });
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={total}
          current={removed.length}
          total={items.length}
          label={`Pollutants cleared: ${removed.length}/${items.length}`}
          extra={<span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full">💧 Clarity {Math.round((removed.length / items.length) * 100)}%</span>}
        />

        <div className="rounded-3xl overflow-hidden border-2 border-green-300 bg-green-200">
          <div className="h-6 sm:h-8 bg-gradient-to-b from-green-300 to-green-400 flex items-end justify-around text-sm sm:text-lg" aria-hidden="true">
            <span>🌾</span><span>🌳</span><span>🏡</span><span>🌴</span><span>🌾</span>
          </div>
          <div
            className="eq-river relative h-64 sm:h-72 transition-colors duration-700"
            style={{ backgroundColor: tint }}
          >
            {wildlife.map(w => (
              <button
                key={w.id}
                onClick={() => touchWildlife(w)}
                disabled={done || protectedIds.includes(w.id)}
                aria-label={`${w.name} (wildlife)`}
                style={{ left: `${w.x}%`, top: `${w.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 rounded-full"
              >
                <span className="inline-block eq-bob">{w.emoji}</span>
                {protectedIds.includes(w.id) && <span className="absolute -top-2 -right-2 text-sm">💚</span>}
              </button>
            ))}
            {items.filter(i => !removed.includes(i.id)).map(item => (
              <button
                key={item.id}
                onClick={() => { kit.sfx.click(); setActive(item); setFeedback(null); }}
                aria-label={`${item.name} floating in the river`}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl eq-drift rounded-full p-1 transition-transform hover:scale-125 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${
                  active && active.id === item.id ? "ring-4 ring-amber-300 bg-white/40 scale-125" : ""
                }`}
              >
                {item.emoji}
              </button>
            ))}
            {done && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="eq-pop bg-white/90 rounded-2xl px-5 py-3 text-center shadow-xl">
                  <div className="text-3xl">🐟✨🦆</div>
                  <div className="text-sm font-extrabold text-blue-900">The river is clean again!</div>
                </div>
              </div>
            )}
          </div>
          <div className="h-6 sm:h-8 bg-gradient-to-t from-green-300 to-green-400 flex items-start justify-around text-sm sm:text-lg" aria-hidden="true">
            <span>🌳</span><span>🌾</span><span>🌿</span><span>🌳</span><span>🪨</span>
          </div>
        </div>

        {active && (
          <div className="eq-slide-up p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3" role="dialog" aria-label={`Choose a cleanup action for ${active.name}`}>
            <div className="text-xs font-extrabold text-amber-950">
              {active.emoji} What should we do with the <span className="underline">{active.name}</span>?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {actions.map((a, idx) => (
                <button
                  key={a.id}
                  autoFocus={idx === 0}
                  onClick={() => choose(a.id)}
                  className="quiz-option-btn px-3 py-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-500 text-xs font-bold text-slate-800 text-left flex items-center gap-2"
                >
                  <kbd className="eq-kbd">{idx + 1}</kbd>
                  <span className="text-lg">{a.emoji}</span>
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!active && !done && !feedback && (
          <p className="text-[11px] text-center text-slate-500">Tap or click something floating in the river to start cleaning.</p>
        )}

        {feedback && !active && !done && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {done && (
          <kit.RoundBreak
            title="River restored!"
            fact={fact}
            onNext={() => onFinish({
              score: total,
              maxScore: items.length * 10,
              summary: penalty > 0 ? [...misses.current, "Remember: fish, birds and native plants are signs of a healthy river — never remove them."] : misses.current
            })}
            nextLabel="See Results"
          />
        )}
      </div>
    );
  };
})();

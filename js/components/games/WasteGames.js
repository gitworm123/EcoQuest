// EcoQuest - Waste Management Mini-Games
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useRef } = React;
  const kit = window.EcoQuestGameKit;

  const BIN_STYLES = {
    green: "from-green-500 to-green-700 border-green-800 text-white",
    blue: "from-blue-500 to-blue-700 border-blue-800 text-white",
    red: "from-rose-500 to-red-700 border-red-800 text-white",
    yellow: "from-yellow-300 to-amber-400 border-amber-600 text-amber-950"
  };

  // ───────────── 1. Waste Segregation Challenge ─────────────
  window.EcoQuestGames["waste-segregation"] = function({ game, onFinish }) {
    const { bins, rounds } = game.content;
    const total = rounds.reduce((n, r) => n + r.items.length, 0);

    const [roundIdx, setRoundIdx] = useState(0);
    const [queue, setQueue] = useState(() => kit.shuffle(rounds[0].items));
    const [score, setScore] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [flash, setFlash] = useState(null);
    const misses = useRef([]);

    const current = queue[0];
    const roundOver = queue.length === 0;

    const sortInto = (itemId, binId) => {
      if (!current || String(itemId) !== current.id) return;
      const ok = current.bin === binId;
      const correctBin = bins.find(b => b.id === current.bin);
      if (ok) {
        kit.sfx.correct();
        setScore(s => s + 10);
      } else {
        kit.sfx.wrong();
        misses.current.push(`${current.name} → ${correctBin.label}: ${current.why}`);
      }
      setFlash({ binId, ok, key: Date.now() });
      setFeedback({ ok, item: current, correctBin });
      setQueue(q => q.slice(1));
      setProcessed(p => p + 1);
    };

    const dnd = kit.useDragTap(sortInto);

    kit.useKeys((e) => {
      const bin = bins.find(b => b.key === e.key);
      if (bin && current) sortInto(current.id, bin.id);
    });

    const nextRound = () => {
      const next = roundIdx + 1;
      if (next < rounds.length) {
        setRoundIdx(next);
        setQueue(kit.shuffle(rounds[next].items));
        setFeedback(null);
      } else {
        onFinish({ score, maxScore: total * 10, summary: misses.current });
      }
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={processed}
          total={total}
          label={`Round ${roundIdx + 1}/${rounds.length} • Item ${Math.min(processed + 1, total)}/${total}`}
        />

        {roundOver ? (
          <kit.RoundBreak
            title={`Round ${roundIdx + 1} complete!`}
            fact={rounds[roundIdx].fact}
            onNext={nextRound}
            nextLabel={roundIdx + 1 < rounds.length ? "Next Round" : "See Results"}
          />
        ) : (
          <>
            {/* Conveyor belt */}
            <div className="eq-conveyor rounded-2xl p-4 sm:p-5 flex items-center justify-center gap-4 min-h-[140px]">
              <div
                key={current.id}
                {...dnd.itemProps(current.id, `Current item: ${current.name}. Select, then choose a bin.`)}
                className={`eq-bounce-in eq-draggable bg-white rounded-2xl shadow-lg px-6 py-4 text-center border-2 ${
                  dnd.selected === current.id ? "border-emerald-500 ring-4 ring-emerald-300/50" : "border-white"
                }`}
              >
                <div className="text-5xl sm:text-6xl select-none">{current.emoji}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{current.name}</div>
              </div>
              <div className="hidden sm:block text-[11px] font-bold text-white/90 bg-black/30 px-2.5 py-1 rounded-full">
                {queue.length - 1} more on the belt
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-500">
              Drag the item into a bin, tap a bin, or press <kbd className="eq-kbd">1</kbd>–<kbd className="eq-kbd">4</kbd>.
            </p>

            {/* Bins */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {bins.map(bin => {
                const flashing = flash && flash.binId === bin.id;
                return (
                  <div
                    key={bin.id}
                    {...dnd.targetProps(bin.id, `${bin.label} bin`)}
                    {...kit.pressable(() => sortInto(current.id, bin.id), `Put ${current.name} in the ${bin.label} bin (key ${bin.key})`)}
                    className={`eq-target relative cursor-pointer rounded-b-3xl rounded-t-lg border-b-8 bg-gradient-to-b ${BIN_STYLES[bin.color]} p-3 pt-5 text-center shadow-md transition-transform hover:-translate-y-1 ${
                      dnd.overTarget === bin.id ? "scale-105 ring-4 ring-white/70" : ""
                    } ${flashing ? (flash.ok ? "eq-flash-good" : "eq-shake") : ""}`}
                  >
                    <div className="absolute -top-2 left-2 right-2 h-3 rounded-full bg-black/25"></div>
                    <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-black/25 rounded-md px-1.5">{bin.key}</span>
                    <div className="text-2xl">{bin.emoji}</div>
                    <div className="text-xs font-extrabold mt-1 leading-tight">{bin.label}</div>
                    <div className="text-[10px] opacity-90 mt-0.5">{bin.hint}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {feedback && !roundOver && (
          <kit.Feedback
            key={processed}
            tone={feedback.ok ? "good" : "bad"}
            title={feedback.ok ? `Correct! +10 — ${feedback.item.name}` : `Oops! ${feedback.item.name} goes in ${feedback.correctBin.label}`}
          >
            {feedback.item.why}
          </kit.Feedback>
        )}
      </div>
    );
  };

  // ───────────── 2. Recycling Jigsaw Puzzle ─────────────
  const GRID = 3;
  const PIECES = GRID * GRID;

  function countCycles(perm) {
    const seen = new Array(perm.length).fill(false);
    let cycles = 0;
    for (let i = 0; i < perm.length; i++) {
      if (seen[i]) continue;
      cycles++;
      let j = i;
      while (!seen[j]) {
        seen[j] = true;
        j = perm[j];
      }
    }
    return cycles;
  }

  function scramble() {
    let tiles;
    do {
      tiles = kit.shuffle([...Array(PIECES).keys()]);
    } while (tiles.filter((p, i) => p === i).length > 1);
    return tiles;
  }

  function arrowAt(angleDeg) {
    const a = (angleDeg * Math.PI) / 180;
    const cx = 150 + 95 * Math.cos(a);
    const cy = 150 + 95 * Math.sin(a);
    const tx = -Math.sin(a), ty = Math.cos(a); // clockwise tangent
    const nx = Math.cos(a), ny = Math.sin(a);
    const tip = [cx + tx * 12, cy + ty * 12];
    const l = [cx - tx * 6 + nx * 9, cy - ty * 6 + ny * 9];
    const r = [cx - tx * 6 - nx * 9, cy - ty * 6 - ny * 9];
    return `${tip[0]},${tip[1]} ${l[0]},${l[1]} ${r[0]},${r[1]}`;
  }

  function RecyclePicture({ stages }) {
    const stationPos = [
      { x: 150, y: 44, ly: 88 },
      { x: 250, y: 140, ly: 184 },
      { x: 150, y: 236, ly: 280 },
      { x: 50, y: 140, ly: 184 }
    ];
    return (
      <g>
        <rect x="0" y="0" width="300" height="150" fill="#e0f2fe" />
        <rect x="0" y="150" width="300" height="150" fill="#dcfce7" />
        <circle cx="150" cy="150" r="95" fill="none" stroke="#16a34a" strokeWidth="7" strokeDasharray="16 9" />
        {[45, 135, 225, 315].map(a => (
          <polygon key={a} points={arrowAt(a)} fill="#15803d" />
        ))}
        <text x="50" y="48" fontSize="40" textAnchor="middle" dominantBaseline="central">☀️</text>
        <text x="250" y="46" fontSize="38" textAnchor="middle" dominantBaseline="central">☁️</text>
        <text x="48" y="252" fontSize="38" textAnchor="middle" dominantBaseline="central">🌱</text>
        <text x="252" y="250" fontSize="40" textAnchor="middle" dominantBaseline="central">🌳</text>
        <circle cx="150" cy="150" r="36" fill="#ffffff" stroke="#86efac" strokeWidth="3" />
        <text x="150" y="152" fontSize="44" textAnchor="middle" dominantBaseline="central">♻️</text>
        {stages.map((st, i) => (
          <g key={st.name}>
            <circle cx={stationPos[i].x} cy={stationPos[i].y} r="27" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
            <text x={stationPos[i].x} y={stationPos[i].y + 1} fontSize="28" textAnchor="middle" dominantBaseline="central">{st.emoji}</text>
            <rect x={stationPos[i].x - 40} y={stationPos[i].ly - 10} width="80" height="18" rx="9" fill="#14532d" />
            <text x={stationPos[i].x} y={stationPos[i].ly} fontSize="10.5" fontWeight="700" fill="#ffffff" textAnchor="middle" dominantBaseline="central">
              {st.name}
            </text>
          </g>
        ))}
      </g>
    );
  }

  window.EcoQuestGames["recycling-jigsaw"] = function({ game, onFinish }) {
    const { stages, fact } = game.content;
    const [tiles, setTiles] = useState(scramble);
    const minSwaps = useRef(null);
    if (minSwaps.current === null) minSwaps.current = PIECES - countCycles(tiles);

    const [selected, setSelected] = useState(null);
    const [moves, setMoves] = useState(0);
    const [peek, setPeek] = useState(false);
    const [lastGood, setLastGood] = useState(null);

    const inPlace = tiles.filter((p, i) => p === i).length;
    const solved = inPlace === PIECES;
    const score = Math.max(40, Math.min(100, 100 - 5 * Math.max(0, moves - minSwaps.current)));

    const swap = (a, b) => {
      if (solved || a === b) return;
      const next = tiles.slice();
      [next[a], next[b]] = [next[b], next[a]];
      const gained = (next[a] === a ? 1 : 0) + (next[b] === b ? 1 : 0);
      if (gained > 0) kit.sfx.correct(); else kit.sfx.click();
      setLastGood(gained > 0 ? { a, b, key: Date.now() } : null);
      setTiles(next);
      setMoves(m => m + 1);
      setSelected(null);
    };

    const clickTile = (pos) => {
      if (solved) return;
      if (selected === null) {
        kit.sfx.click();
        setSelected(pos);
      } else if (selected === pos) {
        setSelected(null);
      } else {
        swap(selected, pos);
      }
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={inPlace}
          total={PIECES}
          label={`Pieces in place: ${inPlace}/${PIECES}`}
          extra={<span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">🔀 {moves} moves</span>}
        />

        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start justify-center">
          <div
            className={`grid grid-cols-3 gap-1 p-1.5 rounded-2xl bg-emerald-900/90 shadow-xl w-full max-w-[360px] ${solved ? "eq-flash-good" : ""}`}
            role="grid"
            aria-label="Recycling jigsaw puzzle"
          >
            {tiles.map((piece, pos) => {
              const col = piece % GRID;
              const row = Math.floor(piece / GRID);
              const correct = piece === pos;
              const pulse = lastGood && (lastGood.a === pos || lastGood.b === pos) && correct;
              return (
                <div
                  key={pos}
                  {...kit.pressable(() => clickTile(pos), `Puzzle tile ${pos + 1}${correct ? ", in place" : ""}${selected === pos ? ", selected" : ""}`)}
                  data-piece={piece}
                  draggable={!solved}
                  onDragStart={(e) => { e.dataTransfer.setData("text/plain", String(pos)); setSelected(pos); }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); swap(Number(e.dataTransfer.getData("text/plain")), pos); }}
                  className={`relative aspect-square overflow-hidden rounded-lg bg-white cursor-pointer transition-all ${
                    selected === pos ? "ring-4 ring-amber-400 scale-[0.96] z-10" : "hover:brightness-95"
                  } ${pulse ? "eq-pop" : ""} ${solved ? "rounded-none" : ""}`}
                >
                  <svg viewBox={`${col * 100} ${row * 100} 100 100`} className="w-full h-full pointer-events-none" aria-hidden="true">
                    <RecyclePicture stages={stages} />
                  </svg>
                  {correct && !solved && (
                    <span className="absolute bottom-1 right-1 text-[10px] bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center">✓</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full md:w-56 space-y-3">
            <button
              onClick={() => setPeek(p => !p)}
              aria-pressed={peek}
              className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              👁️ {peek ? "Hide picture" : "Peek at finished picture"}
            </button>
            {peek && (
              <svg viewBox="0 0 300 300" className="w-40 md:w-full mx-auto rounded-xl border-2 border-emerald-200 shadow eq-slide-up" aria-label="Finished picture preview">
                <RecyclePicture stages={stages} />
              </svg>
            )}
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Select a tile, then another to swap them — or drag one tile onto another. Minimum swaps needed: <strong>{minSwaps.current}</strong>.
            </p>
          </div>
        </div>

        {solved && (
          <div className="eq-slide-up space-y-4">
            <kit.Feedback tone="good" title={`Puzzle solved in ${moves} moves! Score: ${score}/100`}>
              You rebuilt the full recycling loop. Here's what happens at each stage:
            </kit.Feedback>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stages.map(st => (
                <div key={st.name} className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <span className="text-2xl">{st.emoji}</span>
                  <div>
                    <div className="text-xs font-extrabold text-emerald-950">{st.name}</div>
                    <div className="text-[11px] text-emerald-900/80">{st.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <kit.RoundBreak
              title="Loop complete!"
              fact={fact}
              onNext={() => onFinish({
                score,
                maxScore: 100,
                summary: moves > minSwaps.current ? [`You used ${moves} moves; the minimum was ${minSwaps.current}. Try spotting pieces by their stage icon to save moves.`] : []
              })}
              nextLabel="See Results"
            />
          </div>
        )}
      </div>
    );
  };

  // ───────────── 3. Reuse or Recycle? ─────────────
  window.EcoQuestGames["reuse-or-recycle"] = function({ game, onFinish }) {
    const { actions, rounds } = game.content;
    const total = rounds.reduce((n, r) => n + r.items.length, 0);

    const [roundIdx, setRoundIdx] = useState(0);
    const [order, setOrder] = useState(() => kit.shuffle(rounds[0].items));
    const [placed, setPlaced] = useState({}); // actionId -> item
    const [attempts, setAttempts] = useState({});
    const [score, setScore] = useState(0);
    const [matchedCount, setMatchedCount] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [shake, setShake] = useState(null);
    const misses = useRef([]);

    const items = rounds[roundIdx].items;
    const placedIds = Object.values(placed).map(i => i.id);
    const tray = order.filter(i => !placedIds.includes(i.id));
    const roundOver = tray.length === 0;

    const lock = (item) => {
      setPlaced(p => ({ ...p, [item.action]: item }));
      setMatchedCount(c => c + 1);
    };

    const match = (itemId, actionId) => {
      const item = items.find(i => i.id === String(itemId));
      if (!item || placedIds.includes(item.id)) return;
      const action = actions.find(a => a.id === actionId);
      if (placed[actionId]) {
        kit.sfx.wrong();
        setFeedback({ tone: "info", title: `${action.label} already has an object`, text: "Each action is used once per round — try a different one." });
        return;
      }
      const tries = attempts[item.id] || 0;
      if (item.action === actionId) {
        const pts = tries === 0 ? 10 : 5;
        kit.sfx.correct();
        setScore(s => s + pts);
        lock(item);
        setFeedback({ tone: "good", title: `${item.name} → ${action.label} (+${pts})`, text: item.why });
      } else if (tries >= 1) {
        // Second miss: reveal the answer so students never get stuck.
        kit.sfx.wrong();
        const right = actions.find(a => a.id === item.action);
        misses.current.push(`${item.name} → ${right.label}: ${item.why}`);
        lock(item);
        setShake({ id: actionId, key: Date.now() });
        setFeedback({ tone: "bad", title: `The best choice was ${right.label}`, text: item.why });
      } else {
        kit.sfx.wrong();
        setAttempts(a => ({ ...a, [item.id]: tries + 1 }));
        setShake({ id: actionId, key: Date.now() });
        setFeedback({ tone: "bad", title: `Not quite — ${item.name} isn't best for "${action.label}"`, text: "Think higher up the waste hierarchy. One more try for 5 points!" });
      }
    };

    const dnd = kit.useDragTap(match);

    const nextRound = () => {
      const next = roundIdx + 1;
      if (next < rounds.length) {
        setRoundIdx(next);
        setOrder(kit.shuffle(rounds[next].items));
        setPlaced({});
        setAttempts({});
        setFeedback(null);
      } else {
        onFinish({ score, maxScore: total * 10, summary: misses.current });
      }
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={score}
          current={matchedCount}
          total={total}
          label={`Round ${roundIdx + 1}/${rounds.length} • Matched ${matchedCount}/${total}`}
        />

        {roundOver ? (
          <kit.RoundBreak
            title={`Round ${roundIdx + 1} complete!`}
            fact={rounds[roundIdx].fact}
            onNext={nextRound}
            nextLabel={roundIdx + 1 < rounds.length ? "Next Round" : "See Results"}
          />
        ) : (
          <>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">Objects</h3>
              <div className="flex flex-wrap gap-2.5">
                {tray.map(item => (
                  <div
                    key={item.id}
                    {...dnd.itemProps(item.id, `${item.name}. Select, then choose an action.`)}
                    className={`eq-draggable eq-bounce-in flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 bg-white shadow-sm text-xs font-bold text-slate-800 ${
                      dnd.selected === item.id ? "border-emerald-500 ring-4 ring-emerald-300/40" : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">Action stations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {actions.map(action => {
                  const item = placed[action.id];
                  return (
                    <div
                      key={action.id}
                      {...(item ? {} : dnd.targetProps(action.id, `${action.label}: ${action.hint}`))}
                      className={`rounded-2xl border-2 border-dashed p-3 text-center transition-all min-h-[96px] flex sm:flex-col items-center sm:justify-center gap-2 ${
                        item
                          ? "border-emerald-400 bg-emerald-50 border-solid"
                          : dnd.overTarget === action.id
                          ? "border-emerald-500 bg-emerald-50 scale-[1.03]"
                          : dnd.selected
                          ? "border-emerald-300 bg-white cursor-pointer hover:bg-emerald-50"
                          : "border-slate-300 bg-slate-50"
                      } ${shake && shake.id === action.id ? "eq-shake" : ""}`}
                    >
                      <span className="text-2xl">{action.emoji}</span>
                      <div className="text-left sm:text-center flex-1 sm:flex-initial">
                        <div className="text-xs font-extrabold text-slate-900">{action.label}</div>
                        <div className="text-[10px] text-slate-500">{action.hint}</div>
                      </div>
                      {item && (
                        <div className="eq-pop text-[11px] font-bold text-emerald-800 bg-white rounded-xl px-2 py-1 border border-emerald-200">
                          {item.emoji} {item.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {feedback && !roundOver && (
          <kit.Feedback key={feedback.title + matchedCount} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}
      </div>
    );
  };
})();

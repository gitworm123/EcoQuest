// EcoQuest - Recycling & Sustainable Living Mini-Games
window.EcoQuestGames = window.EcoQuestGames || {};

(function() {
  const { useState, useRef } = React;
  const kit = window.EcoQuestGameKit;

  // ───────────── 1. Zero-Waste Day ─────────────
  window.EcoQuestGames["zero-waste-day"] = function({ game, onFinish }) {
    const { moments, bag, fact } = game.content;
    const [bagOrder] = useState(() => kit.shuffle(bag));
    const [assigned, setAssigned] = useState({}); // momentId -> bag item
    const [attempts, setAttempts] = useState({});
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [shake, setShake] = useState(null);
    const misses = useRef([]);

    const usedIds = Object.values(assigned).map(i => i.id);
    const doneCount = Object.keys(assigned).length;
    const done = doneCount === moments.length;

    const swap = (itemId, momentId) => {
      const item = bag.find(b => b.id === String(itemId));
      const moment = moments.find(m => m.id === momentId);
      if (!item || !moment || assigned[momentId] || usedIds.includes(item.id)) return;
      const tries = attempts[momentId] || 0;
      const correctItem = bag.find(b => b.id === moment.answer);

      if (item.id === moment.answer) {
        const pts = tries === 0 ? 10 : 5;
        kit.sfx.correct();
        setScore(s => s + pts);
        setAssigned(a => ({ ...a, [momentId]: item }));
        setFeedback({ tone: "good", title: `${moment.time}: ${item.label} replaces the ${moment.disposable.toLowerCase()} (+${pts})`, text: moment.why, key: moment.id });
        return;
      }

      kit.sfx.wrong();
      setShake({ id: momentId, key: Date.now() });
      if (tries >= 1) {
        // Second miss: reveal the swap so the day can continue.
        misses.current.push(`${moment.label}: ${correctItem.label} instead of ${moment.disposable.toLowerCase()}. ${moment.why}`);
        setAssigned(a => ({ ...a, [momentId]: correctItem }));
        setFeedback({ tone: "bad", title: `The best swap was: ${correctItem.label}`, text: moment.why, key: moment.id + "reveal" });
      } else {
        setAttempts(a => ({ ...a, [momentId]: tries + 1 }));
        setFeedback({
          tone: "bad",
          title: item.decoy ? `${item.label} is another disposable!` : `${item.label} doesn't fit "${moment.label}"`,
          text: item.decoy ? "Zero-waste means swapping disposables for reusables — try again for 5 points." : "Think about which reusable directly replaces this disposable. One more try for 5 points!",
          key: moment.id + item.id
        });
      }
    };

    const dnd = kit.useDragTap(swap);

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={doneCount} total={moments.length} label={`Moments made zero-waste: ${doneCount}/${moments.length}`} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Backpack */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-teal-600 to-cyan-800 p-4 text-white">
            <h3 className="text-xs font-extrabold uppercase tracking-wider mb-3">🎒 Your backpack</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {bagOrder.map(item => {
                const used = usedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    {...dnd.itemProps(item.id, `${item.label}. Select, then choose a moment of the day.`, used || done)}
                    className={`flex items-center gap-2 p-2 rounded-xl border-2 text-xs font-bold transition-all ${
                      used
                        ? "bg-white/10 border-white/10 text-white/40 line-through"
                        : dnd.selected === item.id
                        ? "bg-white text-teal-950 border-amber-300 ring-4 ring-amber-300/40 eq-draggable"
                        : "bg-white/95 text-teal-950 border-transparent hover:border-amber-300 eq-draggable"
                    }`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline of the day */}
          <div className="lg:col-span-8 space-y-2">
            {moments.map(m => {
              const item = assigned[m.id];
              return (
                <div
                  key={m.id}
                  {...(item ? {} : dnd.targetProps(m.id, `${m.time} ${m.label}: replace ${m.disposable}`))}
                  className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                    item
                      ? "bg-emerald-50 border-emerald-400"
                      : dnd.overTarget === m.id
                      ? "bg-amber-50 border-amber-400 scale-[1.01]"
                      : dnd.selected
                      ? "bg-white border-dashed border-amber-300 cursor-pointer hover:bg-amber-50"
                      : "bg-white border-slate-200"
                  } ${shake && shake.id === m.id ? "eq-shake" : ""}`}
                >
                  <span className="w-16 shrink-0 text-[11px] font-extrabold text-slate-500">{m.time}</span>
                  <span className="text-2xl">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold text-slate-900">{m.label}</div>
                    <div className={`text-[11px] ${item ? "text-slate-400 line-through" : "text-rose-600 font-semibold"}`}>
                      Tempted by: {m.disposable}
                    </div>
                  </div>
                  {item && (
                    <span className="eq-pop shrink-0 text-[11px] font-bold bg-white border border-emerald-300 text-emerald-800 rounded-xl px-2 py-1">
                      {item.emoji} {item.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {feedback && !done && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {done && (
          <kit.RoundBreak title="Zero-waste day complete! 🌍" fact={fact} onNext={() => onFinish({ score, maxScore: moments.length * 10, summary: misses.current })} nextLabel="See Results">
            <p className="text-xs text-emerald-900">
              You avoided <strong>{moments.length}</strong> disposable items today. Repeat that daily and it's about <strong>{(moments.length * 365).toLocaleString()}</strong> items a year!
            </p>
          </kit.RoundBreak>
        )}
      </div>
    );
  };

  // ───────────── 2. Eco Shopping Spree ─────────────
  window.EcoQuestGames["eco-shopping-spree"] = function({ game, onFinish }) {
    const { budget, needs, fact } = game.content;
    const [shelves] = useState(() => needs.map(n => ({ ...n, options: kit.shuffle(n.options) })));
    const [picks, setPicks] = useState({}); // needId -> option index
    const [checkedOut, setCheckedOut] = useState(false);

    const chosenCount = Object.keys(picks).length;
    const total = shelves.reduce((sum, n) => sum + (picks[n.id] !== undefined ? n.options[picks[n.id]].price : 0), 0);
    const ecoScore = shelves.reduce((sum, n) => sum + (picks[n.id] !== undefined ? n.options[picks[n.id]].eco : 0), 0);
    const overBudget = total > budget;
    const canCheckout = chosenCount === shelves.length && !overBudget;

    const pick = (needId, i) => {
      if (checkedOut) return;
      kit.sfx.click();
      setPicks(p => ({ ...p, [needId]: i }));
    };

    const checkout = () => {
      if (!canCheckout) return;
      if (ecoScore >= 80) kit.sfx.correct(); else kit.sfx.click();
      setCheckedOut(true);
    };

    const finish = () => {
      const summary = shelves
        .filter(n => n.options[picks[n.id]].eco < 20)
        .map(n => {
          const best = n.options.find(o => o.eco === 20);
          return `${n.label}: "${best.label}" (${best.price} coins) was the greenest choice — ${best.why}`;
        });
      onFinish({ score: ecoScore, maxScore: shelves.length * 20, summary });
    };

    return (
      <div className="space-y-5">
        <kit.GameHud
          score={checkedOut ? ecoScore : 0}
          current={chosenCount}
          total={shelves.length}
          label={`Items in cart: ${chosenCount}/${shelves.length}`}
          extra={
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${overBudget ? "bg-rose-100 text-rose-700 eq-shake" : "bg-yellow-100 text-yellow-900"}`}>
              🛒 {total}/{budget} coins
            </span>
          }
        />

        <div className="space-y-4">
          {shelves.map(n => (
            <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
              <div className="text-xs font-extrabold text-slate-900 mb-2">{n.emoji} {n.label}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="radiogroup" aria-label={n.label}>
                {n.options.map((o, i) => {
                  const selected = picks[n.id] === i;
                  return (
                    <button
                      key={o.label}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => pick(n.id, i)}
                      disabled={checkedOut}
                      className={`quiz-option-btn relative p-3 rounded-xl border-2 text-left flex items-start gap-2 ${
                        selected ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300/40" : "border-slate-200 bg-slate-50 hover:border-emerald-300"
                      } ${checkedOut && !selected ? "opacity-60" : ""}`}
                    >
                      <span className="text-2xl">{o.emoji}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[11px] sm:text-xs font-bold text-slate-900 leading-snug">{o.label}</span>
                        <span className="block text-[11px] font-extrabold text-yellow-800 mt-0.5">🪙 {o.price}</span>
                        {checkedOut && (
                          <span className={`block text-[10px] font-extrabold mt-1 ${o.eco === 20 ? "text-emerald-700" : o.eco >= 10 ? "text-amber-700" : "text-rose-700"}`}>
                            Eco-rating: {"🌿".repeat(o.eco === 20 ? 3 : o.eco >= 10 ? 2 : o.eco > 0 ? 1 : 0) || "✕"} ({o.eco}/20)
                          </span>
                        )}
                      </span>
                      {selected && <span className="absolute top-1.5 right-2 text-emerald-600 font-black">✓</span>}
                    </button>
                  );
                })}
              </div>
              {checkedOut && (
                <p className="text-[11px] text-slate-600 mt-2 eq-slide-up">💡 {n.options[picks[n.id]].why}</p>
              )}
            </div>
          ))}
        </div>

        {!checkedOut ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className={`text-xs font-semibold ${overBudget ? "text-rose-700" : "text-slate-600"}`}>
              {overBudget
                ? `You're ${total - budget} coins over budget — swap something cheaper.`
                : chosenCount < shelves.length
                ? `Choose one product for each item (${shelves.length - chosenCount} left).`
                : "Cart ready! Check out to see your eco-rating."}
            </p>
            <button
              onClick={checkout}
              disabled={!canCheckout}
              className="shrink-0 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-extrabold shadow-md shadow-emerald-600/30 transition-all"
            >
              🧾 Checkout
            </button>
          </div>
        ) : (
          <kit.Feedback
            tone={ecoScore >= 80 ? "good" : ecoScore >= 50 ? "info" : "bad"}
            title={`Eco-rating: ${ecoScore}/100 • Spent ${total}/${budget} coins`}
            onNext={finish}
            nextLabel="See Results"
          >
            {ecoScore === 100 ? "A perfect green cart — and it fit the budget! " : "Every product with a lower rating has a greener option on the same shelf. "}
            {fact}
          </kit.Feedback>
        )}
      </div>
    );
  };

  // ───────────── 3. Decomposition Timeline ─────────────
  window.EcoQuestGames["decomposition-timeline"] = function({ game, onFinish }) {
    const { zones, items, source, fact } = game.content;
    const [tray, setTray] = useState(() => kit.shuffle(items));
    const [placed, setPlaced] = useState({}); // zoneId -> [item]
    const [attempts, setAttempts] = useState({});
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [shake, setShake] = useState(null);
    const misses = useRef([]);

    const done = tray.length === 0;
    const count = items.length - tray.length;

    const drop = (itemId, zoneId) => {
      const item = tray.find(i => i.id === String(itemId));
      if (!item) return;
      const zone = zones.find(z => z.id === zoneId);
      const tries = attempts[item.id] || 0;
      if (item.zone === zoneId) {
        const pts = tries === 0 ? 10 : 5;
        kit.sfx.correct();
        setScore(s => s + pts);
        setTray(t => t.filter(i => i.id !== item.id));
        setPlaced(p => ({ ...p, [zoneId]: [...(p[zoneId] || []), item] }));
        setFeedback({ tone: "good", title: `${item.emoji} ${item.name}: ${item.estimate} (+${pts})`, text: item.why, key: item.id });
      } else {
        kit.sfx.wrong();
        const zi = zones.findIndex(z => z.id === zoneId);
        const ci = zones.findIndex(z => z.id === item.zone);
        if (tries === 0) misses.current.push(`${item.name}: ${item.estimate}. ${item.why}`);
        setAttempts(a => ({ ...a, [item.id]: tries + 1 }));
        setShake({ id: zoneId, key: Date.now() });
        setFeedback({
          tone: "bad",
          title: `Not "${zone.label}" — it lasts ${ci > zi ? "LONGER" : "a SHORTER time"} than that`,
          text: ci > zi ? "Think about whether the material is natural, metal, plastic or glass." : "Natural materials break down faster than you might think.",
          key: item.id + tries
        });
      }
    };

    const dnd = kit.useDragTap(drop);

    return (
      <div className="space-y-5">
        <kit.GameHud score={score} current={count} total={items.length} label={`Items placed: ${count}/${items.length}`} />

        {!done && (
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">Litter found on the beach</h3>
            <div className="flex flex-wrap gap-2">
              {tray.map(i => (
                <div
                  key={i.id}
                  {...dnd.itemProps(i.id, `${i.name}. Select, then choose a time zone.`)}
                  className={`eq-draggable eq-bounce-in flex items-center gap-2 px-3 py-2 rounded-2xl border-2 bg-white text-xs font-bold text-slate-800 shadow-sm ${
                    dnd.selected === i.id ? "border-emerald-500 ring-4 ring-emerald-300/40" : "border-slate-200 hover:border-cyan-400"
                  }`}
                >
                  <span className="text-2xl">{i.emoji}</span>
                  <span>{i.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          <div className="hidden sm:block absolute left-0 right-0 top-6 h-1.5 bg-gradient-to-r from-lime-400 via-amber-400 to-rose-600 rounded-full" aria-hidden="true"></div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3 relative">
            {zones.map((z, idx) => (
              <div
                key={z.id}
                {...dnd.targetProps(z.id, `Breaks down in: ${z.label}`)}
                className={`rounded-2xl border-2 p-3 bg-white transition-all min-h-[88px] sm:min-h-[180px] ${
                  dnd.overTarget === z.id ? "border-cyan-500 bg-cyan-50 scale-[1.03]" : dnd.selected ? "border-dashed border-cyan-300 cursor-pointer hover:bg-cyan-50" : "border-slate-200"
                } ${shake && shake.id === z.id ? "eq-shake" : ""}`}
              >
                <div className="flex sm:flex-col items-center gap-2 sm:gap-1 text-center">
                  <span className="w-9 h-9 shrink-0 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center text-lg shadow-sm">{z.emoji}</span>
                  <span className="text-xs font-extrabold text-slate-900">{z.label}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase sm:block hidden">{["Shortest", "", "", "", "Longest"][idx]}</span>
                </div>
                <div className="flex flex-wrap sm:flex-col gap-1 mt-2">
                  {(placed[z.id] || []).map(i => (
                    <span key={i.id} className="eq-pop text-[10px] font-bold bg-cyan-50 border border-cyan-200 text-cyan-950 rounded-lg px-1.5 py-1 leading-tight">
                      {i.emoji} {i.name}
                      <span className="block text-[9px] text-cyan-700 font-semibold">{i.estimate}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {feedback && !done && (
          <kit.Feedback key={feedback.key} tone={feedback.tone} title={feedback.title}>{feedback.text}</kit.Feedback>
        )}

        {done && (
          <kit.RoundBreak title="Timeline complete! ⏳" fact={fact} onNext={() => onFinish({ score, maxScore: items.length * 10, summary: misses.current })} nextLabel="See Results">
            <p className="text-[11px] text-slate-500">{source}</p>
          </kit.RoundBreak>
        )}
      </div>
    );
  };
})();

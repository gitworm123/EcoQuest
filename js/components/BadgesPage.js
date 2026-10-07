// EcoQuest - Badges Showcase, Rewards & Certificate Modal
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.BadgesPage = function({ currentUser }) {
    const allBadges = window.EcoQuestData.badges;
    const rewardsStore = window.EcoQuestData.rewardsStore;
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [certificateModalOpen, setCertificateModalOpen] = useState(false);

    const userBadges = currentUser?.badges || [];

    const unlockedCount = allBadges.filter(b => userBadges.includes(b.id)).length;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Gamified Accolades & Credentials
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Eco Badges & Rewards
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Unlock rare environmental honors through field action, quiz excellence, and consistent participation.
          </p>

          <div className="pt-2 inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm text-xs font-bold text-slate-700">
            <span>Unlocked: <strong className="text-emerald-700">{unlockedCount}</strong> of {allBadges.length} Badges</span>
            <span>•</span>
            <button
              onClick={() => setCertificateModalOpen(true)}
              className="text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 font-extrabold"
            >
              <span>View Official Certificate</span>
              <span>📜</span>
            </button>
          </div>
        </div>

        {/* BADGES SHOWCASE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBadges.map((badge) => {
            const isUnlocked = userBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`badge-card rounded-3xl p-6 border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? "bg-white border-emerald-300 shadow-md hover:border-emerald-500"
                    : "bg-slate-50/70 border-slate-200/90 opacity-70 hover:opacity-100"
                }`}
              >
                {/* Glow bar if unlocked */}
                {isUnlocked && (
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${badge.gradient}`}></div>
                )}

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                      isUnlocked ? "bg-emerald-50 border border-emerald-200" : "bg-slate-200 text-slate-400 grayscale"
                    }`}>
                      {badge.emoji}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        isUnlocked
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {isUnlocked ? "✓ Unlocked" : "🔒 Locked"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{badge.rarity}</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 font-heading">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100/80 space-y-2">
                  <div className="text-[11px] text-slate-500">
                    <strong className="text-slate-700">Requirement:</strong> {badge.requirement}
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-emerald-700">+{badge.xpReward} XP Value</span>
                    <span className="text-[11px] text-slate-400 font-medium hover:text-emerald-600">Details →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ECO REWARDS STORE */}
        <section className="bg-emerald-50/60 rounded-3xl p-8 sm:p-12 border border-emerald-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Redeemable Perks & Recognition
              </span>
              <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
                EcoQuest Rewards Store
              </h2>
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950 shadow-sm">
              Your Balance: ✨ {currentUser?.xp || 1420} XP
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardsStore.map((reward) => {
              const canAfford = (currentUser?.xp || 0) >= reward.xpCost;

              return (
                <div key={reward.id} className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">
                      {reward.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-black text-xs text-emerald-800">
                      {reward.xpCost} XP
                    </span>
                    <button
                      onClick={() => {
                        if (reward.instantUnlock) {
                          setCertificateModalOpen(true);
                        } else {
                          alert(`Reward "${reward.title}" submitted to Campus Sustainability Council for processing!`);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        canAfford
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {reward.instantUnlock ? "View / Print" : "Redeem Perk"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* OFFICIAL PRINTABLE CERTIFICATE MODAL */}
        {certificateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-emerald-200 flex flex-col max-h-[92vh]">
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Official Sustainability Credential Preview</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm"
                  >
                    🖨️ Print Certificate
                  </button>
                  <button
                    onClick={() => setCertificateModalOpen(false)}
                    className="text-slate-500 hover:text-slate-800 p-1"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Printable Certificate Frame */}
              <div className="p-8 sm:p-12 overflow-y-auto bg-amber-50/20 text-slate-900 border-8 border-double border-emerald-800 m-4 rounded-2xl relative">
                <div className="text-center space-y-4">
                  <div className="text-3xl">🌿</div>
                  <h3 className="text-2xl font-black font-heading uppercase tracking-widest text-emerald-950">
                    Certificate of Environmental Excellence
                  </h3>
                  <p className="text-xs text-slate-500 tracking-wider uppercase font-semibold">
                    EcoQuest Higher Education Sustainability Initiative
                  </p>

                  <div className="py-4">
                    <p className="text-xs text-slate-600 italic">This credential certifies that</p>
                    <h2 className="text-3xl font-extrabold font-heading text-emerald-900 mt-1 border-b-2 border-emerald-300 pb-2 inline-block px-8">
                      {currentUser?.name || "Aarav Sharma"}
                    </h2>
                    <p className="text-xs text-slate-600 mt-2 font-medium">
                      {currentUser?.institution || "Greenwood Institute of Technology"}
                    </p>
                  </div>

                  <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                    Has demonstrated exceptional practical commitment to planetary stewardship by completing verified field missions, mastering core environmental modules, and accumulating <strong>{currentUser?.xp || 1420} Eco-Experience Points</strong>.
                  </p>

                  <div className="pt-8 flex items-center justify-between border-t border-slate-300 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">Prof. Ananya Sen</div>
                      <div className="text-[10px] text-slate-500">Director of Sustainability</div>
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-600 flex items-center justify-center text-[10px] font-black text-emerald-800 rotate-12">
                      VERIFIED SEAL
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">October 2026</div>
                      <div className="text-[10px] text-slate-500">Academic Term Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
})();

// EcoQuest - Eco Missions & Field Action Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.MissionsPage = function({
    currentUser,
    onNavigate,
    onSubmitMissionProof
  }) {
    const missions = window.EcoQuestData.missions;
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeMissionModal, setActiveMissionModal] = useState(null);

    // Submission modal inputs
    const [studentNotes, setStudentNotes] = useState("");
    const [metricValue, setMetricValue] = useState("");
    const [proofPhotoPreview, setProofPhotoPreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const completedMissions = currentUser?.completedMissions || [];
    const inProgressMissions = currentUser?.inProgressMissions || [];

    // Filter missions
    const filteredMissions = missions.filter(m => {
      const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "all" ? true : m.topicId === selectedCategory;
      const matchDiff = selectedDifficulty === "all" ? true : m.difficulty === selectedDifficulty;
      return matchSearch && matchCategory && matchDiff;
    });

    const openSubmissionModal = (mission) => {
      setActiveMissionModal(mission);
      setStudentNotes("");
      setMetricValue(mission.impactMetric.defaultValue);
      setProofPhotoPreview(mission.sampleProofPhoto);
      window.EcoQuestUtils.audio.playClick();
    };

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProofPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (!activeMissionModal) return;

      setIsSubmitting(true);
      setTimeout(() => {
        onSubmitMissionProof({
          missionId: activeMissionModal.id,
          studentNotes: studentNotes || "Completed practical environmental mission on campus.",
          proofPhoto: proofPhotoPreview || activeMissionModal.sampleProofPhoto,
          metricValue: metricValue || activeMissionModal.impactMetric.defaultValue,
          metricKey: activeMissionModal.impactMetric.key
        });

        setIsSubmitting(false);
        setActiveMissionModal(null);
      }, 500);
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Real-World Environmental Challenges
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Eco Action Missions
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Take concepts out of the classroom. Plant trees, audit energy, segregate waste, and submit verified photo proof to earn XP and level up.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search missions (e.g. tree, water, plastic)..."
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy (100-200 XP)</option>
                <option value="Medium">Medium (200-300 XP)</option>
                <option value="Hard">Hard (300-400 XP)</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
            {[
              { id: "all", label: "All Challenges" },
              { id: "biodiversity", label: "🌳 Tree & Biodiversity" },
              { id: "waste-management", label: "🗑️ Waste Segregation" },
              { id: "water-conservation", label: "💧 Water Saving" },
              { id: "recycling-sustainability", label: "♻️ Anti-Plastic & Upcycling" },
              { id: "renewable-energy", label: "⚡ Energy Audit" },
              { id: "pollution", label: "🧹 Campus Drives" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* MISSIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMissions.map((mission) => {
            const isCompleted = completedMissions.includes(mission.id);
            const isInProgress = inProgressMissions.includes(mission.id);

            return (
              <div
                key={mission.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Mission Card Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={mission.image}
                      alt={mission.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md ${
                        mission.difficulty === "Easy"
                          ? "bg-emerald-500/90 text-white"
                          : mission.difficulty === "Medium"
                          ? "bg-amber-500/90 text-white"
                          : "bg-rose-500/90 text-white"
                      }`}>
                        {mission.difficulty}
                      </span>
                      <span className="bg-white/90 backdrop-blur-md text-slate-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        ⏳ {mission.duration}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 px-2.5 py-1 rounded-xl text-xs font-extrabold border border-emerald-500/30">
                      +{mission.xp} XP
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                        {mission.category}
                      </span>
                      <h3 className="text-base font-bold font-heading line-clamp-1">
                        {mission.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mission.description}
                    </p>

                    {/* Impact Metric & Badge Preview */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Target Metric:</span>
                        <span className="font-bold text-emerald-900">
                          {mission.impactMetric.defaultValue} {mission.impactMetric.unit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Unlocks Badge:</span>
                        <span className="font-bold text-amber-900">
                          {mission.badgeName}
                        </span>
                      </div>
                    </div>

                    {/* Step Guidelines Preview */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Verification Guidelines:
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                        {mission.verificationRequirement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  {isCompleted ? (
                    <div className="w-full py-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center justify-center gap-1.5">
                      <span>✓ Completed & Verified (+{mission.xp} XP)</span>
                    </div>
                  ) : isInProgress ? (
                    <button
                      onClick={() => openSubmissionModal(mission)}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Submit Proof (Pending)</span>
                      <span>📸</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openSubmissionModal(mission)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Start Mission & Submit Proof</span>
                      <span>→</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PROOF SUBMISSION MODAL */}
        {activeMissionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[92vh]">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-6 text-white relative">
                <button
                  onClick={() => setActiveMissionModal(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full text-base"
                >
                  ✕
                </button>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                  Mission Verification Gateway
                </span>
                <h3 className="text-xl font-bold font-heading mt-1">
                  {activeMissionModal.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-emerald-100 mt-1">
                  <span>+{activeMissionModal.xp} XP on approval</span>
                  <span>•</span>
                  <span>{activeMissionModal.badgeName}</span>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
                {/* Steps Reminder */}
                <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-900 mb-1">
                    📋 Submission Guidelines:
                  </div>
                  <p className="text-xs text-emerald-950">
                    {activeMissionModal.verificationRequirement}
                  </p>
                </div>

                {/* Metric Reported */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Impact Metric Value ({activeMissionModal.impactMetric.label})
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      required
                      value={metricValue}
                      onChange={(e) => setMetricValue(e.target.value)}
                      className="w-32 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 font-bold text-slate-800"
                    />
                    <span className="text-xs font-semibold text-slate-600">
                      {activeMissionModal.impactMetric.unit}
                    </span>
                  </div>
                </div>

                {/* Student Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Activity Description / Field Notes
                  </label>
                  <textarea
                    rows={3}
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    placeholder="Describe how, where, and when you completed this challenge..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800"
                  ></textarea>
                </div>

                {/* Photo Proof Upload & Sample Choice */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Photo / Document Proof
                    </label>
                    <button
                      type="button"
                      onClick={() => setProofPhotoPreview(activeMissionModal.sampleProofPhoto)}
                      className="text-[11px] text-emerald-700 font-bold hover:underline"
                    >
                      ⚡ Use Verified Sample Photo (Instant Demo)
                    </button>
                  </div>

                  {proofPhotoPreview ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 h-44 bg-slate-100">
                      <img
                        src={proofPhotoPreview}
                        alt="Proof preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setProofPhotoPreview("")}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm"
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="text-3xl mb-1">📷</div>
                      <div className="text-xs font-bold text-slate-700">Click to upload photo or drag & drop</div>
                      <div className="text-[10px] text-slate-400 mt-1">PNG, JPG or JPEG up to 10MB</div>
                    </div>
                  )}
                </div>

                {/* Submit to Teacher Queue Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? "Uploading Submission..." : "Submit to Faculty Review Queue"}</span>
                    <span>📤</span>
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Submissions are queued for teacher verification. Once approved, you receive +{activeMissionModal.xp} XP and badge unlocks!
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
})();

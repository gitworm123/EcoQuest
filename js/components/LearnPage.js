// EcoQuest - Learn Page Component (Curriculum & Deep Lesson Reader)
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.LearnPage = function({ onNavigate, onStartTopicQuiz }) {
    const topics = window.EcoQuestData.topics;
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    const filteredTopics = topics.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      if (selectedFilter === "all") return matchesSearch;
      if (selectedFilter === "water") return matchesSearch && t.id.includes("water");
      if (selectedFilter === "waste") return matchesSearch && (t.id.includes("waste") || t.id.includes("recycling"));
      if (selectedFilter === "climate") return matchesSearch && (t.id.includes("climate") || t.id.includes("energy"));
      return matchesSearch;
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Environmental Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Interactive Eco Knowledge Modules
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Explore 7 core environmental domains. Read deep lesson guides, master fundamental concepts, and take quizzes to earn XP.
          </p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, keywords, concepts..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Topics (7)" },
              { id: "waste", label: "Waste & Circular" },
              { id: "water", label: "Water & Oceans" },
              { id: "climate", label: "Climate & Energy" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* TOPICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Hero Card Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={topic.heroImage}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-900 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm">
                    {topic.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                      {topic.sdgGoal}
                    </span>
                    <h3 className="text-xl font-bold font-heading drop-shadow-sm">
                      {topic.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topic.shortDesc}
                  </p>

                  <div className="bg-emerald-50/70 rounded-2xl p-3 border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1.5">
                      Key Takeaway
                    </span>
                    <p className="text-xs text-emerald-950 font-medium">
                      "{topic.keyTakeaways[0]}"
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span className="font-semibold text-slate-700">⏱️ {topic.readTime}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-600">
                      Level: {topic.relatedQuizDifficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => setSelectedTopic(topic)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Lesson Guide</span>
                  <span>📖</span>
                </button>
                <button
                  onClick={() => onStartTopicQuiz(topic.id)}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Take Topic Quiz (+XP)</span>
                  <span>⚡</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FULL LESSON MODAL */}
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[92vh]">
              {/* Modal Banner */}
              <div className="relative h-48 sm:h-56">
                <img
                  src={selectedTopic.heroImage}
                  alt={selectedTopic.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors text-sm"
                >
                  ✕
                </button>
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                    {selectedTopic.sdgGoal}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mt-1">
                    {selectedTopic.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                    <span>⏱️ {selectedTopic.readTime}</span>
                    <span>•</span>
                    <span>🏅 {selectedTopic.badge}</span>
                  </div>
                </div>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
                {/* Did You Know Box */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <strong className="font-bold text-amber-950 block mb-0.5">Did You Know?</strong>
                    {selectedTopic.didYouKnow}
                  </div>
                </div>

                {/* Subtopics Detailed Content */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-slate-900 border-b border-slate-200 pb-2">
                    Core Conceptual Syllabus
                  </h3>
                  {selectedTopic.subtopics.map((sub, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-emerald-950">
                        {sub.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900 border-b border-slate-200 pb-2 mb-3">
                    Key Practical Takeaways
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedTopic.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Stat */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <strong className="font-bold text-emerald-950 block mb-0.5">Measurable Impact Metric</strong>
                    {selectedTopic.impactStat}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Close Lesson
                </button>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const topicId = selectedTopic.id;
                      setSelectedTopic(null);
                      onNavigate("missions");
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors"
                  >
                    View Related Missions
                  </button>
                  <button
                    onClick={() => {
                      const topicId = selectedTopic.id;
                      setSelectedTopic(null);
                      onStartTopicQuiz(topicId);
                    }}
                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Take Quiz (+XP)</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
})();

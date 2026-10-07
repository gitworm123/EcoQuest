// EcoQuest - Teacher & Faculty Verification Dashboard Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState } = React;

  window.EcoQuestComponents.TeacherDashboard = function({
    currentUser,
    submissions,
    onVerifySubmission,
    onNavigate
  }) {
    const [queueTab, setQueueTab] = useState("pending"); // "pending" | "approved" | "rejected"
    const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);
    const [feedbackInputs, setFeedbackInputs] = useState({});

    const teacher = currentUser?.role === "teacher"
      ? currentUser
      : window.EcoQuestData.mockUsers.teacher;

    const filteredSubmissions = (submissions || []).filter(s => s.status === queueTab);
    const pendingCount = (submissions || []).filter(s => s.status === "pending").length;

    const handleAction = (submissionId, decision) => {
      const feedback = feedbackInputs[submissionId] || "";
      onVerifySubmission(submissionId, decision, feedback);
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* TEACHER HEADER BANNER */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                    {teacher.name}
                  </h1>
                  <span className="text-xs bg-emerald-700/80 px-2.5 py-0.5 rounded-full font-bold">
                    Faculty Admin
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                  {teacher.designation} • {teacher.department}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300">
                  <span>Assigned Classes: {teacher.assignedClasses?.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center md:text-right">
              <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                Action Required
              </div>
              <div className="text-2xl font-black text-white font-heading mt-0.5">
                {pendingCount} Submissions
              </div>
              <div className="text-[11px] text-emerald-200 mt-0.5">
                Waiting for teacher verification
              </div>
            </div>
          </div>
        </div>

        {/* 4 CLASS ANALYTICS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <span className="text-2xl mb-1 block">👥</span>
            <div className="text-2xl font-black text-slate-900 font-heading">
              {teacher.totalStudents || 48}
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Enrolled Students</div>
            <div className="text-[10px] text-emerald-600 mt-1 font-bold">Across 3 academic cohorts</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <span className="text-2xl mb-1 block">📊</span>
            <div className="text-2xl font-black text-emerald-700 font-heading">
              {teacher.avgQuizScore || 78.4}%
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Average Quiz Score</div>
            <div className="text-[10px] text-emerald-600 mt-1 font-bold">▲ +4.2% from last term</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <span className="text-2xl mb-1 block">🎯</span>
            <div className="text-2xl font-black text-teal-700 font-heading">
              {teacher.missionCompletionRate || 84.2}%
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Mission Completion Rate</div>
            <div className="text-[10px] text-teal-600 mt-1 font-bold">142 total activities verified</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <span className="text-2xl mb-1 block">⚡</span>
            <div className="text-2xl font-black text-amber-700 font-heading">
              {teacher.activeParticipationRate || 91.5}%
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Active Student Rate</div>
            <div className="text-[10px] text-amber-600 mt-1 font-bold">High campus engagement</div>
          </div>
        </div>

        {/* ACTIVITY VERIFICATION QUEUE SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Verification Gateway
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-2">
                Student Activity Verification Queue
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Review photos and activity notes submitted by students to grant XP and unlock official badges.
              </p>
            </div>

            {/* Queue Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl self-start sm:self-auto">
              <button
                onClick={() => setQueueTab("pending")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  queueTab === "pending"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Pending Review</span>
                {pendingCount > 0 && (
                  <span className="bg-rose-500 text-white px-1.5 py-0.2 rounded-full text-[10px]">
                    {pendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setQueueTab("approved")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  queueTab === "approved"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Approved History
              </button>
              <button
                onClick={() => setQueueTab("rejected")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  queueTab === "rejected"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Submissions Cards List */}
          <div className="space-y-4">
            {filteredSubmissions.length ? (
              filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-slate-300 transition-colors"
                >
                  {/* Left: Student & Mission Details */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={sub.studentAvatar}
                      alt={sub.studentName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-300 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">
                          {sub.studentName}
                        </h4>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {sub.studentGrade}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          • {sub.timeAgo || sub.submittedAt}
                        </span>
                      </div>

                      <div className="text-xs font-extrabold text-emerald-800">
                        Mission: {sub.missionTitle}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        "{sub.studentNotes}"
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-xs">
                        <span className="font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-200">
                          Impact: {sub.metricsClaimed}
                        </span>
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          Reward: +{sub.xpReward} XP
                        </span>
                      </div>

                      {sub.teacherFeedback && (
                        <div className="text-xs text-slate-500 bg-white p-2 rounded-xl border border-slate-200 mt-2">
                          <strong>Faculty Note:</strong> {sub.teacherFeedback}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle: Photo Proof Thumbnail */}
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => setSelectedPhotoModal(sub.proofPhoto)}
                      className="w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-300 relative cursor-pointer group shadow-sm flex-shrink-0"
                    >
                      <img
                        src={sub.proofPhoto}
                        alt="Submitted Proof"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                        🔍 Expand
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  {sub.status === "pending" && (
                    <div className="w-full lg:w-64 space-y-2 flex-shrink-0">
                      <input
                        type="text"
                        placeholder="Add faculty feedback..."
                        value={feedbackInputs[sub.id] || ""}
                        onChange={(e) => setFeedbackInputs({ ...feedbackInputs, [sub.id]: e.target.value })}
                        className="w-full text-xs px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(sub.id, "approved")}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          ✓ Approve (+{sub.xpReward} XP)
                        </button>
                        <button
                          onClick={() => handleAction(sub.id, "rejected")}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {sub.status === "approved" && (
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold">
                      ✓ Approved (+{sub.xpReward} XP)
                    </span>
                  )}

                  {sub.status === "rejected" && (
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 rounded-xl text-xs font-bold">
                      ✕ Rejected
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                No submissions currently in the "{queueTab}" state.
              </div>
            )}
          </div>
        </section>

        {/* WEAK TOPICS DIAGNOSTICS & CLASS PROGRESS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Class Weak Topics Diagnostic */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                AI Diagnostic Detection
              </span>
              <h3 className="text-base font-bold font-heading text-slate-900 mt-2">
                Class Weak Areas Requiring Remedial Attention
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Identified based on aggregated student quiz attempts across assigned cohorts.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {(teacher.weakTopicsIdentified || []).map((wt, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{wt.topic}</span>
                    <span className="text-rose-600 font-bold">{wt.avgScore}% Class Avg</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-rose-500 h-2 rounded-full"
                      style={{ width: `${wt.avgScore}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{wt.studentsStruggling} students scoring below 60%</span>
                    <button
                      onClick={() => onNavigate("quizzes")}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Assign Topic Quiz →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Enrolled Student Roster Table */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold font-heading text-slate-900">
                Top Student Standings in Assigned Classes
              </h3>
              <button
                onClick={() => onNavigate("leaderboard")}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Full Leaderboard →
              </button>
            </div>

            <div className="space-y-2.5">
              {window.EcoQuestData.leaderboards.students.slice(0, 5).map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-400 w-5">#{st.rank}</span>
                    <img src={st.avatar} className="w-8 h-8 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-slate-900">{st.name}</div>
                      <div className="text-[10px] text-slate-500">{st.grade}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-600 font-medium">🎯 {st.missionsCompleted} done</span>
                    <span className="font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl">
                      {st.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EXPANDED PROOF PHOTO MODAL */}
        {selectedPhotoModal && (
          <div
            onClick={() => setSelectedPhotoModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer animate-fadeIn"
          >
            <div className="relative max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img
                src={selectedPhotoModal}
                alt="Enlarged proof"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="absolute top-4 right-4 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
})();

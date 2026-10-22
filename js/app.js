// EcoQuest - Main React Application Component
window.EcoQuest = window.EcoQuest || {};

(function() {
  const { useState, useEffect } = React;

  window.EcoQuest.App = function() {
    const [appState, setAppState] = useState(() => window.EcoQuestUtils.storage.getState());
    const [currentPage, setCurrentPage] = useState("home");
    const [selectedQuizTopic, setSelectedQuizTopic] = useState(null);
    const [gamesTopicId, setGamesTopicId] = useState(null);
    const [gamesViewKey, setGamesViewKey] = useState(0);
    const [learnTopicId, setLearnTopicId] = useState(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    const currentUser = window.EcoQuestUtils.storage.getCurrentUser();
    const personaKey = appState.currentPersonaKey;
    const soundEnabled = appState.soundEnabled;

    // Toast helper
    const addToast = (title, message, type = "success") => {
      const id = Date.now() + Math.random();
      setToasts(prev => [...prev, { id, title, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4500);
    };

    const handleDismissToast = (id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleNavigate = (page) => {
      window.EcoQuestUtils.audio.playClick();
      if (page === "games") {
        setGamesTopicId(null);
        setGamesViewKey(k => k + 1);
      }
      if (page === "learn") setLearnTopicId(null);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleOpenTopicGames = (topicId) => {
      window.EcoQuestUtils.audio.playClick();
      setGamesTopicId(topicId);
      setGamesViewKey(k => k + 1);
      setCurrentPage("games");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleOpenLesson = (topicId) => {
      window.EcoQuestUtils.audio.playClick();
      setLearnTopicId(topicId);
      setCurrentPage("learn");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStartTopicQuiz = (topicId) => {
      setSelectedQuizTopic(topicId);
      setCurrentPage("quizzes");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSwitchPersona = (newKey) => {
      window.EcoQuestUtils.storage.setCurrentPersona(newKey);
      setAppState({ ...window.EcoQuestUtils.storage.getState() });
      window.EcoQuestUtils.audio.playClick();

      const newU = window.EcoQuestUtils.storage.getCurrentUser();
      addToast(
        "Role Switched Successfully",
        `Now viewing EcoQuest as ${newU.name} (${newU.role === "teacher" ? "Faculty" : "Student"}).`,
        "info"
      );

      // Route to appropriate dashboard if on dashboard
      if (currentPage === "student-dashboard" && newU.role === "teacher") {
        setCurrentPage("teacher-dashboard");
      } else if (currentPage === "teacher-dashboard" && newU.role === "student") {
        setCurrentPage("student-dashboard");
      }
    };

    const handleToggleSound = () => {
      const newVal = !soundEnabled;
      window.EcoQuestUtils.storage.setSoundEnabled(newVal);
      setAppState({ ...window.EcoQuestUtils.storage.getState() });
      if (newVal) window.EcoQuestUtils.audio.playClick();
    };

    const handleSubmitMissionProof = (submissionData) => {
      const newSub = window.EcoQuestUtils.storage.submitMissionProof(submissionData);
      setAppState({ ...window.EcoQuestUtils.storage.getState() });
      window.EcoQuestUtils.audio.playXP();

      addToast(
        "Mission Submitted for Verification! 📸",
        `Your field proof has been queued for faculty review. You will receive +${newSub.xpReward} XP upon teacher approval!`,
        "success"
      );
    };

    const handleVerifySubmission = (submissionId, decision, feedback) => {
      const result = window.EcoQuestUtils.storage.verifySubmission(submissionId, decision, feedback);
      setAppState({ ...window.EcoQuestUtils.storage.getState() });

      if (decision === "approved") {
        window.EcoQuestUtils.audio.playLevelUp();
        if (typeof confetti === "function") {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
        addToast(
          "Submission Approved! 🎉",
          `Verified "${result.missionTitle}" for ${result.studentName}. Awarded +${result.xpAwarded} XP!`,
          "success"
        );
        if (result.badgeUnlocked) {
          addToast(
            "Badge Unlocked for Student! 🏆",
            `${result.studentName} earned the "${result.badgeUnlocked.name}" badge!`,
            "badge"
          );
        }
      } else {
        window.EcoQuestUtils.audio.playWrong();
        addToast(
          "Submission Rejected",
          `Status updated for "${result.missionTitle}". Student notified.`,
          "error"
        );
      }
    };

    const handleQuizComplete = (resultData) => {
      setAppState({ ...window.EcoQuestUtils.storage.getState() });
      addToast(
        "Quiz XP Awarded! 🧠",
        `You scored ${resultData.scorePercent}% and gained +${resultData.xpEarned} XP!`,
        "success"
      );
      if (resultData.badgeUnlocked) {
        addToast(
          "New Badge Unlocked! 🏆",
          `Congratulations! You unlocked the "${resultData.badgeUnlocked.name}" badge!`,
          "badge"
        );
      }
    };

    const handleGameComplete = (game, reward) => {
      setAppState({ ...window.EcoQuestUtils.storage.getState() });
      if (!reward) return;
      if (reward.xpEarned > 0) {
        addToast(
          "Mini-Game XP Awarded! 🎮",
          `"${game.title}" — you scored ${reward.percent}% and gained +${reward.xpEarned} XP!`,
          "success"
        );
      }
      if (reward.leveledUp) {
        addToast("Level Up! 🚀", `You are now a ${reward.newLevelTitle}!`, "badge");
      }
      if (reward.badgeUnlocked) {
        addToast(
          "New Badge Unlocked! 🏆",
          `Congratulations! You unlocked the "${reward.badgeUnlocked.name}" badge!`,
          "badge"
        );
      }
    };

    const handleResetDemoData = () => {
      const fresh = window.EcoQuestUtils.storage.resetDemoData();
      setAppState({ ...fresh });
      window.EcoQuestUtils.audio.playCorrect();
      addToast(
        "Demo State Reset Completed",
        "All student XP, teacher queues, and metrics restored to clean factory defaults.",
        "info"
      );
    };

    return (
      <div className="min-h-screen flex flex-col eco-grid-bg text-slate-800">
        {/* Navigation Bar */}
        <window.EcoQuestComponents.Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          personaKey={personaKey}
          onSwitchPersona={handleSwitchPersona}
          onOpenAuth={() => setAuthModalOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        {/* Page Content Rendering */}
        <main className="flex-1">
          {currentPage === "home" && (
            <window.EcoQuestComponents.LandingPage
              onNavigate={handleNavigate}
              globalImpact={appState.globalImpact}
            />
          )}

          {currentPage === "about" && (
            <window.EcoQuestComponents.AboutPage
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === "learn" && (
            <window.EcoQuestComponents.LearnPage
              onNavigate={handleNavigate}
              onStartTopicQuiz={handleStartTopicQuiz}
              onOpenTopicGames={handleOpenTopicGames}
              initialTopicId={learnTopicId}
            />
          )}

          {currentPage === "games" && (
            <window.EcoQuestComponents.GamesPage
              key={gamesViewKey}
              currentUser={currentUser}
              initialTopicId={gamesTopicId}
              onNavigate={handleNavigate}
              onOpenLesson={handleOpenLesson}
              onStartTopicQuiz={handleStartTopicQuiz}
              onGameComplete={handleGameComplete}
            />
          )}

          {currentPage === "quizzes" && (
            <window.EcoQuestComponents.QuizPage
              selectedTopicId={selectedQuizTopic}
              onQuizComplete={handleQuizComplete}
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          )}

          {currentPage === "missions" && (
            <window.EcoQuestComponents.MissionsPage
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onSubmitMissionProof={handleSubmitMissionProof}
            />
          )}

          {currentPage === "leaderboard" && (
            <window.EcoQuestComponents.LeaderboardPage
              currentUser={currentUser}
            />
          )}

          {currentPage === "badges" && (
            <window.EcoQuestComponents.BadgesPage
              currentUser={currentUser}
            />
          )}

          {currentPage === "impact" && (
            <window.EcoQuestComponents.ImpactDashboard
              globalImpact={appState.globalImpact}
            />
          )}

          {currentPage === "student-dashboard" && (
            <window.EcoQuestComponents.StudentDashboard
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onStartTopicQuiz={handleStartTopicQuiz}
              onOpenTopicGames={handleOpenTopicGames}
            />
          )}

          {currentPage === "teacher-dashboard" && (
            <window.EcoQuestComponents.TeacherDashboard
              currentUser={currentUser}
              submissions={appState.submissions}
              onVerifySubmission={handleVerifySubmission}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === "profile" && (
            <window.EcoQuestComponents.ProfilePage
              currentUser={currentUser}
              personaKey={personaKey}
              onSwitchPersona={handleSwitchPersona}
              onResetDemoData={handleResetDemoData}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Footer */}
        <window.EcoQuestComponents.Footer
          onNavigate={handleNavigate}
        />

        {/* Auth Modal */}
        <window.EcoQuestComponents.AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginPersona={handleSwitchPersona}
          onRegisterUser={(data) => {
            addToast("Account Registered", `Welcome ${data.name}! You are now registered.`);
            handleSwitchPersona("student1");
          }}
        />

        {/* Toast Alerts System */}
        <window.EcoQuestComponents.ToastContainer
          toasts={toasts}
          onDismiss={handleDismissToast}
        />
      </div>
    );
  };
})();

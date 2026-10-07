// EcoQuest - Interactive Quiz Engine Component
window.EcoQuestComponents = window.EcoQuestComponents || {};

(function() {
  const { useState, useEffect, useRef } = React;

  window.EcoQuestComponents.QuizPage = function({
    selectedTopicId,
    onQuizComplete,
    onNavigate,
    currentUser
  }) {
    const allTopics = window.EcoQuestData.topics;
    const allQuestions = window.EcoQuestData.quizzes;

    const [topicFilter, setTopicFilter] = useState(selectedTopicId || "waste-management");
    const [difficulty, setDifficulty] = useState("Beginner"); // "Beginner" | "Intermediate" | "Advanced"
    const [quizActive, setQuizActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(25);
    const [timerActive, setTimerActive] = useState(false);
    const [quizResults, setQuizResults] = useState(null);

    // Filter questions based on topic and difficulty
    const currentQuestions = allQuestions.filter(q => {
      const matchTopic = topicFilter === "all" ? true : q.topicId === topicFilter;
      const matchDiff = q.difficulty === difficulty;
      return matchTopic && matchDiff;
    });

    const activeQuestion = currentQuestions[currentIndex];

    // Countdown Timer Effect
    useEffect(() => {
      let timer = null;
      if (quizActive && timerActive && timeLeft > 0 && !hasAnswered) {
        timer = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else if (timeLeft === 0 && !hasAnswered && quizActive) {
        // Time expired auto-select wrong
        handleOptionSelect(-1);
      }
      return () => clearInterval(timer);
    }, [quizActive, timerActive, timeLeft, hasAnswered]);

    // Update topic filter if parent passes down topic
    useEffect(() => {
      if (selectedTopicId) {
        setTopicFilter(selectedTopicId);
      }
    }, [selectedTopicId]);

    const startQuiz = () => {
      if (!currentQuestions.length) return;
      setCurrentIndex(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setScore(0);
      setStreak(0);
      setTimeLeft(25);
      setTimerActive(true);
      setQuizResults(null);
      setQuizActive(true);
      window.EcoQuestUtils.audio.playClick();
    };

    const handleOptionSelect = (optionIndex) => {
      if (hasAnswered) return;
      setHasAnswered(true);
      setTimerActive(false);
      setSelectedOption(optionIndex);

      const isCorrect = optionIndex === activeQuestion.correctIndex;
      if (isCorrect) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
        window.EcoQuestUtils.audio.playCorrect();
      } else {
        setStreak(0);
        window.EcoQuestUtils.audio.playWrong();
      }
    };

    const handleNextQuestion = () => {
      window.EcoQuestUtils.audio.playClick();
      if (currentIndex + 1 < currentQuestions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setHasAnswered(false);
        setTimeLeft(25);
        setTimerActive(true);
      } else {
        // Quiz Finished
        finishQuiz();
      }
    };

    const finishQuiz = () => {
      setQuizActive(false);
      setTimerActive(false);

      const totalQ = currentQuestions.length;
      const finalScore = score + (selectedOption === activeQuestion.correctIndex ? 1 : 0);
      const accuracy = Math.round((finalScore / totalQ) * 100);

      // Calculate XP
      const baseXP = activeQuestion ? activeQuestion.xpValue * finalScore : 50;
      const streakBonus = streak >= 2 ? 30 : 0;
      const accuracyBonus = accuracy === 100 ? 50 : accuracy >= 80 ? 25 : 0;
      const totalXpEarned = baseXP + streakBonus + accuracyBonus;

      // Trigger Confetti Celebration if passed
      if (accuracy >= 60 && typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      window.EcoQuestUtils.audio.playLevelUp();

      // Record in storage
      const resultData = window.EcoQuestUtils.storage.recordQuizResult({
        topicId: topicFilter === "all" ? "waste-management" : topicFilter,
        difficulty,
        correctCount: finalScore,
        totalQuestions: totalQ,
        xpEarned: totalXpEarned
      });

      setQuizResults({
        correctCount: finalScore,
        totalCount: totalQ,
        accuracy,
        xpEarned: totalXpEarned,
        streakBonus,
        accuracyBonus,
        topicId: topicFilter,
        difficulty,
        resultData
      });

      if (onQuizComplete) {
        onQuizComplete(resultData);
      }
    };

    const selectedTopicObj = allTopics.find(t => t.id === topicFilter) || allTopics[0];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* QUIZ CONFIGURATION SCREEN (When quiz is not running and no results) */}
        {!quizActive && !quizResults && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
                Interactive Knowledge Arena
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
                Environmental Mastery Quiz
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Earn XP, test your ecological science comprehension, and receive instant explanations with AI learning insights.
              </p>
            </div>

            {/* Select Topic */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Select Environmental Topic
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {allTopics.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTopicFilter(t.id)}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                      topicFilter === t.id
                        ? "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span className="text-xl mb-1">
                      {t.id === "waste-management" ? "🗑️" :
                       t.id === "water-conservation" ? "💧" :
                       t.id === "climate-change" ? "🔥" :
                       t.id === "renewable-energy" ? "⚡" :
                       t.id === "biodiversity" ? "🌳" :
                       t.id === "pollution" ? "🌫️" : "♻️"}
                    </span>
                    <span className="line-clamp-1">{t.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Difficulty Level */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Select Challenge Difficulty
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "Beginner", label: "Beginner", icon: "🌱", xp: "+25 XP / Q", desc: "Fundamental definitions & daily eco habits" },
                  { id: "Intermediate", label: "Intermediate", icon: "🌿", xp: "+35 XP / Q", desc: "Applied science & campus sustainability" },
                  { id: "Advanced", label: "Advanced", icon: "🌳", xp: "+50 XP / Q", desc: "Global policy, IPCC goals & technical engineering" }
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      difficulty === d.id
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{d.icon}</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        {d.xp}
                      </span>
                    </div>
                    <div className="text-xs font-bold">{d.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Preview Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📘</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Topic: {selectedTopicObj.title} ({difficulty})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {currentQuestions.length} Questions Available • 25s per question
                  </div>
                </div>
              </div>

              <button
                onClick={startQuiz}
                disabled={!currentQuestions.length}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <span>Start Quiz Now</span>
                <span>⚡</span>
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE QUIZ SCREEN */}
        {quizActive && activeQuestion && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            {/* Top Bar: Progress, Streak, Score & Countdown */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  Question {currentIndex + 1} of {currentQuestions.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedTopicObj.title} ({difficulty})
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                {streak > 1 && (
                  <span className="text-amber-500 flex items-center gap-1 animate-bounce">
                    🔥 {streak} Streak!
                  </span>
                )}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs ${
                  timeLeft <= 5 ? "bg-rose-100 text-rose-700 animate-pulse font-extrabold" : "bg-slate-100 text-slate-700"
                }`}>
                  <span>⏱️</span>
                  <span>{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="pt-2">
              <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900 leading-snug">
                {activeQuestion.question}
              </h2>
            </div>

            {/* 4 Answer Options */}
            <div className="space-y-3 pt-2">
              {activeQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeQuestion.correctIndex;
                let btnStyle = "border-slate-200 bg-white hover:bg-slate-50 text-slate-800";

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/20";
                  } else {
                    btnStyle = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`quiz-option-btn w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isSelected && isCorrect
                          ? "bg-emerald-600 text-white"
                          : isSelected && !isCorrect
                          ? "bg-rose-600 text-white"
                          : isCorrect && hasAnswered
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {hasAnswered && (
                      <span className="text-base ml-2">
                        {isCorrect ? "✓" : isSelected ? "✕" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Scientific Explanation Box */}
            {hasAnswered && (
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    {selectedOption === activeQuestion.correctIndex ? "🎉 Correct Answer!" : "💡 Concept Explanation"}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    +{activeQuestion.xpValue} XP
                  </span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {activeQuestion.explanation}
                </p>
                {activeQuestion.funFact && (
                  <div className="text-[11px] text-emerald-800/80 pt-1 border-t border-emerald-200/60 italic">
                    🌱 <strong>Eco Fact:</strong> {activeQuestion.funFact}
                  </div>
                )}
              </div>
            )}

            {/* Next / Finish Button */}
            {hasAnswered && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
                >
                  <span>{currentIndex + 1 < currentQuestions.length ? "Next Question" : "View Final Results"}</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* QUIZ RESULTS SUMMARY SCREEN */}
        {quizResults && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-2xl space-y-8 animate-fadeIn">
            {/* Header Result */}
            <div className="text-center space-y-3">
              <div className="text-5xl mb-2">
                {quizResults.accuracy >= 80 ? "🏆" : quizResults.accuracy >= 50 ? "🌱" : "📖"}
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
                Quiz Complete
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
                {quizResults.accuracy === 100
                  ? "Flawless Eco Mastery!"
                  : quizResults.accuracy >= 80
                  ? "Outstanding Performance!"
                  : quizResults.accuracy >= 50
                  ? "Good Effort, Keep Practicing!"
                  : "Learning Opportunity Identified!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                You correctly answered {quizResults.correctCount} out of {quizResults.totalCount} questions ({quizResults.accuracy}% accuracy).
              </p>
            </div>

            {/* Score & XP Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center">
                <span className="text-xs text-emerald-700 font-semibold block">Total XP Earned</span>
                <span className="text-3xl font-black text-emerald-950 block mt-1">
                  +{quizResults.xpEarned} XP
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">Added to student profile</span>
              </div>

              <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-200 text-center">
                <span className="text-xs text-cyan-700 font-semibold block">Accuracy Rate</span>
                <span className="text-3xl font-black text-cyan-950 block mt-1">
                  {quizResults.accuracy}%
                </span>
                <span className="text-[10px] text-cyan-600 font-medium">Topic proficiency updated</span>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-center">
                <span className="text-xs text-amber-700 font-semibold block">Bonus Points</span>
                <span className="text-3xl font-black text-amber-950 block mt-1">
                  +{quizResults.streakBonus + quizResults.accuracyBonus} XP
                </span>
                <span className="text-[10px] text-amber-600 font-medium">Speed & streak multipliers</span>
              </div>
            </div>

            {/* Badge Unlocked Notification if any */}
            {quizResults.resultData && quizResults.resultData.badgeUnlocked && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-emerald-100 border border-amber-300 flex items-center gap-3">
                <span className="text-3xl">🏅</span>
                <div>
                  <div className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                    New Badge Unlocked!
                  </div>
                  <div className="text-sm font-bold text-emerald-900">
                    {quizResults.resultData.badgeUnlocked.name}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {quizResults.resultData.badgeUnlocked.description}
                  </div>
                </div>
              </div>
            )}

            {/* AI Recommendation Engine Banner */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                  AI Personalized Learning Insight
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {quizResults.accuracy < 60
                  ? `Our diagnostic model noted areas for improvement in ${selectedTopicObj.title}. Review the full curriculum module or undertake a real-world mission to cement your understanding.`
                  : `Terrific grasp of ${selectedTopicObj.title}! Ready to put this into real-world action? Take on a campus mission or challenge a higher difficulty level.`}
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <button
                  onClick={() => onNavigate("missions")}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Explore Related Eco Missions →
                </button>
                <button
                  onClick={() => onNavigate("learn")}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
                >
                  Read Topic Syllabus
                </button>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => { setQuizResults(null); setQuizActive(false); }}
                className="w-full sm:w-auto px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Choose Another Topic
              </button>

              <button
                onClick={startQuiz}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
              >
                Retake This Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
})();

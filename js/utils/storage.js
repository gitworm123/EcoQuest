// EcoQuest - Local State Management & Persistent Storage
window.EcoQuestUtils = window.EcoQuestUtils || {};

(function() {
  const STORAGE_KEY = "ecoquest_app_state_v1";

  const LEVEL_THRESHOLDS = [
    { level: 1, title: "Eco Seedling", minXp: 0, maxXp: 500 },
    { level: 2, title: "Sprout Scout", minXp: 500, maxXp: 1000 },
    { level: 3, title: "Eco Warrior", minXp: 1000, maxXp: 2000 },
    { level: 4, title: "Nature Guardian", minXp: 2000, maxXp: 3500 },
    { level: 5, title: "Planet Champion", minXp: 3500, maxXp: 5000 },
    { level: 6, title: "Climate Hero", minXp: 5000, maxXp: 99999 }
  ];

  function getInitialState() {
    return {
      currentPersonaKey: "student1", // "student1" | "student2" | "teacher"
      users: JSON.parse(JSON.stringify(window.EcoQuestData.mockUsers)),
      submissions: JSON.parse(JSON.stringify(window.EcoQuestData.initialSubmissions)),
      globalImpact: {
        treesPlanted: 4820,
        wasteRecycledKg: 14250,
        plasticAvoidedItems: 32400,
        waterSavedLiters: 285000,
        energySavedKwh: 18900,
        co2OffsetKg: 34800
      },
      soundEnabled: true
    };
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.users && parsed.submissions) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error loading state from localStorage", e);
    }
    return getInitialState();
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Error saving state to localStorage", e);
    }
  }

  let currentState = loadState();

  function calculateLevelInfo(xp) {
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      const th = LEVEL_THRESHOLDS[i];
      if (xp >= th.minXp && (xp < th.maxXp || i === LEVEL_THRESHOLDS.length - 1)) {
        return {
          level: th.level,
          title: th.title,
          prevLevelXp: th.minXp,
          nextLevelXp: th.maxXp,
          progressPercent: Math.min(100, Math.round(((xp - th.minXp) / (th.maxXp - th.minXp)) * 100))
        };
      }
    }
    return { level: 1, title: "Eco Seedling", prevLevelXp: 0, nextLevelXp: 500, progressPercent: 0 };
  }

  window.EcoQuestUtils.storage = {
    getState() {
      return currentState;
    },

    getCurrentUser() {
      return currentState.users[currentState.currentPersonaKey] || currentState.users.student1;
    },

    setCurrentPersona(personaKey) {
      if (currentState.users[personaKey]) {
        currentState.currentPersonaKey = personaKey;
        saveState(currentState);
      }
      return this.getCurrentUser();
    },

    setSoundEnabled(enabled) {
      currentState.soundEnabled = enabled;
      window.EcoQuestUtils.audio.setSoundEnabled(enabled);
      saveState(currentState);
    },

    /**
     * Submit proof for an Eco Mission
     */
    submitMissionProof({ missionId, studentNotes, proofPhoto, metricValue, metricKey }) {
      const student = this.getCurrentUser();
      const mission = window.EcoQuestData.missions.find(m => m.id === missionId);
      if (!mission || !student) return null;

      const subId = "sub-" + Date.now();
      const newSubmission = {
        id: subId,
        studentId: student.id,
        studentName: student.name,
        studentAvatar: student.avatar,
        studentGrade: student.classGrade || "Student",
        missionId: mission.id,
        missionTitle: mission.title,
        category: mission.category,
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        timeAgo: "Just now",
        proofPhoto: proofPhoto || mission.sampleProofPhoto,
        studentNotes: studentNotes || "Completed real-world activity and documented results.",
        metricsClaimed: `${metricValue || mission.impactMetric.defaultValue} ${mission.impactMetric.unit}`,
        metricValue: Number(metricValue) || mission.impactMetric.defaultValue,
        metricKey: metricKey || mission.impactMetric.key,
        xpReward: mission.xp,
        badgeUnlockId: mission.badgeUnlockId,
        status: "pending",
        teacherFeedback: ""
      };

      // Add to global submissions
      currentState.submissions.unshift(newSubmission);

      // Add to student's pending / recent activities
      if (!student.inProgressMissions.includes(mission.id)) {
        student.inProgressMissions.push(mission.id);
      }

      student.recentActivities.unshift({
        id: "act-" + Date.now(),
        type: "mission_submitted",
        title: `Submitted proof for '${mission.title}'`,
        xpEarned: 0,
        timestamp: "Just now",
        status: "Pending Teacher Verification",
        icon: "upload-cloud"
      });

      saveState(currentState);
      return newSubmission;
    },

    /**
     * Teacher Action: Approve or Reject a submission
     */
    verifySubmission(submissionId, decision, teacherFeedback = "") {
      const sub = currentState.submissions.find(s => s.id === submissionId);
      if (!sub) return { success: false, message: "Submission not found" };

      sub.status = decision; // 'approved' or 'rejected'
      sub.teacherFeedback = teacherFeedback;

      let result = {
        success: true,
        decision,
        studentName: sub.studentName,
        missionTitle: sub.missionTitle,
        xpAwarded: 0,
        leveledUp: false,
        badgeUnlocked: null
      };

      if (decision === "approved") {
        // Find the student
        let student = Object.values(currentState.users).find(u => u.id === sub.studentId);
        if (student) {
          const oldLevel = student.level;
          const xpGain = sub.xpReward;
          student.xp += xpGain;
          result.xpAwarded = xpGain;

          // Recompute level
          const lvlInfo = calculateLevelInfo(student.xp);
          student.level = lvlInfo.level;
          student.levelTitle = lvlInfo.title;
          student.prevLevelXp = lvlInfo.prevLevelXp;
          student.nextLevelXp = lvlInfo.nextLevelXp;

          if (student.level > oldLevel) {
            result.leveledUp = true;
            result.newLevelTitle = student.levelTitle;
          }

          // Mark mission completed
          if (!student.completedMissions.includes(sub.missionId)) {
            student.completedMissions.push(sub.missionId);
          }
          student.inProgressMissions = student.inProgressMissions.filter(id => id !== sub.missionId);

          // Unlock badge if applicable
          if (sub.badgeUnlockId && !student.badges.includes(sub.badgeUnlockId)) {
            student.badges.push(sub.badgeUnlockId);
            const badgeObj = window.EcoQuestData.badges.find(b => b.id === sub.badgeUnlockId);
            result.badgeUnlocked = badgeObj || { name: sub.badgeUnlockId };
          }

          // Check for 'Planet Protector' badge (Level >= 3, 3+ badges, 1000+ XP)
          if (student.level >= 3 && student.badges.length >= 3 && student.xp >= 1000 && !student.badges.includes("planet-protector")) {
            student.badges.push("planet-protector");
            result.badgeUnlocked = window.EcoQuestData.badges.find(b => b.id === "planet-protector");
          }

          // Update student impact metrics
          if (sub.metricKey && student.impactMetrics[sub.metricKey] !== undefined) {
            student.impactMetrics[sub.metricKey] += sub.metricValue;
          }

          // Update global impact
          if (sub.metricKey && currentState.globalImpact[sub.metricKey] !== undefined) {
            currentState.globalImpact[sub.metricKey] += sub.metricValue;
          }

          // Add to student recent activity
          student.recentActivities.unshift({
            id: "act-appr-" + Date.now(),
            type: "mission_approved",
            title: `Teacher verified '${sub.missionTitle}'`,
            xpEarned: xpGain,
            timestamp: "Just now",
            status: "Approved",
            icon: "check-circle-2"
          });
        }
      }

      saveState(currentState);
      return result;
    },

    /**
     * Record completed quiz results, update topic proficiency, grant XP
     */
    recordQuizResult({ topicId, difficulty, correctCount, totalQuestions, xpEarned }) {
      const student = this.getCurrentUser();
      if (!student || student.role !== "student") return null;

      const scorePercent = Math.round((correctCount / totalQuestions) * 100);
      const oldLevel = student.level;

      student.xp += xpEarned;
      student.quizzesCompletedCount = (student.quizzesCompletedCount || 0) + 1;

      // Update topic proficiency: blend new score with existing proficiency
      const currentProf = student.topicProficiency[topicId] || 50;
      const updatedProf = Math.min(100, Math.round((currentProf * 0.4) + (scorePercent * 0.6)));
      student.topicProficiency[topicId] = updatedProf;

      // Recompute level
      const lvlInfo = calculateLevelInfo(student.xp);
      student.level = lvlInfo.level;
      student.levelTitle = lvlInfo.title;
      student.prevLevelXp = lvlInfo.prevLevelXp;
      student.nextLevelXp = lvlInfo.nextLevelXp;

      let badgeUnlocked = null;
      // Climate Scholar badge if 100% on Advanced Climate
      if (topicId === "climate-change" && difficulty === "Advanced" && scorePercent === 100) {
        if (!student.badges.includes("climate-scholar")) {
          student.badges.push("climate-scholar");
          badgeUnlocked = window.EcoQuestData.badges.find(b => b.id === "climate-scholar");
        }
      }

      // Eco starter badge on first quiz if not owned
      if (!student.badges.includes("eco-starter")) {
        student.badges.push("eco-starter");
        badgeUnlocked = window.EcoQuestData.badges.find(b => b.id === "eco-starter");
      }

      student.recentActivities.unshift({
        id: "act-quiz-" + Date.now(),
        type: "quiz",
        title: `Completed ${difficulty} Quiz (${scorePercent}%)`,
        xpEarned: xpEarned,
        timestamp: "Just now",
        score: `${scorePercent}%`,
        icon: "help-circle"
      });

      saveState(currentState);

      return {
        scorePercent,
        xpEarned,
        updatedProf,
        leveledUp: student.level > oldLevel,
        newLevelTitle: student.levelTitle,
        badgeUnlocked
      };
    },

    /**
     * Record a completed mini-game, grant XP and check the arcade badge.
     * XP = score% of the game's XP value, awarded only when it beats the
     * previous best (replays can't farm XP), plus a one-time completion bonus.
     */
    recordGameResult({ gameId, topicId, title, score, maxScore, xpValue }) {
      const student = this.getCurrentUser();
      if (!student || student.role !== "student") return null;

      student.gameProgress = student.gameProgress || {};
      const prev = student.gameProgress[gameId];
      const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
      const potentialXp = Math.round((xpValue * percent) / 100);
      const firstCompletion = !prev;
      const bonus = firstCompletion ? window.EcoQuestData.miniGameRules.firstCompletionBonus : 0;
      const improvementXp = Math.max(0, potentialXp - (prev ? prev.bestXp : 0));
      const xpEarned = improvementXp + bonus;
      const oldLevel = student.level;

      student.gameProgress[gameId] = {
        topicId,
        plays: (prev ? prev.plays : 0) + 1,
        bestScore: Math.max(prev ? prev.bestScore : 0, score),
        maxScore,
        bestPercent: Math.max(prev ? prev.bestPercent : 0, percent),
        bestXp: Math.max(prev ? prev.bestXp : 0, potentialXp),
        totalXpEarned: (prev ? prev.totalXpEarned : 0) + xpEarned,
        lastPlayed: new Date().toISOString()
      };

      student.xp += xpEarned;
      const lvlInfo = calculateLevelInfo(student.xp);
      student.level = lvlInfo.level;
      student.levelTitle = lvlInfo.title;
      student.prevLevelXp = lvlInfo.prevLevelXp;
      student.nextLevelXp = lvlInfo.nextLevelXp;

      // Eco Arcade Champion: all 3 mini-games of one topic completed
      let badgeUnlocked = null;
      const topicGames = window.EcoQuestData.miniGames.filter(g => g.topicId === topicId);
      const topicCleared = topicGames.length > 0 && topicGames.every(g => student.gameProgress[g.id]);
      if (topicCleared && !student.badges.includes("eco-arcade-champion")) {
        student.badges.push("eco-arcade-champion");
        badgeUnlocked = window.EcoQuestData.badges.find(b => b.id === "eco-arcade-champion");
      }

      if (xpEarned > 0) {
        student.recentActivities.unshift({
          id: "act-game-" + Date.now(),
          type: "game",
          title: `Played mini-game '${title}' (${percent}%)`,
          xpEarned,
          timestamp: "Just now",
          score: `${percent}%`,
          icon: "gamepad-2"
        });
      }

      saveState(currentState);

      return {
        xpEarned,
        bonus,
        improvementXp,
        firstCompletion,
        percent,
        previousBestPercent: prev ? prev.bestPercent : 0,
        leveledUp: student.level > oldLevel,
        newLevelTitle: student.levelTitle,
        badgeUnlocked
      };
    },

    /**
     * Reset demo data back to clean initial state
     */
    resetDemoData() {
      currentState = getInitialState();
      saveState(currentState);
      return currentState;
    }
  };
})();

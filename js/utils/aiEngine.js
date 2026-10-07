// EcoQuest - AI Personalized Learning & Recommendation Engine
window.EcoQuestUtils = window.EcoQuestUtils || {};

(function() {
  window.EcoQuestUtils.aiEngine = {
    /**
     * Analyze user's current topic proficiencies and identify weak/priority areas
     */
    analyzeProficiency(user) {
      if (!user || !user.topicProficiency) return [];
      
      const proficiencies = Object.entries(user.topicProficiency).map(([topicId, score]) => ({
        topicId,
        score,
        status: score < 60 ? 'critical_attention' : score < 80 ? 'improving' : 'mastered'
      }));

      // Sort by lowest score ascending (weakest first)
      proficiencies.sort((a, b) => a.score - b.score);
      return proficiencies;
    },

    /**
     * Generate dynamic AI recommendations tailored to student's exact performance
     */
    getRecommendations(user, topics, quizzes, missions) {
      if (!user) return null;

      const proficiencies = this.analyzeProficiency(user);
      if (!proficiencies.length) return null;

      // Identify weakest topic
      const weakest = proficiencies[0];
      const secondWeakest = proficiencies[1] || proficiencies[0];

      const topicDetails = topics.find(t => t.id === weakest.topicId) || topics[0];
      const secondTopicDetails = topics.find(t => t.id === secondWeakest.topicId) || topics[1];

      // Find recommended quiz for weakest topic
      const recommendedQuizzes = quizzes.filter(q => q.topicId === topicDetails.id);
      const beginnerQuiz = recommendedQuizzes.find(q => q.difficulty === "Beginner") || recommendedQuizzes[0];
      const intermediateQuiz = recommendedQuizzes.find(q => q.difficulty === "Intermediate") || recommendedQuizzes[0];

      // Find recommended mission for weakest topic
      const recommendedMissions = missions.filter(m => m.topicId === topicDetails.id);
      const topMission = recommendedMissions[0] || missions[0];

      // Generate diagnostic reasoning
      let diagnosticInsight = "";
      let actionPlan = "";

      if (weakest.score < 50) {
        diagnosticInsight = `AI Diagnostic: Your current proficiency in ${topicDetails.title} is at ${weakest.score}%, indicating foundational comprehension gaps in practical application.`;
        actionPlan = `We recommend starting with the structured lesson guide, followed by a low-stakes beginner quiz to solidify concepts, and undertaking a real-world mission to turn theory into daily habit.`;
      } else if (weakest.score < 70) {
        diagnosticInsight = `AI Diagnostic: Your score in ${topicDetails.title} (${weakest.score}%) is in the developing range. Reinforcing key concepts will push you into the top mastery percentile.`;
        actionPlan = `Complete the intermediate knowledge check and verify one field mission to earn bonus XP and move up your class leaderboard.`;
      } else {
        diagnosticInsight = `AI Diagnostic: Impressive overall balance! Your lowest category is ${topicDetails.title} at ${weakest.score}%.`;
        actionPlan = `Take the Advanced Challenge quiz to earn the 'Planet Protector' badge and complete advanced campus initiatives.`;
      }

      return {
        weakestTopic: topicDetails,
        secondWeakestTopic: secondTopicDetails,
        score: weakest.score,
        status: weakest.status,
        diagnosticInsight,
        actionPlan,
        recommendedLesson: {
          topicId: topicDetails.id,
          title: topicDetails.title,
          readTime: topicDetails.readTime,
          badge: topicDetails.badge,
          keyTakeaways: topicDetails.keyTakeaways.slice(0, 2),
          sdgGoal: topicDetails.sdgGoal
        },
        recommendedQuiz: beginnerQuiz || {
          id: "q-default",
          topicId: topicDetails.id,
          difficulty: "Beginner",
          title: `${topicDetails.title} Mastery Check`,
          xpValue: 35
        },
        recommendedMission: topMission,
        improvementEstimate: `+${Math.min(100 - weakest.score, 30)}% Expected Proficiency Gain`
      };
    }
  };
})();

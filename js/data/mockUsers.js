// EcoQuest - Mock Users and Activity Verification Queue
window.EcoQuestData = window.EcoQuestData || {};

window.EcoQuestData.mockUsers = {
  // Current Student Aarav Sharma
  student1: {
    id: "u-1",
    role: "student",
    name: "Aarav Sharma",
    email: "aarav.sharma@greenwood.edu",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    institution: "Greenwood Institute of Technology",
    classGrade: "B.Tech CSE - 2nd Year",
    rollNumber: "GIT-2024-CSE-084",
    bio: "Passionate about combining software development with ecological conservation and campus solar monitoring.",
    joinedDate: "January 2026",
    level: 3,
    levelTitle: "Eco Warrior",
    xp: 1420,
    nextLevelXp: 2000,
    prevLevelXp: 1000,
    streakDays: 5,
    rank: 1,
    badges: ["eco-starter", "recycling-hero", "tree-guardian", "climate-scholar", "eco-streak-master"],
    completedMissions: ["m-tree-1", "m-waste-1", "m-recycle-1"],
    inProgressMissions: ["m-water-1", "m-energy-1"],
    impactMetrics: {
      treesPlanted: 2,
      wasteRecycledKg: 16.5,
      plasticAvoidedItems: 48,
      waterSavedLiters: 140,
      energySavedKwh: 32,
      co2OffsetKg: 78.4
    },
    topicProficiency: {
      "waste-management": 92,
      "water-conservation": 42, // Weak topic for AI recommendation engine
      "climate-change": 88,
      "renewable-energy": 84,
      "biodiversity": 80,
      "pollution": 76,
      "recycling-sustainability": 86
    },
    quizzesCompletedCount: 9,
    recentActivities: [
      {
        id: "act-1",
        type: "quiz",
        title: "Completed 'Waste Management - Intermediate' Quiz",
        xpEarned: 35,
        timestamp: "2 hours ago",
        score: "100%",
        icon: "help-circle"
      },
      {
        id: "act-2",
        type: "mission_submitted",
        title: "Submitted proof for 'Water Saver 24-Hour Challenge'",
        xpEarned: 0,
        timestamp: "4 hours ago",
        status: "Pending Teacher Verification",
        icon: "upload-cloud"
      },
      {
        id: "act-3",
        type: "badge",
        title: "Unlocked 'Tree Guardian' Badge",
        xpEarned: 350,
        timestamp: "Yesterday",
        icon: "award"
      },
      {
        id: "act-4",
        type: "mission_approved",
        title: "Teacher verified 'Plant a Native Tree or Sapling'",
        xpEarned: 350,
        timestamp: "2 days ago",
        icon: "check-circle-2"
      }
    ]
  },

  // Student 2 Priya Patel
  student2: {
    id: "u-4",
    role: "student",
    name: "Priya Patel",
    email: "priya.patel@greenwood.edu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    institution: "Greenwood Institute of Technology",
    classGrade: "B.Tech Env Tech - 1st Year",
    rollNumber: "GIT-2025-ENV-012",
    bio: "Future environmental engineer passionate about circular packaging and campus rainwater harvesting.",
    joinedDate: "February 2026",
    level: 2,
    levelTitle: "Sprout Scout",
    xp: 1140,
    nextLevelXp: 1500,
    prevLevelXp: 500,
    streakDays: 3,
    rank: 4,
    badges: ["eco-starter", "water-saver", "recycling-hero"],
    completedMissions: ["m-water-1", "m-waste-1"],
    inProgressMissions: ["m-plastic-1"],
    impactMetrics: {
      treesPlanted: 1,
      wasteRecycledKg: 8.2,
      plasticAvoidedItems: 36,
      waterSavedLiters: 195,
      energySavedKwh: 14,
      co2OffsetKg: 42.1
    },
    topicProficiency: {
      "waste-management": 80,
      "water-conservation": 90,
      "climate-change": 45, // Weak topic for AI recommendation engine
      "renewable-energy": 70,
      "biodiversity": 75,
      "pollution": 68,
      "recycling-sustainability": 82
    },
    quizzesCompletedCount: 6,
    recentActivities: [
      {
        id: "act-p1",
        type: "quiz",
        title: "Completed 'Water Conservation - Intermediate' Quiz",
        xpEarned: 35,
        timestamp: "1 day ago",
        score: "100%",
        icon: "help-circle"
      }
    ]
  },

  // Teacher Persona: Prof. Ananya Sen
  teacher: {
    id: "t-1",
    role: "teacher",
    name: "Prof. Ananya Sen",
    email: "ananya.sen@greenwood.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    institution: "Greenwood Institute of Technology",
    department: "Department of Environmental Engineering & Science",
    designation: "Associate Professor & Campus Eco-Coordinator",
    bio: "Mentoring students in real-world environmental action, campus sustainability audits, and circular resource recovery.",
    joinedDate: "August 2024",
    totalStudents: 48,
    avgQuizScore: 78.4,
    missionCompletionRate: 84.2,
    activeParticipationRate: 91.5,
    assignedClasses: [
      "B.Tech CSE - 2nd Year (Sec B)",
      "B.Tech Env Tech - 1st Year",
      "Environmental Science Open Elective"
    ],
    weakTopicsIdentified: [
      { topic: "Water Conservation", avgScore: 54.2, studentsStruggling: 19 },
      { topic: "Pollution (AQI & Microplastics)", avgScore: 61.8, studentsStruggling: 14 },
      { topic: "Climate Change IPCC Targets", avgScore: 68.5, studentsStruggling: 11 }
    ]
  }
};

// Initial Activity Verification Submissions Queue (Teacher review queue)
window.EcoQuestData.initialSubmissions = [
  {
    id: "sub-101",
    studentId: "u-1",
    studentName: "Aarav Sharma",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    studentGrade: "B.Tech CSE - 2nd Year",
    missionId: "m-water-1",
    missionTitle: "Water Saver 24-Hour Challenge",
    category: "Water Conservation",
    submittedAt: "2026-10-07 14:15",
    timeAgo: "3 hours ago",
    proofPhoto: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    studentNotes: "Collected 40 liters of wastewater from our dorm RO purifier and 35 liters from the AC split drain. Used this entirely to water the ground-floor campus garden and wash outdoor steps.",
    metricsClaimed: "75 Liters of water recycled & conserved",
    metricValue: 75,
    metricKey: "waterSavedLiters",
    xpReward: 180,
    badgeUnlockId: "water-saver",
    status: "pending", // "pending" | "approved" | "rejected"
    teacherFeedback: ""
  },
  {
    id: "sub-102",
    studentId: "u-3",
    studentName: "Rohan Das",
    studentAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    studentGrade: "Grade 11-A",
    missionId: "m-waste-1",
    missionTitle: "Household Waste Segregation (3-Day Streak)",
    category: "Waste Management",
    submittedAt: "2026-10-07 11:30",
    timeAgo: "6 hours ago",
    proofPhoto: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
    studentNotes: "Installed separate green and blue color-coded bins in our kitchen. Segregated 4.2 kg of vegetable peels and coffee grounds for our garden pot compost.",
    metricsClaimed: "4.2 kg dry/wet waste separated",
    metricValue: 4.2,
    metricKey: "wasteRecycledKg",
    xpReward: 220,
    badgeUnlockId: "recycling-hero",
    status: "pending",
    teacherFeedback: ""
  },
  {
    id: "sub-103",
    studentId: "u-2",
    studentName: "Sneha Iyer",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    studentGrade: "B.Sc Biotechnology",
    missionId: "m-tree-1",
    missionTitle: "Plant a Native Tree or Sapling",
    category: "Biodiversity & Climate",
    submittedAt: "2026-10-06 16:45",
    timeAgo: "1 day ago",
    proofPhoto: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    studentNotes: "Planted a native Neem (Azadirachta indica) sapling behind the biology laboratory quadrangle. Secured it with a bamboo frame and watered with organic vermicompost.",
    metricsClaimed: "1 Native Neem tree planted",
    metricValue: 1,
    metricKey: "treesPlanted",
    xpReward: 350,
    badgeUnlockId: "tree-guardian",
    status: "approved",
    teacherFeedback: "Excellent initiative Sneha! Verified native species with appropriate root aeration."
  },
  {
    id: "sub-104",
    studentId: "u-5",
    studentName: "Vikram Mehta",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    studentGrade: "Grade 10-B",
    missionId: "m-energy-1",
    missionTitle: "Save Electricity: Campus / Home Energy Audit",
    category: "Renewable Energy",
    submittedAt: "2026-10-06 09:10",
    timeAgo: "1 day ago",
    proofPhoto: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
    studentNotes: "Unplugged 8 standby chargers and computer power strips in our floor study hall. Switched to natural window illumination from 9 AM to 4 PM.",
    metricsClaimed: "18 kWh saved over 48 hours",
    metricValue: 18,
    metricKey: "energySavedKwh",
    xpReward: 200,
    badgeUnlockId: "energy-saver",
    status: "approved",
    teacherFeedback: "Great job Vikram! Auditing vampire loads makes a tangible impact."
  }
];

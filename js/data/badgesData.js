// EcoQuest - Badges and Achievement Rewards Data
window.EcoQuestData = window.EcoQuestData || {};

window.EcoQuestData.badges = [
  {
    id: "eco-starter",
    name: "Eco Starter",
    emoji: "🌱",
    icon: "sprout",
    category: "Milestone",
    rarity: "Common",
    xpReward: 100,
    description: "Awarded to budding eco-warriors for embarking on their sustainability adventure.",
    requirement: "Complete at least 1 interactive quiz and 1 verified eco-mission.",
    perk: "Official EcoQuest Welcome Certificate & Profile Pin",
    gradient: "from-emerald-400 to-green-600",
    bgLight: "bg-emerald-50 border-emerald-300 text-emerald-800"
  },
  {
    id: "recycling-hero",
    name: "Recycling Hero",
    emoji: "♻️",
    icon: "recycle",
    category: "Waste Management",
    rarity: "Rare",
    xpReward: 250,
    description: "Champion of source segregation, circular design, and zero-waste living.",
    requirement: "Complete waste segregation or creative upcycling missions with verified photo proof.",
    perk: "Campus Zero-Waste Advocate Title",
    gradient: "from-teal-400 to-emerald-600",
    bgLight: "bg-teal-50 border-teal-300 text-teal-800"
  },
  {
    id: "water-saver",
    name: "Water Saver",
    emoji: "💧",
    icon: "droplet",
    category: "Water Conservation",
    rarity: "Rare",
    xpReward: 200,
    description: "Guardian of Earth's most precious liquid heritage and urban water tables.",
    requirement: "Complete a 24-hour water-saving challenge and save an estimated 50+ liters.",
    perk: "Blue Ribbon Hydro-Guardian Digital Crest",
    gradient: "from-cyan-400 to-blue-600",
    bgLight: "bg-cyan-50 border-cyan-300 text-cyan-800"
  },
  {
    id: "tree-guardian",
    name: "Tree Guardian",
    emoji: "🌳",
    icon: "tree-deciduous",
    category: "Biodiversity & Climate",
    rarity: "Epic",
    xpReward: 350,
    description: "Conferred for planting and adopting living native saplings on campus or in the community.",
    requirement: "Plant at least 1 indigenous tree sapling and submit verified photographic proof.",
    perk: "Campus Tree Dedicated in Student's Honor & Certificate",
    gradient: "from-green-500 to-emerald-800",
    bgLight: "bg-green-50 border-green-400 text-green-900"
  },
  {
    id: "energy-saver",
    name: "Energy Saver",
    emoji: "⚡",
    icon: "zap",
    category: "Clean Energy",
    rarity: "Rare",
    xpReward: 200,
    description: "Master of kilowatt conservation, vampire load elimination, and clean power awareness.",
    requirement: "Conduct a 48-hour energy audit and conserve over 15 kWh of electricity.",
    perk: "Smart Dorm Watt-Wise Badge",
    gradient: "from-amber-400 to-yellow-600",
    bgLight: "bg-amber-50 border-amber-300 text-amber-800"
  },
  {
    id: "planet-protector",
    name: "Planet Protector",
    emoji: "🌍",
    icon: "globe",
    category: "Grand Achievement",
    rarity: "Legendary",
    xpReward: 500,
    description: "The pinnacle of student ecological leadership, awarded to high-ranking sustainability changemakers.",
    requirement: "Achieve Level 3 or higher, gather 1,000+ XP, and earn at least 3 distinct badges.",
    perk: "College Green Ambassador Fellowship & Convocation Honor",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    bgLight: "bg-emerald-100 border-emerald-400 text-emerald-950"
  },
  {
    id: "climate-scholar",
    name: "Climate Scholar",
    emoji: "🔬",
    icon: "graduation-cap",
    category: "Academics",
    rarity: "Rare",
    xpReward: 300,
    description: "Demonstrated superior scientific comprehension of global warming and IPCC decarbonization pathways.",
    requirement: "Score 100% on the Advanced Climate Change Quiz.",
    perk: "Eco-Academic Honor Citation",
    gradient: "from-indigo-400 to-purple-600",
    bgLight: "bg-indigo-50 border-indigo-300 text-indigo-800"
  },
  {
    id: "community-champion",
    name: "Community Champion",
    emoji: "🤝",
    icon: "users",
    category: "Leadership",
    rarity: "Epic",
    xpReward: 400,
    description: "Organized classmates and peers into actionable environmental stewardship teams.",
    requirement: "Organize or lead a campus or neighborhood cleanliness drive with group participation.",
    perk: "Dean's Commendation for Civic Stewardship",
    gradient: "from-rose-400 to-pink-600",
    bgLight: "bg-rose-50 border-rose-300 text-rose-800"
  },
  {
    id: "eco-streak-master",
    name: "Eco Streak Master",
    emoji: "🔥",
    icon: "flame",
    category: "Consistency",
    rarity: "Rare",
    xpReward: 250,
    description: "Maintained an unbroken daily commitment to environmental learning and action.",
    requirement: "Maintain a consecutive 5-day active participation streak.",
    perk: "+10% Permanent XP Bonus on Daily Quizzes",
    gradient: "from-orange-400 to-amber-600",
    bgLight: "bg-orange-50 border-orange-300 text-orange-800"
  },
  {
    id: "eco-arcade-champion",
    name: "Eco Arcade Champion",
    emoji: "🎮",
    icon: "gamepad-2",
    category: "Mini-Games",
    rarity: "Rare",
    xpReward: 150,
    description: "Mastered an environmental topic through play by clearing all of its interactive mini-games.",
    requirement: "Complete all 3 mini-games in any one environmental topic.",
    perk: "Eco Arcade Champion Profile Crest",
    gradient: "from-lime-400 to-teal-600",
    bgLight: "bg-lime-50 border-lime-300 text-lime-800"
  }
];

window.EcoQuestData.rewardsStore = [
  {
    id: "rew-1",
    title: "Official Green Excellence Certificate (PDF)",
    xpCost: 500,
    category: "Academic Credential",
    icon: "award",
    description: "Verified institutional certificate signed by the Sustainability Directorate for academic resume and LinkedIn.",
    instantUnlock: true
  },
  {
    id: "rew-2",
    title: "Campus Tree Dedicated in Your Name",
    xpCost: 1000,
    category: "Physical Recognition",
    icon: "trees",
    description: "An indigenous sapling planted in the college botanical arboretum with a bronze plaque carrying your name.",
    instantUnlock: false
  },
  {
    id: "rew-3",
    title: "Green Ambassador ID Card Badge",
    xpCost: 750,
    category: "Campus Honor",
    icon: "badge-check",
    description: "Special digital green badge added to your official student portal and smart ID card.",
    instantUnlock: true
  },
  {
    id: "rew-4",
    title: "College Cafeteria Reusable Steel Kit",
    xpCost: 600,
    category: "Merchandise",
    icon: "coffee",
    description: "Custom engraved stainless-steel thermos bottle and bamboo cutlery set redeemable at college eco-store.",
    instantUnlock: false
  }
];

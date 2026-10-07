// EcoQuest - Environmental Topics Data
window.EcoQuestData = window.EcoQuestData || {};

window.EcoQuestData.topics = [
  {
    id: "waste-management",
    title: "Waste Management",
    slug: "waste-management",
    icon: "trash-2",
    color: "emerald",
    badge: "3Rs & Circular Economy",
    shortDesc: "Master the 3Rs (Reduce, Reuse, Recycle), waste segregation at source, composting, and e-waste handling.",
    readTime: "5 min read",
    sdgGoal: "SDG 12: Responsible Consumption",
    heroImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Source segregation into wet, dry, sanitary, and electronic waste reduces landfill burden by up to 80%.",
      "Organic waste in landfills decomposes anaerobically, emitting methane—a potent greenhouse gas.",
      "Composting at home or school converts biodegradable kitchen and garden waste into nutrient-rich soil enhancer.",
      "Extended Producer Responsibility (EPR) mandates manufacturers to manage the post-consumer phase of products."
    ],
    didYouKnow: "Over 2.01 billion tonnes of municipal solid waste are generated globally every year. At least 33% is not managed in an environmentally safe manner.",
    impactStat: "1 ton of recycled paper saves 17 trees, 7,000 gallons of water, and 4,000 kWh of electricity.",
    subtopics: [
      {
        title: "1. Waste Segregation at Source",
        content: "Effective waste management begins right where waste is generated. Using a color-coded bin system (Green for biodegradable/organic, Blue for recyclable dry waste, Red for hazardous/sanitary, Yellow for electronic waste) prevents cross-contamination and enables recyclers to process materials efficiently."
      },
      {
        title: "2. Composting Fundamentals",
        content: "Aerobic composting relies on moisture, oxygen, and the balance of 'greens' (nitrogen-rich food scraps, fresh clippings) and 'browns' (carbon-rich dry leaves, cardboard). In 6-8 weeks, aerobic microbes turn scraps into rich humus, closing the natural nutrient cycle."
      },
      {
        title: "3. E-Waste Crisis & Toxic Heavy Metals",
        content: "Electronic waste comprises discarded laptops, phones, batteries, and cables. They contain toxic heavy metals like lead, cadmium, and mercury. Improper dumping poisons groundwater; hence e-waste must only be routed to certified government-authorized recyclers."
      }
    ],
    relatedQuizDifficulty: "Beginner & Intermediate",
    recommendedMissions: ["m-waste-1", "m-compost-1"]
  },
  {
    id: "water-conservation",
    title: "Water Conservation",
    slug: "water-conservation",
    icon: "droplet",
    color: "cyan",
    badge: "Hydro Stewardship",
    shortDesc: "Explore rainwater harvesting, drip irrigation, watershed protection, and daily urban water-saving methods.",
    readTime: "6 min read",
    sdgGoal: "SDG 6: Clean Water & Sanitation",
    heroImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Less than 1% of all water on Earth is accessible fresh water suitable for human consumption and ecosystems.",
      "Rooftop rainwater harvesting can recharge depleted urban aquifers and provide non-potable water for months.",
      "Fixing a single leaky tap dripping at one drip per second saves over 3,000 liters of potable water every year.",
      "Drip irrigation systems supply moisture directly to plant roots, achieving up to 95% water efficiency."
    ],
    didYouKnow: "It takes roughly 2,700 liters of fresh water to produce a single cotton T-shirt—equal to what an average human drinks over 3 years!",
    impactStat: "A school rainwater harvesting pit can collect up to 100,000 liters per monsoon season.",
    subtopics: [
      {
        title: "1. Rooftop Rainwater Harvesting (RWH)",
        content: "RWH captures precipitation falling on building rooftops, passes it through mesh filters to remove debris, and diverts it into underground storage tanks or groundwater recharge pits. It prevents urban localized flooding while reviving the regional water table."
      },
      {
        title: "2. Greywater Recycling in Institutions",
        content: "Water from handwashing basins, showers, and laundry is classified as greywater. When filtered through basic sand-gravel bio-filters or reed beds, it is entirely safe for flushing toilets and irrigating campus botanical gardens."
      },
      {
        title: "3. Reducing Virtual Water Footprint",
        content: "Virtual water is the water embedded in food, clothes, and manufactured goods. Consuming locally grown seasonal produce and reducing food waste cuts hidden water consumption dramatically."
      }
    ],
    relatedQuizDifficulty: "Beginner, Intermediate, Advanced",
    recommendedMissions: ["m-water-1", "m-water-2"]
  },
  {
    id: "climate-change",
    title: "Climate Change",
    slug: "climate-change",
    icon: "flame",
    color: "amber",
    badge: "Global Decarbonization",
    shortDesc: "Understand greenhouse gas dynamics, global warming thresholds, IPCC targets, and mitigation pathways.",
    readTime: "7 min read",
    sdgGoal: "SDG 13: Climate Action",
    heroImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Atmospheric carbon dioxide levels have exceeded 420 ppm—the highest level in over 3 million years.",
      "The Paris Agreement aims to limit global temperature rise to well below 2°C, preferably 1.5°C above pre-industrial levels.",
      "Climate change accelerates extreme weather events: intense heatwaves, flash floods, unseasonal cyclones, and droughts.",
      "Decarbonization requires phasing out fossil fuels while enhancing natural carbon sinks like mangroves and forests."
    ],
    didYouKnow: "Ocean waters absorb approximately 25-30% of human-induced CO2 emissions, causing ocean acidification that threatens coral reefs.",
    impactStat: "Switching one commuter car to public transit or bicycle prevents ~2.4 metric tons of CO2 annually.",
    subtopics: [
      {
        title: "1. The Greenhouse Effect & Thermal Blanket",
        content: "Certain atmospheric gases—carbon dioxide, methane, nitrous oxide, and fluorinated gases—trap thermal infrared radiation emitted from the Earth's surface. While a natural baseline effect makes Earth habitable, excessive emissions create an unnatural warming blanket."
      },
      {
        title: "2. Tipping Points in Earth Systems",
        content: "Critical thresholds include Arctic permafrost thaw (releasing gigatons of trapped methane), Amazon rainforest dieback, and Greenland ice sheet melt. Exceeding these triggers self-reinforcing irreversible feedback loops."
      },
      {
        title: "3. Mitigation vs. Adaptation",
        content: "Mitigation tackles the causes of climate change by cutting emissions (solar power, energy conservation). Adaptation prepares human systems for existing and inevitable impacts (flood defenses, drought-resistant agriculture)."
      }
    ],
    relatedQuizDifficulty: "Intermediate & Advanced",
    recommendedMissions: ["m-commute-1", "m-tree-1"]
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    slug: "renewable-energy",
    icon: "zap",
    color: "yellow",
    badge: "Clean Power Transition",
    shortDesc: "Dive into solar photovoltaic systems, wind turbines, biomass energy, micro-grids, and energy efficiency.",
    readTime: "6 min read",
    sdgGoal: "SDG 7: Affordable & Clean Energy",
    heroImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Solar and wind energy costs have plummeted by over 80% in the last decade, making clean power the cheapest electricity source.",
      "Energy conservation is the 'first fuel'—every kilowatt-hour saved eliminates the need to generate 1.2 kWh at power plants.",
      "Smart microgrids with battery storage enable schools and campuses to achieve partial or complete energy self-sufficiency.",
      "Biomass and bio-methane turn agricultural crop residues into clean cooking and heating gas without air pollution."
    ],
    didYouKnow: "The amount of solar energy striking Earth in just 90 minutes exceeds the entire global human energy consumption for a whole year!",
    impactStat: "A 5kW rooftop solar system offsets roughly 100 tons of CO2 over its 25-year lifespan.",
    subtopics: [
      {
        title: "1. Solar Photovoltaic (PV) Working Principle",
        content: "Semiconductor silicon cells absorb photons from sunlight, dislodging electrons to generate direct current (DC). An electronic inverter converts DC to alternating current (AC) to power appliances and campus classrooms."
      },
      {
        title: "2. Energy Auditing & Vampire Power",
        content: "Electronics in standby mode ('vampire loads') consume up to 10% of household electricity without active use. Conducting periodic energy audits and using smart power strips eliminates phantom electrical drain."
      },
      {
        title: "3. Decentralized Campus Microgrids",
        content: "Modern colleges are installing solar arrays paired with lithium-ferrophosphate (LFP) energy storage to power computer labs, lighting, and electric vehicle charging points sustainably."
      }
    ],
    relatedQuizDifficulty: "Beginner & Intermediate",
    recommendedMissions: ["m-energy-1"]
  },
  {
    id: "biodiversity",
    title: "Biodiversity",
    slug: "biodiversity",
    icon: "trees",
    color: "emerald",
    badge: "Ecological Equilibrium",
    shortDesc: "Discover native ecosystems, pollinator conservation, habitat preservation, and nature-based solutions.",
    readTime: "5 min read",
    sdgGoal: "SDG 15: Life on Land",
    heroImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Biodiversity encompasses genetic diversity within species, variety of species, and complexity of ecosystems.",
      "Pollinators like bees, butterflies, and bats support more than 75% of leading global food crop types.",
      "Planting native indigenous trees supports up to 20 times more native insect, bird, and fungal species than non-native ornamentals.",
      "Habitat fragmentation caused by roads and urbanization isolates wildlife populations, decreasing genetic resilience."
    ],
    didYouKnow: "A single mature oak or banyan tree can support hundreds of distinct species of fungi, lichens, birds, insects, and mammals!",
    impactStat: "Urban micro-forests planted using the Miyawaki method grow 10x faster and host 30x higher biodiversity.",
    subtopics: [
      {
        title: "1. The Value of Native Flora",
        content: "Native plants have co-evolved with local soil chemistry, rainfall patterns, and native fauna for millennia. They require zero chemical fertilizers or excessive irrigation while providing vital nectar and seeds."
      },
      {
        title: "2. Pollinator Decline & Conservation",
        content: "Pesticide usage, monoculture farming, and light pollution have led to a precipitous drop in pollinator insects. School butterfly gardens and bird baths create critical refuge corridors in concrete cities."
      },
      {
        title: "3. The Miyawaki Urban Afforestation Method",
        content: "By planting dense clusters of multi-layered indigenous saplings (canopy, sub-tree, shrub, and groundcover) with composted soil, self-sustaining mini-forests can be grown on small school campus plots."
      }
    ],
    relatedQuizDifficulty: "Beginner & Advanced",
    recommendedMissions: ["m-tree-1", "m-campus-1"]
  },
  {
    id: "pollution",
    title: "Pollution",
    slug: "pollution",
    icon: "cloud-fog",
    color: "slate",
    badge: "Air, Water & Soil Purity",
    shortDesc: "Analyze Air Quality Index (AQI), PM2.5/PM10, microplastic accumulation, noise pollution, and mitigation.",
    readTime: "6 min read",
    sdgGoal: "SDG 3: Good Health & Well-being",
    heroImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Particulate Matter PM2.5 particles are under 2.5 microns wide—small enough to penetrate deep into lungs and enter the bloodstream.",
      "Air Quality Index (AQI) standardizes complex pollutant concentrations into simple health warning color scales.",
      "Microplastics (particles < 5mm) have been detected in deep ocean trenches, Arctic ice, drinking water, and human tissue.",
      "Chemical pesticide and industrial fertilizer runoff causes eutrophication—oxygen-depleted dead zones in rivers and lakes."
    ],
    didYouKnow: "Over 99% of the world's population breathes air that exceeds World Health Organization (WHO) air quality guideline limits.",
    impactStat: "Proper campus waste segregation prevents toxic smoke emissions generated by open garbage burning.",
    subtopics: [
      {
        title: "1. Deciphering AQI & Particulate Pollutants",
        content: "AQI evaluates 6 criteria pollutants: PM2.5, PM10, Nitrogen Dioxide (NO2), Sulfur Dioxide (SO2), Carbon Monoxide (CO), and Ozone (O3). Values above 150 represent unhealthy air requiring active respiratory precautions."
      },
      {
        title: "2. The Invisible Microplastic Menace",
        content: "Primary microplastics (microbeads from cosmetics) and secondary microplastics (breakdown of synthetic polyester clothing fibers and car tires) bioaccumulate up the aquatic food chain, carrying endocrine disruptors."
      },
      {
        title: "3. Community Cleanliness & Riverbank Drives",
        content: "Cleaning roadside ditches and campus drains prevents waste from being washed into storm channels and rivers during rains, stopping water pollution at the urban gateway."
      }
    ],
    relatedQuizDifficulty: "Beginner & Intermediate",
    recommendedMissions: ["m-campus-1", "m-plastic-1"]
  },
  {
    id: "recycling-sustainability",
    title: "Recycling and Sustainable Living",
    slug: "recycling-sustainability",
    icon: "recycle",
    color: "teal",
    badge: "Circular Lifestyle",
    shortDesc: "Adopt zero-waste practices, upcycling, eco-conscious purchasing, and minimalism to tread lightly on the Earth.",
    readTime: "5 min read",
    sdgGoal: "SDG 12: Sustainable Consumption",
    heroImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "The 5 R's hierarchy: Refuse what you don't need, Reduce what you use, Reuse what you have, Repurpose/Upcycle, and Recycle the rest.",
      "Upcycling transforms discarded materials into higher-value products (e.g., turning glass jars into desk organizers).",
      "Fast fashion generates immense textile waste; wearing clothes for just 9 months longer reduces their carbon footprint by 30%.",
      "Carrying a reusable cloth tote bag and stainless steel water bottle eliminates hundreds of disposable single-use items per year."
    ],
    didYouKnow: "An aluminum beverage can can be recycled, remanufactured, and placed back on a retail store shelf in as little as 60 days!",
    impactStat: "One student carrying a reusable water bottle avoids roughly 167 single-use plastic bottles annually.",
    subtopics: [
      {
        title: "1. The 5 R's Sustainable Lifestyle Hierarchy",
        content: "Recycling is essential, but 'Refusing' and 'Reducing' are vastly more effective because they eliminate resource extraction and manufacturing emissions before waste is ever created."
      },
      {
        title: "2. Upcycling vs. Downcycling",
        content: "Traditional plastic recycling is often 'downcycling', where plastics lose tensile strength and become lower-grade items like speed bumps. Creative upcycling breathes artistic, practical new life into everyday items."
      },
      {
        title: "3. Green Procurement on School Campuses",
        content: "Student bodies can advocate for sustainable cafeteria utensils (bagasse or steel instead of plastic thermocol), recycled unbleached paper notebooks, and digital assignments to minimize paper waste."
      }
    ],
    relatedQuizDifficulty: "Beginner, Intermediate, Advanced",
    recommendedMissions: ["m-plastic-1", "m-recycle-1"]
  }
];

// EcoQuest - Environmental Quizzes Question Bank
window.EcoQuestData = window.EcoQuestData || {};

window.EcoQuestData.quizzes = [
  // WASTE MANAGEMENT - Beginner
  {
    id: "q-waste-b1",
    topicId: "waste-management",
    difficulty: "Beginner",
    question: "Which of the following items belongs in the green wet waste (organic) bin?",
    options: [
      "Plastic beverage bottles",
      "Vegetable peelings and leftover food",
      "Cardboard packaging boxes",
      "Lithium button batteries"
    ],
    correctIndex: 1,
    explanation: "Vegetable peels and food waste are biodegradable organic materials that decompose naturally and can be turned into rich compost in a green wet waste bin.",
    funFact: "Organic waste accounts for nearly 50% of municipal solid waste in developing nations.",
    xpValue: 25
  },
  {
    id: "q-waste-b2",
    topicId: "waste-management",
    difficulty: "Beginner",
    question: "What does the first 'R' in the environmental 3R hierarchy stand for?",
    options: [
      "Recycle",
      "Reduce",
      "Reuse",
      "Reconstruct"
    ],
    correctIndex: 1,
    explanation: "'Reduce' is the most effective first step because avoiding the generation of unnecessary waste eliminates environmental costs right at the source.",
    funFact: "Refusing single-use plastic wrap is an example of the 'Reduce' principle.",
    xpValue: 25
  },
  // WASTE MANAGEMENT - Intermediate
  {
    id: "q-waste-i1",
    topicId: "waste-management",
    difficulty: "Intermediate",
    question: "Why is it hazardous to mix discarded lithium-ion batteries with regular household trash?",
    options: [
      "They cause compost to turn too alkaline",
      "They can puncture, short-circuit, and trigger catastrophic landfill fires while leaching toxic cobalt and lithium",
      "They quickly dissolve into harmless mineral dust",
      "They attract rodents and pests"
    ],
    correctIndex: 1,
    explanation: "Lithium-ion batteries carry residual charge; when crushed in trash compactors or exposed to moisture, thermal runaway can ignite landfill fires and leach dangerous heavy metals into ground water.",
    funFact: "Over 60% of garbage truck fires are sparked by incorrectly discarded lithium batteries.",
    xpValue: 35
  },
  // WASTE MANAGEMENT - Advanced
  {
    id: "q-waste-a1",
    topicId: "waste-management",
    difficulty: "Advanced",
    question: "Under the Extended Producer Responsibility (EPR) policy framework, who holds statutory accountability for post-consumer product recycling?",
    options: [
      "Only the municipal garbage collectors",
      "The retail consumers who purchase the product",
      "The manufacturers, importers, and brand owners who introduce the packaging/product to market",
      "Landfill management contractors exclusively"
    ],
    correctIndex: 2,
    explanation: "EPR places statutory cradle-to-grave responsibility on brand owners and manufacturers to finance, collect, and channel equivalent quantities of post-consumer plastic and e-waste into certified recyclers.",
    funFact: "EPR policies in Europe have boosted packaging recycling rates beyond 70%.",
    xpValue: 50
  },

  // WATER CONSERVATION - Beginner
  {
    id: "q-water-b1",
    topicId: "water-conservation",
    difficulty: "Beginner",
    question: "Which everyday bathroom habit saves the largest quantity of fresh water?",
    options: [
      "Taking a 20-minute power shower",
      "Turning off the tap while brushing teeth and using a bucket for bathing",
      "Washing dishes one by one under a fully running faucet",
      "Cleaning driveways with a high-pressure hose"
    ],
    correctIndex: 1,
    explanation: "Turning off the running tap while brushing teeth saves up to 12 liters of water per minute, and a bucket bath uses only 15-20 liters compared to 80-120 liters in a power shower.",
    funFact: "Leaving a tap running for 2 minutes wastes enough drinking water for an entire adult for 4 days.",
    xpValue: 25
  },
  {
    id: "q-water-b2",
    topicId: "water-conservation",
    difficulty: "Beginner",
    question: "What is rainwater harvesting primarily designed to do?",
    options: [
      "Create artificial clouds",
      "Capture and store rain runoff for reuse or groundwater recharge",
      "Evaporate rainwater as quickly as possible",
      "Increase urban asphalt temperatures"
    ],
    correctIndex: 1,
    explanation: "Rainwater harvesting collects rooftop and surface runoff, filters it, and channels it into storage cisterns or percolation pits to replenish depleting local groundwater aquifers.",
    funFact: "A 100 sq. meter roof can collect about 50,000 liters of water each year from 500mm of rainfall.",
    xpValue: 25
  },
  // WATER CONSERVATION - Intermediate
  {
    id: "q-water-i1",
    topicId: "water-conservation",
    difficulty: "Intermediate",
    question: "What is the defining characteristic of 'greywater' in residential or campus buildings?",
    options: [
      "Severely contaminated water from toilets containing pathogens",
      "Wastewater from sinks, showers, and laundry that does not contain fecal matter",
      "Distilled laboratory water with zero dissolved minerals",
      "Industrial toxic effluent containing arsenic"
    ],
    correctIndex: 1,
    explanation: "Greywater is wastewater generated from handwashing, showers, and washing machines. Because it lacks pathogens found in toilet blackwater, it can be filtered easily for landscape irrigation and toilet flushing.",
    funFact: "Reusing greywater can cut campus fresh water demand by up to 40%.",
    xpValue: 35
  },
  // WATER CONSERVATION - Advanced
  {
    id: "q-water-a1",
    topicId: "water-conservation",
    difficulty: "Advanced",
    question: "Which irrigation technique achieves the highest water application efficiency (typically >90%) in agriculture?",
    options: [
      "Flood/furrow irrigation",
      "Sub-surface drip irrigation delivering micro-droplets directly to the root zone",
      "High-pressure overhead spray guns during mid-afternoon",
      "Open earthen canal flooding"
    ],
    correctIndex: 1,
    explanation: "Drip irrigation targets water directly to root systems with minimal surface evaporation or percolation losses, achieving up to 90-95% water efficiency compared to 40-50% for flood irrigation.",
    funFact: "Drip irrigation also reduces weed growth since surrounding dry soil receives no unnecessary moisture.",
    xpValue: 50
  },

  // CLIMATE CHANGE - Beginner
  {
    id: "q-climate-b1",
    topicId: "climate-change",
    difficulty: "Beginner",
    question: "Which of the following is the most abundant human-generated greenhouse gas driving global warming?",
    options: [
      "Carbon Dioxide (CO2)",
      "Helium (He)",
      "Argon (Ar)",
      "Nitrogen (N2)"
    ],
    correctIndex: 0,
    explanation: "Carbon dioxide (CO2), primarily emitted through the combustion of fossil fuels (coal, oil, gas) and deforestation, contributes the largest share to human-induced global warming.",
    funFact: "Atmospheric CO2 concentrations were ~280 ppm before the Industrial Revolution and now surpass 420 ppm.",
    xpValue: 25
  },
  // CLIMATE CHANGE - Intermediate
  {
    id: "q-climate-i1",
    topicId: "climate-change",
    difficulty: "Intermediate",
    question: "What is the primary global goal agreed upon in the landmark Paris Agreement (COP21)?",
    options: [
      "To completely freeze industrial production across all countries",
      "To limit global average temperature rise to well below 2°C, preferably 1.5°C above pre-industrial levels",
      "To eradicate all motorized transportation by the year 2025",
      "To artificially cool the polar ice caps with space mirrors"
    ],
    correctIndex: 1,
    explanation: "The Paris Agreement legally binds nations to strive towards limiting global temperature rise to 1.5°C above pre-industrial levels to avert severe tipping points in Earth's climatic stability.",
    funFact: "Every additional 0.5°C of warming drastically multiplies extreme heat events, drought frequency, and coral reef die-offs.",
    xpValue: 35
  },
  // CLIMATE CHANGE - Advanced
  {
    id: "q-climate-a1",
    topicId: "climate-change",
    difficulty: "Advanced",
    question: "Why is methane (CH4) considered such an urgent concern in short-term climate mitigation, despite its shorter atmospheric lifespan than CO2?",
    options: [
      "It has zero absorption of infrared heat",
      "It has a Global Warming Potential (GWP) roughly 80 times greater than CO2 over a 20-year timescale",
      "It rapidly destroys ozone in the lower troposphere",
      "It only comes from volcanic vents"
    ],
    correctIndex: 1,
    explanation: "Over a 20-year horizon, methane is approximately 80 times more potent at trapping thermal radiation than carbon dioxide. Curbing methane leaks from landfills, oil wells, and livestock yields rapid cooling benefits.",
    funFact: "Targeted cuts in methane could avoid nearly 0.3°C of warming by 2045.",
    xpValue: 50
  },

  // RENEWABLE ENERGY - Beginner
  {
    id: "q-energy-b1",
    topicId: "renewable-energy",
    difficulty: "Beginner",
    question: "Which of the following is an inexhaustible, clean renewable energy source?",
    options: [
      "Anthracite coal",
      "Solar photovoltaic radiation",
      "Crude petroleum oil",
      "Diesel fuel"
    ],
    correctIndex: 1,
    explanation: "Solar energy is naturally replenished on human timescales and emits zero greenhouse gases or particulate soot during electricity generation.",
    funFact: "Enough sunlight hits the earth's surface in 90 minutes to satisfy human energy needs for an entire year.",
    xpValue: 25
  },
  // RENEWABLE ENERGY - Intermediate
  {
    id: "q-energy-i1",
    topicId: "renewable-energy",
    difficulty: "Intermediate",
    question: "What is 'vampire power' (or phantom load) in dorm rooms and households?",
    options: [
      "Electricity generated during nighttime solar hours",
      "Electric power consumed by electronic gadgets and chargers even when turned off or in standby mode",
      "Power surges caused by lightning storms",
      "High voltage used exclusively in hospital machinery"
    ],
    correctIndex: 1,
    explanation: "Appliances like laptop chargers, smart TVs, and microwaves draw standby electric current continuously while plugged in, accounting for up to 5-10% of total residential electric usage.",
    funFact: "Using switchable power strips to fully cut power saves households up to $100 per year.",
    xpValue: 35
  },
  // RENEWABLE ENERGY - Advanced
  {
    id: "q-energy-a1",
    topicId: "renewable-energy",
    difficulty: "Advanced",
    question: "In an off-grid solar installation, what is the primary role of the inverter?",
    options: [
      "To store energy chemically inside lead or lithium plates",
      "To convert Direct Current (DC) produced by solar panels into Alternating Current (AC) used by standard appliances",
      "To concentrate solar rays into thermal steam",
      "To step down water pressure in cooling pipes"
    ],
    correctIndex: 1,
    explanation: "Solar PV panels generate Direct Current (DC), whereas standard grid equipment and campus appliances operate on 230V/110V Alternating Current (AC). The inverter performs this synchronized electrical conversion.",
    funFact: "Modern grid-tie inverters boast conversion efficiencies exceeding 98%.",
    xpValue: 50
  },

  // BIODIVERSITY - Beginner
  {
    id: "q-bio-b1",
    topicId: "biodiversity",
    difficulty: "Beginner",
    question: "Why are honeybees and butterflies considered essential to human survival?",
    options: [
      "They generate electrical signals in the atmosphere",
      "They pollinate flowering plants that produce more than 75% of global food crops",
      "They consume massive amounts of plastic waste",
      "They prevent clouds from forming storms"
    ],
    correctIndex: 1,
    explanation: "Pollinators transfer pollen grains between flowers, fertilizing fruits, vegetables, nuts, and oilseeds that feed humans and terrestrial wildlife.",
    funFact: "One out of every three bites of food we eat depends directly on animal pollinators.",
    xpValue: 25
  },
  // BIODIVERSITY - Intermediate
  {
    id: "q-bio-i1",
    topicId: "biodiversity",
    difficulty: "Intermediate",
    question: "Why is planting native indigenous tree species vastly superior to exotic ornamental trees for campus biodiversity?",
    options: [
      "Native trees require toxic pesticides every week",
      "Native species have co-evolved with local insects, birds, and soil microbes, providing vital nutrition and habitat",
      "Exotic trees grow 100 times faster in any climate",
      "Native trees require plastic mulching"
    ],
    correctIndex: 1,
    explanation: "Native trees support up to 20-30 times more caterpillar, insect, bird, and pollinator species than foreign ornamentals like Eucalyptus or Conifers, which often create ecological 'food deserts'.",
    funFact: "A native oak tree can host over 500 species of native caterpillars, fueling songbird broods.",
    xpValue: 35
  },
  // BIODIVERSITY - Advanced
  {
    id: "q-bio-a1",
    topicId: "biodiversity",
    difficulty: "Advanced",
    question: "What is the core principle of the 'Miyawaki Method' of afforestation on institutional campuses?",
    options: [
      "Planting only a single clone of monoculture pine trees in straight lines",
      "Planting dense, multi-tiered layers of native species with enriched organic soil to mimic virgin primeval forests",
      "Using chemical growth hormones to force rapid bamboo growth",
      "Replacing all soil with crushed gravel and sand"
    ],
    correctIndex: 1,
    explanation: "Pioneered by Dr. Akira Miyawaki, this method plants 3-4 native saplings per square meter in layered canopies, accelerating natural succession so a mature, dense micro-forest develops in just 20-30 years instead of 200.",
    funFact: "Miyawaki forests absorb up to 30 times more carbon dioxide and noise than conventional lawns.",
    xpValue: 50
  },

  // POLLUTION - Beginner
  {
    id: "q-poll-b1",
    topicId: "pollution",
    difficulty: "Beginner",
    question: "What does the Air Quality Index (AQI) metric evaluate?",
    options: [
      "The velocity of wind on mountain peaks",
      "The concentration of key airborne pollutants and their associated health risk levels",
      "The temperature of seawater during low tide",
      "The percentage of oxygen dissolved in drinking water"
    ],
    correctIndex: 1,
    explanation: "AQI maps concentrations of ground pollutants (PM2.5, PM10, NO2, SO2, CO, O3) into a standardized index to communicate public health warnings clearly.",
    funFact: "An AQI reading above 200 indicates 'Very Unhealthy' air where outdoor aerobic exercise should be avoided.",
    xpValue: 25
  },
  // POLLUTION - Intermediate
  {
    id: "q-poll-i1",
    topicId: "pollution",
    difficulty: "Intermediate",
    question: "Why are fine particulate matter particles known as PM2.5 especially hazardous to human respiratory health?",
    options: [
      "Because they are larger than golf balls and cause blunt trauma",
      "Because their tiny diameter (<2.5 micrometers) allows them to bypass nasal filters, penetrate deep into alveoli, and enter bloodstream",
      "Because they only appear during heavy thunderstorms",
      "Because they turn rainwater into pure salt"
    ],
    correctIndex: 1,
    explanation: "PM2.5 particles are less than 3% the diameter of a human hair. Their miniscule size enables them to cross the lung barrier into capillaries, triggering cardiovascular disease and systemic inflammation.",
    funFact: "Common sources of PM2.5 include vehicle exhaust, agricultural burning, and coal-fired power stations.",
    xpValue: 35
  },
  // POLLUTION - Advanced
  {
    id: "q-poll-a1",
    topicId: "pollution",
    difficulty: "Advanced",
    question: "What environmental catastrophe occurs in aquatic bodies during agricultural 'eutrophication'?",
    options: [
      "Water turns into sparkling drinking water instantly",
      "Excessive nitrogen and phosphorus runoff triggers explosive algal blooms, followed by bacterial decomposition that depletes dissolved oxygen (hypoxia)",
      "Fish populations multiply by 1000% without food",
      "The water body evaporates within 24 hours"
    ],
    correctIndex: 1,
    explanation: "Fertilizer runoff causes massive algae blooms on surface waters. When the algae die, aerobic decomposers consume all dissolved oxygen in the water column, creating suffocating aquatic 'dead zones'.",
    funFact: "The Gulf of Mexico dead zone spans thousands of square kilometers every summer due to upstream fertilizer runoff.",
    xpValue: 50
  },

  // RECYCLING & SUSTAINABILITY - Beginner
  {
    id: "q-rec-b1",
    topicId: "recycling-sustainability",
    difficulty: "Beginner",
    question: "Which of the following actions is the most sustainable choice for carrying groceries or campus books?",
    options: [
      "Taking 5 thin single-use plastic carry bags each visit",
      "Carrying a durable washable canvas or cotton tote bag for years",
      "Asking for double plastic bags with plastic film wrapping",
      "Discarding bags on the street immediately"
    ],
    correctIndex: 1,
    explanation: "A reusable cloth or canvas bag replaces hundreds of flimsy disposable plastic bags that would otherwise end up choking storm drains or marine wildlife.",
    funFact: "A single plastic bag takes anywhere from 500 to 1,000 years to degrade in the environment into microplastics.",
    xpValue: 25
  },
  // RECYCLING & SUSTAINABILITY - Intermediate
  {
    id: "q-rec-i1",
    topicId: "recycling-sustainability",
    difficulty: "Intermediate",
    question: "What is the crucial difference between 'Upcycling' and 'Downcycling'?",
    options: [
      "Downcycling makes products more expensive, upcycling throws them away",
      "Upcycling transforms discarded materials into products of equal or higher aesthetic/practical value, whereas downcycling breaks them into lower-grade materials",
      "Upcycling is illegal in schools and colleges",
      "There is no difference whatsoever"
    ],
    correctIndex: 1,
    explanation: "Upcycling reimagines waste into higher-utility items (e.g., turning wooden pallets into ergonomic campus benches), while downcycling degrades material quality through successive reprocessing cycles.",
    funFact: "Turning discarded glass bottles into solar lanterns is a classic example of creative upcycling.",
    xpValue: 35
  },
  // RECYCLING & SUSTAINABILITY - Advanced
  {
    id: "q-rec-a1",
    topicId: "recycling-sustainability",
    difficulty: "Advanced",
    question: "What is the core paradigm shift of a 'Circular Economy' compared to the traditional linear 'Take-Make-Dispose' model?",
    options: [
      "It requires consumers to burn all items after one week of use",
      "It designs out waste from the start by keeping products, components, and materials circulating at their highest utility and value indefinitely",
      "It mandates that all manufacturing be stopped globally",
      "It relies exclusively on single-use plastics"
    ],
    correctIndex: 1,
    explanation: "A circular economy decouples economic growth from the consumption of finite resources by prioritizing modular design, repairability, remanufacturing, and biological regeneration.",
    funFact: "Transitioning to a circular economy could reduce global GHG emissions by up to 39%.",
    xpValue: 50
  }
];

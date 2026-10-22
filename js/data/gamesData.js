// EcoQuest - Mini-Games Catalog & Educational Content (3 games per environmental topic)
window.EcoQuestData = window.EcoQuestData || {};

window.EcoQuestData.topicEmoji = {
  "waste-management": "🗑️",
  "water-conservation": "💧",
  "climate-change": "🔥",
  "renewable-energy": "⚡",
  "biodiversity": "🌳",
  "pollution": "🌫️",
  "recycling-sustainability": "♻️"
};

// XP rules (applied in storage.recordGameResult):
// - XP scales with the score percentage, up to `xp`.
// - +10 XP bonus on the first completion only.
// - Replays only award the difference when the best score improves (no score farming).
window.EcoQuestData.miniGameRules = {
  firstCompletionBonus: 10
};

window.EcoQuestData.miniGames = [
  // ───────────────────────── A. WASTE MANAGEMENT ─────────────────────────
  {
    id: "waste-segregation",
    topicId: "waste-management",
    title: "Waste Segregation Challenge",
    icon: "🗑️",
    mechanic: "Drag & Drop Sorting",
    description: "Sort 12 everyday items into the correct colour-coded bin before they pile up.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-emerald-400 to-green-600",
    howTo: [
      "An item appears on the conveyor belt.",
      "Drag it into the right bin — or tap/click the item, then tap a bin.",
      "Keyboard: press 1, 2, 3 or 4 to drop the current item into a bin."
    ],
    takeaway: "Segregating waste at source keeps recyclables clean, lets food scraps become compost, and stops toxic e-waste and hazardous items from poisoning soil and groundwater. Mixed waste is far harder (and more expensive) to recover.",
    content: {
      bins: [
        { id: "wet", label: "Wet / Organic", key: "1", emoji: "🟢", color: "green", hint: "Food & garden waste" },
        { id: "dry", label: "Dry Recyclable", key: "2", emoji: "🔵", color: "blue", hint: "Paper, plastic, metal, glass" },
        { id: "hazard", label: "Hazardous & Sanitary", key: "3", emoji: "🔴", color: "red", hint: "Medicines, chemicals, sanitary" },
        { id: "ewaste", label: "E-Waste", key: "4", emoji: "🟡", color: "yellow", hint: "Electronics & batteries" }
      ],
      rounds: [
        {
          items: [
            { id: "banana", name: "Banana peel", emoji: "🍌", bin: "wet", why: "Food scraps are biodegradable — they belong in the wet bin and can be composted." },
            { id: "bottle", name: "Plastic water bottle", emoji: "🧴", bin: "dry", why: "Rinsed PET bottles are dry recyclables and are widely recycled into fibre and new bottles." },
            { id: "phone", name: "Old mobile phone", emoji: "📱", bin: "ewaste", why: "Phones contain lead, mercury and valuable metals — e-waste must go to certified recyclers." },
            { id: "medicine", name: "Expired medicines", emoji: "💊", bin: "hazard", why: "Medicines can contaminate water; return them to pharmacy take-back points or hazardous collection." },
            { id: "newspaper", name: "Old newspaper", emoji: "📰", bin: "dry", why: "Clean, dry paper is recyclable. Recycling 1 tonne of paper saves about 17 trees." },
            { id: "battery", name: "Used AA batteries", emoji: "🔋", bin: "ewaste", why: "Batteries hold toxic heavy metals like cadmium and must be handled as e-waste, never thrown in regular bins." }
          ],
          fact: "Source segregation into wet, dry, hazardous and e-waste can reduce the waste sent to landfill by up to 80%."
        },
        {
          items: [
            { id: "veg", name: "Vegetable peels", emoji: "🥕", bin: "wet", why: "Peels are nitrogen-rich 'greens' for a compost pit." },
            { id: "can", name: "Metal food tin", emoji: "🥫", bin: "dry", why: "Steel and aluminium tins can be recycled again and again." },
            { id: "cable", name: "Broken charger cable", emoji: "🔌", bin: "ewaste", why: "Cables contain copper and PVC — they are electronic waste." },
            { id: "bandage", name: "Used bandage", emoji: "🩹", bin: "hazard", why: "Sanitary and medical waste can carry germs and must be wrapped and kept separate." },
            { id: "glass", name: "Glass jam bottle", emoji: "🍾", bin: "dry", why: "Glass can be recycled endlessly without losing quality." },
            { id: "leaves", name: "Dry garden leaves", emoji: "🍂", bin: "wet", why: "Dry leaves are carbon-rich 'browns' — perfect for composting, never for burning." }
          ],
          fact: "Organic waste dumped in landfills rots without oxygen and releases methane, a greenhouse gas far more potent than CO₂."
        }
      ]
    }
  },
  {
    id: "recycling-jigsaw",
    topicId: "waste-management",
    title: "Recycling Jigsaw Puzzle",
    icon: "🧩",
    mechanic: "Tile-Swap Puzzle",
    description: "Rebuild the scrambled picture of the recycling loop — from collection to brand-new products.",
    duration: "~1–2 min",
    xp: 50,
    gradient: "from-teal-400 to-emerald-600",
    howTo: [
      "The 3×3 picture has been scrambled.",
      "Select one tile, then select another to swap them (drag-and-drop also works).",
      "Fewer moves = higher score. Tap 'Peek' to see the finished picture."
    ],
    takeaway: "Recycling is a loop, not a bin: materials are collected, sorted by type, processed into raw material (pulp, flakes, ingots, cullet) and manufactured into new products. Every stage depends on households segregating waste correctly at the start.",
    content: {
      stages: [
        { emoji: "🚛", name: "1. Collection", text: "Segregated dry waste is collected from homes, schools and drop-off points." },
        { emoji: "🧤", name: "2. Sorting", text: "Waste workers and machines separate paper, plastics, metals and glass." },
        { emoji: "🏭", name: "3. Processing", text: "Materials are cleaned, shredded or melted into raw material like pulp, flakes and ingots." },
        { emoji: "🛍️", name: "4. New Products", text: "Factories turn that raw material into new bottles, notebooks, cans and fabrics." }
      ],
      fact: "An aluminium can can be recycled and back on a shop shelf in as little as 60 days — and recycling aluminium uses about 95% less energy than making it new."
    }
  },
  {
    id: "reuse-or-recycle",
    topicId: "waste-management",
    title: "Reuse or Recycle?",
    icon: "🔁",
    mechanic: "Matching Board",
    description: "Match each everyday object with its best action: reduce, reuse, recycle, compost or dispose safely.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-lime-400 to-emerald-600",
    howTo: [
      "Each round has 5 objects and 5 action stations — every action is used exactly once.",
      "Drag an object onto an action, or tap the object and then tap the action.",
      "First-try matches earn 10 points; a second try earns 5."
    ],
    takeaway: "The waste hierarchy ranks actions: reduce (or refuse) first, then reuse, then recycle or compost, and safe disposal last. Choosing the highest possible step saves the most resources and energy.",
    content: {
      actions: [
        { id: "reduce", label: "Reduce", emoji: "✋", hint: "Avoid it or use less" },
        { id: "reuse", label: "Reuse", emoji: "🔁", hint: "Use it again" },
        { id: "recycle", label: "Recycle", emoji: "♻️", hint: "Turn into new material" },
        { id: "compost", label: "Compost", emoji: "🌱", hint: "Return to the soil" },
        { id: "dispose", label: "Dispose Safely", emoji: "⚠️", hint: "Special hazardous handling" }
      ],
      rounds: [
        {
          items: [
            { id: "jar", name: "Empty glass jam jar", emoji: "🫙", action: "reuse", why: "A sturdy jar can store spices, pens or leftovers for years — reuse it before recycling." },
            { id: "sodacan", name: "Crushed aluminium can", emoji: "🥫", action: "recycle", why: "Aluminium is infinitely recyclable and saves ~95% of the energy needed for new metal." },
            { id: "applecore", name: "Apple core & tea leaves", emoji: "🍎", action: "compost", why: "Food scraps break down into rich compost in 6–8 weeks." },
            { id: "cfl", name: "Broken CFL bulb", emoji: "💡", action: "dispose", why: "CFLs contain mercury — they need hazardous-waste collection, never the regular bin." },
            { id: "straw", name: "Plastic straw offered with juice", emoji: "🥤", action: "reduce", why: "The best waste is no waste: simply refuse the straw." }
          ],
          fact: "Refusing and reducing beat recycling because they avoid extraction, manufacturing and transport emissions entirely."
        },
        {
          items: [
            { id: "bag", name: "Extra plastic bag for 2 items", emoji: "🛍️", action: "reduce", why: "Carry a cloth bag or skip the bag for small purchases." },
            { id: "tshirt", name: "Old cotton T-shirt", emoji: "👕", action: "reuse", why: "Cut it into cleaning rags or donate it — keeping textiles in use is the greenest option." },
            { id: "paper", name: "Stack of clean newspapers", emoji: "📰", action: "recycle", why: "Clean paper is recycled into new paper and cardboard." },
            { id: "eggshell", name: "Eggshells & coffee grounds", emoji: "🥚", action: "compost", why: "They add calcium and nitrogen to compost." },
            { id: "batteries", name: "Dead AA batteries", emoji: "🔋", action: "dispose", why: "Batteries go to e-waste/battery collection points so heavy metals don't leak." }
          ],
          fact: "Wearing clothes for just 9 months longer can reduce their carbon, water and waste footprint by around 20–30%."
        }
      ]
    }
  },

  // ───────────────────────── B. WATER CONSERVATION ─────────────────────────
  {
    id: "save-the-water",
    topicId: "water-conservation",
    title: "Save the Water",
    icon: "🚰",
    mechanic: "Spot the Waste",
    description: "Inspect a busy home and fix every wasteful water habit before time runs out.",
    duration: "60 sec",
    xp: 50,
    gradient: "from-cyan-400 to-blue-600",
    howTo: [
      "Look around the house, rooftop and garden.",
      "Click or tap only the habits that WASTE water to fix them (6 to find).",
      "Careful: some habits are already water-wise — clicking those costs 5 points.",
      "Finish fast for a time bonus!"
    ],
    takeaway: "Most household water waste comes from small, fixable habits: leaks, running taps, long showers, hoses and overflowing tanks. Fixing them — and harvesting rainwater — saves thousands of litres per home every year.",
    content: {
      timeLimit: 60,
      rooms: [
        { id: "roof", label: "Rooftop", emoji: "🏠" },
        { id: "bath", label: "Bathroom", emoji: "🛁" },
        { id: "kitchen", label: "Kitchen & Laundry", emoji: "🍳" },
        { id: "garden", label: "Garden & Driveway", emoji: "🌿" }
      ],
      spots: [
        { id: "tank", room: "roof", emoji: "🛢️", label: "Overhead tank overflowing", waste: true, why: "Fit a float valve or overflow alarm — an overflowing tank can waste hundreds of litres a day." },
        { id: "barrel", room: "roof", emoji: "🌧️", label: "Rain barrel under the drainpipe", waste: false, why: "Rainwater harvesting is water-wise: it captures free water for gardens and recharge." },
        { id: "brush", room: "bath", emoji: "🪥", label: "Tap left running while brushing", waste: true, why: "Turn the tap off — a running tap can pour out around 6 litres every minute." },
        { id: "shower", room: "bath", emoji: "🚿", label: "20-minute hot shower", waste: true, why: "Cutting showers to 5 minutes saves tens of litres (and energy for heating) every day." },
        { id: "bucket", room: "bath", emoji: "🪣", label: "Bucket bath", waste: false, why: "A bucket bath uses a fixed, small amount of water — already water-wise!" },
        { id: "drip", room: "kitchen", emoji: "🚰", label: "Kitchen tap dripping", waste: true, why: "A tap dripping once per second wastes over 3,000 litres a year — a new washer fixes it." },
        { id: "machine", room: "kitchen", emoji: "🧺", label: "Washing machine run with a full load", waste: false, why: "Full loads use water efficiently — this habit is already good." },
        { id: "hose", room: "garden", emoji: "🚗", label: "Car washed with a running hose", waste: true, why: "A hose can use 100+ litres per wash; a bucket and cloth uses a fraction of that." },
        { id: "sprinkler", room: "garden", emoji: "☀️", label: "Sprinkler running at noon", waste: true, why: "Midday watering loses much of the water to evaporation — water at dawn or dusk instead." },
        { id: "dripirr", room: "garden", emoji: "🌱", label: "Drip irrigation in vegetable patch", waste: false, why: "Drip irrigation delivers water straight to the roots with up to 95% efficiency." }
      ],
      fact: "Less than 1% of all the water on Earth is accessible fresh water that people and ecosystems can use."
    }
  },
  {
    id: "water-cycle-jigsaw",
    topicId: "water-conservation",
    title: "Water Cycle Jigsaw",
    icon: "🌧️",
    mechanic: "Diagram Puzzle",
    description: "Fit the six puzzle pieces into the right places on the water-cycle diagram.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-sky-400 to-cyan-600",
    howTo: [
      "Six stage pieces sit in the tray below the diagram.",
      "Drag a piece onto its numbered slot — or tap the piece, then tap the slot.",
      "Correct pieces lock in place; wrong ones bounce back with a hint."
    ],
    takeaway: "The water cycle is powered by the Sun: water evaporates and transpires, condenses into clouds, falls as precipitation, then runs off into rivers or infiltrates the ground before returning to the sea. Protecting forests, soil and wetlands keeps this cycle — and our water supply — healthy.",
    content: {
      pieces: [
        { id: "evaporation", label: "Evaporation", emoji: "♨️", slot: 1, why: "The Sun heats oceans, lakes and rivers, turning liquid water into invisible water vapour." },
        { id: "transpiration", label: "Transpiration", emoji: "🌳", slot: 2, why: "Plants release water vapour through tiny pores (stomata) in their leaves." },
        { id: "condensation", label: "Condensation", emoji: "☁️", slot: 3, why: "Rising vapour cools and condenses on dust particles, forming clouds." },
        { id: "precipitation", label: "Precipitation", emoji: "🌧️", slot: 4, why: "Cloud droplets combine until they are heavy enough to fall as rain, hail or snow." },
        { id: "runoff", label: "Runoff & Collection", emoji: "🏞️", slot: 5, why: "Water flows over land into streams, rivers and lakes, and is collected back in the ocean." },
        { id: "infiltration", label: "Infiltration", emoji: "⬇️", slot: 6, why: "Some water soaks into the soil and recharges underground aquifers (groundwater)." }
      ],
      fact: "Rooftop rainwater harvesting helps infiltration in cities, where concrete normally sends rain straight into drains."
    }
  },
  {
    id: "clean-the-river",
    topicId: "water-conservation",
    title: "Clean the River",
    icon: "🏞️",
    mechanic: "Cleanup Action",
    description: "Fish pollutants out of the river and choose the safe cleanup action for each one.",
    duration: "~1–2 min",
    xp: 50,
    gradient: "from-blue-400 to-teal-600",
    howTo: [
      "Click or tap something floating in the river.",
      "Choose the right action: recycle, compost, or report as hazardous (keys 1–3).",
      "Leave wildlife alone — removing fish, ducks or lotus costs 5 points.",
      "Clear all 8 pollutants to restore the river."
    ],
    takeaway: "River cleanups work best when waste is sorted as it is collected: recyclables go back into the loop, organic waste is composted, and hazardous items (syringes, chemicals, oil, batteries) are never handled bare-handed — they are reported to trained staff or authorities for safe disposal.",
    content: {
      actions: [
        { id: "recycle", label: "Collect for recycling", emoji: "♻️" },
        { id: "compost", label: "Collect for composting", emoji: "🌱" },
        { id: "hazard", label: "Hazardous — report for safe handling", emoji: "⚠️" }
      ],
      items: [
        { id: "cup", emoji: "🥤", name: "Plastic cup", kind: "recycle", x: 12, y: 30, why: "Plastic cups are dry waste — collect, rinse and send for recycling." },
        { id: "can", emoji: "🥫", name: "Aluminium can", kind: "recycle", x: 70, y: 24, why: "Cans are valuable recyclables — aluminium can be recycled forever." },
        { id: "bottle", emoji: "🍾", name: "Glass bottle", kind: "recycle", x: 44, y: 62, why: "Glass is fully recyclable — handle with care if broken." },
        { id: "flowers", emoji: "💐", name: "Flower offerings", kind: "compost", x: 28, y: 70, why: "Floral offerings are organic; composting them prevents rotting and oxygen loss in the water." },
        { id: "fruit", emoji: "🍉", name: "Rotting fruit waste", kind: "compost", x: 84, y: 66, why: "Food waste in rivers fuels algae and lowers oxygen — compost it instead." },
        { id: "oil", emoji: "🛢️", name: "Leaking oil drum", kind: "hazard", x: 56, y: 36, why: "Oil spreads into a toxic film. Don't touch it — report it so trained crews can contain it with booms." },
        { id: "syringe", emoji: "💉", name: "Used syringe", kind: "hazard", x: 90, y: 38, why: "Medical sharps can injure and infect. Never pick them up by hand — report for biomedical waste disposal." },
        { id: "battery", emoji: "🔋", name: "Old car battery", kind: "hazard", x: 20, y: 46, why: "Lead-acid batteries leak acid and lead. They need authorised hazardous-waste handling." }
      ],
      wildlife: [
        { id: "fish", emoji: "🐟", name: "Fish", x: 36, y: 40, why: "Fish are a sign of a living river — leave them be!" },
        { id: "duck", emoji: "🦆", name: "Duck", x: 64, y: 70, why: "Ducks belong in the river ecosystem — no need to remove them." },
        { id: "lotus", emoji: "🪷", name: "Lotus", x: 6, y: 72, why: "Native aquatic plants like lotus shelter fish and help clean the water." }
      ],
      fact: "Untreated sewage and solid waste are among the biggest causes of river pollution — one cleanup drive can stop tonnes of waste reaching the sea."
    }
  },

  // ───────────────────────── C. CLIMATE CHANGE ─────────────────────────
  {
    id: "carbon-footprint",
    topicId: "climate-change",
    title: "Carbon Footprint Challenge",
    icon: "👣",
    mechanic: "Lower or Higher?",
    description: "Two everyday choices, one lower-carbon option. Pick wisely to keep your footprint small.",
    duration: "~1–2 min",
    xp: 50,
    gradient: "from-amber-400 to-orange-600",
    howTo: [
      "Each round shows two everyday activities.",
      "Pick the one that generally produces LOWER greenhouse-gas emissions.",
      "Click/tap a card, or press ← for the left card and → for the right card.",
      "After each choice you'll see approximate CO₂-equivalent values."
    ],
    takeaway: "Transport, food, energy use and buying new things make up most personal emissions. Choosing public transport, plant-rich meals, efficient appliances and second-hand goods reduces your footprint — small changes add up when millions of people make them. (Values shown are rounded estimates; real figures vary by country, grid and product.)",
    content: {
      rounds: [
        { context: "Travelling 10 km to college", a: { label: "Driving alone in a petrol car", emoji: "🚗", kg: 1.7 }, b: { label: "Taking the metro or train", emoji: "🚇", kg: 0.4 }, why: "Shared transport splits emissions across many passengers — a train emits a fraction of a car per person per km." },
        { context: "Lunch today", a: { label: "Lentil dal with rice", emoji: "🍛", kg: 0.6 }, b: { label: "Beef burger", emoji: "🍔", kg: 4 }, why: "Cattle produce methane, and beef needs lots of land and feed — plant proteins have a much smaller footprint." },
        { context: "Drying one load of laundry", a: { label: "Electric tumble dryer", emoji: "🌀", kg: 1.8 }, b: { label: "Air-drying on a clothesline", emoji: "👕", kg: 0 }, why: "Sunlight and wind dry clothes for free — no electricity needed." },
        { context: "Lighting a room for 4 hours", a: { label: "9 W LED bulb", emoji: "💡", kg: 0.03 }, b: { label: "60 W incandescent bulb", emoji: "🔆", kg: 0.2 }, why: "LEDs use about 85% less electricity for the same light." },
        { context: "Delhi → Mumbai trip (~1,400 km)", a: { label: "Domestic flight", emoji: "✈️", kg: 200 }, b: { label: "Electric train", emoji: "🚆", kg: 40 }, why: "Flying is one of the most carbon-intensive ways to travel per kilometre." },
        { context: "Buying a T-shirt", a: { label: "Second-hand / thrifted tee", emoji: "♻️", kg: 0.5 }, b: { label: "New fast-fashion tee", emoji: "🏷️", kg: 6 }, why: "Most of a garment's footprint comes from making it — reusing clothes avoids that entirely." },
        { context: "1 kg of food scraps", a: { label: "Thrown into a landfill", emoji: "🗑️", kg: 0.6 }, b: { label: "Composted at home", emoji: "🌱", kg: 0.1 }, why: "Landfilled food rots without oxygen and emits methane; aerobic composting avoids most of it." },
        { context: "Running an AC for 8 hours", a: { label: "Set to 24 °C", emoji: "🌡️", kg: 5 }, b: { label: "Set to 18 °C", emoji: "🥶", kg: 8 }, why: "Each degree warmer saves roughly 6% electricity — India's BEE recommends a 24 °C default." }
      ]
    }
  },
  {
    id: "climate-match-up",
    topicId: "climate-change",
    title: "Climate Match-Up",
    icon: "🃏",
    mechanic: "Memory Cards",
    description: "Flip cards to pair greenhouse gases with their sources, and climate impacts with real solutions.",
    duration: "~1–2 min",
    xp: 50,
    gradient: "from-orange-400 to-rose-500",
    howTo: [
      "All 16 cards start face-down. Flip two at a time.",
      "Find matching pairs: gas ↔ activity, impact ↔ solution, problem ↔ fix.",
      "Each pair is worth 10 points, plus an efficiency bonus for few mismatches."
    ],
    takeaway: "Greenhouse gases come from specific human activities, so each has specific solutions. Mitigation cuts emissions (renewables, public transport, less waste), while adaptation protects people from impacts already happening (mangroves, urban trees, cool roofs).",
    content: {
      pairs: [
        { id: "co2", a: { text: "CO₂ (Carbon dioxide)", tag: "Gas", emoji: "🫧" }, b: { text: "Burning coal, oil & petrol", tag: "Activity", emoji: "⛽" }, why: "Burning fossil fuels is the largest source of CO₂ — which has passed 420 ppm in the atmosphere." },
        { id: "ch4", a: { text: "CH₄ (Methane)", tag: "Gas", emoji: "💨" }, b: { text: "Rotting landfill waste & cattle", tag: "Activity", emoji: "🐄" }, why: "Methane traps over 80× more heat than CO₂ over 20 years. Composting and cutting food waste help." },
        { id: "n2o", a: { text: "N₂O (Nitrous oxide)", tag: "Gas", emoji: "🧪" }, b: { text: "Overusing synthetic fertilisers", tag: "Activity", emoji: "🌾" }, why: "Excess nitrogen fertiliser releases N₂O, a long-lived greenhouse gas." },
        { id: "hfc", a: { text: "HFCs (F-gases)", tag: "Gas", emoji: "❄️" }, b: { text: "Leaking AC & fridge coolants", tag: "Activity", emoji: "🧊" }, why: "Refrigerant gases can be thousands of times stronger than CO₂ — servicing and proper disposal prevent leaks." },
        { id: "sea", a: { text: "Rising seas & coastal floods", tag: "Impact", emoji: "🌊" }, b: { text: "Restore mangroves & wetlands", tag: "Solution", emoji: "🌿" }, why: "Mangroves buffer storm surges and store large amounts of carbon." },
        { id: "heat", a: { text: "Extreme urban heatwaves", tag: "Impact", emoji: "🥵" }, b: { text: "Urban trees, parks & cool roofs", tag: "Solution", emoji: "🌳" }, why: "Shade trees and reflective roofs can cool city streets by several degrees." },
        { id: "power", a: { text: "Coal-fired power plants", tag: "Problem", emoji: "🏭" }, b: { text: "Solar & wind electricity", tag: "Solution", emoji: "☀️" }, why: "Renewables generate electricity with almost no operating emissions and are now among the cheapest power sources." },
        { id: "traffic", a: { text: "Long solo car commutes", tag: "Problem", emoji: "🚗" }, b: { text: "Metro, buses & cycling", tag: "Solution", emoji: "🚲" }, why: "Switching one commuter from car to transit or bicycle prevents ~2.4 tonnes of CO₂ a year." }
      ]
    }
  },
  {
    id: "climate-smart-city",
    topicId: "climate-change",
    title: "Build a Climate-Smart City",
    icon: "🏙️",
    mechanic: "City Builder",
    description: "Spend a limited budget upgrading a polluting city with trees, transit, renewables and green buildings.",
    duration: "~2 min",
    xp: 50,
    gradient: "from-yellow-400 to-amber-600",
    howTo: [
      "Choose an upgrade from the toolbox, then tap a city tile to build it.",
      "Each upgrade only fits certain tiles (e.g. solar/wind replace coal plants, trees need empty lots).",
      "Tap an upgraded tile (with no tool selected) to undo it and get a refund.",
      "Reach a Sustainability Score of 80+ within the 100-coin budget, then press 'Finish City'."
    ],
    takeaway: "Climate-smart cities cut emissions from their biggest sources — power, transport and buildings — while adding green cover that absorbs CO₂ and cools streets. Smart planning gets the most climate benefit from every rupee spent.",
    content: {
      budget: 100,
      target: 80,
      // Tile types and their yearly emissions in "units" (simplified model)
      tiles: {
        coal: { label: "Coal power plant", emoji: "🏭", emissions: 30 },
        road: { label: "Congested car road", emoji: "🚗", emissions: 10 },
        oldbuilding: { label: "Inefficient building", emoji: "🏢", emissions: 6 },
        house: { label: "Homes", emoji: "🏘️", emissions: 2 },
        empty: { label: "Empty lot", emoji: "🟫", emissions: 0 },
        solar: { label: "Solar farm", emoji: "☀️", emissions: 0 },
        wind: { label: "Wind farm", emoji: "🌬️", emissions: 0 },
        metro: { label: "Metro / e-bus line", emoji: "🚇", emissions: 2 },
        cycle: { label: "Cycle & walking lanes", emoji: "🚲", emissions: 0 },
        greenbuilding: { label: "Green retrofit building", emoji: "🏬", emissions: 2 },
        tree: { label: "Urban mini-forest", emoji: "🌳", emissions: -3 }
      },
      layout: [
        "coal", "empty", "house", "road",
        "road", "oldbuilding", "empty", "oldbuilding",
        "empty", "road", "coal", "empty",
        "house", "empty", "oldbuilding", "empty"
      ],
      tools: [
        { id: "solar", label: "Solar Farm", emoji: "☀️", cost: 20, fits: ["coal"], why: "Replacing coal with solar removes the city's biggest emission source." },
        { id: "wind", label: "Wind Farm", emoji: "🌬️", cost: 20, fits: ["coal"], why: "Wind turbines generate clean power day and night when the wind blows." },
        { id: "metro", label: "Metro / E-Bus", emoji: "🚇", cost: 18, fits: ["road"], why: "One metro line can carry as many people as many lanes of cars, with far lower emissions per person." },
        { id: "cycle", label: "Cycle Lanes", emoji: "🚲", cost: 8, fits: ["road"], why: "Safe cycle and walking lanes make short trips zero-emission and healthier." },
        { id: "greenbuilding", label: "Green Retrofit", emoji: "🏬", cost: 12, fits: ["oldbuilding"], why: "Insulation, LED lighting, efficient ACs and rooftop solar cut a building's energy use sharply." },
        { id: "tree", label: "Mini-Forest", emoji: "🌳", cost: 5, fits: ["empty"], why: "Miyawaki-style native mini-forests absorb CO₂, cool streets and host wildlife." }
      ],
      fact: "Cities produce over 70% of global energy-related CO₂ emissions — which also makes them the best place to cut emissions."
    }
  },

  // ───────────────────────── D. RENEWABLE ENERGY ─────────────────────────
  {
    id: "energy-source-matcher",
    topicId: "renewable-energy",
    title: "Energy Source Matcher",
    icon: "🔌",
    mechanic: "Connect the Pairs",
    description: "Connect six renewable energy sources to the description of how each one makes power.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-yellow-300 to-amber-500",
    howTo: [
      "Select an energy source on the left, then its matching description on the right.",
      "Correct pairs light up in the same colour.",
      "First-try matches earn 10 points; later tries earn 5."
    ],
    takeaway: "Renewable energy comes from sources that naturally replenish — sunlight, wind, flowing water, Earth's heat, tides and organic matter. Each works best in different places, so a clean grid uses a mix of them.",
    content: {
      pairs: [
        { id: "solar", source: "Solar PV", emoji: "☀️", desc: "Silicon cells turn sunlight directly into DC electricity.", why: "Solar energy hitting Earth in 90 minutes exceeds humanity's energy use for a whole year." },
        { id: "wind", source: "Wind Turbine", emoji: "🌬️", desc: "Moving air spins large blades connected to a generator.", why: "India has over 45 GW of installed wind capacity, mostly in coastal and western states." },
        { id: "hydro", source: "Hydropower", emoji: "💧", desc: "Water flowing from a dam or river turns turbines.", why: "Hydropower can be switched up or down quickly, which helps balance the grid." },
        { id: "geo", source: "Geothermal", emoji: "🌋", desc: "Heat from deep inside the Earth makes steam to drive turbines.", why: "Geothermal plants run 24/7, regardless of weather." },
        { id: "bio", source: "Biogas & Biomass", emoji: "🌾", desc: "Crop residue, dung and food waste are digested or burned for fuel.", why: "Biogas plants turn waste into clean cooking gas and fertiliser slurry." },
        { id: "tidal", source: "Tidal Energy", emoji: "🌊", desc: "The daily rise and fall of the sea moves underwater turbines.", why: "Tides are highly predictable, as they are driven by the Moon's gravity." }
      ],
      fact: "Solar and wind costs have fallen by over 80% in a decade, making them the cheapest new electricity in most countries."
    }
  },
  {
    id: "build-solar-system",
    topicId: "renewable-energy",
    title: "Build the Solar System",
    icon: "🔋",
    mechanic: "Circuit Builder",
    description: "Assemble an off-grid solar power kit in the right order, then switch it on to power the load.",
    duration: "~1–2 min",
    xp: 50,
    gradient: "from-amber-300 to-yellow-600",
    howTo: [
      "Place parts from the tray into the empty circuit slots, in order of energy flow.",
      "Drag a part to a slot, or tap a part then tap a slot. Tap a filled slot to remove it.",
      "Press 'Switch ON' to test. Not every part in the tray belongs in the circuit!",
      "Two levels: a DC study lamp, then an AC ceiling fan."
    ],
    takeaway: "A stand-alone solar system flows: solar panel (makes DC power) → charge controller (protects the battery from over-charging) → battery (stores energy for night) → load. AC appliances also need an inverter to convert DC into AC.",
    content: {
      parts: {
        panel: { label: "Solar Panel", emoji: "🟦", desc: "Converts sunlight into DC electricity." },
        controller: { label: "Charge Controller", emoji: "🎛️", desc: "Regulates charging and protects the battery." },
        battery: { label: "Battery", emoji: "🔋", desc: "Stores energy for use at night or on cloudy days." },
        inverter: { label: "Inverter", emoji: "🔄", desc: "Converts DC into AC for household appliances." },
        dclamp: { label: "DC LED Lamp", emoji: "💡", desc: "Low-power lamp that runs directly on DC." },
        acfan: { label: "AC Ceiling Fan", emoji: "🌀", desc: "Appliance that needs AC power." },
        diesel: { label: "Diesel Generator", emoji: "⛽", desc: "Burns fossil fuel — not part of a solar kit." }
      },
      levels: [
        { title: "Level 1: Solar Study Lamp (DC)", sequence: ["panel", "controller", "battery", "dclamp"], tray: ["battery", "dclamp", "inverter", "panel", "controller"], why: "A DC LED lamp runs straight from the battery — no inverter needed, so less energy is lost in conversion." },
        { title: "Level 2: Solar Ceiling Fan (AC)", sequence: ["panel", "controller", "battery", "inverter", "acfan"], tray: ["acfan", "diesel", "controller", "inverter", "panel", "battery"], why: "AC appliances need an inverter after the battery to convert DC into AC." }
      ],
      fact: "A 5 kW rooftop solar system can offset roughly 100 tonnes of CO₂ over its 25-year lifespan."
    }
  },
  {
    id: "power-the-city",
    topicId: "renewable-energy",
    title: "Power the City",
    icon: "🏙️",
    mechanic: "Grid Balancing",
    description: "Keep a city's lights on for 24 hours using only solar, wind, hydro and battery storage.",
    duration: "~2 min",
    xp: 50,
    gradient: "from-yellow-400 to-lime-600",
    howTo: [
      "Each round is a time of day with its own electricity demand.",
      "Use the + and − buttons to set each source. Supply must meet demand.",
      "Extra solar/wind charges the battery (up to its capacity) for later.",
      "The hydro reservoir is limited for the whole day — save some for the night!"
    ],
    takeaway: "Solar and wind vary through the day, so a renewable grid needs storage and flexible sources. Storing midday solar in batteries and saving dispatchable hydro for evening peaks keeps the lights on without fossil fuels.",
    content: {
      batteryCapacity: 60,
      hydroReservoir: 40,
      hydroPerRound: 30,
      step: 10,
      rounds: [
        { time: "6 AM", label: "Morning", emoji: "🌅", demand: 60, solar: 20, wind: 30, fact: "Morning demand rises before the Sun is strong — wind and stored energy fill the gap." },
        { time: "12 PM", label: "Noon", emoji: "☀️", demand: 70, solar: 100, wind: 20, fact: "Midday solar often exceeds demand. Storing the surplus is key to a renewable grid." },
        { time: "6 PM", label: "Evening Peak", emoji: "🌆", demand: 90, solar: 10, wind: 30, fact: "The evening peak arrives as the Sun sets — the hardest hour for a solar-heavy grid." },
        { time: "12 AM", label: "Night", emoji: "🌙", demand: 50, solar: 0, wind: 30, fact: "At night, wind, hydro and batteries keep essential services running." }
      ],
      fact: "Smart microgrids with battery storage let campuses become partly or completely energy self-sufficient."
    }
  },

  // ───────────────────────── E. BIODIVERSITY ─────────────────────────
  {
    id: "habitat-matching",
    topicId: "biodiversity",
    title: "Habitat Matching",
    icon: "🦜",
    mechanic: "Drag to Habitat",
    description: "Guide eight Indian animals back to the habitats they are adapted to.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-green-400 to-emerald-700",
    howTo: [
      "Drag each animal into its habitat — or tap an animal, then tap a habitat.",
      "First-try placements earn 10 points; later tries earn 5.",
      "Read the hint after each move to learn the animal's adaptations."
    ],
    takeaway: "Each species is adapted to the food, shelter and climate of its habitat. When forests, wetlands, oceans or grasslands are destroyed or broken up, the animals that depend on them cannot simply move elsewhere — protecting habitats protects species.",
    content: {
      habitats: [
        { id: "forest", label: "Forest", emoji: "🌲", bg: "from-green-600 to-emerald-800" },
        { id: "wetland", label: "Wetland", emoji: "🪷", bg: "from-teal-500 to-cyan-700" },
        { id: "ocean", label: "Ocean", emoji: "🌊", bg: "from-blue-500 to-indigo-700" },
        { id: "grassland", label: "Grassland", emoji: "🌾", bg: "from-lime-500 to-amber-600" }
      ],
      animals: [
        { id: "macaque", name: "Lion-tailed macaque", emoji: "🐒", habitat: "forest", why: "Lives high in the rainforest canopy of the Western Ghats, eating fruit and insects." },
        { id: "hornbill", name: "Great hornbill", emoji: "🦜", habitat: "forest", why: "Needs tall old forest trees with hollows to nest — and spreads seeds of forest fruit trees." },
        { id: "flamingo", name: "Greater flamingo", emoji: "🦩", habitat: "wetland", why: "Filters algae and tiny shrimp from shallow salty wetlands like the Rann of Kutch." },
        { id: "frog", name: "Indian bullfrog", emoji: "🐸", habitat: "wetland", why: "Breeds in ponds and marshes; its tadpoles need standing water." },
        { id: "turtle", name: "Olive ridley turtle", emoji: "🐢", habitat: "ocean", why: "Spends its life at sea and comes ashore in Odisha in mass nesting events called arribadas." },
        { id: "clownfish", name: "Clownfish", emoji: "🐠", habitat: "ocean", why: "Lives among sea anemones on coral reefs, such as those around the Andaman Islands." },
        { id: "blackbuck", name: "Blackbuck", emoji: "🦌", habitat: "grassland", why: "A fast antelope of open grasslands — it needs wide open space to graze and escape predators." },
        { id: "cheetah", name: "Cheetah", emoji: "🐆", habitat: "grassland", why: "Built for sprinting across open grasslands and savannas, like Kuno National Park." }
      ],
      fact: "Habitat loss is the single biggest driver of biodiversity decline worldwide."
    }
  },
  {
    id: "food-chain-puzzle",
    topicId: "biodiversity",
    title: "Food Chain Puzzle",
    icon: "🐍",
    mechanic: "Sequence Builder",
    description: "Link organisms from producer to top predator and watch how energy shrinks at each step.",
    duration: "~1–2 min",
    xp: 50,
    gradient: "from-emerald-400 to-teal-700",
    howTo: [
      "Tap organisms in order — the producer first, the top predator last. Each fills the next empty link.",
      "You can also drag an organism onto a specific link. Tap a filled link to send it back.",
      "Press 'Check Chain'. Three ecosystems to complete!"
    ],
    takeaway: "Energy flows from producers (plants, algae) to herbivores and then carnivores. Only about 10% of energy passes from one level to the next, which is why food chains are short and top predators are few — and why losing any link can unbalance the whole ecosystem.",
    content: {
      chains: [
        { name: "Grassland", emoji: "🌾", organisms: [
          { id: "grass", name: "Grass", emoji: "🌱", role: "Producer" },
          { id: "grasshopper", name: "Grasshopper", emoji: "🦗", role: "Primary consumer" },
          { id: "frog", name: "Frog", emoji: "🐸", role: "Secondary consumer" },
          { id: "snake", name: "Snake", emoji: "🐍", role: "Tertiary consumer" },
          { id: "eagle", name: "Eagle", emoji: "🦅", role: "Apex predator" }
        ], fact: "Snakes keep frog and rodent populations in check — removing them lets pests multiply." },
        { name: "Ocean", emoji: "🌊", organisms: [
          { id: "phyto", name: "Phytoplankton", emoji: "🦠", role: "Producer" },
          { id: "zoo", name: "Zooplankton", emoji: "🦐", role: "Primary consumer" },
          { id: "sardine", name: "Sardine", emoji: "🐟", role: "Secondary consumer" },
          { id: "dolphin", name: "Dolphin", emoji: "🐬", role: "Top predator" }
        ], fact: "Phytoplankton produce around half of the oxygen made by photosynthesis on Earth." },
        { name: "Pond", emoji: "🪷", organisms: [
          { id: "algae", name: "Algae", emoji: "🌿", role: "Producer" },
          { id: "larvae", name: "Mosquito larvae", emoji: "🦟", role: "Primary consumer" },
          { id: "guppy", name: "Small fish", emoji: "🐠", role: "Secondary consumer" },
          { id: "kingfisher", name: "Kingfisher", emoji: "🐦", role: "Top predator" }
        ], fact: "Small fish that eat mosquito larvae are a natural, chemical-free way to control mosquitoes." }
      ]
    }
  },
  {
    id: "save-the-habitat",
    topicId: "biodiversity",
    title: "Save the Habitat",
    icon: "🦋",
    mechanic: "Decision Cards",
    description: "You're the campus nature warden. Approve actions that protect wildlife and reject those that harm it.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-lime-400 to-green-700",
    howTo: [
      "Read each proposal card for the campus nature reserve.",
      "Press 'Protect ✓' (or →) if it helps biodiversity, 'Reject ✕' (or ←) if it harms it.",
      "Watch the ecosystem health meter — wildlife returns as it rises!"
    ],
    takeaway: "Biodiversity thrives when we restore native plants, protect wetlands and corridors, and cut pollution. Invasive species, pesticides, artificial light and habitat destruction are among the biggest threats — and many of them start with well-meaning but uninformed choices.",
    content: {
      cards: [
        { id: "native", text: "Plant native trees like neem, peepal and jamun around the campus.", emoji: "🌳", good: true, why: "Native trees support many more local insects, birds and fungi than exotic ornamentals." },
        { id: "lantana", text: "Plant a hedge of lantana because it grows fast and flowers a lot.", emoji: "🌺", good: false, why: "Lantana is an invasive shrub that smothers native plants in Indian forests." },
        { id: "wildflowers", text: "Leave an unmown strip of wildflowers for bees and butterflies.", emoji: "🐝", good: true, why: "Pollinators support over 75% of leading global food crop types." },
        { id: "pesticide", text: "Spray strong pesticide over the entire school garden every week.", emoji: "☠️", good: false, why: "Broad pesticides kill pollinators and the predators that naturally control pests." },
        { id: "litter", text: "Organise a litter pick-up along the lake shore.", emoji: "🧤", good: true, why: "Litter entangles animals and plastic fragments end up in their food." },
        { id: "wetland", text: "Fill in the seasonal wetland to build a new parking lot.", emoji: "🅿️", good: false, why: "Wetlands store floodwater, recharge groundwater and host frogs, birds and insects." },
        { id: "lights", text: "Install bright floodlights near the nesting trees, left on all night.", emoji: "🔦", good: false, why: "Artificial light at night disorients birds, bats and insects." },
        { id: "corridor", text: "Build a wildlife underpass where the highway cuts through the forest.", emoji: "🛣️", good: true, why: "Corridors reconnect fragmented habitats so populations can move and breed." },
        { id: "goldfish", text: "Release unwanted pet goldfish into the campus lake.", emoji: "🐡", good: false, why: "Released pets can become invasive, eating native species' eggs and spreading disease." },
        { id: "waterbowl", text: "Place shallow water bowls for birds during the summer heat.", emoji: "🥣", good: true, why: "Water sources help birds and insects survive heatwaves in dry cities." }
      ],
      fact: "Urban Miyawaki micro-forests can grow up to 10× faster and host far more species than conventional plantations."
    }
  },

  // ───────────────────────── F. POLLUTION ─────────────────────────
  {
    id: "pollution-detective",
    topicId: "pollution",
    title: "Pollution Detective",
    icon: "🔍",
    mechanic: "Clue Hunt",
    description: "Read each case clue and track down the hidden source of air, water, soil or noise pollution in town.",
    duration: "~90 sec",
    xp: 50,
    gradient: "from-slate-400 to-slate-700",
    howTo: [
      "Read the clue in your case file.",
      "Click or tap the suspect in the town scene that is causing it.",
      "Wrong accusations cost points — innocent things are hiding in the scene too!",
      "Solve all 8 cases before the 90-second timer ends."
    ],
    takeaway: "Pollution has a source — and once you can trace it, you can stop it. Air (smoke, burning), water (sewage, chemicals, plastic), soil (pesticides, e-waste) and noise (loudspeakers, construction) pollution each need targeted action at the source.",
    content: {
      timeLimit: 90,
      suspects: [
        { id: "chimney", emoji: "🏭", label: "Factory chimney", x: 14, y: 22, type: "Air" },
        { id: "fire", emoji: "🔥", label: "Garbage heap", x: 40, y: 30, type: "Air" },
        { id: "pipe", emoji: "🚿", label: "Outlet pipe", x: 22, y: 66, type: "Water" },
        { id: "plastic", emoji: "🛍️", label: "Riverbank", x: 58, y: 74, type: "Water" },
        { id: "spray", emoji: "🚜", label: "Farm tractor", x: 84, y: 30, type: "Soil" },
        { id: "dump", emoji: "🔋", label: "Empty lot", x: 66, y: 44, type: "Soil" },
        { id: "speaker", emoji: "📢", label: "Party tent", x: 36, y: 50, type: "Noise" },
        { id: "drill", emoji: "🚧", label: "Construction site", x: 88, y: 62, type: "Noise" },
        { id: "cyclist", emoji: "🚲", label: "Cyclist", x: 52, y: 54, type: null },
        { id: "trees", emoji: "🌳", label: "Tree grove", x: 70, y: 18, type: null },
        { id: "solar", emoji: "☀️", label: "Solar rooftop", x: 11, y: 42, type: null },
        { id: "compost", emoji: "🪴", label: "Compost pit", x: 78, y: 82, type: null }
      ],
      cases: [
        { culprit: "chimney", clue: "Black smoke is drifting over the school playground every afternoon.", why: "Industrial chimneys without filters release PM2.5, SO₂ and NO₂ — classic air pollution." },
        { culprit: "pipe", clue: "The river turns foamy and smells of chemicals just below the bridge.", why: "Untreated industrial effluent pours chemicals straight into the river — water pollution." },
        { culprit: "speaker", clue: "Residents can't sleep: booming music keeps going after midnight.", why: "Loudspeakers beyond permitted hours and decibel limits are noise pollution, harming sleep and health." },
        { culprit: "spray", clue: "Earthworms are vanishing from the fields and the soil smells of chemicals.", why: "Overuse of pesticides and fertilisers poisons soil organisms — soil pollution." },
        { culprit: "fire", clue: "Thick, toxic smoke smells like burning plastic.", why: "Open burning of garbage releases dioxins and soot — dangerous air pollution." },
        { culprit: "plastic", clue: "Fish are getting tangled and the water is choked with floating bags.", why: "Plastic litter washes into rivers and breaks into microplastics — water pollution." },
        { culprit: "dump", clue: "Rusty, leaking batteries were found where children play.", why: "Dumped e-waste leaks lead and cadmium into the ground — soil pollution." },
        { culprit: "drill", clue: "Neighbours complain of non-stop drilling and hammering all day.", why: "Unregulated construction noise causes stress and hearing damage — noise pollution." }
      ],
      fact: "Over 99% of the world's population breathes air that exceeds WHO air-quality guideline limits."
    }
  },
  {
    id: "clean-air-challenge",
    topicId: "pollution",
    title: "Clean Air Challenge",
    icon: "🌬️",
    mechanic: "AQI Simulator",
    description: "Make six city decisions and bring the Air Quality Index down from 'Poor' to 'Satisfactory'.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-sky-300 to-slate-600",
    howTo: [
      "The city's AQI starts at 260 (Poor). Your goal: 100 or below (Satisfactory).",
      "For each situation, pick one of three options (or press 1, 2 or 3).",
      "Watch the AQI meter and the sky change after every decision."
    ],
    takeaway: "Air pollution comes mainly from burning — fuels in vehicles and generators, garbage, crop stubble and firecrackers — plus dust. Clean transport, clean energy, composting and dust control each make a measurable difference to the AQI we breathe.",
    content: {
      startAqi: 260,
      targetAqi: 100,
      decisions: [
        { situation: "How will you commute to college this week?", emoji: "🚦", options: [
          { label: "Drive alone in a petrol car", effect: 10, tier: 0 },
          { label: "Take the bus with friends", effect: -20, tier: 1 },
          { label: "Cycle or walk", effect: -30, tier: 2 }
        ], why: "Vehicle exhaust is a major source of PM2.5 and NO₂ in Indian cities. Walking and cycling emit nothing." },
        { situation: "The festival is coming. How will you celebrate?", emoji: "🎆", options: [
          { label: "Burst firecrackers all night", effect: 30, tier: 0 },
          { label: "Use a few 'green crackers'", effect: -10, tier: 1 },
          { label: "Light diyas and enjoy a community light show", effect: -25, tier: 2 }
        ], why: "Firecrackers cause sharp spikes in PM2.5 and toxic metal particles." },
        { situation: "The campus has piles of dry leaves. What now?", emoji: "🍂", options: [
          { label: "Burn them in the corner", effect: 30, tier: 0 },
          { label: "Bag them and send them to landfill", effect: -10, tier: 1 },
          { label: "Compost them into mulch", effect: -30, tier: 2 }
        ], why: "Leaf burning releases smoke and fine particles; composting turns leaves into a resource." },
        { situation: "Power cuts are frequent. How will you keep the lights on?", emoji: "🔌", options: [
          { label: "Run a diesel generator", effect: 20, tier: 0 },
          { label: "Switch off unused appliances to reduce load", effect: -15, tier: 1 },
          { label: "Install rooftop solar with battery backup", effect: -30, tier: 2 }
        ], why: "Diesel generators emit soot and NOx right at street level." },
        { situation: "A building is being constructed next door.", emoji: "🏗️", options: [
          { label: "Leave sand and debris uncovered", effect: 20, tier: 0 },
          { label: "Sweep the road once a week", effect: -10, tier: 1 },
          { label: "Cover materials, use green nets and water spraying", effect: -25, tier: 2 }
        ], why: "Construction dust is a big contributor to PM10 — simple dust controls cut it sharply." },
        { situation: "After harvest, nearby farms have leftover crop stubble.", emoji: "🌾", options: [
          { label: "Burn the stubble to clear fields fast", effect: 40, tier: 0 },
          { label: "Leave it to rot in the fields", effect: -10, tier: 1 },
          { label: "Sell it to a biomass plant or use it as mulch", effect: -35, tier: 2 }
        ], why: "Stubble burning is a major cause of winter smog in North India; balers and happy seeders offer alternatives." }
      ],
      fact: "PM2.5 particles are so small they can travel deep into the lungs and even enter the bloodstream."
    }
  },
  {
    id: "pollution-sorting",
    topicId: "pollution",
    title: "Pollution Sorting Game",
    icon: "🗂️",
    mechanic: "Classify & Solve",
    description: "Classify each scenario as air, water, soil or noise pollution — then pick the best way to prevent it.",
    duration: "~1–2 min",
    xp: 50,
    gradient: "from-zinc-400 to-emerald-700",
    howTo: [
      "Step 1: Drag the scenario card into the right pollution column (or tap a column, or press 1–4).",
      "Step 2: Choose the best prevention measure from three options.",
      "5 points for the right type + 5 points for the right solution."
    ],
    takeaway: "Identifying the type of pollution points to the right solution: air pollution needs cleaner combustion and less burning, water pollution needs treatment before discharge, soil pollution needs segregation and safer farming, and noise pollution needs limits and zoning.",
    content: {
      types: [
        { id: "Air", label: "Air", emoji: "💨", key: "1" },
        { id: "Water", label: "Water", emoji: "💧", key: "2" },
        { id: "Soil", label: "Soil", emoji: "🟤", key: "3" },
        { id: "Noise", label: "Noise", emoji: "🔊", key: "4" }
      ],
      scenarios: [
        { id: "idle", text: "Dozens of vehicles idling at a long red light", emoji: "🚦", type: "Air", options: ["Switch off engines at long red lights", "Wash cars more often", "Paint the traffic lights green"], answer: 0, why: "Idling burns fuel for nothing — switching off cuts exhaust at busy junctions." },
        { id: "sewage", text: "Untreated sewage flowing into a lake", emoji: "🚽", type: "Water", options: ["Add more fish to the lake", "Build and use sewage treatment plants", "Cover the lake with a sheet"], answer: 1, why: "Treating sewage removes germs and nutrients that cause algae blooms and dead zones." },
        { id: "mulch", text: "Plastic mulch sheets left in farmland after harvest", emoji: "🚜", type: "Soil", options: ["Burn the plastic in the field", "Plough it deeper into the soil", "Collect it for recycling and use biodegradable mulch"], answer: 2, why: "Plastic fragments stay in soil for decades; collecting them and switching to biodegradable mulch prevents build-up." },
        { id: "dj", text: "Loud DJ music near a hospital at night", emoji: "🏥", type: "Noise", options: ["Enforce silence-zone rules and decibel limits", "Give patients earplugs only", "Move the hospital"], answer: 0, why: "Hospitals, schools and courts are legally protected silence zones in India." },
        { id: "generator", text: "A shop runs a diesel generator all day", emoji: "⛽", type: "Air", options: ["Paint the generator", "Switch to solar or grid power with battery backup", "Run it only indoors"], answer: 1, why: "Clean power removes street-level soot and NOx — and running generators indoors is dangerous." },
        { id: "oil", text: "Used engine oil poured into a storm drain", emoji: "🛢️", type: "Water", options: ["Dilute it with more water", "Pour it on soil instead", "Collect used oil in sealed containers for re-refining"], answer: 2, why: "A single litre of oil can contaminate a huge volume of water; used oil can be re-refined." },
        { id: "landfill", text: "A leaking landfill full of mixed household and e-waste", emoji: "🗑️", type: "Soil", options: ["Segregate waste and send e-waste to certified recyclers", "Add more soil on top", "Burn the landfill"], answer: 0, why: "Segregation keeps toxic e-waste out of landfills, so heavy metals don't leach into soil and groundwater." },
        { id: "horns", text: "Pressure horns honked constantly in traffic", emoji: "📯", type: "Noise", options: ["Make horns louder", "No-honking zones, fines and using horns only when needed", "Close all roads"], answer: 1, why: "Traffic noise above 70–80 dB raises stress and hearing loss risk; enforcement and habits reduce it." }
      ],
      fact: "Chemical runoff from farms causes eutrophication — oxygen-starved 'dead zones' in rivers and lakes."
    }
  },

  // ─────────────────── G. RECYCLING & SUSTAINABLE LIVING ───────────────────
  {
    id: "zero-waste-day",
    topicId: "recycling-sustainability",
    title: "Zero-Waste Day",
    icon: "🎒",
    mechanic: "Inventory Puzzle",
    description: "Plan a full day without single-use plastic by swapping each disposable for the right reusable from your bag.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-teal-400 to-cyan-700",
    howTo: [
      "Your day has six moments, each tempting you with a disposable item.",
      "Drag the right reusable from your backpack onto each moment — or tap the item, then tap the moment.",
      "Watch out: two items in your bag are disposables that don't belong!"
    ],
    takeaway: "A few reusables — a bottle, tote bag, lunch box, handkerchief and a habit of refusing extras — remove hundreds of single-use items from one person's waste every year. Refuse and reuse beat recycling every time.",
    content: {
      moments: [
        { id: "brush", time: "7:00 AM", label: "Brushing teeth", disposable: "Plastic toothbrush", emoji: "🪥", answer: "bamboo", why: "Bamboo toothbrush handles are biodegradable; billions of plastic toothbrushes are thrown away each year." },
        { id: "water", time: "9:00 AM", label: "Thirsty on the bus", disposable: "Bottled water", emoji: "🧴", answer: "steelbottle", why: "Carrying a reusable bottle avoids roughly 167 single-use plastic bottles a year." },
        { id: "market", time: "11:00 AM", label: "Buying vegetables", disposable: "Plastic carry bag", emoji: "🛍️", answer: "tote", why: "A cloth tote can be used hundreds of times." },
        { id: "lunch", time: "1:00 PM", label: "Takeaway lunch", disposable: "Styrofoam box", emoji: "🥡", answer: "tiffin", why: "Steel tiffins last for years — styrofoam can't be easily recycled and lasts for centuries." },
        { id: "juice", time: "4:00 PM", label: "Juice break", disposable: "Plastic straw", emoji: "🥤", answer: "nostraw", why: "Refusing is the first and best R — most drinks don't need a straw at all." },
        { id: "sneeze", time: "6:00 PM", label: "Runny nose", disposable: "Paper tissues", emoji: "🤧", answer: "hanky", why: "A washable cotton handkerchief replaces hundreds of tissues." }
      ],
      bag: [
        { id: "bamboo", label: "Bamboo toothbrush", emoji: "🎋" },
        { id: "steelbottle", label: "Steel water bottle", emoji: "🍶" },
        { id: "tote", label: "Cloth tote bag", emoji: "👜" },
        { id: "tiffin", label: "Steel lunch box", emoji: "🍱" },
        { id: "nostraw", label: "Say 'No straw, please!'", emoji: "🙅" },
        { id: "hanky", label: "Cotton handkerchief", emoji: "🧣" },
        { id: "napkins", label: "Paper napkin pack", emoji: "🧻", decoy: true },
        { id: "cutlery", label: "Plastic cutlery set", emoji: "🍴", decoy: true }
      ],
      fact: "The 5 R's in order: Refuse, Reduce, Reuse, Repurpose, Recycle."
    }
  },
  {
    id: "eco-shopping-spree",
    topicId: "recycling-sustainability",
    title: "Eco Shopping Spree",
    icon: "🛒",
    mechanic: "Budget Strategy",
    description: "Fill a 5-item shopping list within 75 coins while earning the highest eco-rating.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-emerald-400 to-teal-700",
    howTo: [
      "Pick one product for each item on your list.",
      "Stay within the 75-coin budget — the cart total updates live.",
      "Press 'Checkout' to reveal each product's eco-rating. Can you find the greenest cart?"
    ],
    takeaway: "Sustainable choices are often the cheaper ones: second-hand, refills and bulk buying save money and packaging. Look for recycled content, reusables and less packaging rather than vague 'eco' claims.",
    content: {
      budget: 75,
      needs: [
        { id: "bottle", label: "Water bottle", emoji: "💧", options: [
          { label: "24-pack of plastic water bottles", emoji: "🧴", price: 30, eco: 0, why: "24 single-use bottles become waste within a month." },
          { label: "Reusable steel bottle", emoji: "🍶", price: 25, eco: 20, why: "One steel bottle can replace hundreds of plastic ones." },
          { label: "Glass bottle of premium spring water", emoji: "🍾", price: 35, eco: 5, why: "Still single-use — and heavy glass adds transport emissions." }
        ] },
        { id: "tee", label: "T-shirt", emoji: "👕", options: [
          { label: "New fast-fashion T-shirt", emoji: "🏷️", price: 15, eco: 0, why: "Cheap, short-lived and with a high production footprint." },
          { label: "New organic-cotton T-shirt", emoji: "🌿", price: 35, eco: 10, why: "Better farming, but a new garment still has a manufacturing footprint." },
          { label: "Thrift-store second-hand T-shirt", emoji: "♻️", price: 10, eco: 20, why: "Reusing existing clothing avoids almost all of its footprint — and it's cheapest!" }
        ] },
        { id: "notebook", label: "Notebook", emoji: "📓", options: [
          { label: "Glossy plastic-laminated notebook", emoji: "📔", price: 12, eco: 0, why: "Laminated covers make the notebook hard to recycle." },
          { label: "100% recycled-paper notebook", emoji: "📗", price: 12, eco: 20, why: "Recycled paper saves trees, water and energy — at the same price." },
          { label: "Notebook labelled 'eco-friendly' with no proof", emoji: "📘", price: 18, eco: 5, why: "Vague claims without certification can be greenwashing." }
        ] },
        { id: "snacks", label: "Snacks", emoji: "🥜", options: [
          { label: "Individually wrapped snack packs", emoji: "🍬", price: 20, eco: 0, why: "Multi-layer wrappers are almost never recycled." },
          { label: "Bulk nuts in your own container", emoji: "🫙", price: 15, eco: 20, why: "Bulk buying with your own container means zero packaging waste." },
          { label: "Snacks in a recyclable cardboard box", emoji: "📦", price: 18, eco: 10, why: "Better packaging, but still packaging." }
        ] },
        { id: "cleaner", label: "Cleaning spray", emoji: "🧽", options: [
          { label: "New aerosol chemical spray", emoji: "🧯", price: 20, eco: 0, why: "Aerosols add VOCs to indoor air and the cans are hard to recycle." },
          { label: "Concentrated refill pouch for your old bottle", emoji: "🔁", price: 12, eco: 20, why: "Refills reuse your bottle and ship far less water and plastic." },
          { label: "New spray bottle labelled 'green'", emoji: "🧴", price: 16, eco: 10, why: "Gentler formula, but another new plastic bottle." }
        ] }
      ],
      fact: "Green procurement — recycled paper, reusables and refills — is one of the easiest ways for schools to cut waste."
    }
  },
  {
    id: "decomposition-timeline",
    topicId: "recycling-sustainability",
    title: "Decomposition Timeline",
    icon: "⏳",
    mechanic: "Timeline Placement",
    description: "How long does litter last? Place nine items on the timeline from weeks to practically forever.",
    duration: "~1 min",
    xp: 50,
    gradient: "from-cyan-400 to-teal-700",
    howTo: [
      "Drag each item onto the time zone where it would roughly break down in nature — or tap the item, then tap the zone.",
      "First-try placements earn 10 points; later tries earn 5.",
      "Estimates are for litter in the open environment; landfills slow decay even further."
    ],
    takeaway: "Natural materials break down in weeks or months, but metals, plastics and glass last for generations. Every plastic bottle ever thrown away still exists in some form — which is why reducing and reusing matter so much more than disposing.",
    content: {
      zones: [
        { id: "weeks", label: "Weeks", emoji: "🗓️" },
        { id: "months", label: "Months", emoji: "📆" },
        { id: "years", label: "Years", emoji: "⏱️" },
        { id: "centuries", label: "Centuries", emoji: "🏛️" },
        { id: "forever", label: "Practically forever", emoji: "♾️" }
      ],
      items: [
        { id: "towel", name: "Paper towel", emoji: "🧻", zone: "weeks", estimate: "2–4 weeks", why: "Paper is plant fibre — microbes break it down quickly." },
        { id: "newspaper", name: "Newspaper", emoji: "📰", zone: "weeks", estimate: "~6 weeks", why: "Thin paper decomposes fast when exposed to moisture and air." },
        { id: "apple", name: "Apple core", emoji: "🍎", zone: "months", estimate: "~2 months", why: "Food waste breaks down quickly — even faster in a compost pit." },
        { id: "cotton", name: "Cotton glove", emoji: "🧤", zone: "months", estimate: "1–5 months", why: "Natural cotton fibre is biodegradable." },
        { id: "wool", name: "Wool socks", emoji: "🧦", zone: "years", estimate: "1–5 years", why: "Wool is natural, but its protein fibres take longer to break down." },
        { id: "butt", name: "Cigarette butt", emoji: "🚬", zone: "years", estimate: "1–5+ years", why: "Filters are made of plastic (cellulose acetate) and leach toxins." },
        { id: "can", name: "Aluminium can", emoji: "🥫", zone: "centuries", estimate: "80–200 years", why: "Metal corrodes very slowly — but it can be recycled forever." },
        { id: "bottle", name: "Plastic bottle", emoji: "🧴", zone: "centuries", estimate: "~450 years", why: "Plastic never truly disappears; it breaks into microplastics." },
        { id: "glass", name: "Glass bottle", emoji: "🍾", zone: "forever", estimate: "Undetermined (possibly a million years)", why: "Glass is extremely durable — perfect for reuse and endless recycling." }
      ],
      source: "Timescales are approximate estimates commonly cited by NOAA's Marine Debris Program.",
      fact: "Microplastics have been found in deep ocean trenches, Arctic ice, drinking water and human tissue."
    }
  }
];

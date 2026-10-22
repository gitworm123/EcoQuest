# 🌿 EcoQuest – Gamified Environmental Education Platform for Schools and Colleges

> **A Community Engagement Project (CEP) & Academic Capstone Web Platform**  
> *Transforming theoretical environmental science into practical, measurable, and engaging planetary action.*

---

## 📌 Project Overview & Purpose

Traditional environmental education in schools and colleges is predominantly theoretical and textbook-based. Students frequently memorize environmental cycles, biodiversity treaties, and pollution formulas for examinations, yet fail to apply sustainable habits—such as source waste segregation, rainwater harvesting, or eliminating single-use plastics—in daily life.

**EcoQuest** bridges this critical classroom-to-action gap. It combines **gamification psychology**, **AI-driven diagnostic personalization**, and **faculty-verified real-world field missions** to make environmental literacy practical, measurable, and fun.

---

## 🎯 Target Users

1. **Students (School & College Level):** Learn through bite-sized modules, test knowledge with timed quizzes, complete physical ecological challenges, upload photo proof, collect prestigious badges, and climb campus leaderboards.
2. **Teachers & Faculty Coordinators:** Monitor cohort performance, identify collective weak topics using AI analytics, and verify student photo submissions in an intuitive administrative queue.
3. **School & College Administrators:** Track collective campus sustainability indicators (trees planted, water saved, plastic diverted) to satisfy institutional accreditation criteria (NAAC, NIRF, Green Campus ratings).

---

## 🌍 7 Core Environmental Topics Covered

| Topic | Focus Area | UN SDG Alignment |
|---|---|---|
| **1. Waste Management** | 3Rs, source segregation (wet/dry/e-waste), home composting, EPR | SDG 12: Responsible Consumption |
| **2. Water Conservation** | Rainwater harvesting, greywater reuse, drip irrigation, leak audits | SDG 6: Clean Water & Sanitation |
| **3. Climate Change** | Greenhouse effect, IPCC 1.5°C targets, carbon footprint mitigation | SDG 13: Climate Action |
| **4. Renewable Energy** | Solar photovoltaic systems, vampire load elimination, microgrids | SDG 7: Affordable & Clean Energy |
| **5. Biodiversity** | Native vs exotic flora, pollinator refuges, Miyawaki micro-forests | SDG 15: Life on Land |
| **6. Pollution Control** | AQI analysis, PM2.5 respiratory hazards, microplastics, eutrophication | SDG 3 & 14: Health & Oceans |
| **7. Sustainable Living** | Upcycling, zero-waste lifestyles, circular economy, eco-purchasing | SDG 12: Circular Economy |

---

## 🚀 Key Functional Features

### 1. Interactive Eco Quizzes & Games
- Multi-tier difficulty: **Beginner**, **Intermediate**, and **Advanced**.
- Real-time countdown timer (25s per question) and streak multiplier.
- **Instant feedback:** Immediately highlights correct and incorrect options.
- Detailed scientific explanation for why answers are correct or incorrect, accompanied by bonus eco-facts.
- Synthesized audio chimes via Web Audio API.

### 2. Real-World Eco Missions
- Practical challenges including:
  - *Plant a Native Tree / Sapling*
  - *Household Waste Segregation (3-Day Streak)*
  - *Water Saver 24-Hour Challenge*
  - *Avoid Single-Use Plastic for a Week*
  - *Campus Cleanliness & Sorting Drive*
  - *Creative Upcycling Project*
  - *Save Electricity: Campus Energy Audit*
- Step-by-step instructions and required verification criteria.
- Photo proof upload with live preview and **instant sample photo selection** for rapid CEP demo presentation.

### 3. AI Personalized Learning Engine
- Analyzes individual student quiz history across all 7 environmental disciplines.
- Detects foundational gaps (e.g., student scoring 42% on Water Conservation).
- Dynamically generates a **“Recommended For You”** action package:
  - Recommended theoretical lesson guide.
  - Recommended remedial practice quiz.
  - Recommended hands-on field mission to bridge concept into habit.

### 4. Comprehensive Gamification System
- **XP / Points Engine:** Earn base XP on quizzes, accuracy bonuses, and high-value mission rewards.
- **Level Progression:** Ascend from *Level 1: Eco Seedling* to *Level 6: Climate Hero*.
- **10 Unlockable Badges:** 🌱 Eco Starter, ♻️ Recycling Hero, 💧 Water Saver, 🌳 Tree Guardian, ⚡ Energy Saver, 🌍 Planet Protector, 🔬 Climate Scholar, 🤝 Community Champion, 🔥 Eco Streak Master, 🎮 Eco Arcade Champion.
- **Visual Celebrations:** Canvas confetti bursts upon leveling up or earning teacher approvals.
- **Eco Rewards Store:** Redeem XP for official certificates of environmental merit.

### 5. Eco Arcade: 21 Interactive Mini-Games
Every environmental topic has **three distinct, playable mini-games** (30 seconds to 2 minutes each). Open them from the **Games** tab, the **Play 3 Mini-Games** button on each Learn card, or the lesson modal.

| Topic | Game 1 | Game 2 | Game 3 |
|---|---|---|---|
| Waste Management | Waste Segregation Challenge (drag & drop bins) | Recycling Jigsaw Puzzle (3×3 tile swap) | Reuse or Recycle? (matching board) |
| Water Conservation | Save the Water (spot the waste, timed) | Water Cycle Jigsaw (diagram puzzle) | Clean the River (cleanup actions, hazardous handling) |
| Climate Change | Carbon Footprint Challenge (lower or higher?) | Climate Match-Up (memory cards) | Build a Climate-Smart City (budget city builder) |
| Renewable Energy | Energy Source Matcher (connect pairs) | Build the Solar System (circuit builder) | Power the City (24-hour grid balancing with storage) |
| Biodiversity | Habitat Matching (drag to habitat) | Food Chain Puzzle (sequence + 10% energy rule) | Save the Habitat (protect/reject decision cards) |
| Pollution | Pollution Detective (clue hunt, timed) | Clean Air Challenge (AQI simulator) | Pollution Sorting Game (classify + prevent) |
| Recycling & Sustainable Living | Zero-Waste Day (inventory puzzle) | Eco Shopping Spree (budget strategy) | Decomposition Timeline (timeline placement) |

Each game has instructions, a Start button, score and progress indicators, immediate feedback with an eco-fact, a completion screen with a learning takeaway, Replay, and Back to Games / Back to Topic Lesson. Controls work with mouse (drag & drop), touch (tap an item, then tap a target) and keyboard (Tab/Enter plus number or arrow-key shortcuts).

**Scoring & XP (student roles only):**
- XP scales with the score percentage (up to +50 per game), plus a **+10 one-time first-completion bonus**.
- Replays only award the *difference* when you beat your best score, so XP can't be farmed.
- Completing all 3 games in a topic unlocks the **🎮 Eco Arcade Champion** badge. XP feeds the existing level system, navbar XP pill and Recent Activity, and the Student Dashboard shows an **Eco Arcade Progress** panel.
- The teacher role plays in practice mode (no XP).

**Persistence limitations:** like the rest of EcoQuest, game progress is stored in the browser's `localStorage` (key `ecoquest_app_state_v1`, per demo persona). It is **not** sent to a server, is not shared between devices or browsers, and is cleared by *Reset Demo Data* or by clearing site data. The Leaderboard page uses static demo data, so game XP does not change leaderboard rankings, and games do not change the quiz-based topic proficiency used by the AI recommendations.

Game code lives in `js/components/games/` (shared shell in `GameKit.js`, one file per topic), the hub in `js/components/GamesPage.js`, and all game content in `js/data/gamesData.js`.

### 6. Multi-Tier Eco Leaderboards
- Dedicated ranking ladders for:
  - **Individual Students**
  - **Classes** (e.g. B.Tech CSE Year 2, Grade 11-Science)
  - **Academic Departments**
  - **Partner Colleges and Schools**
- Top-3 podium layout with custom gold, silver, and bronze accolades.
- Timeframe filters: *All Time*, *This Month*, *This Week*.

### 7. Activity Verification Gateway (Teacher Dashboard)
- Teachers review student submissions with submitted timestamps, student notes, and photo evidence.
- **1-Click Review Controls:** Approve (+XP & Badges granted) or Reject (with constructive faculty feedback).
- Automatic state synchronization with student dashboards and campus metrics.

### 8. Environmental Impact Dashboard
- Aggregates verified collective student outcomes:
  - 🌳 **4,820+** Native Trees Planted
  - ♻️ **14.2+** Tons Waste Recycled
  - 🥤 **32,400+** Single-Use Plastics Avoided
  - 💧 **285,000+** Liters Fresh Water Conserved
  - ⚡ **18.9+** MWh Clean Energy Saved
- Real-world carbon equivalency comparisons (cars taken off the road, homes powered, oxygen generated).
- Interactive Chart.js visual graphs for monthly progress and disciplinary distribution.

---

## 💻 Tech Stack & Architecture

- **Frontend Core:** React 18 (Component-based architecture)
- **Styling:** Tailwind CSS 3.4 + Custom nature-inspired theme (`css/styles.css`)
- **Typography:** Google Fonts (*Outfit* headings & *Plus Jakarta Sans* body)
- **Data Visualization:** Chart.js (Interactive line graphs and doughnut charts)
- **Celebration Effects:** Canvas-Confetti
- **Audio Synthesizer:** Native Web Audio API (zero external audio files required)
- **State & Storage:** Persistent `localStorage` engine with state management
- **Local Server:** Python 3.14 standard library (`http.server` & threaded `socketserver`, so the ~35 scripts load in parallel without dropped connections)

---

## 🏃 Quick Start & Demonstration Instructions

### Option 1: 1-Click Launch (Windows)
Double-click the included batch launcher:
```bat
run_server.bat
```
*This starts the local web server at `http://localhost:5000` and automatically opens your browser.*

### Option 2: Running via Python Terminal
```bash
python server.py
```
Open your browser at:
```
http://localhost:5000
```

### Option 3: Direct Browser Open
Double-click `index.html` directly in any modern browser (Chrome, Edge, Firefox).

---

## 🎬 Recommended 3-Minute Presentation Walkthrough

Follow this step-by-step sequence to showcase the entire platform during your CEP evaluation:

1. **Landing Page:** Show the hero banner (*"Learn. Play. Act. Save the Planet."*), impact statistics, and problem-solution architecture.
2. **Curriculum (Learn Page):** Click on any topic (e.g., *Water Conservation*), open the **Lesson Reader Modal**, and highlight the key takeaways and impact stats.
3. **Interactive Quiz (Quizzes Page):** Click *"Take Quiz"*, answer questions with the live timer running, observe the instant feedback and scientific explanation, and view the final score with XP gain and confetti.
4. **Student Dashboard:** Navigate to the Dashboard. Highlight the **AI Diagnostic Engine** recommending a personalized action plan based on quiz errors.
5. **Eco Mission Submission:** Navigate to **Eco Missions**, select *"Water Saver 24-Hour Challenge"*, click *"Submit Proof"*, select *"Use Verified Sample Photo"*, and submit to the faculty review queue.
6. **Teacher Verification (Live Role Switch):**
   - Click the top navbar **Role Switcher** and switch to **Prof. Ananya Sen (Teacher)**.
   - Navigate to the **Teacher Portal**.
   - Show the **Pending Verification Queue**, expand the photo proof, type feedback, and click **Approve**.
7. **Verify Student Impact:**
   - Switch back to **Aarav Sharma (Student)**.
   - Observe the celebratory notification, XP increase, badge unlock, and updated environmental impact!
8. **Leaderboard & Badges:** Showcase the Top 3 Podium and click *"View Official Certificate"* on the Badges page.
9. **Eco Mini-Games:** Open **Games**, pick a topic, play a game (e.g. *Power the City*), and show the completion screen with score, XP and learning takeaway, then the updated XP pill and Dashboard arcade progress.

---

## 📜 Academic Attribution
Developed as an academic **Community Engagement Project (CEP) / Capstone Prototype** to demonstrate modern EdTech and gamification methodologies in environmental sciences.

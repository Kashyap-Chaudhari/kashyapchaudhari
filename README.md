# 📜 Kashyap Chaudhari — Tactile Origami Portfolio

> An interactive, physical-paper portfolio experience built with **React 19**, **Three.js**, **Tailwind CSS**, and **Framer Motion**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://artbythread.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)

---

## 🌟 Overview

This portfolio steps away from conventional digital templates and reimagines the web as a **physical desk and tactile paper artifact**. Visitors are greeted by a 3D crumpled origami paper ball that can be unfolded into a deckled-edge paper sheet with realistic textures, washi tape pins, audio cues, and multi-theme paper textures.

---

## ✨ Key Features

### 1. 📜 3D Paper Ball & Unfolding Transition
- **Interactive Three.js Paper Ball**: Real-time 3D crumpled paper ball with dynamic procedural textures, bump mapping, lighting, and hover physics.
- **Physical Unfolding Sequence**: Smooth expanding animation mimicking the physical unfolding of an origami parchment canvas with authentic crease overlays.
- **Keyboard Shortcuts**: Press `Space` / `Enter` to unfold and `Esc` / `F` to fold back into a ball anytime.

### 2. 🎨 Multi-Texture Adaptive Paper Themes
Switch between 4 authentic paper materials from the navigation bar:
- 📜 **Cream Bond**: Warm ivory bond paper with rich espresso ink and amber accents.
- 📦 **Vintage Kraft**: Natural recycled cardboard tone with earthy brown washi tape.
- 📐 **Cyan Blueprint**: Architectural sapphire drafting canvas with cyan lines and glowing accents.
- 🌑 **Dark Charcoal**: Midnight graphite sketchpad with high-contrast ivory text and golden stamps.

### 3. 📱 Mobile-First Interactive Card Deck
- **Touch-Swipe Gestures**: Swipe left/right across project index cards with smooth spring physics on mobile viewports.
- **Thumb Controls**: Tactile Prev/Next buttons, active indicator badges (`[ CARD 01 / 06 ]`), and tappable dot pagination.
- **Progressive Disclosure**: Tap `[ ☷ View All ]` to expand all cards with fluid layout animations, or `[ ↺ Collapse to Card Deck ]` to return to single-card focus.

### 4. 🔊 Tactile Audio Synthesizer
- Custom **Web Audio API** paper sound engine delivering crisp auditory feedback for clicking, unfolding, and crumpling without heavy external audio files.
- Dedicated sound toggle with instant mute memory.

### 5. 🗂 Selected Featured Projects
- **ArtByThread**: Digital storefront built for a handcrafted small business (Next.js, TypeScript, Supabase, Tailwind).
- **PrepWise**: Comprehensive interview preparation and coding practice platform (React, Node.js, Express, MongoDB, JWT).
- **ResumeIQ**: Smart career toolkit with ATS analysis and Gemini AI scoring (Django, Python, PostgreSQL, Scikit-learn).
- **Fix My Tone**: AI writing companion for tone refinement (JavaScript, Express, Gemini, Groq API).
- **Safar-e-Yaadein**: Immersive 90s nostalgic journey through retro scenes and ambient audio (React, Web Audio API, Animations).
- **Maze Escape**: Procedural maze game with responsive controls and custom skins (HTML5 Canvas, Game Logic).

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Core** | React 19, TypeScript, HTML5, CSS3 |
| **Styling & Design System** | Tailwind CSS, Custom CSS Variables, Clip-Path Polygons |
| **3D Graphics & Physics** | Three.js (0.185.1) |
| **Motion & Gestures** | Framer Motion (13.2.0) |
| **Audio Engine** | Web Audio API / Synthesized Paper Audio |
| **Tooling & Bundler** | Vite 8.2, Oxlint, PostCSS |
| **Icons & Micro-UI** | Lucide React, Canvas Confetti |

---

## 📂 Project Structure

```text
portpholio/
├── public/                  # Static assets and favicons
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx      # Personal narrative & core principles
│   │   ├── ContactSection.tsx    # Interactive letter & social links
│   │   ├── CreativeDesk3D.tsx    # 3D desk ambient environment
│   │   ├── DeskBackground.tsx    # Denim cutting mat & aurora lighting
│   │   ├── Icons.tsx             # Custom SVG brand icons (GitHub, Threads, Instagram)
│   │   ├── Navigation.tsx        # Responsive sticky header & theme switcher
│   │   ├── PaperBall3D.tsx       # Three.js 3D crumpled paper ball
│   │   ├── ProjectsSection.tsx   # Mobile card deck & desktop torn card grid
│   │   └── SkillsSection.tsx     # Pinned skill trait cards & sticky notes
│   ├── utils/
│   │   └── audio.ts              # Web Audio API paper sound synthesis
│   ├── App.tsx                   # App orchestrator, fold/unfold states & keyboard shortcuts
│   ├── index.css                 # Paper theme tokens, textures, deckle edges & washi tapes
│   └── main.tsx                  # Application bootstrap
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.0.0` or higher
- npm or pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kashyap-Chaudhari/kashyapchaudhari.git
   cd kashyapchaudhari
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint and format checks:**
   ```bash
   npm run lint
   ```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

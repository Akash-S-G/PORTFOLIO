# Akash Siddappa Goundi — Engineering Portfolio

A recruitment-focused personal portfolio website for **Akash Siddappa Goundi**, Software Engineering student at **R V College of Engineering (RVCE)**, Bengaluru.

The site showcases backend systems, offline AI inference (llama.cpp/GGUF), distributed edge platforms (PIHUB), computer vision pipelines (Smart Cart), and IoT time-series telemetry (Sol-Bridge) through interactive 3D visualizations, dynamic architecture diagrams, and evidence-backed case studies.

---

## 🚀 Key Highlights & Architectural Features

1. **Bespoke 3D Engineering System Core (Three.js & React Three Fiber):**
   - Features a central illuminated core connected to 5 satellite subsystem nodes via dynamic Bézier energy conduits and traveling data packets.
   - Interactive: Hovering or clicking a node displays live subsystem telemetry and auto-scrolls to the corresponding project case study.
   - Accessible & resilient: Includes a pointer parallax orientation, automatic `prefers-reduced-motion` compliance, WebGL error boundary, and a lightweight SVG technical schematic fallback.

2. **Evidence-Based Engineering Case Studies:**
   - **PIHUB (Flagship):** Offline AI Tutor platform running quantized GGUF models on llama.cpp, decentralized P2P manifest synchronization (405+ packs), Qdrant vector retrieval, and zero-config UDP beacons.
   - **Smart Cart:** Real-time retail checkout linking camera feeds with tuned YOLO11n object recognition, WebSockets live synchronization, and automated PDF billing.
   - **Sol-Bridge:** IoT energy sharing platform ingesting continuous smart-meter telemetry via MQTT into TimescaleDB hypertables with Redis Pub/Sub.
   - **FundShield:** Dockerized ML microservice providing perceptual image hashing (duplicate detection), EXIF tampering audits, and Scikit-learn Isolation Forest transaction anomaly risk scoring.

3. **Recruiter-Focused UX:**
   - Verified resume download button serving `Akash-Siddappa-Goundi-Resume.pdf` out-of-the-box.
   - One-click copy email button with instant visual confirmation.
   - Role perspective filter ("All Systems", "Backend Focus", "Edge AI & Vision") to highlight relevant skills and projects immediately.
   - Interactive skills matrix cross-referencing technologies with the projects where they were verified in code.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **3D Graphics:** Three.js + `@react-three/fiber` + `@react-three/drei`
- **Styling:** Tailwind CSS (Custom dark technical palette: `#0B0D0C` graphite, `#F4F1E8` ivory, `#C5F36B` electric lime, `#38C7D2` cyan)
- **Icons:** Lucide React
- **Animations:** Framer Motion + CSS hardware-accelerated transitions
- **PDF Engine:** Python ReportLab (for publication-grade vector resume generation)

---

## 📋 Prerequisites

- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher
- **Python 3:** (optional, only needed if you wish to re-generate the resume PDF programmatically using `scripts/generate_resume.py`)

---

## 💻 Local Development

1. **Clone or navigate to the project directory:**
   ```bash
   cd /home/akash/Desktop/PORTFOLIO
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Run TypeScript check and Production Build:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```
   Open `http://localhost:4173` to test the minified bundle and asset downloads.

---

## 🚢 Deployment Instructions

### Option 1: GitHub Pages (Recommended)
This repository includes a preconfigured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push this project to your GitHub repository (e.g. `https://github.com/Akash-S-G/portfolio`).
2. Navigate to your repository on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow will automatically build the project and publish it to `https://akash-s-g.github.io/portfolio/`.

### Option 2: Vercel
1. Import the repository in [Vercel](https://vercel.com).
2. Framework preset: **Vite**.
3. Root directory: `./`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click **Deploy**.

---

## ✏️ Maintenance & How to Customize

### 1. Where to Edit Content
All personal data, projects, skills, education, and achievements are centralized in a single typed configuration file:
- **`src/data/portfolioData.ts`**
  - Update `PERSONAL_INFO` to modify contact details, headline, or location.
  - Update `PROJECTS` to add new case studies, architecture nodes, or outcomes.
  - Update `EXPERIENCE` to add subsequent internship or full-time roles.
  - Update `SKILL_CATEGORIES` to add or refine technologies.

### 2. How to Replace the Resume PDF
- **Direct file replacement:** Simply place your new resume PDF at `public/Akash-Siddappa-Goundi-Resume.pdf`.
- **Programmatic generation:** You can also edit `scripts/generate_resume.py` and run:
  ```bash
  python3 scripts/generate_resume.py
  ```
  This recompiles a clean, printable vector PDF matching your exact latest profile.

### 3. How to Update Social Links
Edit `src/data/portfolioData.ts` under `PERSONAL_INFO`:
```ts
export const PERSONAL_INFO = {
  github: 'https://github.com/Akash-S-G',
  linkedin: 'https://linkedin.com/in/akash-goundi-27320b303',
  email: 'akashgoundi100@gmail.com',
  phone: '+91 9900832414',
  ...
};
```

### 4. How the 3D Fallback Works
- When a user device lacks WebGL support, encounters GPU memory constraints, or experiences a WebGL context crash, the `WebGLErrorBoundary` automatically renders [`SceneFallback.tsx`](src/components/scene3d/SceneFallback.tsx).
- Users can also click the **"2D Schematic"** button at the top-right of the hero canvas to manually toggle to the lightweight SVG schematic at any time.
- If the browser has `prefers-reduced-motion: reduce` enabled, all 3D orbital rotations and particle travel speeds are automatically frozen to prevent motion sickness.

---

## 🔒 Accuracy & Codebase Audit Guarantee

This portfolio follows strict factual accuracy rules:
- **Zero fabricated statistics:** All numbers (e.g. 405+ packs in PIHUB, 300+ DSA problems, 8.37 CGPA at RVCE) are directly substantiated by audited repositories and the latest resume.
- **Implemented vs. Planned:** Every project clearly distinguishes working source code from future architectural plans.
- **No private secrets:** No API keys, credentials, or private repository URLs are exposed in frontend code.
- Detailed audit notes are available in [`CONTENT_AUDIT.md`](CONTENT_AUDIT.md).


# Content Audit & Source-of-Truth Verification

**Subject:** Akash Siddappa Goundi  
**Date of Audit:** November 9, 2026  
**Auditor:** Antigravity Senior Engineering Assistant  

---

## 1. Verified Sources Inspected

1. **Local Filesystem & Git Configuration:**
   - Git User: `rvceis` (`akashsgoundi.is23@rvce.edu.in`)
   - Local Codebase: `/home/akash/Desktop/PIHUB` (`backend/pihub/api/main.py` and `backend/gateway/app/main.py`)
   - User Portrait Image: `/home/akash/Desktop/PORTFOLIO/public/akash-portrait.jpg`
   - User Updated Resume: `/home/akash/Desktop/PORTFOLIO/public/RESUME.pdf` (and `public/Akash-Siddappa-Goundi-Resume.pdf`)

2. **Public GitHub Repositories Audited:**
   - Profile: `https://github.com/Akash-S-G`
   - Flagship PIHUB: `https://github.com/Akash-S-G/pihub` (Confirmed: FastAPI, GGUF/llama.cpp inference, 405+ packs, SQLite, Qdrant vector retrieval, UDP beacon on port 47890, chunk offset resume).
   - Sol-Bridge: `https://github.com/Akash-S-G/Sol-Bridge` (Confirmed: Express.js, PostgreSQL 16, TimescaleDB time-series ingestion, Redis 7 Pub/Sub, MQTT broker port 1883).
   - Smart Cart: `https://github.com/Akash-S-G/SMART-CART` (Confirmed: FastAPI backend, YOLO11n scanner tuning, WebSockets live broadcast, Playwright E2E suite, Modal cloud fallback).
   - *Note on FundShield:* Removed from active portfolio presentation per user instruction and updated resume.

3. **Academic & Professional Information:**
   - Institution: R V College of Engineering (RVCE), Bengaluru, India
   - Degree: B.E. in Information Science and Engineering (2023–2027)
   - CGPA: 8.37 / 10.0
   - Pre-University: Konnur Science PU College (PCMCs), 2022–2023, 95.16%
   - Internship: STON Technology — Software Development Engineer Intern (Bengaluru, June 2026 – September 2026)
   - Problem Solving: 300+ DSA problems solved across LeetCode and Codeforces; Winner of Technical Quiz Challenge at Nagarjuna College.

---

## 2. Integrity Distinctions: Implemented vs. Planned

| Project | Implemented & Verified in Source | Future / Architectural Target |
| :--- | :--- | :--- |
| **PIHUB** | FastAPI gateway, llama.cpp quantized GGUF execution, 405+ pack manifests, chunk resume, UDP beacon discovery, Qdrant offline knowledge chunks | Deploying 70B+ parameter models on bare Raspberry Pi without server offload |
| **Sol-Bridge** | Node/Express API, TimescaleDB hypertables, Redis Pub/Sub, MQTT telemetry ingestion, JWT auth | Production dynamic pricing ML models and external payment gateway live processing (Razorpay/Twilio) |
| **Smart Cart** | FastAPI catalog, YOLO11n object scanner with tuned confidence (0.35), WebSockets live sync, stock decrement, PDF receipt generation | Multi-angle overhead camera fusion arrays for 100% item occlusion disambiguation |

---

## 3. Visual & Interactive System Design

- **Theme:** Clean, modern light theme with high-contrast typography, slate surface hierarchy, and electric lime & indigo technical accents.
- **3D Implementation:** Replaced the disconnected 3D project sphere network with a bespoke Three.js / React Three Fiber interactive 3D portrait card (`Portrait3D.tsx`) featuring real-time mouse-tracking tilt, dynamic lighting, and glowing orbital rings.
- **Resume Access:** Synchronized latest resume PDF available for direct download and viewing across navigation, hero, and contact sections.

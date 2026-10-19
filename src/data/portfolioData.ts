import { ProjectData, ExperienceData, SkillCategory, EducationData, AchievementData } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Akash Siddappa Goundi',
  headline: 'I build backend systems that bring AI closer to the edge.',
  subheadline: 'From offline AI inference to real-time APIs and connected devices, I enjoy engineering practical systems that work beyond the happy path.',
  location: 'Bengaluru, Karnataka, India',
  email: 'akashgoundi100@gmail.com',
  phone: '+91 9900832414',
  github: 'https://github.com/Akash-S-G',
  linkedin: 'https://linkedin.com/in/akash-goundi-27320b303',
  educationSummary: 'B.E. Information Science and Engineering @ RVCE (2023–2027)',
  opportunityFocus: 'Open to Software Engineering, Backend Systems, and Applied Edge AI roles.',
  resumeFilename: 'Akash-Siddappa-Goundi-Resume.pdf'
};

export const PROJECTS: ProjectData[] = [
  {
    id: 'pihub',
    title: 'PIHUB — Offline AI Tutor & Edge Distribution Platform',
    category: 'Edge Computing & Local LLM Systems',
    roleTag: 'flagship',
    tagline: 'Decentralized classroom learning platform uniting offline LLM inference, manifest-based distribution, and edge hubs.',
    summary: 'A distributed educational platform designed to operate in intermittent or zero-connectivity classroom environments. Combines local llama.cpp quantized model inference with decentralized P2P content synchronization over Raspberry Pi edge nodes.',
    problem: 'Classrooms in bandwidth-constrained or remote regions cannot depend on continuous cloud API access for interactive AI tutoring and large educational multimedia streaming.',
    verifiedContribution: 'Architected FastAPI core services, llama.cpp GGUF inference streaming, model memory cache managers, manifest checksum verification pipelines, and P2P synchronization engines with UDP intranet discovery.',
    teamContext: 'Individual & core backend architectural implementation verified by source repository.',
    technologies: ['FastAPI', 'Python', 'llama.cpp', 'GGUF Models', 'Qdrant', 'Docker', 'Raspberry Pi', 'SQLite', 'UDP Sockets'],
    keyDecisions: [
      'De-coupled heavy LLM inference from edge nodes: Supported splitting heavy compute to a local classroom server while Raspberry Pi acts as the low-power gateway hub.',
      'Quantized GGUF execution: Utilized 4-bit and 8-bit quantized weights via llama.cpp to run inference locally within strict memory envelopes without GPU accelerators.',
      'Chunk-resumable sync manifests: Engineered byte-offset resume mechanisms with SHA-256 checksums to survive classroom network drops without restarting multi-gigabyte pack transfers.',
      'Zero-conf UDP beacon discovery: Implemented broadcast beacons on port 47890 allowing student tablets to discover and bind to local PiHub nodes without manual IP configuration.'
    ],
    outcomesAndLimitations: {
      verified: [
        'Over 405 verified curriculum content pack manifests supported across mathematics, science, and social science.',
        'Low-latency Server-Sent Events (SSE) token streaming from local GGUF models directly to classroom devices.',
        'Resilient peer-to-peer synchronization engine with automatic state recovery and retry escalation.',
        'Self-hosted Qdrant vector chunk retrieval for offline curriculum context injection.'
      ],
      limitations: [
        'Local Raspberry Pi hardware (e.g. 4B/8GB) is constrained to small quantized models (1B–3B); larger 7B/8B models require a local host server or distributed gateway node.',
        'Concurrent student LLM queries must be serialized or batched to prevent memory thrashing under load.'
      ]
    },
    architectureFlow: {
      description: 'Distributed request and synchronization lifecycle from classroom tablet to local edge gateway and llama.cpp inference engine.',
      nodes: [
        {
          id: 'tablet',
          label: 'Student Tablet',
          sublabel: 'Client Interface',
          role: 'Discovers PiHub via UDP broadcast and issues interactive tutor prompts and pack requests.',
          details: 'Connects to local classroom intranet Wi-Fi without internet connectivity.',
          category: 'client'
        },
        {
          id: 'gateway',
          label: 'FastAPI Gateway',
          sublabel: 'Reverse Proxy & Auth',
          role: 'Validates device tokens, manages session lifecycle, and routes traffic between RAG and inference.',
          details: 'Structured request logging, rate limiting, and gzip compression middleware.',
          category: 'gateway'
        },
        {
          id: 'pack_manager',
          label: 'Pack & Cache Engine',
          sublabel: 'Decentralized Content',
          role: 'Manages 405+ curriculum packs, verifies SHA-256 integrity, and orchestrates P2P sync.',
          details: 'Supports byte-offset resume for interrupted downloads on flaky networks.',
          category: 'storage'
        },
        {
          id: 'llm_core',
          label: 'llama.cpp Inference',
          sublabel: 'Quantized GGUF',
          role: 'Loads quantized model weights into memory and streams generated response tokens.',
          details: 'Eliminates cloud dependency; provides predictable offline inference latency.',
          category: 'ai-inference'
        },
        {
          id: 'qdrant_store',
          label: 'Qdrant Vector Chunks',
          sublabel: 'Offline Knowledge',
          role: 'Indexes textbook sections and curriculum chapters for offline retrieval-augmented generation.',
          details: 'Matches student questions to verified textbook excerpts before generating answers.',
          category: 'edge-sync'
        }
      ],
      connections: [
        { from: 'tablet', to: 'gateway', protocol: 'HTTP / SSE', label: 'Tutor Query / Sync' },
        { from: 'gateway', to: 'qdrant_store', protocol: 'gRPC / HTTP', label: 'Retrieve Chunks' },
        { from: 'gateway', to: 'llm_core', protocol: 'In-Memory C API', label: 'Prompt + Context' },
        { from: 'gateway', to: 'pack_manager', protocol: 'Local File / SQLite', label: 'Manifest & Asset Check' }
      ]
    },
    tradeoffs: [
      {
        dimension: 'Inference Location',
        decision: 'Hybrid Edge Gateway (Pi Hub + optional server)',
        rationale: 'Allows lightweight classroom gateways to handle routing and pack sync while heavy tensor operations run on capable local hardware if available.',
        alternative: 'Pure Pi inference (slow token generation) or pure cloud (fails when internet is down).'
      },
      {
        dimension: 'Data Sync Protocol',
        decision: 'Manifest-Driven Chunk Resuming',
        rationale: 'Classroom networks experience frequent disconnects. Chunk-level verification guarantees zero corrupted file packs.',
        alternative: 'Monolithic ZIP downloads that fail completely on connection drops.'
      }
    ],
    githubUrl: 'https://github.com/Akash-S-G/pihub'
  },
  {
    id: 'smart-cart',
    title: 'AI-Based Smart Shopping Cart & Vision Checkout',
    category: 'Computer Vision & Real-time Commerce',
    roleTag: 'featured',
    tagline: 'Real-time retail automation linking camera-based YOLO object recognition with live cart state and automated billing.',
    summary: 'An autonomous retail system connecting edge camera feeds to a YOLO11n object detection pipeline, dynamically updating cart state and stock allocations in real time via WebSockets.',
    problem: 'Traditional retail checkout generates physical queues and manual barcode scanning bottlenecks, while existing computer-vision prototypes often lack resilient backend order and inventory synchronization.',
    verifiedContribution: 'Built the FastAPI backend, PostgreSQL schema with auto-migrations, YOLO11n scanner tuning (confidence & max-detection parameters), WebSocket ConnectionManager for real-time live events, and Playwright E2E verification suite.',
    teamContext: 'Primary developer on backend services, vision integration, and live cart orchestration.',
    technologies: ['FastAPI', 'Python', 'YOLO11n', 'OpenCV', 'PostgreSQL 16', 'WebSockets', 'Modal Cloud Fallback', 'Playwright'],
    keyDecisions: [
      'Dual-tier vision execution: Lazy-loaded local YOLO with automatic fallback to serverless GPU inference on Modal when edge hardware lacks PyTorch.',
      'Scanner parameter optimization: Tuned detection confidence from 0.50 to 0.35 and constrained max detections to 12, eliminating false clutter in retail bins.',
      'Real-time WebSocket broadcast: Implemented asynchronous connection pooling to propagate item addition, weight confirmation, and bill calculation immediately to the shopper dashboard.',
      'End-to-End automated testing: Authored full Playwright test suites (8/8 passing) validating registration, scan, cart update, checkout, and receipt PDF generation.'
    ],
    outcomesAndLimitations: {
      verified: [
        'Complete end-to-end checkout flow operational: Scan -> Detect -> Cart update -> Coupon validation -> Stock decrement -> PDF receipt.',
        'WebSocket broadcast tested and verified with concurrent client connections.',
        'Verified YOLO11n tuning on custom product datasets with Grounding DINO integration.'
      ],
      limitations: [
        'Dense visual occlusion (items stacked directly on top of each other) requires multi-angle camera arrays or weight sensor fusion to achieve 100% item isolation.',
        'Self-hosted inference requires discrete GPU or low-latency cloud fallback connection.'
      ]
    },
    architectureFlow: {
      description: 'Camera frame capture to YOLO model inference, real-time cart update via WebSockets, and database persistence.',
      nodes: [
        {
          id: 'cam',
          label: 'Cart Camera / Feed',
          sublabel: 'ESP32-CAM / Video',
          role: 'Captures product images upon basket placement or user trigger.',
          details: 'Transmits frames to backend scanner endpoint.',
          category: 'client'
        },
        {
          id: 'api',
          label: 'FastAPI Scanner API',
          sublabel: 'Vision Router',
          role: 'Validates image payload, manages auth tokens, and delegates to vision pipeline.',
          details: 'Handles image pre-processing and lazy model initialization.',
          category: 'gateway'
        },
        {
          id: 'yolo',
          label: 'YOLO11n Vision Engine',
          sublabel: 'Local / Modal Cloud',
          role: 'Classifies product bounds, scores confidence, and returns item SKU metadata.',
          details: 'Uses tuned confidence thresholds and Grounding DINO fallback.',
          category: 'ai-inference'
        },
        {
          id: 'ws',
          label: 'WebSocket Manager',
          sublabel: 'Live Broadcast',
          role: 'Emits item detection and cart total update events to the shopper UI.',
          details: 'Sub-millisecond event propagation to active cart sessions.',
          category: 'edge-sync'
        },
        {
          id: 'db',
          label: 'PostgreSQL 16',
          sublabel: 'Orders & Inventory',
          role: 'Atomically decrements product stock, persists transactions, and stores billing audit records.',
          details: 'Enforces constraints against negative stock and invalid coupons.',
          category: 'storage'
        }
      ],
      connections: [
        { from: 'cam', to: 'api', protocol: 'HTTP POST / multipart', label: 'Frame Stream' },
        { from: 'api', to: 'yolo', protocol: 'In-Memory / Modal REST', label: 'Inference Pass' },
        { from: 'api', to: 'db', protocol: 'Asyncpg / SQLAlchemy', label: 'Atomic Cart & Stock Update' },
        { from: 'api', to: 'ws', protocol: 'WebSockets Broadcast', label: 'Push Cart State' }
      ]
    },
    githubUrl: 'https://github.com/Akash-S-G/SMART-CART'
  },
  {
    id: 'sol-bridge',
    title: 'Sol-Bridge — Community Solar Energy Sharing Platform',
    category: 'Backend Architecture & IoT Telemetry',
    roleTag: 'featured',
    tagline: 'Microservices-based peer-to-peer energy sharing backend ingesting real-time smart meter sensor streams.',
    summary: 'A clean energy backend designed to process high-throughput smart-meter telemetry, track continuous energy production and consumption, and structure community peer-to-peer energy exchange.',
    problem: 'Distributed residential rooftop solar systems produce variable power that is often wasted without a reliable, low-latency telemetry backend to monitor surplus and coordinate local allocation.',
    verifiedContribution: 'Built core Express.js backend services, TimescaleDB time-series ingestion pipeline for continuous sensor telemetry, Redis Pub/Sub event streaming, and user quota allocation models.',
    teamContext: 'Collaborative RVCE academic project; repository is a fork where my specific focus was IoT telemetry ingestion, database modeling, and backend service boundaries.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL 16', 'TimescaleDB', 'Redis 7', 'MQTT', 'Docker Compose'],
    keyDecisions: [
      'TimescaleDB hypertable partitioning: Partitioned continuous energy readings into time-based chunks for efficient aggregation queries across days, weeks, and seasons.',
      'MQTT IoT ingestion: Decoupled sensor data ingestion via lightweight MQTT pub/sub to handle bursty smart-meter reporting without overloading HTTP endpoints.',
      'Redis Pub/Sub event bus: Distributed internal notification and alert triggers between microservice containers without synchronous coupling.',
      'Transparent boundary definition: Maintained clear separation between the implemented working telemetry prototype and planned ML forecasting and payment modules.'
    ],
    outcomesAndLimitations: {
      verified: [
        'Containerized multi-service setup (PostgreSQL, TimescaleDB, Redis, MQTT broker) running via Docker Compose.',
        'Working API endpoints for user authentication, profile management, and sensor data ingestion.',
        'High-density time-series tables structured for energy meter telemetry.'
      ],
      limitations: [
        'Automated billing, dynamic pricing ML models, and third-party payment gateways (Razorpay/Twilio) are documented architectural targets and not yet fully production-deployed.',
        'Project was evaluated as a software prototype with simulated smart-meter telemetry feeds rather than connected physical hardware grids.'
      ]
    },
    architectureFlow: {
      description: 'Smart meter readings through MQTT broker to TimescaleDB time-series storage and community allocation workflows.',
      nodes: [
        {
          id: 'meter',
          label: 'Smart Meter / IoT Hub',
          sublabel: 'Telemetry Sensor',
          role: 'Measures continuous wattage generated, battery storage, and household grid load.',
          details: 'Publishes readings at fixed intervals over lightweight protocols.',
          category: 'client'
        },
        {
          id: 'mqtt',
          label: 'MQTT Broker',
          sublabel: 'Telemetry Ingestion',
          role: 'Receives distributed sensor packets and queues them for backend processing.',
          details: 'Handles thousands of simultaneous meter feeds without HTTP handshake overhead.',
          category: 'gateway'
        },
        {
          id: 'express',
          label: 'Backend API Gateway',
          sublabel: 'Node / Express Services',
          role: 'Coordinates authentication, meter registration, and energy sharing allocation logic.',
          details: 'Modular controller/service layout with JWT authorization.',
          category: 'gateway'
        },
        {
          id: 'timescale',
          label: 'TimescaleDB',
          sublabel: 'Time-Series Hypertable',
          role: 'Persists and aggregates historical sensor readings for trend analysis and billing calculation.',
          details: 'Automatic chunk partitioning for high-throughput write performance.',
          category: 'storage'
        },
        {
          id: 'redis',
          label: 'Redis 7 Pub/Sub',
          sublabel: 'Event Bus & Cache',
          role: 'Caches active user sessions and broadcasts real-time surge alerts across services.',
          details: 'In-memory fast lookup for meter heartbeats.',
          category: 'edge-sync'
        }
      ],
      connections: [
        { from: 'meter', to: 'mqtt', protocol: 'MQTT port 1883', label: 'Sensor Data Stream' },
        { from: 'mqtt', to: 'express', protocol: 'Internal TCP', label: 'Message Consume' },
        { from: 'express', to: 'timescale', protocol: 'PostgreSQL Protocol', label: 'Hypertable Batch Insert' },
        { from: 'express', to: 'redis', protocol: 'RESP', label: 'Publish Event / Cache' }
      ]
    },
    githubUrl: 'https://github.com/Akash-S-G/Sol-Bridge'
  },
  {
    id: 'fundshield',
    title: 'FundShield — AI-Powered Welfare Verification Microservice',
    category: 'Computer Vision & Anomaly Detection',
    roleTag: 'featured',
    tagline: 'Dockerized ML microservice providing image tampering detection, construction stage verification, and transaction risk scoring.',
    summary: 'A computer-vision and anomaly detection microservice created to inspect visual construction evidence and flag statistical anomalies in welfare fund disbursements.',
    problem: 'Government and NGO housing grants frequently suffer from fraudulent fund drawdowns supported by duplicate or manipulated site photographs and abnormal payout transactions.',
    verifiedContribution: 'Designed the Dockerized FastAPI ML microservice, image verification pipeline with perceptual hashing (ImageHash) and EXIF metadata extraction, YOLOv8 stage classification, and Scikit-learn Isolation Forest risk engine.',
    teamContext: 'Designed as the machine learning verification component for a multi-tier welfare audit platform.',
    technologies: ['FastAPI', 'Python', 'OpenCV', 'ImageHash', 'ExifRead', 'YOLOv8', 'Scikit-learn', 'Docker'],
    keyDecisions: [
      'Multi-signal image auditing: Combined EXIF device metadata extraction, perceptual image hashing for duplicate reuse detection, and screenshot artifact recognition.',
      'Risk scoring over absolute claims: Designed the engine to output probabilistic risk flags (e.g. 0.0 to 1.0) rather than making unfounded automated fraud declarations.',
      'Unsupervised transaction anomaly detection: Trained Scikit-learn Isolation Forest models on simulated transaction flows to flag anomalous distribution bursts and round-trip transfers.',
      'Decoupled microservice architecture: Packaged the entire verification pipeline into a standalone Docker container ready to integrate with web gateways.'
    ],
    outcomesAndLimitations: {
      verified: [
        'Implemented FastAPI endpoints for image verification and anomaly risk scoring.',
        'Perceptual hashing successfully detects identical or slightly transformed images uploaded under different beneficiary claims.',
        'Isolation Forest pipeline identifies high-risk transaction patterns from ledger records.'
      ],
      limitations: [
        'Historical project literature mentions an EfficientNet-B0 model evaluated with 89% accuracy; in production practice, variations in camera quality, weather, and lighting require human-in-the-loop review.',
        'Blockchain smart contract integration remains a documented architecture specification rather than an active on-chain production contract.'
      ]
    },
    architectureFlow: {
      description: 'Image and transaction intake to multi-stage verification pipeline and anomaly scoring.',
      nodes: [
        {
          id: 'claim_app',
          label: 'Beneficiary Claim App',
          sublabel: 'Proof Submission',
          role: 'Uploads construction site photos and milestone payout requests.',
          details: 'Captures raw JPEG with device metadata intact.',
          category: 'client'
        },
        {
          id: 'ml_api',
          label: 'FastAPI ML Service',
          sublabel: 'Verification Gateway',
          role: 'Parses uploads, sanitizes metadata, and orchestrates verification passes.',
          details: 'Async request pipeline in Docker container.',
          category: 'gateway'
        },
        {
          id: 'img_engine',
          label: 'Image Verification Engine',
          sublabel: 'ExifRead + ImageHash',
          role: 'Calculates perceptual image hashes to detect reuse and analyzes EXIF timestamps and camera tags.',
          details: 'Flags duplicate claims and screenshot tampering.',
          category: 'ai-inference'
        },
        {
          id: 'stage_model',
          label: 'Stage Classifier (YOLO/CNN)',
          sublabel: 'Visual Understanding',
          role: 'Verifies physical progress stages (e.g. Foundation vs Roof level).',
          details: 'Detects structural construction milestones from images.',
          category: 'ai-inference'
        },
        {
          id: 'anomaly_engine',
          label: 'Isolation Forest Engine',
          sublabel: 'Scikit-Learn Risk Model',
          role: 'Evaluates transaction disbursement frequency and amounts against normal distribution baselines.',
          details: 'Computes anomaly scores to highlight suspicious payout patterns.',
          category: 'edge-sync'
        }
      ],
      connections: [
        { from: 'claim_app', to: 'ml_api', protocol: 'HTTPS POST / Multipart', label: 'Claim Proofs' },
        { from: 'ml_api', to: 'img_engine', protocol: 'In-Memory Matrix', label: 'Hash & Metadata Pass' },
        { from: 'ml_api', to: 'stage_model', protocol: 'Tensor / PyTorch', label: 'Milestone Classification' },
        { from: 'ml_api', to: 'anomaly_engine', protocol: 'Scikit Vectorizer', label: 'Transaction Risk Scoring' }
      ]
    },
    githubUrl: 'https://github.com/Akash-S-G/FUNDSHIELD-ML'
  }
];

export const EXPERIENCE: ExperienceData[] = [
  {
    company: 'STON Technology',
    role: 'Software Development Engineer Intern',
    location: 'Bengaluru, India',
    period: 'June 2026 – September 2026',
    description: [
      'Engineered an admit-card and attendance verification system utilizing QR-code scanning paired with automated Excel reporting pipelines.',
      'Implemented real-time gate check-in workflows, camera-based QR scanning, and walk-in candidate registration with MongoDB attendance persistence.',
      'Architected secure onboarding workflows including CSV student whitelisting, join-code account claiming, Google OAuth, Role-Based Access Control (RBAC), and TOTP-based two-factor authentication (2FA).',
      'Developed per-drive attendance analytics, officer verification attribution, automated formatting, and edge-case notification alerts for high-reliability campus drives.'
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'QR Systems', 'Google OAuth', 'TOTP 2FA', 'ExcelJS', 'REST APIs'],
    systemsEngineered: [
      'Gate Check-in Pipeline: Fast barcode/QR scanning verification against pre-whitelisted candidate cohorts.',
      'Security & Auth Architecture: Dual-layer authorization with Join-Codes, Google OAuth, and TOTP two-factor security.',
      'Automated Export Engine: Programmatic generation of multi-sheet formatted attendance registers with audit timestamps.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    description: 'Strong foundation in systems and application development.',
    skills: [
      { name: 'Python', verifiedUse: 'FastAPI backends, llama.cpp bindings, OpenCV pipelines, ML verification microservices', relatedProjects: ['pihub', 'smart-cart', 'fundshield'] },
      { name: 'C++', verifiedUse: 'Data structures & algorithms, low-level computation, competitive problem solving', relatedProjects: [] },
      { name: 'C', verifiedUse: 'Systems fundamentals, memory management, low-level architecture', relatedProjects: [] },
      { name: 'JavaScript', verifiedUse: 'Node.js, Express.js microservices, asynchronous web services', relatedProjects: ['sol-bridge'] },
      { name: 'TypeScript', verifiedUse: 'Type-safe frontend architectures, interface definitions, API contracts', relatedProjects: [] }
    ]
  },
  {
    category: 'Backend Engineering',
    description: 'Scalable service architectures, real-time streaming, and resilient APIs.',
    skills: [
      { name: 'FastAPI', verifiedUse: 'Primary framework for PIHUB edge nodes, Smart Cart vision API, and FundShield ML service', relatedProjects: ['pihub', 'smart-cart', 'fundshield'] },
      { name: 'Express.js', verifiedUse: 'Microservice routing, REST endpoints, and authentication in Sol-Bridge and STON Tech', relatedProjects: ['sol-bridge'] },
      { name: 'REST APIs', verifiedUse: 'Contract-first endpoint design, structured logging, error handling', relatedProjects: ['pihub', 'sol-bridge', 'smart-cart'] },
      { name: 'WebSockets', verifiedUse: 'Real-time cart state synchronization and live retail scanner events', relatedProjects: ['smart-cart'] },
      { name: 'Socket.IO', verifiedUse: 'Event-driven communication and status broadcasting', relatedProjects: ['smart-cart'] }
    ]
  },
  {
    category: 'AI & Applied Machine Learning',
    description: 'Practical model integration, offline inference, and computer vision workflows.',
    skills: [
      { name: 'llama.cpp & GGUF', verifiedUse: 'Local quantized model loading, memory management, and offline token streaming', relatedProjects: ['pihub'] },
      { name: 'LLM Integration', verifiedUse: 'Context retrieval, prompt assembly, and offline RAG pipelines', relatedProjects: ['pihub'] },
      { name: 'Computer Vision (OpenCV)', verifiedUse: 'Frame pre-processing, image hashing, tampering detection, and camera feeds', relatedProjects: ['smart-cart', 'fundshield'] },
      { name: 'YOLO (YOLOv8 / YOLO11n)', verifiedUse: 'Object detection in retail checkout and structural milestone classification', relatedProjects: ['smart-cart', 'fundshield'] },
      { name: 'Scikit-Learn', verifiedUse: 'Isolation Forest unsupervised anomaly detection for transaction risk scoring', relatedProjects: ['fundshield'] }
    ]
  },
  {
    category: 'Databases & Storage',
    description: 'Relational, time-series, document, and vector storage engines.',
    skills: [
      { name: 'PostgreSQL 16', verifiedUse: 'Relational data modeling, ACID transactions, and product inventory management', relatedProjects: ['smart-cart', 'sol-bridge'] },
      { name: 'TimescaleDB', verifiedUse: 'Time-series hypertables for high-density IoT smart-meter telemetry', relatedProjects: ['sol-bridge'] },
      { name: 'MongoDB', verifiedUse: 'Admit card persistence, attendance logs, and student profile schemas', relatedProjects: [] },
      { name: 'SQLite', verifiedUse: 'Lightweight local database for edge classroom hubs in PiHub', relatedProjects: ['pihub'] },
      { name: 'Redis', verifiedUse: 'In-memory caching and Pub/Sub event bus across distributed services', relatedProjects: ['sol-bridge'] },
      { name: 'Qdrant', verifiedUse: 'Offline vector similarity search for textbook and curriculum knowledge chunks', relatedProjects: ['pihub'] }
    ]
  },
  {
    category: 'Systems & Infrastructure',
    description: 'Containerization, edge deployment, and developer workflows.',
    skills: [
      { name: 'Linux', verifiedUse: 'Primary development and deployment environment; systemd and networking configuration', relatedProjects: ['pihub'] },
      { name: 'Raspberry Pi', verifiedUse: 'Edge node hardware host, Wi-Fi hotspot creation, and local gateway operations', relatedProjects: ['pihub'] },
      { name: 'Docker & Compose', verifiedUse: 'Multi-container orchestration for distributed hubs and microservice stacks', relatedProjects: ['pihub', 'sol-bridge', 'fundshield'] },
      { name: 'Git & GitHub', verifiedUse: 'Version control, branch management, pull request workflows, CI configuration', relatedProjects: ['pihub', 'sol-bridge', 'smart-cart', 'fundshield'] },
      { name: 'MQTT', verifiedUse: 'Lightweight IoT sensor protocol for continuous telemetry streaming', relatedProjects: ['sol-bridge'] }
    ]
  },
  {
    category: 'CS Fundamentals',
    description: 'Core computer science principles guiding design and problem solving.',
    skills: [
      { name: 'Data Structures & Algorithms', verifiedUse: '300+ competitive problems solved across LeetCode and Codeforces', relatedProjects: [] },
      { name: 'System Design', verifiedUse: 'Microservice decoupling, edge caching, and fault-tolerant sync architectures', relatedProjects: ['pihub', 'sol-bridge'] },
      { name: 'Operating Systems', verifiedUse: 'Process lifecycle, memory limits, socket networking, concurrency', relatedProjects: ['pihub'] },
      { name: 'Database Management (DBMS)', verifiedUse: 'Schema normalization, indexing, transaction isolation, time-series partitioning', relatedProjects: ['sol-bridge', 'smart-cart'] },
      { name: 'Computer Networks', verifiedUse: 'UDP broadcast beacons, WebSocket handshakes, HTTP/SSE, MQTT protocols', relatedProjects: ['pihub', 'smart-cart'] }
    ]
  }
];

export const EDUCATION: EducationData[] = [
  {
    institution: 'R V College of Engineering (RVCE)',
    degree: 'B.E. in Information Science and Engineering',
    period: '2023 – 2027',
    score: 'CGPA: 8.37 / 10.0',
    highlights: [
      'Focus areas: Distributed Systems, Database Management, Operating Systems, Computer Networks, and Artificial Intelligence.',
      'Active contributor to engineering project initiatives spanning IoT networks and edge intelligence platforms.'
    ]
  },
  {
    institution: 'Konnur Science PU College',
    degree: 'Pre-University Course (PCMCs: Physics, Chemistry, Mathematics, Computer Science)',
    period: '2022 – 2023',
    score: 'Percentage: 95.16%',
    highlights: [
      'Academic distinction across Mathematics and Computer Science fundamentals.',
      'Strong mathematical rigor underpinning algorithmic problem-solving.'
    ]
  }
];

export const ACHIEVEMENTS: AchievementData[] = [
  {
    title: '300+ Problems Solved Across LeetCode & Codeforces',
    category: 'Algorithmic Problem Solving',
    description: 'Continuous focus on data structures, algorithmic efficiency, graph traversal, dynamic programming, and binary search patterns.',
    proofNote: 'Self-reported from verified resume record.'
  },
  {
    title: 'Winner — Technical Quiz Challenge',
    category: 'Competitive CS Knowledge',
    description: 'Secured First Place at the inter-collegiate Technical Quiz Challenge held at Nagarjuna College, demonstrating depth across computing fundamentals.',
    proofNote: 'Verified achievement from academic resume.'
  }
];

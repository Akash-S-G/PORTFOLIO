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
    summary: 'A distributed educational platform designed to operate in intermittent or zero-connectivity classroom environments. Heavy AI (llama.cpp inference, Qdrant RAG) runs on a local classroom server while a Raspberry Pi tier handles gateway routing, pack serving, and P2P content synchronization.',
    problem: 'Classrooms in bandwidth-constrained or remote regions cannot depend on continuous cloud API access for interactive AI tutoring and large educational multimedia streaming.',
    verifiedContribution: 'Architected FastAPI core services, llama.cpp GGUF inference streaming, model memory cache managers, manifest checksum verification pipelines, and P2P synchronization engines with UDP intranet discovery.',
    teamContext: 'Individual & core backend architectural implementation, documented in the source repository.',
    technologies: ['FastAPI', 'Python', 'llama.cpp', 'Phi-2 (GGUF)', 'Qdrant', 'Docker', 'Raspberry Pi', 'SQLite', 'UDP Sockets'],
    keyDecisions: [
      'De-coupled heavy LLM inference from edge nodes: Supported splitting heavy compute to a local classroom server while Raspberry Pi acts as the low-power gateway hub.',
      'Quantized GGUF execution: Utilized 4-bit and 8-bit quantized weights of the Phi-2 model via llama.cpp to run inference locally within strict memory envelopes without GPU accelerators.',
      'Chunk-resumable sync manifests: Engineered byte-offset resume mechanisms with SHA-256 checksums to survive classroom network drops without restarting multi-gigabyte pack transfers.',
      'Zero-conf UDP beacon discovery: Implemented broadcast beacons on port 47890 allowing student tablets to discover and bind to local PiHub nodes without manual IP configuration.'
    ],
    outcomesAndLimitations: {
      verified: [
        'Over 405 curriculum content pack manifests supported across mathematics, science, and social science.',
        'Low-latency Server-Sent Events (SSE) token streaming from local Phi-2 GGUF inference directly to classroom devices.',
        'Qdrant RAG pipeline evaluated across 50 queries: 90% HitRate@5, 0.746 MRR, 546 ms p95 retrieval latency.',
        'Resilient peer-to-peer synchronization engine with automatic state recovery and retry escalation.',
        'Self-hosted Qdrant vector chunk retrieval for offline curriculum context injection.'
      ],
      limitations: [
        'Heavy AI services require the main server node (llama.cpp, Qdrant, content pipeline) — the Raspberry Pi tier only routes and serves, so a Pi-only deployment cannot run local inference.',
        'Concurrent student LLM queries must be serialized or batched to prevent memory thrashing under load.'
      ]
    },
    architectureFlow: {
      description: 'Two-node deployment: Raspberry Pi runs the lightweight classroom tier (nginx, gateway, pack serving); the main server runs the heavy AI tier (llama.cpp inference, Qdrant RAG).',
      mermaid: `flowchart LR
  subgraph PI["Classroom LAN — Raspberry Pi tier"]
    TAB["Student Tablet"] -->|"HTTP / SSE via nginx :80"| GW["FastAPI Gateway :8000"]
    GW -->|"packs · sync · :8020"| PIHUB["pihub Node (SQLite)"]
    GW -->|".otpack serving · :8030"| PACK["pack-service"]
  end
  subgraph SRV["Main Server — AI tier"]
    INF["inference-service :8010"]
    LL["llama-server :8081 — Phi-2 GGUF · ctx 2048"]
    CP["content-pipeline :8001"]
    Q[("Qdrant :6333 — educational_chunks")]
  end
  GW -->|"HTTP :8010 · SSE proxy"| INF
  INF -->|"/v1/chat/completions"| LL
  INF -->|"/rag/search top-k"| CP
  CP -->|"embed bge-small · vector I/O"| Q
  PACK -.->|"NFS v4 mounts (ro)"| Q`,
      nodes: [
        {
          id: 'tablet',
          label: 'Student Tablet',
          sublabel: 'Client Interface',
          role: 'Lightweight classroom client on the local intranet — no internet required. It auto-discovers the Pi hub, registers itself, then consumes streamed tutor answers and resumable curriculum packs.',
          workflow: [
            'Joins the classroom Wi-Fi/hotspot and listens for the gateway\'s UDP broadcast beacon on 255.255.255.255:47890 (fired every 15s) to learn the hub address automatically.',
            'Registers with the pihub node (:8020) and authenticates every call with an X-Device-Token header (device registry, sync sessions, progress).',
            'Downloads packs via GET /packs/{id}/download — interrupted transfers resume from a byte offset instead of restarting multi-GB files.',
            'Sends tutor questions to POST /ai/tutor (stream=true) and renders the SSE token stream live in the chat UI.'
          ],
          details: 'Talks only to nginx :80 — the single published port on the Raspberry Pi.',
          category: 'client'
        },
        {
          id: 'gateway',
          label: 'Pi Gateway Tier',
          sublabel: 'nginx + FastAPI Router',
          role: 'The Raspberry Pi tier: nginx (:80) reverse-proxies into a FastAPI gateway (:8000) that fans out ~110 routes across the lightweight Pi containers and proxies AI calls to the main server. This node never runs models.',
          workflow: [
            'nginx terminates HTTP on port 80 and proxies every request to the gateway container (:8000).',
            'Gateway broadcasts a zero-conf UDP discovery beacon (SO_BROADCAST datagram to 255.255.255.255:47890, every 15s) so tablets find the hub without manual IP configuration.',
            'Applies GZip + structured-logging middleware, then routes by path: packs/sync/progress → pihub (:8020) and pack-service (:8030); tutor/AI → inference-service on the server via INFERENCE_SERVICE_URL.',
            'Runs on trusted-LAN assumptions — no inter-service auth; client identity is enforced only at the pihub node.'
          ],
          details: 'Pi containers: nginx :80, gateway :8000, pihub :8020, pack-service :8030, experiment-service :8040 (PhET sims).',
          category: 'gateway'
        },
        {
          id: 'pack_manager',
          label: 'Pack & Cache Engine',
          sublabel: 'Resumable Distribution',
          role: 'Compiles and serves .otpack curriculum bundles with checksummed, resumable delivery engineered for networks that drop every few minutes.',
          workflow: [
            'Emits canonical-JSON manifests (pack_id, version, sha256 file_checksum, 1 MB chunk boundaries) from pack-service (:8030).',
            'Streams GET /packs/{id}/download; interrupted sessions resume from bytes_transferred using a chunks_received bitset — no chunk is re-downloaded.',
            'Sync engine retries up to a bounded retry_count, then escalates to peer-to-peer transfer from tablets that already hold the pack.',
            'Large binaries (textbooks, PhET sims) are NFS v4 mounts — served read-only from the main server storage, never copied onto the Pi.'
          ],
          details: 'NFS mounts: shared_storage (rw) + TEXTBOOKS / phet_downloads / generated packs (ro) exported by the server.',
          category: 'storage'
        },
        {
          id: 'llm_core',
          label: 'llama.cpp Inference',
          sublabel: 'Main Server · llama-server',
          role: 'FastAPI inference service (:8010) on the main server that supervises a llama.cpp llama-server subprocess and streams tutor completions. Heavy AI is deliberately decoupled from the Pi gateway.',
          workflow: [
            'Spawns llama-server bound to 127.0.0.1:8081 with /models/model.gguf — a quantized Phi-2 model (Q4_K_M GGUF) — and ctx-size 2048 via subprocess.Popen.',
            'On POST /ai/tutor: assembles system prompt + RAG context (truncated to a 1800-char budget) + question, then calls the OpenAI-compatible POST /v1/chat/completions (temp 0.4, top_p 0.9, max_tokens 256).',
            'Re-batches upstream SSE tokens into ~120-char events and returns text/event-stream through the gateway to the tablet.',
            'Keeps the model loaded across requests (no cold reload) plus a 128-entry LRU prompt cache; liveness checked via GET /v1/models.'
          ],
          details: 'Eight content-generator agents share this service and fall back to an Ollama backend when unavailable.',
          category: 'ai-inference'
        },
        {
          id: 'qdrant_store',
          label: 'Qdrant Vector Chunks',
          sublabel: 'Offline Knowledge · RAG',
          role: 'Vector backbone for retrieval-augmented tutoring: the curriculum is chunked, embedded, and searched locally so tutor answers cite the actual textbook content.',
          workflow: [
            'content-pipeline (:8001) ingests textbook PDFs → chunks → embeds with BAAI/bge-small-en-v1.5 (CPU) → upserts into the Qdrant educational_chunks collection (:6333).',
            'On each tutor query, the inference service POSTs to content-pipeline /rag/search for top-k chunks filtered by grade/subject/chapter payload.',
            'Retrieved text is truncated to the 1800-char context budget and prepended to the tutor prompt before generation.',
            'Pipeline evaluated across 50 queries: 90% HitRate@5, 0.746 MRR, and 546 ms p95 retrieval latency.'
          ],
          details: 'Qdrant, content-pipeline, and inference-service all run on the main server (docker-compose.server.yml).',
          category: 'edge-sync'
        }
      ],
      connections: [
        { from: 'tablet', to: 'gateway', protocol: 'HTTP / SSE · nginx :80', label: 'Tutor Query / Sync' },
        { from: 'gateway', to: 'llm_core', protocol: 'HTTP :8010 · SSE proxy', label: 'Prompt + RAG Context' },
        { from: 'llm_core', to: 'qdrant_store', protocol: 'HTTP /rag/search → :6333', label: 'Retrieve Chunks' },
        { from: 'gateway', to: 'pack_manager', protocol: 'HTTP :8030 / SQLite', label: 'Manifest & Chunk Transfer' }
      ]
    },
    tradeoffs: [
      {
        dimension: 'Inference Location',
        decision: 'Split-node deployment: Raspberry Pi gateway + server-side llama.cpp',
        rationale: 'The Pi handles routing, auth, and pack sync on low-power hardware, while token generation and vector search run on the capable server node — no cloud dependency, no slow on-Pi inference.',
        alternative: 'Pure Pi inference (too slow for tutoring) or pure cloud (fails when internet is down).'
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
      'Dual-tier vision execution: remote microservice inference (Modal GPU / HF Space) first, with automatic in-process fallback (DINO-tiny + YOLO11n) when the remote tier is unreachable.',
      'Scanner parameter optimization: Tuned detection confidence from 0.50 to 0.35 and constrained max detections to 12, eliminating false clutter in retail bins.',
      'Real-time WebSocket broadcast: Topic-scoped ConnectionManager propagates INVENTORY_UPDATED, ORDER_CREATED, and PAYMENT_VERIFIED events the instant service state changes.',
      'End-to-End automated testing: Authored full Playwright test suites (8/8 passing) validating registration, scan, cart update, checkout, and receipt PDF generation.'
    ],
    outcomesAndLimitations: {
      verified: [
        'Complete end-to-end checkout flow operational: Scan -> Detect -> Cart update -> Coupon validation -> Stock decrement -> PDF receipt.',
        'Detection pipeline evaluated at 94.2% accuracy with 78 ms median inference latency on the evaluated image dataset.',
        'WebSocket broadcast tested under concurrent client connections.',
        'Tuned YOLO11n on custom product datasets with Grounding DINO integration.'
      ],
      limitations: [
        'Dense visual occlusion (items stacked directly on top of each other) requires multi-angle camera arrays or weight sensor fusion to achieve 100% item isolation.',
        'Self-hosted inference requires discrete GPU or low-latency cloud fallback connection.'
      ]
    },
    tradeoffs: [
      {
        dimension: 'Vision Execution Tier',
        decision: 'Remote microservice first (Modal GPU / HF Space), in-process fallback second',
        rationale: 'Serverless GPU keeps the API host free of PyTorch and scales detection independently; the local DINO-tiny + YOLO11n engine keeps the scanner working when the remote tier is unreachable.',
        alternative: 'Purely local inference (requires CUDA on the API host) or cloud-only (hard failure when the microservice is down).'
      },
      {
        dimension: 'Detection Strategy',
        decision: 'Grounding DINO-tiny zero-shot primary, YOLO11n fallback, OCR + fuzzy SKU match',
        rationale: 'Zero-shot boxing handles products never seen in training, while EasyOCR crops + RapidFuzz matching tie every detection to the real catalog instead of a closed class list.',
        alternative: 'YOLO-only classification with fixed classes — breaks the moment a new product SKU is shelved.'
      },
      {
        dimension: 'Live State Delivery',
        decision: 'Topic-scoped WebSocket ConnectionManager on /ws',
        rationale: 'Dashboards receive ORDER_CREATED / PAYMENT_VERIFIED / INVENTORY_UPDATED the instant service calls commit, with per-topic access control and bounded frame sizes.',
        alternative: 'REST polling from dashboards — stale UI and wasted requests under load.'
      }
    ],
    architectureFlow: {
      description: 'Scanner upload to two-tier vision inference, SKU matching, transactional checkout with atomic stock decrement, and topic-scoped WebSocket broadcasts.',
      mermaid: `flowchart LR
  CAM["Scanner UI / Camera"] -->|"multipart POST /ai/detect"| API["FastAPI :8000"]
  API -->|"httpx 8s → /predict (Modal · HF Space)"| VS["Vision Microservice — YOLO11n + EasyOCR"]
  API -->|"in-process fallback"| LOC["DINO-tiny → YOLO11n · OCR · RapidFuzz SKU"]
  API -->|"SQLAlchemy / psycopg"| DB[("PostgreSQL 16 — 24 tables")]
  API -->|"broadcast"| WS["WebSocket /ws — topics"]
  WS -.->|"ORDER_CREATED · PAYMENT_VERIFIED"| UI["Shopper & Admin Dashboards"]`,
      nodes: [
        {
          id: 'cam',
          label: 'Cart Camera / Feed',
          sublabel: 'Scanner Client',
          role: 'The capture surface of the flow: the scanner page acquires a product photo and uploads it for detection, then renders per-item SKU, confidence, and bbox overlays for shopper review before anything is committed to the cart.',
          workflow: [
            'User places an item in the bin / triggers capture on the /scanner page; image is validated against a type whitelist (jpg/jpeg/png/bmp/webp).',
            'Browser uploads the frame as multipart to POST /ai/detect — or one-shot POST /ai/detect-and-add with a JWT for detect + add-to-cart in a single call.',
            'Response drives the review UI: matched product, confidence score, OCR text, and bounding boxes; the shopper confirms quantities before POST /cart/items.'
          ],
          details: 'Uploads hit FastAPI :8000; detections are reviewed client-side before cart commit.',
          category: 'client'
        },
        {
          id: 'api',
          label: 'FastAPI Scanner API',
          sublabel: 'Vision Router · :8000',
          role: 'Core commerce API (13 routers over a 24-table PostgreSQL schema) that validates payloads, delegates detection to the vision tier, and owns cart, coupon, order, and inventory transactions.',
          workflow: [
            'POST /ai/detect accepts the multipart image and forwards it via httpx (8s timeout) to the remote vision microservice (Modal / HF Space) at POST /predict.',
            'If the remote tier is missing or slow, it falls back to the in-process engine: BGR→RGB conversion, 640×640 resize, and a lazy-loaded singleton ModelLoader (initialized in app lifespan with a warmup pass).',
            'Returns DetectionResponse {detections[], inference_time_ms, image dims}; GET /ai/health reports engine status and device.'
          ],
          details: 'Rate limit 1000 req/60s; JWT HS256 auth; default admin seeded at startup.',
          category: 'gateway'
        },
        {
          id: 'yolo',
          label: 'Vision Engine',
          sublabel: 'DINO-tiny + YOLO11n + OCR',
          role: 'Two-tier detection: Grounding DINO-tiny zero-shot boxes locally with a custom-trained YOLO11n fallback, while the remote microservice runs YOLO11n + EasyOCR — every box is matched to a real catalog SKU.',
          workflow: [
            'Remote tier: YOLO11n + EasyOCR return {bounding_box, confidence, ocr_text, class_id} per detection from the microservice.',
            'Local tier: Grounding DINO-tiny (box/text threshold 0.25) with prompts like "grocery item", "bottle", "milk carton"; YOLO11n takes over when DINO returns nothing (conf 0.35, IoU 0.45, max_det 12, img 640).',
            'Each detection is cropped and passed through EasyOCR (min conf 0.4), then RapidFuzz WRatio matching (threshold 65) against the product catalog resolves the exact SKU.',
            'Evaluated at 94.2% accuracy on the image dataset with 78 ms median inference latency.',
            'Scanner tuning: confidence raised from 0.50 → 0.35 and max detections capped at 12 to eliminate false clutter in retail bins.'
          ],
          details: 'yolo11n.pt weights custom-trained on curated datasets built by the vision-dataset-factory pipeline.',
          category: 'ai-inference'
        },
        {
          id: 'ws',
          label: 'WebSocket Manager',
          sublabel: 'Topic Broadcast · /ws',
          role: 'Asynchronous ConnectionManager fanning out commerce events to shopper and admin dashboards with topic-scoped access control — no polling anywhere in the UI.',
          workflow: [
            'Clients connect at /ws with a JWT (query param or Sec-WebSocket-Protocol bearer subprotocol) and SUBSCRIBE to topics: public, user:{id}, admin, inventory, orders.',
            'Business events broadcast as {type, topic, data, ts}: INVENTORY_UPDATED, ORDER_CREATED, ORDER_STATUS_UPDATED, PAYMENT_VERIFIED.',
            'Heartbeat ping/pong every 25s; stale connections closed with 4401/1001; client input rate-limited to 60 msgs/10s with an 8 KB frame cap.'
          ],
          details: 'Events fire directly from order and payment service calls, so dashboards update the moment state changes.',
          category: 'edge-sync'
        },
        {
          id: 'db',
          label: 'PostgreSQL 16',
          sublabel: 'Orders & Inventory',
          role: 'Transactional source of truth: 24 tables (products, inventory, orders, carts, payments, users) with constraint-enforced stock integrity and full audit trails.',
          workflow: [
            'POST /orders/checkout: per-item has_stock check → Order + OrderItems (price snapshot) → inventory.reduce_stock per item → SALE row in inventory_transactions → clear cart.',
            'POST /coupons/validate computes percent-capped or flat discounts with min-order guards before checkout.',
            'Payments: POST /payments + /payments/verify (Razorpay webhook path) → transactions row → PAYMENT_VERIFIED broadcast.',
            'Receipt: GET /orders/{id}/slip renders a ReportLab A4 PDF (customer + shop-manager copies) with a Code128 barcode.'
          ],
          details: 'Seeded with 1005 open-catalog products (Open Food Facts, Wikimedia) via an idempotent seeder.',
          category: 'storage'
        }
      ],
      connections: [
        { from: 'cam', to: 'api', protocol: 'HTTP multipart POST', label: 'Frame Upload' },
        { from: 'api', to: 'yolo', protocol: 'httpx → /predict · in-process fallback', label: 'Inference Pass' },
        { from: 'api', to: 'db', protocol: 'SQLAlchemy / psycopg', label: 'Atomic Cart & Stock Update' },
        { from: 'api', to: 'ws', protocol: 'WebSocket Broadcast', label: 'Push Commerce Events' }
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
    verifiedContribution: 'Built core Express.js backend services, TimescaleDB time-series ingestion pipeline for continuous sensor telemetry, Redis Pub/Sub event streaming, and revenue-share allocation models.',
    teamContext: 'Solo-built & self-owned project (hosted on my other GitHub account) — RVCE academic build; my focus: IoT telemetry ingestion, database modeling, and backend service boundaries.',
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
        'High-density time-series tables structured for energy meter telemetry.',
        'Benchmarked 150 req/s throughput with 250 ms p95 latency; ML client hardened with retries, exponential backoff, and a circuit breaker.'
      ],
      limitations: [
        'Automated billing, dynamic pricing ML models, and third-party payment gateways (Razorpay/Twilio) are documented architectural targets and not yet fully production-deployed.',
        'Project was evaluated as a software prototype with simulated smart-meter telemetry feeds rather than connected physical hardware grids.'
      ]
    },
    tradeoffs: [
      {
        dimension: 'Telemetry Ingestion',
        decision: 'MQTT pub/sub (Mosquitto) with a parallel HTTP ingestion endpoint',
        rationale: 'MQTT absorbs bursty smart-meter reports with QoS 1 and no per-reading HTTP handshake; the HTTP path keeps deployments without a broker fully functional.',
        alternative: 'HTTP-only ingestion — per-reading connection overhead and head-of-line blocking under bursty farm traffic.'
      },
      {
        dimension: 'Time-Series Storage',
        decision: 'TimescaleDB hypertable with a 1-week chunk interval',
        rationale: 'Automatic chunk partitioning keeps insert throughput flat as history grows and makes day/week/season window queries cheap without manual partition management.',
        alternative: 'Vanilla PostgreSQL table (bloats and slows under continuous telemetry) or a separate TS database (extra operational surface).'
      },
      {
        dimension: 'Realtime Distribution',
        decision: 'Redis Pub/Sub per-user channels + Socket.io on the API port',
        rationale: 'Consumers (alerts, anomaly checks, dashboards) subscribe to exactly the streams they need without touching the ingestion write path; Redis failure degrades gracefully to in-memory limiting.',
        alternative: 'Every consumer polling the tables directly — write amplification and stale dashboards.'
      }
    ],
    architectureFlow: {
      description: 'ESP32 meter readings through MQTT/HTTP ingestion into TimescaleDB hypertables, Redis Pub/Sub fan-out, and marketplace settlement workflows.',
      mermaid: `flowchart LR
  ESP["ESP32 Meter Node"] -->|"HTTP POST /api/v1/iot/ingest"| API["Express :3000 · Socket.io"]
  ESP -->|"MQTT solar/deviceId/data · QoS 1"| MQ["Mosquitto :1883"]
  MQ -->|"subscribe solar/+/data"| API
  API -->|"hypertable INSERT · 1-week chunks"| TS[("TimescaleDB — energy_readings")]
  API -->|"PUBLISH per-user event channels"| RD["Redis 7 Pub/Sub"]
  API <-->|"HTTP :8001 · predictions"| AI["solbridge-ai — XGBoost forecast"]
  APP["Expo App"] -->|"REST polling · TanStack Query"| API`,
      nodes: [
        {
          id: 'meter',
          label: 'Smart Meter / IoT Hub',
          sublabel: 'ESP32 Telemetry Node',
          role: 'ESP32-based sensor nodes sampling rooftop generation and household load — power_kw, voltage, current, temperature — and pushing readings upstream over lightweight protocols. The prototype runs against simulated feeds with the real ESP32 sketch shipped in the repo.',
          workflow: [
            'ESP32 sketch samples the panel/inverter and builds a JSON payload {power_kw, voltage, current, temperature, timestamp}.',
            'Primary path: HTTP POST to /api/v1/iot/ingest on the deployed backend; MQTT path: publish to solar/{deviceId}/data at QoS 1.',
            'Every reading becomes an immutable time-series fact downstream — the device never aggregates or buffers history locally.'
          ],
          details: 'Two ingestion paths are supported so deployments without an MQTT broker still work over plain HTTP.',
          category: 'client'
        },
        {
          id: 'mqtt',
          label: 'MQTT Broker',
          sublabel: 'Mosquitto · :1883',
          role: 'Eclipse Mosquitto broker decoupling bursty meter reporting from backend processing — no HTTP handshake overhead per reading, with topic wildcards per device.',
          workflow: [
            'Backend subscribes to solar/+/data and solar/+/status (QoS 1) so each device maps to its own topic lane.',
            'Per-reading pipeline: range-validate → broadcast live value → append to a 100-sample ring buffer → batch ML prediction calls → update device status.',
            'Results published back to devices on solar/{deviceId}/forecast and solar/{deviceId}/command topics.'
          ],
          details: 'Runs as a system Mosquitto service alongside the Docker Compose stack (commented out in compose by default).',
          category: 'gateway'
        },
        {
          id: 'express',
          label: 'Backend API Gateway',
          sublabel: 'Express · :3000 · Socket.io',
          role: 'Express.js API with 24 route modules under /api/v1 and Socket.io on the same port — owns auth, device registration, telemetry pipelines, the energy marketplace, and settlement logic.',
          workflow: [
            'Ingestion path (MQTT subscription or HTTP POST) validates and enriches each reading with device_id, timestamp, and measurements.',
            'Persists the reading to TimescaleDB, then publishes the enriched event to the Redis channel events:{eventType}:{user_id} (e.g. events:new_energy_data:{user_id}).',
            'Anomaly checks run after publish; dashboards consume live data via Socket.io while the mobile app polls REST through TanStack Query.',
            'Settlement enforces the revenue split in TransactionService: 45% host / 20% platform / 35% investors, written to investor_allocations.',
            'Dedicated ML service (solbridge-ai :8001, XGBoost) called for forecasting and energy matching with retries, exponential backoff, and a circuit breaker.'
          ],
          details: 'JWT auth with access + refresh tokens, bcryptjs hashing, email verification, Razorpay webhook at /payment. Benchmarked at 150 req/s with 250 ms p95 latency.',
          category: 'gateway'
        },
        {
          id: 'timescale',
          label: 'TimescaleDB',
          sublabel: 'Hypertable · 1-week chunks',
          role: 'PostgreSQL 16 + TimescaleDB: the energy_readings hypertable auto-partitions telemetry into 1-week chunks, keeping insert throughput flat as history grows.',
          workflow: [
            'Telemetry inserts land in the energy_readings hypertable (create_hypertable with chunk_time_interval = 1 week) — no manual partition management.',
            '~20 relational tables surround it: users, devices, wallets, energy_listings, energy_transactions, investor_allocations, daily_statements.',
            'Time-range and window queries across days, weeks, and seasons power dashboards and settlement statements.'
          ],
          details: 'Deployed as timescale/timescaledb:latest-pg16 on :5433 alongside a plain postgres:16 on :5434 in Docker Compose.',
          category: 'storage'
        },
        {
          id: 'redis',
          label: 'Redis 7 Pub/Sub',
          sublabel: 'Event Bus & Rate Limits',
          role: 'In-memory bus decoupling telemetry persistence from alerting and analytics consumers — plus rate limiting with a graceful in-memory fallback.',
          workflow: [
            'The ingestion pipeline publishes enriched readings to per-user channels (events:{eventType}:{user_id}).',
            'Downstream consumers (alerts, anomaly detection, dashboards) subscribe without ever touching the write path.',
            'Doubles as the rate-limit store; if Redis is down the backend degrades to an in-memory limiter instead of failing.'
          ],
          details: 'redis:7 container on :6380 → 6379 inside the isolated solar_network compose network.',
          category: 'edge-sync'
        }
      ],
      connections: [
        { from: 'meter', to: 'mqtt', protocol: 'MQTT :1883 · QoS 1', label: 'Sensor Data Stream' },
        { from: 'mqtt', to: 'express', protocol: 'solar/+/data subscribe', label: 'Message Consume' },
        { from: 'express', to: 'timescale', protocol: 'pg INSERT (hypertable)', label: 'Time-Series Persist' },
        { from: 'express', to: 'redis', protocol: 'PUBLISH events:*', label: 'Event Fan-out' }
      ]
    },
    githubUrl: 'https://github.com/Akash-S-G/Sol-Bridge'
  },
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
      { name: 'Python', verifiedUse: 'FastAPI backends, llama.cpp bindings, OpenCV pipelines, and ML workflows', relatedProjects: ['pihub', 'smart-cart'] },
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
      { name: 'FastAPI', verifiedUse: 'Primary framework for PIHUB edge nodes and Smart Cart vision API', relatedProjects: ['pihub', 'smart-cart'] },
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
      { name: 'Computer Vision (OpenCV)', verifiedUse: 'Frame pre-processing, real-time camera feeds, and object detection pipelines', relatedProjects: ['smart-cart'] },
      { name: 'YOLO (YOLOv8 / YOLO11n)', verifiedUse: 'Object detection in retail checkout and product recognition', relatedProjects: ['smart-cart'] },
      { name: 'Scikit-Learn', verifiedUse: 'Classical ML models, feature engineering, and prototype experimentation', relatedProjects: [] }
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
      { name: 'Docker & Compose', verifiedUse: 'Multi-container orchestration for distributed hubs and microservice stacks', relatedProjects: ['pihub', 'sol-bridge'] },
      { name: 'Git & GitHub', verifiedUse: 'Version control, branch management, pull request workflows, CI configuration', relatedProjects: ['pihub', 'sol-bridge', 'smart-cart'] },
      { name: 'MQTT', verifiedUse: 'Lightweight IoT sensor protocol for continuous telemetry streaming', relatedProjects: ['sol-bridge'] }
    ]
  },
  {
    category: 'CS Fundamentals',
    description: 'Core computer science principles guiding design and problem solving.',
    skills: [
      { name: 'Data Structures & Algorithms', verifiedUse: '450+ competitive problems solved across LeetCode and Codeforces', relatedProjects: [] },
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
    title: 'Winner — Technical Quiz Challenge',
    category: 'Competitive CS Knowledge',
    description: 'Secured First Place at the inter-collegiate Technical Quiz Challenge held at Nagarjuna College, demonstrating depth across computing fundamentals.',
  },
  {
    title: 'Winner — Tech Arena Event',
    category: 'Competitive CS Knowledge',
    description: 'Secured First Place at the Tech Arena event conducted at KLE Society Degree College, Nagarbhavi.',
  }
];


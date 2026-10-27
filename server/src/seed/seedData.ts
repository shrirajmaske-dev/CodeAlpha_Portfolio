import { Skill, Project, AIKnowledgeBase } from '../types/index.js';

export const initialSkills: Skill[] = [
  // Languages
  {
    id: 'skill-1',
    name: 'TypeScript',
    category: 'languages',
    proficiency_level: 96,
    icon_name: 'FileCode2',
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-2',
    name: 'Python',
    category: 'languages',
    proficiency_level: 94,
    icon_name: 'Terminal',
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-3',
    name: 'Go',
    category: 'languages',
    proficiency_level: 88,
    icon_name: 'Cpu',
    display_order: 3,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-4',
    name: 'SQL',
    category: 'languages',
    proficiency_level: 92,
    icon_name: 'Database',
    display_order: 4,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-5',
    name: 'Rust',
    category: 'languages',
    proficiency_level: 82,
    icon_name: 'ShieldCheck',
    display_order: 5,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-6',
    name: 'JavaScript',
    category: 'languages',
    proficiency_level: 98,
    icon_name: 'Code',
    display_order: 6,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Frontend
  {
    id: 'skill-7',
    name: 'React',
    category: 'frontend',
    proficiency_level: 98,
    icon_name: 'Atom',
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-8',
    name: 'Next.js',
    category: 'frontend',
    proficiency_level: 95,
    icon_name: 'Layers',
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-9',
    name: 'Tailwind CSS',
    category: 'frontend',
    proficiency_level: 96,
    icon_name: 'Palette',
    display_order: 3,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-10',
    name: 'Zustand / Redux',
    category: 'frontend',
    proficiency_level: 92,
    icon_name: 'Boxes',
    display_order: 4,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-11',
    name: 'WebSockets / SSE',
    category: 'frontend',
    proficiency_level: 90,
    icon_name: 'Radio',
    display_order: 5,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Backend
  {
    id: 'skill-12',
    name: 'Node.js & Express',
    category: 'backend',
    proficiency_level: 96,
    icon_name: 'Server',
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-13',
    name: 'FastAPI',
    category: 'backend',
    proficiency_level: 90,
    icon_name: 'Zap',
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-14',
    name: 'PostgreSQL',
    category: 'backend',
    proficiency_level: 94,
    icon_name: 'Database',
    display_order: 3,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-15',
    name: 'Redis',
    category: 'backend',
    proficiency_level: 90,
    icon_name: 'Flame',
    display_order: 4,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-16',
    name: 'GraphQL',
    category: 'backend',
    proficiency_level: 86,
    icon_name: 'Network',
    display_order: 5,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // AI & ML
  {
    id: 'skill-17',
    name: 'Google GenAI SDK',
    category: 'ai_ml',
    proficiency_level: 96,
    icon_name: 'Sparkles',
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-18',
    name: 'RAG Architectures',
    category: 'ai_ml',
    proficiency_level: 94,
    icon_name: 'Brain',
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-19',
    name: 'Vector Embeddings & pgvector',
    category: 'ai_ml',
    proficiency_level: 92,
    icon_name: 'Binary',
    display_order: 3,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-20',
    name: 'LangChain / LlamaIndex',
    category: 'ai_ml',
    proficiency_level: 89,
    icon_name: 'GitFork',
    display_order: 4,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-21',
    name: 'PyTorch Fundamentals',
    category: 'ai_ml',
    proficiency_level: 84,
    icon_name: 'Activity',
    display_order: 5,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Cloud & DevOps
  {
    id: 'skill-22',
    name: 'Docker',
    category: 'cloud_devops',
    proficiency_level: 94,
    icon_name: 'Container',
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-23',
    name: 'Kubernetes',
    category: 'cloud_devops',
    proficiency_level: 86,
    icon_name: 'Anchor',
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-24',
    name: 'AWS (ECS, S3, RDS, Lambda)',
    category: 'cloud_devops',
    proficiency_level: 90,
    icon_name: 'Cloud',
    display_order: 3,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-25',
    name: 'Cloudflare Workers & Edge',
    category: 'cloud_devops',
    proficiency_level: 92,
    icon_name: 'Globe',
    display_order: 4,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-26',
    name: 'CI/CD GitHub Actions',
    category: 'cloud_devops',
    proficiency_level: 94,
    icon_name: 'Workflow',
    display_order: 5,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'synthetix-rag',
    title: 'Synthetix RAG Mesh',
    tagline: 'Enterprise-grade multi-agent autonomous retrieval & reasoning mesh with hybrid vector search and strict verifiable provenance.',
    category: 'ai_systems',
    description: 'Synthetix RAG is an autonomous reasoning engine designed to orchestrate complex domain-specific research tasks. Built for enterprise teams requiring zero hallucination tolerance, it integrates dense semantic retrieval via pgvector, BM25 keyword matching with reciprocal rank fusion (RRF), and recursive validation pipelines using Google Gemini models.',
    architecture_overview: 'The architecture implements an asynchronous ingestion pipeline streaming partitioned markdown and PDF documents into an embedding worker queue. High-dimensional vector embeddings are computed via Gemini text-embedding models and stored in PostgreSQL with pgvector indexes. Queries undergo multi-hop decomposition into sub-queries routed to parallel agent workers. A synthesized answer is evaluated by a reflection judge before delivery over WebSockets.',
    challenges_and_solutions: [
      {
        challenge: 'Mitigating model hallucination in domain-specific financial and medical documentation.',
        solution: 'Introduced strict schema-constrained outputs combined with citation grounding hashes that map every asserted fact to precise token offsets in the original context documents.'
      },
      {
        challenge: 'High query latency on large vector catalogs with multi-faceted filtering.',
        solution: 'Engineered partitioned HNSW index hierarchies with pre-filtering on tenant tags, reducing p99 latency from 1,280ms to 84ms.'
      },
      {
        challenge: 'Rate limit bottlenecks when executing concurrent multi-hop sub-queries.',
        solution: 'Built an adaptive token-bucket rate limiter with exponential jitter and local vector cache caching deterministic prompt completions.'
      }
    ],
    technologies: ['Python', 'TypeScript', 'FastAPI', 'Google GenAI SDK', 'PostgreSQL', 'pgvector', 'Redis', 'Docker'],
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://synthetix-rag.demo.internal',
    repo_url: 'https://github.com/kairosvance/synthetix-rag-mesh',
    is_featured: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-2',
    slug: 'aegis-flow',
    title: 'Aegis Flow Collaborative Engine',
    tagline: 'Real-time distributed workspace orchestrator supporting CRDT conflict resolution, live cursor multiplexing, and dynamic DAG execution.',
    category: 'full_stack',
    description: 'Aegis Flow provides distributed engineering and design teams with a unified canvas for live workflow choreography. Features include decentralized peer-to-peer state synchronization, distributed lock management, transactional undo/redo trees, and automated execution of cloud worker tasks directly from visual DAG nodes.',
    architecture_overview: 'Fronted by React with canvas rendering and Zustand state persistence. Real-time changes are synchronized across nodes using Yjs CRDTs encapsulated over multiplexed WebSockets with binary protocol buffers. The Node.js/Express backend handles tenant authorization, snapshot compaction into PostgreSQL, and event streaming via Redis Streams to worker pods.',
    challenges_and_solutions: [
      {
        challenge: 'Resolving simultaneous concurrent state modifications on complex nested graph nodes without data corruption.',
        solution: 'Adopted Conflict-Free Replicated Data Types (Yjs CRDT) combined with deterministic vector clocks for state compaction.'
      },
      {
        challenge: 'Frame rate degradation when rendering 10,000+ interactive graph entities on standard DOM.',
        solution: 'Migrated node rendering to hardware-accelerated Canvas with spatial indexing (R-Tree), achieving consistent 60 FPS viewport navigation.'
      },
      {
        challenge: 'Graceful disconnection handling and offline-first replay sync.',
        solution: 'Implemented IndexedDB local mutation logs that batch-replay with idempotency keys upon network re-establishment.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Yjs', 'WebSockets', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://aegisflow.demo.internal',
    repo_url: 'https://github.com/kairosvance/aegis-flow-engine',
    is_featured: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-3',
    slug: 'hyper-gateway',
    title: 'HyperGateway Distributed Edge Proxy',
    tagline: 'Ultra-low-latency edge proxy and reverse API gateway featuring dynamic eBPF-inspired traffic shaping, JWT verification, and sliding window rate limiting.',
    category: 'infrastructure',
    description: 'HyperGateway is an open-source reverse proxy engineered for microservice topographies requiring sub-millisecond route resolution. Provides automated SSL termination, distributed sliding-window rate limiting backed by Redis, dynamic circuit breaking with exponential backoff, and end-to-end distributed tracing via OpenTelemetry.',
    architecture_overview: 'Constructed in Go and TypeScript with a hybrid data-plane and control-plane split. The data plane maintains in-memory radix tree routing with zero allocations in the hot path. The control plane exposes an Express REST management API and Supabase-backed event webhooks to reconfigure routing rules with zero downtime.',
    challenges_and_solutions: [
      {
        challenge: 'Memory allocation overhead in request parsing during high volumetric traffic spikes (100k+ RPS).',
        solution: 'Designed a zero-copy byte buffer pool and non-blocking radix tree router, decreasing GC pauses from 14ms to under 0.2ms.'
      },
      {
        challenge: 'Synchronizing sliding-window rate limit counters across 50 global edge locations.',
        solution: 'Constructed two-tier token bucket counters: atomic in-memory local buckets synchronized asynchronously with Redis clusters using pipeline scripts.'
      }
    ],
    technologies: ['Go', 'TypeScript', 'Node.js', 'Redis', 'Docker', 'OpenTelemetry', 'Kubernetes'],
    thumbnail_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://hypergateway.demo.internal',
    repo_url: 'https://github.com/kairosvance/hyper-gateway-proxy',
    is_featured: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-4',
    slug: 'omnivision-ai',
    title: 'OmniVision Edge Detection Mesh',
    tagline: 'Distributed multi-modal vision pipeline for real-time video stream telemetry, anomaly detection, and semantic visual tagging.',
    category: 'ai_systems',
    description: 'OmniVision deploys lightweight inference models to edge appliances to ingest multi-channel RTSP streams. Provides instant zero-shot categorization, optical flow velocity calculation, and structured metadata output ingested into a central analytical data lake.',
    architecture_overview: 'Edge micro-nodes run quantized TensorRT models, relaying JSON bounding box coordinates and semantic metadata over lightweight gRPC channels. The central control node (Express + PostgreSQL) aggregates event streams, verifies anomaly confidence thresholds, and triggers automated alerting hooks.',
    challenges_and_solutions: [
      {
        challenge: 'Extreme network bandwidth consumption streaming continuous 4K video feeds to central servers.',
        solution: 'Pushed spatial inference to edge devices, transmitting only cryptographic visual hashes and structured bounding vectors, reducing uplink bandwidth by 98.4%.'
      },
      {
        challenge: 'Frame dropped bottlenecks under variable lighting conditions and model inference spikes.',
        solution: 'Built dynamic frame-skipping with optical flow interpolation, preserving perceptual accuracy while ensuring zero latency drift.'
      }
    ],
    technologies: ['Python', 'TypeScript', 'PyTorch', 'Node.js', 'FastAPI', 'gRPC', 'PostgreSQL', 'Docker'],
    thumbnail_url: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://omnivision.demo.internal',
    repo_url: 'https://github.com/kairosvance/omnivision-edge',
    is_featured: false,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-5',
    slug: 'pulse-metrics',
    title: 'PulseMetrics High-Throughput Analytics',
    tagline: 'High-volume event streaming and time-series telemetry platform processing billions of data points with instant OLAP aggregations.',
    category: 'full_stack',
    description: 'PulseMetrics provides developers with granular observability into application performance, web vitals, and user interaction trajectories. Features real-time anomaly detection, customizable KPI canvas boards, and sub-second SQL queries over terabytes of event logs.',
    architecture_overview: 'Event collectors ingest telemetry through high-concurrency Node.js endpoints that queue into Kafka/Redis buffers. Data is batch-written to ClickHouse and PostgreSQL, with a React + Tailwind analytical dashboard rendering real-time metrics with SVG canvas charts.',
    challenges_and_solutions: [
      {
        challenge: 'Handling sudden unannounced traffic surges exceeding 50,000 telemetry events per second.',
        solution: 'Built backpressure-aware ingestion buffers using Redis memory streams, batching disk commits every 250ms.'
      },
      {
        challenge: 'Rendering interactive timeline charts with hundreds of thousands of data points on consumer browsers.',
        solution: 'Applied Largest-Triangle-Three-Buckets (LTTB) downsampling algorithm on the backend to reduce payload size to 1,000 representative points without visual fidelity loss.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://pulsemetrics.demo.internal',
    repo_url: 'https://github.com/kairosvance/pulse-metrics-telemetry',
    is_featured: false,
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-6',
    slug: 'kubecraft-cli',
    title: 'KubeCraft CLI & Developer Toolkit',
    tagline: 'Declarative CLI utility and local environment orchestrator for ephemeral microservice testbeds and automated cloud migrations.',
    category: 'infrastructure',
    description: 'KubeCraft streamlines the developer lifecycle by synthesizing multi-service Kubernetes manifests into localized Docker Compose sandboxes with zero configuration drift. Built for engineering teams transitioning to cloud-native topologies.',
    architecture_overview: 'Engineered in TypeScript with Node.js and compiled into standalone binaries using pkg. Implements interactive terminal UI with ink, real-time log tailing, automated port conflict resolution, and one-command staging cluster spin-ups.',
    challenges_and_solutions: [
      {
        challenge: 'High ramp-up time for junior engineers navigating thousands of lines of Kubernetes YAML.',
        solution: 'Developed an interactive TUI (Terminal User Interface) with intelligent syntax validation and instant dry-run diffing.'
      },
      {
        challenge: 'Port contention and dangling container orphans during forced CLI exits.',
        solution: 'Implemented robust OS POSIX signal interception (SIGINT, SIGTERM) with cleanup routines guaranteeing complete namespace tear-downs.'
      }
    ],
    technologies: ['TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'Go', 'Zod'],
    thumbnail_url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://kubecraft.demo.internal',
    repo_url: 'https://github.com/kairosvance/kubecraft-cli',
    is_featured: false,
    display_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialKnowledgeBase: AIKnowledgeBase[] = [
  {
    id: 'kb-1',
    topic: 'Kairos Vance - Executive Profile & Philosophy',
    content: 'Kairos Vance is a Senior Full-Stack Engineer and Autonomous AI Systems Architect with over 8 years of professional experience building resilient, scalable distributed platforms and production machine learning applications. Core architectural principles include: (1) Predictable Simplicity over Accidental Complexity, (2) Strong Type Guarantees from client UI to database schema, (3) Performance as a feature, not an afterthought, (4) Zero-Trust security and defense-in-depth, and (5) Pragmatic AI deployment focusing on grounded, verifiable outputs.',
    metadata: { type: 'profile', relevance: 'primary' },
    created_at: new Date().toISOString()
  },
  {
    id: 'kb-2',
    topic: 'Technical Stack & Proficiencies',
    content: 'Languages: TypeScript, Python, Go, SQL, Rust, JavaScript. Frontend: React 18+, Next.js, Tailwind CSS, Zustand, Redux Toolkit, WebSockets, HTML5 Canvas, Accessible UI/UX design (WCAG AA). Backend: Node.js, Express, FastAPI, PostgreSQL, Redis, GraphQL, gRPC, Event-driven microservices. AI & Machine Learning: Google GenAI SDK (Gemini 2.5 Flash / Pro), RAG pipelines, pgvector, Reciprocal Rank Fusion, LangChain, PyTorch, Embeddings, Structured Output Schema enforcement. Cloud & DevOps: Docker, Kubernetes, AWS (ECS, S3, RDS, Lambda), Cloudflare Workers, GitHub Actions CI/CD.',
    metadata: { type: 'skills', relevance: 'primary' },
    created_at: new Date().toISOString()
  },
  {
    id: 'kb-3',
    topic: 'Synthetix RAG Mesh - Architecture & Trade-offs',
    content: 'Project: Synthetix RAG Mesh. Domain: AI Systems. Category: Autonomous Retrieval & Reasoning. Key decisions: Selected pgvector on PostgreSQL for hybrid dense and keyword retrieval rather than separate isolated vector databases (e.g. Pinecone) to maintain atomic ACID transactions alongside transactional business records. Utilized Google Gemini with strict JSON schema outputs to enforce citation token anchors. Overcame hallucination through multi-hop query decomposition and an automated reflection verification agent.',
    metadata: { type: 'project_deepdive', project_slug: 'synthetix-rag' },
    created_at: new Date().toISOString()
  },
  {
    id: 'kb-4',
    topic: 'Aegis Flow - Architecture & Concurrency',
    content: 'Project: Aegis Flow. Domain: Full-Stack Real-time Systems. Concurrency resolution: Implemented Yjs Conflict-Free Replicated Data Types (CRDTs) over multiplexed WebSockets instead of Operational Transformation (OT) because CRDTs require zero centralized lock coordination and cleanly support offline-first local mutation replay. Performance optimization: Replaced DOM-heavy SVG nodes with hardware-accelerated HTML5 Canvas with spatial R-tree indexing, sustaining 60 FPS under 10,000+ interactive nodes.',
    metadata: { type: 'project_deepdive', project_slug: 'aegis-flow' },
    created_at: new Date().toISOString()
  },
  {
    id: 'kb-5',
    topic: 'HyperGateway - Distributed Edge Architecture',
    content: 'Project: HyperGateway. Domain: Infrastructure & Developer Tools. Low-latency edge proxy built with Go and TypeScript. Key architectural decisions: Split architecture into a zero-allocation data plane in Go utilizing an in-memory radix tree and non-blocking sync.Pool buffers, and a control plane in Node.js/Express with Supabase webhooks for declarative configuration updates. Reduced sliding-window rate limit contention using two-tier local token buckets synced asynchronously with Redis.',
    metadata: { type: 'project_deepdive', project_slug: 'hyper-gateway' },
    created_at: new Date().toISOString()
  },
  {
    id: 'kb-6',
    topic: 'Career Timeline & Achievements',
    content: 'Milestones:\n2023 - Present: Principal AI Systems Engineer & Full-Stack Architect at NeuraGrid Technologies. Led design of enterprise RAG orchestration platform serving 400k+ daily queries, reduced latency by 68%, and mentored 12 engineers.\n2020 - 2023: Senior Software Engineer at CloudScale Distributed Systems. Architected real-time WebSocket infrastructure handling 120,000 concurrent socket connections; spearheaded migration to Kubernetes and automated CI/CD.\n2018 - 2020: Full-Stack Developer at Apex Digital Labs. Built modern React/TypeScript single page applications, GraphQL microservices, and high-conversion client platforms.\nEducation: Bachelor of Science in Computer Science & Applied Mathematics, Magna Cum Laude. Certified AWS Solutions Architect & Kubernetes Certified Application Developer (CKAD).',
    metadata: { type: 'experience', relevance: 'primary' },
    created_at: new Date().toISOString()
  },
  {
    id: 'kb-7',
    topic: 'Availability & Collaboration',
    content: 'Kairos is currently open to select high-impact technical leadership opportunities, advisory roles, and strategic consulting contracts in Full-Stack Web Architecture, Distributed Systems, and Generative AI Systems Engineering. Direct contact can be initiated via the portfolio contact portal or through verified channels.',
    metadata: { type: 'contact', relevance: 'secondary' },
    created_at: new Date().toISOString()
  }
];

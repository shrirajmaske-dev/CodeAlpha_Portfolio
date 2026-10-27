-- =========================================================================
-- Developer Portfolio & AI Project Showcase Platform - Production Seed Data
-- =========================================================================

-- Clear existing seed items (Optional/Idempotent)
DELETE FROM public.skills;
DELETE FROM public.projects;
DELETE FROM public.ai_knowledge_base;

-- 1. Insert Skills
INSERT INTO public.skills (name, category, proficiency_level, icon_name, display_order, is_featured) VALUES
-- Languages
('TypeScript', 'languages', 96, 'FileCode2', 1, true),
('Python', 'languages', 94, 'Terminal', 2, true),
('Go', 'languages', 88, 'Cpu', 3, true),
('SQL', 'languages', 92, 'Database', 4, true),
('Rust', 'languages', 82, 'ShieldCheck', 5, false),
('JavaScript', 'languages', 98, 'Code', 6, true),

-- Frontend
('React', 'frontend', 98, 'Atom', 1, true),
('Next.js', 'frontend', 95, 'Layers', 2, true),
('Tailwind CSS', 'frontend', 96, 'Palette', 3, true),
('Zustand / Redux', 'frontend', 92, 'Boxes', 4, true),
('WebSockets / SSE', 'frontend', 90, 'Radio', 5, false),

-- Backend
('Node.js & Express', 'backend', 96, 'Server', 1, true),
('FastAPI', 'backend', 90, 'Zap', 2, true),
('PostgreSQL', 'backend', 94, 'Database', 3, true),
('Redis', 'backend', 90, 'Flame', 4, true),
('GraphQL', 'backend', 86, 'Network', 5, false),

-- AI / ML
('Google GenAI SDK', 'ai_ml', 96, 'Sparkles', 1, true),
('RAG Architectures', 'ai_ml', 94, 'Brain', 2, true),
('Vector Embeddings & pgvector', 'ai_ml', 92, 'Binary', 3, true),
('LangChain / LlamaIndex', 'ai_ml', 89, 'GitFork', 4, true),
('PyTorch Fundamentals', 'ai_ml', 84, 'Activity', 5, false),

-- Cloud & DevOps
('Docker', 'cloud_devops', 94, 'Container', 1, true),
('Kubernetes', 'cloud_devops', 86, 'Anchor', 2, true),
('AWS (ECS, S3, RDS, Lambda)', 'cloud_devops', 90, 'Cloud', 3, true),
('Cloudflare Workers & Edge', 'cloud_devops', 92, 'Globe', 4, true),
('CI/CD GitHub Actions', 'cloud_devops', 94, 'Workflow', 5, true);

-- 2. Insert Projects
INSERT INTO public.projects (
    slug,
    title,
    tagline,
    category,
    description,
    architecture_overview,
    challenges_and_solutions,
    technologies,
    thumbnail_url,
    banner_url,
    demo_url,
    repo_url,
    is_featured,
    display_order
) VALUES
(
    'synthetix-rag',
    'Synthetix RAG Mesh',
    'Enterprise-grade multi-agent autonomous retrieval & reasoning mesh with hybrid vector search and strict verifiable provenance.',
    'ai_systems',
    'Synthetix RAG is an autonomous reasoning engine designed to orchestrate complex domain-specific research tasks. Built for enterprise teams requiring zero hallucination tolerance, it integrates dense semantic retrieval via pgvector, BM25 keyword matching with reciprocal rank fusion (RRF), and recursive validation pipelines using Google Gemini models.',
    'The architecture implements an asynchronous ingestion pipeline streaming partitioned markdown and PDF documents into an embedding worker queue. High-dimensional vector embeddings are computed via Gemini text-embedding models and stored in PostgreSQL with pgvector indexes. Queries undergo multi-hop decomposition into sub-queries routed to parallel agent workers. A synthesized answer is evaluated by a reflection judge before delivery over WebSockets.',
    '[
        {
            "challenge": "Mitigating model hallucination in domain-specific financial and medical documentation.",
            "solution": "Introduced strict schema-constrained outputs combined with citation grounding hashes that map every asserted fact to precise token offsets in the original context documents."
        },
        {
            "challenge": "High query latency on large vector catalogs with multi-faceted filtering.",
            "solution": "Engineered partitioned HNSW index hierarchies with pre-filtering on tenant tags, reducing p99 latency from 1,280ms to 84ms."
        },
        {
            "challenge": "Rate limit bottlenecks when executing concurrent multi-hop sub-queries.",
            "solution": "Built an adaptive token-bucket rate limiter with exponential jitter and local vector cache caching deterministic prompt completions."
        }
    ]'::jsonb,
    ARRAY['Python', 'TypeScript', 'FastAPI', 'Google GenAI SDK', 'PostgreSQL', 'pgvector', 'Redis', 'Docker'],
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
    'https://synthetix-rag.demo.internal',
    'https://github.com/alexvance/synthetix-rag-mesh',
    true,
    1
),
(
    'aegis-flow',
    'Aegis Flow Collaborative Engine',
    'Real-time distributed workspace orchestrator supporting CRDT conflict resolution, live cursor multiplexing, and dynamic DAG execution.',
    'full_stack',
    'Aegis Flow provides distributed engineering and design teams with a unified canvas for live workflow choreography. Features include decentralized peer-to-peer state synchronization, distributed lock management, transactional undo/redo trees, and automated execution of cloud worker tasks directly from visual DAG nodes.',
    'Fronted by React with canvas rendering and Zustand state persistence. Real-time changes are synchronized across nodes using Yjs CRDTs encapsulated over multiplexed WebSockets with binary protocol buffers. The Node.js/Express backend handles tenant authorization, snapshot compaction into PostgreSQL, and event streaming via Redis Streams to worker pods.',
    '[
        {
            "challenge": "Resolving simultaneous concurrent state modifications on complex nested graph nodes without data corruption.",
            "solution": "Adopted Conflict-Free Replicated Data Types (Yjs CRDT) combined with deterministic vector clocks for state compaction."
        },
        {
            "challenge": "Frame rate degradation when rendering 10,000+ interactive graph entities on standard DOM.",
            "solution": "Migrated node rendering to hardware-accelerated Canvas with spatial indexing (R-Tree), achieving consistent 60 FPS viewport navigation."
        },
        {
            "challenge": "Graceful disconnection handling and offline-first replay sync.",
            "solution": "Implemented IndexedDB local mutation logs that batch-replay with idempotency keys upon network re-establishment."
        }
    ]'::jsonb,
    ARRAY['React', 'TypeScript', 'Node.js', 'Express', 'Yjs', 'WebSockets', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
    'https://aegisflow.demo.internal',
    'https://github.com/alexvance/aegis-flow-engine',
    true,
    2
),
(
    'hyper-gateway',
    'HyperGateway Distributed Edge Proxy',
    'Ultra-low-latency edge proxy and reverse API gateway featuring dynamic eBPF-inspired traffic shaping, JWT verification, and sliding window rate limiting.',
    'infrastructure',
    'HyperGateway is an open-source reverse proxy engineered for microservice topographies requiring sub-millisecond route resolution. Provides automated SSL termination, distributed sliding-window rate limiting backed by Redis, dynamic circuit breaking with exponential backoff, and end-to-end distributed tracing via OpenTelemetry.',
    'Constructed in Go and TypeScript with a hybrid data-plane and control-plane split. The data plane maintains in-memory radix tree routing with zero allocations in the hot path. The control plane exposes an Express REST management API and Supabase-backed event webhooks to reconfigure routing rules with zero downtime.',
    '[
        {
            "challenge": "Memory allocation overhead in request parsing during high volumetric traffic spikes (100k+ RPS).",
            "solution": "Designed a zero-copy byte buffer pool and non-blocking radix tree router, decreasing GC pauses from 14ms to under 0.2ms."
        },
        {
            "challenge": "Synchronizing sliding-window rate limit counters across 50 global edge locations.",
            "solution": "Constructed two-tier token bucket counters: atomic in-memory local buckets synchronized asynchronously with Redis clusters using pipeline scripts."
        }
    ]'::jsonb,
    ARRAY['Go', 'TypeScript', 'Node.js', 'Redis', 'Docker', 'OpenTelemetry', 'Kubernetes'],
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    'https://hypergateway.demo.internal',
    'https://github.com/alexvance/hyper-gateway-proxy',
    true,
    3
),
(
    'omnivision-ai',
    'OmniVision Edge Detection Mesh',
    'Distributed multi-modal vision pipeline for real-time video stream telemetry, anomaly detection, and semantic visual tagging.',
    'ai_systems',
    'OmniVision deploys lightweight inference models to edge appliances to ingest multi-channel RTSP streams. Provides instant zero-shot categorization, optical flow velocity calculation, and structured metadata output ingested into a central analytical data lake.',
    'Edge micro-nodes run quantized TensorRT models, relaying JSON bounding box coordinates and semantic metadata over lightweight gRPC channels. The central control node (Express + PostgreSQL) aggregates event streams, verifies anomaly confidence thresholds, and triggers automated alerting hooks.',
    '[
        {
            "challenge": "Extreme network bandwidth consumption streaming continuous 4K video feeds to central servers.",
            "solution": "Pushed spatial inference to edge devices, transmitting only cryptographic visual hashes and structured bounding vectors, reducing uplink bandwidth by 98.4%."
        },
        {
            "challenge": "Frame dropped bottlenecks under variable lighting conditions and model inference spikes.",
            "solution": "Built dynamic frame-skipping with optical flow interpolation, preserving perceptual accuracy while ensuring zero latency drift."
        }
    ]'::jsonb,
    ARRAY['Python', 'TypeScript', 'PyTorch', 'Node.js', 'FastAPI', 'gRPC', 'PostgreSQL', 'Docker'],
    'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    'https://omnivision.demo.internal',
    'https://github.com/alexvance/omnivision-edge',
    false,
    4
),
(
    'pulse-metrics',
    'PulseMetrics High-Throughput Analytics',
    'High-volume event streaming and time-series telemetry platform processing billions of data points with instant OLAP aggregations.',
    'full_stack',
    'PulseMetrics provides developers with granular observability into application performance, web vitals, and user interaction trajectories. Features real-time anomaly detection, customizable KPI canvas boards, and sub-second SQL queries over terabytes of event logs.',
    'Event collectors ingest telemetry through high-concurrency Node.js endpoints that queue into Kafka/Redis buffers. Data is batch-written to ClickHouse and PostgreSQL, with a React + Tailwind analytical dashboard rendering real-time metrics with SVG canvas charts.',
    '[
        {
            "challenge": "Handling sudden unannounced traffic surges exceeding 50,000 telemetry events per second.",
            "solution": "Built backpressure-aware ingestion buffers using Redis memory streams, batching disk commits every 250ms."
        },
        {
            "challenge": "Rendering interactive timeline charts with hundreds of thousands of data points on consumer browsers.",
            "solution": "Applied Largest-Triangle-Three-Buckets (LTTB) downsampling algorithm on the backend to reduce payload size to 1,000 representative points without visual fidelity loss."
        }
    ]'::jsonb,
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    'https://pulsemetrics.demo.internal',
    'https://github.com/alexvance/pulse-metrics-telemetry',
    false,
    5
),
(
    'kubecraft-cli',
    'KubeCraft CLI & Developer Toolkit',
    'Declarative CLI utility and local environment orchestrator for ephemeral microservice testbeds and automated cloud migrations.',
    'infrastructure',
    'KubeCraft streamlines the developer lifecycle by synthesizing multi-service Kubernetes manifests into localized Docker Compose sandboxes with zero configuration drift. Built for engineering teams transitioning to cloud-native topologies.',
    'Engineered in TypeScript with Node.js and compiled into standalone binaries using pkg. Implements interactive terminal UI with ink, real-time log tailing, automated port conflict resolution, and one-command staging cluster spin-ups.',
    '[
        {
            "challenge": "High ramp-up time for junior engineers navigating thousands of lines of Kubernetes YAML.",
            "solution": "Developed an interactive TUI (Terminal User Interface) with intelligent syntax validation and instant dry-run diffing."
        },
        {
            "challenge": "Port contention and dangling container orphans during forced CLI exits.",
            "solution": "Implemented robust OS POSIX signal interception (SIGINT, SIGTERM) with cleanup routines guaranteeing complete namespace tear-downs."
        }
    ]'::jsonb,
    ARRAY['TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'Go', 'Zod'],
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
    'https://kubecraft.demo.internal',
    'https://github.com/alexvance/kubecraft-cli',
    false,
    6
);

-- 3. Insert AI Knowledge Base Grounding Records
INSERT INTO public.ai_knowledge_base (topic, content, metadata) VALUES
(
    'Alex Vance - Executive Profile & Philosophy',
    'Alex Vance is a Senior Full-Stack Engineer and AI Systems Architect with over 8 years of professional experience building resilient, scalable distributed platforms and production machine learning applications. Core architectural principles include: (1) Predictable Simplicity over Accidental Complexity, (2) Strong Type Guarantees from client UI to database schema, (3) Performance as a feature, not an afterthought, (4) Zero-Trust security and defense-in-depth, and (5) Pragmatic AI deployment focusing on grounded, verifiable outputs.',
    '{"type": "profile", "relevance": "primary"}'::jsonb
),
(
    'Technical Stack & Proficiencies',
    'Languages: TypeScript, Python, Go, SQL, Rust, JavaScript. Frontend: React 18+, Next.js, Tailwind CSS, Zustand, Redux Toolkit, WebSockets, HTML5 Canvas, Accessible UI/UX design (WCAG AA). Backend: Node.js, Express, FastAPI, PostgreSQL, Redis, GraphQL, gRPC, Event-driven microservices. AI & Machine Learning: Google GenAI SDK (Gemini 2.5 Flash / Pro), RAG pipelines, pgvector, Reciprocal Rank Fusion, LangChain, PyTorch, Embeddings, Structured Output Schema enforcement. Cloud & DevOps: Docker, Kubernetes, AWS (ECS, S3, RDS, Lambda), Cloudflare Workers, GitHub Actions CI/CD.',
    '{"type": "skills", "relevance": "primary"}'::jsonb
),
(
    'Synthetix RAG Mesh - Architecture & Trade-offs',
    'Project: Synthetix RAG Mesh. Domain: AI Systems. Category: Autonomous Retrieval & Reasoning. Key decisions: Selected pgvector on PostgreSQL for hybrid dense and keyword retrieval rather than separate isolated vector databases (e.g. Pinecone) to maintain atomic ACID transactions alongside transactional business records. Utilized Google Gemini with strict JSON schema outputs to enforce citation token anchors. Overcame hallucination through multi-hop query decomposition and an automated reflection verification agent.',
    '{"type": "project_deepdive", "project_slug": "synthetix-rag"}'::jsonb
),
(
    'Aegis Flow - Architecture & Concurrency',
    'Project: Aegis Flow. Domain: Full-Stack Real-time Systems. Concurrency resolution: Implemented Yjs Conflict-Free Replicated Data Types (CRDTs) over multiplexed WebSockets instead of Operational Transformation (OT) because CRDTs require zero centralized lock coordination and cleanly support offline-first local mutation replay. Performance optimization: Replaced DOM-heavy SVG nodes with hardware-accelerated HTML5 Canvas with spatial R-tree indexing, sustaining 60 FPS under 10,000+ interactive nodes.',
    '{"type": "project_deepdive", "project_slug": "aegis-flow"}'::jsonb
),
(
    'HyperGateway - Distributed Edge Architecture',
    'Project: HyperGateway. Domain: Infrastructure & Developer Tools. Low-latency edge proxy built with Go and TypeScript. Key architectural decisions: Split architecture into a zero-allocation data plane in Go utilizing an in-memory radix tree and non-blocking sync.Pool buffers, and a control plane in Node.js/Express with Supabase webhooks for declarative configuration updates. Reduced sliding-window rate limit contention using two-tier local token buckets synced asynchronously with Redis.',
    '{"type": "project_deepdive", "project_slug": "hyper-gateway"}'::jsonb
),
(
    'Career Timeline & Achievements',
    'Milestones: 
2023 - Present: Principal AI Systems Engineer & Full-Stack Architect at NeuraGrid Technologies. Led design of enterprise RAG orchestration platform serving 400k+ daily queries, reduced latency by 68%, and mentored 12 engineers.
2020 - 2023: Senior Software Engineer at CloudScale Distributed Systems. Architected real-time WebSocket infrastructure handling 120,000 concurrent socket connections; spearheaded migration to Kubernetes and automated CI/CD.
2018 - 2020: Full-Stack Developer at Apex Digital Labs. Built modern React/TypeScript single page applications, GraphQL microservices, and high-conversion client platforms.
Education: Bachelor of Science in Computer Science & Applied Mathematics, Magna Cum Laude. Certified AWS Solutions Architect & Kubernetes Certified Application Developer (CKAD).',
    '{"type": "experience", "relevance": "primary"}'::jsonb
),
(
    'Availability & Collaboration',
    'Alex is currently open to select high-impact technical leadership opportunities, advisory roles, and strategic consulting contracts in Full-Stack Web Architecture, Distributed Systems, and Generative AI Systems Engineering. Direct contact can be initiated via the portfolio contact portal or through verified channels.',
    '{"type": "contact", "relevance": "secondary"}'::jsonb
);

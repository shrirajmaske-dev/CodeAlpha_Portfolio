import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, FileJson, FileText, Mail, Globe, MapPin } from 'lucide-react';
import { Button } from '../components/common/Button.js';

export const ResumePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# Kairos Vance
**Senior Full-Stack Engineer & Autonomous AI Systems Architect**
San Francisco, CA | contact@kairosvance.dev | https://kairosvance.dev | https://github.com/kairosvance

---

## Executive Summary
Senior Full-Stack Engineer and Autonomous AI Systems Architect with 8+ years of production experience building high-performance distributed platforms, autonomous Generative AI reasoning pipelines, and real-time collaborative workspaces. Proven track record reducing p99 latencies by 68%, managing clusters with 120,000+ concurrent connections, and deploying zero-hallucination multi-agent RAG meshes with strict end-to-end type invariants.

---

## Core Technical Competencies
- **Languages**: TypeScript, Python, Go, SQL, Rust, JavaScript
- **Frontend**: React 18+, Next.js, Tailwind CSS, Zustand, Redux Toolkit, WebSockets, HTML5 Canvas
- **Backend**: Node.js, Express, FastAPI, PostgreSQL, Redis, GraphQL, gRPC, Distributed Queues
- **AI / ML**: Google GenAI SDK (Gemini 2.5 Flash / Pro), RAG Architectures, pgvector, Reciprocal Rank Fusion, LangChain, PyTorch
- **Cloud & DevOps**: Docker, Kubernetes, AWS (ECS, S3, RDS, Lambda), Cloudflare Workers, CI/CD GitHub Actions

---

## Professional Experience

### Principal AI Systems Engineer & Full-Stack Architect
**NeuraGrid Technologies** | San Francisco, CA (Remote) | 2023 - Present
- Architected enterprise multi-agent RAG orchestration engine serving 400k+ daily queries across 14 enterprise tenants.
- Reduced p99 retrieval latency from 1,280ms to 84ms using hybrid pgvector indexing and reciprocal rank fusion.
- Enforced structured output schemas with citation token offset anchoring to eliminate hallucination in medical and financial documentation.
- Mentored and guided 12 distributed systems and ML engineers across zero-trust architecture and CI/CD pipelines.

### Senior Software Engineer
**CloudScale Distributed Systems** | Seattle, WA | 2020 - 2023
- Engineered real-time WebSocket cluster managing 120,000 concurrent socket connections with zero message drops.
- Spearheaded transition to Kubernetes GitOps deployment pipelines, decreasing release cycle times from weeks to hours.
- Authored low-latency reverse proxy in Go with radix tree routing, cutting resource usage by 45%.

### Full-Stack Developer
**Apex Digital Labs** | Austin, TX | 2018 - 2020
- Constructed modular React/TypeScript single page applications and GraphQL microservices.
- Optimized client-side rendering pipelines and asset code splitting, boosting Lighthouse performance scores from 64 to 99+.

---

## Education
**University of Texas at Austin**
- Bachelor of Science in Computer Science & Applied Mathematics (2014 - 2018)
- Magna Cum Laude (GPA: 3.92/4.0)

---

## Certifications
- AWS Certified Solutions Architect (Professional)
- Certified Kubernetes Application Developer (CKAD)
- Google Cloud Professional Machine Learning Engineer
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kairos_Vance_Resume.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonContent = {
      basics: {
        name: "Kairos Vance",
        label: "Senior Full-Stack & Autonomous AI Systems Architect",
        email: "contact@kairosvance.dev",
        website: "https://kairosvance.dev",
        location: {
          city: "San Francisco",
          region: "California",
          countryCode: "US"
        },
        summary: "Senior Full-Stack Engineer and Autonomous AI Systems Architect with 8+ years building enterprise RAG meshes, high-throughput microservices, and collaborative real-time canvases."
      },
      skills: [
        { name: "TypeScript", level: "Expert" },
        { name: "Python", level: "Expert" },
        { name: "Go", level: "Proficient" },
        { name: "React / Next.js", level: "Expert" },
        { name: "PostgreSQL / pgvector", level: "Expert" },
        { name: "Google GenAI SDK (Gemini)", level: "Expert" },
        { name: "Docker / Kubernetes", level: "Expert" }
      ],
      work: [
        {
          company: "NeuraGrid Technologies",
          position: "Principal AI Systems Engineer & Full-Stack Architect",
          startDate: "2023-01",
          endDate: "Present",
          summary: "Architected enterprise multi-agent RAG orchestration engine serving 400k+ daily queries."
        },
        {
          company: "CloudScale Distributed Systems",
          position: "Senior Software Engineer",
          startDate: "2020-03",
          endDate: "2023-01",
          summary: "Engineered real-time WebSocket cluster managing 120,000 concurrent socket connections."
        },
        {
          company: "Apex Digital Labs",
          position: "Full-Stack Developer",
          startDate: "2018-06",
          endDate: "2020-03",
          summary: "Built modern React/TypeScript single page applications and GraphQL microservices."
        }
      ],
      education: [
        {
          institution: "University of Texas at Austin",
          area: "Computer Science & Applied Mathematics",
          studyType: "Bachelor of Science",
          startDate: "2014",
          endDate: "2018",
          gpa: "3.92"
        }
      ]
    };

    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kairos_Vance_Resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-zinc-50 dark:bg-[#050505] text-zinc-800 dark:text-zinc-200 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls Bar (Hidden in print mode) */}
        <div className="no-print glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-zinc-200 dark:border-white/10">
          <Link to="/">
            <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Portfolio
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadMarkdown}
              icon={<FileText className="w-3.5 h-3.5" />}
            >
              Raw Markdown (.md)
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadJSON}
              icon={<FileJson className="w-3.5 h-3.5" />}
            >
              Structured JSON (.json)
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-3.5 h-3.5" />}
            >
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Printable Resume Sheet Container */}
        <div className="bg-white dark:bg-[#0c0c0e] print:bg-white print:text-zinc-900 border border-zinc-200 dark:border-white/10 print:border-none rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-white/10 print:border-zinc-300 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white print:text-zinc-900 tracking-tight">
                  Kairos Vance
                </h1>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 print:text-zinc-700 font-mono font-medium mt-1">
                  Senior Full-Stack Engineer & Enterprise AI Systems Architect
                </p>
              </div>

              <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 print:text-zinc-600 font-mono space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-700 dark:text-white" /> San Francisco, CA
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-700 dark:text-white" /> contact@kairosvance.dev
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-zinc-700 dark:text-white" /> https://kairosvance.dev
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-600 dark:text-zinc-300 print:text-zinc-700 font-bold mb-2">
              Executive Summary
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 print:text-zinc-700 text-sm sm:text-base leading-relaxed">
              Senior Full-Stack Engineer and Autonomous AI Systems Architect with 8+ years of production experience building high-performance distributed platforms, autonomous Generative AI reasoning pipelines, and real-time collaborative workspaces. Proven track record reducing p99 latencies by 68%, managing clusters with 120,000+ concurrent connections, and deploying zero-hallucination multi-agent RAG meshes with strict end-to-end type invariants.
            </p>
          </div>

          {/* Technical Competencies */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-600 dark:text-zinc-300 print:text-zinc-700 font-bold mb-3">
              Core Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 print:bg-zinc-100 border border-zinc-200 dark:border-white/10 print:border-zinc-200">
                <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900 block font-mono">Languages & Frameworks</span>
                <span className="text-zinc-600 dark:text-zinc-400 print:text-zinc-600">TypeScript, Python, Go, SQL, Rust, JavaScript, React 18+, Next.js</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 print:bg-zinc-100 border border-zinc-200 dark:border-white/10 print:border-zinc-200">
                <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900 block font-mono">Backend & Distributed Data</span>
                <span className="text-zinc-600 dark:text-zinc-400 print:text-zinc-600">Node.js, Express, FastAPI, PostgreSQL, Redis, pgvector, GraphQL, gRPC</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 print:bg-zinc-100 border border-zinc-200 dark:border-white/10 print:border-zinc-200">
                <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900 block font-mono">AI / Machine Learning</span>
                <span className="text-zinc-600 dark:text-zinc-400 print:text-zinc-600">Google GenAI SDK (Gemini 2.5 Flash), RAG Meshes, LangChain, PyTorch</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 print:bg-zinc-100 border border-zinc-200 dark:border-white/10 print:border-zinc-200">
                <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900 block font-mono">Cloud & Infrastructure</span>
                <span className="text-zinc-600 dark:text-zinc-400 print:text-zinc-600">Docker, Kubernetes, AWS (ECS, S3, RDS, Lambda), Cloudflare Workers, CI/CD</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-600 dark:text-zinc-300 print:text-zinc-700 font-bold mb-4">
              Professional Experience
            </h2>

            <div className="space-y-6">
              {/* Role 1 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm sm:text-base">
                  <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900">
                    Principal AI Systems Engineer & Full-Stack Architect
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-300 print:text-zinc-600 font-mono text-xs">
                    2023 - Present
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 print:text-zinc-600 font-mono">
                  NeuraGrid Technologies • San Francisco, CA (Remote)
                </div>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 print:text-zinc-700 space-y-1.5 mt-2">
                  <li>Architected enterprise multi-agent RAG orchestration engine serving 400k+ daily queries across 14 enterprise tenants.</li>
                  <li>Reduced p99 retrieval latency from 1,280ms to 84ms using hybrid pgvector indexing and reciprocal rank fusion (RRF).</li>
                  <li>Enforced structured output schemas with citation token offset anchoring to eliminate hallucination in medical and financial documentation.</li>
                  <li>Mentored and guided 12 distributed systems and ML engineers across zero-trust architecture and CI/CD pipelines.</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-white/10 print:border-zinc-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm sm:text-base">
                  <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900">
                    Senior Software Engineer
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-300 print:text-zinc-600 font-mono text-xs">
                    2020 - 2023
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 print:text-zinc-600 font-mono">
                  CloudScale Distributed Systems • Seattle, WA (Hybrid)
                </div>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 print:text-zinc-700 space-y-1.5 mt-2">
                  <li>Engineered real-time WebSocket cluster managing 120,000 concurrent socket connections with zero message drops.</li>
                  <li>Spearheaded transition to Kubernetes GitOps deployment pipelines, decreasing release cycle times from weeks to hours.</li>
                  <li>Authored low-latency reverse proxy in Go with radix tree routing, cutting resource usage by 45%.</li>
                </ul>
              </div>

              {/* Role 3 */}
              <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-white/10 print:border-zinc-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm sm:text-base">
                  <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900">
                    Full-Stack Developer
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-300 print:text-zinc-600 font-mono text-xs">
                    2018 - 2020
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 print:text-zinc-600 font-mono">
                  Apex Digital Labs • Austin, TX
                </div>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 print:text-zinc-700 space-y-1.5 mt-2">
                  <li>Constructed modular React/TypeScript single page applications and GraphQL microservices.</li>
                  <li>Optimized client-side rendering pipelines and asset code splitting, boosting Lighthouse performance scores from 64 to 99+.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-200 dark:border-white/10 print:border-zinc-300">
            <div>
              <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-600 dark:text-zinc-300 print:text-zinc-700 font-bold mb-2">
                Education
              </h2>
              <div className="text-sm">
                <span className="font-bold text-zinc-900 dark:text-white print:text-zinc-900 block">
                  B.S. in Computer Science & Applied Mathematics
                </span>
                <span className="text-zinc-500 dark:text-zinc-400 print:text-zinc-600 text-xs font-mono">
                  University of Texas at Austin • 2014 - 2018
                </span>
                <span className="block text-zinc-600 dark:text-zinc-300 print:text-zinc-700 text-xs font-mono mt-0.5">
                  Magna Cum Laude (GPA: 3.92/4.0)
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xs uppercase font-mono tracking-widest text-zinc-600 dark:text-zinc-300 print:text-zinc-700 font-bold mb-2">
                Certifications
              </h2>
              <ul className="text-xs text-zinc-600 dark:text-zinc-300 print:text-zinc-700 space-y-1">
                <li>• AWS Certified Solutions Architect (Professional)</li>
                <li>• Certified Kubernetes Application Developer (CKAD)</li>
                <li>• Google Cloud Professional ML Engineer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

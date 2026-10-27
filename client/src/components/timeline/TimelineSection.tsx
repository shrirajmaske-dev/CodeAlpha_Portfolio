import React from 'react';
import { Briefcase, GraduationCap, MapPin, Award, CheckCircle2 } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Principal AI Systems Engineer & Full-Stack Architect',
    company: 'NeuraGrid Technologies',
    period: '2023 - Present',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-Time',
    highlights: [
      'Architected enterprise RAG orchestration platform serving 400k+ daily queries across 14 enterprise tenants.',
      'Reduced p99 retrieval latency from 1,280ms to 84ms using hybrid pgvector indexing and reciprocal rank fusion.',
      'Enforced structured output schemas with citation token offset anchoring to eliminate hallucination in mission-critical applications.',
      'Mentored and guided 12 distributed systems and ML engineers across zero-trust architecture and CI/CD pipelines.'
    ],
    tech: ['TypeScript', 'Python', 'FastAPI', 'Google GenAI SDK', 'PostgreSQL', 'Docker', 'Kubernetes']
  },
  {
    role: 'Senior Software Engineer',
    company: 'CloudScale Distributed Systems',
    period: '2020 - 2023',
    location: 'Seattle, WA (Hybrid)',
    type: 'Full-Time',
    highlights: [
      'Engineered real-time WebSocket cluster managing 120,000 concurrent socket connections with zero message drops.',
      'Spearheaded transition to Kubernetes GitOps deployment pipelines, decreasing release cycle times from weeks to hours.',
      'Authored low-latency reverse proxy in Go with radix tree routing, cutting resource usage by 45%.'
    ],
    tech: ['Go', 'TypeScript', 'Node.js', 'Redis', 'WebSockets', 'Kubernetes', 'AWS']
  },
  {
    role: 'Full-Stack Developer',
    company: 'Apex Digital Labs',
    period: '2018 - 2020',
    location: 'Austin, TX',
    type: 'Full-Time',
    highlights: [
      'Constructed modular React/TypeScript SPAs and GraphQL microservices for client platforms.',
      'Optimized client-side rendering pipelines and asset code splitting, boosting Lighthouse performance scores from 64 to 99+.'
    ],
    tech: ['React', 'TypeScript', 'GraphQL', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  }
];

const EDUCATION = [
  {
    degree: 'B.S. in Computer Science & Applied Mathematics',
    institution: 'University of Texas at Austin',
    period: '2014 - 2018',
    honors: 'Magna Cum Laude (GPA: 3.92/4.0)',
    notes: 'Focus on Distributed Operating Systems, Graph Theory, and Machine Learning'
  }
];

const CERTIFICATIONS = [
  'AWS Certified Solutions Architect (Professional)',
  'Certified Kubernetes Application Developer (CKAD)',
  'Google Cloud Professional Machine Learning Engineer',
  'DeepLearning.AI Generative AI Systems with LLMs Specialization'
];

export const TimelineSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-mono font-bold bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15">
            Career Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white mt-4 tracking-tight">
            Experience & Engineering Leadership
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2">
            A chronological trajectory of architecting high-impact distributed web platforms and autonomous AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Experience Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-2.5 text-zinc-950 dark:text-white font-bold text-lg border-b border-zinc-200 dark:border-white/10 pb-3">
              <Briefcase className="w-5 h-5 text-zinc-900 dark:text-white" />
              <span>Professional Roles & Milestones</span>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-white/10 space-y-10">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Point */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#050505] border-2 border-zinc-950 dark:border-white group-hover:scale-125 group-hover:bg-zinc-950 dark:group-hover:bg-white transition-all shadow-xs dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

                  <div className="glass-card p-6 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 px-2.5 py-1 rounded border border-zinc-300 dark:border-white/20 self-start sm:self-auto font-semibold">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{exp.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {exp.location}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10">
                        {exp.type}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      {exp.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200 dark:border-white/10">
                      {exp.tech.map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono border border-zinc-200 dark:border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education Box */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-zinc-950 dark:text-white font-bold text-lg border-b border-zinc-200 dark:border-white/10 pb-3">
                <GraduationCap className="w-5 h-5 text-zinc-900 dark:text-white" />
                <span>Academic Foundation</span>
              </div>

              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border border-zinc-200 dark:border-white/10">
                  <h4 className="font-bold text-zinc-950 dark:text-white text-sm sm:text-base">{edu.degree}</h4>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 font-mono">{edu.institution}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{edu.period} • {edu.honors}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">{edu.notes}</p>
                </div>
              ))}
            </div>

            {/* Certifications Box */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-zinc-950 dark:text-white font-bold text-lg border-b border-zinc-200 dark:border-white/10 pb-3">
                <Award className="w-5 h-5 text-zinc-900 dark:text-white" />
                <span>Verified Credentials</span>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white mt-1.5 flex-shrink-0 shadow-xs dark:shadow-[0_0_6px_#ffffff]" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Single source of truth for site copy, sourced from Resume_Toluwani_Esan_.pdf.
 * Shared facts stay constant; product/engineering modes only change framing.
 */

import type { CareerMode } from "@/lib/mode";

export type ProfileLinks = {
  github: string;
  linkedin: string;
  email: string;
  emailSecondary?: string;
  phone?: string;
  resumePdf?: string;
  portfolio?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceEntry = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export type EducationEntry = {
  school: string;
  degree: string;
  start: string;
  end: string;
  highlights: string[];
};

export type ManualProject = {
  title: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
};

export type HonorEntry = {
  title: string;
  detail?: string;
};

export type CredentialEntry = {
  title: string;
  subtitle?: string;
  href: string;
  kind: "pdf" | "award";
  peekImageSrc?: string;
  peekHint?: string;
  modalPreviewSrc?: string;
};

export type GlanceItem = {
  label: string;
  value: string;
};

export type ModePresentation = {
  headline: string;
  bio: string;
  about: string;
  aboutTitle: string;
  skillsTitle: string;
  projectsEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  glance: GlanceItem[];
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  manualProjects: ManualProject[];
};

export type Profile = {
  identity: {
    name: string;
    location?: string;
    avatar?: string;
  };
  links: ProfileLinks;
  githubUsername: string;
  includeForkedGithubRepos?: boolean;
  includeArchivedGithubRepos?: boolean;
  education: EducationEntry[];
  honorsLeadership: HonorEntry[];
  certificates: CredentialEntry[];
  modes: Record<CareerMode, ModePresentation>;
};

const envGithub =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GITHUB_USERNAME : undefined;

const sharedEducation: EducationEntry[] = [
  {
    school: "Alabama A&M University",
    degree: "B.S. Computer Science — Honors Program",
    start: "2023",
    end: "Expected May 2027",
    highlights: [
      "GPA 3.96 / 4.00 · Huntsville, AL",
      "Relevant coursework: Data Structures, Theory of Algorithms, Discrete Structures, Digital Logic Design, Probability & Statistics",
    ],
  },
];

const sharedHonors: HonorEntry[] = [
  {
    title: "Honors Program Scholar",
    detail: "University-wide honors curriculum at Alabama A&M University.",
  },
  {
    title: "Presidential Scholar",
    detail: "Recognized for strong academic performance and campus engagement.",
  },
  {
    title: "Dean's List",
    detail: "Sustained academic excellence alongside research, tutoring, and project delivery.",
  },
];

const sharedCertificates: CredentialEntry[] = [
  {
    title: "Professional Scrum Master I (PSM I)",
    subtitle: "Scrum.org — Agile Scrum accountability and team facilitation.",
    href: "/certificates/psm-i.pdf",
    kind: "pdf",
  },
  {
    title: "Leland Product Management Bootcamp",
    subtitle: "Completion certificate — product management training.",
    href: "/certificates/leland-pm-bootcamp.pdf",
    kind: "pdf",
  },
  {
    title: "CodePath TIP101",
    subtitle: "Certificate of completion — industry-aligned technical foundations.",
    href: "/certificates/codepath-completion.pdf",
    kind: "pdf",
  },
  {
    title: "System Design Certificate",
    subtitle: "Certificate of completion — scalable systems design foundations.",
    href: "/certificates/system-design.pdf",
    kind: "pdf",
  },
];

const productMode: ModePresentation = {
  headline: "Product-minded CS student · Requirements, research & delivery",
  bio: "Computer Science student (GPA 3.96) and PSM I–certified practitioner with hands-on experience defining product requirements, leading cross-functional teams, and shipping systems end-to-end across healthcare, education, and AI.",
  aboutTitle: "Built for what people need next",
  about:
    "I'm a Computer Science student at Alabama A&M University (Honors Program, GPA 3.96, expected May 2027) focused on turning ambiguous needs into clear requirements and shippable systems. Recently I owned end-to-end website delivery and SEO for Herbal Haven DIY while automating email marketing and inventory ops with AI agents. I also tutor across seven subjects and designed a campus resource guide so students can find support on demand. As a PSM I–certified Scrum Master with Leland PM Bootcamp training, I care about product research, data-informed decisions, and delivery that holds up after launch.",
  skillsTitle: "Product & systems toolkit",
  projectsEyebrow: "Selected product work",
  ctaTitle: "Let's build the next roadmap",
  ctaBody:
    "Open to product, program, and dual-track roles where requirements clarity, stakeholder alignment, and measurable delivery matter.",
  glance: [
    { label: "Focus", value: "Requirements, research, UX, and outcome-driven delivery" },
    { label: "Domains", value: "Healthcare, education, AI, and web operations" },
    {
      label: "Methods",
      value: "Agile Scrum (PSM I), product research, data analysis, stakeholder communication",
    },
    { label: "Credentials", value: "PSM I · Leland PM · System Design · Honors CS (GPA 3.96)" },
  ],
  skills: [
    {
      title: "Product Management",
      items: [
        "Agile Scrum (PSM I)",
        "Product requirements",
        "Stakeholder communication",
        "Data analysis",
        "UI and UX Design",
        "Product Research",
        "Delivering technical presentations",
      ],
    },
    {
      title: "Discovery & Definition",
      items: [
        "Requirements definition",
        "Product research",
        "Service decomposition",
        "System documentation",
      ],
    },
    {
      title: "Systems Thinking",
      items: [
        "Service decomposition",
        "ER modeling",
        "System documentation",
        "Load testing",
      ],
    },
    {
      title: "Technical Fluency",
      items: ["REST API design", "PostgreSQL", "Next.js", "SEO", "AI agent orchestration"],
    },
  ],
  experience: [
    {
      role: "Web & Operations Developer",
      company: "Herbal Haven DIY",
      location: "Remote",
      start: "Summer 2026",
      end: "Summer 2026",
      bullets: [
        "Owned end-to-end delivery of the company website and engineered a back-end pipeline to automate email marketing campaign distribution, streamlining a previously manual process.",
        "Led SEO strategy across the site's architecture and content, improving organic search visibility and ranking performance.",
        "Configured and orchestrated AI agents to automate inventory tracking, low-stock alerting, and daily reporting on platform activity and order status, giving the team real-time operational visibility without manual monitoring.",
      ],
    },
    {
      role: "Peer Tutor and Student Resource Guide",
      company: "Tutorial Assistance Network",
      location: "Huntsville, AL",
      start: "Spring 2026",
      end: "Present",
      bullets: [
        "Delivered 100+ individualized tutoring sessions across seven subjects (Python, C++, Java, C#, Calculus, Psychology, and Physics) for 30+ undergraduates, adapting instructional approach based on student performance and feedback to build a 90%+ satisfaction rate and a strong base of returning students.",
        "Identified a gap in student awareness of campus support resources and designed a reference guide covering counseling, financial aid, and other key services, distributing it directly to students for consistent, on-demand access.",
      ],
    },
  ],
  manualProjects: [
    {
      title: "Event Planner Manager",
      description:
        "Defined product requirements for scheduling, budgeting, and vendor booking; normalized the data model across 3 entities, reducing confirmation time by ~40%. Vendor module rated 95% by peer evaluators.",
      stack: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Tailwind", "Prisma"],
      repoUrl: "https://github.com/ToluwaniEsan/Event-Planner-Manager",
      featured: true,
    },
    {
      title: "Academic AI Tutor — Deep Learning Chatbot",
      description:
        "Scoped requirements and coordinated a 4-person team to design and deliver a deep learning chatbot covering 9 academic subjects, spanning a TensorFlow/Keras NLP classifier and Flask web server (CS-450 group project).",
      stack: ["Python", "TensorFlow", "Keras", "Flask", "NLP"],
      featured: true,
    },
    {
      title: "LoadForge — Local Load Testing Platform",
      description:
        "Scoped and shipped a learning-first load-testing product: guided recipes, cURL import, multi-step journeys, authentication helpers, pass/fail assertions, and an explainable Error Inspector. Defined safety requirements (authorization gate, SSRF defenses, local-only API, VU/port caps) so beginners can pressure-test APIs without turning the tool into an abuse vector.",
      stack: ["React", "TypeScript", "Node.js", "Express", "WebSockets", "Vite"],
      repoUrl: "https://github.com/ToluwaniEsan/LoadForge",
      featured: true,
    },
    {
      title: "MediLink Africa — Healthcare Coordination Platform",
      description:
        "Independently scoped and architected a multi-service platform spanning a referral engine, SOS dispatch, and admin governance, defining service boundaries so hospitals, labs, pharmacies, and patients each scale independently. Drove API design decisions across 4 domains, selected a relational model after benchmarking 200 simulated concurrent users, and sustained 99.9% uptime over a 2-week load test. Produced system documentation including an ER diagram, API spec, and runbook, cutting referral time by 30%.",
      stack: ["Next.js", "REST APIs", "PostgreSQL", "Cloud Infrastructure"],
      featured: false,
    },
  ],
};

const engineeringMode: ModePresentation = {
  headline: "Full-stack & systems builder · Web ops, APIs & ML pipelines",
  bio: "Computer Science student (GPA 3.96) shipping websites, automation pipelines, and ML systems—from SEO-backed web platforms and AI agent ops to TensorFlow training pipelines. Certified Scrum Master.",
  aboutTitle: "Built for systems that scale",
  about:
    "I'm a Computer Science student at Alabama A&M University (Honors Program, GPA 3.96, expected May 2027) who designs and implements resilient software systems. At Herbal Haven DIY I owned the company website end-to-end, automated email marketing, led SEO, and orchestrated AI agents for inventory and daily reporting. I also build full-stack products with Next.js and PostgreSQL and deep-learning chatbots with TensorFlow/Keras and Flask. I care about clean service boundaries, automation that removes manual toil, and implementations others can extend with confidence.",
  skillsTitle: "Engineering stack",
  projectsEyebrow: "Selected engineering work",
  ctaTitle: "Let's ship something solid",
  ctaBody:
    "Open to software engineering internships and collaborations where architecture, APIs, data integrity, and measurable performance matter.",
  glance: [
    { label: "Focus", value: "Web platforms, automation pipelines, APIs, and full-stack systems" },
    { label: "Stack", value: "Next.js, React, Node.js, PostgreSQL, Prisma, TensorFlow" },
    { label: "Systems", value: "REST design, ER modeling, SEO, AI agent orchestration" },
    { label: "Credentials", value: "CodePath TIP101 · PSM I · System Design · Honors CS (GPA 3.96)" },
  ],
  skills: [
    {
      title: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "C++", "Java"],
    },
    {
      title: "Web & Frameworks",
      items: ["Next.js", "React", "Node.js", "Flask", "Tailwind CSS", "Prisma", "Git/GitHub"],
    },
    {
      title: "Systems & Architecture",
      items: [
        "REST API design",
        "Service decomposition",
        "ER modeling",
        "System documentation",
        "Load testing",
      ],
    },
    {
      title: "Data & AI",
      items: ["PostgreSQL", "SQLite", "TensorFlow", "Keras", "AI agent orchestration"],
    },
    {
      title: "Engineering Practice",
      items: ["Git/GitHub", "Requirements definition", "Agile Scrum (PSM I)", "SEO"],
    },
  ],
  experience: [
    {
      role: "Web & Operations Developer",
      company: "Herbal Haven DIY",
      location: "Remote",
      start: "Summer 2026",
      end: "Summer 2026",
      bullets: [
        "Owned end-to-end delivery of the company website and engineered a back-end pipeline to automate email marketing campaign distribution, streamlining a previously manual process.",
        "Led SEO strategy across the site's architecture and content, improving organic search visibility and ranking performance.",
        "Configured and orchestrated AI agents to automate inventory tracking, low-stock alerting, and daily reporting on platform activity and order status.",
      ],
    },
    {
      role: "Peer Tutor and Student Resource Guide",
      company: "Tutorial Assistance Network",
      location: "Huntsville, AL",
      start: "Spring 2026",
      end: "Present",
      bullets: [
        "Delivered 100+ individualized tutoring sessions across seven subjects (Python, C++, Java, C#, Calculus, Psychology, and Physics) for 30+ undergraduates; 90%+ satisfaction with a strong return-student base.",
        "Designed and distributed a campus support resource guide covering counseling, financial aid, and other key services for on-demand student access.",
      ],
    },
  ],
  manualProjects: [
    {
      title: "Event Planner Manager",
      description:
        "Implemented a full-stack scheduling, budgeting, and vendor-booking system with Next.js, Node.js, PostgreSQL, TypeScript, Tailwind, and Prisma—normalizing the data model across 3 entities and reducing confirmation time by ~40%.",
      stack: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Tailwind", "Prisma"],
      repoUrl: "https://github.com/ToluwaniEsan/Event-Planner-Manager",
      featured: true,
    },
    {
      title: "Academic AI Tutor — Deep Learning Chatbot",
      description:
        "Designed the architecture and training pipeline for a deep learning chatbot covering 9 academic subjects, coordinating a 4-person team on a TensorFlow/Keras NLP classifier and Flask web server (CS-450 group project).",
      stack: ["Python", "TensorFlow", "Keras", "Flask", "NLP"],
      featured: true,
    },
    {
      title: "LoadForge — Local Load Testing Platform",
      description:
        "Built a local React + Node load-testing engine with WebSocket live metrics, multi-step journeys, template variables, authentication helpers, DNS-pinned SSRF defenses, and pass/fail assertions. Implemented error sampling with HTML/JSON message extraction so failures show cause and load conditions instead of raw page dumps.",
      stack: ["React", "TypeScript", "Node.js", "Express", "WebSockets", "Vite"],
      repoUrl: "https://github.com/ToluwaniEsan/LoadForge",
      featured: true,
    },
    {
      title: "MediLink Africa — Healthcare Coordination Platform",
      description:
        "Architected a multi-service Next.js platform with REST APIs and PostgreSQL spanning referral, SOS dispatch, and admin governance. Benchmarked a relational model under 200 simulated concurrent users, sustained 99.9% uptime over a 2-week load test, and shipped ER diagrams, API specs, and a runbook that cut referral time by 30%.",
      stack: ["Next.js", "REST APIs", "PostgreSQL", "Cloud Infrastructure"],
      featured: false,
    },
  ],
};

export const profile: Profile = {
  identity: {
    name: "Toluwani Esan",
    location: "Huntsville, AL · open to product & engineering internships",
    avatar: "/headshot.png",
  },
  links: {
    github: "https://github.com/ToluwaniEsan",
    linkedin: "https://www.linkedin.com/in/esan-toluwani",
    email: "mailto:toluwani.esan@bulldogs.aamu.edu",
    emailSecondary: "mailto:esantoluwani@gmail.com",
    phone: "(256) 417-7347",
    resumePdf: "/resume.pdf",
    portfolio: "https://portfolio-one-henna-53.vercel.app",
  },
  githubUsername: envGithub?.trim() || "ToluwaniEsan",
  includeForkedGithubRepos: false,
  includeArchivedGithubRepos: false,
  education: sharedEducation,
  honorsLeadership: sharedHonors,
  certificates: sharedCertificates,
  modes: {
    product: productMode,
    engineering: engineeringMode,
  },
};

export function getModePresentation(mode: CareerMode): ModePresentation {
  return profile.modes[mode];
}

/** Default (Product) presentation for SSR metadata and static fallbacks. */
export function getDefaultPresentation(): ModePresentation {
  return profile.modes.product;
}

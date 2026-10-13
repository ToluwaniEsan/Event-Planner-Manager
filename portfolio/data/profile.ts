/**
 * Single source of truth for site copy, sourced from Resume_Toluwani_Esan_.pdf (Sep 2026).
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
      "GPA 3.96 / 4.00 · Summa Cum Laude standing · Huntsville, AL",
      "Coursework: Data Structures, Algorithms, Probability & Statistics",
    ],
  },
];

const sharedHonors: HonorEntry[] = [
  {
    title: "Presidential Scholar",
    detail: "Recognized for strong academic performance and campus engagement.",
  },
  {
    title: "Honors Program Scholar",
    detail: "University-wide honors curriculum at Alabama A&M University.",
  },
  {
    title: "Dean's List",
    detail: "Sustained academic excellence alongside product leadership, tutoring, and shipping.",
  },
  {
    title: "Media Sub-unit Lead — RCCG Jesus House Huntsville",
    detail:
      "On the media team since 2022; promoted to sub-unit lead in 2025. Help plan and execute 12+ major events per year for audiences of 100+, from promotion through live AV execution and troubleshooting.",
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
    title: "System Design Certificate",
    subtitle: "Certificate of completion — scalable systems design foundations.",
    href: "/certificates/system-design.pdf",
    kind: "pdf",
  },
  {
    title: "CodePath TIP101",
    subtitle: "Certificate of completion — industry-aligned technical foundations.",
    href: "/certificates/codepath-completion.pdf",
    kind: "pdf",
  },
];

const productMode: ModePresentation = {
  headline: "Founder & product lead · Requirements, research & go-to-market",
  bio: "Computer Science student (GPA 3.96, Summa Cum Laude standing) and PSM I–certified practitioner founding MediLink Africa, shipping web ops systems, and turning user interviews into measurable product outcomes.",
  aboutTitle: "Built for what people need next",
  about:
    "I'm a Computer Science student at Alabama A&M University (Honors Program, GPA 3.96, Summa Cum Laude standing, expected May 2027). As Founder & Product Lead of MediLink Africa, I interviewed clinicians, designed a referral platform patients can trust, and advanced past the first round of Startup Abuja (500+ applicants). I've also automated ops for an early-stage e-commerce startup, tutored across seven subjects, and led media execution for 12+ major events a year. I care about user interviews, go-to-market clarity, and delivery that holds up after launch.",
  skillsTitle: "Product & systems toolkit",
  projectsEyebrow: "Selected product work",
  ctaTitle: "Let's build the next roadmap",
  ctaBody:
    "Open to product, program, and dual-track roles where discovery, stakeholder alignment, and measurable delivery matter.",
  glance: [
    { label: "Focus", value: "User interviews, requirements, UX, and go-to-market" },
    { label: "Domains", value: "Healthcare referrals, education, AI, and web operations" },
    {
      label: "Methods",
      value: "Agile Scrum (PSM I), product research, data analysis, stakeholder communication",
    },
    {
      label: "Credentials",
      value: "PSM I · Leland PM · System Design · Google & TMCF AI · GPA 3.96",
    },
  ],
  skills: [
    {
      title: "Product Management",
      items: [
        "Product requirements",
        "User interviews",
        "Agile Scrum (PSM I)",
        "Stakeholder communication",
        "Go-to-market planning",
        "System documentation",
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
        "User interviews",
        "Product research",
        "Service decomposition",
      ],
    },
    {
      title: "Systems Thinking",
      items: [
        "System documentation",
        "ER modeling",
        "API design",
        "Load testing",
      ],
    },
    {
      title: "Technical Fluency",
      items: ["Next.js", "React", "PostgreSQL", "SEO", "AI agent orchestration"],
    },
  ],
  experience: [
    {
      role: "Founder & Product Lead",
      company: "MediLink Africa",
      location: "Remote",
      start: "Dec 2025",
      end: "Present",
      bullets: [
        "Identified broken referral communication between Nigerian hospitals and patients through interviews with 4 doctors; designed a platform where hospitals route referrals to partner clinics while patients see exactly who receives their data, building accountability into every handoff.",
        "Architected and deployed the platform end-to-end with a deliberately minimal, low-learning-curve interface based on doctor feedback, plus published API specs; 113+ visits in 30 days with zero reported performance issues.",
        "Led a partnership-first go-to-market plan, pitching MediLink to a state Commissioner of Health for adoption; advanced past the first round of Startup Abuja (500+ applicants), competing for funding and sponsorship.",
      ],
    },
    {
      role: "Web & Operations Developer",
      company: "Herbal Haven DIY",
      location: "Remote",
      start: "Summer 2026",
      end: "Summer 2026",
      bullets: [
        "Joined an early-stage e-commerce startup and turned the owner's requirements into automated systems, building a back-end pipeline for email campaigns and buyer tracking that freed ~5–10 hours/week of manual work.",
        "Led SEO across site architecture and content, taking the site from no search presence to indexed on Google and driving ~10 new organic visits per day.",
        "Deployed AI agents for inventory tracking, low-stock alerts, and daily order reporting, giving the owner real-time operational visibility without manual monitoring.",
      ],
    },
    {
      role: "Peer Tutor",
      company: "Tutorial Assistance Network",
      location: "Huntsville, AL",
      start: "Spring 2026",
      end: "Present",
      bullets: [
        "Delivered 100+ sessions across 7 subjects to 30+ undergraduates, adapting approach from session feedback to sustain 90%+ satisfaction, with most students returning for 2–3+ follow-up sessions.",
        "Noticed students didn't know where to turn for campus support; created a resource guide covering counseling, financial aid, and key services that the tutoring center adopted and now distributes to students.",
      ],
    },
  ],
  manualProjects: [
    {
      title: "MediLink Africa — Healthcare Coordination Platform",
      description:
        "Founded and shipped a referral platform from clinician interviews through deployment and go-to-market—hospitals route referrals to partner clinics while patients see who receives their data. 113+ visits in 30 days with zero reported performance issues; advanced past Startup Abuja's first round (500+ applicants).",
      stack: ["Next.js", "REST APIs", "PostgreSQL", "Product discovery", "Go-to-market"],
      featured: true,
    },
    {
      title: "Event Planner Manager",
      description:
        "Designed a multi-vendor event marketplace centralizing venue, catering, and decor booking. Defined requirements and a normalized 3-entity data model powering a single confirmation view with SMS vendor reminders; validated the design with 10 working event planners and vendors.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      repoUrl: "https://github.com/ToluwaniEsan/Event-Planner-Manager",
      featured: true,
    },
    {
      title: "ER Triage Training Simulation",
      description:
        "Designed a timed mass-casualty triage simulation for healthcare learners using the real START tagging system so skills transfer to ER protocol. Adaptive difficulty based on accuracy and speed; submitted a working prototype for the IEEE Metaverse Grand Challenge 2026 and playtested with classmates.",
      stack: ["IEEE Metaverse Grand Challenge", "Simulation design", "Healthcare learning"],
      featured: true,
    },
    {
      title: "Academic AI Tutor",
      description:
        "Led a 4-person team from requirements to delivery of an NLP chatbot that classifies student questions and answers from a curated knowledge base across 9 subjects (CS-450).",
      stack: ["Python", "TensorFlow/Keras", "Flask", "NLP"],
      featured: true,
    },
    {
      title: "LoadForge — Local Load Testing Platform",
      description:
        "Scoped and shipped a learning-first load-testing product: guided recipes, cURL import, multi-step journeys, authentication helpers, pass/fail assertions, and an explainable Error Inspector with safety requirements so beginners can pressure-test APIs responsibly.",
      stack: ["React", "TypeScript", "Node.js", "Express", "WebSockets", "Vite"],
      repoUrl: "https://github.com/ToluwaniEsan/LoadForge",
      featured: false,
    },
  ],
};

const engineeringMode: ModePresentation = {
  headline: "Full-stack founder · Platforms, automation & ML",
  bio: "Computer Science student (GPA 3.96) architecting and deploying MediLink Africa end-to-end, automating e-commerce ops with AI agents, and shipping full-stack and ML systems.",
  aboutTitle: "Built for systems that scale",
  about:
    "I'm a Computer Science student at Alabama A&M University (Honors Program, GPA 3.96, Summa Cum Laude standing, expected May 2027). I founded MediLink Africa and deployed the referral platform end-to-end with published API specs—113+ visits in 30 days with zero reported performance issues. At Herbal Haven DIY I built email/buyer-tracking pipelines and AI agents for inventory and daily reporting. I also ship Next.js/PostgreSQL products and TensorFlow/Keras chatbots. I care about clean interfaces, automation that removes manual toil, and implementations others can extend.",
  skillsTitle: "Engineering stack",
  projectsEyebrow: "Selected engineering work",
  ctaTitle: "Let's ship something solid",
  ctaBody:
    "Open to software engineering internships and collaborations where architecture, APIs, data integrity, and measurable performance matter.",
  glance: [
    { label: "Focus", value: "End-to-end platforms, automation pipelines, and full-stack systems" },
    { label: "Stack", value: "Next.js, React, Node.js, PostgreSQL, Prisma, TensorFlow" },
    { label: "Systems", value: "API design, ER modeling, SEO, AI agent orchestration" },
    {
      label: "Credentials",
      value: "CodePath TIP101 · PSM I · System Design · Google & TMCF AI · GPA 3.96",
    },
  ],
  skills: [
    {
      title: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"],
    },
    {
      title: "Web & Frameworks",
      items: ["Next.js", "React", "Node.js", "Flask", "Git"],
    },
    {
      title: "Data & AI",
      items: ["PostgreSQL", "SQLite", "TensorFlow", "Keras", "AI agent orchestration"],
    },
    {
      title: "Systems & Architecture",
      items: [
        "REST API design",
        "System documentation",
        "ER modeling",
        "SEO",
        "Load testing",
      ],
    },
    {
      title: "Engineering Practice",
      items: ["Git", "Requirements definition", "Agile Scrum (PSM I)"],
    },
  ],
  experience: [
    {
      role: "Founder & Product Lead",
      company: "MediLink Africa",
      location: "Remote",
      start: "Dec 2025",
      end: "Present",
      bullets: [
        "Architected and deployed a healthcare referral platform end-to-end from clinician interviews, with a minimal low-learning-curve interface and published API specs; 113+ visits in 30 days with zero reported performance issues.",
        "Built accountability into referral handoffs so hospitals route to partner clinics while patients see exactly who receives their data.",
        "Advanced past the first round of Startup Abuja (500+ applicants) while pitching partnership adoption to a state Commissioner of Health.",
      ],
    },
    {
      role: "Web & Operations Developer",
      company: "Herbal Haven DIY",
      location: "Remote",
      start: "Summer 2026",
      end: "Summer 2026",
      bullets: [
        "Built a back-end pipeline for email campaigns and buyer tracking that freed ~5–10 hours/week of manual work for an early-stage e-commerce owner.",
        "Led SEO across site architecture and content, taking the site from no search presence to indexed on Google (~10 new organic visits/day).",
        "Deployed AI agents for inventory tracking, low-stock alerts, and daily order reporting.",
      ],
    },
    {
      role: "Peer Tutor",
      company: "Tutorial Assistance Network",
      location: "Huntsville, AL",
      start: "Spring 2026",
      end: "Present",
      bullets: [
        "Delivered 100+ sessions across 7 subjects to 30+ undergraduates; 90%+ satisfaction with most students returning for 2–3+ follow-ups.",
        "Created a campus support resource guide the tutoring center adopted and now distributes to students.",
      ],
    },
  ],
  manualProjects: [
    {
      title: "MediLink Africa — Healthcare Coordination Platform",
      description:
        "Architected and deployed a multi-party referral platform with published API specs and a minimal clinician-informed UI. 113+ visits in 30 days with zero reported performance issues.",
      stack: ["Next.js", "REST APIs", "PostgreSQL", "Cloud Infrastructure"],
      featured: true,
    },
    {
      title: "Event Planner Manager",
      description:
        "Implemented a multi-vendor event marketplace with Next.js, TypeScript, PostgreSQL, and Prisma—normalized 3-entity data model, single confirmation view, and SMS vendor reminders validated with 10 planners and vendors.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      repoUrl: "https://github.com/ToluwaniEsan/Event-Planner-Manager",
      featured: true,
    },
    {
      title: "ER Triage Training Simulation",
      description:
        "Built a timed mass-casualty triage simulation using the START tagging system with adaptive difficulty based on accuracy and speed; working prototype submitted for IEEE Metaverse Grand Challenge 2026.",
      stack: ["IEEE Metaverse Grand Challenge", "Simulation", "START triage"],
      featured: true,
    },
    {
      title: "Academic AI Tutor",
      description:
        "Led architecture and delivery of an NLP chatbot that classifies student questions and answers from a curated knowledge base across 9 subjects (Python, TensorFlow/Keras, Flask).",
      stack: ["Python", "TensorFlow/Keras", "Flask", "NLP"],
      featured: true,
    },
    {
      title: "LoadForge — Local Load Testing Platform",
      description:
        "Built a local React + Node load-testing engine with WebSocket live metrics, multi-step journeys, SSRF defenses, and pass/fail assertions.",
      stack: ["React", "TypeScript", "Node.js", "Express", "WebSockets", "Vite"],
      repoUrl: "https://github.com/ToluwaniEsan/LoadForge",
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
    email: "mailto:esantoluwani@gmail.com",
    emailSecondary: "mailto:toluwani.esan@bulldogs.aamu.edu",
    phone: "(256) 417-7347",
    resumePdf: "/resume.pdf",
    portfolio: "https://toluwaniesan.dev",
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

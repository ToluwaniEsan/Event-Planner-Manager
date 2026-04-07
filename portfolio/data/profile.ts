/**
 * Single source of truth for site copy. Sourced from your official resume where noted.
 * Set NEXT_PUBLIC_GITHUB_USERNAME in .env to override the GitHub API user.
 */

export type ProfileLinks = {
  github: string;
  linkedin: string;
  email: string;
  /** E.164 or formatted; shown on Contact. Optional. */
  phone?: string;
  resumePdf?: string;
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
  /** Optional PNG/JPEG/WebP shown in the modal if the PDF iframe won’t load or user switches to preview */
  modalPreviewSrc?: string;
};

export type Profile = {
  identity: {
    name: string;
    headline: string;
    location?: string;
    /** Short intro for the hero and meta description. */
    bio: string;
    /** Longer “about” narrative for the About section. */
    about: string;
    /** Path under public/, e.g. /photo.jpg */
    avatar?: string;
  };
  links: ProfileLinks;
  githubUsername: string;
  /** When true, include forked repos from the GitHub API. */
  includeForkedGithubRepos?: boolean;
  /** When true, include archived repos from the GitHub API. */
  includeArchivedGithubRepos?: boolean;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  honorsLeadership: HonorEntry[];
  certificates: CredentialEntry[];
  manualProjects: ManualProject[];
};

const envGithub =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_GITHUB_USERNAME
    : undefined;

export const profile: Profile = {
  identity: {
    name: "Toluwani Esan",
    headline: "Honors CS student · Full-stack platforms, VR research & product craft",
    location: "Huntsville & Normal, AL · open to internships & co-ops",
    bio: "Honors Computer Science student at Alabama A&M (3.96 GPA). I build full-stack apps, VR healthcare tooling, and systems designed to stay useful as needs evolve.",
    about:
      "I'm a Computer Science student at Alabama A&M University on track to graduate in May 2027, with a 3.96 GPA and Honors distinction. I'm most interested in developing platforms that stand the test of time—work that reflects what people will actually need for years, not just what's trendy this quarter. That mindset shows up in tutoring where I help others debug and reason clearly, in research building 3D medical models in Unreal & Meta Quest 3s, and in full-stack projects from healthcare referrals to unified productivity workflows. I care about fundamentals: reliable APIs, thoughtful UX, measurable impact, and documentation the next person can trust. I'm also PSM I certified and grounded in prioritization and planning from product-management training.",
    avatar: "/headshot.png",
  },
  links: {
    github: "https://github.com/ToluwaniEsan",
    linkedin: "https://www.linkedin.com/in/esan-toluwani",
    email: "mailto:toluwani.esan@bulldogs.aamu.edu",
    phone: "(256) 417-7347",
    resumePdf: "/resume.pdf",
  },
  githubUsername: envGithub?.trim() || "ToluwaniEsan",
  includeForkedGithubRepos: false,
  includeArchivedGithubRepos: false,
  skills: [
    {
      title: "Languages",
      items: ["Python", "C++", "JavaScript", "Java"],
    },
    {
      title: "Web & frameworks",
      items: ["HTML", "CSS", "Next.js", "Node.js", "REST APIs", "OAuth 2.0"],
    },
    {
      title: "ML, VR & cloud",
      items: ["TensorFlow", "Vertex AI", "Google Cloud Vision", "Unreal Engine", "Meta Quest / VR"],
    },
    {
      title: "Practices & tools",
      items: ["Git & GitHub", "Scrum (PSM I)", "Product planning", "IT & application controls", "Risk management"],
    },
  ],
  experience: [
    {
      role: "Peer Tutor",
      company: "Tutorial Assistance Network",
      location: "Huntsville, AL",
      start: "Summer 2025",
      end: "Present",
      bullets: [
        "Guide students through problem-solving and debugging, strengthening logical reasoning and academic efficiency.",
        "Tutor Python and C++ with 90%+ positive feedback and a 50%+ client return rate.",
        "Coordinate with fellow tutors on session follow-ups that lift tutee performance.",
      ],
    },
    {
      role: "Student",
      company: "Leland Product Management Bootcamp",
      location: "Huntsville, AL",
      start: "Summer 2025",
      end: "Summer 2025",
      bullets: [
        "Studied with product managers from multiple companies on prioritization, planning, and stakeholder alignment.",
        "Completed one-on-one sessions with senior PMs for strategic feedback on career direction.",
        "Strengthened data-informed decision-making tied to business outcomes.",
      ],
    },
    {
      role: "VR / 3D developer (undergraduate research)",
      company: "College of Engineering and Technology, Alabama A&M University",
      location: "Huntsville, AL",
      start: "Spring 2025",
      end: "Spring 2025",
      bullets: [
        "Built interactive 3D human models for medical applications on Meta Quest 3s—muscle analysis and pressure monitoring for wheelchair users.",
        "Used Unreal Engine and VR workflows alongside clinical modeling requirements.",
        "Focused on data integrity and reliability in a VR-based medical experience.",
      ],
    },
  ],
  education: [
    {
      school: "Alabama A&M University",
      degree: "B.S. Computer Science — General CS concentration · Honors Program",
      start: "2023",
      end: "Expected May 2027",
      highlights: [
        "GPA 3.96 / 4.00 · Presidential Scholar · Dean's List",
        "Coursework: Python, data structures, C++, Java, discrete structures, advanced programming, digital logic, probability & statistics",
      ],
    },
  ],
  honorsLeadership: [
    {
      title: "Honors Program Scholar",
      detail: "University-wide honors curriculum and programming at Alabama A&M.",
    },
    {
      title: "Presidential Scholar",
      detail: "Recognized for strong academic performance and campus engagement.",
    },
    {
      title: "Dean's List recipient",
      detail: "Sustained academic excellence while balancing research, tutoring, and build-heavy projects.",
    },
    {
      title: "STEM Day presentation certificate",
      detail: "Leadership and communication in a STEM outreach setting.",
    },
    {
      title: "Two-time Presidential Medallion — Silver",
      detail: "Repeated recognition at the Presidential Medallion level (Silver).",
    },
    {
      title: "Leadership through tutoring & product training",
      detail: "Peer tutor (TAN) with high return rates; Leland PM Bootcamp for stakeholder-ready prioritization and planning.",
    },
  ],
  certificates: [
    {
      title: "Professional Scrum Master I (PSM I)",
      subtitle: "Scrum.org — validates core Scrum Master accountability and team facilitation.",
      href: "/certificates/psm-i.pdf",
      kind: "pdf",
    },
    {
      title: "Presidential Medallion — Silver (two-time)",
      subtitle: "Photo of the award medals (HEIC — download or open with Photos on your device).",
      href: "/certificates/presidential-medallion.heic",
      kind: "award",
      peekHint: "Open / download photo",
    },
    {
      title: "Leland Product Management Bootcamp",
      subtitle: "Completion certificate — Leland Ventures, Huntsville.",
      href: "/certificates/leland-pm-bootcamp.pdf",
      kind: "pdf",
    },
    {
      title: "CodePath TIP101",
      subtitle: "Certificate of completion — industry-aligned technical foundations.",
      href: "/certificates/codepath-completion.pdf",
      kind: "pdf",
    },
  ],
  manualProjects: [
    {
      title: "MediLink Africa",
      description:
        "End-to-end healthcare referral platform with Next.js, RESTful APIs, and cloud databases—in a simulated environment, cut referral processing time about 30% and sped task completion ~25% through scalable, security-minded frontend work.",
      stack: ["Next.js", "REST APIs", "Cloud database", "React"],
      featured: true,
    },
    {
      title: "Unified Workspace",
      description:
        "Productivity hub integrating Gmail, Calendar, and Google Tasks via OAuth 2.0 and Google APIs, cutting context switching and improving workflow efficiency 60%+. Added AI-assisted prioritization and scheduling with responsive UI, improving time management roughly 30–40%.",
      stack: ["Next.js", "OAuth 2.0", "Google APIs", "AI-assisted scheduling"],
      featured: true,
    },
    {
      title: "AI-powered food recognition & recipe generator (CWM)",
      description:
        "Image-to-recipe pipeline using Vertex AI and Google Vision to recognize dishes and return ingredients plus step-by-step instructions, simplifying meal prep.",
      stack: ["Vertex AI", "Google Vision API", "JavaScript / web UI"],
      featured: true,
    },
    {
      title: "Event Planner Manager",
      description:
        "Full-stack event planning app in this monorepo—auth, relational data, and polished UI for real-world scheduling workflows.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      repoUrl: "https://github.com/ToluwaniEsan/event-planner",
      featured: false,
    },
  ],
};

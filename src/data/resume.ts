/**
 * Single source of truth for all portfolio content.
 * Every fact here is taken directly from Resume.pdf — edit this file to update the site.
 */

export const profile = {
  name: "Anand Jonnadula",
  firstName: "Anand",
  lastName: "Jonnadula",
  initials: "AJ",
  role: "AI Engineer & Full-Stack Developer",
  roleParts: ["AI Engineer", "Full-Stack Developer"],
  tagline:
    "I ship production-grade software — from a live ERP to calibrated deep-learning medical-imaging systems.",
  summary:
    "AI engineer and Full-stack developer (B.Tech, Artificial Intelligence & Data Science) who ships production-grade software — from a live ERP built on Next.js/React to calibrated deep-learning medical-imaging systems in Python/TensorFlow. Works AI-first, pairing strong engineering fundamentals with Claude and OpenAI Codex-driven development. Proven campus leader as President of the Student Activities Council.",
  email: "anandjonn8@gmail.com",
  phone: "+91 7893409087",
  phoneSecondary: "+91 7569895886",
  github: "https://github.com/anandjonnadula",
  githubHandle: "anandjonnadula",
  linkedin: "https://www.linkedin.com/in/anand-jonnadula",
  linkedinHandle: "anand-jonnadula",
  portrait: "/anand-portrait.webp",
  languages: ["English", "Telugu", "Hindi", "German"],
  degree: "B.Tech — Artificial Intelligence & Data Science",
  college: "Vasireddy Venkatadri Institute of Technology",
  collegeShort: "VVIT",
  gradClass: "Class of 2026",
  cgpa: "7.52",
  resumeFile: "/Anand-Jonnadula-Resume.pdf",
} as const;

export const about = {
  heading: "Software that ships, models that hold up.",
  paragraphs: [
    "I'm Anand — a B.Tech graduate in Artificial Intelligence & Data Science at Vasireddy Venkatadri Institute of Technology (Class of 2026), and a developer who measures work by what actually reaches production.",
    "That standard runs through everything I've built: a live ERP on Next.js with twelve role-based portals behind a single JWT-secured login; a calibrated two-stage CNN for bone-fracture detection with clinical-grade features like Grad-CAM explainability; and a disease-prediction platform trained on real survey data I collected across an entire village.",
    "I work AI-first — pairing strong engineering fundamentals with Claude and OpenAI Codex-driven development — and I lead beyond the codebase, served as President of the Student Activities Council and completed four years of NSS community service.",
  ],
  facts: [
    { label: "Degree", value: "B.Tech Graduate, AI & DS" },
    { label: "Institute", value: "VVIT · Class of 2026" },
    { label: "CGPA", value: "7.52" },
    { label: "Languages", value: "English · Telugu · Hindi · German" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  blurb: string;
  skills: string[];
  accent?: boolean;
};

/** Grouped view — from the resume's Technical Skills section plus project tech stacks. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Programming & Machine Learning",
    blurb: "Core language plus the ML stack used across my medical-imaging and health-prediction projects.",
    skills: ["Python", "TensorFlow / Keras", "scikit-learn", "NumPy", "Pandas", "OpenCV"],
  },
  {
    title: "Web & Frontend",
    blurb: "The stack behind my live university ERP platform.",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML + CSS"],
  },
  {
    title: "Backend, Data & Delivery",
    blurb: "APIs, auth, persistence and packaging for production deployments.",
    skills: ["Flask", "Prisma ORM", "SQLite", "JWT & RBAC", "Docker"],
  },
  {
    title: "AI-First Development",
    blurb: "AI-assisted development and prompt engineering as a daily engineering workflow.",
    skills: ["Claude", "OpenAI Codex", "ChatGPT", "Prompt Engineering"],
    accent: true,
  },
];

/**
 * GitHub pages for every technology label used in the skill cards and
 * project tech tags. Labels must match the display strings exactly.
 */
export const techLinks: Record<string, string> = {
  Python: "https://github.com/python/cpython",
  "React.js": "https://github.com/facebook/react",
  React: "https://github.com/facebook/react",
  "Next.js": "https://github.com/vercel/next.js",
  TypeScript: "https://github.com/microsoft/TypeScript",
  "Tailwind CSS": "https://github.com/tailwindlabs/tailwindcss",
  JavaScript: "https://github.com/tc39/ecma262",
  "HTML + CSS": "https://github.com/whatwg/html",
  "HTML / CSS / JavaScript": "https://github.com/whatwg/html",
  Flask: "https://github.com/pallets/flask",
  TensorFlow: "https://github.com/tensorflow/tensorflow",
  Keras: "https://github.com/keras-team/keras",
  "TensorFlow / Keras": "https://github.com/tensorflow/tensorflow",
  MobileNetV2: "https://github.com/tensorflow/models",
  OpenCV: "https://github.com/opencv/opencv",
  "scikit-learn": "https://github.com/scikit-learn/scikit-learn",
  NumPy: "https://github.com/numpy/numpy",
  Pandas: "https://github.com/pandas-dev/pandas",
  "Prisma ORM": "https://github.com/prisma/prisma",
  SQLite: "https://github.com/sqlite/sqlite",
  Docker: "https://github.com/moby/moby",
  JWT: "https://github.com/auth0/node-jsonwebtoken",
  "JWT & RBAC": "https://github.com/auth0/node-jsonwebtoken",
  Claude: "https://github.com/anthropics",
  "OpenAI Codex": "https://github.com/openai/codex",
  ChatGPT: "https://github.com/openai/openai-cookbook",
  "Prompt Engineering": "https://github.com/dair-ai/Prompt-Engineering-Guide",
};

export type OrbitSkill = {
  label: string;
  /** GitHub page opened when the word is clicked inside the galaxy. */
  url: string;
};

/** Flat list rendered in the 3D skill galaxy. */
export const orbitSkills: OrbitSkill[] = [
  { label: "Python", url: "https://github.com/python/cpython" },
  { label: "React.js", url: "https://github.com/facebook/react" },
  { label: "Next.js", url: "https://github.com/vercel/next.js" },
  { label: "TypeScript", url: "https://github.com/microsoft/TypeScript" },
  { label: "Tailwind CSS", url: "https://github.com/tailwindlabs/tailwindcss" },
  { label: "JavaScript", url: "https://github.com/tc39/ecma262" },
  { label: "HTML + CSS", url: "https://github.com/whatwg/html" },
  { label: "Flask", url: "https://github.com/pallets/flask" },
  { label: "TensorFlow", url: "https://github.com/tensorflow/tensorflow" },
  { label: "Keras", url: "https://github.com/keras-team/keras" },
  { label: "OpenCV", url: "https://github.com/opencv/opencv" },
  { label: "scikit-learn", url: "https://github.com/scikit-learn/scikit-learn" },
  { label: "NumPy", url: "https://github.com/numpy/numpy" },
  { label: "Pandas", url: "https://github.com/pandas-dev/pandas" },
  { label: "Prisma ORM", url: "https://github.com/prisma/prisma" },
  { label: "SQLite", url: "https://github.com/sqlite/sqlite" },
  { label: "Docker", url: "https://github.com/moby/moby" },
  { label: "JWT", url: "https://github.com/auth0/node-jsonwebtoken" },
  { label: "Claude", url: "https://github.com/anthropics" },
  { label: "OpenAI Codex", url: "https://github.com/openai/codex" },
  { label: "Prompt Engineering", url: "https://github.com/dair-ai/Prompt-Engineering-Guide" },
];

export type Project = {
  index: string;
  title: string;
  kind: string;
  period: string;
  subtitle: string;
  bullets: string[];
  tech: string[];
  metrics?: { value: string; label: string }[];
  liveUrl?: string;
  /** Tint used for the card's hover glow. */
  hue: "violet" | "cyan" | "mint";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "University Management System",
    kind: "Full-Stack ERP Platform",
    period: "Jul 2026",
    subtitle:
      "A complete, deployed university ERP — an SEO-optimized public website plus twelve role-based portals behind a single secure login.",
    bullets: [
      "Built and deployed a complete university ERP: an SEO-optimized public website plus 12 role-based portals behind a single JWT-secured login with RBAC and ownership-scoped authorization.",
      "Implemented real end-to-end workflows — automatic parent alerts, assignment grading, fee payments, result publication and an admission offer-to-enrol pipeline.",
      "Engineered a grounded AI campus assistant that answers only from a verified knowledge base and refuses rather than hallucinates.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma ORM", "SQLite", "JWT"],
    metrics: [
      { value: "12", label: "role-based portals" },
      { value: "1", label: "JWT-secured login with RBAC" },
      { value: "Live", label: "deployed on Vercel" },
    ],
    liveUrl: "https://university-website-taupe.vercel.app",
    hue: "violet",
  },
  {
    index: "02",
    title: "Bone Fracture Detection",
    kind: "Deep-Learning Medical Imaging Web App",
    period: "Dec 2025 – Jul 2026",
    subtitle:
      "A calibrated two-stage CNN pipeline with clinical-grade product features — explainability, OOD gating and role-based portals.",
    bullets: [
      "Engineered a calibrated two-stage CNN pipeline (transfer learning on MobileNetV2) achieving 90.4% balanced accuracy, 98.8% fracture recall and 0.976 ROC AUC, with 12-class fracture-type classification.",
      "Shipped clinical-grade product features: an out-of-distribution input gate and an interactive Grad-CAM explainability viewer.",
      "Delivered asynchronous inference with live progress, PDF diagnostic reports and dedicated Patient, Doctor and Admin portals.",
    ],
    tech: ["Python", "Flask", "TensorFlow / Keras", "MobileNetV2", "OpenCV", "SQLite", "Docker"],
    metrics: [
      { value: "90.4%", label: "balanced accuracy" },
      { value: "98.8%", label: "fracture recall" },
      { value: "0.976", label: "ROC AUC" },
    ],
    hue: "cyan",
  },
  {
    index: "03",
    title: "Disease Prediction System",
    kind: "Community Health ML Platform",
    period: "Jun 2025 – Nov 2025",
    subtitle:
      "Real-world machine learning for rural healthcare, built on data from a village-wide health survey I conducted in Kantheru.",
    bullets: [
      "Conducted a village-wide health survey in Kantheru and built a symptom-based disease-prediction web application on the collected real-world data — promoting early diagnosis and preventive care in a rural, resource-limited community.",
      "Combined ML models with model-agreement voting to deliver real-time predictions with confidence levels.",
      "Designed a simple web interface usable by both residents and health workers.",
    ],
    tech: ["Python", "Flask", "scikit-learn", "NumPy", "Pandas", "HTML / CSS / JavaScript"],
    metrics: [
      { value: "1", label: "village-wide health survey" },
      { value: "Real-time", label: "predictions with confidence levels" },
    ],
    hue: "mint",
  },
];

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  type: "Leadership" | "Volunteer";
  points: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Student President",
    org: "Student Activities Council, VVIT",
    period: "Feb 2025 – Jun 2026",
    type: "Leadership",
    points: [
      "Lead the student council — campus-wide events and student-welfare initiatives, coordinating between the student body, faculty and administration.",
    ],
  },
  {
    role: "Marketing Lead & Representative",
    org: "Student Activities Council, VVIT",
    period: "Feb 2023 – Feb 2025",
    type: "Leadership",
    points: [
      "Represented SAC as Marketing Lead and managed the college's official social-media handles for two years.",
    ],
  },
  {
    role: "Volunteer, Social Services",
    org: "National Service Scheme (NSS)",
    period: "Nov 2022 – Jun 2026",
    type: "Volunteer",
    points: [
      "Four years of community service, including the Kantheru village health survey that led to the production of the Disease Prediction System.",
    ],
  },
];

export type EducationEntry = {
  title: string;
  institution: string;
  period: string;
  score: { label: string; value: string };
  detail?: string;
  featured?: boolean;
};

export const education: EducationEntry[] = [
  {
    title: "B.Tech — Artificial Intelligence & Data Science",
    institution: "Vasireddy Venkatadri Institute of Technology",
    period: "Class of 2026",
    score: { label: "CGPA", value: "7.52" },
    detail: "Specialised in AI and data science with a portfolio of deployed, production-grade projects.",
    featured: true,
  },
  {
    title: "Class XII — CBSE",
    institution: "Sri Vivekananda Central School",
    period: "2022",
    score: { label: "Score", value: "83.8%" },
  },
  {
    title: "Class X — CBSE",
    institution: "Sri Vivekananda Central School",
    period: "2020",
    score: { label: "Score", value: "87.4%" },
  },
];

export const highlights = {
  stats: [
    { value: 90.4, decimals: 1, suffix: "%", label: "Balanced accuracy", detail: "calibrated fracture-detection CNN" },
    { value: 0.976, decimals: 3, suffix: "", label: "ROC AUC", detail: "two-stage medical-imaging pipeline" },
    { value: 12, decimals: 0, suffix: "", label: "Role-based portals", detail: "in one live university ERP" },
    { value: 4, decimals: 0, suffix: "", label: "Years of service", detail: "NSS community volunteering" },
  ],
  pills: [
    "98.8% fracture recall",
    "President — Student Activities Council",
    "Handled official college social media pages for two years",
    "Live ERP deployed on Vercel",
  ],
} as const;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

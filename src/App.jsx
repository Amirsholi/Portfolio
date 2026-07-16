import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  AudioWaveform,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Code2,
  Copy,
  CreditCard,
  Database,
  ExternalLink,
  FileDown,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  GraduationCap,
  Layers,
  Link,
  Mail,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  X,
  ServerCog,
  Terminal,
  Workflow,
} from "lucide-react";

const underfitAssets = [
  {
    id: "entry-video",
    title: "Gym Entry Video",
    file: "entry-video.demo",
    path: "projects > underfit > entry-video.demo",
    src: "/assets/underfit/gym-entry.gif",
    type: "image",
    meta: "Live access workflow for member check-ins.",
    bullets: [
      "Member enters ID.",
      "System validates membership status.",
      "Kiosk displays access result.",
    ],
    notes: "Kiosk UI / Membership validation / Offline-first",
  },
  {
    id: "cash-dashboard",
    title: "Cash Dashboard",
    file: "cash-dashboard.view",
    path: "projects > underfit > cash-dashboard.view",
    src: "/assets/underfit/dashboard.png",
    type: "image",
    meta: "Daily cash flow, payment methods, entries and closing controls.",
    bullets: [
      "Tracks daily entries and payment methods.",
      "Registers cash movements with a clear operational log.",
      "Supports front-desk closing and money control.",
    ],
    notes: "Electron / SQLite / Local persistence / Operational validation",
  },
  {
    id: "add-member",
    title: "Add Member",
    file: "add-member.form",
    path: "projects > underfit > add-member.form",
    src: "/assets/underfit/add-member.png",
    type: "image",
    meta: "Validated membership registration and operational data capture.",
    bullets: [
      "Captures personal, membership and payment data.",
      "Includes emergency contact and consent fields.",
      "Keeps member creation aligned with gym operations.",
    ],
    notes: "Form validation / SQLite / Desktop workflow",
  },
  {
    id: "renew-subscription",
    title: "Renew Subscription",
    file: "renew-subscription.flow",
    path: "projects > underfit > renew-subscription.flow",
    src: "/assets/underfit/renew-subscription.png",
    type: "image",
    meta: "Renewals, due dates and monthly membership business rules.",
    bullets: [
      "Updates membership due dates using monthly rules.",
      "Reduces manual renewal mistakes.",
      "Supports consistent front-desk handling.",
    ],
    notes: "Business rules / Date handling / SQLite",
  },
  {
    id: "access-history",
    title: "Access History",
    file: "access-history.log",
    path: "projects > underfit > access-history.log",
    src: "/assets/underfit/access-history.png",
    type: "image",
    meta: "Gym entry logging and traceable attendance records.",
    bullets: [
      "Registers each gym entry with date and time.",
      "Helps staff review attendance activity.",
      "Separates member access from admin workflows.",
    ],
    notes: "Local logs / SQLite / Kiosk workflow",
  },
  {
    id: "admin",
    title: "Administration",
    file: "administration.panel",
    path: "projects > underfit > administration.panel",
    src: "/assets/underfit/admin.png",
    type: "image",
    meta: "Administrative workspace for staff operations and system management.",
    bullets: [
      "Centralizes operational access for staff.",
      "Keeps admin actions separated from kiosk entry flow.",
      "Supports day-to-day management from one desktop workspace.",
    ],
    notes: "Electron admin window / Operational UI / Local data",
  },
  {
    id: "system-flow",
    title: "System Flow",
    file: "system-flow.diagram",
    path: "projects > underfit > system-flow.diagram",
    src: "/assets/underfit/system-flow.png",
    type: "image",
    meta: "Architecture and operational flow of the desktop system.",
    bullets: [
      "Admin window manages operations.",
      "Kiosk window handles member access.",
      "SQLite stores local operational data.",
    ],
    notes: "Electron windows / IPC / SQLite",
  },
];

const introText = [
  "Amir Sholi",
  "Software Developer | React, Electron & Browser Products",
  "I build practical products for real workflows.",
  "Desktop operations, browser tools and reliable local-first interfaces.",
  "Featured products: UnderFit and SampleX.",
];

const heroBadges = ["React + TypeScript", "Electron + SQLite", "Chrome MV3 + Web Audio"];

const assetPaths = {
  profile: "/assets/profile.jpg",
  underfitGym: "/assets/underfit-gym.png",
  samplexPanel: "/assets/samplex/samplex-panel.png",
  samplexHero: "/assets/samplex/samplex-hero.png",
};

const techLogos = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "HTML / CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  Electron: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
  SQLite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
};

const profileFiles = [
  { id: "contact", label: "contact.md", path: "profile > contact.md", icon: Mail, kind: "contact" },
  {
    id: "education",
    label: "education.records",
    path: "profile > education.records",
    icon: GraduationCap,
    kind: "education",
  },
  {
    id: "experience",
    label: "experience.log",
    path: "profile > experience.log",
    icon: Terminal,
    kind: "experience",
  },
  { id: "stack", label: "stack.tools", path: "profile > stack.tools", icon: Code2, kind: "stack" },
];

const underfitProjectFiles = [
  {
    id: "overview",
    label: "overview.md",
    path: "projects > underfit > overview.md",
    icon: FileText,
    kind: "underfit-overview",
  },
  ...underfitAssets.map((asset) => ({
    ...asset,
    label: asset.file,
    icon: Code2,
    kind: "underfit-feature",
  })),
];

const samplexProjectFiles = [
  {
    id: "samplex-overview",
    label: "overview.md",
    path: "projects > samplex > overview.md",
    icon: AudioWaveform,
    kind: "samplex-overview",
  },
  {
    id: "samplex-recording",
    label: "recording.demo",
    path: "projects > samplex > recording.demo",
    icon: AudioWaveform,
    kind: "samplex-feature",
    title: "Record from the active tab",
    src: "/assets/samplex/recording.gif",
    type: "image",
    meta: "Capture browser audio directly while keeping the workflow focused and visible.",
    bullets: ["Start and stop from one control.", "Follow recording status in real time.", "Keep the captured audio ready for trimming."],
    notes: "Chrome tabCapture / MediaRecorder / Live recording state",
    mediaLabel: "Recording workflow",
  },
  {
    id: "samplex-trimming",
    label: "trimming.demo",
    path: "projects > samplex > trimming.demo",
    icon: AudioWaveform,
    kind: "samplex-feature",
    title: "Trim the exact moment",
    src: "/assets/samplex/trimming.gif",
    type: "image",
    meta: "Refine the captured audio visually before analysis or export.",
    bullets: ["Set precise start and end points.", "Preview only the current selection.", "Keep duration feedback visible while editing."],
    notes: "Interactive waveform / Selection boundaries / Audio preview",
    mediaLabel: "Trimming workflow",
  },
  {
    id: "samplex-processing",
    label: "processing.view",
    path: "projects > samplex > processing.view",
    icon: Workflow,
    kind: "samplex-feature",
    title: "Process useful musical data",
    src: "/assets/samplex/processing.gif",
    type: "image",
    meta: "Turn the selected audio into clear information without leaving the extension.",
    bullets: ["Analyze BPM and musical key.", "Inspect frequency and duration.", "Refresh results when the selection changes."],
    notes: "Web Audio API / Signal analysis / Selection-aware results",
    mediaLabel: "Processing results",
  },
  {
    id: "samplex-download",
    label: "download.flow",
    path: "projects > samplex > download.flow",
    icon: FileDown,
    kind: "samplex-feature",
    title: "Export a clean WAV",
    src: "/assets/samplex/download.gif",
    type: "image",
    meta: "Download the final selection with a useful filename and no extra desktop step.",
    bullets: ["Export only the trimmed selection.", "Generate a descriptive filename.", "Track the remaining export allowance."],
    notes: "WAV encoding / Chrome downloads / Signed license allowance",
    mediaLabel: "Download workflow",
  },
];

const projectFiles = [...underfitProjectFiles, ...samplexProjectFiles];

const workspaceFiles = [...projectFiles, ...profileFiles];
const workspaceFileIds = new Set(workspaceFiles.map((file) => file.id));
const projectFileIds = projectFiles.map((file) => file.id);
const navigationFileIds = [
  "overview",
  ...underfitAssets.map((asset) => asset.id),
  "samplex-overview",
  "samplex-recording",
  "samplex-trimming",
  "samplex-processing",
  "samplex-download",
  "contact",
  "education",
  "experience",
  "stack",
];

function getAdjacentProjectFile(id, direction) {
  const index = projectFileIds.indexOf(id);
  if (index === -1) return null;

  const nextIndex = direction === "next" ? index + 1 : index - 1;
  return projectFiles[nextIndex] ?? null;
}

function getAdjacentWorkspaceFile(id, direction) {
  const index = navigationFileIds.indexOf(id);
  if (index === -1) return null;

  const nextIndex = direction === "next" ? index + 1 : index - 1;
  const nextId = navigationFileIds[nextIndex];
  return nextId ? workspaceFiles.find((file) => file.id === nextId) : null;
}

function fileIdFromLocation() {
  const id = new URLSearchParams(window.location.search).get("file");
  return id && workspaceFileIds.has(id) ? id : null;
}

function fileLocation(id) {
  const url = new URL(window.location.href);
  url.pathname = "/";
  url.search = "";
  url.searchParams.set("file", id);
  url.hash = "";
  return `${url.pathname}${url.search}`;
}

const skillGroups = [
  {
    title: "Product interfaces",
    icon: Layers,
    summary: "User-facing screens, flows and dashboards built with clarity and maintainability.",
    items: ["React", "Next.js", "JavaScript", "HTML / CSS"],
    details: [
      "Used to build structured product screens, dashboards and interaction flows.",
      "Practical focus: reusable components, stateful interfaces and responsive layouts.",
      "Examples in this portfolio: VS Code-style workspace, UnderFit admin views and contact workflow.",
    ],
  },
  {
    title: "Desktop systems",
    icon: ServerCog,
    summary: "Operational software for local workflows, persistence and everyday business use.",
    items: ["Electron", "SQLite", "Local data", "Offline-first thinking"],
    details: [
      "Used when a workflow needs to run locally as a desktop app instead of a browser page.",
      "Practical focus: app windows, local persistence, validation and business rules.",
      "Example: UnderFit runs as an Electron desktop system with SQLite persistence.",
    ],
  },
  {
    title: "Data & automation",
    icon: Database,
    summary: "Validation, reporting, process automation and structured operational data.",
    items: ["SQL", "Python", "REST APIs", "Data validation"],
    details: [
      "Used to keep operational information consistent, searchable and easier to audit.",
      "Practical focus: validation logic, structured records, API usage and reporting support.",
      "Examples: member records, renewals, access history and daily cash data.",
    ],
  },
  {
    title: "Delivery practice",
    icon: Workflow,
    summary: "Documentation, testing and iteration habits that keep systems reliable.",
    items: ["Manual testing", "Technical documentation", "Process automation", "Git"],
    details: [
      "Used to make software easier to review, maintain and improve after first delivery.",
      "Practical focus: manual QA, workflow documentation, version control and iteration.",
      "Example: testing UnderFit flows against real front-desk operations.",
    ],
  },
];

const experience = [
  {
    company: "UnderFit Desktop App",
    role: "Freelance / Real client project",
    time: "Jun 2025 - Present",
    detail:
      "Built a local desktop system for gym operations including memberships, renewals, access logging, stock, product sales and daily cash control.",
    points: [
      "Development and maintenance of a desktop gym management system used in real operations.",
      "Implemented relational data structures, business rules and operational workflows.",
      "Built membership expiration logic, ID-based access validation, stock, cash flow and sales tracking.",
      "Handled continuous maintenance, UI improvements, debugging and feature expansion.",
    ],
    tools: ["JavaScript", "Electron", "SQLite", "HTML/CSS", "Manual QA"],
    learnings: "Building for a real client means validating the product against how staff actually work, not only against the initial feature list.",
  },
  {
    company: "Alorica",
    role: "Content Moderator",
    time: "May 2024 - Oct 2025",
    detail: "High-volume data validation, policy application, QA and SLA work.",
    points: [
      "Reviewed and validated information according to internal guidelines and protocols.",
      "Applied operational policies with consistency and attention to detail.",
      "Identified inconsistencies and made structured decisions based on defined criteria.",
      "Maintained quality standards under SLA/KPI performance metrics.",
      "Documented cases and maintained process compliance standards.",
    ],
    tools: ["Internal QA tools", "Policy workflows", "Data validation", "SLA process"],
    learnings: "High-volume operational work strengthened attention to consistency, edge cases and clear process rules.",
  },
];

const terminalColumns = [
  {
    title: "Products",
    lines: [
      "UnderFit: gym operations desktop app",
      "SampleX: local-first Chrome audio sampler",
      "Built around real user workflows",
    ],
  },
  {
    title: "Toolkit",
    lines: ["React + TypeScript", "Electron + SQLite", "Chrome MV3 + Web Audio"],
  },
  {
    title: "Profile",
    lines: ["Amir Sholi", "Montevideo, Uruguay", "Product interfaces and workflow software"],
  },
];

const terminalLineCount = terminalColumns.reduce(
  (count, column) => count + column.lines.length + 1,
  1,
);

const terminalHelpLines = [
  "help",
  "",
  "Available commands:",
  "",
  "portfolio",
  "contact",
  "github",
  "linkedin",
];

const education = [
  {
    program: "Analista Programador",
    school: "CTC Ensenanza Tecnica Profesional",
    year: "Coursework completed",
    description:
      "Core programming formation: object-oriented programming, databases, algorithms, software logic and application development.",
    status: "Coursework completed",
    certificate: null,
    details: [
      "Technical software development program focused on programming foundations, databases and application logic.",
      "Based on the CTC profile as a technical education center in Salto, Uruguay.",
      "Prepared structure for diploma/certificate evidence when available.",
    ],
  },
  {
    program: "Diploma in Artificial Intelligence",
    school: "IBEC",
    year: "2024",
    description:
      "AI fundamentals, prompting, applied tools and practical ways to use AI inside workflows and technical processes.",
    status: "Completed",
    duration: "6 months",
    certificate: "/assets/certificates/ibec-ai.jpg",
    details: [
      "AI fundamentals and practical use of applied tools in workflows.",
      "Completed and approved on March 13, 2024.",
      "Prepared structure for diploma/certificate evidence when available.",
    ],
  },
  {
    program: "React.js",
    school: "CoderHouse",
    year: "2023",
    description:
      "Component-based interfaces, state, props, reusable UI patterns and frontend project structure.",
    status: "Completed",
    duration: "8 weeks",
    certificate: "/assets/certificates/coderhouse-react.png",
    details: [
      "React components, props, state, reusable interface patterns and project structure.",
      "Certificate indicates 30 hours across 8 weeks, completed on November 7, 2023.",
    ],
  },
  {
    program: "Next.js",
    school: "CoderHouse",
    year: "2023",
    description:
      "React framework fundamentals, routing, rendering patterns and production-oriented web app structure.",
    status: "Completed",
    duration: "7 weeks",
    certificate: "/assets/certificates/coderhouse-next.png",
    details: [
      "Next.js routing, rendering patterns and production-oriented React app structure.",
      "Certificate indicates 14 hours across 7 weeks, completed on December 11, 2023.",
      "The course is no longer publicly available on Coderhouse, so the certificate is used as evidence.",
    ],
  },
];

function useClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(
    () => ({
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: now.toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }),
    [now],
  );
}

function useCompactViewport() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 820px)");
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact;
}

function TextLine({ line, index }) {
  return (
    <div className="text-line">
      <span className="line-number">{String(index + 1).padStart(2, "0")}</span>
      <span>{line}</span>
    </div>
  );
}

const heroProjects = {
  underfit: {
    path: "projects/underfit.md",
    command: "open underfit --summary",
    name: "UnderFit Desktop App",
    lines: [
      "Product: desktop operations for a real gym",
      "Workflows: memberships, access and renewals",
      "Operations: cash, sales and stock control",
      "Stack: Electron, React and SQLite",
    ],
    button: "Open UnderFit project",
  },
  samplex: {
    path: "projects/samplex.md",
    command: "open samplex --summary",
    name: "SampleX Chrome Extension",
    lines: [
      "Product: local-first Chrome audio sampler",
      "Workflow: capture, trim and analyze",
      "Output: selection-aware WAV export",
      "Stack: React, TypeScript and Chrome MV3",
    ],
    button: "Open SampleX project",
  },
};

function HeroProjectPanel({ onOpenProject }) {
  return (
    <motion.div
      className="hero-project-shell"
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Featured project selector"
    >
      <div className="hero-project-heading"><span>featured_projects/</span><small>02 selected builds</small></div>
      <div className="hero-project-list">
        {Object.entries(heroProjects).map(([id, project], index) => (
          <article className={`hero-project-card hero-project-card-${id}`} key={id}>
            <button type="button" onClick={() => onOpenProject(id)}>
              <span className="hero-project-index">0{index + 1}</span>
              <span className="hero-project-icon">{id === "samplex" ? <AudioWaveform size={22} /> : <img src={assetPaths.underfitGym} alt="" />}</span>
              <span className="hero-project-copy"><small>{project.path}</small><strong>{project.name}</strong><span>{project.lines[1]}</span></span>
              <ChevronRight className="hero-project-arrow" size={18} />
            </button>
          </article>
        ))}
      </div>
      <p className="hero-project-footnote"><span className="live-dot" /> Select a project to open its complete case study.</p>
    </motion.div>
  );
}

function ModuleNavigation({ previousFile, nextFile, onOpenFile }) {
  if (!previousFile && !nextFile) return null;

  return (
    <nav className="workspace-side-nav" aria-label="Workspace file navigation">
      {previousFile ? (
        <button className="workspace-side-link previous" data-destination={previousFile.label} type="button" onClick={() => onOpenFile(previousFile.id)} title={`Previous: ${previousFile.label}`}>
          <ChevronLeft size={17} />
          <span><small>Previous</small><strong>{previousFile.label}</strong></span>
        </button>
      ) : null}
      {nextFile ? (
        <button className="workspace-side-link next" data-destination={nextFile.label} type="button" onClick={() => onOpenFile(nextFile.id)} title={`Next: ${nextFile.label}`}>
          <span><small>Next</small><strong>{nextFile.label}</strong></span>
          <ChevronRight size={17} />
        </button>
      ) : null}
    </nav>
  );
}

function UnderfitOverviewPanel({ onOpenMedia }) {
  return (
    <div className="file-document underfit-overview-file">
      <div className="file-copy overview-copy">
        <span className="file-breadcrumb">projects &gt; underfit &gt; overview.md</span>
        <p className="eyebrow">Featured real client project</p>
        <h3>UnderFit Desktop App</h3>
        <p>
          Desktop management system for a real gym operation. It centralizes
          memberships, renewals, access validation, cash flow, stock and sales
          in a local workflow designed for daily front-desk use.
        </p>
        <div className="project-actions">
          <a
            className="repo-link"
            href="https://github.com/Amirsholi/underfit-desktop-app"
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={16} />
            View repository
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="overview-content-grid">
        <figure className="overview-brand-preview">
          <button
            className="preview-media-button"
            type="button"
            onClick={() => onOpenMedia({
              type: "image",
              src: assetPaths.underfitGym,
              title: "UnderFit brand",
              caption: "UnderFit project identity preview.",
            })}
            aria-label="Open UnderFit brand preview"
          >
            <img src={assetPaths.underfitGym} alt="UnderFit brand" loading="lazy" decoding="async" />
          </button>
        </figure>

        <div className="case-study-grid">
          <article>
            <strong>Problem</strong>
            <p>
              Gym operations needed a local tool for recurring memberships,
              attendance checks, cash movement and stock without depending on a
              browser workflow.
            </p>
          </article>
          <article>
            <strong>Solution</strong>
            <p>
              A desktop app with validated forms, local persistence and screens
              shaped around real front-desk tasks.
            </p>
          </article>
          <article>
            <strong>Result</strong>
            <p>
              A practical management system that centralizes members, sales,
              access and daily control data in one operational workspace.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

function UnderfitFeaturePanel({ file, onOpenMedia }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="file-document underfit-feature-file">
      <div className="file-copy compact">
        <span className="file-breadcrumb">{file.path}</span>
        <h3>{file.title}</h3>
        <p>{file.meta}</p>
      </div>

      <motion.div
        key={file.id}
        className={`preview-pane ${file.type === "video" ? "video-preview" : "image-preview"}`}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className="preview-media-button"
          type="button"
          onClick={() => onOpenMedia({
            type: file.type,
            src: file.src,
            title: file.title,
            caption: file.meta,
          })}
          aria-label={`Open ${file.title} preview`}
        >
          {file.type === "video" ? (
            <video src={file.src} preload="metadata" muted playsInline />
          ) : (
            <img src={file.src} alt={file.title} loading="lazy" decoding="async" />
          )}
        </button>
        <div className="preview-caption">
          <strong>{file.file}</strong>
          <span>{file.meta}</span>
        </div>
      </motion.div>

      <aside className="feature-detail-grid">
        <div className="feature-notes">
          <p className="eyebrow">Details</p>
          <ul>
            {file.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="technical-notes">
          <span>Technical notes</span>
          <p>{file.notes}</p>
        </div>
      </aside>
    </div>
  );
}

function SampleXOverviewPanel({ onOpenMedia }) {
  return (
    <div className="file-document samplex-overview-file">
      <div className="file-copy samplex-copy">
        <span className="file-breadcrumb">projects &gt; samplex &gt; overview.md</span>
        <p className="eyebrow">Chrome extension / Product build</p>
        <h3>SampleX</h3>
        <p>
          A focused tab-audio sampler for capturing moments in the browser,
          trimming them visually, reading useful musical data and exporting a clean WAV.
        </p>
        <div className="project-actions">
          <a className="repo-link" href="https://github.com/Amirsholi/SampleX-studio" target="_blank" rel="noreferrer">
            <GitBranch size={16} />
            View repository
            <ExternalLink size={14} />
          </a>
          <a className="repo-link" href="/samplex/privacy"><ShieldCheck size={15} /> Privacy</a>
          <span className="samplex-status"><span /> Private beta</span>
        </div>
      </div>

      <div className="samplex-content-grid">
        <figure className="samplex-product-preview">
          <button
            className="preview-media-button"
            type="button"
            onClick={() => onOpenMedia({
              type: "image",
              src: assetPaths.samplexPanel,
              title: "SampleX extension",
              caption: "Compact tab-audio capture, trim, analysis and WAV export workflow.",
            })}
            aria-label="Open SampleX extension preview"
          >
            <img src={assetPaths.samplexPanel} alt="SampleX browser extension interface" loading="lazy" decoding="async" />
          </button>
        </figure>
        <div className="samplex-feature-grid">
          <article><strong>Capture</strong><p>Record the active tab without routing audio through another desktop tool.</p></article>
          <article><strong>Shape</strong><p>Trim the useful section and preview it directly from the waveform.</p></article>
          <article><strong>Understand</strong><p>Read BPM, key, frequency and duration while the selection changes.</p></article>
          <article><strong>Export</strong><p>Save the selected audio as WAV with a clean, descriptive filename.</p></article>
        </div>
      </div>
    </div>
  );
}

function SampleXFeaturePanel({ file, onOpenMedia }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="file-document underfit-feature-file samplex-feature-file">
      <div className="file-copy compact">
        <span className="file-breadcrumb">{file.path}</span>
        <p className="eyebrow">SampleX workflow</p>
        <h3>{file.title}</h3>
        <p>{file.meta}</p>
      </div>

      <motion.div
        key={file.id}
        className="preview-pane image-preview samplex-workflow-preview"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className="preview-media-button"
          type="button"
          onClick={() => onOpenMedia({ type: file.type, src: file.src, title: file.title, caption: file.meta })}
          aria-label={`Open ${file.title} preview`}
        >
          <img src={file.src} alt={file.title} loading="lazy" decoding="async" />
        </button>
        <div className="preview-caption">
          <strong>{file.mediaLabel}</strong>
          <span>{file.meta}</span>
        </div>
      </motion.div>

      <aside className="feature-detail-grid">
        <div className="feature-notes">
          <p className="eyebrow">Flow</p>
          <ul>{file.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </div>
        <div className="technical-notes">
          <span>Technical notes</span>
          <p>{file.notes}</p>
        </div>
      </aside>
    </div>
  );
}

export function SampleXProductPage() {
  const demoTrialActive = true;
  const [fulfillment, setFulfillment] = useState(() => {
    const checkoutId = new URLSearchParams(window.location.search).get("checkout_id");
    return checkoutId ? { checkoutId, status: "processing" } : null;
  });
  const [copied, setCopied] = useState(false);
  const [demoInterest, setDemoInterest] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "SampleX — Turn browser audio into clean WAV samples";
    description?.setAttribute("content", "Capture permitted audio from the active Chrome tab, trim it, analyze BPM, key and tone, and export a clean WAV locally with SampleX.");
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute("content", previousDescription);
    };
  }, []);

  useEffect(() => {
    if (!fulfillment?.checkoutId || fulfillment.status !== "processing") return undefined;
    let cancelled = false;
    let attempts = 0;
    let timer;

    const loadLicense = async () => {
      try {
        const response = await fetch(`/api/polar/license?checkout_id=${encodeURIComponent(fulfillment.checkoutId)}`);
        const body = await response.json();
        if (cancelled) return;
        if (response.status === 410 && body.status === "refunded") {
          setFulfillment({ checkoutId: fulfillment.checkoutId, status: "refunded" });
          return;
        }
        if (response.ok && body.status === "ready") {
          setFulfillment({ checkoutId: fulfillment.checkoutId, status: "ready", license: body.license });
          return;
        }
        if (!response.ok && response.status !== 202) throw new Error(body.error || "License lookup failed.");
        attempts += 1;
        if (attempts < 15) timer = window.setTimeout(loadLicense, 2000);
        else setFulfillment((current) => ({ ...current, status: "delayed" }));
      } catch {
        if (!cancelled) setFulfillment((current) => ({ ...current, status: "delayed" }));
      }
    };

    void loadLicense();
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [fulfillment?.checkoutId, fulfillment?.status]);

  const copyLicense = async () => {
    if (!fulfillment?.license?.token) return;
    await navigator.clipboard.writeText(fulfillment.license.token);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const registerDemoInterest = () => {
    setDemoInterest(true);
    void trackSampleXEvent("demo_interest");
  };

  if (fulfillment) {
    const ready = fulfillment.status === "ready";
    const refunded = fulfillment.status === "refunded";
    return (
      <div className="file-document buy-samplex-file">
        <div className="checkout-result">
          <div className={`checkout-result-icon ${ready ? "ready" : ""}`}>
            {ready ? <CheckCircle2 size={32} /> : <KeyRound size={29} />}
          </div>
          <p className="eyebrow">{ready ? "Payment confirmed" : refunded ? "Order refunded" : "Payment received"}</p>
          <h3>{ready ? "Your SampleX code is ready." : refunded ? "This license is no longer active." : "Preparing your SampleX code..."}</h3>
          <p>{ready ? "Copy this code and paste it into the key field in the extension." : refunded ? "The payment was refunded and the code can no longer be recovered from this checkout." : "Polar is confirming the order. This normally takes only a few seconds."}</p>
          {ready ? (
            <div className="checkout-license-code">
              <code>{fulfillment.license.token}</code>
              <button type="button" onClick={() => void copyLicense()}><Copy size={16} /> {copied ? "Copied" : "Copy code"}</button>
            </div>
          ) : null}
          {fulfillment.status === "delayed" ? <small>The order is paid, but automatic delivery is taking longer than expected. Keep this page open or contact support with your checkout reference.</small> : null}
          <span className="checkout-reference">Checkout {fulfillment.checkoutId}</span>
        </div>
      </div>
    );
  }

  return (
    <main className="samplex-landing">
      <nav className="samplex-nav" aria-label="SampleX navigation">
        <a className="samplex-nav-brand" href="/"><AudioWaveform size={22} /><span>SampleX</span></a>
        <div>
          <span className="samplex-beta">Private beta</span>
          <a href="https://github.com/Amirsholi/SampleX-studio" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14} /></a>
        </div>
      </nav>

      <section className="samplex-hero">
        <div className="samplex-hero-copy">
          <p className="samplex-kicker">A faster path from browser audio to your DAW</p>
          <h1>Find the moment.<br /><span>Keep the sample.</span></h1>
          <p className="samplex-lead">Capture permitted audio from the active Chrome tab, isolate the useful section and leave with a clean WAV plus the musical context you need.</p>
          <p className="samplex-demo-version"><span /> Demo Trial Version · 75 WAV exports included</p>
          <div className="samplex-hero-actions">
            <a className="samplex-primary-action" href="#demo-trial" onClick={registerDemoInterest}><FileDown size={18} /> Demo Trial</a>
          </div>
          <div className="samplex-trust-line">
            <span><ShieldCheck size={16} /> Processed locally</span>
            <span><CheckCircle2 size={16} /> No account required</span>
            <span><AudioWaveform size={16} /> BPM, key and tone</span>
          </div>
        </div>

        <figure className="samplex-hero-product">
          <div className="samplex-window-bar"><span /><span /><span /><small>sample selected</small></div>
          <img src="/assets/samplex/samplex-photo2.png" alt="SampleX waveform editor with a selected audio region and musical analysis" />
          <figcaption><span>Everything happens in the extension.</span><strong>Audio stays on your machine.</strong></figcaption>
        </figure>
      </section>

      <section className="samplex-demo-section" id="demo-trial" aria-labelledby="samplex-demo-title">
        <div className="samplex-demo-copy">
          <p className="samplex-kicker">Demo Trial · Coming soon</p>
          <h2 id="samplex-demo-title">Try the complete workflow before buying.</h2>
          <p>The Demo Trial will include the full capture, trim, analysis and WAV export experience with 75 exports. No account, installer or payment details required.</p>
          <span className="samplex-demo-status" role="status"><span /> {demoInterest ? "Interest registered — demo release in preparation" : "Release package in preparation"}</span>
        </div>
        <ol className="samplex-demo-steps">
          <li><span>01</span><div><strong>Download and unzip</strong><small>Save the Demo Trial package and extract it to a permanent folder.</small></div></li>
          <li><span>02</span><div><strong>Load in Chrome</strong><small>Open chrome://extensions, enable Developer mode and choose Load unpacked.</small></div></li>
          <li><span>03</span><div><strong>Pin and sample</strong><small>Pin SampleX, open an audio tab and start your first permitted capture.</small></div></li>
        </ol>
      </section>

      <section className="samplex-workflow" id="workflow">
        <header><p className="samplex-kicker">One focused workflow</p><h2>From tab to WAV without breaking your flow.</h2></header>
        <div className="samplex-workflow-steps">
          <article><span>01</span><div><AudioWaveform size={22} /><h3>Capture</h3><p>Record permitted audio directly from the active tab.</p></div></article>
          <article><span>02</span><div><Workflow size={22} /><h3>Shape</h3><p>Trim the exact region and inspect BPM, key and tone.</p></div></article>
          <article><span>03</span><div><FileDown size={22} /><h3>Export</h3><p>Download a clean WAV ready to drag into your project.</p></div></article>
        </div>
      </section>

      <section className="samplex-product-tour" aria-labelledby="samplex-tour-title">
        <header className="samplex-tour-header">
          <div><p className="samplex-kicker">The real workflow</p><h2 id="samplex-tour-title">A compact sampler that stays out of the way.</h2></div>
          <p>Open SampleX over the tab you are already using. Record, shape and understand the useful moment without sending the audio to another service.</p>
        </header>

        <div className="samplex-tour-grid">
          <article className="samplex-tour-card samplex-tour-card-wide">
            <div className="samplex-tour-copy"><span>01 / Capture</span><h3>Record the active tab on purpose.</h3><p>Capture starts only after you open SampleX and press REC. The live waveform keeps the recording readable while you listen.</p></div>
            <div className="samplex-tour-media"><img src="/assets/samplex/recording.gif" alt="SampleX recording audio from the active Chrome tab" loading="lazy" decoding="async" /></div>
          </article>
          <article className="samplex-tour-card">
            <div className="samplex-tour-copy"><span>02 / Shape</span><h3>Keep only the moment.</h3><p>Move the selection handles, preview the loop and refine the exact region before export.</p></div>
            <div className="samplex-tour-media"><img src="/assets/samplex/trimming.gif" alt="Trimming a selected audio region in SampleX" loading="lazy" decoding="async" /></div>
          </article>
          <article className="samplex-tour-card">
            <div className="samplex-tour-copy"><span>03 / Understand</span><h3>See useful musical context.</h3><p>BPM, key and dominant tone are calculated for the selected region, right where you edit it.</p></div>
            <div className="samplex-tour-media"><img src="/assets/samplex/processing.gif" alt="SampleX analyzing BPM, musical key and dominant frequency" loading="lazy" decoding="async" /></div>
          </article>
          <article className="samplex-tour-card samplex-tour-card-wide samplex-tour-card-export">
            <div className="samplex-tour-copy"><span>04 / Export</span><h3>Leave with a clean WAV.</h3><p>Export the selected region and drag it into your DAW. No project setup, account or cloud upload required.</p></div>
            <div className="samplex-tour-media"><img src="/assets/samplex/download.gif" alt="Exporting a trimmed WAV sample from SampleX" loading="lazy" decoding="async" /></div>
          </article>
        </div>
      </section>

      <section className="samplex-local-section" aria-label="SampleX privacy and architecture">
        <div className="samplex-local-mark"><ShieldCheck size={34} /><span>LOCAL<br />AUDIO</span></div>
        <div className="samplex-local-copy"><p className="samplex-kicker">Private by architecture</p><h2>Your recording does not become our data.</h2><p>Waveform editing and musical analysis happen inside the browser. SampleX does not upload recordings, waveform data or analysis results to Amir Sholi's servers.</p></div>
        <div className="samplex-local-facts"><span><strong>Active tab</strong><small>User-initiated capture</small></span><span><strong>On device</strong><small>Local processing</small></span><span><strong>Signed key</strong><small>Offline activation</small></span></div>
      </section>

      {!demoTrialActive && <section className="samplex-license-section" id="lifetime">
        <div className="samplex-license-copy">
          <p className="samplex-kicker">Simple by design</p>
          <h2>Try the complete workflow first.</h2>
          <p>Your first 75 WAV exports are included. When they run out, recording, trimming and analysis keep working; only export asks for a license.</p>
          <div className="samplex-license-note"><LockKeyhole size={18} /><span><strong>Offline activation.</strong> Your signed key is stored locally and does not require a subscription or recurring connection.</span></div>
        </div>

        <section className="samplex-price-card" aria-label="SampleX Lifetime license">
          <div className="samplex-price-heading"><span>Lifetime license</span><small>One payment</small></div>
          <div className="samplex-price"><small>US$</small><strong>15</strong></div>
          <ul>
            <li><Check size={16} /> Unlimited WAV exports</li>
            <li><Check size={16} /> Signed offline activation</li>
            <li><Check size={16} /> Future SampleX updates</li>
            <li><Check size={16} /> Manual license recovery</li>
          </ul>
          <a href="https://buy.polar.sh/polar_cl_8NHuxDGAJXfYwIOZsALhT2urRtTj23xdB2x3F37cLg6?product_id=82f19b8f-9f50-4e81-a94d-26fa83fccef5" onClick={() => void trackSampleXEvent("checkout_interest")}><CreditCard size={19} /> Unlock SampleX forever</a>
          <small className="samplex-payment-note"><LockKeyhole size={12} /> Secure checkout by Polar</small>
        </section>
      </section>}

      <footer className="terminal-footer samplex-terminal-footer" aria-label="SampleX footer navigation">
        <div className="terminal-tabs" aria-label="Terminal panel tabs"><span className="active">TERMINAL</span><span>OUTPUT</span><span>SAMPLEX</span></div>
        <div className="terminal-content samplex-terminal-content">
          <span className="terminal-command">PS C:\Users\Amir\Portfolio\SampleX&gt; product --links</span>
          <div className="samplex-terminal-grid">
            <section><strong>[PROFILE]</strong><a href="/">&gt; Back to AmirSholi()</a><a href="/?file=contact">&gt; Contact</a></section>
            <section><strong>[PROJECT]</strong><a href="https://github.com/Amirsholi/SampleX-studio" target="_blank" rel="noreferrer">&gt; GitHub repository</a><span>&gt; Chrome MV3 · React · Web Audio</span></section>
            <section><strong>[SUPPORT]</strong><a href="/samplex/privacy">&gt; Privacy</a><a href="/samplex/terms">&gt; Terms</a><a href="/samplex/refunds">&gt; Refunds</a><a href="/samplex/support">&gt; Support</a></section>
          </div>
          <span className="terminal-prompt">&gt; <span className="terminal-cursor" /></span>
        </div>
      </footer>
    </main>
  );
}

async function trackSampleXEvent(event) {
  try {
    await fetch("/api/samplex/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
      keepalive: true,
    });
  } catch {
    // Metrics must never interrupt the product flow.
  }
}

function ContactPanel({
  subject,
  message,
  onSubjectChange,
  onMessageChange,
  onSubmit,
  sent,
}) {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    const email = "amirsholi999@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1600);
  };

  return (
    <div className="contact-document">
      <div className="contact-layout">
        <form className="contact-file" onSubmit={onSubmit}>
          <div className="markdown-file-header">
            <span>contact.md</span>
            <small>message draft</small>
          </div>

          <div className="contact-card-body">
            <img className="contact-photo" src={assetPaths.profile} alt="Amir Sholi" loading="lazy" decoding="async" />
            <h3>Contact</h3>
            <p>Send a short message and I&apos;ll reply by email.</p>
            <div className="contact-inline-links">
              <button
                className="copy-email-button"
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                data-tooltip={emailCopied ? "Email copied" : "Copy email"}
              >
                <Mail size={15} />
                {emailCopied ? "Copied" : "Email"}
              </button>
              <a href="https://www.linkedin.com/in/amirsholi/" target="_blank" rel="noreferrer">
                <Link size={15} />
                LinkedIn
              </a>
              <a href="https://github.com/Amirsholi" target="_blank" rel="noreferrer">
                <GitBranch size={15} />
                GitHub
              </a>
              <CVDownloadMenu compact />
            </div>
          </div>

          <div className="contact-fields">
            <label>
              Subject
              <input
                value={subject}
                onChange={(event) => onSubjectChange(event.target.value)}
                placeholder="Project collaboration, role, automation idea..."
              />
            </label>
            <label>
              Message
              <textarea
                value={message}
                onChange={(event) => onMessageChange(event.target.value)}
                placeholder="Hi Amir, I wanted to talk about..."
                rows={4}
              />
            </label>
            <button type="submit">
              <Mail size={17} />
              {sent ? "Draft ready" : "Create message draft"}
            </button>
          </div>
        </form>

        <aside className="contact-readme" aria-label="Cover letter readme">
          <pre>{`README.md
---------

Hi, I'm Amir.

I like building useful software from close range:
understand the workflow, simplify the repeated parts
and turn messy daily operations into a clear interface.

My strongest example is UnderFit, a desktop system
for a real gym. It was shaped around practical use:
memberships, renewals, access, stock, sales and cash.

I'm interested in product teams, internal tools and
client projects where software has to be simple enough
to be used every day.`}</pre>
        </aside>
      </div>
    </div>
  );
}
function CVDownloadMenu({ compact = false }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className={`cv-menu ${compact ? "compact" : ""}`} ref={menuRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="cv-menu-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <FileDown size={15} />
        CV
      </button>
      {open ? (
        <div className="cv-menu-popover" role="menu">
          <a href="/CV_Amir_Shol_ES.pdf" download role="menuitem" onClick={() => setOpen(false)}>
            Descargar CV en Español
          </a>
          <a href="/CV_Amir_Shol_EN.pdf" download role="menuitem" onClick={() => setOpen(false)}>
            Download CV in English
          </a>
          <a href="/CV_Amir_Shol_PT_BR.pdf" download role="menuitem" onClick={() => setOpen(false)}>
            Baixar CV em Português do Brasil
          </a>
        </div>
      ) : null}
    </div>
  );
}

function openCardWithKeyboard(event, callback) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
}

function EducationPanel({ onOpenDetail }) {
  return (
    <div className="education-grid">
      {education.map((item) => (
        <article
          key={item.program}
          role="button"
          tabIndex={0}
          onClick={() => onOpenDetail({ type: "education", ...item })}
          onKeyDown={(event) => openCardWithKeyboard(event, () => onOpenDetail({ type: "education", ...item }))}
        >
          <GraduationCap size={20} />
          <div>
            <strong>{item.program}</strong>
            <span>{item.school}</span>
            <p>{item.description}</p>
          </div>
          <time>{item.year}</time>
        </article>
      ))}
    </div>
  );
}

function ExperiencePanel({ onOpenDetail }) {
  return (
    <div className="experience-nodes">
      {experience.map((item) => (
        <article
          key={item.company}
          role="button"
          tabIndex={0}
          onClick={() => onOpenDetail({ type: "experience", ...item })}
          onKeyDown={(event) => openCardWithKeyboard(event, () => onOpenDetail({ type: "experience", ...item }))}
        >
          <span className="node-dot" />
          <div>
            <strong>{item.company}</strong>
            <span>{item.role}</span>
            <small>{item.detail}</small>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <time>{item.time}</time>
        </article>
      ))}
    </div>
  );
}

function StackPanel({ onOpenDetail }) {
  return (
    <div className="stack-grid">
      {skillGroups.map((item) => {
        const Icon = item.icon;
        return (
        <article
          key={item.title}
          role="button"
          tabIndex={0}
          onClick={() => onOpenDetail({ type: "stack", ...item })}
          onKeyDown={(event) => openCardWithKeyboard(event, () => onOpenDetail({ type: "stack", ...item }))}
        >
          <Icon size={22} />
          <div>
            <strong>{item.title}</strong>
            <p>{item.summary}</p>
            <div className="skill-cloud">
              {item.items.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </article>
      );
      })}
    </div>
  );
}

function DetailModal({ detail, onClose, onOpenMedia }) {
  if (!detail) return null;

  const title = detail.program ?? detail.company ?? detail.title;
  const subtitle = detail.school ?? detail.role ?? detail.summary;
  const list = detail.details ?? detail.points ?? [];
  const chips = detail.items ?? detail.tools ?? [];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <motion.section
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="detail-modal-header">
          <div>
            <span>{detail.type}.details</span>
            <h3 id="detail-modal-title">{title}</h3>
            <p>{subtitle}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close details">
            <X size={17} />
          </button>
        </header>

        {detail.time || detail.status || detail.year || detail.duration ? (
          <div className="modal-meta-row">
            {detail.time ? <span>{detail.time}</span> : null}
            {detail.status ? <span>{detail.status}</span> : null}
            {detail.duration ? <span>{detail.duration}</span> : null}
            {detail.year && !detail.status ? <span>{detail.year}</span> : null}
          </div>
        ) : null}

        <div className="detail-modal-body">
          {detail.description || detail.detail ? (
            <p>{detail.description ?? detail.detail}</p>
          ) : null}

          {list.length ? (
            <ul>
              {list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {chips.length ? (
            <div className="modal-chip-row">
              {chips.map((item) => (
                <span key={item}>
                  {techLogos[item] ? <img src={techLogos[item]} alt="" loading="lazy" decoding="async" /> : null}
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          {detail.learnings ? (
            <div className="modal-note">
              <strong>Learning</strong>
              <span>{detail.learnings}</span>
            </div>
          ) : null}

          {detail.type === "education" ? (
            <div className="certificate-slot">
              <strong>Certificate / diploma</strong>
              {detail.certificate ? (
                <button
                  className="certificate-preview-button"
                  type="button"
                  onClick={() => onOpenMedia({
                    type: "image",
                    src: detail.certificate,
                    title: `${title} certificate`,
                    caption: `${detail.school ?? "Education"} - ${detail.duration ?? detail.year ?? ""}`.trim(),
                  })}
                >
                  <img className="certificate-preview" src={detail.certificate} alt={`${title} certificate`} loading="lazy" decoding="async" />
                  <span>Open certificate preview</span>
                </button>
              ) : (
                <span>Prepared for certificate file when available.</span>
              )}
            </div>
          ) : null}
        </div>
      </motion.section>
    </div>
  );
}

function MediaModal({ media, onClose }) {
  if (!media) return null;

  return (
    <div className="modal-backdrop media-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <motion.section
        className="media-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-modal-title"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="media-modal-header">
          <div>
            <span>preview.media</span>
            <h3 id="media-modal-title">{media.title}</h3>
            {media.caption ? <p>{media.caption}</p> : null}
          </div>
          <button type="button" onClick={onClose} aria-label="Close preview">
            <X size={17} />
          </button>
        </header>
        <div className="media-modal-body">
          {media.type === "video" ? (
            <video src={media.src} controls autoPlay />
          ) : (
            <img src={media.src} alt={media.title} />
          )}
        </div>
      </motion.section>
    </div>
  );
}

function FileTreeButton({ file, activeFile, onOpenFile }) {
  return (
    <button
      className={`file-tree-item ${file.id === activeFile ? "active" : ""}`}
      onClick={() => onOpenFile(file.id)}
    >
      <file.icon size={14} />
      <span>{file.label}</span>
    </button>
  );
}

function FileExplorer({ activeFile, onOpenFile }) {
  return (
    <>
      <div className="explorer-title">AMIR SHOLI</div>
      <div className="explorer-group">portfolio</div>
      <div className="file-tree">
        <div className="file-tree-folder">
          <span>â–¾ projects</span>
          <div className="file-tree-folder nested">
            <span>â–¾ underfit</span>
            <div className="file-tree-files">
              {underfitProjectFiles.map((file) => (
                <FileTreeButton
                  key={file.id}
                  file={file}
                  activeFile={activeFile}
                  onOpenFile={onOpenFile}
                />
              ))}
            </div>
          </div>
          <div className="file-tree-folder nested">
            <span>samplex</span>
            <div className="file-tree-files">
              {samplexProjectFiles.map((file) => (
                <FileTreeButton key={file.id} file={file} activeFile={activeFile} onOpenFile={onOpenFile} />
              ))}
            </div>
          </div>
        </div>

        <div className="file-tree-folder">
          <span>â–¾ profile</span>
          <div className="file-tree-files">
            {profileFiles.map((file) => (
              <FileTreeButton
                key={file.id}
                file={file}
                activeFile={activeFile}
                onOpenFile={onOpenFile}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function FolderToggle({ label, open, onClick, depth = 0 }) {
  const FolderIcon = open ? FolderOpen : Folder;
  const ChevronIcon = open ? ChevronDown : ChevronRight;

  return (
    <button className="file-tree-folder-toggle" data-depth={depth} onClick={onClick}>
      <ChevronIcon size={14} />
      <FolderIcon size={15} />
      <span>{label}</span>
    </button>
  );
}

function CollapsibleFileExplorer({ activeFile, onOpenFile, folders, onToggleFolder }) {
  return (
    <>
      <div className="explorer-title">AMIR SHOLI</div>
      <div className="explorer-group">portfolio</div>
      <div className="file-tree">
        <div className="file-tree-folder">
          <FolderToggle
            label="PROJECTS"
            open={folders.projects}
            onClick={() => onToggleFolder("projects")}
          />
          {folders.projects ? (
            <div className="file-tree-folder nested">
              <FolderToggle
                label="underfit"
                open={folders.underfit}
                onClick={() => onOpenFile("overview")}
                depth={1}
              />
              {folders.underfit ? (
                <div className="file-tree-files">
                  {underfitProjectFiles.map((file) => (
                    <FileTreeButton
                      key={file.id}
                      file={file}
                      activeFile={activeFile}
                      onOpenFile={onOpenFile}
                    />
                  ))}
                </div>
              ) : null}
              <FolderToggle
                label="samplex"
                open={folders.samplex}
                onClick={() => onOpenFile("samplex-overview")}
                depth={1}
              />
              {folders.samplex ? (
                <div className="file-tree-files">
                  {samplexProjectFiles.map((file) => (
                    <FileTreeButton key={file.id} file={file} activeFile={activeFile} onOpenFile={onOpenFile} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="file-tree-folder profile-tree-group">
          <FolderToggle
            label="PROFILE"
            open={folders.profile}
            onClick={() => onToggleFolder("profile")}
          />
          {folders.profile ? (
            <div className="file-tree-files">
              {profileFiles.map((file) => (
                <FileTreeButton
                  key={file.id}
                  file={file}
                  activeFile={activeFile}
                  onOpenFile={onOpenFile}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function TerminalFooter() {
  const shouldReduceMotion = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(shouldReduceMotion ? terminalLineCount : 0);
  const [showHelp, setShowHelp] = useState(false);
  const [visibleHelpLines, setVisibleHelpLines] = useState(0);

  useEffect(() => {
    if (!started || shouldReduceMotion) {
      if (shouldReduceMotion) setVisibleLines(terminalLineCount);
      return undefined;
    }

    setVisibleLines(0);
    const timer = window.setInterval(() => {
      setVisibleLines((current) => {
        if (current >= terminalLineCount) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 52);

    return () => window.clearInterval(timer);
  }, [started, shouldReduceMotion]);

  useEffect(() => {
    if (!showHelp) {
      setVisibleHelpLines(0);
      return undefined;
    }

    if (shouldReduceMotion) {
      setVisibleHelpLines(terminalHelpLines.length);
      return undefined;
    }

    setVisibleHelpLines(0);
    const timer = window.setInterval(() => {
      setVisibleHelpLines((current) => {
        if (current >= terminalHelpLines.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 70);

    return () => window.clearInterval(timer);
  }, [showHelp, shouldReduceMotion]);

  const renderedHelpLines = showHelp ? terminalHelpLines.slice(0, visibleHelpLines) : [];
  let visibleBudget = visibleLines;
  const showCommand = visibleBudget-- > 0;

  return (
    <motion.section
      className="terminal-footer"
      aria-label="Portfolio terminal summary"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={() => setStarted(true)}
      onMouseEnter={() => setShowHelp(true)}
      onMouseOver={() => setShowHelp(true)}
      onMouseLeave={() => setShowHelp(false)}
      onFocus={() => setShowHelp(true)}
      tabIndex={0}
    >
      <div className="terminal-tabs" aria-label="Terminal panel tabs">
        <span className="active">TERMINAL</span>
        <span>PROBLEMS</span>
        <span>OUTPUT</span>
      </div>
      <div className="terminal-content" aria-live="polite">
        <span className="terminal-command">
          {showCommand ? "PS C:\\Users\\Amir\\Portfolio> portfolio --summary" : ""}
        </span>
        <div className="terminal-grid">
          {terminalColumns.map((column) => {
            const showTitle = visibleBudget-- > 0;
            const visibleColumnLines = column.lines.filter(() => visibleBudget-- > 0);

            return (
              <section className="terminal-column" key={column.title}>
                <strong>{showTitle ? `[${column.title}]` : ""}</strong>
                {visibleColumnLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </section>
            );
          })}
        </div>
        {renderedHelpLines.length > 0 ? (
          <div className="terminal-help">
            {renderedHelpLines.map((line, index) => (
              <span className={index === 0 ? "terminal-help-command" : undefined} key={`help-${line}-${index}`}>
                {line}
              </span>
            ))}
          </div>
        ) : null}
        <span className="terminal-prompt">
          &gt; <span className="terminal-cursor" />
        </span>
      </div>
    </motion.section>
  );
}

export function App() {
  const shouldReduceMotion = useReducedMotion();
  const isCompactViewport = useCompactViewport();
  const stageRef = useRef(null);
  const workbenchRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0.05) return 1;
    if (progress >= 0.45) return 0.18;
    return 1 - ((progress - 0.05) / 0.4) * 0.82;
  });
  const heroScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.84]);
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, 8]);
  const workspaceOpacity = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0.04) return 0;
    if (progress >= 0.18) return 1;
    return (progress - 0.04) / 0.14;
  });
  const workspaceScale = useTransform(scrollYProgress, [0.04, 0.22], [0.88, 1]);
  const workspaceY = useTransform(scrollYProgress, [0.04, 0.22], [132, 0]);
  const clock = useClock();
  const [activeFile, setActiveFile] = useState(() => {
    return fileIdFromLocation() ?? "contact";
  });
  const [folders, setFolders] = useState({
    projects: true,
    underfit: true,
    samplex: false,
    profile: true,
  });
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const active = workspaceFiles.find((file) => file.id === activeFile) ?? workspaceFiles[0];
  const previousActiveFile = getAdjacentWorkspaceFile(activeFile, "previous");
  const nextActiveFile = getAdjacentWorkspaceFile(activeFile, "next");

  const openFile = (id, shouldScroll = false, historyMode = "push") => {
    if (!workspaceFileIds.has(id)) return;
    setActiveFile(id);
    if (underfitProjectFiles.some((file) => file.id === id)) {
      setFolders((current) => ({ ...current, projects: true, underfit: true, samplex: false }));
    } else if (samplexProjectFiles.some((file) => file.id === id)) {
      setFolders((current) => ({ ...current, projects: true, underfit: false, samplex: true }));
    }

    if (historyMode !== "none") {
      const nextLocation = fileLocation(id);
      const currentLocation = `${window.location.pathname}${window.location.search}`;
      if (nextLocation !== currentLocation) {
        window.history[historyMode === "replace" ? "replaceState" : "pushState"]({ file: id }, "", nextLocation);
      }
    }

    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        scrollWorkbenchIntoView();
      });
    }
  };

  const getWorkbenchTarget = () => {
    const workbench = workbenchRef.current;
    if (!workbench) return window.scrollY;

    const rect = workbench.getBoundingClientRect();
    const viewportPadding = Math.max(16, Math.min(34, window.innerHeight * 0.04));
    const centeredTop = window.scrollY + rect.top - Math.max(0, (window.innerHeight - rect.height) / 2);
    const fitTop = window.scrollY + rect.bottom - window.innerHeight + viewportPadding;
    return (
      rect.height + viewportPadding * 2 <= window.innerHeight
        ? centeredTop
        : fitTop
    );
  };

  const scrollWorkbenchIntoView = () => {
    window.scrollTo({
      top: getWorkbenchTarget(),
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const openProjectFromHero = (project) => {
    if (project === "samplex") {
      window.location.assign("/samplex");
      return;
    }
    openFile("overview", true);
  };

  useEffect(() => {
    const syncRoute = () => {
      const target = fileIdFromLocation() ?? "contact";
      openFile(target, Boolean(fileIdFromLocation()), "none");
    };

    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, [shouldReduceMotion]);

  const toggleFolder = (folder) => {
    setFolders((current) => {
      if (folder === "underfit") return { ...current, projects: true, underfit: !current.underfit, samplex: false };
      if (folder === "samplex") return { ...current, projects: true, underfit: false, samplex: !current.samplex };
      return { ...current, [folder]: !current[folder] };
    });
  };

  const prepareEmail = (event) => {
    event.preventDefault();
    const encodedSubject = encodeURIComponent(subject || "Portfolio contact");
    const encodedBody = encodeURIComponent(message || "Hi Amir, ");
    window.open(
      `mailto:amirsholi999@gmail.com?subject=${encodedSubject}&body=${encodedBody}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
    window.setTimeout(() => setSent(false), 1800);
  };

  useEffect(() => {
    if (!selectedDetail && !selectedMedia) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        if (selectedMedia) {
          setSelectedMedia(null);
        } else {
          setSelectedDetail(null);
        }
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedDetail, selectedMedia]);

  const useSimpleMotion = shouldReduceMotion || isCompactViewport;
  const heroScrollStyle = useSimpleMotion
    ? undefined
    : {
        opacity: heroOpacity,
        scale: heroScale,
        y: heroY,
      };
  const workspaceScrollStyle = useSimpleMotion
    ? { opacity: 1, scale: 1, y: 0 }
    : {
        opacity: workspaceOpacity,
        scale: workspaceScale,
        y: workspaceY,
      };

  return (
    <>
    <main className="desktop-shell">
      <div className="ambient-grid" />

      <nav className="top-bar">
        <div className="brand-chip">
          <span className="avatar">
            <img src={assetPaths.profile} alt="" loading="eager" decoding="async" />
            <span>AS</span>
          </span>
          <div>
            <strong>Amir Sholi</strong>
            <small>React, Electron & browser products</small>
          </div>
        </div>
        <div className="command-palette">
          <Terminal size={16} />
          <span>workspace:</span>
          <button className="active">amir-sholi</button>
        </div>
        <div className="global-nav">
          <button onClick={() => openFile("contact", true)}>
            <Mail size={15} />
            Contact
          </button>
          <a href="https://www.linkedin.com/in/amirsholi/" target="_blank" rel="noreferrer">
            <Link size={15} />
            LinkedIn
          </a>
          <a href="https://github.com/Amirsholi" target="_blank" rel="noreferrer">
            <GitBranch size={15} />
            GitHub
          </a>
          <CVDownloadMenu />
          <span className="live-dot">{clock.time}</span>
        </div>
      </nav>

      <section className="landing-stage" ref={stageRef}>
        <motion.section className="boot-hero" style={heroScrollStyle}>
          <motion.div
            className="hero-identity"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">profile.txt</p>
            <h1 className="code-name">AmirSholi()</h1>
            <h2>Software Developer | React, Electron & Browser Products</h2>
            <p>
              I build practical products for real workflows: desktop operations,
              browser tools and clear interfaces backed by reliable local data.
            </p>
            <div className="hero-badges" aria-label="Core skills">
              {heroBadges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
            <div className="hero-actions">
              <button onClick={() => openFile("contact", true)}>
                <Mail size={17} />
                Contact
              </button>
              <a href="https://github.com/Amirsholi" target="_blank" rel="noreferrer">
                <GitBranch size={17} />
                GitHub
              </a>
              <span>
                Montevideo, Uruguay
              </span>
            </div>
          </motion.div>

          <HeroProjectPanel
            onOpenProject={openProjectFromHero}
          />
        </motion.section>

        <div className="workbench-frame">
          <ModuleNavigation
            previousFile={previousActiveFile}
            nextFile={nextActiveFile}
            onOpenFile={openFile}
          />
          <motion.section
            ref={workbenchRef}
            className="workbench"
            aria-label="Amir Sholi workspace"
            style={workspaceScrollStyle}
          >
        <aside className="activity-bar" aria-label="Workspace sections">
          {[
            workspaceFiles.find((file) => file.id === "overview"),
            workspaceFiles.find((file) => file.id === "contact"),
            workspaceFiles.find((file) => file.id === "experience"),
            workspaceFiles.find((file) => file.id === "stack"),
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={id === activeFile ? "active" : ""}
              onClick={() => openFile(id)}
              title={label}
            >
              <Icon size={20} />
            </button>
          ))}
        </aside>

        <aside className="explorer">
          <CollapsibleFileExplorer
            activeFile={activeFile}
            onOpenFile={openFile}
            folders={folders}
            onToggleFolder={toggleFolder}
          />
        </aside>

        <section className="editor-area">
          <div className="editor-tabs">
            <button className="active">{active.label}</button>
          </div>

          <motion.div
            key={activeFile}
            className="editor-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
          >
            <header className="panel-header">
              <active.icon size={18} />
              <div>
                <strong>{active.label}</strong>
                <span>{active.path}</span>
              </div>
            </header>

            {active.kind === "underfit-overview" ? (
              <UnderfitOverviewPanel onOpenMedia={setSelectedMedia} />
            ) : null}
            {active.kind === "underfit-feature" ? (
              <UnderfitFeaturePanel file={active} onOpenMedia={setSelectedMedia} />
            ) : null}
            {active.kind === "samplex-overview" ? (
              <SampleXOverviewPanel onOpenMedia={setSelectedMedia} />
            ) : null}
            {active.kind === "samplex-feature" ? (
              <SampleXFeaturePanel file={active} onOpenMedia={setSelectedMedia} />
            ) : null}
            {active.kind === "contact" ? (
              <ContactPanel
                subject={subject}
                message={message}
                onSubjectChange={setSubject}
                onMessageChange={setMessage}
                onSubmit={prepareEmail}
                sent={sent}
              />
            ) : null}
            {active.kind === "education" ? <EducationPanel onOpenDetail={setSelectedDetail} /> : null}
            {active.kind === "experience" ? <ExperiencePanel onOpenDetail={setSelectedDetail} /> : null}
            {active.kind === "stack" ? <StackPanel onOpenDetail={setSelectedDetail} /> : null}
          </motion.div>
        </section>
        <footer className="status-bar" aria-label="Workspace status">
          <span>main</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>React</span>
          <span>Vite</span>
        </footer>
          </motion.section>
        </div>
      </section>
    </main>
    <DetailModal
      detail={selectedDetail}
      onClose={() => setSelectedDetail(null)}
      onOpenMedia={setSelectedMedia}
    />
    <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
    <TerminalFooter />
    </>
  );
}

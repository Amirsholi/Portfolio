import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  AudioWaveform,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
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
  "Software Developer | React, Electron & AI-assisted Workflows",
  "I build practical software for real workflows.",
  "Desktop systems, product interfaces, data validation and automation.",
  "Featured build: UnderFit Desktop App.",
];

const heroBadges = ["React / Next.js", "Electron + SQLite", "QA & Data validation"];

const assetPaths = {
  profile: "/assets/profile.jpg",
  underfitGym: "/assets/underfit-gym.png",
  samplexPanel: "/assets/samplex/samplex-panel.png",
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

const commerceFiles = [
  {
    id: "buy-samplex",
    label: "Buy SampleX",
    path: "portfolio > Buy SampleX",
    icon: CreditCard,
    kind: "buy-samplex",
  },
];

const projectFiles = [...underfitProjectFiles, ...samplexProjectFiles];

const workspaceFiles = [...projectFiles, ...commerceFiles, ...profileFiles];
const projectFileIds = projectFiles.map((file) => file.id);
const navigationFileIds = [
  "overview",
  ...underfitAssets.map((asset) => asset.id),
  "samplex-overview",
  "samplex-recording",
  "samplex-trimming",
  "samplex-processing",
  "samplex-download",
  "buy-samplex",
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
    title: "Summary",
    lines: [
      "Real client: UnderFit Gym",
      "Frontend: React",
      "Desktop: Electron",
      "Database: SQLite",
      "AI workflows: In progress",
    ],
  },
  {
    title: "Git status",
    lines: ["Branch: main", "Status: up to date", "Working tree: clean"],
  },
  {
    title: "Last commit",
    lines: ["commit 6fd8a14", "Author: Amir Sholi", "feat:", "solving real-world problems"],
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
      "Context: real gym workflow system",
      "Core: memberships, renewals, access validation",
      "Ops: stock, sales and cash control",
      "Status: built for practical daily use",
    ],
    button: "Open UnderFit project",
  },
  samplex: {
    path: "projects/samplex.md",
    command: "open samplex --summary",
    name: "SampleX Chrome Extension",
    lines: [
      "Context: capture audio from the active tab",
      "Core: record, trim and analyze samples",
      "Output: clean WAV export",
      "Status: private beta with signed licensing",
    ],
    button: "Open SampleX project",
  },
};

function HeroProjectPanel({ selectedProject, onSelectProject, onOpenProject }) {
  const project = heroProjects[selectedProject];

  return (
    <motion.div
      className={`hero-project-shell hero-project-${selectedProject}`}
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Featured project selector"
    >
      <div className="hero-project-switch" role="tablist" aria-label="Featured projects">
        {Object.keys(heroProjects).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selectedProject === id}
            className={selectedProject === id ? "active" : ""}
            onClick={() => onSelectProject(id)}
          >
            {id === "underfit" ? "UnderFit" : "SampleX"}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedProject}
          className="hero-code hero-underfit-panel"
          initial={{ opacity: 0, x: 18, filter: "blur(5px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -18, filter: "blur(5px)" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${project.name} summary`}
        >
          <div className="floating-path">
            <Code2 size={15} />
            <span>{project.path}</span>
          </div>
          <div className="code-body hero-code-body hero-underfit-code">
            <div className="hero-console-line">
              <span>PS C:\Users\Amir\Portfolio&gt;</span>
              <strong> {project.command}</strong>
            </div>
            <div className="hero-console-output">
              <span>Project: {project.name}</span>
              {project.lines.map((line) => <span key={line}>{line}</span>)}
            </div>
            <button className="underfit-jump" type="button" onClick={() => onOpenProject(selectedProject)}>
              {project.button}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
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

function BuySampleXPanel() {
  const [fulfillment, setFulfillment] = useState(() => {
    const checkoutId = new URLSearchParams(window.location.search).get("checkout_id");
    return checkoutId ? { checkoutId, status: "processing" } : null;
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!fulfillment?.checkoutId || fulfillment.status === "ready") return undefined;
    let cancelled = false;
    let attempts = 0;
    let timer;

    const loadLicense = async () => {
      try {
        const response = await fetch(`/api/polar/license?checkout_id=${encodeURIComponent(fulfillment.checkoutId)}`);
        const body = await response.json();
        if (cancelled) return;
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

  if (fulfillment) {
    const ready = fulfillment.status === "ready";
    return (
      <div className="file-document buy-samplex-file">
        <div className="checkout-result">
          <div className={`checkout-result-icon ${ready ? "ready" : ""}`}>
            {ready ? <CheckCircle2 size={32} /> : <KeyRound size={29} />}
          </div>
          <p className="eyebrow">{ready ? "Payment confirmed" : "Payment received"}</p>
          <h3>{ready ? "Your SampleX code is ready." : "Preparing your SampleX code..."}</h3>
          <p>{ready ? "Copy this code and paste it into the key field in the extension." : "Polar is confirming the order. This normally takes only a few seconds."}</p>
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
    <div className="file-document buy-samplex-file">
      <div className="file-copy buy-samplex-copy">
        <span className="file-breadcrumb">portfolio &gt; Buy SampleX</span>
        <p className="eyebrow">SampleX license</p>
        <h3>Keep exporting with SampleX.</h3>
        <p>Choose a 500-export recharge or unlock the extension permanently with one payment.</p>
      </div>

      <div className="buy-samplex-layout">
        <figure className="buy-samplex-preview">
          <img src="/assets/samplex/samplex-photo2.png" alt="SampleX waveform selection and audio analysis interface" />
        </figure>
        <div className="license-plans">
          <section className="license-offer">
            <div className="license-offer-heading">
              <FileDown size={24} />
            <div><strong>500 Export Pack</strong><span>US$5 · Recharge when you need it</span></div>
            </div>
            <ul>
              <li><FileDown size={16} /> 500 additional WAV exports</li>
              <li><KeyRound size={16} /> One signed recharge code</li>
            </ul>
            <a href="https://buy.polar.sh/polar_cl_8NHuxDGAJXfYwIOZsALhT2urRtTj23xdB2x3F37cLg6?product_id=0540eafa-44ed-4df8-9a16-c3d19067c69d">
              <CreditCard size={17} /> Choose export pack
            </a>
          </section>

          <section className="license-offer featured">
            <span className="plan-badge">Best value</span>
            <div className="license-offer-heading">
              <AudioWaveform size={24} />
              <div><strong>SampleX Lifetime</strong><span>US$15 · Permanent unlock</span></div>
            </div>
            <ul>
              <li><FileDown size={16} /> Unlimited WAV exports</li>
              <li><ShieldCheck size={16} /> License recovery support</li>
            </ul>
            <a href="https://buy.polar.sh/polar_cl_8NHuxDGAJXfYwIOZsALhT2urRtTj23xdB2x3F37cLg6?product_id=82f19b8f-9f50-4e81-a94d-26fa83fccef5">
              <CreditCard size={17} /> Choose lifetime
            </a>
          </section>
          <small id="checkout-status">Secure checkout and payment processing by Polar.</small>
        </div>
      </div>
    </div>
  );
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

        <div className="file-tree-folder commerce-file">
          {commerceFiles.map((file) => (
            <FileTreeButton key={file.id} file={file} activeFile={activeFile} onOpenFile={onOpenFile} />
          ))}
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

        <div className="file-tree-folder commerce-file">
          {commerceFiles.map((file) => (
            <FileTreeButton key={file.id} file={file} activeFile={activeFile} onOpenFile={onOpenFile} />
          ))}
        </div>

        <div className="file-tree-folder">
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
    if (window.location.hash === "#samplex") return "samplex-overview";
    if (window.location.hash === "#buy-samplex") return "buy-samplex";
    return "contact";
  });
  const [heroProject, setHeroProject] = useState("underfit");
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
  const [isProgrammaticFocus, setIsProgrammaticFocus] = useState(false);
  const active = workspaceFiles.find((file) => file.id === activeFile) ?? workspaceFiles[0];
  const previousActiveFile = getAdjacentWorkspaceFile(activeFile, "previous");
  const nextActiveFile = getAdjacentWorkspaceFile(activeFile, "next");

  const openFile = (id, shouldScroll = false) => {
    setActiveFile(id);
    if (underfitProjectFiles.some((file) => file.id === id)) {
      setFolders((current) => ({ ...current, projects: true, underfit: true, samplex: false }));
    } else if (samplexProjectFiles.some((file) => file.id === id)) {
      setFolders((current) => ({ ...current, projects: true, underfit: false, samplex: true }));
    }

    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        scrollWorkbenchIntoView(shouldReduceMotion ? 0 : 1050);
      });
    }
  };

  const animateWindowScroll = (target, duration = 780) => new Promise((resolve) => {
    if (duration === 0 || Math.abs(target - window.scrollY) < 2) {
      window.scrollTo({ top: target });
      resolve();
      return;
    }
    window.scrollTo({ top: target, behavior: "smooth" });
    window.setTimeout(resolve, duration);
  });

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

  const scrollWorkbenchIntoView = async (duration = 780) => {
    await animateWindowScroll(getWorkbenchTarget(), duration);
  };

  const openProjectFromHero = (project) => {
    const targetFile = project === "samplex" ? "samplex-overview" : "overview";
    setIsProgrammaticFocus(true);
    setActiveFile("contact");
    window.setTimeout(async () => {
      await scrollWorkbenchIntoView(shouldReduceMotion ? 0 : 1350);
      window.setTimeout(() => {
        setActiveFile(targetFile);
        setFolders((current) => ({
          ...current,
          projects: true,
          underfit: project === "underfit",
          samplex: project === "samplex",
        }));
        window.history.replaceState(null, "", project === "samplex" ? "#samplex" : window.location.pathname);
        window.setTimeout(() => setIsProgrammaticFocus(false), 520);
      }, shouldReduceMotion ? 0 : 520);
    }, shouldReduceMotion ? 0 : 80);
  };

  useEffect(() => {
    const openDeepLink = () => {
      const target = window.location.hash === "#samplex"
        ? "samplex-overview"
        : window.location.hash === "#buy-samplex"
          ? "buy-samplex"
          : null;
      if (!target) return;
      if (target === "samplex-overview") {
        setHeroProject("samplex");
        openProjectFromHero("samplex");
        return;
      }
      setActiveFile(target);
      window.requestAnimationFrame(() => void scrollWorkbenchIntoView(shouldReduceMotion ? 0 : 780));
    };
    openDeepLink();
    window.addEventListener("hashchange", openDeepLink);
    return () => window.removeEventListener("hashchange", openDeepLink);
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

  const useSimpleMotion = shouldReduceMotion || isCompactViewport || isProgrammaticFocus;
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
            <small>React, Electron & AI workflows</small>
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
            <h2>Software Developer | React, Electron & AI-assisted Workflows</h2>
            <p>
              I build practical software for real workflows: desktop systems,
              product interfaces, data validation and automation.
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
            selectedProject={heroProject}
            onSelectProject={setHeroProject}
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
            {active.kind === "buy-samplex" ? <BuySampleXPanel /> : null}
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

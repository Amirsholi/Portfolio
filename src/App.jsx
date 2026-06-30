import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ChevronDown,
  ChevronRight,
  Code2,
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
  ServerCog,
  Terminal,
  Workflow,
} from "lucide-react";

const underfitAssets = [
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
  {
    id: "entry-video",
    title: "Gym Entry Video",
    file: "entry-video.demo",
    path: "projects > underfit > entry-video.demo",
    src: "/assets/underfit/gym-entry.mp4",
    type: "video",
    meta: "Live access workflow for member check-ins.",
    bullets: [
      "Member enters ID.",
      "System validates membership status.",
      "Kiosk displays access result.",
    ],
    notes: "Kiosk UI / Membership validation / Offline-first",
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
};

const underfitFacts = [
  "Real client project",
  "Offline-first desktop app",
  "Local SQLite persistence",
  "Windows desktop workflow",
  "Memberships, cash, stock and access control",
  "Built with Electron, React and SQLite",
];

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

const projectFiles = [
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

const workspaceFiles = [...projectFiles, ...profileFiles];

const skillGroups = [
  {
    title: "Product interfaces",
    icon: Layers,
    summary: "User-facing screens, flows and dashboards built with clarity and maintainability.",
    items: ["React", "Next.js", "JavaScript", "HTML / CSS"],
  },
  {
    title: "Desktop systems",
    icon: ServerCog,
    summary: "Operational software for local workflows, persistence and everyday business use.",
    items: ["Electron", "SQLite", "Local data", "Offline-first thinking"],
  },
  {
    title: "Data & automation",
    icon: Database,
    summary: "Validation, reporting, process automation and structured operational data.",
    items: ["SQL", "Python", "REST APIs", "Data validation"],
  },
  {
    title: "Delivery practice",
    icon: Workflow,
    summary: "Documentation, testing and iteration habits that keep systems reliable.",
    items: ["Manual testing", "Technical documentation", "Process automation", "Git"],
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
      "Designed the product architecture around React, Electron and SQLite local persistence.",
      "Implemented operational flows for registrations, renewals, access history, cash control, stock and product sales.",
      "Iterated with real usage feedback so the system matched day-to-day gym workflows.",
    ],
  },
  {
    company: "Alorica",
    role: "Content Moderator",
    time: "May 2024 - Oct 2025",
    detail: "High-volume data validation, policy application, QA and SLA work.",
    points: [
      "Worked with large volumes of information under accuracy and SLA requirements.",
      "Applied internal policies, consistency checks and quality metrics.",
      "Developed a data validation and QA mindset that now informs software decisions.",
    ],
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
  },
  {
    program: "Diploma in Artificial Intelligence",
    school: "IBEC",
    year: "2024",
    description:
      "AI fundamentals, prompting, applied tools and practical ways to use AI inside workflows and technical processes.",
  },
  {
    program: "React.js",
    school: "CoderHouse",
    year: "2023",
    description:
      "Component-based interfaces, state, props, reusable UI patterns and frontend project structure.",
  },
  {
    program: "Next.js",
    school: "CoderHouse",
    year: "2023",
    description:
      "React framework fundamentals, routing, rendering patterns and production-oriented web app structure.",
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

function UnderfitOverviewPanel({ onOpenDemo }) {
  return (
    <div className="file-document underfit-overview-file">
      <div className="file-copy">
        <span className="file-breadcrumb">projects &gt; underfit &gt; overview.md</span>
        <p className="eyebrow">Featured real client project</p>
        <h3>UnderFit Desktop App</h3>
        <p>
          Desktop management system built for a real gym. It handles
          memberships, renewals, access history, daily cash control, product
          sales, stock and operational rules.
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
          <button className="case-link" type="button" onClick={onOpenDemo}>
            Open demo/video
          </button>
        </div>
      </div>

      <figure className="overview-photo">
        <img src={assetPaths.underfitGym} alt="UnderFit gym floor" />
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

      <div className="project-facts-card">
        <span>Project facts</span>
        <div className="project-facts-list">
          {underfitFacts.map((fact) => (
            <small key={fact}>{fact}</small>
          ))}
        </div>
      </div>
    </div>
  );
}

function UnderfitFeaturePanel({ file }) {
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
        className="preview-pane"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {file.type === "video" ? (
          <video src={file.src} controls />
        ) : (
          <img src={file.src} alt={file.title} />
        )}
        <div className="preview-caption">
          <strong>{file.file}</strong>
          <span>{file.meta}</span>
        </div>
      </motion.div>

      <div className="feature-detail-grid">
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
      </div>
    </div>
  );
}

function ContactPanel({ subject, message, onSubjectChange, onMessageChange, onSubmit, sent }) {
  return (
    <form className="contact-file" onSubmit={onSubmit}>
      <div className="markdown-file-header">
        <span>contact.md</span>
        <small>message draft</small>
      </div>

      <div className="contact-card-body">
        <img className="contact-photo" src={assetPaths.profile} alt="Amir Sholi" />
        <h3>Contact</h3>
        <p>Send a short message and I&apos;ll reply by email.</p>
        <div className="contact-inline-links">
          <a href={`mailto:amirsholi999@gmail.com?subject=${encodeURIComponent("Portfolio contact")}`}>
            <Mail size={15} />
            Email
          </a>
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

function EducationPanel() {
  return (
    <div className="education-grid">
      {education.map(({ program, school, year, description }) => (
        <article key={program}>
          <GraduationCap size={20} />
          <div>
            <strong>{program}</strong>
            <span>{school}</span>
            <p>{description}</p>
          </div>
          <time>{year}</time>
        </article>
      ))}
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="experience-nodes">
      {experience.map((item) => (
        <article key={item.company}>
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

function StackPanel() {
  return (
    <div className="stack-grid">
      {skillGroups.map(({ title, icon: Icon, summary, items }) => (
        <article key={title}>
          <Icon size={22} />
          <div>
            <strong>{title}</strong>
            <p>{summary}</p>
            <div className="skill-cloud">
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
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
              {projectFiles.map((file) => (
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
                onClick={() => onToggleFolder("underfit")}
                depth={1}
              />
              {folders.underfit ? (
                <div className="file-tree-files">
                  {projectFiles.map((file) => (
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
          ) : null}
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
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0.12) return 1;
    if (progress >= 0.72) return 0.15;
    return 1 - ((progress - 0.12) / 0.6) * 0.85;
  });
  const heroScale = useTransform(scrollYProgress, [0, 0.72], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.72], [0, -80]);
  const heroBlur = useTransform(scrollYProgress, (progress) => {
    const blur = Math.min(Math.max(progress / 0.72, 0), 1) * 2;
    return `blur(${blur}px)`;
  });
  const workspaceOpacity = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0.08) return 0;
    if (progress >= 0.36) return 1;
    return (progress - 0.08) / 0.28;
  });
  const workspaceScale = useTransform(scrollYProgress, [0.12, 0.58], [0.92, 1]);
  const workspaceY = useTransform(scrollYProgress, [0.12, 0.58], [160, 0]);
  const clock = useClock();
  const [activeFile, setActiveFile] = useState("overview");
  const [folders, setFolders] = useState({
    projects: true,
    underfit: true,
    profile: true,
  });
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const active = workspaceFiles.find((file) => file.id === activeFile) ?? workspaceFiles[0];

  const openFile = (id) => setActiveFile(id);

  const toggleFolder = (folder) => {
    setFolders((current) => ({ ...current, [folder]: !current[folder] }));
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

  const useSimpleMotion = shouldReduceMotion || isCompactViewport;
  const heroScrollStyle = useSimpleMotion
    ? undefined
    : {
        opacity: heroOpacity,
        scale: heroScale,
        y: heroY,
        filter: heroBlur,
      };
  const workspaceScrollStyle = useSimpleMotion
    ? undefined
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
            <img src={assetPaths.profile} alt="" />
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
          <button onClick={() => openFile("contact")}>
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
            className="hero-code"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="floating-path">
              <Code2 size={15} />
              <span>amir-sholi/profile.txt</span>
            </div>
            <div className="code-body hero-code-body plain-text-body">
              {introText.map((line, index) => (
                <TextLine key={`${line}-${index}`} line={line} index={index} />
              ))}
              <span className="caret" />
            </div>
          </motion.div>

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
              <button onClick={() => openFile("contact")}>
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
        </motion.section>

        <motion.section
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
              <UnderfitOverviewPanel onOpenDemo={() => openFile("entry-video")} />
            ) : null}
            {active.kind === "underfit-feature" ? <UnderfitFeaturePanel file={active} /> : null}
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
            {active.kind === "education" ? <EducationPanel /> : null}
            {active.kind === "experience" ? <ExperiencePanel /> : null}
            {active.kind === "stack" ? <StackPanel /> : null}
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
      </section>
    </main>
    <TerminalFooter />
    </>
  );
}

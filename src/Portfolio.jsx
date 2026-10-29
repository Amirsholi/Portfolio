import { useEffect, useRef, useState } from 'react';
import { Home, Folder, BriefcaseBusiness, Wrench, GraduationCap, Mail, ArrowUpRight, ArrowRight, ChevronDown, X } from 'lucide-react';
import './portfolio.css';
import { useLanguage, localize, LanguageSwitch } from './i18n.jsx';
import { PortfolioFooter, ProfileLanguages } from './PortfolioIdentity.jsx';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProjectCaseStudy } from './ProjectCaseStudy.jsx';
import { ProjectCards } from './ProjectCards.jsx';
const nav = [['home', 'Home', Home], ['projects', 'Projects', Folder], ['experience', 'Experience', BriefcaseBusiness], ['tools', 'Tools', Wrench], ['education', 'Education', GraduationCap]];
const projectPages = ['projects/underfit', 'projects/samplex'];
const jobs = [
  ['Under-Fit — Gym management system', 'Develop and maintain custom gym management software running at two locations in Uruguay. Connect Windows administration with instructor tablets across memberships, check-ins, cash, products, classes and routines.', 'Jun 2025 – Present'],
  ['Alorica', 'On-site content moderation in Portuguese at Alorica, Montevideo, from May 2024 to October 2025.', 'May 2024 – Oct 2025'],
];
const studies = [
  ['MicroFleX Intermediate Online Course — English B1+ (CEFR)', 'Intermediate Online Course completed at Alianza Cultural Uruguay–Estados Unidos. Certificate level: B1+ on the Common European Framework of Reference (CEFR).', 'Alianza · October 2026', '/assets/certificates/english-b1.png'],
  ['Analista Programador', 'CTC Enseñanza Técnica Profesional, in partnership with Universidad CLAEH. Coursework and exams completed; thesis pending. Expected completion: December 2026.', '2021–present', null],
  ['Artificial Intelligence · IBEC', 'Artificial Intelligence studies completed at IBEC. The certificate does not state the course duration.', 'IBEC · 13 March 2024', '/assets/certificates/ibec-ai.jpg'],
  ['React.js', 'Components, props, state, reusable UI patterns and frontend project structure.', 'CoderHouse · 7 November 2023 · 30 hours / 8 weeks', '/assets/certificates/coderhouse-react.png'],
  ['Operador PC & PC Plus', 'Foundational computer operation courses at ARI Informática, followed by software development studies.', 'ARI Informática · 2015 & 2016', null],
  ['Next.js', 'React framework fundamentals, routing, rendering patterns and production-oriented applications.', 'CoderHouse · 11 December 2023 · 14 hours / 7 weeks', '/assets/certificates/coderhouse-next.png'],
];
const tools = [['C# / .NET', 'Backend & REST APIs', '', 'https://dotnet.microsoft.com'], ['PostgreSQL', 'Shared relational data', '', 'https://www.postgresql.org'], ['React', 'Interface development', 'react/react-original.svg', 'https://react.dev'], ['JavaScript', 'Web & application logic', 'javascript/javascript-original.svg', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'], ['Electron', 'Desktop applications', 'electron/electron-original.svg', 'https://electronjs.org'], ['SQLite', 'Local databases', 'sqlite/sqlite-original.svg', 'https://sqlite.org'], ['Git', 'Version control', 'git/git-original.svg', 'https://git-scm.com'], ['Next.js', 'React framework · Coursework', 'nextjs/nextjs-original.svg', 'https://nextjs.org']];
function Heading({ first, second }) { const { t } = useLanguage(); return <h1 className="pf-heading">{t(first)}<span>{t(second)}</span></h1>; }
export function Portfolio() {
  const { language, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const pageFromLocation = () => {
    const path = window.location.pathname.replace(/\/$/, '').slice(1);
    const hash = window.location.hash.slice(1);
    if (path === 'contact') return 'home';
    if (projectPages.includes(path)) return path;
    return nav.some(([id]) => id === path) ? path : nav.some(([id]) => id === hash) ? hash : 'home';
  };
  const [active, setActive] = useState(pageFromLocation);
  const [media, setMedia] = useState(null);
  const [draft, setDraft] = useState(false);
  const dialog = useRef(null);
  const projectMenu = useRef(null);
  const heading = useRef(null);
  const pageUrl = id => id === 'home' ? '/' : '/' + id;
  function navigate(event, id) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (active !== id || window.location.hash) window.history.pushState(null, '', pageUrl(id));
    setActive(id);
    setMedia(null);
    if (projectMenu.current) projectMenu.current.open=false;
    if(active===id)window.scrollTo({top:0, behavior:reduceMotion?'instant':'smooth'});
    requestAnimationFrame(() => heading.current?.focus({preventScroll:true}));
  }
  useEffect(() => {
    document.body.classList.add('portfolio-page');
    const restore = () => { setActive(pageFromLocation()); window.scrollTo({top:0, behavior:'instant'}); };
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => { document.body.classList.remove('portfolio-page'); window.removeEventListener('popstate', restore); window.removeEventListener('hashchange', restore); };
  }, []);
  useEffect(() => { document.title = `${(active === 'projects/underfit' ? 'Under-Fit' : active === 'projects/samplex' ? 'SampleX' : t(nav.find(([id])=>id===active)?.[1] || 'Home')) || 'Home'} — Amir Sholi | Software Developer`; }, [active, language]);
  useEffect(() => { if (media) dialog.current?.showModal(); else dialog.current?.close(); }, [media]);
  function contact(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `${t('Name')}: ${data.get('name')}\n${t('Email')}: ${data.get('email')}\n\n${data.get('message')}`;
    window.location.href = `mailto:amirsholi999@gmail.com?subject=${encodeURIComponent(t('Portfolio inquiry from') + ' ' + data.get('name'))}&body=${encodeURIComponent(body)}`;
    setDraft(true);
  }
  return localize(<div className="pf-shell" id="top">
    <a className="pf-skip" href="#page-content">Skip to content</a>
    <header className="pf-header"><nav aria-label="Main navigation">{nav.map(([id,label,Icon]) => id==='projects' ? <details key={id} ref={projectMenu} className="pf-project-menu" onKeyDown={event=>{if(event.key==="Escape"){event.currentTarget.open=false;event.currentTarget.querySelector("summary")?.focus();}}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))event.currentTarget.open=false;}}><summary className={active.startsWith('projects')?'is-active':''}><Icon size={20}/><span>Projects</span>{active.startsWith("projects")&&<motion.span className="pf-nav-indicator" layoutId="pf-nav-indicator" aria-hidden="true" transition={{duration:reduceMotion?0:.24,ease:[.22,1,.36,1]}}/>}<ChevronDown className="pf-menu-caret" aria-hidden="true"/></summary><div className="pf-project-dropdown"><a href="/projects" onClick={event=>navigate(event,'projects')}>All projects</a><a href="/projects/underfit" onClick={event=>navigate(event,'projects/underfit')}>Under-Fit <small>Gym operations · .NET & PostgreSQL</small></a><a href="/projects/samplex" onClick={event=>navigate(event,'projects/samplex')}>SampleX <small>Browser audio sampler · Demo Trial</small></a></div></details> : <a key={id} href={pageUrl(id)} onClick={event=>navigate(event,id)} aria-label={label} aria-current={active===id?'page':undefined}><Icon size={20}/><span>{label}</span>{active===id&&<motion.span className="pf-nav-indicator" layoutId="pf-nav-indicator" aria-hidden="true" transition={{duration:reduceMotion?0:.24,ease:[.22,1,.36,1]}}/>}</a>)}</nav><LanguageSwitch/></header>
    <div className="pf-layout">
      <aside className="pf-profile" aria-label="About Amir Sholi">
        <img className="pf-portrait" src="/assets/profile.jpg" alt="Amir Sholi" width="240" height="284" fetchPriority="high"/>
        <h2>Amir Sholi</h2>
        <div className="pf-nationalities"><img src="/assets/flags/uy.svg" alt="Uruguay"/><img src="/assets/flags/br.svg" alt="Brazil"/><span>Uruguayan & Brazilian</span></div>
        <p>Junior Software Developer · C#/.NET, JavaScript & SQL.</p>
        <div className="pf-socials"><a href="https://github.com/Amirsholi" aria-label="GitHub" target="_blank" rel="noreferrer"><img src="/assets/tools/github.svg" alt="" width="23" height="23"/></a><a href="https://www.linkedin.com/in/amirsholi/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><img src="/assets/tools/linkedin.svg" alt="" width="23" height="23"/></a><a href="mailto:amirsholi999@gmail.com" aria-label="Email Amir"><Mail/></a></div>
      <ProfileLanguages compact/></aside>
      <main className="pf-main pf-paged" id="page-content" ref={heading} tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={()=>{window.scrollTo({top:0,behavior:"instant"});heading.current?.focus({preventScroll:true});}}><motion.div key={active} className="pf-page-view" initial={{opacity:0,y:reduceMotion?0:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:0}} transition={{duration:reduceMotion?0:0.22,ease:[0.22,1,0.36,1]}}>
        {active === 'home' && <section id="home" className="pf-intro">
          <p className="pf-home-location">Montevideo, Uruguay · Software development</p>
          <h1>SOFTWARE<span>DEVELOPER</span></h1>
          <p className="pf-lead">I’m Amir. I build and maintain software around real operations, working with C#/.NET, JavaScript and SQL — from the interface to business rules, shared data and deployment.</p>
          <div className="pf-home-background"><p>Under-Fit, my client project, connects reception and instructor tablets across two gym locations. SampleX is my personal browser audio sampler, built with React, TypeScript and Web Audio.</p><p>I completed coursework and exams for Analista Programador at CTC Enseñanza Técnica Profesional, in partnership with Universidad CLAEH; my thesis is pending, with completion expected in December 2026. My previous experience includes on-site Portuguese-language content moderation at Alorica.</p></div>
          <ProfileLanguages/><div className="pf-home-actions"><a className="pf-primary-action" href="/assets/CV_Amir_Shol.pdf" target="_blank" rel="noreferrer">Read my CV <ArrowUpRight size={17}/></a><a className="pf-text-link" href="/experience" onClick={event=>navigate(event,'experience')}>Experience & responsibilities <ArrowRight size={16}/></a></div>
          <section className="pf-home-work" aria-label="Featured projects"><div className="pf-section-title"><h2>Projects you can explore</h2><a className="pf-text-link" href="/projects" onClick={event=>navigate(event,'projects')}>All projects <ArrowRight size={16}/></a></div><ProjectCards navigate={navigate}/></section>
          <div className="pf-home-fit"><h2>Where I can contribute</h2><p>I’m looking for junior opportunities in software development, application support and QA. My focus is practical problem solving, clear business rules, data consistency and reliable maintenance.</p><dl><div><dt>Main stack</dt><dd>C#/.NET · ASP.NET Core · EF Core · PostgreSQL · JavaScript · Electron</dd></div><div><dt>Languages</dt><dd>Spanish & Portuguese: native · English: intermediate, B1+ certificate</dd></div></dl></div>
        </section>}
        {active === 'projects' && <section id="projects"><Heading first="SELECTED" second="PROJECTS"/><p className="pf-page-intro">Explore the problem, the product and the work behind each project. Under-Fit is client software in daily use; SampleX is a browser product with a downloadable demo.</p><ProjectCards navigate={navigate}/></section>}
        {active === 'experience' && <section id="experience"><Heading first="MY WORK" second="EXPERIENCE"/><div className="pf-entries">{jobs.map(([name,detail,date])=><article key={name}><h3>{name}</h3><p className="pf-role">{name === 'Alorica' ? 'Content Moderator · Portuguese · On-site' : 'Software Developer (Independent) · Under-Fit · Hybrid'}</p><time>{date}</time><p>{detail}</p><ul>{(name === 'Alorica' ? ['Handled high-volume moderation with attention to detail and precise, consistent policy application.', 'Identified inconsistencies and analyzed cases against operational guidelines.', 'Worked with SLA, AHT and UR indicators, balancing quality, productivity and handling time.'] : ['Owned the development cycle: requirements, solution design, implementation, deployment and maintenance.', 'Moved from a local JavaScript/Electron/SQLite app to shared C#/.NET and PostgreSQL infrastructure for reception and instructor tablets.', 'Implemented migration, backups, remote updates and cross-location access. The newer member/admin web candidate is locally validated, with gym rollout still pending.']).map(point=><li key={point}>{point}</li>)}</ul>{name === 'Alorica' && <p className="pf-case-note">These skills transfer to development and QA through careful analysis, consistent criteria and attention to inconsistencies. This was content moderation, not software testing.</p>}</article>)}</div></section>}
        {active === 'tools' && <section id="tools"><Heading first="TECHNICAL" second="TOOLKIT"/><p className="pf-page-intro">Practical project experience and coursework, with a concrete scope for each technology.</p><div className="pf-tools">{tools.map(([name,desc,icon,href])=><a key={name} href={href} target="_blank" rel="noreferrer"><div className="pf-tool-icon"><img src={'/assets/tools/'+(name === 'C# / .NET' ? 'dotnet' : name.toLowerCase().replace('.',''))+'.svg'} alt="" width="40" height="40" loading="lazy"/></div><div><h3>{name}</h3><p>{desc}</p></div></a>)}</div><div className="pf-capabilities"><article><h3>TypeScript & Vitest · SampleX</h3><p>Typed selection ranges and worker messages support the audio workflow. Vitest checks PCM16 WAV headers, DC offset removal, fades at cut boundaries and analysis of synthetic signals.</p></article><article><h3>Backend & systems integration</h3><p>C#/.NET, ASP.NET Core, Entity Framework Core and PostgreSQL for APIs, shared data and integration between desktop and tablets.</p></article><article><h3>Product interfaces</h3><p>Practical React and TypeScript work in SampleX: typed audio selections and messages between the interface and analysis worker. Next.js is supported by coursework; it is not claimed as the stack of these two projects.</p></article><article><h3>Local desktop systems</h3><p>The initial Electron/SQLite desktop version supported local operation. The current shared API/PostgreSQL architecture depends on the central server and connectivity; remote access also requires Internet.</p></article><article><h3>Data & delivery</h3><p>Practical work with SQL, REST APIs, data validation and Git. Python has a specific support role in Under-Fit: creating a consistent SQLite rehearsal copy with integrity checks and a manifest, covered by a unittest check.</p></article></div></section>}
        {active === 'education' && <section id="education"><Heading first="CONTINUOUS" second="LEARNING"/><div className="pf-entries pf-studies">{studies.map(([name,detail,date,src])=><article key={name}>{src ? <button onClick={()=>setMedia({title:name,src})}><h3>{name}</h3><ArrowUpRight/></button> : <h3>{name}</h3>}<p>{detail}</p><span>{date}</span></article>)}</div></section>}
        {projectPages.includes(active) && <ProjectCaseStudy project={active.split('/')[1]} onOpenMedia={setMedia}/>}
        </motion.div></AnimatePresence>
        {projectPages.includes(active) ? <nav className="pf-page-next" aria-label="Explore more projects"><a href="/projects" onClick={event=>navigate(event,'projects')}>All projects</a><a href={active==='projects/underfit'?'/projects/samplex':'/projects/underfit'} onClick={event=>navigate(event,active==='projects/underfit'?'projects/samplex':'projects/underfit')}>{active==='projects/underfit'?'Next project: SampleX':'Next project: Under-Fit'} <ArrowRight size={16}/></a></nav> : <nav className="pf-page-next" aria-label="Continue exploring">{active !== 'home' && <a href="/" onClick={event=>navigate(event,'home')}>Home</a>}<a href={pageUrl(nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][0])} onClick={event=>navigate(event,nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][0])}>{nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][1]} <ArrowRight size={16}/></a></nav>}
        <section id="contact"><h2 className="pf-heading">LET'S WORK<span>TOGETHER</span></h2><p className="pf-page-intro">Based in Montevideo, Uruguay. Get in touch about software development opportunities or a product you’re building.</p><div className="pf-contact-links"><a href="mailto:amirsholi999@gmail.com">amirsholi999@gmail.com</a><a href="https://www.linkedin.com/in/amirsholi/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a></div><form className="pf-form" onSubmit={contact}><div className="pf-form-row"><label>Name<input name="name" placeholder="Your Name" autoComplete="name" required/></label><label>Email<input type="email" name="email" placeholder="Your@email.com" autoComplete="email" required/></label></div><label>Message<textarea name="message" placeholder="Message" rows="5" required/></label><button type="submit">Create email</button>{draft && <p role="status">Your email draft is ready in your email app. You can also write to <a href="mailto:amirsholi999@gmail.com">amirsholi999@gmail.com</a>.</p>}</form></section>
      </main>
    </div>
    <PortfolioFooter navigate={navigate}/>
    <dialog ref={dialog} className="pf-dialog" onCancel={()=>setMedia(null)} onClick={e=>{if(e.target===e.currentTarget)setMedia(null)}} onClose={()=>setMedia(null)}>{media && <><div className="pf-dialog-head"><h2>{media.title}</h2><button autoFocus aria-label="Close preview" onClick={()=>setMedia(null)}><X/></button></div><img src={media.src} alt={media.title}/>{media.src.includes("english-b1") && <a className="pf-text-link" href="/assets/certificates/english-b1.pdf" target="_blank" rel="noreferrer">Open original PDF <ArrowUpRight size={16}/></a>}{media.description && <p>{media.description}</p>}{media.link && <a href={media.link}>Explore Under-Fit <ArrowUpRight size={18}/></a>}</>}</dialog>
  </div>, language);
}

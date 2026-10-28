import { useEffect, useRef, useState } from 'react';
import { Home, Folder, BriefcaseBusiness, Wrench, GraduationCap, Mail, ArrowUpRight, ArrowRight, Layers, PanelsTopLeft, X } from 'lucide-react';
import './portfolio.css';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProjectCaseStudy } from './ProjectCaseStudy.jsx';
const nav = [['home', 'Home', Home], ['projects', 'Projects', Folder], ['experience', 'Experience', BriefcaseBusiness], ['tools', 'Tools', Wrench], ['education', 'Education', GraduationCap]];
const projectPages = ['projects/underfit', 'projects/samplex'];
const jobs = [
  ['UnderFit Desktop App', 'Develop and maintain custom gym management software running at two locations in Uruguay. Connect Windows administration with instructor tablets across memberships, check-ins, cash, products, classes and routines.', 'Jun 2025 – Present'],
  ['Alorica', 'Worked on-site in Montevideo, moderating content in Portuguese. Reviewed information against policies, applied consistent criteria and met quality and productivity targets in a high-volume SLA/KPI environment.', 'May 2024 – Oct 2025'],
];
const studies = [
  ['English B1+ · MicroFleX Intermediate', 'Intermediate Online Course completed at Alianza Cultural Uruguay–Estados Unidos. Certificate level: B1+ on the Common European Framework of Reference (CEFR).', 'Alianza · Oct 2026', null],
  ['Analista Programador', 'All coursework and exams completed in the Analista Programador program at CTC, in partnership with Universidad CLAEH. Thesis pending; expected completion: December 2026.', 'CTC / Universidad CLAEH · Mar 2021 – Dec 2026', null],
  ['Diploma in Artificial Intelligence', 'AI fundamentals, prompting and practical tools for technical workflows.', 'IBEC · Mar 2024 · 6 months', '/assets/certificates/ibec-ai.jpg'],
  ['React.js', 'Components, props, state, reusable UI patterns and frontend project structure.', 'CoderHouse · Nov 2023 · 30 hours / 8 weeks', '/assets/certificates/coderhouse-react.png'],
  ['Next.js', 'React framework fundamentals, routing, rendering patterns and production-oriented applications.', 'CoderHouse · Dec 2023 · 14 hours / 7 weeks', '/assets/certificates/coderhouse-next.png'],
];
const tools = [['C# / .NET', 'Backend & REST APIs', '', 'https://dotnet.microsoft.com'], ['PostgreSQL', 'Shared relational data', '', 'https://www.postgresql.org'], ['React', 'Interface development', 'react/react-original.svg', 'https://react.dev'], ['JavaScript', 'Web & application logic', 'javascript/javascript-original.svg', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'], ['Electron', 'Desktop applications', 'electron/electron-original.svg', 'https://electronjs.org'], ['SQLite', 'Local databases', 'sqlite/sqlite-original.svg', 'https://sqlite.org'], ['Git', 'Version control', 'git/git-original.svg', 'https://git-scm.com'], ['Next.js', 'React framework', 'nextjs/nextjs-original.svg', 'https://nextjs.org']];
function Heading({ first, second }) { return <h1 className="pf-heading">{first}<span>{second}</span></h1>; }
export function Portfolio() {
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
  const heading = useRef(null);
  const pageUrl = id => id === 'home' ? '/' : '/' + id;
  function navigate(event, id) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (active !== id || window.location.hash) window.history.pushState(null, '', pageUrl(id));
    setActive(id);
    setMedia(null);
    window.scrollTo({top:0, behavior:'instant'});
    requestAnimationFrame(() => heading.current?.focus({preventScroll:true}));
  }
  useEffect(() => {
    document.body.classList.add('portfolio-page');
    const restore = () => { setActive(pageFromLocation()); window.scrollTo({top:0, behavior:'instant'}); };
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => { document.body.classList.remove('portfolio-page'); window.removeEventListener('popstate', restore); window.removeEventListener('hashchange', restore); };
  }, []);
  useEffect(() => { document.title = `${(active === 'projects/underfit' ? 'UnderFit' : active === 'projects/samplex' ? 'SampleX' : nav.find(([id])=>id===active)?.[1]) || 'Home'} — Amir Sholi | Software Developer`; }, [active]);
  useEffect(() => { if (media) dialog.current?.showModal(); else dialog.current?.close(); }, [media]);
  function contact(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBudget: ${data.get('budget')}\n\n${data.get('message')}`;
    window.location.href = `mailto:amirsholi999@gmail.com?subject=${encodeURIComponent('Portfolio inquiry from ' + data.get('name'))}&body=${encodeURIComponent(body)}`;
    setDraft(true);
  }
  return <div className="pf-shell" id="top">
    <a className="pf-skip" href="#page-content">Skip to content</a>
    <header className="pf-header"><nav aria-label="Main navigation">{nav.map(([id,label,Icon]) => <a key={id} href={pageUrl(id)} onClick={event=>navigate(event,id)} aria-label={label} aria-current={active === id || (id === 'projects' && projectPages.includes(active)) ? 'page' : undefined}><Icon size={21} strokeWidth={1.8}/><span>{label}</span></a>)}</nav></header>
    <div className="pf-layout">
      <aside className="pf-profile" aria-label="About Amir Sholi">
        <img className="pf-portrait" src="/assets/profile.jpg" alt="Amir Sholi" width="240" height="284" fetchPriority="high"/>
        <h2>Amir Sholi</h2>
        <div className="pf-profile-mark" aria-hidden="true"/>
        <p>Junior Software Developer · C#/.NET, JavaScript & SQL.</p>
        <div className="pf-socials"><a href="https://github.com/Amirsholi" aria-label="GitHub" target="_blank" rel="noreferrer"><img src="/assets/tools/github.svg" alt="" width="23" height="23"/></a><a href="https://www.linkedin.com/in/amirsholi/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><img src="/assets/tools/linkedin.svg" alt="" width="23" height="23"/></a><a href="mailto:amirsholi999@gmail.com" aria-label="Email Amir"><Mail/></a></div>
      </aside>
      <main className="pf-main pf-paged" id="page-content" ref={heading} tabIndex={-1}>
        {active.startsWith('projects') && <nav className="pf-project-nav" aria-label="Projects"><a href="/projects" onClick={event=>navigate(event,'projects')} aria-current={active==='projects'?'page':undefined}>All projects</a><a href="/projects/underfit" onClick={event=>navigate(event,'projects/underfit')} aria-current={active==='projects/underfit'?'page':undefined}>UnderFit</a><a href="/projects/samplex" onClick={event=>navigate(event,'projects/samplex')} aria-current={active==='projects/samplex'?'page':undefined}>SampleX</a></nav>}
        <AnimatePresence mode="wait" initial={false}><motion.div key={active} className="pf-page-view" initial={{opacity:0,y:reduceMotion?0:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduceMotion?0:-6}} transition={{duration:reduceMotion?0:0.18,ease:[0.22,1,0.36,1]}}>
        {active === 'home' && <section id="home" className="pf-intro">
          <h1>SOFTWARE<span>DEVELOPER</span></h1>
          <p className="pf-lead">I’m Amir, a junior software developer based in Montevideo, Uruguay. I work with C#/.NET, JavaScript and SQL, focusing on business rules, data consistency, application maintenance and systems integration.</p>
          <div className="pf-about-summary"><p>My work includes <a href="/projects/underfit" onClick={event=>navigate(event,'projects/underfit')}>UnderFit</a>, a desktop system used for real gym operations, and <a href="/projects/samplex" onClick={event=>navigate(event,'projects/samplex')}>SampleX</a>, a Chrome audio sampler that records, trims, analyzes and exports locally.</p><a className="pf-text-link" href="/assets/CV_Amir_Shol.pdf" target="_blank" rel="noreferrer">Read my CV <ArrowUpRight size={17}/></a></div>
          <div className="pf-feature-grid"><a href="/experience" onClick={event=>navigate(event,'experience')} className="pf-feature pf-orange"><Layers size={38}/><h2>DESKTOP APPS,<br/>WORKFLOW SOFTWARE</h2><ArrowRight className="pf-feature-arrow"/></a><a href="/projects" onClick={event=>navigate(event,'projects')} className="pf-feature pf-lime"><PanelsTopLeft size={38}/><h2>C#/.NET, JAVASCRIPT,<br/>SQL & INTEGRATION</h2><ArrowRight className="pf-feature-arrow"/></a></div>
        </section>}
        {active === 'projects' && <section id="projects"><Heading first="SELECTED" second="PROJECTS"/><p className="pf-page-intro">Two products built around specific workflows: running a gym and turning browser audio into usable samples.</p><div className="pf-projects"><a className="pf-project" href="/projects/underfit" onClick={event=>navigate(event,'projects/underfit')}><img src="/assets/underfit-gym.jpg" alt="UnderFit gym" loading="lazy" width="130" height="136"/><div><h3>UnderFit</h3><p>Electron · SQLite · Desktop</p></div><ArrowUpRight/></a><a className="pf-project" href="/projects/samplex" onClick={event=>navigate(event,'projects/samplex')}><img src="/assets/samplex/samplex-hero.png" alt="SampleX audio sampling interface" loading="lazy" width="130" height="136"/><div><h3>SampleX</h3><p>Chrome MV3 · React · Web Audio</p></div><ArrowUpRight/></a></div><div className="pf-project-context"><article><h3>UnderFit · Real client software</h3><p>Memberships, renewals, ID-based access validation, attendance logs, stock, sales and daily cash control. Originally Electron/SQLite; evolved toward C#/.NET and PostgreSQL to support two locations and instructor tablets.</p><a className="pf-text-link" href="/projects/underfit" onClick={event=>navigate(event,'projects/underfit')}>Explore the case study <ArrowUpRight size={16}/></a></article><article><h3>SampleX · Independent product</h3><p>Capture audio from a Chrome tab, trim a selection, inspect BPM, key and tone, and export WAV. Processing stays on the device. The Demo Trial includes 75 WAV exports.</p><a className="pf-text-link" href="/projects/samplex" onClick={event=>navigate(event,'projects/samplex')}>Explore the case study <ArrowUpRight size={16}/></a></article></div></section>}
        {active === 'experience' && <section id="experience"><Heading first="MY WORK" second="EXPERIENCE"/><div className="pf-entries">{jobs.map(([name,detail,date])=><article key={name}><h3>{name}</h3><p className="pf-role">{name === 'Alorica' ? 'Content Moderator · Portuguese · On-site' : 'Software Developer (Independent) · UnderFit · Hybrid'}</p><time>{date}</time><p>{detail}</p><ul>{(name === 'Alorica' ? ['Reviewed content and information against internal policies and operational guidelines.', 'Met quality and productivity targets while maintaining accuracy and attention to detail.', 'Documented cases, identified inconsistencies and applied operational policies.'] : ['Owned the development cycle: requirements, solution design, implementation, deployment and maintenance.', 'Evolved JavaScript/Electron/SQLite toward a C#/.NET backend with PostgreSQL and tablet integration.', 'Implemented data migration, backups, remote updates and access across gym locations.']).map(point=><li key={point}>{point}</li>)}</ul></article>)}</div></section>}
        {active === 'tools' && <section id="tools"><Heading first="TECHNICAL" second="TOOLKIT"/><p className="pf-page-intro">The technologies I use, and where they fit into my work.</p><div className="pf-tools">{tools.map(([name,desc,icon,href])=><a key={name} href={href} target="_blank" rel="noreferrer"><div className="pf-tool-icon"><img src={'/assets/tools/'+(name === 'C# / .NET' ? 'dotnet' : name.toLowerCase().replace('.',''))+'.svg'} alt="" width="40" height="40" loading="lazy"/></div><div><h3>{name}</h3><p>{desc}</p></div></a>)}</div><div className="pf-capabilities"><article><h3>Backend & systems integration</h3><p>C#/.NET, ASP.NET Core, Entity Framework Core and PostgreSQL for APIs, shared data and integration between desktop and tablets.</p></article><article><h3>Product interfaces</h3><p>Reusable React components, stateful screens, responsive layouts and dashboard workflows.</p></article><article><h3>Local desktop systems</h3><p>Electron windows, SQLite persistence, validation and business rules for offline operations.</p></article><article><h3>Data & delivery</h3><p>SQL, Python, REST APIs and data validation, supported by Git, manual testing and technical documentation.</p></article></div></section>}
        {active === 'education' && <section id="education"><Heading first="CONTINUOUS" second="LEARNING"/><div className="pf-entries pf-studies">{studies.map(([name,detail,date,src])=><article key={name}>{src ? <button onClick={()=>setMedia({title:name,src})}><h3>{name}</h3><ArrowUpRight/></button> : <h3>{name}</h3>}<p>{detail}</p><span>{date}</span></article>)}</div></section>}
        {projectPages.includes(active) && <ProjectCaseStudy project={active.split('/')[1]} onOpenMedia={setMedia}/>}
        </motion.div></AnimatePresence>
        <nav className="pf-page-next" aria-label="Continue exploring">{active !== 'home' && <a href="/" onClick={event=>navigate(event,'home')}>Home</a>}<a href={pageUrl(nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][0])} onClick={event=>navigate(event,nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][0])}>{nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][1]} <ArrowRight size={16}/></a></nav>
        <div className="pf-language-note"><span>Spanish & Portuguese · Native</span><span>English · Intermediate (B1+)</span></div>
        <section id="contact"><h2 className="pf-heading">LET'S WORK<span>TOGETHER</span></h2><p className="pf-page-intro">Based in Montevideo, Uruguay. Get in touch about software development opportunities or a product you’re building.</p><div className="pf-contact-links"><a href="mailto:amirsholi999@gmail.com">amirsholi999@gmail.com</a><a href="https://www.linkedin.com/in/amirsholi/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a></div><form className="pf-form" onSubmit={contact}><div className="pf-form-row"><label>Name<input name="name" placeholder="Your Name" autoComplete="name" required/></label><label>Email<input type="email" name="email" placeholder="Your@email.com" autoComplete="email" required/></label></div><label>Budget<select name="budget" defaultValue=""><option value="" disabled>Select…</option><option>Let's discuss</option><option>Under $1k</option><option>$1k – $3k</option><option>$3k – $5k</option><option>$5k+</option></select></label><label>Message<textarea name="message" placeholder="Message" rows="5" required/></label><button type="submit">Create email</button>{draft && <p role="status">Your email draft is ready in your email app. You can also write to <a href="mailto:amirsholi999@gmail.com">amirsholi999@gmail.com</a>.</p>}</form></section>
      </main>
    </div>
    <footer className="pf-footer">Built by <a href="/" onClick={event=>navigate(event,'home')}>AmirSholi()</a> · Montevideo, Uruguay</footer>
    <dialog ref={dialog} className="pf-dialog" onCancel={()=>setMedia(null)} onClick={e=>{if(e.target===e.currentTarget)setMedia(null)}} onClose={()=>setMedia(null)}>{media && <><div className="pf-dialog-head"><h2>{media.title}</h2><button autoFocus aria-label="Close preview" onClick={()=>setMedia(null)}><X/></button></div><img src={media.src} alt={media.title}/>{media.description && <p>{media.description}</p>}{media.link && <a href={media.link}>Explore UnderFit <ArrowUpRight size={18}/></a>}</>}</dialog>
  </div>;
}





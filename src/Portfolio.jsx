import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronDown, X } from 'lucide-react';
import './portfolio.css';
import { HomePage, ExperiencePage, ToolsPage, EducationPage, PageHeading } from './PortfolioPages.jsx';
import { useLanguage, localize, LanguageSwitch } from './i18n.jsx';
import { PortfolioFooter } from './PortfolioIdentity.jsx';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProjectCaseStudy } from './ProjectCaseStudy.jsx';
import { ProjectCards } from './ProjectCards.jsx';
const nav = [['home', 'Home'], ['projects', 'Projects'], ['experience', 'Experience'], ['tools', 'Tools'], ['education', 'Education']];
const projectPages = ['projects/underfit', 'projects/samplex'];
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
  const menuToggle = useRef(null);
  const heading = useRef(null);
  const [menuOpen,setMenuOpen] = useState(false);
  const pageUrl = id => id === 'home' ? '/' : '/' + id;
  function navigate(event, id) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (active !== id || window.location.hash) window.history.pushState(null, '', pageUrl(id));
    setActive(id);
    setMenuOpen(false);
    setMedia(null);
    if (projectMenu.current) projectMenu.current.open=false;
    if(active===id)window.scrollTo({top:0, behavior:reduceMotion?'instant':'smooth'});
    requestAnimationFrame(() => heading.current?.focus({preventScroll:true}));
  }
  useEffect(() => {
    document.body.classList.add('portfolio-page');
    const restore = () => { setActive(pageFromLocation());setMenuOpen(false);if(!['#contact','#top','#page-content'].includes(window.location.hash))window.scrollTo({top:0,behavior:'instant'}); };
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
    <header className="pf-header">
      <a className="pf-brand" href="/" onClick={e=>navigate(e,'home')} aria-label="Amir Sholi · Home">Amir Sholi<span aria-hidden="true">.</span></a>
      <nav className={'pf-navigation '+(menuOpen?'is-open':'')} aria-label="Main navigation" id="portfolio-navigation" onKeyDown={e=>{if(e.key==='Escape'){setMenuOpen(false);menuToggle.current?.focus();}}}>
        {nav.map(([id,label]) => id==='projects' ? <details key={id} ref={projectMenu} className="pf-project-menu" onKeyDown={event=>{if(event.key==="Escape"){event.currentTarget.open=false;event.currentTarget.querySelector("summary")?.focus();}}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))event.currentTarget.open=false;}}><summary aria-current={active.startsWith('projects')?'true':undefined} className={active.startsWith('projects')?'is-active':''}><span>Projects</span><ChevronDown size={13} aria-hidden="true"/></summary><div className="pf-project-dropdown"><a href="/projects" aria-current={active==='projects'?'page':undefined} onClick={event=>navigate(event,'projects')}>All projects</a><a href="/projects/underfit" aria-current={active==='projects/underfit'?'page':undefined} onClick={event=>navigate(event,'projects/underfit')}>Under-Fit <small>Gym operations · .NET & PostgreSQL</small></a><a href="/projects/samplex" aria-current={active==='projects/samplex'?'page':undefined} onClick={event=>navigate(event,'projects/samplex')}>SampleX <small>Browser audio sampler · Demo Trial</small></a></div></details> : <a key={id} href={pageUrl(id)} onClick={event=>navigate(event,id)} aria-current={active===id?'page':undefined}>{label}</a>)}
      </nav>
      <LanguageSwitch/>
      <button ref={menuToggle} className="pf-menu-toggle" type="button" aria-label={menuOpen?'Close menu':'Menu'} aria-controls="portfolio-navigation" aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={20} aria-hidden="true"/>:'Menu'}</button>
    </header>
    <div className={'pf-layout pf-route-'+active.replace('/','-')}>
      <main className="pf-main pf-paged" id="page-content" ref={heading} tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={()=>{requestAnimationFrame(()=>{if(window.location.hash==="#contact")document.getElementById("contact")?.scrollIntoView({block:"start"});else window.scrollTo({top:0,behavior:"instant"});heading.current?.focus({preventScroll:true});});}}><motion.div key={active} className="pf-page-view" initial={{opacity:0,y:0}} animate={{opacity:1,y:0}} exit={{opacity:0,y:0}} transition={{duration:reduceMotion?0:0.14,ease:[0.22,1,0.36,1]}}>
        {active === 'home' && <HomePage navigate={navigate}/>}
        {active === 'projects' && <section id="projects"><PageHeading title="Selected projects" description="Explore the problem, the product and the work behind each project. Under-Fit is client software in daily use; SampleX is a browser product with a downloadable demo."/><ProjectCards navigate={navigate} headingLevel={2}/></section>}
        {active === 'experience' && <ExperiencePage/>}
        {active === 'tools' && <ToolsPage/>}
        {active === 'education' && <EducationPage onOpenMedia={setMedia}/>}
        {projectPages.includes(active) && <ProjectCaseStudy project={active.split('/')[1]} onOpenMedia={setMedia} navigate={navigate}/>}
        </motion.div></AnimatePresence>
        {projectPages.includes(active) ? <nav className="pf-page-next" aria-label="Explore more projects"><a href="/projects" aria-current={active==='projects'?'page':undefined} onClick={event=>navigate(event,'projects')}>All projects</a><a href={active==='projects/underfit'?'/projects/samplex':'/projects/underfit'} onClick={event=>navigate(event,active==='projects/underfit'?'projects/samplex':'projects/underfit')}>{active==='projects/underfit'?'Next project: SampleX':'Next project: Under-Fit'} <ArrowRight size={16}/></a></nav> : <nav className="pf-page-next" aria-label="Continue exploring">{active !== 'home' && active !== 'education' && <a href="/" onClick={event=>navigate(event,'home')}>Home</a>}<a href={pageUrl(nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][0])} onClick={event=>navigate(event,nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][0])}>{nav[(nav.findIndex(([id])=>id===(projectPages.includes(active)?'projects':active))+1)%nav.length][1]} <ArrowRight size={16}/></a></nav>}
        <section id="contact"><div className="pf-contact-copy"><h2>Let’s talk.</h2><p className="pf-page-intro">Based in Montevideo, Uruguay. Get in touch about software development opportunities or a product you’re building.</p><div className="pf-contact-links"><a href="mailto:amirsholi999@gmail.com">amirsholi999@gmail.com</a><a href="https://www.linkedin.com/in/amirsholi/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a><a href="https://github.com/Amirsholi" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16}/></a></div></div><details className="pf-contact-form"><summary>Write a message <ChevronDown size={16}/></summary><form className="pf-form" onSubmit={contact}><div className="pf-form-row"><label>Name<input name="name" placeholder="Your Name" autoComplete="name" required/></label><label>Email<input type="email" name="email" placeholder="Your@email.com" autoComplete="email" required/></label></div><label>Message<textarea name="message" placeholder="Message" rows="5" required/></label><button type="submit">Create email</button>{draft && <p role="status">Your email draft is ready in your email app. You can also write to <a href="mailto:amirsholi999@gmail.com">amirsholi999@gmail.com</a>.</p>}</form></details></section>
      </main>
    </div>
    <PortfolioFooter navigate={navigate}/>
    <dialog ref={dialog} className="pf-dialog" onCancel={()=>setMedia(null)} onClick={e=>{if(e.target===e.currentTarget)setMedia(null)}} onClose={()=>setMedia(null)}>{media && <><div className="pf-dialog-head"><h2>{media.title}</h2><button autoFocus aria-label="Close preview" onClick={()=>setMedia(null)}><X/></button></div><img src={media.src} alt={media.title}/>{media.src.includes("english-b1") && <a className="pf-text-link" href="/assets/certificates/english-b1.pdf" target="_blank" rel="noreferrer">Open original PDF <ArrowUpRight size={16}/></a>}{media.description && <p>{media.description}</p>}{media.link && <a href={media.link}>Explore Under-Fit <ArrowUpRight size={18}/></a>}</>}</dialog>
  </div>, language);
}

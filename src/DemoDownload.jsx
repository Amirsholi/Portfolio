import { useLanguage, localize } from './i18n.jsx';
import { useState } from 'react';
import { FileDown } from 'lucide-react';
export const samplexDownloadUrl = 'https://github.com/Amirsholi/SampleX-studio/releases/download/v0.3.0-demo/SampleX-demo-trial-0.3.0.zip';
export function DemoDownload({className='pf-primary-action'}) {
  const { language } = useLanguage();
  const [busy,setBusy]=useState(false);
  async function download(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    await Promise.race([
      fetch('/api/samplex/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event:'demo_interest'}),keepalive:true}).catch(()=>{}),
      new Promise(resolve=>setTimeout(resolve,1500)),
    ]);
    window.location.assign(samplexDownloadUrl);
    setBusy(false);
  }
  return localize(<a href={samplexDownloadUrl} className={className} onClick={download} aria-busy={busy}><FileDown size={18}/>{busy?'Preparing download…':'Download Demo Trial'}</a>, language);
}

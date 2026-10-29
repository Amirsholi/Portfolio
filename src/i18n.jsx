import React, { createContext, useContext, useEffect, useState } from 'react';
import translations from './translations.json';
const LanguageContext = createContext(null);
export function LanguageProvider({children}) {
 const [language,setLanguage]=useState(()=>{try{return ['es','pt','en'].includes(localStorage.getItem('portfolio-language'))?localStorage.getItem('portfolio-language'):'es';}catch{return 'es';}});
 useEffect(()=>{document.documentElement.lang=language;try{localStorage.setItem('portfolio-language',language);}catch{}},[language]);
 const t=text=>translate(text,language);
 return <LanguageContext.Provider value={{language,setLanguage,t}}>{children}</LanguageContext.Provider>;
}
export const useLanguage=()=>useContext(LanguageContext);
export function translate(text,language){if(typeof text!=='string')return text;const key=text.trim();if(key.startsWith('Enlarge: '))return translate('Enlarge:',language)+' '+translate(key.slice(9),language);const value=translations[key]?.[language];return value?text.replace(key,value):text;}
export function localize(node,language){
 if(typeof node==='string')return translate(node,language);
 if(Array.isArray(node))return React.Children.map(node,child=>localize(child,language));
 if(!React.isValidElement(node))return node;
 const props={};for(const key of ['aria-label','title','placeholder','alt'])if(node.props[key])props[key]=translate(node.props[key],language);
 if(node.props.children!==undefined)props.children=localize(node.props.children,language);
 return React.cloneElement(node,props);
}
export function LanguageSwitch(){const {language,setLanguage,t}=useLanguage();return <div className="pf-language-switch" role="group" aria-label={t('Website language')}>{[['es','Español'],['pt','Português'],['en','English']].map(([id,label])=><button key={id} type="button" aria-label={label} title={label} aria-pressed={language===id} onClick={()=>setLanguage(id)}>{id.toUpperCase()}</button>)}</div>;}

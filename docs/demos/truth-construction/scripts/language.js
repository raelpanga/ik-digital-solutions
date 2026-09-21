let language='fr';
try { language=localStorage.getItem('truth-language')==='en'?'en':'fr'; } catch {}
export const getLanguage=()=>language;
export function applyLanguage(){
 document.documentElement.lang=language;
 document.querySelectorAll('[data-fr]').forEach(el=>el.innerHTML=el.dataset[language]);
 document.querySelectorAll('[data-fr-placeholder]').forEach(el=>el.placeholder=el.dataset[language+'Placeholder']);
 document.querySelectorAll('[data-fr-alt]').forEach(el=>el.alt=el.dataset[language+'Alt']);
 document.querySelectorAll('[data-fr-aria]').forEach(el=>el.setAttribute('aria-label',el.dataset[language+'Aria']));
 document.querySelectorAll('[data-fr-href]').forEach(el=>el.href=el.dataset[language+'Href']);
 const meta=document.querySelector('meta[name="description"]');meta.content=meta.dataset[language==='fr'?'descriptionFr':'descriptionEn'];
 const button=document.querySelector('#language');button.innerHTML=language==='fr'?'FR <span>/ EN</span>':'EN <span>/ FR</span>';button.setAttribute('aria-label',language==='fr'?'Switch to English':'Passer en français');
 document.querySelector('#menu').setAttribute('aria-label',language==='fr'?'Menu de navigation':'Navigation menu');
 document.dispatchEvent(new CustomEvent('languagechange',{detail:language}));
}
export function initLanguage(){document.querySelector('#language').addEventListener('click',()=>{language=language==='fr'?'en':'fr';try{localStorage.setItem('truth-language',language)}catch{}applyLanguage()});applyLanguage();}

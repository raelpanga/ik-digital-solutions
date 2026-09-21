import {getLanguage} from './language.js';
export function initContact(){
 // Nothing is fetched from Google until the visitor asks: the embed is heavy on a
 // phone connection and sets cookies.
 const load=document.querySelector('#load-map');
 load?.addEventListener('click',()=>{
  const frame=document.querySelector('#office-map'),map=document.createElement('iframe');
  map.src=frame.dataset.src;map.loading='lazy';map.referrerPolicy='no-referrer-when-downgrade';map.allowFullscreen=true;
  map.title=getLanguage()==='fr'?'Plan : bureaux de TRUTH à Lubumbashi':'Map: TRUTH office in Lubumbashi';
  frame.replaceChildren(map);frame.classList.add('is-loaded');map.focus();
 });
 const button=document.querySelector('#copy-email');if(!button)return;
 // Strings written from JS carry both languages so applyLanguage keeps them in step.
 const say=(el,fr,en)=>{el.dataset.fr=fr;el.dataset.en=en;el.textContent=getLanguage()==='fr'?fr:en};
 const idle=[button.dataset.fr,button.dataset.en];
 // navigator.clipboard needs a secure context, which a phone browsing over plain
 // http will not have, so the old selection trick stays as the fallback.
 const legacy=text=>{const field=document.createElement('textarea');field.value=text;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';
  document.body.append(field);field.select();
  let done=false;try{done=document.execCommand('copy')}catch{}
  field.remove();return done};
 let timer;
 button.addEventListener('click',async()=>{
  const address=button.dataset.copy;
  let done=false;
  try{await navigator.clipboard.writeText(address);done=true}catch{done=legacy(address)}
  if(done)say(button,'Copié','Copied');else say(button,'Copie impossible','Copy failed');
  clearTimeout(timer);timer=setTimeout(()=>say(button,...idle),2400);
 });
}

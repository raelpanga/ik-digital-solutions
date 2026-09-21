export function initMotion(){
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(preference.matches||!('IntersectionObserver' in window))return;
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
 },{threshold:.08,rootMargin:'0px 0px -25px 0px'});
 const elements=document.querySelectorAll('.intro-split>div,.section-heading,.project,.expertise-home>div:first-child,.service-links a,.image-band,.content-grid article,.value-row,.photo-gallery figure,.contact-band,.values-lead>div,.company-lead>div,.company-photo,.detail-body>div,.project-facts,.topic-links a,.faq-section details,.estimate-band>div,.rate-table tbody tr,.locator-figure,.locator-city,.office-map');
 // Siblings arrive in sequence rather than all at once. The stylesheet has read
 // --reveal-delay since the reveal was written; nothing had ever set it.
 const counts=new Map();
 for(const element of elements){
  if(element.getBoundingClientRect().top<innerHeight)continue;
  const position=counts.get(element.parentElement)||0;
  counts.set(element.parentElement,position+1);
  if(position)element.style.setProperty('--reveal-delay',Math.min(position,5)*70+'ms');
  element.classList.add('reveal-pending');observer.observe(element);
 }
 preference.addEventListener('change',e=>{if(e.matches){observer.disconnect();elements.forEach(el=>el.classList.remove('reveal-pending'))}});
 document.addEventListener('projectsfiltered',()=>document.querySelectorAll('.project').forEach(el=>el.classList.add('is-visible')));
 // Focused links must always become visible, including keyboard navigation below the fold.
 document.addEventListener('focusin',e=>e.target.closest('.reveal-pending')?.classList.add('is-visible'));
}

export function initProjects(){
 const buttons=document.querySelectorAll('[data-filter]');
 buttons.forEach(button=>button.addEventListener('click',()=>{
 buttons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
 const grid=document.querySelector('.project-grid');
 grid.classList.remove('filtered');void grid.offsetWidth;grid.classList.add('filtered');
 document.querySelectorAll('[data-category]').forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter);
 document.dispatchEvent(new CustomEvent('projectsfiltered'));
 }));
 // Pointing at a project in the list lights its pin on the drawing, and the reverse.
 const map=document.querySelector('.locator-map');
 if(map){
  const mark=on=>event=>{const link=event.target.closest('a');if(!link||(!on&&link.contains(event.relatedTarget)))return;
   map.querySelectorAll(`a[href="${link.getAttribute('href')}"]`).forEach(el=>el.classList.toggle('is-hot',on))};
  map.addEventListener('pointerover',mark(true));map.addEventListener('pointerout',mark(false));
  map.addEventListener('focusin',mark(true));map.addEventListener('focusout',mark(false));
 }
}

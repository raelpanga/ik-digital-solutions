import {getLanguage} from './language.js';
export function initGallery(){
 const hero=document.querySelector('.home-hero');
 if(hero){
  const controls=[...hero.querySelectorAll('[data-slide-to]')],slides=[...hero.querySelectorAll('[data-slide]')];
  const pause=hero.querySelector('#hero-pause'),captions=hero.querySelector('.hero-captions');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let timer,userPaused=motion.matches,focused=false,hovered=false,inView=true;
  const stop=()=>{clearTimeout(timer);hero.dataset.playing='false';captions.setAttribute('aria-live','polite')};
  const syncButton=()=>{
   pause.setAttribute('aria-pressed',String(userPaused));
   pause.dataset.frAria=userPaused?'Reprendre le diaporama':'Mettre le diaporama en pause';
   pause.dataset.enAria=userPaused?'Resume slideshow':'Pause slideshow';
   pause.setAttribute('aria-label',pause.dataset[getLanguage()+'Aria']);
  };
  const start=()=>{
   stop();syncButton();
   if(userPaused||motion.matches||focused||hovered||document.hidden||!inView||slides.length<2)return;
   hero.dataset.playing='true';captions.setAttribute('aria-live','off');
   timer=setTimeout(()=>{const i=slides.findIndex(s=>s.classList.contains('is-active'));show(String((i+1)%slides.length))},7000);
  };
  const show=current=>{
   slides.forEach(slide=>{
    const active=slide.dataset.slide===current;
    slide.classList.toggle('is-active',active);slide.classList.remove('is-drifting');
    slide.setAttribute('aria-hidden',String(!active));
    if(active)requestAnimationFrame(()=>requestAnimationFrame(()=>slide.classList.add('is-drifting')));
   });
   hero.querySelectorAll('[data-caption]').forEach(caption=>caption.hidden=caption.dataset.caption!==current);
   controls.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.slideTo===current)));
   start();
  };
  controls.forEach(button=>button.addEventListener('click',()=>show(button.dataset.slideTo)));
  pause.addEventListener('click',()=>{userPaused=!userPaused;if(!userPaused){focused=false;hovered=false}start()});
  hero.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;stop()}});
  hero.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'){hovered=false;start()}});
  hero.addEventListener('focusin',()=>{focused=true;stop()});
  hero.addEventListener('focusout',event=>{focused=hero.contains(event.relatedTarget);start()});
  document.addEventListener('visibilitychange',start);
  document.addEventListener('languagechange',syncButton);
  motion.addEventListener('change',()=>{if(motion.matches)userPaused=true;start()});
  if('IntersectionObserver' in window)new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;start()}).observe(hero);
  show('0');
 }
 const dialog=document.querySelector('#photo-dialog');
 if(!dialog||typeof dialog.showModal!=='function')return;
 const links=[...document.querySelectorAll('[data-gallery]')];
 const photo=dialog.querySelector('#gallery-photo');
 const caption=dialog.querySelector('#gallery-caption');
 const prev=dialog.querySelector('#gallery-prev'),next=dialog.querySelector('#gallery-next');
 let current=0,opener;
 const render=()=>{
  const link=links[current],source=link.querySelector('img');
  photo.src=link.href;photo.alt=source.alt;
  caption.textContent=`${String(current+1).padStart(2,'0')} / ${String(links.length).padStart(2,'0')} — ${source.alt}`;
  prev.hidden=next.hidden=links.length<2;
 };
 const step=direction=>{current=(current+direction+links.length)%links.length;render()};
 links.forEach((link,i)=>link.addEventListener('click',event=>{
  if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();opener=link;current=i;render();dialog.showModal();
 }));
 prev.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
 dialog.querySelector('#close-gallery').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();step(1)}else if(event.key==='ArrowLeft'){event.preventDefault();step(-1)}});
 // Phones expect to swipe. A mostly vertical drag is left alone so it never
 // fights the browser gestures, and the threshold keeps a tap from stepping.
 let startX=0,startY=0;
 dialog.addEventListener('touchstart',event=>{startX=event.changedTouches[0].clientX;startY=event.changedTouches[0].clientY},{passive:true});
 dialog.addEventListener('touchend',event=>{
  if(links.length<2)return;
  const moved=event.changedTouches[0].clientX-startX,drift=event.changedTouches[0].clientY-startY;
  if(Math.abs(moved)>48&&Math.abs(moved)>Math.abs(drift)*1.5)step(moved<0?1:-1);
 },{passive:true});
 dialog.addEventListener('close',()=>{photo.removeAttribute('src');opener?.focus()});
 document.addEventListener('languagechange',()=>{if(dialog.open)render()});
}

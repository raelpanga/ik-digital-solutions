export function initNavigation(){
 const nav=document.querySelector('#nav'),menu=document.querySelector('#menu');
 menu.setAttribute('aria-controls','nav');
 const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')};
 menu.addEventListener('click',()=>menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();menu.focus()}});
 document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))close()});
 matchMedia('(min-width: 1001px)').addEventListener('change',close);
 document.querySelector('#year').textContent=new Date().getFullYear();
 const openSection=()=>{let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}const section=document.getElementById(id);if(section?.tagName==='DETAILS')section.open=true};
 openSection();window.addEventListener('hashchange',openSection);
}

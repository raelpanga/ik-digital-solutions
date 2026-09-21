// The homepage header overlays the photo and becomes solid after 48px of scroll.
export function initHeader(){
 const trigger=document.querySelector('#hero-header-trigger');
 if(!trigger)return;
 const update=()=>document.body.toggleAttribute('data-header-solid',scrollY>48);
 update();
 if('IntersectionObserver' in window){
  new IntersectionObserver(([entry])=>document.body.toggleAttribute('data-header-solid',entry.boundingClientRect.top<0)).observe(trigger);
 }else{addEventListener('scroll',update,{passive:true})}
}

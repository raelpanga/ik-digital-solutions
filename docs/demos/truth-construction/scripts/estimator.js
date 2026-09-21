import {getLanguage} from './language.js';
export function initEstimator(){
 const root=document.querySelector('#estimator');if(!root)return;
 const data=JSON.parse(document.querySelector('#pricing-data').textContent);
 const type=root.querySelector('#est-type'),area=root.querySelector('#est-area'),level=root.querySelector('#est-level');
 const range=root.querySelector('#est-range'),duration=root.querySelector('#est-duration'),scope=root.querySelector('#est-scope');
 const chat=root.querySelector('#est-whatsapp');
 const money=(value,fr)=>new Intl.NumberFormat(fr?'fr-FR':'en-GB',{style:'currency',currency:data.currency,currencyDisplay:'code',maximumFractionDigits:0}).format(value);
 // The result carries no data-fr, so applyLanguage leaves it alone and this
 // listener redraws it instead; the numbers have to be reformatted anyway.
 const render=()=>{
  const fr=getLanguage()==='fr';
  const chosen=data.types.find(t=>t.key===type.value),picked=data.levels.find(l=>l.key===level.value);
  const size=Math.round(Number(area.value)||0);
  scope.textContent=fr?picked.scopeFr:picked.scopeEn;
  const [low,high]=chosen.rates[picked.key];
  if(size<=0){range.textContent='—';duration.textContent=fr?'Indiquez une surface pour voir une fourchette.':'Enter a floor area to see a range.';chat.hidden=true;return}
  range.textContent=`${money(size*low,fr)} – ${money(size*high,fr)}`;
  duration.textContent=chosen.months[1]?(fr?`Durée indicative : ${chosen.months[0]} à ${chosen.months[1]} mois`:`Indicative duration: ${chosen.months[0]} to ${chosen.months[1]} months`):'';
  chat.hidden=false;
  const build=fr?chosen.fr:chosen.en,finish=fr?picked.fr:picked.en;
  chat.href='https://wa.me/'+root.dataset.whatsapp+'?text='+encodeURIComponent(fr
   ?`Bonjour TRUTH. J’ai fait une estimation sur votre site : ${build}, ${size} m², finition ${finish}. Fourchette indicative : ${money(size*low,true)} – ${money(size*high,true)}. J’aimerais en discuter.`
   :`Hello TRUTH. I used the estimator on your site: ${build}, ${size} m², ${finish} finish. Indicative range: ${money(size*low,false)} – ${money(size*high,false)}. I would like to discuss it.`);
 };
 [type,area,level].forEach(field=>field.addEventListener('input',render));
 document.addEventListener('languagechange',render);
 render();
}

'use strict';
document.documentElement.classList.add('js');
const en=document.documentElement.lang==='en',t=(fr,eng)=>en?eng:fr;
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.masthead'))closeMenu();});
document.querySelectorAll('[data-language]').forEach(link=>link.addEventListener('click',()=>{link.hash=location.hash;}));
document.querySelectorAll('[data-filter]').forEach(group=>group.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;group.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll(`[data-group="${group.dataset.filter}"]`).forEach(item=>{item.hidden=button.dataset.value!=='all'&&item.dataset.category!==button.dataset.value;});}));
const properties=document.querySelector('#property-type');
if(properties)properties.addEventListener('change',()=>{let count=0;document.querySelectorAll('[data-property]').forEach(item=>{item.hidden=properties.value!=='all'&&item.dataset.property!==properties.value;if(!item.hidden)count++;});document.querySelector('#property-count').textContent=t(`${count} bien(s) dans cette sélection.`,`${count} properties in this selection.`);});
const selected=new Set();
document.querySelectorAll('.save-item').forEach(button=>button.addEventListener('click',()=>{const name=button.dataset.item;if(selected.has(name))selected.delete(name);else selected.add(name);button.setAttribute('aria-pressed',String(selected.has(name)));button.textContent=selected.has(name)?t('✓ Dans ma sélection','✓ In my selection'):t('＋ Ajouter à ma sélection','＋ Add to my selection');document.querySelector('#selection-status').textContent=selected.size?t('Votre sélection : ','Your selection: ')+[...selected].join(' · '):t('Votre sélection est vide.','Your selection is empty.');}));
const today=new Date(),localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
document.querySelectorAll('[data-request] [type=submit]').forEach(button=>{button.disabled=false;});
document.querySelectorAll('[data-request]').forEach(form=>{form.elements.date.min=localDate;form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const result=form.querySelector('.form-result');result.hidden=false;result.textContent=t('Aperçu de votre demande : ','Your request preview: ')+form.elements.subject.value+' — '+form.elements.date.value+'. '+t('Aucune réservation confirmée et aucun message envoyé.','No booking confirmed and no message sent.');});});
document.querySelectorAll('.room-grid a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('[data-request] select').value=link.closest('article').querySelector('h3').textContent;}));

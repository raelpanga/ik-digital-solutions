"use strict";
const services = [
  {
    key: "payments", examples: ["commande-distributeur"],
    fr: {
      title: "Paiements & mobile money", brief: "Reliez vos ventes aux moyens de paiement utilisés par vos clients : M-Pesa, Airtel Money, Orange Money et carte bancaire, selon les accès disponibles.",
      audience: "Boutiques, distributeurs et entreprises de services : suivez une commande depuis la demande de paiement jusqu’au rapprochement de l’encaissement. Votre équipe retrouve les statuts et les références au même endroit.",
      includes: ["Choix du prestataire et vérification des opérateurs couverts en RDC", "Parcours de paiement mobile et confirmation côté serveur", "Gestion des paiements en attente, refusés et des notifications en double", "Historique, références et exports pour le rapprochement", "Tests de bout en bout avant l’activation en production"],
      needs: ["Compte marchand et accès autorisés chez le prestataire retenu", "Devises, règles de remboursement et processus comptable", "Catalogue ou système de commandes à connecter"],
      faq: [["Tous les opérateurs sont-ils disponibles ?", "La couverture dépend du pays, du prestataire et de votre compte marchand. Nous validons ces éléments avant de confirmer le périmètre."], ["L’exemple présenté encaisse-t-il réellement ?", "Non. Mokili illustre un parcours de commande et de rapprochement avec des opérations simulées. Une intégration réelle nécessite des accès marchands et des tests dédiés."]]
    },
    en: {
      title: "Payments & mobile money", brief: "Connect sales to the payment methods your customers use: M-Pesa, Airtel Money, Orange Money and cards, subject to provider access.",
      audience: "For shops, distributors and service businesses: track orders from payment request to reconciliation. Give your team one place to find payment statuses and references.",
      includes: ["Provider selection and verification of supported DRC operators", "Mobile checkout and server-side payment confirmation", "Handling pending payments, failures and duplicate notifications", "Transaction history, references and reconciliation exports", "End-to-end testing before production activation"],
      needs: ["Merchant account and authorized provider access", "Currencies, refund rules and accounting workflow", "Catalogue or order system to connect"],
      faq: [["Are all operators available?", "Coverage depends on the country, provider and merchant account. We verify these before confirming scope."], ["Does the example collect real payments?", "No. Mokili illustrates ordering and reconciliation with simulated transactions. Live integration requires merchant access and dedicated testing."]]
    }
  },
  {
    key: "whatsapp", examples: [],
    fr: {
      title: "Automatisation WhatsApp Business", brief: "Transformez les conversations en demandes suivies : accueil, qualification, rendez-vous et notifications, avec un relais vers votre équipe.",
      audience: "Pour les équipes qui répondent chaque jour aux mêmes questions ou perdent des demandes dans les conversations. Organisez l’accueil, collectez les informations utiles et transmettez chaque demande à la bonne personne.",
      includes: ["Scénarios d’accueil, questions fréquentes et qualification des demandes", "Connexion au CRM, aux commandes ou à votre agenda selon le périmètre", "Notifications et modèles de messages à faire approuver si nécessaire", "Transfert vers un conseiller et gestion des demandes non comprises", "Consentement, désinscription et tests du parcours client"],
      needs: ["Compte WhatsApp Business Platform et numéro éligible", "Questions fréquentes, horaires et personnes responsables du suivi", "Règles de consentement et outils à connecter"],
      faq: [["Un simple lien WhatsApp suffit-il ?", "Un lien ouvre une conversation. L’automatisation utilise la plateforme officielle WhatsApp Business et une connexion à vos outils, selon vos accès et les règles de Meta."], ["Peut-on parler à une personne ?", "Oui. Nous prévoyons un passage vers votre équipe, avec le contexte de la demande et des horaires clairement annoncés."]]
    },
    en: {
      title: "WhatsApp Business automation", brief: "Turn conversations into tracked requests: welcome messages, qualification, appointments and notifications, with a handoff to your team.",
      audience: "For teams answering the same questions every day or losing requests in chat. Organize the welcome, collect useful information and route each request to the right person.",
      includes: ["Welcome journeys, common questions and lead qualification", "Connections to your CRM, orders or calendar within the agreed scope", "Notifications and message templates submitted for approval where required", "Human handoff and handling of misunderstood requests", "Consent, opt-out and customer journey testing"],
      needs: ["WhatsApp Business Platform account and eligible phone number", "Common questions, opening hours and responsible staff", "Consent rules and systems to connect"],
      faq: [["Is a WhatsApp link enough?", "A link opens a conversation. Automation uses the official WhatsApp Business Platform and connections to your tools, subject to your access and Meta’s rules."], ["Can customers speak to a person?", "Yes. We plan a handoff to your team with the request context and clearly stated opening hours."]]
    }
  }
];
function presentation({tr,link,button}) {
  const brands = (lang,base) => `<div class="integration-brands"><div class="named-brand"><img src="${base}assets/media/mpesa.webp" width="70" height="70" alt=""><span>M-Pesa</span></div><div class="named-brand"><img src="${base}assets/media/orange.svg" width="70" height="70" alt="Orange"><span>Money</span></div><div class="airtel-brand"><img src="${base}assets/media/airtel.png" width="125" height="58" alt="Airtel"><span>Money</span></div><div><img src="${base}assets/media/whatsapp.png" width="48" height="48" alt=""><span>WhatsApp Business</span></div></div>`;
  const diagram = (lang,key) => key === "payments" ? `<div class="payment-illustration" aria-label="${tr(lang,"Illustration du parcours de paiement","Illustrative payment journey")}"><span class="flow-label">${tr(lang,"VOTRE BOUTIQUE","YOUR STORE")}</span><div class="flow-node">${tr(lang,"Commande","Order")} <b>#1042</b></div><span class="flow-connector" aria-hidden="true">↓</span><div class="flow-node wallet-node">Mobile money <span aria-hidden="true">↗</span></div><span class="flow-connector" aria-hidden="true">↓</span><div class="flow-node success-node">✓ ${tr(lang,"Confirmation & suivi","Confirmation & tracking")}</div><small>${tr(lang,"Parcours illustratif","Illustrative journey")}</small></div>` : `<div class="chat-illustration"><div class="chat-heading"><span class="signal-dot"></span> ${tr(lang,"Votre service client","Your customer service")}</div><p class="chat-bubble customer">${tr(lang,"Bonjour, je voudrais réserver.","Hello, I’d like to book.")}</p><p class="chat-bubble">${tr(lang,"Bienvenue ! Quel service vous intéresse ?","Welcome! Which service are you interested in?")}</p><div class="chat-options"><span>${tr(lang,"Rendez-vous","Appointment")}</span><span>${tr(lang,"Parler à l’équipe","Speak to the team")}</span></div><small>${tr(lang,"Exemple de conversation automatisée","Example automated conversation")}</small></div>`;
  const feature = (lang,base) => `<section class="section integrations-section" id="integrations"><div class="wrap"><div class="editorial-heading"><div><p class="eyebrow">${tr(lang,"CONNECTER VOTRE ACTIVITÉ","CONNECT YOUR BUSINESS")}</p><h2>${tr(lang,"Vos clients sont sur mobile.<br>Votre activité aussi.","Your customers are on mobile.<br>Your business can be too.")}</h2></div><p>${tr(lang,"Du premier message à l’encaissement, des parcours qui travaillent ensemble.","From the first message to payment, customer journeys that work together.")}</p></div>${brands(lang,base)}<div class="integration-features">${["payments","whatsapp"].map(key=>`<article class="integration-feature">${diagram(lang,key)}<div><h3>${services.find(s=>s.key===key)[lang].title}</h3><p>${services.find(s=>s.key===key)[lang].brief}</p>${button(link(base,lang,key),tr(lang,"Découvrir le service","Explore the service"),"btn-outline")}</div></article>`).join("")}</div><p class="hint">${tr(lang,"Intégrations selon les opérateurs couverts, vos comptes et les autorisations disponibles. Marques citées à titre d’identification, sans affiliation ni partenariat annoncé.","Integrations depend on supported operators, your accounts and available permissions. Brands identify services; no affiliation or partnership is implied.")}</p></div></section>`;
  return {brands,diagram,feature};
}
module.exports = { services, presentation };

"use strict";
// Editorial presentation, using IK's own project captures and credited DRC photography.
const projectCopy = {
  "genos-rentals": { title: "Geno’s × MAC&CLAY", fr: "De la réservation au costume prêt à porter.", en: "From wedding booking to the perfect fit.", type: ["Commerce & gestion", "Commerce & operations"], facts: ["Stripe", "SMS", "Workflow"], tint: "#e4dfd4" },
  "macclay-wedding-tracker": { title: "MAC&CLAY · Wedding tracker", fr: "Toute une équipe. Un seul tableau de suivi.", en: "One team. One view of every wedding party.", type: ["Application métier", "Business application"], facts: ["Shopify", "Workflow", "SMS"], tint: "#dce5e5" },
  "ets-financial": { title: "ETS Financial", fr: "Une présence bilingue pour un cabinet de Lubumbashi.", en: "A bilingual presence for a Lubumbashi advisory firm.", type: ["Site web · RDC", "Website · DRC"], facts: ["FR / EN", "12 pages", "WhatsApp"], tint: "#dbe4f2" },
  "truth-construction": { title: "TRUTH Construction", fr: "Un constructeur de Lubumbashi, présenté par ses chantiers.", en: "A Lubumbashi builder, presented through its own work.", type: ["Site web · RDC", "Website · DRC"], facts: ["FR / EN", "13 pages", "WhatsApp"], tint: "#e6dfd2" },
  "kimia-express": { title: "Kimia Express", fr: "Réserver. Expédier. Suivre. Sur votre téléphone.", en: "Book. Send. Track. All from your phone.", type: ["Transport & logistique", "Transport & logistics"], facts: ["FR / EN", "18 pages", "Mobile"], tint: "#e9e0cf" },
  "kando-ressources": { title: "Kando Ressources", fr: "L’industrie congolaise, présentée avec ambition.", en: "An ambitious digital presence for Congolese industry.", type: ["Site corporate", "Corporate website"], facts: ["FR / EN", "Industrie", "Mobile"], tint: "#dfd7cd" },
  "site-corporate": { title: "Cimenterie du Fleuve", fr: "Des produits aux projets. Une entreprise à découvrir.", en: "From products to projects. A business worth exploring.", type: ["Site corporate", "Corporate website"], facts: ["FR / EN", "Catalogue", "Mobile"], tint: "#e0e4d4" },
  "ndala-beauty": { title: "Ndala Beauty", fr: "Le soin naturel rencontre le commerce en ligne.", en: "Natural skincare meets online commerce.", type: ["E-commerce", "E-commerce"], facts: ["Catalogue", "Panier", "Mobile"], tint: "#eadacc" },
  "commande-distributeur": { title: "Mokili Distribution", fr: "Commander et rapprocher les encaissements, simplement.", en: "A simpler way to order and reconcile collections.", type: ["Application métier", "Business application"], facts: ["Commandes", "USD / CDF", "Mobile"], tint: "#dce1cf" },
  "portail-sous-traitant": { title: "Portail sous-traitant", fr: "Le suivi terrain, de l’inspection au rapport.", en: "Field operations, from inspection to report.", type: ["Application terrain", "Field application"], facts: ["HSE", "Inspections", "Mobile"], tint: "#e5d9cb" }
};
Object.assign(projectCopy, require("./concepts").projectCopy);
const faq = {
  fr: [
    ["Comment démarrer un projet ?", "Nous partons de votre activité, de vos utilisateurs et de vos priorités. Vous recevez une proposition personnalisée avec les fonctionnalités, les étapes de validation et l’accompagnement prévu."],
    ["Combien de temps prend un projet ?", "Le calendrier dépend des pages, des intégrations et des contenus disponibles. Nous le définissons après cadrage, avec des étapes de validation."],
    ["Travaillez-vous avec les entreprises en RDC ?", "Oui. Nous échangeons à distance en français et en anglais et cadrons les besoins de vos clients et de votre équipe sur place."],
    ["M-Pesa, Airtel Money ou Orange Money sont-ils possibles ?", "Nous étudions le prestataire, les opérateurs disponibles et votre compte marchand. L’intégration réelle, les frais et les tests sont définis au devis. Les paiements de nos démonstrateurs sont simulés."],
    ["Mon application peut-elle fonctionner hors ligne ?", "Nous identifions les tâches qui doivent rester disponibles, les données à conserver et la façon de les synchroniser. Le mode hors ligne se conçoit et se teste pour chaque application."],
    ["Le français et l’anglais sont-ils inclus ?", "Les offres de sites prévoient des pages en français et en anglais. Le devis précise le contenu à traduire et les autres langues éventuelles."],
    ["Qui fournit les textes et les photos ?", "Vous fournissez les informations métier et les images dont vous avez les droits. Nous organisons les contenus et prévoyons les besoins photographiques avec vous."],
    ["Comment abordez-vous le Code du numérique ?", "Nous préparons l’inventaire des données, des accès et des prestataires. Les obligations applicables et les démarches auprès des autorités sont validées avec votre conseil juridique."],
    ["Qui possède le site et les accès ?", "Le contrat définit la propriété du code, les licences et les comptes remis. La livraison inclut la documentation et les accès convenus."],
    ["Que se passe-t-il après la mise en ligne ?", "Un accompagnement peut couvrir mises à jour, sauvegardes et corrections. Horaires, délais et frais sont précisés dans votre contrat de maintenance."]
  ],
  en: [
    ["How do we start a project?", "We begin with your business, users and priorities. You receive a tailored proposal covering features, review milestones and ongoing support."],
    ["How long does a project take?", "Timing depends on pages, integrations and available content. We agree on a schedule after scoping, including review milestones."],
    ["Do you work with businesses in the DRC?", "Yes. We collaborate remotely in French and English, working through the needs of your customers and local team."],
    ["Can you include M-Pesa, Airtel Money or Orange Money?", "We assess the provider, supported operators and your merchant account. Live integration, fees and tests are scoped in the quote. Payments in our demonstrations are simulated."],
    ["Can my application work offline?", "We identify tasks that need to remain available, data to retain and how to synchronize it. Offline behavior is designed and tested for each application."],
    ["Are French and English included?", "Website offers include French and English pages. The quote specifies which content is translated and any additional languages."],
    ["Who supplies copy and photography?", "You provide business information and images you have permission to use. We organize the content and plan photography needs with you."],
    ["How do you approach the Digital Code?", "We prepare an inventory of data, access and providers. Applicable obligations and filings with authorities are validated with your legal adviser."],
    ["Who owns the website and accounts?", "The contract defines code ownership, licenses and account handover. Delivery includes the agreed documentation and access."],
    ["What happens after launch?", "Support can cover updates, backups and fixes. Coverage, response times and fees are defined in your maintenance agreement."]
  ]
};
module.exports = function visual({ D, services, labels, esc, tr, link, inquiry, button, section, contactBand }) {
  const integration = require("./integrations").presentation({tr,link,button});
  const tech = require("./tech");
  const expansionCopy = require("./expansion").cardCopy;
  const pic = (base, name, alt, cls = "", eager = false) => `<img class="${cls}" src="${base}assets/media/${name}.webp" alt="${esc(alt)}" width="1600" height="1067" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const faqList = (lang, limit = 10) => `<div class="faq-list">${faq[lang].slice(0, limit).map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;
  const serviceShots = ["ets-financial", "ndala-beauty", "genos-rentals", "macclay-wedding-tracker"];
  const benefits = {
    fr: [["Faites bonne impression.", "Un site clair qui donne envie de vous contacter."], ["Facilitez chaque commande.", "Un catalogue et un parcours adaptés à vos clients."], ["Simplifiez le quotidien.", "Un outil pensé autour du travail de votre équipe."], ["Gardez le cap après le lancement.", "Des mises à jour et un suivi définis avec vous."]],
    en: [["Make the right first impression.", "A clear website that invites customers to get in touch."], ["Make every order easier.", "A catalogue and journey built around your customers."], ["Simplify everyday work.", "An application shaped around how your team operates."], ["Keep moving after launch.", "Updates and ongoing care agreed with you."]]
  };
  function serviceCards(lang, base) {
    return `<div class="offer-grid visual-offers">${services.slice(0, 6).map((s, i) => {
      const p = D.projects.find(p => p.slug === serviceShots[i]);
      if (!p) return `<a class="offer-card" href="${link(base,lang,s.key)}"><div class="offer-preview integration-preview">${integration.diagram(lang,s.key)}</div><div class="offer-copy"><span class="eyebrow">0${i+1} / ${esc(s[lang].title)}</span><h3>${tr(lang,s.key === "payments" ? "Encaissez. Suivez. Avancez." : "Chaque conversation compte.",s.key === "payments" ? "Collect. Track. Move forward." : "Every conversation matters.")}</h3><p>${esc(s[lang].brief)}</p><span class="open">${tr(lang,"Explorer","Explore")} ↗</span></div></a>`;
      return `<a class="offer-card" href="${link(base, lang, s.key)}"><div class="offer-preview"><img src="${base}shots/${p.slug}-desktop.${p.shotExt || "png"}" alt="${esc(p[lang].title)}" loading="lazy" width="1280" height="800"><span class="offer-number">0${i + 1}</span></div><div class="offer-copy"><span class="eyebrow">${esc(s[lang].title)}</span><h3>${benefits[lang][i][0]}</h3><p>${benefits[lang][i][1]}</p><span class="open">${tr(lang, "Explorer", "Explore")} ↗</span></div></a>`;
    }).join("")}</div>${moreCards(lang, base)}`;
  }
  // Services without a showcase project yet: compact text cards under the main grid.
  function moreCards(lang, base) {
    const extra = services.slice(6);
    if (!extra.length) return "";
    return `<div class="more-services"><p class="eyebrow">${tr(lang, "Également proposé", "Also available")}</p><div class="more-grid">${extra.map((s, i) => `<a class="more-card" href="${link(base, lang, s.key)}"><span class="more-num">${String(i + 7).padStart(2, "0")}</span><h3>${esc(s[lang].title)}</h3><p>${esc(expansionCopy[lang][s.key] || s[lang].brief)}</p><span class="open">${tr(lang, "Explorer", "Explore")} ↗</span></a>`).join("")}</div></div>`;
  }
  function tiers(lang, base) {
    return '<div class="content-panel"><p class="lead">' + tr(lang,"Un accompagnement construit autour de votre activité.","Support shaped around your business.") + '</p><p>' + tr(lang,"Nous définissons ensemble les fonctionnalités utiles, les outils à connecter et les étapes de livraison. Votre proposition précise le périmètre, les responsabilités et le suivi après la mise en ligne.","Together we define useful features, systems to connect and delivery milestones. Your proposal sets out scope, responsibilities and support after launch.") + '</p>' + button(inquiry(base,lang),tr(lang,"Définir mon projet","Scope my project")) + '</div>';
  }
  const photoCredit = (base, lang) => `<a class="photo-credit" href="${link(base, lang, "legal")}#credits">${tr(lang, "Kinshasa · Crédit photo", "Kinshasa · Photo credit")} ↗</a>`;
  // Dark "what we do" block on the home page: one card per service, closing on an invitation.
  const WWD_ICONS = {
    websites: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01"/>',
    commerce: '<path d="M5.5 7h13l-1.1 12.2a1.8 1.8 0 0 1-1.8 1.6H8.4a1.8 1.8 0 0 1-1.8-1.6z"/><path d="M9 9.5V6.5a3 3 0 0 1 6 0v3"/>',
    applications: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="4.5" rx="1.6"/><rect x="13.5" y="10.5" width="7.5" height="10.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/>',
    hosting: '<rect x="3" y="4" width="18" height="6.5" rx="2"/><rect x="3" y="13.5" width="18" height="6.5" rx="2"/><path d="M6.8 7.2h.01M6.8 16.7h.01"/>',
    payments: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M9.2 6.5h5.6M9.2 10h5.6M10.5 18h3"/>',
    whatsapp: '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.8A8.4 8.4 0 1 1 20.5 11.6z"/>',
    mobile: '<rect x="7" y="2.5" width="10" height="19" rx="2.6"/><path d="M10.8 18.3h2.4"/>',
    ai: '<rect x="7.5" y="7.5" width="9" height="9" rx="2.2"/><path d="M11 11h2v2h-2z"/><path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21"/>',
    audit: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="M15.4 15.4 20.5 20.5"/>',
    modernisation: '<path d="M4 9.2a8 8 0 0 1 13.4-4.9L20 6.6"/><path d="M20.3 3.2v3.6h-3.6"/><path d="M20 14.8a8 8 0 0 1-13.4 4.9L4 17.4"/><path d="M3.7 20.8v-3.6h3.6"/>',
    team: '<circle cx="9.2" cy="8.2" r="3.3"/><path d="M3.6 19.2a5.6 5.6 0 0 1 11.2 0"/><path d="M15.8 5.4a3.3 3.3 0 0 1 0 5.7"/><path d="M17.2 13.8a5.6 5.6 0 0 1 3.2 5.4"/>'
  };
  function whatWeDo(lang, base) {
    const icon = key => `<span class="wwd-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${WWD_ICONS[key] || WWD_ICONS.applications}</svg></span>`;
    const card = s => `<a class="wwd-card" href="${link(base, lang, s.key)}">${icon(s.key)}<h3>${esc(s[lang].title)}</h3><p>${esc(s[lang].brief)}</p><span class="wwd-go">${tr(lang, "En savoir plus", "Learn more")} <span aria-hidden="true">→</span></span></a>`;
    return `<section class="section what-we-do bleed" id="services"><span class="wwd-ghost" aria-hidden="true">SERVICES</span><div class="wrap">
      <div class="wwd-top"><div><p class="eyebrow">02 / ${tr(lang, "Ce que nous faisons", "What we do")}</p><h2>${tr(lang, "Ce que <em>nous faisons</em>", "What <em>we do</em>")}</h2></div><div class="wwd-lead"><p>${tr(lang, "Nous concevons, construisons et faisons évoluer des sites et des applications sur mesure, pensés pour la façon dont vos clients et vos équipes travaillent réellement.", "We design, build and grow custom websites and applications, shaped around how your customers and your teams actually work.")}</p><p>${tr(lang, "Des sites web aux applications métier, du mobile money à l’automatisation, de l’audit au renfort d’équipe.", "From websites to business applications, from mobile money to automation, from audits to extra development capacity.")}</p></div></div>
      <div class="wwd-grid">${services.map(card).join("")}<a class="wwd-card wwd-cta" href="${inquiry(base, lang)}"><h3>${tr(lang, "Prêt à en parler ?", "Ready to talk?")}</h3><p>${tr(lang, "Décrivez votre besoin : nous répondons avec un périmètre clair et une proposition adaptée.", "Tell us what you need: we reply with a clear scope and a tailored proposal.")}</p><span class="btn btn-acid">${esc(labels[lang].discuss)} →</span></a></div></div></section>`;
  }
  // Scrolling technology band. Icons are inlined once as symbols, then reused by both rows.
  function techBand(lang, index = "03") {
    const eyebrow = (index ? index + " / " : "") + tr(lang, "Notre boîte à outils", "Our toolkit");
    const half = Math.ceil(tech.length / 2);
    const rows = [tech.map((t, i) => [t, i]).slice(0, half), tech.map((t, i) => [t, i]).slice(half)];
    const sprite = `<svg class="tech-sprite" aria-hidden="true" focusable="false"><defs>${tech.map((t, i) => `<symbol id="t${i}" viewBox="0 0 24 24"><path d="${t.d}"/></symbol>`).join("")}</defs></svg>`;
    const seq = row => `<span class="tech-seq">${row.map(([t, i]) => `<span class="tech-chip"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#t${i}"></use></svg>${esc(t.n)}</span>`).join("")}</span>`;
    return `<section class="tech-band bleed" aria-labelledby="tech-title">${sprite}
      <div class="wrap editorial-heading"><div><p class="eyebrow">${eyebrow}</p><h2 id="tech-title">${tr(lang, "Les technologies<br>derrière vos projets.", "The technology<br>behind your project.")}</h2></div><p>${tr(lang, "Nous choisissons chaque outil selon votre besoin, votre budget et la façon dont votre système sera maintenu ensuite.", "We choose each tool to fit your need, your budget and how your system will be maintained afterwards.")}</p></div>
      <div class="tech-marquee" role="img" aria-label="${esc(tech.map(t => t.n).join(", "))}">${rows.map((row, i) => `<div class="tech-track${i ? " reverse" : ""}">${seq(row)}${seq(row)}</div>`).join("")}</div>
      <p class="wrap hint">${tr(lang, "Marques citées pour identifier les technologies utilisées, sans affiliation ni partenariat annoncé. Logos : Simple Icons (CC0).", "Brand names identify the technologies we work with; no affiliation or partnership is implied. Logos: Simple Icons (CC0).")}</p></section>`;
  }
  // A looping CSS sequence: the same wireframe is sketched, structured, designed and published.
  // No video and no extra request — the whole sequence is markup the stylesheet animates.
  function buildStage(lang, base) {
    const steps = tr(lang,
      [["Cadrer", "Ce que vous voulez obtenir, pour qui, avec quel budget."], ["Structurer", "Les écrans, leur enchaînement et ce que chacun doit permettre."], ["Dessiner", "L’identité, la lecture sur téléphone et les détails."], ["Mettre en ligne", "Les tests, les accès, la reprise en main et le suivi."]],
      [["Scope", "What you want to achieve, for whom, within what budget."], ["Structure", "The screens, how they connect and what each one has to do."], ["Design", "The identity, how it reads on a phone, the details."], ["Launch", "Testing, access, handover and ongoing support."]]);
    const phases = tr(lang, ["Croquis", "Structure", "Design", "En ligne"], ["Sketch", "Structure", "Design", "Live"]);
    const cta = tr(lang, "Demander un devis", "Request a quote");
    const bl = c => `<span class="bl ${c}"></span>`;
    const before = ["bl-nav", "bl-hero", "bl-h", "bl-t", "bl-t bl-t2"].map(bl).join("");
    const after = ["bl-c bl-c1", "bl-c bl-c2", "bl-c bl-c3"].map(bl).join("");
    return `<section class="section build-stage" id="atelier"><div class="wrap">
      <div class="editorial-heading"><div><p class="eyebrow">01 / ${tr(lang, "Une idée devient concrète", "Ideas made tangible")}</p><h2>${tr(lang, "De l’idée<br>à la mise en ligne.", "From an idea<br>to something live.")}</h2></div><a class="text-link" href="${link(base, lang, "work")}">${tr(lang, "Explorer tous les projets", "Explore all projects")} ↗</a></div>
      <div class="build-grid">
        <div class="build-copy"><p class="build-lead">${tr(lang, "Vous décrivez ce dont vous avez besoin. Nous le structurons, nous le dessinons, puis nous le mettons en ligne, avec votre validation à chaque étape.", "You describe what you need. We structure it, design it and put it online, with your approval at every step.")}</p>
          <ol class="build-steps">${steps.map(([t, d], i) => `<li><span class="build-n">0${i + 1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join("")}</ol>
          <a class="text-link" href="${link(base, lang, "process")}">${esc(labels[lang].process)} ↗</a></div>
        <figure class="build-canvas">
          <div class="build-screen" role="img" aria-label="${tr(lang, "Animation : un croquis d’interface devient une page en ligne, étape par étape.", "Animation: an interface sketch becomes a live page, step by step.")}">
            <span class="bl build-chrome"><i></i><i></i><i></i><em class="build-url">votre-entreprise.cd</em></span>
            <div class="build-page">${before}<span class="bl bl-cta" data-label="${esc(cta)}"><i class="build-cursor"></i></span>${after}</div>
          </div>
          <figcaption class="build-phase">${phases.map(p => `<span>${esc(p)}</span>`).join("")}</figcaption>
        </figure>
      </div></div></section>`;
  }
  function home(lang, base) {
    // Live demonstrations belong to the Work page; the home page shows client work only.
    const clients = D.projects.filter(p => p.status === "client");
    const featured = clients.find(p => p.slug === "ets-financial") || clients[0];
    const fc = projectCopy[featured.slug], fext = featured.shotExt || "png";
    const selected = clients;
    return `<section class="visual-hero bleed" id="top">
      ${pic(base, "kinshasa-night", tr(lang, "Kinshasa illuminée à la tombée de la nuit", "Kinshasa illuminated at night"), "hero-photo", true)}
      <div class="wrap hero-grid"><div class="hero-copy"><p class="eyebrow"><span class="signal-dot"></span>${tr(lang, "Studio digital · Spécialiste RDC", "Digital studio · DRC focus")}</p><h1>${tr(lang, "Votre ambition.<br><em>Le digital</em><br>pour l’accomplir.", "Your ambition.<br><em>Digital tools.</em><br>Real possibilities.")}</h1><p class="hero-lead">${tr(lang, "Sites web & applications pensés pour le Congo.<br>Vos clients. Vos paiements. Votre réalité.", "Websites & applications built around the Congo.<br>Your customers. Your payments. Your reality.")}</p><div class="cta-row">${button(link(base, lang, "work"), tr(lang, "Explorer nos projets", "Explore our work"), "btn-acid")}${button(inquiry(base, lang), tr(lang, "Parlons-en", "Let's talk"), "btn-ghost")}</div></div>
      <a class="hero-project" href="${base + (lang === "fr" ? "projets/" : "en/projects/") + featured.slug}.html"><div class="hero-project-label"><span>01 / ${String(D.projects.length).padStart(2, "0")}</span><span>${tr(lang, "À découvrir", "In the spotlight")} ↗</span></div><div class="hero-device"><img src="${base}shots/${featured.slug}-desktop.${fext}" alt="${tr(lang, "Aperçu du site " + fc.title, fc.title + " website preview")}" width="1280" height="800" fetchpriority="high"></div><div class="hero-phone"><img src="${base}shots/${featured.slug}-mobile.${fext}" alt="${tr(lang, fc.title + " sur téléphone", fc.title + " on mobile")}" width="430" height="900"></div><div class="hero-project-caption"><strong>${esc(fc.title)}</strong><span>${esc(fc.type[lang === "fr" ? 0 : 1])}</span></div></a></div>
      <div class="wrap hero-bottom"><span>FR / EN <span aria-hidden="true">·</span> ${tr(lang, "Du Kentucky à la RDC", "From Kentucky to the DRC")}</span>${photoCredit(base, lang)}<a href="#atelier">${tr(lang, "Découvrir", "Explore")} ↓</a></div></section>
      <div class="proof-strip wrap" id="preuves"><p>${tr(lang, "À découvrir<br>en ligne", "Explore<br>online")}</p>${clients.map(p => `<a href="${base + (lang === "fr" ? "projets/" : "en/projects/") + p.slug}.html">${esc(projectCopy[p.slug].title)}<span>↗</span></a>`).join("")}</div>
      ${buildStage(lang, base)}
      ${whatWeDo(lang, base)}
      ${techBand(lang)}
      ${integration.feature(lang,base)}
      <section class="drc-feature bleed" id="conformite"><div class="drc-photo">${pic(base, "gombe", tr(lang, "Vue sur la Gombe à Kinshasa", "A view across Gombe in Kinshasa"))}${photoCredit(base, lang)}<span class="place-label">KINSHASA<br><small>4°19′ S · 15°19′ E</small></span></div><div class="drc-copy"><p class="eyebrow">04 / ${tr(lang, "Notre terrain", "Our focus")}</p><h2>${tr(lang, "Le Congo a<br>ses réalités.<br><em>Partons de là.</em>", "The Congo has<br>its own realities.<br><em>Start there.</em>")}</h2><div class="local-principles">${tr(lang, [["01", "Le mobile d’abord", "Des parcours légers, conçus pour le téléphone."], ["02", "Des paiements adaptés", "Mobile money, prestataire et compte marchand cadrés ensemble."], ["03", "Le terrain & les données", "Hors-ligne, accès et Code du numérique dès le cadrage."]], [["01", "Mobile comes first", "Lightweight journeys designed for the phone."], ["02", "Payments that fit", "Mobile money, provider and merchant account scoped together."], ["03", "Fieldwork & data", "Offline needs, access and the Digital Code considered from the start."]]).map(([n,t,d]) => `<div><span>${n}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>${button(link(base, lang, "guide"), tr(lang, "Notre approche en RDC", "Our approach in the DRC"), "btn-acid")}</div></section>
      <section class="section" id="methode"><div class="wrap compact-process"><div><p class="eyebrow">05 / ${tr(lang, "Du premier échange à la mise en ligne", "From first conversation to launch")}</p><h2>${tr(lang, "Un cap clair.<br>À chaque étape.", "A clear direction.<br>At every step.")}</h2><a class="text-link" href="${link(base, lang, "process")}">${labels[lang].process} ↗</a></div><ol>${tr(lang, [["On comprend.", "Votre activité, vos utilisateurs, vos contraintes."], ["On construit.", "Des écrans à valider et des versions à essayer."], ["On accompagne.", "Une livraison préparée et un suivi défini."]], [["We understand.", "Your business, users and constraints."], ["We build.", "Screens to review and working versions to try."], ["We support.", "A prepared handover and agreed ongoing care."]]).map(([t,d],i) => `<li><span>0${i+1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join("")}</ol></div></section>
      <section class="section quick-answers"><div class="wrap grid-2"><div><p class="eyebrow">${tr(lang, "Avant de commencer", "Before we begin")}</p><h2>${tr(lang, "Parlons concret.", "Let's get practical.")}</h2><p id="tarifs">${tr(lang, "Vos objectifs, vos outils, votre équipe. Un périmètre clair avant de vous engager.", "Your goals, your tools, your team. A clear scope before you commit.")}</p><a class="text-link" href="${link(base, lang, "services")}#tarifs">${tr(lang,"Un projet à votre mesure","A project built around you")} ↗</a></div><div>${faqList(lang,3)}<a class="text-link" href="${link(base, lang, "services")}#faq">${tr(lang, "Les 10 questions fréquentes", "All 10 common questions")} →</a></div></div></section>` + contactBand(lang, base);
  }
  function guide(lang, base) {
    const groups = tr(lang,
      [["Le téléphone est le point de départ.", "On commence par les tâches essentielles : trouver un service, demander un prix, commander ou envoyer un rapport. Les images sont optimisées et les parcours restent courts."], ["Hors ligne : décider ce qui doit continuer.", "Quelles données faut-il consulter ou saisir sans connexion ? Que se passe-t-il si deux personnes modifient la même fiche ? Nous cadrons stockage local, synchronisation, conflits et protection des appareils. Un simple stockage local ne prouve pas un fonctionnement hors ligne complet."], ["Mobile money : préparer l’encaissement réel.", "Pour M-Pesa, Airtel Money ou Orange Money, le choix dépend des opérateurs couverts par le prestataire, du compte marchand et des accès disponibles. Nous prévoyons confirmations, échecs, doublons et rapprochement. Les démonstrateurs du portfolio ne débitent aucun compte."], ["Code du numérique : préparer les bonnes informations.", "L’ordonnance-loi n° 23/010 du 13 mars 2023 est une référence pour cadrer un projet numérique en RDC. Notre travail technique commence par un inventaire : données collectées, finalités, accès, durée de conservation, sous-traitants, hébergement et transferts éventuels."], ["Autorités, formalités et validation.", "Avec votre conseil juridique, identifiez les obligations applicables, l’autorité compétente et les formalités à accomplir. Le portail CADRAN de l’ARPTC est une source officielle à consulter. L’hébergement en RDC ou un logo de sécurité ne suffisent pas à établir la conformité d’un service."], ["Avant la mise en ligne.", "Validez les mentions et les informations destinées aux utilisateurs, les rôles d’accès, les procédures de sauvegarde et de restauration, les contrats prestataires et les tests du parcours de paiement. Conservez les décisions et les responsabilités par écrit."]],
      [["Start with the phone.", "We begin with essential tasks: finding a service, requesting a price, ordering or sending a field report. Images are optimized and journeys kept short."], ["Offline: decide what must keep working.", "Which information must remain available without a connection? What happens when two people edit the same record? We scope local storage, synchronization, conflicts and device protection. Local storage alone does not establish complete offline functionality."], ["Mobile money: prepare for real collections.", "For M-Pesa, Airtel Money or Orange Money, the choice depends on provider coverage, your merchant account and available access. We plan confirmations, failures, duplicates and reconciliation. Portfolio demonstrations do not debit any account."], ["Digital Code: prepare the right information.", "Ordinance-law No. 23/010 of 13 March 2023 is a reference for scoping a digital project in the DRC. Our technical work starts with an inventory: collected data, purposes, access, retention, providers, hosting and possible transfers."], ["Authorities, filings and validation.", "With your legal adviser, identify applicable obligations, the competent authority and necessary filings. ARPTC’s CADRAN portal is an official resource to consult. Hosting in the DRC or a security logo alone does not establish compliance."], ["Before launch.", "Validate legal notices and user information, access roles, backup and restore procedures, provider contracts and payment tests. Keep decisions and responsibilities in writing."]]);
    return `<div class="page-intro wrap"><p class="eyebrow">${tr(lang, "Le carnet du studio · 16 septembre 2026", "Studio notes · 16 September 2026")}</p><h1>${tr(lang, "Construire pour la RDC.<br>Penser au terrain.", "Build for the DRC.<br>Think about the field.")}</h1><p class="lead measure">${tr(lang, "Mobile money, hors-ligne et Code du numérique : les questions à poser avant de construire.", "Mobile money, offline operation and the Digital Code: questions to ask before you build.")}</p></div><div class="wrap guide-banner">${pic(base, "gombe", tr(lang, "La Gombe, Kinshasa", "Gombe, Kinshasa"))}${photoCredit(base,lang)}</div><section class="section"><div class="wrap guide-layout"><aside><p class="eyebrow">${tr(lang,"Guide de cadrage","Scoping guide")}</p><p>${tr(lang,"Pour dirigeants, responsables de projet et équipes terrain.","For business owners, project leads and field teams.")}</p><p class="hint">${tr(lang,"Ces repères techniques ne remplacent pas un avis juridique adapté à votre activité.","These technical planning notes do not replace legal advice tailored to your business.")}</p></aside><div class="prose">${groups.map(([t,d],i)=>`<section><p class="eyebrow">0${i+1}</p><h2>${t}</h2><p>${d}</p></section>`).join("")}<section id="sources"><h2>${tr(lang,"Sources et vérifications","Sources and checks")}</h2><ul><li><a href="https://are.gouv.cd/download/ordonnance-loi-23-010-du-13-mars-portant-code-du-numerique/">${tr(lang,"Code du numérique · texte publié par l’ARE","Digital Code · text published by ARE")}</a></li><li><a href="https://cadran.arptc.gouv.cd/">CADRAN · ARPTC</a></li></ul><p class="hint">${tr(lang,"Les textes et procédures peuvent évoluer. Vérifiez leur version applicable au moment de votre projet avec les autorités et votre conseil.","Texts and procedures can change. Check the version applicable to your project with the authorities and your adviser.")}</p></section></div></div></section>`+contactBand(lang,base,"applications");
  }
  return { integration, home, guide, serviceCards, tiers, faqList, pic, techBand };
};
module.exports.projectCopy = projectCopy;

// Static site generator for the IK Digital Solutions portfolio.
// Reads assets/content.js and writes a complete multi-page website into docs/:
//   docs/index.html                 French home
//   docs/projets/<slug>.html        French project pages
//   docs/en/index.html              English home
//   docs/en/projects/<slug>.html    English project pages
//   docs/demos/<slug>/index.html    demo applications (wrapped from demos/src)
//   docs/assets/, docs/shots/       stylesheet, site script, screenshots
//   docs/sitemap.xml, robots.txt, 404.html, .nojekyll
// Usage: node build.js [--base-url https://example.com/]
"use strict";
const fs = require("fs"), path = require("path");
global.window = {};
require("./assets/content.js");
const D = window.KDS, C = D.config;
const OUT = path.join(__dirname, "docs");
const argBase = process.argv.indexOf("--base-url");
const SITE_URL = argBase > -1 ? process.argv[argBase + 1].replace(/\/+$/, "") + "/" : "";

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const t = lang => D.i18n[lang];
const wa = msg => "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);
const list = items => "<ul>" + items.map(i => "<li>" + esc(i) + "</li>").join("") + "</ul>";
const chips = items => '<div class="chips">' + items.map(i => '<span class="chip">' + esc(i) + "</span>").join("") + "</div>";
const isExt = u => /^https?:/i.test(u || "");
const demoHref = (p, base) => !p.demoUrl ? null : isExt(p.demoUrl) ? p.demoUrl : base + p.demoUrl;
const projHref = (lang, slug) => (lang === "fr" ? "projets/" : "projects/") + slug + ".html";
const rm = d => { if (fs.existsSync(d)) fs.rmSync(d, { recursive: true, force: true }); };
const mk = d => fs.mkdirSync(d, { recursive: true });
const write = (rel, html) => { const f = path.join(OUT, rel); mk(path.dirname(f)); fs.writeFileSync(f, html); console.log("wrote " + rel + " (" + Buffer.byteLength(html) + " bytes)"); };
const copyDir = (src, dst) => { mk(dst); for (const f of fs.readdirSync(src)) { const s = path.join(src, f), d = path.join(dst, f); fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d); } };

function waIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 0 16.4 8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 2-1.4.2-.7.2-1.2.1-1.4l-.5-.3-2-1c-.3 0-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1a6.8 6.8 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.5v-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.2z"/></svg>';
}

function onLabel(p, lang) {
  const P = t(lang).projects;
  if (!p.demoUrl) return p.status === "client" ? P.privateApp : P.demoOff;
  return p.status === "client" ? P.siteOn : P.demoOn;
}

function mockup(p, x, base) {
  const ext = p.shotExt || "png";
  return '<div class="shot" style="--pc:' + esc(p.color || "#1D3EB5") + '">' +
    '<div class="browser"><div class="bar"><i></i><i></i><i></i><span>' + esc(p.domain || p.slug) + '</span></div>' +
    '<img src="' + base + 'shots/' + esc(p.slug) + '-desktop.' + ext + '" alt="' + esc(x.title) + '" loading="lazy" width="1280" height="800"></div>' +
    '<div class="phone"><img src="' + base + 'shots/' + esc(p.slug) + '-mobile.' + ext + '" alt="" loading="lazy" width="430" height="900"></div>' +
    "</div>";
}

function projectCard(p, i, arr, lang, base) {
  const P = t(lang).projects, x = p[lang], on = !!p.demoUrl;
  const wide = (i === arr.length - 1) && (arr.length % 2 === 1);
  const cardHref = base + (lang === "fr" ? "" : "en/") + projHref(lang, p.slug);
  return '<a class="card showcase' + (wide ? " wide" : "") + '" href="' + cardHref + '" style="--pc:' + esc(p.color || "#1D3EB5") + '">' +
    mockup(p, x, base) +
    '<div class="card-body">' +
    '<div class="card-top"><p class="eyebrow">' + esc(x.sector.split(" · ")[0]) + "</p>" +
    '<span class="pill ' + (p.status === "client" ? "pill-client" : "pill-demo") + '">' + esc(p.status === "client" ? P.badgeClient : P.badgeDemo) + "</span></div>" +
    "<h3>" + esc(x.title) + "</h3><p>" + esc(x.tagline) + "</p>" + chips(p.stack.slice(0, 4)) +
    '<div class="card-foot"><span class="pill ' + (on ? "pill-ok" : "pill-prep") + '"><span class="dot"></span>' + esc(onLabel(p, lang)) + "</span>" +
    '<span class="open">' + esc(P.open) + " →</span></div></div></a>";
}

function diagram(lang) {
  const M = t(lang).method, d = M.d;
  const box = (x, y, w, h, title, sub, accent) =>
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="var(--surface)" stroke="' + (accent ? "var(--cobalt)" : "currentColor") + '" stroke-width="1.2"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 - 4) + '" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">' + esc(title) + "</text>" +
    '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 13) + '" text-anchor="middle" font-size="11" fill="var(--ink-3)">' + esc(sub) + "</text>";
  const label = (x, y, txt, anchor) => '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || "middle") + '" font-size="11" fill="var(--ink-2)">' + esc(txt) + "</text>";
  const svg = '<svg viewBox="0 0 980 420" role="img" aria-label="' + esc(M.diagramAria) + '" style="font-family: var(--font-body)"><defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +
    '<rect x="420" y="60" width="330" height="330" rx="6" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.4" stroke-dasharray="6 4"/>' +
    '<text x="585" y="84" text-anchor="middle" font-size="12" font-weight="600" fill="var(--cobalt)">' + esc(d.zone) + "</text>" +
    box(20, 190, 160, 70, d.user, d.userSub) + box(230, 190, 150, 70, d.cf, d.cfSub) + box(460, 130, 250, 70, d.app, d.appSub, true) + box(460, 280, 250, 70, d.db, d.dbSub, true) + box(790, 280, 170, 70, d.aws, d.awsSub) + box(790, 130, 170, 70, d.mon, d.monSub) + box(790, 20, 170, 60, d.team, d.teamSub) +
    '<line x1="180" y1="225" x2="228" y2="225" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)"/>' + label(204, 215, d.aHttps) +
    '<path d="M380 225 L420 225 L420 165 L458 165" fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)"/>' + label(400, 215, d.aReq) +
    '<line x1="585" y1="200" x2="585" y2="278" stroke="currentColor" stroke-width="1.2" marker-start="url(#arr)" marker-end="url(#arr)"/>' + label(595, 244, d.aRw, "start") +
    '<line x1="710" y1="315" x2="788" y2="315" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#arr)"/>' + label(749, 372, d.aBackup) +
    '<line x1="790" y1="165" x2="712" y2="165" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#arr)"/>' + label(750, 118, d.aProbe) +
    '<line x1="875" y1="130" x2="875" y2="82" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)"/>' + label(882, 110, d.aAlert, "start") + "</svg>";
  return '<figure class="diagram"><div class="frame">' + svg + "</div><figcaption>" + esc(M.diagramCaption) + "</figcaption></figure>";
}

function statusRows(lang) {
  const L = t(lang).live;
  let rows = '<div class="status-row"><span>' + esc(L.thisSite) + '<span class="sub">' + esc(L.viewing) + '</span></span><span class="pill pill-ok"><span class="dot"></span>' + esc(L.online) + "</span></div>";
  D.projects.forEach(p => {
    const on = !!p.demoUrl;
    rows += '<div class="status-row"><span>' + esc(p[lang].title) + (p.status === "client" ? '<span class="sub">' + esc(t(lang).projects.badgeClient) + "</span>" : "") + "</span>" +
      '<span class="pill ' + (on ? "pill-ok" : "pill-prep") + '"><span class="dot"></span>' + esc(on ? L.online : L.preparing) + "</span></div>";
  });
  return rows;
}

function liveCard(lang) {
  const L = t(lang).live;
  return '<aside class="live" aria-label="' + esc(L.title) + '"><div class="live-title">' + esc(L.title) + "</div>" +
    '<div class="live-metrics"><div class="metric"><span class="metric-label">' + esc(L.load) + '</span><span class="metric-value" id="m-ms" data-unit="' + esc(L.msUnit) + '">…<small>' + esc(L.msUnit) + "</small></span></div>" +
    '<div class="metric"><span class="metric-label">' + esc(L.weight) + '</span><span class="metric-value" id="m-kb" data-unit="' + esc(L.kbUnit) + '">…<small>' + esc(L.kbUnit) + "</small></span></div></div>" +
    '<div class="live-title">' + esc(L.statusTitle) + '</div><div class="status-list">' + statusRows(lang) + "</div>" +
    '<div class="live-note">' + esc(L.note) + "</div></aside>";
}

function homeBody(lang, base) {
  const T = t(lang), H = T.hero, P = T.proofs, S = T.services, R = T.projects, M = T.method, K = T.compliance, G = T.pricing, A = T.about, N = T.contact;
  let h = '<section class="section hero" id="top"><div class="wrap hero-grid"><div>' +
    '<p class="eyebrow">' + esc(H.eyebrow) + "</p><h1>" + esc(H.title) + '</h1><p class="lead measure">' + esc(H.lead) + "</p>" +
    '<div class="cta-row"><a class="btn btn-primary" href="#projets">' + esc(H.cta1) + '</a><a class="btn btn-wa" href="' + esc(wa(T.waMessage)) + '" target="_blank" rel="noopener">' + waIcon() + esc(H.cta2) + "</a></div></div>" +
    liveCard(lang) + "</div>" +
    '<div class="wrap"><div class="deadline"><span class="date">' + esc(T.deadline.date) + "</span><p>" + esc(T.deadline.text) + "</p></div></div></section>";
  h += '<section class="section" id="preuves"><div class="wrap"><div class="section-head"><p class="eyebrow">' + esc(P.eyebrow) + "</p><h2>" + esc(P.title) + '</h2><p class="lead measure">' + esc(P.lead) + "</p></div>" +
    '<div class="grid-4">' + P.items.map(i => '<div class="proof"><h3>' + esc(i.t) + "</h3><p>" + esc(i.d) + "</p></div>").join("") + "</div></div></section>";
  h += '<section class="section" id="services"><div class="wrap"><div class="section-head"><p class="eyebrow">' + esc(S.eyebrow) + "</p><h2>" + esc(S.title) + '</h2><p class="lead measure">' + esc(S.lead) + "</p></div>" +
    '<div class="grid-4">' + S.items.map(i => '<div class="service"><h3>' + esc(i.t) + "</h3><p>" + esc(i.d) + "</p>" + list(i.list) + "</div>").join("") + "</div></div></section>";
  h += '<section class="section" id="projets"><div class="wrap"><div class="section-head"><p class="eyebrow">' + esc(R.eyebrow) + "</p><h2>" + esc(R.title) + '</h2><p class="lead measure">' + esc(R.lead) + "</p></div>" +
    '<div class="showcase-grid">' + D.projects.map((p, i, arr) => projectCard(p, i, arr, lang, base)).join("") + "</div></div></section>";
  h += '<section class="section" id="methode"><div class="wrap"><div class="section-head"><p class="eyebrow">' + esc(M.eyebrow) + "</p><h2>" + esc(M.title) + '</h2><p class="lead measure">' + esc(M.lead) + "</p></div>" +
    '<ol class="steps">' + M.steps.map(s => "<li><h3>" + esc(s.t) + '</h3><span class="when">' + esc(s.when) + "</span><p>" + esc(s.d) + "</p></li>").join("") + "</ol>" + diagram(lang) + "</div></section>";
  h += '<section class="section" id="conformite"><div class="wrap"><div class="section-head"><p class="eyebrow">' + esc(K.eyebrow) + "</p><h2>" + esc(K.title) + '</h2><p class="lead measure">' + esc(K.lead) + "</p></div>" +
    '<div class="grid-2"><ul class="checklist">' + K.items.map(i => "<li><div><strong>" + esc(i.t) + "</strong><span>" + esc(i.d) + "</span></div></li>").join("") + "</ul>" +
    '<div class="aside-box"><h3>' + esc(K.asideTitle) + "</h3><p>" + esc(K.aside) + "</p></div></div></div></section>";
  h += '<section class="section" id="tarifs"><div class="wrap"><div class="section-head"><p class="eyebrow">' + esc(G.eyebrow) + "</p><h2>" + esc(G.title) + '</h2><p class="lead measure">' + esc(G.lead) + "</p></div>" +
    '<div class="table-wrap"><table class="pricing"><thead><tr><th>' + esc(G.h.pack) + "</th><th>" + esc(G.h.what) + "</th><th>" + esc(G.h.price) + "</th><th>" + esc(G.h.monthly) + "</th></tr></thead><tbody>" +
    G.rows.map(r => '<tr><td class="name">' + esc(r.n) + '</td><td class="desc">' + esc(r.d) + '</td><td class="num">' + esc(r.p) + '</td><td class="num">' + esc(r.m) + "</td></tr>").join("") +
    '</tbody></table></div><p class="pricing-note">' + esc(G.note) + "</p></div></section>";
  h += '<section class="section" id="contact"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(A.eyebrow) + "</p><h2>" + esc(A.title) + '</h2><p class="lead measure" style="margin-top:1rem">' + esc(A.text) + "</p>" +
    '<div class="founder" style="margin-top:1.4rem"><div class="avatar" aria-hidden="true">' + esc(C.founder.split(" ").map(w => w.charAt(0)).join("")) + "</div><div><strong>" + esc(C.founder) + "</strong><small>" + esc(A.founderRole) + "</small></div></div></div>" +
    '<div><p class="eyebrow">' + esc(N.eyebrow) + "</p><h2>" + esc(N.title) + '</h2><p class="lead" style="margin-top:1rem">' + esc(N.lead) + "</p>" +
    '<div class="cta-row"><a class="btn btn-wa" href="' + esc(wa(T.waMessage)) + '" target="_blank" rel="noopener">' + waIcon() + esc(T.whatsapp) + "</a></div>" +
    '<div class="contact-lines" style="margin-top:1.2rem"><div><strong>' + esc(N.emailLabel) + '</strong> · <a class="mono" href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></div>" +
    "<div><strong>" + esc(N.cityLabel) + '</strong> · <span class="mono">' + esc(C.location[lang]) + "</span></div></div>" +
    '<form class="contact-form" id="contact-form" style="margin-top:1.4rem" data-email="' + esc(C.email) + '" data-lang="' + lang + '">' +
    '<div class="field"><label for="f-name">' + esc(N.form.name) + '</label><input id="f-name" name="name" type="text" autocomplete="name"></div>' +
    '<div class="field"><label for="f-company">' + esc(N.form.company) + '</label><input id="f-company" name="company" type="text" autocomplete="organization"></div>' +
    '<div class="field"><label for="f-need">' + esc(N.form.need) + '</label><textarea id="f-need" name="need" placeholder="' + esc(N.form.needPh) + '"></textarea></div>' +
    '<div><button class="btn btn-primary" type="submit" id="f-send">' + esc(N.form.send) + '</button></div><p class="hint" style="font-size:.82rem;color:var(--ink-3)">' + esc(N.form.hint) + "</p></form></div></div></section>";
  return h;
}

function projectBody(p, lang, base) {
  const T = t(lang), J = T.project, R = T.projects, x = p[lang], on = !!p.demoUrl, isClient = p.status === "client";
  const askMsg = (lang === "fr" ? "Bonjour IK Digital Solutions, je souhaite une démo guidée de « " : "Hello IK Digital Solutions, I would like a guided demo of \"") + x.title + (lang === "fr" ? " »." : "\".");
  const block = (label, inner) => '<div class="pblock"><p class="eyebrow">' + esc(label) + "</p>" + inner + "</div>";
  const homeHref = (lang === "fr" ? base : base + "en/") + "index.html";
  return '<div class="wrap project-head"><a class="back" href="' + homeHref + '#projets">← ' + esc(J.back) + "</a>" +
    '<div class="row"><span class="pill ' + (isClient ? "pill-client" : "pill-demo") + '">' + esc(isClient ? R.badgeClient : R.badgeDemo) + "</span>" +
    '<span class="pill ' + (on ? "pill-ok" : "pill-prep") + '"><span class="dot"></span>' + esc(onLabel(p, lang)) + "</span></div>" +
    "<h1>" + esc(x.title) + '</h1><p class="lead measure">' + esc(x.tagline) + "</p></div>" +
    '<div class="wrap"><div class="gallery">' + mockup(p, x, base) + "</div></div>" +
    '<div class="wrap project-grid"><aside class="spec"><dl>' +
    '<div class="kv"><dt>' + esc(J.status) + "</dt><dd>" + esc(isClient ? R.badgeClient : R.badgeDemo) + "</dd></div>" +
    '<div class="kv"><dt>' + esc(J.sector) + "</dt><dd>" + esc(x.sector) + "</dd></div>" +
    '<div class="kv"><dt>' + esc(J.timeline) + '</dt><dd class="mono">' + esc(p.timeline[lang]) + "</dd></div>" +
    '<div class="kv"><dt>' + esc(J.price) + '</dt><dd class="mono">' + esc(p.price[lang]) + "</dd></div>" +
    '<div class="kv"><dt>' + esc(J.monthly) + '</dt><dd class="mono">' + esc(p.monthly[lang]) + "</dd></div></dl>" +
    '<div class="actions">' +
    (on ? '<a class="btn btn-primary" href="' + esc(demoHref(p, base)) + '"' + (isExt(p.demoUrl) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(p.openLabel ? p.openLabel[lang] : (isClient ? J.openSite : J.openDemo)) + (isExt(p.demoUrl) ? " ↗" : " →") + "</a>" : "") +
    (p.liveUrl ? '<a class="btn btn-outline" href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener">' + esc(J.liveLink) + " ↗</a>" : "") +
    (isClient ? "" : '<a class="btn btn-wa" href="' + esc(wa(askMsg)) + '" target="_blank" rel="noopener">' + waIcon() + esc(J.askDemo) + "</a>") +
    (on || isClient ? "" : '<p class="hint">' + esc(J.demoHint) + "</p>") +
    (p.note ? '<p class="hint">' + esc(p.note[lang]) + "</p>" : "") +
    "</div></aside><div>" +
    '<div class="pblock"><div class="transparency">' + (isClient ? "" : "<strong>" + esc(R.badgeDemo) + ".</strong> ") + esc(isClient ? J.transparencyClient : J.transparency) + "</div></div>" +
    block(J.s1, "<h2>" + esc(x.sector) + "</h2>" + x.problem.map(s => "<p>" + esc(s) + "</p>").join("")) +
    block(J.s2, list(x.built)) + block(p.s3Label ? p.s3Label[lang] : J.s3, list(x.congo)) + block(J.s4, list(x.deploy)) + block(J.s5, list(x.monitor)) +
    block(J.s6, '<p class="mono">' + esc(p.timeline[lang]) + " · " + esc(p.price[lang]) + " · " + esc(p.monthly[lang]) + "</p>") +
    block(J.stack, chips(p.stack)) + "</div></div>";
}

function layout(o) {
  const T = t(o.lang);
  const navHome = (o.lang === "fr" ? o.base : o.base + "en/") + "index.html";
  const nav = ["services", "projets", "methode", "conformite", "tarifs", "contact"].map(k => '<a href="' + navHome + "#" + k + '">' + esc(T.nav[k]) + "</a>").join("");
  const desc = o.description || (o.lang === "fr" ? "Studio de développement basé à Washington, au service des entreprises congolaises : sites web, applications métier et paiement mobile money, déployés et supervisés sur des serveurs en RDC." : "Washington-based software studio serving Congolese businesses: websites, business applications and mobile money payments, deployed and monitored on servers in the DRC.");
  return '<!doctype html>\n<html lang="' + o.lang + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + esc(o.title) + '</title>\n<meta name="description" content="' + esc(desc) + '">\n' +
    (SITE_URL ? '<link rel="canonical" href="' + SITE_URL + o.path + '">\n<link rel="alternate" hreflang="' + o.lang + '" href="' + SITE_URL + o.path + '">\n<link rel="alternate" hreflang="' + (o.lang === "fr" ? "en" : "fr") + '" href="' + SITE_URL + o.altPath + '">\n' : "") +
    '<meta property="og:title" content="' + esc(o.title) + '">\n<meta property="og:description" content="' + esc(desc) + '">\n' + (o.image ? '<meta property="og:image" content="' + (SITE_URL || "") + o.image + '">\n' : "") +
    '<link rel="icon" href="' + o.base + 'assets/favicon.svg" type="image/svg+xml">\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">\n' +
    '<link rel="stylesheet" href="' + o.base + 'assets/style.css">\n</head>\n<body>\n' +
    '<a class="skip" href="#main">' + (o.lang === "fr" ? "Aller au contenu" : "Skip to content") + '</a>\n<header class="site-header"><div class="wrap header-row">' +
    '<a class="brand" href="' + navHome + '" aria-label="' + esc(C.company) + '"><span class="brand-name">' + esc(C.brand) + '</span><span class="brand-sub">' + esc(C.brandSub) + "</span></a>" +
    '<nav class="nav" aria-label="' + (o.lang === "fr" ? "Navigation principale" : "Main navigation") + '">' + nav + "</nav>" +
    '<div class="header-tools"><div class="lang" role="group" aria-label="Langue / Language"><a href="' + o.frHref + '" aria-current="' + (o.lang === "fr") + '" lang="fr">FR</a><a href="' + o.enHref + '" aria-current="' + (o.lang === "en") + '" lang="en">EN</a></div>' +
    '<a class="btn btn-wa" href="' + esc(wa(T.waMessage)) + '" target="_blank" rel="noopener">' + waIcon() + esc(T.whatsapp) + "</a></div></div></header>\n" +
    '<main id="main">\n' + o.body + "\n</main>\n" +
    '<footer class="site-footer"><div class="wrap footer-row"><div>© ' + new Date().getFullYear() + " " + esc(C.company) + ". " + esc(T.footer.rights) + "<br>" + esc(C.location[o.lang]) + " · " + esc(C.email) + "</div>" +
    "<div>" + esc(T.footer.made) + ' · <a href="' + navHome + '#conformite">' + esc(T.footer.legal) + "</a></div></div></footer>\n" +
    '<script src="' + o.base + 'assets/site.js" defer></script>\n</body>\n</html>\n';
}

function wrapDemo(src) {
  const frag = fs.readFileSync(src, "utf8");
  const i = frag.indexOf("<!-- /head -->");
  const head = i > -1 ? frag.slice(0, i) : "", body = i > -1 ? frag.slice(i + "<!-- /head -->".length) : frag;
  return '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' + head.trim() + "\n</head>\n<body>\n" + body.trim() + "\n</body>\n</html>\n";
}

/* ---------- build ---------- */
rm(OUT); mk(OUT);
copyDir(path.join(__dirname, "shots"), path.join(OUT, "shots"));
mk(path.join(OUT, "assets"));
fs.copyFileSync(path.join(__dirname, "assets", "style.css"), path.join(OUT, "assets", "style.css"));
fs.copyFileSync(path.join(__dirname, "assets", "site.js"), path.join(OUT, "assets", "site.js"));
fs.copyFileSync(path.join(__dirname, "assets", "favicon.svg"), path.join(OUT, "assets", "favicon.svg"));
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
const argCname = process.argv.indexOf("--cname");
if (argCname > -1) { fs.writeFileSync(path.join(OUT, "CNAME"), process.argv[argCname + 1].trim() + "\n"); console.log("wrote CNAME " + process.argv[argCname + 1]); }

const pages = [];
const home = { fr: "index.html", en: "en/index.html" };
for (const lang of ["fr", "en"]) {
  const base = lang === "fr" ? "" : "../";
  const html = layout({ lang, base, title: C.company, path: home[lang], altPath: home[lang === "fr" ? "en" : "fr"], frHref: base + "index.html", enHref: base + "en/index.html", image: "shots/genos-rentals-desktop.png", body: homeBody(lang, base) });
  write(home[lang], html); pages.push(home[lang]);
  for (const p of D.projects) {
    const rel = (lang === "fr" ? "projets/" : "en/projects/") + p.slug + ".html";
    const pbase = lang === "fr" ? "../" : "../../";
    const alt = (lang === "fr" ? "en/projects/" : "projets/") + p.slug + ".html";
    const x = p[lang];
    const ph = layout({ lang, base: pbase, title: x.title + " · " + C.company, description: x.tagline, path: rel, altPath: alt, frHref: pbase + "projets/" + p.slug + ".html", enHref: pbase + "en/projects/" + p.slug + ".html", image: "shots/" + p.slug + "-desktop." + (p.shotExt || "png"), body: projectBody(p, lang, pbase) });
    write(rel, ph); pages.push(rel);
  }
}
for (const f of fs.readdirSync(path.join(__dirname, "demos", "src"))) {
  if (!f.endsWith(".html")) continue;
  const slug = f.replace(/\.html$/, "");
  write("demos/" + slug + "/index.html", wrapDemo(path.join(__dirname, "demos", "src", f)));
  pages.push("demos/" + slug + "/");
}
write("404.html", layout({ lang: "fr", base: "/", title: "Page introuvable · " + C.company, path: "404.html", altPath: "404.html", frHref: "/index.html", enHref: "/en/index.html", body: '<section class="section"><div class="wrap"><p class="eyebrow">404</p><h1>Page introuvable</h1><p class="lead">Cette adresse n\'existe pas. <a href="/index.html">Retour à l\'accueil</a>.</p></div></section>' }).replace(/href="\/(assets|index|en\/)/g, 'href="' + (SITE_URL || "/") + "$1").replace(/src="\/assets/g, 'src="' + (SITE_URL || "/") + "assets"));
if (SITE_URL) {
  write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(u => "  <url><loc>" + SITE_URL + u + "</loc></url>").join("\n") + "\n</urlset>\n");
  write("robots.txt", "User-agent: *\nAllow: /\nSitemap: " + SITE_URL + "sitemap.xml\n");
} else {
  write("robots.txt", "User-agent: *\nAllow: /\n");
}
console.log("done: " + pages.length + " pages in docs/");

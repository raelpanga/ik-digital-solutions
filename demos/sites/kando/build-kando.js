/* Generates the Kando Ressources SA website (French + English, 16 pages) from content.js.
   Usage: node build-kando.js <outDir> [portfolioHomeHref]
   or require("./build-kando.js").build(outDir, { portfolioHome: "../../index.html" }) */
"use strict";
const fs = require("fs"), path = require("path");
const C = require("./content.js");

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const L = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) && (lang in v)) ? v[lang] : v;
const PAGES = ["about", "ops", "ir", "sust", "news", "careers", "contact"];
const FILES = {
  fr: { home: "index.html", about: "qui-sommes-nous.html", ops: "activites.html", ir: "investisseurs.html", sust: "durabilite.html", news: "actualites.html", careers: "carrieres.html", contact: "contact.html" },
  en: { home: "index.html", about: "who-we-are.html", ops: "what-we-do.html", ir: "investors.html", sust: "sustainability.html", news: "news.html", careers: "careers.html", contact: "contact.html" }
};
const fmtDate = (iso, lang) => new Date(iso + "T00:00:00").toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

function href(lang, key, base) { return base + (lang === "en" ? "en/" : "") + FILES[lang][key]; }

function layout(lang, key, o) {
  const U = C.ui[lang], base = lang === "en" ? "../" : "", other = lang === "fr" ? "en" : "fr";
  const nav = PAGES.map((k, i) => '<a href="' + href(lang, k, base) + '"' + (k === key ? ' aria-current="page"' : "") + ">" + esc(U.nav[i][1]) + "</a>").join("");
  const fcol = (title, labels, keys) => "<div><h4>" + esc(title) + "</h4><ul>" + labels.map((l, i) => '<li><a href="' + keys[i] + '">' + esc(l) + "</a></li>").join("") + "</ul></div>";
  const fkeys = [
    [href(lang, "about", base), href(lang, "ops", base), href(lang, "careers", base), href(lang, "contact", base)],
    [href(lang, "ir", base), href(lang, "ir", base) + "#docs", href(lang, "ir", base) + "#itie", href(lang, "sust", base) + "#plaintes"],
    [href(lang, "news", base), href(lang, "contact", base), href(lang, "ir", base) + "#docs", href(lang, "careers", base) + "#local"]
  ];
  const credits = C.credits.map(c => '<a href="' + c[3] + '" rel="noopener">' + esc(c[0]) + "</a> · " + esc(c[1]) + " (" + esc(c[2]) + ")").join(" ; ");
  return '<!doctype html>\n<html lang="' + lang + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + esc(o.title) + '</title>\n<meta name="description" content="' + esc(o.description) + '">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">\n' +
    '<link rel="stylesheet" href="' + base + 'style.css">\n</head>\n<body>\n' +
    '<a class="skip" href="#main">' + (lang === "fr" ? "Aller au contenu" : "Skip to content") + "</a>\n" +
    '<div class="ikbar"><span><strong>' + esc(U.demoBar.split(" · ")[0]) + "</strong> · " + esc(U.demoBar.split(" · ").slice(1).join(" · ")) + '</span><a href="' + base + o.portfolioHome + '">' + esc(U.back) + "</a></div>\n" +
    '<div class="util"><div class="wrap"><span>' + esc(U.util.green) + ' · <a href="tel:' + C.company.green.replace(/\s/g, "") + '">' + esc(C.company.green) + '</a></span><span style="display:flex;gap:1.2rem;align-items:center"><a href="' + href(lang, "ir", base) + '">' + esc(U.util.ir) + '</a><a href="' + href(lang, "careers", base) + '">' + esc(U.util.careers) + '</a><span class="lang"><a href="' + (lang === "fr" ? "" : "../") + FILES.fr[key] + '" aria-current="' + (lang === "fr") + '" lang="fr">FR</a><a href="' + (lang === "fr" ? "en/" : "") + FILES.en[key] + '" aria-current="' + (lang === "en") + '" lang="en">EN</a></span></span></div></div>\n' +
    '<header class="site-header"><div class="wrap"><a class="brand" href="' + href(lang, "home", base) + '"><span class="mark" aria-hidden="true"></span><span><b>' + esc(C.company.name) + "</b><small>" + esc(C.company.tagline[lang]) + '</small></span></a><button class="navtoggle" id="navtoggle" aria-expanded="false" aria-controls="nav">' + esc(U.menu) + '</button><nav class="nav" id="nav" aria-label="' + (lang === "fr" ? "Navigation principale" : "Main navigation") + '">' + nav + "</nav></div></header>\n" +
    '<main id="main">\n' + o.body + "\n</main>\n" +
    '<footer><div class="wrap"><div class="fgrid"><div><a class="brand" href="' + href(lang, "home", base) + '" style="color:#fff"><span class="mark" aria-hidden="true"></span><span><b>' + esc(C.company.name) + "</b><small style=\"color:#A9AEB6\">" + esc(C.company.tagline[lang]) + '</small></span></a><p style="margin-top:1rem">' + esc(U.footer.about) + "</p><p>" + esc(C.company.hq[lang]) + "<br>" + esc(C.company.phone) + " · " + esc(C.company.email) + "</p></div>" +
    U.footer.cols.map((c, i) => fcol(c[0], c[1], fkeys[i])).join("") + "</div>" +
    '<div class="fbottom"><span>' + esc(U.footer.legal) + "</span><span>" + esc(U.footer.by) + ' <a href="' + base + o.portfolioHome + '">IK Digital Solutions</a></span></div>' +
    '<p class="credits">' + esc(U.footer.photos) + " " + credits + ".</p></div></footer>\n" +
    '<div id="modal"></div>\n<script src="' + base + 'site.js" defer></script>\n</body>\n</html>\n';
}

/* ---------- pieces ---------- */
const hero = (img, h1, lead, ctas, base, short, credit) =>
  '<section class="hero' + (short ? " short" : "") + '"><img class="bg" src="' + base + "img/" + img + '" alt=""><div class="wrap"><h1>' + esc(h1) + "</h1>" + (lead ? '<p class="lead">' + esc(lead) + "</p>" : "") + (ctas ? '<div class="cta">' + ctas + "</div>" : "") + "</div>" + (credit ? '<span class="credit">' + esc(credit) + "</span>" : "") + "</section>";
const factsStrip = lang => '<div class="facts"><div class="wrap">' + C.facts.map(f => "<div><b>" + esc(f.v) + "</b><span>" + esc(f[lang]) + "</span></div>").join("") + "</div></div>";
const opsCards = (lang, base, more) => '<div class="grid-3">' + C.operations.map(o => '<article class="card"><div class="pic"><img src="' + base + "img/" + o.img + '" alt="" loading="lazy"></div><div class="body"><span class="meta">' + esc(o.sub[lang]) + "</span><h3>" + esc(o.t[lang]) + "</h3><p>" + esc(o.d[lang]) + '</p><a class="more" href="' + href(lang, "ops", base) + "#" + o.key + '">' + esc(more) + " →</a></div></article>").join("") + "</div>";
const docList = (lang, items, label) => '<ul class="docs">' + items.map(d => "<li><span>" + esc(d.t[lang]) + "<small>" + esc(d.m) + '</small></span><a class="btn btn-ghost btn-small" href="#" data-doc="' + esc(d.t[lang]) + '">' + esc(label) + "</a></li>").join("") + "</ul>";
const newsItem = (n, lang) => '<li data-cat="' + esc(n.cat[lang]) + '" data-year="' + n.d.slice(0, 4) + '"><details><summary><span class="d">' + esc(fmtDate(n.d, lang)) + '</span><span class="t">' + esc(n.t[lang]) + '</span><span class="c">' + esc(n.cat[lang]) + '</span></summary><div class="body">' + n.b[lang].map(p => "<p>" + esc(p) + "</p>").join("") + "</div></details></li>";
const kpiRow = (lang, items) => '<div class="kpi-row">' + items.map(k => "<div class=\"kpi\"><b>" + esc(k.v) + "</b><span>" + esc(k[lang]) + "</span></div>").join("") + "</div>";
const note = t => '<p class="note">' + esc(t) + "</p>";
const eyebrowHead = (eyebrow, title, lead, row) => '<div class="section-head' + (row ? " row" : "") + '"><div>' + (eyebrow ? '<p class="eyebrow">' + esc(eyebrow) + "</p>" : "") + "<h2>" + esc(title) + "</h2>" + (lead ? '<p class="lead">' + esc(lead) + "</p>" : "") + "</div>" + (row || "") + "</div>";

/* ---------- pages ---------- */
function home(lang, base) {
  const U = C.ui[lang], H = U.home;
  const latest = C.news.slice(0, 3);
  return hero("kov.jpg", H.h1, H.lead, '<a class="btn btn-primary" href="' + href(lang, "ops", base) + '">' + esc(H.cta1) + '</a><a class="btn btn-outline light" href="' + href(lang, "sust", base) + '#docs">' + esc(H.cta2) + "</a>", base, false, "KOV, Kolwezi · Martin Tuchscherer, CC BY-SA 3.0") +
    factsStrip(lang) +
    '<section><div class="wrap">' + eyebrowHead(H.opsEyebrow, H.opsTitle, H.opsLead) + opsCards(lang, base, H.opsMore) + "</div></section>" +
    '<section class="dark"><div class="wrap">' + eyebrowHead(H.sustEyebrow, H.sustTitle, H.sustLead) + '<div class="grid-4">' + C.kpis.slice(0, 4).map(k => '<div><b class="mono" style="font-size:2.2rem;display:block;font-weight:500">' + esc(k.v) + '</b><span style="color:#C9CDD3;font-size:.9rem">' + esc(k[lang]) + "</span></div>").join("") + '</div><p style="margin-top:2rem"><a class="btn btn-outline light" href="' + href(lang, "sust", base) + '">' + esc(H.sustMore) + "</a></p>" + note(U.illustrative).replace('class="note"', 'class="note" style="color:#8B9199"') + "</div></section>" +
    '<section><div class="wrap">' + eyebrowHead(H.newsEyebrow, H.newsTitle, null, '<a class="btn btn-ghost" href="' + href(lang, "news", base) + '">' + esc(H.newsMore) + "</a>") + '<ul class="news" id="news-list">' + latest.map(n => newsItem(n, lang)).join("") + "</ul></div></section>" +
    '<section class="alt"><div class="wrap grid-2"><div>' + eyebrowHead(H.irEyebrow, H.irTitle, H.irLead) + docList(lang, C.docs.slice(0, 4), U.common.download) + '<p style="margin-top:1.4rem"><a class="btn btn-dark" href="' + href(lang, "ir", base) + '">' + esc(H.irMore) + '</a></p></div><div><p class="eyebrow">' + esc(U.ir.calT) + '</p><ul class="timeline">' + C.calendar.map(c => '<li><span class="y">' + esc(fmtDate(c.d, lang)) + "</span><p>" + esc(c[lang]) + "</p></li>").join("") + "</ul></div></div></section>" +
    '<section><div class="wrap grid-2"><div class="card" style="border:0;background:transparent"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/school.jpg" alt="" loading="lazy"></div></div><div><p class="eyebrow">' + esc(U.sust.commT) + "</p><h2>" + esc(H.communityTitle) + '</h2><p class="lead" style="margin-top:1rem">' + esc(H.communityLead) + '</p><p style="margin-top:1.4rem"><a class="btn btn-primary" href="' + href(lang, "sust", base) + '#communautes">' + esc(H.communityMore) + "</a></p></div></div></section>";
}

function about(lang, base) {
  const U = C.ui[lang], A = U.about;
  return hero("kolwezi1973.jpg", A.h1, A.lead, null, base, true, "Kolwezi, 1973 · Anefo, CC0") +
    '<section><div class="wrap grid-2"><div><p class="eyebrow">' + esc(A.missionT) + '</p><h2>' + esc(A.mission) + '</h2></div><div><p class="eyebrow">' + esc(A.valuesT) + '</p><div class="grid-2" style="gap:1.4rem">' + A.values.map(v => '<div class="card plain"><div class="body"><h3>' + esc(v[0]) + "</h3><p>" + esc(v[1]) + "</p></div></div>").join("") + "</div></div></div></section>" +
    '<section class="alt"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(A.historyT) + '</p><ul class="timeline">' + C.timeline.map(t => '<li><span class="y">' + t.y + "</span><p>" + esc(t[lang]) + "</p></li>").join("") + '</ul></div><div><div class="card" style="border:0;background:transparent"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/refinery.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Raffinerie de cuivre de Shituru, près de Likasi (archives Gécamines, domaine public). Photo d'illustration." : "Shituru copper refinery near Likasi (Gécamines archives, public domain). Illustrative photo.") + "</p></div></div></section>" +
    '<section><div class="wrap">' + eyebrowHead(null, A.leadersT) + '<div class="people">' + C.leaders.map(p => '<div class="person"><span class="init">' + esc(p.n.split(" ").map(w => w[0]).slice(0, 2).join("")) + "</span><b>" + esc(p.n) + "</b><span>" + esc(p.r[lang]) + "</span><p>" + esc(p.b[lang]) + "</p></div>").join("") + "</div></div></section>" +
    '<section class="alt"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(A.boardT) + '</p><ul class="docs">' + C.board.map(b => "<li><span><b>" + esc(b.n) + "</b><small>" + esc(b.r[lang]) + "</small></span></li>").join("") + '</ul></div><div><p class="eyebrow">' + esc(A.govT) + '</p><p class="lead">' + esc(A.gov) + '</p><div style="margin-top:1.4rem">' + docList(lang, C.docs.slice(6, 8), U.common.download) + "</div></div></div></section>";
}

function ops(lang, base) {
  const U = C.ui[lang], O = U.ops;
  const site = o => '<article class="card" id="' + o.key + '"><div class="pic"><img src="' + base + "img/" + o.img + '" alt="" loading="lazy"></div><div class="body"><span class="meta">' + esc(o.sub[lang]) + "</span><h3>" + esc(o.t[lang]) + "</h3><p>" + esc(o.d[lang]) + "</p></div></article>";
  const comm = c => '<div class="commodity" id="' + c.key + '"><div class="pic"><img src="' + base + "img/" + c.img + '" alt="" loading="lazy"></div><div><h3 style="font-size:1.8rem">' + esc(c.t[lang]) + '</h3><p style="margin-top:.8rem;color:var(--ink-2)">' + esc(c.d[lang]) + "</p><dl>" + c.kv.map(k => "<div><dt>" + esc(L(k[0], lang)) + "</dt><dd>" + esc(L(k[1], lang)) + "</dd></div>").join("") + "</dl></div></div>";
  const map = '<div class="map"><svg viewBox="0 0 600 450" role="img" aria-label="' + esc(O.mapT) + '"><rect width="600" height="450" fill="#E2ECE7"/><path d="M40 300 C120 260 180 290 260 250 S420 210 560 240" fill="none" stroke="#9FB8A6" stroke-width="3"/><path d="M0 380 C100 360 200 400 320 370 S500 330 600 360" fill="none" stroke="#9FB8A6" stroke-width="2" stroke-dasharray="6 5"/><text x="470" y="352" font-family="IBM Plex Mono, monospace" font-size="11" fill="#5E6B64">N1</text>' +
    '<circle cx="420" cy="300" r="9" fill="#17191C"/><text x="436" y="305" font-family="Public Sans, sans-serif" font-size="14" font-weight="600" fill="#17191C">Kolwezi</text>' +
    '<circle cx="300" cy="200" r="11" fill="#9A4B1E"/><text x="318" y="196" font-family="Public Sans, sans-serif" font-size="14" font-weight="600" fill="#17191C">' + esc(C.operations[0].t[lang]) + '</text><text x="318" y="214" font-family="IBM Plex Mono, monospace" font-size="11" fill="#5E6B64">28 km</text>' +
    '<circle cx="330" cy="235" r="7" fill="#9A4B1E"/><text x="344" y="240" font-family="Public Sans, sans-serif" font-size="12" fill="#17191C">' + esc(C.operations[1].t[lang]) + '</text>' +
    '<circle cx="210" cy="150" r="8" fill="none" stroke="#9A4B1E" stroke-width="3" stroke-dasharray="4 3"/><text x="226" y="155" font-family="Public Sans, sans-serif" font-size="13" fill="#17191C">Kanzenze-Sud</text>' +
    '<line x1="420" y1="300" x2="300" y2="200" stroke="#9A4B1E" stroke-width="1.5" stroke-dasharray="3 4"/><text x="40" y="60" font-family="Newsreader, serif" font-size="22" fill="#2E5E4E">Lualaba</text><text x="40" y="80" font-family="IBM Plex Mono, monospace" font-size="11" fill="#5E6B64">' + (lang === "fr" ? "schéma, sans échelle" : "schematic, not to scale") + '</text></svg></div><div class="legend"><span><i style="background:#9A4B1E"></i>' + (lang === "fr" ? "Mine et usine" : "Mine and plant") + '</span><span><i style="background:none;border:2px dashed #9A4B1E;width:8px;height:8px"></i>' + (lang === "fr" ? "Exploration" : "Exploration") + '</span><span><i style="background:#17191C"></i>' + (lang === "fr" ? "Ville" : "Town") + "</span></div>";
  return hero("kov.jpg", O.h1, O.lead, null, base, true, "KOV, Kolwezi · Martin Tuchscherer, CC BY-SA 3.0") +
    '<section><div class="wrap">' + eyebrowHead(null, O.sitesT) + '<div class="grid-3">' + C.operations.map(site).join("") + "</div>" + note(U.illustrative) + "</div></section>" +
    '<section class="alt"><div class="wrap">' + eyebrowHead(null, O.commT) + C.commodities.map(comm).join("") + "</div></section>" +
    '<section><div class="wrap grid-2"><div>' + eyebrowHead(null, O.mapT, O.mapLead) + map + '</div><div><p class="eyebrow">' + esc(O.logisticsT) + '</p><p class="lead">' + esc(O.logistics) + '</p><p class="eyebrow" style="margin-top:2rem">' + esc(O.energyT) + '</p><p class="lead">' + esc(O.energy) + '</p><div class="card" style="border:0;background:transparent;margin-top:1.4rem"><div class="pic" style="aspect-ratio:16/9"><img src="' + base + 'img/solar.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Centrale solaire, photo d'illustration (Khi Solar One, Afrique du Sud)." : "Solar plant, illustrative photo (Khi Solar One, South Africa).") + "</p></div></div></section>";
}

function ir(lang, base) {
  const U = C.ui[lang], I = U.ir;
  return hero("cathode.jpg", I.h1, I.lead, null, base, true, "ChrisFountain, CC BY-SA 3.0") +
    '<section><div class="wrap">' + eyebrowHead(null, I.highlightsT) + kpiRow(lang, C.facts.map(f => ({ v: f.v, fr: f.fr, en: f.en }))) + note(U.illustrative) + "</div></section>" +
    '<section class="alt"><div class="wrap">' + eyebrowHead(null, I.prodT) + '<div class="table-wrap"><table><thead><tr><th>' + (lang === "fr" ? "Période" : "Period") + '</th><th class="num">' + (lang === "fr" ? "Minerai traité" : "Ore treated") + '</th><th class="num">' + (lang === "fr" ? "Cuivre cathode" : "Copper cathode") + '</th><th class="num">' + (lang === "fr" ? "Cobalt contenu" : "Contained cobalt") + '</th><th class="num">LTIFR</th></tr></thead><tbody>' + C.production.map(p => "<tr><td>" + esc(p.p[lang]) + '</td><td class="num">' + esc(p.ore) + '</td><td class="num">' + esc(p.cu) + '</td><td class="num">' + esc(p.co) + '</td><td class="num">' + esc(p.ltifr) + "</td></tr>").join("") + "</tbody></table></div>" + note(I.prodNote) + "</div></section>" +
    '<section id="docs"><div class="wrap grid-2"><div>' + eyebrowHead(null, I.docsT) + docList(lang, C.docs, U.common.download) + '</div><div><p class="eyebrow">' + esc(I.calT) + '</p><ul class="timeline">' + C.calendar.map(c => '<li><span class="y">' + esc(fmtDate(c.d, lang)) + "</span><p>" + esc(c[lang]) + "</p></li>").join("") + '</ul><div class="callout" style="margin-top:1.6rem"><h3>' + esc(I.shareT) + "</h3><p>" + esc(I.share) + "</p></div></div></div></section>" +
    '<section class="alt" id="itie"><div class="wrap">' + eyebrowHead(null, I.itieT) + '<div class="table-wrap"><table><thead><tr><th>' + (lang === "fr" ? "Année" : "Year") + '</th><th class="num">' + (lang === "fr" ? "Redevance minière" : "Mining royalty") + '</th><th class="num">' + (lang === "fr" ? "Impôt sur les bénéfices" : "Corporate income tax") + '</th><th class="num">' + (lang === "fr" ? "Droits de douane" : "Customs duties") + '</th><th class="num">' + (lang === "fr" ? "Taxes provinciales" : "Provincial taxes") + '</th><th class="num">Total</th></tr></thead><tbody>' + C.itie.map(r => "<tr><td>" + r.y + '</td><td class="num">' + r.roy + '</td><td class="num">' + r.tax + '</td><td class="num">' + r.cust + '</td><td class="num">' + r.prov + '</td><td class="num"><b>' + r.tot + "</b></td></tr>").join("") + "</tbody></table></div>" + note(I.itieNote) + "</div></section>" +
    '<section><div class="wrap grid-2"><div>' + eyebrowHead(null, I.contactT, I.contactLead) + '<form class="f" id="ir-form"><div class="frow"><label class="field">' + esc(I.form.name) + '<input required></label><label class="field">' + esc(I.form.org) + '<input></label></div><label class="field">' + esc(I.form.email) + '<input type="email" required></label><label class="field">' + esc(I.form.msg) + '<textarea required></textarea></label><div><button class="btn btn-primary" type="submit">' + esc(I.form.send) + '</button></div><div id="ir-out"></div></form></div><div><p class="eyebrow">' + esc(I.alertT) + '</p><form class="f" id="alert-form"><label class="field">' + esc(I.form.email) + '<input type="email" required></label><div><button class="btn btn-dark" type="submit">' + esc(I.alertBtn) + '</button></div><div id="alert-out"></div></form><p class="note">' + esc(C.company.ir) + "</p></div></div></section>";
}

function sust(lang, base) {
  const U = C.ui[lang], S = U.sust;
  return hero("school.jpg", S.h1, S.lead, '<a class="btn btn-primary" href="#plaintes">' + esc(U.common.grievanceCta) + '</a><a class="btn btn-outline light" href="#docs">' + esc(S.docsT) + "</a>", base, true, "MONUSCO Photos, CC BY-SA 2.0") +
    '<section><div class="wrap">' + eyebrowHead(null, S.kpiT) + kpiRow(lang, C.kpis.slice(0, 4)) + '<div style="height:1.2rem"></div>' + kpiRow(lang, C.kpis.slice(4, 8)) + '<div class="callout green" style="margin-top:1.6rem"><p>' + esc(S.frameworks) + "</p></div>" + note(U.illustrative) + "</div></section>" +
    '<section class="alt"><div class="wrap">' + eyebrowHead(null, S.envT) + '<div class="grid-4">' + S.env.map(e => '<div class="card plain"><div class="body"><h3>' + esc(e[0]) + "</h3><p>" + esc(e[1]) + "</p></div></div>").join("") + "</div></div></section>" +
    '<section id="communautes"><div class="wrap">' + eyebrowHead(null, S.commT, S.commLead) + '<div class="photo-band" style="margin-bottom:2rem"><figure><img src="' + base + 'img/school.jpg" alt="" loading="lazy"><figcaption>' + esc(C.programs[0].t[lang]) + '</figcaption></figure><figure><img src="' + base + 'img/solar.jpg" alt="" loading="lazy"><figcaption>' + esc(U.ops.energyT) + '</figcaption></figure><figure><img src="' + base + 'img/haul.jpg" alt="" loading="lazy"><figcaption>' + esc(U.careers.localT) + '</figcaption></figure></div><div class="grid-4">' + C.programs.map(p => '<div class="card"><div class="body"><h3>' + esc(p.t[lang]) + "</h3><p>" + esc(p.d[lang]) + "</p></div></div>").join("") + "</div></div></section>" +
    '<section class="alt"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(S.consultT) + '</p><p class="lead">' + esc(S.consult) + '</p></div><div><p class="eyebrow">' + esc(S.mineralsT) + '</p><p class="lead">' + esc(S.minerals) + "</p></div></div></section>" +
    '<section id="plaintes"><div class="wrap">' + eyebrowHead(null, S.grievT, S.grievLead) + '<div class="grid-2"><div><div class="grid-2" style="gap:1.2rem">' + S.grievSteps.map(s => '<div class="card plain"><div class="body"><h3 style="font-size:1.1rem">' + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></div></div>").join("") + '</div><div class="callout" style="margin-top:1.6rem"><h3>' + esc(U.contact.greenT) + '</h3><p><b class="mono">' + esc(C.company.green) + "</b> · WhatsApp " + esc(C.company.grievanceWa) + "</p><p>" + esc(U.contact.greenLead) + '</p></div></div><form class="f" id="grievance-form"><div class="frow"><label class="field">' + esc(S.form.name) + '<input></label><label class="field">' + esc(S.form.phone) + '<input></label></div><div class="frow"><label class="field">' + esc(S.form.place) + '<input required></label><label class="field">' + esc(S.form.type) + "<select>" + S.form.types.map(t => "<option>" + esc(t) + "</option>").join("") + '</select></label></div><label class="field">' + esc(S.form.msg) + '<textarea required></textarea></label><label class="check"><input type="checkbox"><span>' + esc(S.form.anon) + '</span></label><div><button class="btn btn-primary" type="submit">' + esc(S.form.send) + '</button></div><div id="grievance-out"></div></form></div></div></section>' +
    '<section class="alt" id="docs"><div class="wrap">' + eyebrowHead(null, S.docsT) + docList(lang, [C.docs[2], C.docs[4], C.docs[5], C.docs[6], C.docs[7]], U.common.download) + "</div></section>";
}

function news(lang, base) {
  const U = C.ui[lang], N = U.news;
  const cats = [...new Set(C.news.map(n => n.cat[lang]))], years = [...new Set(C.news.map(n => n.d.slice(0, 4)))];
  return hero("lubumbashi2.jpg", N.h1, N.lead, null, base, true, "Lubumbashi · T. Thielemans, CC BY 3.0") +
    '<section><div class="wrap"><div class="filters"><input id="news-q" type="search" placeholder="' + esc(N.search) + '" aria-label="' + esc(N.search) + '"><select id="news-cat" aria-label="' + esc(N.allCat) + '"><option value="">' + esc(N.allCat) + "</option>" + cats.map(c => '<option value="' + esc(c) + '">' + esc(c) + "</option>").join("") + '</select><select id="news-year" aria-label="' + esc(N.allYear) + '"><option value="">' + esc(N.allYear) + "</option>" + years.map(y => '<option value="' + y + '">' + y + "</option>").join("") + '</select></div><ul class="news" id="news-list">' + C.news.map(n => newsItem(n, lang)).join("") + '</ul><p class="empty" id="news-empty" hidden></p></div></section>' +
    '<section class="alt"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(N.pressT) + '</p><p class="lead">' + esc(C.company.press) + " · " + esc(C.company.phone) + '</p></div><div><p class="eyebrow">' + esc(U.ir.alertT) + '</p><form class="f" id="alert-form"><label class="field">' + esc(U.ir.form.email) + '<input type="email" required></label><div><button class="btn btn-dark" type="submit">' + esc(U.ir.alertBtn) + '</button></div><div id="alert-out"></div></form></div></div></section>';
}

function careers(lang, base) {
  const U = C.ui[lang], K = U.careers;
  const sites = [...new Set(C.jobs.map(j => j.site))], depts = [...new Set(C.jobs.map(j => j.dept[lang]))];
  return hero("repair.jpg", K.h1, K.lead, '<a class="btn btn-primary" href="#postes">' + esc(K.jobsT) + "</a>", base, true, "Calistemon, CC BY-SA 4.0") +
    '<section><div class="wrap">' + eyebrowHead(null, K.whyT) + '<div class="grid-4">' + K.why.map(w => '<div class="card plain"><div class="body"><h3>' + esc(w[0]) + "</h3><p>" + esc(w[1]) + "</p></div></div>").join("") + "</div></div></section>" +
    '<section class="alt" id="postes"><div class="wrap">' + eyebrowHead(null, K.jobsT) + '<div class="filters"><select id="job-site"><option value="">' + esc(K.allSites) + "</option>" + sites.map(s => '<option value="' + esc(s) + '">' + esc(s) + "</option>").join("") + '</select><select id="job-dept"><option value="">' + esc(K.allDepts) + "</option>" + depts.map(d => '<option value="' + esc(d) + '">' + esc(d) + "</option>").join("") + '</select></div><ul class="jobs" id="job-list">' + C.jobs.map(j => '<li data-site="' + esc(j.site) + '" data-dept="' + esc(j.dept[lang]) + '"><span><b>' + esc(j.t[lang]) + "</b><small>" + esc(j.id) + " · " + esc(j.site) + " · " + esc(j.dept[lang]) + " · " + esc(j.type[lang]) + '</small></span><button type="button" class="btn btn-outline btn-small" data-apply="' + esc(j.id) + '">' + esc(U.common.apply) + "</button></li>").join("") + '</ul><p class="empty" id="job-empty" hidden></p></div></section>' +
    '<section><div class="wrap grid-2"><form class="f" id="apply-form"><h3>' + esc(K.applyT) + '</h3><label class="field">' + esc(K.form.job) + '<select id="ap-job">' + C.jobs.map(j => '<option value="' + esc(j.id) + '">' + esc(j.id) + " · " + esc(j.t[lang]) + "</option>").join("") + '</select></label><div class="frow"><label class="field">' + esc(K.form.name) + '<input id="ap-name" required></label><label class="field">' + esc(K.form.phone) + '<input type="tel" required></label></div><div class="frow"><label class="field">' + esc(K.form.email) + '<input type="email"></label><label class="field">' + esc(K.form.cv) + '<input type="file" accept="application/pdf"></label></div><label class="check"><input type="checkbox" required><span>' + esc(K.form.consent) + '</span></label><div><button class="btn btn-primary" type="submit">' + esc(K.form.send) + '</button></div><div id="apply-out"></div></form><div id="local"><p class="eyebrow">' + esc(K.localT) + '</p><p class="lead">' + esc(K.local) + '</p><div class="card" style="border:0;background:transparent;margin-top:1.4rem"><div class="pic" style="aspect-ratio:16/9"><img src="' + base + 'img/haul.jpg" alt="" loading="lazy"></div></div></div></div></section>';
}

function contact(lang, base) {
  const U = C.ui[lang], K = U.contact;
  return hero("lubumbashi.jpg", K.h1, K.lead, null, base, true, "Lubumbashi · Oasisk., CC BY 2.5") +
    '<section><div class="wrap">' + eyebrowHead(null, K.officesT) + '<div class="contacts">' + K.offices.map(o => "<div><b>" + esc(o[0]) + "</b><span>" + esc(o[1]) + '</span><span class="mono">' + esc(o[2]) + "</span></div>").join("") + "</div></div></section>" +
    '<section class="alt"><div class="wrap grid-2"><form class="f" id="contact-form"><div class="frow"><label class="field">' + esc(K.form.name) + '<input required></label><label class="field">' + esc(K.form.email) + '<input required></label></div><label class="field">' + esc(K.form.subject) + "<select>" + K.form.subjects.map(s => "<option>" + esc(s) + "</option>").join("") + '</select></label><label class="field">' + esc(K.form.msg) + '<textarea required></textarea></label><div><button class="btn btn-primary" type="submit">' + esc(K.form.send) + '</button></div><div id="contact-out"></div></form><div><div class="callout"><h3>' + esc(K.greenT) + '</h3><p><b class="mono" style="font-size:1.3rem">' + esc(C.company.green) + "</b></p><p>" + esc(K.greenLead) + "</p><p>WhatsApp " + esc(C.company.grievanceWa) + ' · <a href="' + href(lang, "sust", base) + '#plaintes">' + esc(U.sust.grievT) + "</a></p></div><p class=\"note\" style=\"margin-top:1.4rem\">" + esc(C.company.email) + " · " + esc(C.company.press) + " · " + esc(C.company.ir) + "</p></div></div></section>";
}

const BUILDERS = { home, about, ops, ir, sust, news, careers, contact };
const DESC = {
  fr: { home: "Kando Ressources SA produit du cuivre et du cobalt dans le Lualaba, à 28 km de Kolwezi. Production, paiements à l'État et sécurité publiés chaque année.", about: "Société minière congolaise fondée en 2009 : mission, engagements, histoire, direction et gouvernance.", ops: "Mine de Kando, usine SX-EW et exploration Kanzenze-Sud. Cuivre cathode grade A et hydroxyde de cobalt.", ir: "Rapports annuels, états financiers, production trimestrielle, calendrier et déclaration ITIE.", sust: "Indicateurs sécurité, eau, climat, emploi local, programmes communautaires et mécanisme de plaintes.", news: "Communiqués et actualités de Kando Ressources, consultables par catégorie et par année.", careers: "Postes ouverts à Kando, Kanzenze et Lubumbashi. Emploi local et formation.", contact: "Bureaux de Kolwezi, Lubumbashi et Kando. Numéro vert plaintes et signalements." },
  en: { home: "Kando Ressources SA produces copper and cobalt in Lualaba, 28 km from Kolwezi. Production, payments to the State and safety published every year.", about: "Congolese mining company founded in 2009: mission, commitments, history, leadership and governance.", ops: "Kando mine, SX-EW plant and Kanzenze South exploration. Grade A copper cathode and cobalt hydroxide.", ir: "Annual reports, financial statements, quarterly production, calendar and EITI disclosure.", sust: "Safety, water, climate and local employment indicators, community programmes and grievance mechanism.", news: "Kando Ressources releases and news, searchable by category and year.", careers: "Open positions in Kando, Kanzenze and Lubumbashi. Local employment and training.", contact: "Kolwezi, Lubumbashi and Kando offices. Grievance and whistleblowing hotline." }
};

function build(outDir, opts) {
  opts = opts || {};
  const portfolioHome = opts.portfolioHome || "../../index.html";
  fs.mkdirSync(path.join(outDir, "en"), { recursive: true });
  fs.mkdirSync(path.join(outDir, "img"), { recursive: true });
  for (const f of fs.readdirSync(path.join(__dirname, "img"))) fs.copyFileSync(path.join(__dirname, "img", f), path.join(outDir, "img", f));
  fs.copyFileSync(path.join(__dirname, "style.css"), path.join(outDir, "style.css"));
  fs.copyFileSync(path.join(__dirname, "site.js"), path.join(outDir, "site.js"));
  let n = 0;
  for (const lang of ["fr", "en"]) {
    const base = lang === "en" ? "../" : "";
    for (const key of Object.keys(BUILDERS)) {
      const U = C.ui[lang];
      const title = key === "home" ? U.home.title : U[key].title + " · " + C.company.name;
      const html = layout(lang, key, { title, description: DESC[lang][key], body: BUILDERS[key](lang, base), portfolioHome: lang === "en" && opts.portfolioHomeEn ? opts.portfolioHomeEn : portfolioHome });
      const rel = (lang === "en" ? "en/" : "") + FILES[lang][key];
      fs.writeFileSync(path.join(outDir, rel), html);
      n++;
    }
  }
  return n;
}

if (require.main === module) {
  const out = process.argv[2] || path.join(__dirname, "dist");
  console.log("kando: " + build(out, { portfolioHome: process.argv[3] || "../../index.html" }) + " pages written to " + out);
}
module.exports = { build };

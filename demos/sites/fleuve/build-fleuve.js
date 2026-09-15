/* Generates the Cimenterie du Fleuve SA website (French + English, 18 pages) from content.js.
   Usage: node build-fleuve.js <outDir>
   or require("./build-fleuve.js").build(outDir, { portfolioHome: "../../index.html" }) */
"use strict";
const fs = require("fs"), path = require("path");
const C = require("./content.js");

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const L = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) && (lang in v)) ? v[lang] : v;
const PAGES = ["about", "products", "sites", "sust", "news", "careers", "suppliers", "contact"];
const FILES = {
  fr: { home: "index.html", about: "qui-sommes-nous.html", products: "produits.html", sites: "sites-et-logistique.html", sust: "durabilite-et-securite.html", news: "actualites.html", careers: "carrieres.html", suppliers: "fournisseurs.html", contact: "contact.html" },
  en: { home: "index.html", about: "who-we-are.html", products: "products.html", sites: "sites-and-logistics.html", sust: "sustainability-and-safety.html", news: "news.html", careers: "careers.html", suppliers: "suppliers.html", contact: "contact.html" }
};
const fmtDate = (iso, lang) => new Date(iso + "T00:00:00").toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
const href = (lang, key, base) => base + (lang === "en" ? "en/" : "") + FILES[lang][key];
const tel = n => "tel:" + n.replace(/\s/g, "");
const PHONES = { sales: C.company.sales, phone: C.company.phone, terminalPhone: C.distributors[0].p, green: "0 800 000 000" };

function layout(lang, key, o) {
  const U = C.ui[lang], base = lang === "en" ? "../" : "";
  const nav = U.nav.map(([k, label]) => '<a href="' + href(lang, k, base) + '"' + (k === key ? ' aria-current="page"' : "") + ">" + esc(label) + "</a>").join("");
  const fkeys = [
    [href(lang, "about", base), href(lang, "sites", base), href(lang, "news", base), href(lang, "careers", base)],
    [href(lang, "products", base) + "#cem1", href(lang, "products", base) + "#bpe", href(lang, "products", base) + "#agg", href(lang, "products", base) + "#docs"],
    [href(lang, "suppliers", base) + "#tenders", href(lang, "suppliers", base) + "#register", href(lang, "sust", base) + "#plaintes", href(lang, "contact", base) + "#legal"]
  ];
  const fcol = (title, labels, keys) => "<div><h4>" + esc(title) + "</h4><ul>" + labels.map((l, i) => '<li><a href="' + keys[i] + '">' + esc(l) + "</a></li>").join("") + "</ul></div>";
  const credits = C.credits.map(c => '<a href="' + c[3] + '" rel="noopener">' + esc(c[0]) + "</a> · " + esc(c[1]) + " (" + esc(c[2]) + ")").join(" ; ");
  const brand = color => '<a class="brand" href="' + href(lang, "home", base) + '"' + (color ? ' style="color:' + color + '"' : "") + '><span class="mark" aria-hidden="true"></span><span><b>' + esc(C.company.name) + "</b><small" + (color ? ' style="color:#8B95A0"' : "") + ">" + esc(C.company.tagline[lang]) + "</small></span></a>";
  return '<!doctype html>\n<html lang="' + lang + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + esc(o.title) + '</title>\n<meta name="description" content="' + esc(o.description) + '">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,600..800&family=Source+Sans+3:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">\n' +
    '<link rel="stylesheet" href="' + base + 'style.css">\n</head>\n<body>\n' +
    '<a class="skip" href="#main">' + (lang === "fr" ? "Aller au contenu" : "Skip to content") + "</a>\n" +
    '<div class="ikbar"><span><strong>' + esc(U.demoBar.split(" · ")[0]) + "</strong> · " + esc(U.demoBar.split(" · ").slice(1).join(" · ")) + '</span><a href="' + base + o.portfolioHome + '">' + esc(U.back) + "</a></div>\n" +
    '<div class="util"><div class="wrap"><span>' + esc(U.util.sales) + ' · <a href="' + tel(C.company.sales) + '">' + esc(C.company.sales) + '</a></span><span style="display:flex;gap:1.2rem;align-items:center"><a href="' + href(lang, "contact", base) + '#devis">' + esc(U.util.quote) + '</a><a href="' + href(lang, "suppliers", base) + '">' + esc(U.util.tenders) + '</a><a href="' + href(lang, "careers", base) + '">' + esc(U.util.careers) + '</a><span class="lang"><a href="' + (lang === "fr" ? "" : "../") + FILES.fr[key] + '" aria-current="' + (lang === "fr") + '" lang="fr">FR</a><a href="' + (lang === "fr" ? "en/" : "") + FILES.en[key] + '" aria-current="' + (lang === "en") + '" lang="en">EN</a></span></span></div></div>\n' +
    '<header class="site-header"><div class="wrap">' + brand() + '<button class="navtoggle" id="navtoggle" aria-expanded="false" aria-controls="nav">' + esc(U.menu) + '</button><nav class="nav" id="nav" aria-label="' + (lang === "fr" ? "Navigation principale" : "Main navigation") + '">' + nav + "</nav></div></header>\n" +
    '<main id="main">\n' + o.body + "\n</main>\n" +
    '<footer><div class="wrap"><div class="fgrid"><div>' + brand("#fff") + '<p style="margin-top:1rem">' + esc(U.footer.about) + "</p><p>" + esc(C.company.hq[lang]) + "<br>" + esc(C.company.phone) + " · " + esc(C.company.email) + "</p></div>" +
    U.footer.cols.map((c, i) => fcol(c[0], c[1], fkeys[i])).join("") + "</div>" +
    '<div class="fbottom"><span>' + esc(U.footer.legal) + "</span><span>" + esc(U.footer.by) + ' <a href="' + base + o.portfolioHome + '">IK Digital Solutions</a></span></div>' +
    '<p class="credits">' + esc(U.footer.photos) + " " + credits + ".</p></div></footer>\n" +
    '<div class="consent" id="consent"><span>' + esc(U.consent.text) + ' <a href="' + href(lang, "contact", base) + '#legal">' + esc(U.consent.more) + '</a></span><span style="display:flex;gap:.6rem"><button class="btn btn-primary btn-small" id="c-yes" type="button">' + esc(U.consent.yes) + '</button><button class="btn btn-outline btn-small" id="c-no" type="button">' + esc(U.consent.no) + "</button></span></div>\n" +
    '<div id="modal"></div>\n<script src="' + base + 'site.js" defer></script>\n</body>\n</html>\n';
}

/* ---------- pieces ---------- */
const hero = (img, h1, lead, ctas, base, short, credit) =>
  '<section class="hero' + (short ? " short" : "") + '"><img class="bg" src="' + base + "img/" + img + '" alt=""><div class="wrap"><h1>' + esc(h1) + "</h1>" + (lead ? '<p class="lead">' + esc(lead) + "</p>" : "") + (ctas ? '<div class="cta">' + ctas + "</div>" : "") + "</div>" + (credit ? '<span class="credit">' + esc(credit) + "</span>" : "") + "</section>";
const statsStrip = lang => '<div class="stats"><div class="wrap">' + C.facts.map(f => "<div><b>" + esc(f.v) + "</b><span>" + esc(f[lang]) + "</span></div>").join("") + "</div></div>";
const head = (eyebrow, title, lead, row) => '<div class="section-head' + (row ? " row" : "") + '"><div>' + (eyebrow ? '<p class="eyebrow">' + esc(eyebrow) + "</p>" : "") + "<h2>" + esc(title) + "</h2>" + (lead ? '<p class="lead">' + esc(lead) + "</p>" : "") + "</div>" + (row || "") + "</div>";
const note = t => '<p class="note">' + esc(t) + "</p>";
const docList = (lang, items, label) => '<ul class="docs">' + items.map(d => "<li><span>" + esc(d.t[lang]) + "<small>" + esc(d.m) + '</small></span><a class="btn btn-ghost btn-small" href="#" data-doc="' + esc(d.t[lang]) + '">' + esc(label) + "</a></li>").join("") + "</ul>";
const newsItem = (n, lang) => '<li data-cat="' + esc(n.cat[lang]) + '" data-year="' + n.d.slice(0, 4) + '"><details><summary><span class="d">' + esc(fmtDate(n.d, lang)) + '</span><span class="t">' + esc(n.t[lang]) + '</span><span class="c">' + esc(n.cat[lang]) + '</span></summary><div class="body">' + n.b[lang].map(p => "<p>" + esc(p) + "</p>").join("") + "</div></details></li>";
const kpiRow = (lang, items) => '<div class="kpi-row">' + items.map(k => '<div class="kpi"><b>' + esc(k.v) + "</b><span>" + esc(k[lang]) + "</span></div>").join("") + "</div>";
const plainCards = (items, cls) => '<div class="' + (cls || "grid-4") + '">' + items.map(v => '<div class="card plain"><div class="body"><h3>' + esc(v[0]) + "</h3><p>" + esc(v[1]) + "</p></div></div>").join("") + "</div>";
const productCards = (lang, base, more) => '<div class="grid-3">' + C.products.map(p => '<article class="card"><div class="pic"><img src="' + base + "img/" + p.img + '" alt="" loading="lazy"></div><div class="body"><span class="meta">' + esc(L(p.badge, lang)) + "</span><h3>" + esc(p.t[lang]) + "</h3><p>" + esc(p.d[lang]) + '</p><a class="more" href="' + href(lang, "products", base) + "#" + p.key + '">' + esc(more) + " →</a></div></article>").join("") + "</div>";
const siteCards = (lang, base, items) => '<div class="grid-3">' + items.map(s => '<article class="card" id="' + s.key + '"><div class="pic"><img src="' + base + "img/" + s.img + '" alt="" loading="lazy"></div><div class="body"><span class="meta">' + esc(s.sub[lang]) + "</span><h3>" + esc(s.t[lang]) + "</h3><p>" + esc(s.d[lang]) + "</p></div></article>").join("") + "</div>";
const distributorTable = (lang, cols) => '<div class="table-wrap"><table><thead><tr>' + cols.map(c => "<th>" + esc(c) + "</th>").join("") + "</tr></thead><tbody>" + C.distributors.map(d => "<tr><td><b>" + esc(d.city) + "</b></td><td>" + esc(d.z) + "</td><td>" + esc(d.n) + '</td><td class="num"><a href="' + tel(d.p) + '">' + esc(d.p) + "</a></td></tr>").join("") + "</tbody></table></div>";
const tenderTable = (lang, items, S, withFilter) => {
  const rows = items.map(t => '<tr data-status="' + t.status + '"><td class="mono">' + esc(t.ref) + "</td><td>" + esc(t.t[lang]) + "</td><td>" + esc(t.cat[lang]) + '</td><td class="num">' + esc(fmtDate(t.close, lang)) + '</td><td><span class="status ' + t.status + '">' + esc(S.status[t.status]) + '</span></td><td><a class="btn btn-ghost btn-small" href="#" data-doc="' + esc(t.ref) + '">' + esc(S.getFile) + "</a></td></tr>").join("");
  return '<div class="table-wrap"><table id="' + (withFilter ? "tender-list" : "tender-home") + '"><thead><tr>' + S.cols.map(c => "<th>" + esc(c) + "</th>").join("") + "</tr></thead><tbody>" + rows + "</tbody></table></div>" + (withFilter ? '<p class="empty" id="tender-empty" hidden></p>' : "");
};
const alertForm = (lang, N) => '<form class="f" id="alert-form"><label class="field">' + esc(N.email) + '<input type="email" required></label><div><button class="btn btn-dark" type="submit">' + esc(N.alertBtn) + '</button></div><div id="alert-out"></div></form>';
const field = (label, inner) => '<label class="field">' + esc(label) + inner + "</label>";
const sel = opts => "<select>" + opts.map(o => "<option>" + esc(o) + "</option>").join("") + "</select>";
const quoteForm = (lang, Q) => '<form class="f" id="quote-form"><div class="frow">' + field(Q.name, "<input required>") + field(Q.org, "<input>") + '</div><div class="frow">' + field(Q.phone, '<input type="tel" required>') + field(Q.product, sel(C.products.map(p => p.t[lang]))) + '</div><div class="frow">' + field(Q.qty, '<input inputmode="decimal">') + field(Q.city, "<input>") + "</div>" + field(Q.date, '<input type="date">') + field(Q.msg, "<textarea></textarea>") + '<div><button class="btn btn-primary" type="submit">' + esc(Q.send) + '</button></div><div id="quote-out"></div></form>';

/* ---------- pages ---------- */
function home(lang, base) {
  const U = C.ui[lang], H = U.home;
  return hero("plant-day.jpg", H.h1, H.lead, '<a class="btn btn-primary" href="' + href(lang, "products", base) + '">' + esc(H.cta1) + '</a><a class="btn btn-outline light" href="' + href(lang, "sites", base) + '#acheter">' + esc(H.cta2) + "</a>", base, false, "CEphoto, Uwe Aranas · CC BY-SA 3.0") +
    statsStrip(lang) +
    '<section><div class="wrap">' + head(H.prodEyebrow, H.prodTitle, H.prodLead) + productCards(lang, base, H.prodMore) + "</div></section>" +
    '<section class="alt"><div class="wrap">' + head(H.sitesEyebrow, H.sitesTitle, H.sitesLead) + '<div class="photo-band"><figure><img src="' + base + 'img/kilns.jpg" alt="" loading="lazy"><figcaption>' + esc(C.sites[0].t[lang]) + '</figcaption></figure><figure><img src="' + base + 'img/quarry.jpg" alt="" loading="lazy"><figcaption>' + esc(C.sites[1].t[lang]) + '</figcaption></figure><figure><img src="' + base + 'img/kinshasa-aerial.jpg" alt="" loading="lazy"><figcaption>' + esc(C.sites[2].t[lang]) + '</figcaption></figure></div><p style="margin-top:1.6rem"><a class="btn btn-dark" href="' + href(lang, "sites", base) + '">' + esc(U.nav[2][1]) + "</a></p></div></section>" +
    '<section class="dark"><div class="wrap">' + head(H.sustEyebrow, H.sustTitle, H.sustLead) + '<div class="grid-4">' + C.kpis.slice(0, 4).map(k => '<div><b class="mono" style="font-size:2.2rem;display:block;font-weight:500;color:#fff">' + esc(k.v) + '</b><span style="color:#B9C2CC;font-size:.9rem">' + esc(k[lang]) + "</span></div>").join("") + '</div><p style="margin-top:2rem"><a class="btn btn-outline light" href="' + href(lang, "sust", base) + '">' + esc(H.sustMore) + "</a></p>" + note(U.illustrative).replace('class="note"', 'class="note" style="color:#8B95A0"') + "</div></section>" +
    '<section><div class="wrap">' + head(H.newsEyebrow, H.newsTitle, null, '<a class="btn btn-ghost" href="' + href(lang, "news", base) + '">' + esc(H.newsMore) + "</a>") + '<ul class="news">' + C.news.slice(0, 3).map(n => newsItem(n, lang)).join("") + "</ul></div></section>" +
    '<section class="alt"><div class="wrap">' + head(H.suppEyebrow, H.suppTitle, H.suppLead, '<a class="btn btn-ghost" href="' + href(lang, "suppliers", base) + '">' + esc(H.suppMore) + "</a>") + tenderTable(lang, C.tenders.filter(t => t.status !== "closed"), U.suppliers, false) + "</div></section>" +
    '<section><div class="wrap grid-2"><div><div class="card" style="border:0;background:transparent"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/bags.jpg" alt="" loading="lazy"></div></div></div><div><p class="eyebrow">' + esc(U.sites.buyT) + "</p><h2>" + esc(H.buyTitle) + '</h2><p class="lead" style="margin-top:1rem">' + esc(H.buyLead) + '</p><p style="margin-top:1.4rem"><a class="btn btn-primary" href="' + href(lang, "sites", base) + '#acheter">' + esc(H.cta2) + '</a> <a class="btn btn-outline" href="' + href(lang, "contact", base) + '#devis">' + esc(U.common.quote) + "</a></p></div></div></section>";
}

function about(lang, base) {
  const U = C.ui[lang], A = U.about;
  return hero("bridge.jpg", A.h1, A.lead, null, base, true, "Pont Maréchal, Matadi · Χρίστος Ιμμανοελ, CC BY-SA 4.0") +
    '<section><div class="wrap grid-2"><div><p class="eyebrow">' + esc(A.missionT) + "</p><h2>" + esc(A.mission) + '</h2></div><div><p class="eyebrow">' + esc(A.valuesT) + "</p>" + plainCards(A.values, "grid-2") + "</div></div></section>" +
    '<section class="alt"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(A.historyT) + '</p><ul class="timeline">' + C.timeline.map(t => '<li><span class="y">' + t.y + "</span><p>" + esc(t[lang]) + "</p></li>").join("") + '</ul></div><div><div class="card" style="border:0;background:transparent"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/kilns.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Fours rotatifs, photo d'illustration (Sundon, Royaume-Uni · Dylan Moore, CC BY-SA 2.0)." : "Rotary kilns, illustrative photo (Sundon, United Kingdom · Dylan Moore, CC BY-SA 2.0).") + '</p><div class="card" style="border:0;background:transparent;margin-top:1.6rem"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/matadi.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Le port de Matadi et le fleuve, la nuit (MONUSCO Photos, CC BY-SA 2.0)." : "Matadi harbour and the river at night (MONUSCO Photos, CC BY-SA 2.0).") + "</p></div></div></section>" +
    '<section><div class="wrap">' + head(null, A.leadersT) + '<div class="people">' + C.leaders.map(p => '<div class="person"><b>' + esc(p.n) + "</b><span>" + esc(p.r[lang]) + "</span><p>" + esc(p.b[lang]) + "</p></div>").join("") + "</div></div></section>" +
    '<section class="alt"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(A.govT) + '</p><p class="lead">' + esc(A.gov) + '</p><div style="margin-top:1.4rem">' + docList(lang, [C.docs[6], C.docs[7], C.docs[8]], U.common.download) + '</div></div><div><p class="eyebrow">' + esc(A.shareT) + '</p><div class="table-wrap"><table style="min-width:0"><tbody>' + A.share.map(s => '<tr><td class="num" style="width:6rem"><b>' + esc(s[0]) + "</b></td><td>" + esc(s[1]) + "</td></tr>").join("") + "</tbody></table></div>" + note(U.illustrative) + "</div></div></section>";
}

function products(lang, base) {
  const U = C.ui[lang], P = U.products;
  const sheet = p => '<div class="product" id="' + p.key + '"><div class="pic"><img src="' + base + "img/" + p.img + '" alt="" loading="lazy"></div><div><span class="badge">' + esc(L(p.badge, lang)) + "</span><h3>" + esc(p.t[lang]) + "</h3><p>" + esc(p.d[lang]) + '</p><table class="spec"><tbody>' + p.spec.map(s => "<tr><th>" + esc(L(s[0], lang)) + '</th><td class="num">' + esc(L(s[1], lang)) + "</td></tr>").join("") + '</tbody></table><div class="uses">' + p.uses[lang].map(u => "<span>" + esc(u) + "</span>").join("") + '</div><p style="margin-top:1.2rem"><a class="btn btn-primary btn-small" href="' + href(lang, "contact", base) + '#devis">' + esc(U.common.quote) + "</a></p></div></div>";
  return hero("bags.jpg", P.h1, P.lead, null, base, true, "KVDP · public domain") +
    '<section><div class="wrap">' + C.products.map(sheet).join("") + "</div></section>" +
    '<section class="alt" id="docs"><div class="wrap grid-2"><div>' + head(null, P.docsT, P.docsLead) + docList(lang, C.docs.slice(0, 6), U.common.download) + '</div><div><p class="eyebrow">' + esc(P.qualityT) + '</p><p class="lead">' + esc(P.quality) + '</p><p class="eyebrow" style="margin-top:2rem">' + esc(P.storageT) + '</p><ul style="color:var(--ink-2);padding-left:1.2rem;margin:0;display:grid;gap:.4rem">' + P.storage.map(s => "<li>" + esc(s) + "</li>").join("") + "</ul></div></div></section>" +
    '<section><div class="wrap grid-2"><div>' + head(null, P.quoteT, P.quoteLead) + '<p><a class="btn btn-primary" href="' + href(lang, "contact", base) + '#devis">' + esc(U.common.quote) + '</a></p><div class="card" style="border:0;background:transparent;margin-top:2rem"><div class="pic" style="aspect-ratio:16/9"><img src="' + base + 'img/pump.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Coulage de béton pompé, photo d'illustration (Bernardobenzecry, CC BY-SA 4.0)." : "Pumped concrete pour, illustrative photo (Bernardobenzecry, CC BY-SA 4.0).") + '</p></div><div><p class="eyebrow">' + esc(U.sites.buyT) + '</p><p class="lead">' + esc(U.sites.buyLead) + '</p><p style="margin-top:1.4rem"><a class="btn btn-dark" href="' + href(lang, "sites", base) + '#acheter">' + esc(U.home.cta2) + "</a></p></div></div></section>";
}

function sites(lang, base) {
  const U = C.ui[lang], S = U.sites;
  const f = (x, y, r, fill, label, sub, left) => { const tx = left ? x - r - 6 : x + r + 6, an = left ? ' text-anchor="end"' : ''; return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '"/><text x="' + tx + '" y="' + (y + 5) + '"' + an + ' font-family="Source Sans 3, sans-serif" font-size="14" font-weight="600" fill="#1E2126">' + esc(label) + '</text>' + (sub ? '<text x="' + tx + '" y="' + (y + 21) + '"' + an + ' font-family="IBM Plex Mono, monospace" font-size="11" fill="#4E535B">' + esc(sub) + '</text>' : ''); };
  const map = '<div class="map"><svg viewBox="0 0 640 400" role="img" aria-label="' + esc(S.mapT) + '"><rect width="640" height="400" fill="#DCE6F0"/>' +
    '<path d="M20 250 C80 230 110 250 150 245 S220 200 300 170 S420 140 470 135" fill="none" stroke="#1F4E79" stroke-width="7" stroke-linecap="round" opacity=".55"/>' +
    '<path d="M470 135 C520 130 560 100 620 60" fill="none" stroke="#1F4E79" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 9" opacity=".55"/>' +
    '<text x="60" y="235" font-family="Archivo, sans-serif" font-size="12" font-weight="600" fill="#1F4E79" opacity=".8">' + (lang === "fr" ? "FLEUVE CONGO" : "CONGO RIVER") + '</text>' +
    '<text x="400" y="66" font-family="IBM Plex Mono, monospace" font-size="10" fill="#1F4E79">→ Bandundu · Mbandaka · Kisangani</text>' +
    '<path d="M150 262 C220 262 280 230 340 210 S440 190 470 158" fill="none" stroke="#4E535B" stroke-width="2.5"/><text x="300" y="248" font-family="IBM Plex Mono, monospace" font-size="11" fill="#4E535B">N1</text>' +
    '<path d="M150 252 C230 240 300 205 350 195 S440 175 465 150" fill="none" stroke="#1E2126" stroke-width="2" stroke-dasharray="7 4"/><text x="235" y="212" font-family="IBM Plex Mono, monospace" font-size="11" fill="#1E2126">' + (lang === "fr" ? "rail SCTP" : "SCTP rail") + '</text>' +
    '<path d="M470 158 C530 190 570 210 600 220" fill="none" stroke="#4E535B" stroke-width="2.5"/>' +
    f(150, 258, 11, "#E8B921", C.sites[0].t[lang], lang === "fr" ? "four, broyage, ensachage" : "kiln, grinding, bagging") +
    f(120, 300, 7, "#1E2126", C.sites[1].t[lang], "12 km") +
    f(470, 150, 11, "#E8B921", C.sites[2].t[lang], lang === "fr" ? "silos, béton, quai" : "silos, concrete, quay", true) +
    f(50, 262, 7, "#1F4E79", C.sites[3].t[lang], "") +
    f(600, 222, 7, "#1F4E79", C.sites[4].t[lang], "", true) +
    '<text x="20" y="30" font-family="Archivo, sans-serif" font-size="20" font-weight="700" fill="#1E2126">Kongo Central · Kinshasa</text><text x="20" y="48" font-family="IBM Plex Mono, monospace" font-size="11" fill="#4E535B">' + (lang === "fr" ? "schéma, sans échelle" : "schematic, not to scale") + "</text></svg></div>" +
    '<div class="legend"><span><i style="background:#E8B921"></i>' + (lang === "fr" ? "Usine et terminal" : "Plant and terminal") + '</span><span><i style="background:#1F4E79"></i>' + (lang === "fr" ? "Dépôt" : "Depot") + '</span><span><i style="background:#1E2126"></i>' + (lang === "fr" ? "Carrière" : "Quarry") + "</span></div>";
  return hero("kilns.jpg", S.h1, S.lead, null, base, true, "Dylan Moore · CC BY-SA 2.0") +
    '<section><div class="wrap">' + head(null, S.sitesT) + siteCards(lang, base, C.sites.slice(0, 3)) + '<div style="height:1.6rem"></div><div class="grid-3">' + C.sites.slice(3).map(s => '<article class="card" id="' + s.key + '"><div class="pic" style="aspect-ratio:16/7"><img src="' + base + "img/" + s.img + '" alt="" loading="lazy"></div><div class="body"><span class="meta">' + esc(s.sub[lang]) + "</span><h3>" + esc(s.t[lang]) + "</h3><p>" + esc(s.d[lang]) + "</p></div></article>").join("") + '<div class="card" style="border:0;background:transparent"><div class="pic" style="aspect-ratio:16/7"><img src="' + base + 'img/bridge2.jpg" alt="" loading="lazy"></div><div class="body" style="padding-inline:0"><span class="meta">' + (lang === "fr" ? "Pont Maréchal, Matadi · 3nigma, CC BY-SA 3.0" : "Pont Maréchal, Matadi · 3nigma, CC BY-SA 3.0") + "</span></div></div></div>" + note(U.illustrative) + "</div></section>" +
    '<section class="alt"><div class="wrap grid-2"><div>' + head(null, S.mapT, S.mapLead) + map + '</div><div><p class="eyebrow">' + esc(S.logT) + "</p>" + plainCards(S.log, "stack") + "</div></div></section>" +
    '<section id="acheter"><div class="wrap">' + head(null, S.buyT, S.buyLead) + distributorTable(lang, S.cols) + note(U.illustrative) + "</div></section>";
}

function sust(lang, base) {
  const U = C.ui[lang], S = U.sust;
  return hero("fishermen.jpg", S.h1, S.lead, '<a class="btn btn-primary" href="#plaintes">' + esc(S.grievT) + '</a><a class="btn btn-outline light" href="#docs">' + esc(S.docsT) + "</a>", base, true, "Cethuyghe · CC BY-SA 4.0") +
    '<section><div class="wrap">' + head(null, S.kpiT) + kpiRow(lang, C.kpis.slice(0, 4)) + '<div style="height:1.2rem"></div>' + kpiRow(lang, C.kpis.slice(4, 8)) + '<div class="callout" style="margin-top:1.6rem"><p>' + esc(S.frameworks) + "</p></div>" + note(U.illustrative) + "</div></section>" +
    '<section class="alt" id="securite"><div class="wrap">' + head(null, S.safetyT) + plainCards(S.safety) + "</div></section>" +
    '<section id="environnement"><div class="wrap">' + head(null, S.envT) + plainCards(S.env) + '<div class="photo-band" style="margin-top:2.4rem"><figure><img src="' + base + 'img/quarry.jpg" alt="" loading="lazy"><figcaption>' + esc(C.sites[1].t[lang]) + '</figcaption></figure><figure><img src="' + base + 'img/plant-night.jpg" alt="" loading="lazy"><figcaption>' + esc(C.sites[0].t[lang]) + '</figcaption></figure><figure><img src="' + base + 'img/africaplant.jpg" alt="" loading="lazy"><figcaption>' + esc(S.envT) + "</figcaption></figure></div></div></section>" +
    '<section class="alt" id="communautes"><div class="wrap">' + head(null, S.commT, S.commLead) + '<div class="grid-4">' + C.programs.map(p => '<div class="card"><div class="body"><h3>' + esc(p.t[lang]) + "</h3><p>" + esc(p.d[lang]) + "</p></div></div>").join("") + "</div></div></section>" +
    '<section id="plaintes"><div class="wrap">' + head(null, S.grievT, S.grievLead) + '<div class="grid-2"><div>' + plainCards(S.grievSteps, "grid-2") + '<div class="callout" style="margin-top:1.6rem"><h3>' + esc(S.green) + '</h3><p><b class="mono">' + esc(S.greenNum) + "</b> · WhatsApp " + esc(C.company.phone) + "</p><p>" + esc(S.greenLead) + '</p></div></div><form class="f" id="grievance-form"><div class="frow">' + field(S.form.name, "<input>") + field(S.form.phone, '<input type="tel">') + '</div><div class="frow">' + field(S.form.place, "<input required>") + field(S.form.type, sel(S.form.types)) + "</div>" + field(S.form.msg, "<textarea required></textarea>") + '<label class="check"><input type="checkbox"><span>' + esc(S.form.anon) + '</span></label><div><button class="btn btn-primary" type="submit">' + esc(S.form.send) + '</button></div><div id="grievance-out"></div></form></div></div></section>' +
    '<section class="alt" id="docs"><div class="wrap">' + head(null, S.docsT) + docList(lang, [C.docs[6], C.docs[7], C.docs[3], C.docs[8]], U.common.download) + "</div></section>";
}

function news(lang, base) {
  const U = C.ui[lang], N = U.news;
  const cats = [...new Set(C.news.map(n => n.cat[lang]))], years = [...new Set(C.news.map(n => n.d.slice(0, 4)))];
  return hero("pump.jpg", N.h1, N.lead, null, base, true, "Bernardobenzecry · CC BY-SA 4.0") +
    '<section><div class="wrap"><div class="filters"><input id="news-q" type="search" placeholder="' + esc(N.search) + '" aria-label="' + esc(N.search) + '"><select id="news-cat" aria-label="' + esc(N.allCat) + '"><option value="">' + esc(N.allCat) + "</option>" + cats.map(c => '<option value="' + esc(c) + '">' + esc(c) + "</option>").join("") + '</select><select id="news-year" aria-label="' + esc(N.allYear) + '"><option value="">' + esc(N.allYear) + "</option>" + years.map(y => '<option value="' + y + '">' + y + "</option>").join("") + '</select></div><ul class="news" id="news-list">' + C.news.map(n => newsItem(n, lang)).join("") + '</ul><p class="empty" id="news-empty" hidden></p></div></section>' +
    '<section class="alt"><div class="wrap grid-2"><div><p class="eyebrow">' + esc(N.pressT) + '</p><p class="lead">' + esc(C.company.press) + " · " + esc(C.company.phone) + '</p></div><div><p class="eyebrow">' + esc(N.alertT) + "</p>" + alertForm(lang, N) + "</div></div></section>";
}

function careers(lang, base) {
  const U = C.ui[lang], K = U.careers;
  const sitesList = [...new Set(C.jobs.map(j => j.site))], depts = [...new Set(C.jobs.map(j => j.dept[lang]))];
  return hero("plant-night.jpg", K.h1, K.lead, '<a class="btn btn-primary" href="#postes">' + esc(K.jobsT) + "</a>", base, true, "Smailtn · CC BY-SA 4.0") +
    '<section><div class="wrap">' + head(null, K.whyT) + plainCards(K.why) + "</div></section>" +
    '<section class="alt" id="postes"><div class="wrap">' + head(null, K.jobsT) + '<div class="filters"><select id="job-site" aria-label="' + esc(K.allSites) + '"><option value="">' + esc(K.allSites) + "</option>" + sitesList.map(s => '<option value="' + esc(s) + '">' + esc(s) + "</option>").join("") + '</select><select id="job-dept" aria-label="' + esc(K.allDepts) + '"><option value="">' + esc(K.allDepts) + "</option>" + depts.map(d => '<option value="' + esc(d) + '">' + esc(d) + "</option>").join("") + '</select></div><ul class="jobs" id="job-list">' + C.jobs.map(j => '<li data-site="' + esc(j.site) + '" data-dept="' + esc(j.dept[lang]) + '"><div><b>' + esc(j.t[lang]) + "</b><small>" + esc(j.site) + " · " + esc(j.dept[lang]) + " · " + esc(j.type[lang]) + " · " + esc(K.closes) + " " + esc(fmtDate(j.close, lang)) + '</small></div><button class="btn btn-primary btn-small" type="button" data-apply="' + esc(j.t[lang]) + '">' + esc(U.common.apply) + "</button></li>").join("") + '</ul><p class="empty" id="job-empty" hidden></p></div></section>' +
    '<section><div class="wrap grid-2"><div>' + head(null, K.applyT, K.applyLead) + '<form class="f" id="apply-form"><div class="frow">' + field(K.form.name, '<input id="ap-name" required>') + field(K.form.phone, '<input type="tel" required>') + "</div>" + field(K.form.email, '<input type="email">') + '<label class="field">' + esc(K.form.job) + '<select id="ap-job"><option>' + esc(K.form.spontaneous) + "</option>" + C.jobs.map(j => "<option>" + esc(j.t[lang]) + "</option>").join("") + "</select></label>" + field(K.form.cv, '<input type="file" accept="application/pdf">') + field(K.form.msg, "<textarea></textarea>") + '<div><button class="btn btn-primary" type="submit">' + esc(K.form.send) + '</button></div><div id="apply-out"></div></form></div><div id="local"><p class="eyebrow">' + esc(K.localT) + '</p><p class="lead">' + esc(K.local) + '</p><div class="card" style="border:0;background:transparent;margin-top:1.6rem"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/zambia.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Photo d'illustration (Thatlowdownwoman, CC BY-SA 4.0)." : "Illustrative photo (Thatlowdownwoman, CC BY-SA 4.0).") + "</p></div></div></section>";
}

function suppliers(lang, base) {
  const U = C.ui[lang], S = U.suppliers;
  return hero("mixer.jpg", S.h1, S.lead, '<a class="btn btn-primary" href="#register">' + esc(S.regT) + '</a><a class="btn btn-outline light" href="#tenders">' + esc(S.tendersT) + "</a>", base, true, "CEphoto, Uwe Aranas · CC BY-SA 3.0") +
    '<section id="tenders"><div class="wrap">' + head(null, S.tendersT, null, '<div class="filters" style="margin:0"><select id="tender-status" aria-label="' + esc(S.allStatus) + '"><option value="">' + esc(S.allStatus) + '</option><option value="open">' + esc(S.status.open) + '</option><option value="soon">' + esc(S.status.soon) + '</option><option value="closed">' + esc(S.status.closed) + "</option></select></div>") + tenderTable(lang, C.tenders, S, true) + note(U.illustrative) + "</div></section>" +
    '<section class="alt"><div class="wrap">' + head(null, S.howT) + plainCards(S.how) + '<div class="callout" style="margin-top:2rem"><h3>' + esc(S.rulesT) + "</h3><p>" + esc(S.rules) + "</p></div>" + '<div style="margin-top:1.6rem">' + docList(lang, [C.docs[8], C.docs[9], C.docs[5]], U.common.download) + "</div></div></section>" +
    '<section id="register"><div class="wrap grid-2"><div>' + head(null, S.regT) + '<form class="f" id="supplier-form"><div class="frow">' + field(S.form.company, "<input required>") + field(S.form.city, "<input>") + '</div><div class="frow">' + field(S.form.rccm, "<input required>") + field(S.form.nif, "<input required>") + "</div>" + field(S.form.cat, sel(C.supplierCats[lang])) + '<div class="frow">' + field(S.form.contact, "<input required>") + field(S.form.phone, '<input type="tel" required>') + "</div>" + field(S.form.email, '<input type="email" required>') + field(S.form.msg, "<textarea></textarea>") + '<div><button class="btn btn-primary" type="submit">' + esc(S.form.send) + '</button></div><div id="supplier-out"></div></form></div><div><p class="eyebrow">' + esc(U.contact.pointsT) + '</p><div class="callout"><b>' + esc(U.contact.points[2][0]) + "</b><span>" + esc(U.contact.points[2][1]) + '</span><a href="mailto:' + C.company.procurement + '">' + esc(C.company.procurement) + '</a><a href="' + tel(C.company.phone) + '">' + esc(C.company.phone) + '</a></div><div class="card" style="border:0;background:transparent;margin-top:1.6rem"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/silos.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Photo d'illustration (Gaurav Dhwaj Khadka, CC BY-SA 4.0)." : "Illustrative photo (Gaurav Dhwaj Khadka, CC BY-SA 4.0).") + "</p></div></div></section>";
}

function contact(lang, base) {
  const U = C.ui[lang], K = U.contact;
  const pt = p => '<div><b>' + esc(p[0]) + "</b><span>" + esc(p[1]) + '</span><a href="' + tel(PHONES[p[2]]) + '">' + esc(PHONES[p[2]]) + '</a><a href="mailto:' + C.company[p[3]] + '">' + esc(C.company[p[3]]) + "</a></div>";
  return hero("matadi-town.jpg", K.h1, K.lead, null, base, true, "Matadi · Shaloom Yave, CC BY-SA 4.0") +
    '<section><div class="wrap">' + head(null, K.pointsT) + '<div class="contacts">' + K.points.map(pt).join("") + '</div><p class="note" style="margin-top:1.2rem">' + esc(C.company.hq[lang]) + "</p></div></section>" +
    '<section class="alt" id="devis"><div class="wrap grid-2"><div>' + head(null, K.quoteT, K.quoteLead) + quoteForm(lang, K.quote) + '</div><div>' + head(null, K.formT) + '<form class="f" id="contact-form"><div class="frow">' + field(K.form.name, "<input required>") + field(K.form.org, "<input>") + "</div>" + field(K.form.email, '<input type="email" required>') + field(K.form.subject, sel(K.form.subjects)) + field(K.form.msg, "<textarea required></textarea>") + '<div><button class="btn btn-dark" type="submit">' + esc(K.form.send) + '</button></div><div id="contact-out"></div></form><p class="eyebrow" style="margin-top:2rem">' + esc(K.hoursT) + '</p><ul class="docs">' + K.hours.map(h => "<li><span><b>" + esc(h[0]) + "</b><small>" + esc(h[1]) + "</small></span></li>").join("") + "</ul></div></div></section>" +
    '<section id="legal" class="legal"><div class="wrap grid-2"><div>' + head(null, K.legalT) + "<dl>" + K.legal.map(l => "<dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd>").join("") + '</dl></div><div><div class="card" style="border:0;background:transparent"><div class="pic" style="aspect-ratio:4/3"><img src="' + base + 'img/boulevard.jpg" alt="" loading="lazy"></div></div><p class="note">' + (lang === "fr" ? "Boulevard du 30 juin, Kinshasa (Antoine Moens de Hase, CC BY 2.0)." : "Boulevard du 30 juin, Kinshasa (Antoine Moens de Hase, CC BY 2.0).") + "</p></div></div></section>";
}

const BUILDERS = { home, about, products, sites, sust, news, careers, suppliers, contact };
const TITLES = {
  fr: { home: ["Cimenterie du Fleuve SA · Ciment, béton et granulats à Matadi", "Producteur intégré de ciment CEM I et CEM II certifié OCC, béton prêt à l'emploi et granulats, à Matadi, Kongo Central, depuis 1974."], about: ["Qui sommes-nous", "Histoire, mission, direction et gouvernance de Cimenterie du Fleuve SA."], products: ["Produits", "Ciments CEM I 42,5 R, CEM II/A-L 42,5 N, CEM II/B-L 32,5 R, béton prêt à l'emploi et granulats. Fiches techniques."], sites: ["Sites et logistique", "Usine de Matadi, carrière de Luvu, terminal de Kinshasa, dépôts de Boma et Kikwit. Où acheter."], sust: ["Durabilité et sécurité", "Indicateurs de sécurité et d'environnement, communautés, mécanisme de plainte."], news: ["Actualités", "Communiqués et actualités de Cimenterie du Fleuve SA."], careers: ["Carrières", "Postes ouverts à Matadi, Kinshasa, Boma et Kikwit. Candidature en ligne."], suppliers: ["Fournisseurs et appels d'offres", "Consultations en cours, règles d'achat, référencement des fournisseurs."], contact: ["Contact", "Service commercial, devis, terminal de Kinshasa, presse, mentions légales."] },
  en: { home: ["Cimenterie du Fleuve SA · Cement, concrete and aggregates in Matadi", "Integrated producer of OCC-certified CEM I and CEM II cement, ready-mix concrete and aggregates, in Matadi, Kongo Central, since 1974."], about: ["Who we are", "History, mission, leadership and governance of Cimenterie du Fleuve SA."], products: ["Products", "CEM I 42.5 R, CEM II/A-L 42.5 N, CEM II/B-L 32.5 R cements, ready-mix concrete and aggregates. Datasheets."], sites: ["Sites and logistics", "Matadi plant, Luvu quarry, Kinshasa terminal, Boma and Kikwit depots. Where to buy."], sust: ["Sustainability and safety", "Safety and environmental indicators, communities, grievance mechanism."], news: ["News", "Releases and news from Cimenterie du Fleuve SA."], careers: ["Careers", "Open positions in Matadi, Kinshasa, Boma and Kikwit. Online application."], suppliers: ["Suppliers and tenders", "Open tenders, purchasing rules, supplier registration."], contact: ["Contact", "Sales desk, quotes, Kinshasa terminal, press, legal notice."] }
};

function build(outDir, opts) {
  const portfolioHome = (opts && opts.portfolioHome) || "../../index.html";
  fs.mkdirSync(path.join(outDir, "en"), { recursive: true });
  fs.mkdirSync(path.join(outDir, "img"), { recursive: true });
  let n = 0;
  for (const lang of ["fr", "en"]) {
    const base = lang === "en" ? "../" : "";
    for (const key of ["home", ...PAGES]) {
      const [t, d] = TITLES[lang][key];
      const title = key === "home" ? t : t + " · " + C.company.name;
      const html = layout(lang, key, { title, description: d, body: BUILDERS[key](lang, base), portfolioHome });
      fs.writeFileSync(path.join(outDir, lang === "en" ? "en" : "", FILES[lang][key]), html);
      n++;
    }
  }
  for (const f of ["style.css", "site.js"]) fs.copyFileSync(path.join(__dirname, f), path.join(outDir, f));
  for (const f of fs.readdirSync(path.join(__dirname, "img"))) fs.copyFileSync(path.join(__dirname, "img", f), path.join(outDir, "img", f));
  return n;
}
module.exports = { build };
if (require.main === module) console.log("wrote " + build(process.argv[2] || path.join(__dirname, "out"), { portfolioHome: process.argv[3] || "../../index.html" }) + " pages");

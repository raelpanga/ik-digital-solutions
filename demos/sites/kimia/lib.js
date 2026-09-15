/* Kimia Express site generator — shared helpers, page layout and reusable blocks. */
"use strict";
const C = require("./content.js");

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const L = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) && (lang in v)) ? v[lang] : v;
const KEYS = ["home", "send", "track", "pricing", "business", "network", "couriers", "help", "about"];
const FILES = {
  fr: { home: "index.html", send: "envoyer.html", track: "suivi.html", pricing: "tarifs.html", business: "entreprises.html", network: "reseau.html", couriers: "coursiers.html", help: "aide.html", about: "a-propos.html" },
  en: { home: "index.html", send: "send.html", track: "track.html", pricing: "pricing.html", business: "business.html", network: "network.html", couriers: "couriers.html", help: "help.html", about: "about.html" }
};
const href = (lang, key, base, hash) => base + (lang === "en" ? "en/" : "") + FILES[lang][key] + (hash || "");
const tel = n => "tel:" + n.replace(/\s/g, "");
const wa = n => "https://wa.me/" + n.replace(/\D/g, "");
const num = (n, lang) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB").replace(/ /g, " ");
const fc = (n, lang) => num(n, lang) + " FC";
const usd = (n, lang) => lang === "fr" ? "≈ " + Math.round(n / C.rate) + " USD" : "≈ USD " + Math.round(n / C.rate);
const fmtDate = (iso, lang) => new Date(iso + "T00:00:00").toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
const city = k => C.cities.find(c => c.key === k);
const pic = (base, f) => base + "img/" + f;
const days = (n, lang) => n === 0 ? (lang === "fr" ? "Le jour même" : "Same day") : (lang === "fr" ? "J+" + n : n + (n > 1 ? " days" : " day"));
const expressDays = c => c.mode === "road" ? Math.max(0, c.days - 1) : Math.max(1, c.days - 1);

const LOGO = '<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#0E5A43"/><path d="M13 10v20M13 21l11-11M17.5 17.5 27 30" stroke="#fff" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="30.5" cy="11.5" r="4" fill="#FF6A1A"/></svg>';
const FAVICON = "data:image/svg+xml," + encodeURIComponent(LOGO.replace(' class="mark"', ' xmlns="http://www.w3.org/2000/svg"').replace(' aria-hidden="true"', ""));

/* ---------- small pieces ---------- */
const head = (eyebrow, title, lead, extra) => '<div class="section-head' + (extra ? " row" : "") + '"><div>' + (eyebrow ? '<p class="eyebrow">' + esc(eyebrow) + "</p>" : "") + "<h2>" + esc(title) + "</h2>" + (lead ? '<p class="lead">' + esc(lead) + "</p>" : "") + "</div>" + (extra || "") + "</div>";
const note = t => '<p class="note">' + esc(t) + "</p>";
const field = (label, inner, cls) => '<label class="field' + (cls ? " " + cls : "") + '"><span>' + esc(label) + "</span>" + inner + "</label>";
const sel = (name, opts, attrs) => '<select name="' + name + '"' + (attrs || "") + ">" + opts.map(o => Array.isArray(o) ? '<option value="' + esc(o[0]) + '"' + (o[2] ? " selected" : "") + ">" + esc(o[1]) + "</option>" : "<option>" + esc(o) + "</option>").join("") + "</select>";
const cityOpts = (lang, selected) => C.cities.map(c => [c.key, c.n, c.key === selected]);
const communeOpts = (key, selected) => (city(key).communes || []).map(c => [c[0], c[0], c[0] === selected]);
const sizeOpts = (lang, selected) => C.sizes.map(s => [s.key, L(s.t, lang), s.key === selected]);
const plainCards = (items, cls) => '<div class="' + (cls || "grid-4") + '">' + items.map(v => '<div class="card plain"><h3>' + esc(v[0]) + "</h3><p>" + esc(v[1]) + "</p></div>").join("") + "</div>";
const kpiRow = (lang, items) => '<div class="kpi-row">' + items.map(k => '<div class="kpi"><b>' + esc(L(k.v, lang)) + "</b><span>" + esc(k[lang]) + "</span></div>").join("") + "</div>";
const docList = (lang, items, label) => '<ul class="docs">' + items.map(d => "<li><span>" + esc(d.t[lang]) + "<small>" + esc(d.m) + '</small></span><a class="btn btn-ghost btn-small" href="#" data-doc="' + esc(d.t[lang]) + '">' + esc(label) + "</a></li>").join("") + "</ul>";
const newsItem = (n, lang) => '<li data-cat="' + esc(n.cat[lang]) + '"><details><summary><span class="d">' + esc(fmtDate(n.d, lang)) + '</span><span class="t">' + esc(n.t[lang]) + '</span><span class="c">' + esc(n.cat[lang]) + '</span></summary><div class="body">' + n.b[lang].map(p => "<p>" + esc(p) + "</p>").join("") + "</div></details></li>";
const payChips = lang => '<ul class="pay-chips">' + C.payments.map(p => '<li class="pm-' + p.key + '"><i aria-hidden="true"></i>' + esc(L(p.n, lang)) + "</li>").join("") + "</ul>";
const figure = (base, img, cap, cls) => '<figure class="photo' + (cls ? " " + cls : "") + '"><img src="' + pic(base, img) + '" alt="" loading="lazy">' + (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") + "</figure>";

function pageHead(lang, base, o) {
  const U = C.ui[lang];
  return '<section class="phead"><div class="wrap phead-grid"><div class="phead-text"><nav class="crumbs" aria-label="' + (lang === "fr" ? "Fil d'Ariane" : "Breadcrumb") + '"><a href="' + href(lang, "home", base) + '">' + esc(U.common.home) + "</a><span aria-hidden=\"true\">/</span><span>" + esc(o.h1) + "</span></nav><h1>" + esc(o.h1) + '</h1><p class="lead">' + esc(o.lead) + "</p>" + (o.ctas ? '<div class="cta">' + o.ctas + "</div>" : "") + '</div><figure class="phead-pic"><img src="' + pic(base, o.img) + '" alt="">' + (o.cap ? "<figcaption>" + esc(o.cap) + "</figcaption>" : "") + "</figure></div></section>";
}

/* quick estimator + tracking widget (home and pricing) */
function quickWidget(lang, base, opts) {
  const Q = C.ui[lang].quick, o = opts || {};
  return '<div class="qw" data-qw>' +
    '<div class="qw-tabs" role="tablist"><button type="button" role="tab" aria-selected="true" data-tab="quote">' + esc(Q.tabQuote) + '</button><button type="button" role="tab" aria-selected="false" data-tab="track">' + esc(Q.tabTrack) + "</button></div>" +
    '<form class="qw-pane" data-pane="quote" data-quote action="' + href(lang, "send", base) + '" method="get">' +
    '<div class="frow">' + field(Q.from, sel("from", cityOpts(lang, "kin"), ' data-city="f"')) + field(Q.commune, sel("fc", communeOpts("kin", "Gombe"), ' data-commune="f"'), "commune") + "</div>" +
    '<div class="frow">' + field(Q.to, sel("to", cityOpts(lang, o.to || "kin"), ' data-city="t"')) + field(Q.commune, sel("tc", communeOpts(o.to || "kin", "Ngaliema"), ' data-commune="t"'), "commune") + "</div>" +
    '<div class="frow">' + field(Q.size, sel("size", sizeOpts(lang, "s"))) + field(Q.speed, sel("speed", [["std", Q.std, true], ["exp", Q.exp]])) + "</div>" +
    '<div class="qw-price" aria-live="polite"><div><small>' + esc(Q.price) + '</small><b data-q="total">' + fc(11000, lang) + '</b><span data-q="usd">' + usd(11000, lang) + '</span></div><div class="qw-eta" data-q="eta"></div></div>' +
    '<button class="btn btn-primary btn-block" type="submit">' + esc(Q.book) + '</button><p class="qw-note">' + esc(Q.note) + "</p></form>" +
    '<form class="qw-pane" data-pane="track" hidden action="' + href(lang, "track", base) + '" method="get">' + field(Q.trackLabel, '<input name="n" class="mono" placeholder="KX-2026-000000" autocomplete="off" required>') +
    '<button class="btn btn-dark btn-block" type="submit">' + esc(Q.trackBtn) + '</button><p class="qw-note">' + esc(Q.tryHint) + "</p></form></div>";
}

/* schematic network map: lon/lat projected onto a 580 × 580 box */
const P = (lon, lat) => [Math.round((lon - 12) * 28 + 20), Math.round((5.5 - lat) * 28 + 20)];
const OUTLINE = [[12.2, -6], [12.4, -5.7], [13, -4.8], [14, -4.4], [15.3, -4.2], [16.2, -3.2], [17, -1.5], [17.7, -0.5], [18.3, 1], [18.6, 3.5], [19.5, 5], [22.5, 4.2], [25, 5.2], [27.4, 5.1], [29, 4.4], [30.8, 3.5], [30.9, 2.2], [30.1, 1.2], [29.9, 0.1], [29.6, -1], [29.2, -1.6], [28.9, -2.5], [29.2, -3.3], [29.4, -5.5], [29.6, -6.8], [30.5, -8.2], [28.9, -8.5], [28.5, -9.4], [28.5, -10.6], [29, -11.8], [29.8, -12.2], [29.8, -13.4], [29, -13.4], [28, -12.5], [27.5, -12.2], [26, -11.9], [25.3, -11.2], [24, -11], [22.3, -11.1], [22.2, -9.9], [21.8, -8], [21.8, -7.3], [20.5, -7], [19.5, -8], [17.5, -8.1], [16.8, -7.2], [16.2, -5.9], [14, -5.9], [13.2, -5.9]];
const LABEL = { kin: "r", mat: "t", boma: "b", kik: "r", mbm: "r", kga: "l", goma: "l", buk: "l", lub: "r", kol: "l", kis: "t", mbk: "r" };
function networkMap(lang, compact) {
  const N = C.ui[lang].network, xy = k => { const c = city(k); return P(c.lon, c.lat); };
  const [kx, ky] = xy("kin");
  const line = (a, b, cls) => { const [x1, y1] = xy(a), [x2, y2] = xy(b); return '<line class="' + cls + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>'; };
  const arc = k => { const [x, y] = xy(k), mx = (kx + x) / 2, my = (ky + y) / 2, dx = x - kx, dy = y - ky; const cx = Math.round(mx + dy * 0.18), cy = Math.round(my - Math.abs(dx) * 0.18); return '<path class="m-air" d="M' + kx + " " + ky + " Q" + cx + " " + cy + " " + x + " " + y + '"/>'; };
  let s = '<svg class="netmap" viewBox="0 0 580 580" role="img" aria-label="' + esc(N.mapT) + '"><polygon class="m-land" points="' + OUTLINE.map(p => P(p[0], p[1]).join(",")).join(" ") + '"/>';
  s += C.cities.filter(c => c.mode === "air").map(c => arc(c.key)).join("");
  s += line("kin", "mat", "m-road") + line("mat", "boma", "m-road") + line("kin", "kik", "m-road");
  s += line("lub", "kol", "m-reg") + line("goma", "buk", "m-reg") + line("mbm", "kga", "m-reg");
  for (const c of C.cities) {
    const [x, y] = xy(c.key), side = LABEL[c.key], hub = c.key === "kin";
    const lx = side === "r" ? x + 11 : side === "l" ? x - 11 : x, ly = side === "t" ? y - 11 : side === "b" ? y + 20 : y + 5, anchor = side === "l" ? "end" : side === "r" ? "start" : "middle";
    s += hub ? '<circle class="m-hub-ring" cx="' + x + '" cy="' + y + '" r="15"/><circle class="m-hub" cx="' + x + '" cy="' + y + '" r="8"/>' : '<circle class="m-dot" cx="' + x + '" cy="' + y + '" r="5.5"/>';
    s += '<text class="m-lbl' + (hub ? " hub" : "") + '" x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '">' + esc(c.n) + "</text>";
  }
  s += '<text class="m-note" x="560" y="566" text-anchor="end">' + esc(N.schematic) + "</text></svg>";
  if (compact) return s;
  return s + '<div class="legend"><span><i class="lg-hub"></i>' + esc(N.legend.hub) + '</span><span><i class="lg-city"></i>' + esc(N.legend.city) + '</span><span><i class="lg-road"></i>' + esc(N.legend.road) + '</span><span><i class="lg-air"></i>' + esc(N.legend.air) + '</span><span><i class="lg-reg"></i>' + esc(N.legend.regional) + "</span></div>";
}

/* ---------- layout ---------- */
function layout(lang, key, o) {
  const U = C.ui[lang], base = lang === "en" ? "../" : "", other = lang === "fr" ? "en" : "fr";
  const brand = '<a class="brand" href="' + href(lang, "home", base) + '">' + LOGO + "<span><b>" + esc(C.company.name) + "</b><small>" + esc(C.company.tagline[lang]) + "</small></span></a>";
  const nav = U.nav.map(([k, label]) => '<a href="' + href(lang, k, base) + '"' + (k === key ? ' aria-current="page"' : "") + ">" + esc(label) + "</a>").join("");
  const langLink = l => '<a data-lang-link href="' + (lang === l ? "" : (l === "en" ? "en/" : "../")) + FILES[l][key] + '" hreflang="' + l + '" lang="' + l + '"' + (lang === l ? ' aria-current="true"' : "") + ">" + l.toUpperCase() + "</a>";
  const credits = C.credits.map(c => '<a href="' + c[3] + '" rel="noopener">' + esc(c[0]) + "</a> · " + esc(c[1]) + " (" + esc(c[2]) + ")").join(" ; ");
  const fcols = U.footer.cols.map(col => "<div><h4>" + esc(col[0]) + "</h4><ul>" + col[1].map(l => '<li><a href="' + href(lang, l[0], base, l[1]) + '">' + esc(l[2]) + "</a></li>").join("") + "</ul></div>").join("");
  return '<!doctype html>\n<html lang="' + lang + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + esc(o.title) + '</title>\n<meta name="description" content="' + esc(o.description) + '">\n' +
    '<link rel="alternate" hreflang="' + other + '" href="' + (lang === "fr" ? "en/" : "../") + FILES[other][key] + '">\n<link rel="icon" href="' + FAVICON + '">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">\n' +
    '<link rel="stylesheet" href="' + base + 'style.css">\n</head>\n<body data-page="' + key + '">\n' +
    '<a class="skip" href="#main">' + esc(U.skip) + "</a>\n" +
    '<div class="ikbar"><span><strong>' + esc(U.demoBar.split(" · ")[0]) + "</strong> · " + esc(U.demoBar.split(" · ").slice(1).join(" · ")) + '</span><a href="' + base + o.portfolioHome + '">' + esc(U.back) + "</a></div>\n" +
    '<div class="util"><div class="wrap"><span>' + esc(U.util.care) + ' · <a href="' + tel(C.company.phone) + '">' + esc(C.company.phone) + '</a><span class="hide-s"> · WhatsApp <a href="' + wa(C.company.whatsapp) + '" rel="noopener">' + esc(C.company.whatsapp) + '</a></span></span><span><a class="hide-s" href="' + href(lang, "about", base) + '">' + esc(U.util.about) + '</a><a class="hide-s" href="' + href(lang, "couriers", base, "#emplois") + '">' + esc(U.util.jobs) + '</a><span class="lang">' + langLink("fr") + langLink("en") + "</span></span></div></div>\n" +
    '<header class="site-header"><div class="wrap">' + brand + '<nav class="nav" id="nav" aria-label="' + esc(U.navLabel) + '">' + nav + '</nav><div class="head-cta"><a class="btn btn-ghost btn-small" href="' + href(lang, "track", base) + '"' + (key === "track" ? ' aria-current="page"' : "") + ">" + esc(U.cta.track) + '</a><a class="btn btn-primary btn-small" href="' + href(lang, "send", base) + '"' + (key === "send" ? ' aria-current="page"' : "") + ">" + esc(U.cta.send) + '</a><button class="navtoggle" id="navtoggle" type="button" aria-expanded="false" aria-controls="nav">' + esc(U.menu) + "</button></div></div></header>\n" +
    '<main id="main">\n' + o.body + "\n</main>\n" +
    '<footer><div class="wrap"><div class="fgrid"><div>' + brand + '<p class="fabout">' + esc(U.footer.about) + "</p><p>" + esc(C.company.hq[lang]) + '<br><a href="' + tel(C.company.phone) + '">' + esc(C.company.phone) + '</a> · <a href="mailto:' + C.company.email + '">' + esc(C.company.email) + "</a></p></div>" + fcols + "</div>" +
    payChips(lang) +
    '<div class="fbottom"><span>' + esc(U.footer.legal) + "</span><span>" + esc(U.footer.by) + ' <a href="' + base + o.portfolioHome + '">IK Digital Solutions</a></span></div>' +
    '<p class="credits">' + esc(U.footer.photos) + " " + credits + ". " + esc(U.footer.illus) + "</p></div></footer>\n" +
    '<div class="consent" id="consent" hidden><span>' + esc(U.consent.text) + ' <a href="' + href(lang, "help", base, "#mentions") + '">' + esc(U.consent.more) + '</a></span><span class="consent-btns"><button class="btn btn-primary btn-small" id="c-yes" type="button">' + esc(U.consent.yes) + '</button><button class="btn btn-ghost btn-small" id="c-no" type="button">' + esc(U.consent.no) + "</button></span></div>\n" +
    '<div id="modal"></div><div class="toast" id="toast" role="status" hidden></div>\n<script src="' + base + 'data.js" defer></script>\n<script src="' + base + 'site.js" defer></script>\n</body>\n</html>\n';
}

const faqList = (lang, items, id) => '<ul class="faq"' + (id ? ' id="' + id + '"' : "") + ">" + items.map(f => '<li data-cat="' + f.cat + '"><details><summary>' + esc(f.q[lang]) + '</summary><div class="body"><p>' + esc(f.a[lang]) + "</p></div></details></li>").join("") + "</ul>";

module.exports = { faqList, C, esc, L, KEYS, FILES, href, tel, wa, num, fc, usd, fmtDate, city, pic, days, expressDays, head, note, field, sel, cityOpts, communeOpts, sizeOpts, plainCards, kpiRow, docList, newsItem, payChips, figure, pageHead, quickWidget, networkMap, layout };

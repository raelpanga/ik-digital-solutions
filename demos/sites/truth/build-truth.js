// TRUTH Construction & Development: a real client, shown as a demonstration copy of
// the site as delivered. snapshot/ is the client's own build output, refreshed by
// sync.js and never edited here; this generator only adds what a copy on another
// domain needs, so the client's repository carries no portfolio code.
"use strict";
const fs = require("fs"), path = require("path");
const LIVE = "https://truth-construction.vercel.app/";
const SNAPSHOT = path.join(__dirname, "snapshot");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// The site translates itself from data-fr/data-en, which it assigns as innerHTML, so
// the attribute carries escaped HTML and the element carries the French rendering.
const both = (tag, fr, en, attrs = "") => `<${tag}${attrs} data-fr="${esc(fr)}" data-en="${esc(en)}">${fr}</${tag}>`;
const ARROW = "↗︎";

function copy(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dst, entry.name);
    if (entry.isDirectory()) copy(s, d); else fs.copyFileSync(s, d);
  }
}

function bar(back, backEn) {
  return '<div class="ikbar" role="note"><span>' +
    both("strong", "Copie de démonstration", "Demonstration copy") + " · " +
    both("span", "Site réalisé par IK Digital Solutions pour TRUTH Construction &amp; Development. Les boutons de contact sont désactivés.",
      "Built by IK Digital Solutions for TRUTH Construction &amp; Development. Contact buttons are disabled.") +
    '</span><span class="ikbar-links">' +
    both("a", "Site en ligne " + ARROW, "Live site " + ARROW, ` href="${LIVE}" target="_blank" rel="noopener"`) +
    both("a", "← Retour au projet", "← Back to the project", ` href="${esc(back)}" data-fr-href="${esc(back)}" data-en-href="${esc(backEn)}"`) +
    "</span></div>";
}

exports.build = (out, { portfolioHome, portfolioHomeEn }) => {
  if (!fs.existsSync(path.join(SNAPSHOT, "index.html"))) throw new Error("TRUTH snapshot missing: run node demos/sites/truth/sync.js <truth>/dist");
  copy(SNAPSHOT, out);
  fs.copyFileSync(path.join(__dirname, "style.css"), path.join(out, "portfolio-demo.css"));
  fs.copyFileSync(path.join(__dirname, "site.js"), path.join(out, "portfolio-demo.js"));
  const banner = bar(portfolioHome, portfolioHomeEn);
  let pages = 0;
  for (const file of fs.readdirSync(out).filter(f => f.endsWith(".html"))) {
    let html = fs.readFileSync(path.join(out, file), "utf8");
    // A full copy of a real company's site must not compete with it in search. The
    // canonical already names the live site; noindex keeps this copy out entirely,
    // and the business record belongs to the real site alone.
    html = html.replace(/<meta name="robots"[^>]*>/g, "")
      .replace("<head>", '<head><meta name="robots" content="noindex,nofollow">')
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
    // Loaded last so its rules win; a classic script still runs before the site's
    // deferred modules, which is what lets it set the language and catch contact links.
    html = html.replace("</head>", '<link rel="stylesheet" href="portfolio-demo.css"><script src="portfolio-demo.js"></script></head>');
    html = html.replace(/<body([^>]*)>/, (m, attrs) => `<body${attrs}>${banner}`);
    fs.writeFileSync(path.join(out, file), html);
    pages++;
  }
  return pages;
};

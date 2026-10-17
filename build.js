// Generate the bilingual portfolio and its independent demonstrations into docs/.
// Usage: node build.js --base-url https://iksolutions-inc.com/
"use strict";
const fs = require("fs"), path = require("path");
const { publicPath, finalizeUrls } = require("./site/urls");
global.window = {};
require("./assets/content.js");
const D = window.KDS;
D.config.web3formsKey = String(D.config.web3formsKey || "").trim();
D.config.googleSiteVerification = String(D.config.googleSiteVerification || "").trim();
D.config.googleSiteVerificationFile = String(D.config.googleSiteVerificationFile || "").trim();
if (D.config.googleSiteVerificationFile && !/^google[0-9a-f]+\.html$/.test(D.config.googleSiteVerificationFile)) throw new Error("config.googleSiteVerificationFile must look like google….html");
if (!D.config.web3formsKey) console.warn("Warning: config.web3formsKey is empty in assets/content.js. The contact form cannot deliver inquiries until a Web3Forms access key is set.");
const concepts = require("./site/concepts");
D.projects.push(...concepts.projects);
const arg = name => { const i = process.argv.indexOf(name); return i < 0 ? null : process.argv[i + 1]; };
const SITE_URL = (arg("--base-url") || "").replace(/\/+$/, "") + (arg("--base-url") ? "/" : "");
const OUT = path.resolve(__dirname, "docs");
const Site = require("./site/pages")(D, SITE_URL);
const { services, projectServices } = require("./site/content");
const SITE_SLUGS = { kando: "kando-ressources", fleuve: "site-corporate", kimia: "kimia-express", truth: "truth-construction" };

// Validate source dependencies before replacing generated output.
for (const p of D.projects) {
  if (!projectServices[p.slug]?.every(key => services.some(s => s.key === key))) throw new Error("Missing service assignment: " + p.slug);
  for (const kind of ["desktop", "mobile"]) fs.accessSync(path.join(__dirname, "shots", p.slug + "-" + kind + "." + (p.shotExt || "png")));
}
const generators = Object.entries(SITE_SLUGS).map(([name, slug]) => {
  const dir = path.join(__dirname, "demos", "sites", name);
  for (const file of ["build-" + name + ".js", "style.css", "site.js"]) fs.accessSync(path.join(dir, file));
  return { slug, generate: require(path.join(dir, "build-" + name + ".js")).build };
});
generators.push({ slug: "concepts", generate: require("./demos/sites/concepts/build-concepts.js").build, collection: true });
// OUT is a fixed, resolved child of this repository; never delete a caller-supplied path.
if (OUT !== path.join(path.resolve(__dirname), "docs")) throw new Error("Unexpected output path");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const write = (rel, text) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };
const copyDir = (src, dst) => {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === "raw") continue;
    const s = path.join(src, entry.name), d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
};
copyDir(path.join(__dirname, "shots"), path.join(OUT, "shots"));
copyDir(path.join(__dirname, "demos", "assets"), path.join(OUT, "demos", "assets"));
for (const f of ["style.css", "visual.css", "site.js", "favicon.svg", "favicon-32.png", "apple-touch-icon.png"]) write("assets/" + f, fs.readFileSync(path.join(__dirname, "assets", f)));
write("favicon.ico", fs.readFileSync(path.join(__dirname, "assets", "favicon.ico")));
copyDir(path.join(__dirname, "assets", "media"), path.join(OUT, "assets", "media"));
write(".nojekyll", "");
// Search Console "HTML file" verification: Google fetches /<name> and expects this exact body.
if (D.config.googleSiteVerificationFile) write(D.config.googleSiteVerificationFile, "google-site-verification: " + D.config.googleSiteVerificationFile + "\n");
if (arg("--cname")) write("CNAME", arg("--cname").trim() + "\n");
// Portfolio pages only: demonstrations are built below but stay out of the sitemap.
const pages = [];
let demoPages = 0;
for (const lang of ["fr", "en"]) {
  for (const [key, route] of Object.entries(Site.routes)) { write(route[lang], Site.page(key, lang)); pages.push(route[lang]); }
  for (const p of D.projects) { const route = Site.projectRoute(p, lang); write(route, Site.projectPage(p, lang)); pages.push(route); }
}
// Demos are French unless their interface reproduces an English-language production tool.
const DEMO_LANG = { "macclay-wedding-tracker": "en", "genos-rentals": "en" };
function wrapDemo(src, slug) {
  const fragment = fs.readFileSync(src, "utf8"), marker = "<!-- /head -->", i = fragment.indexOf(marker);
  const head = i < 0 ? "" : fragment.slice(0, i), body = i < 0 ? fragment : fragment.slice(i + marker.length);
  // Preserve the demos' page content; return links now lead to their project story.
  // The interface language is the demo's own; the return link always leads to the site's default.
  const lang = DEMO_LANG[slug] || "fr";
  const back = "../../projets/" + slug + ".html";
  return ('<!doctype html>\n<html lang="' + lang + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' + head + '</head><body>' + body + '</body></html>\n').replace(/href="\.\.\/\.\.\/index\.html(?:#[^"]*)?"/g, 'href="' + back + '"');
}
for (const f of fs.readdirSync(path.join(__dirname, "demos", "src"))) {
  if (!f.endsWith(".html")) continue;
  const slug = f.slice(0, -5);
  write("demos/" + slug + "/index.html", wrapDemo(path.join(__dirname, "demos", "src", f), slug));

}
for (const { slug, generate, collection } of generators) {
  const n = generate(path.join(OUT, "demos", collection ? "" : slug), { portfolioHome: "../../projets/" + slug + ".html", portfolioHomeEn: "../../en/projects/" + slug + ".html", siteUrl: SITE_URL, publicBase: "/demos/" + slug });
  console.log("Demo " + slug + ": " + n + " pages");
}
// Demonstrations stay crawlable (robots.txt allows them, so the directive is seen) but are never indexed or listed in the sitemap.
const noindexDemos = dir => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, entry.name);
    if (entry.isDirectory()) noindexDemos(f);
    else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(f, "utf8");
      if (!/<meta name="robots"/i.test(html)) fs.writeFileSync(f, html.replace(/<head\b[^>]*>/i, m => m + '<meta name="robots" content="noindex">'));
      demoPages++;
    }
  }
};
noindexDemos(path.join(OUT, "demos"));
write("404.html", Site.layout({ lang: "fr", route: "404.html", alternate: "404.html", key: "404", noindex: true, title: "Page introuvable", description: "Cette page n'existe pas.", body: '<section class="section"><div class="wrap"><h1>Page introuvable</h1><p><a href="index.html">Retour à l’accueil</a> · <a href="en/index.html">English home</a></p></div></section>' }).replace('<head>', '<head><base href="' + (SITE_URL || "/") + '">'));
finalizeUrls(OUT, SITE_URL);
if (SITE_URL) {
  write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(p => '  <url><loc>' + SITE_URL.replace(/\/$/, "") + publicPath("/" + p) + '</loc></url>').join("\n") + '\n</urlset>\n');
}
write("robots.txt", "User-agent: *\nAllow: /\n" + (SITE_URL ? "Sitemap: " + SITE_URL + "sitemap.xml\n" : ""));
console.log("Built " + pages.length + " portfolio pages + " + demoPages + " demo pages + 404 in docs/");

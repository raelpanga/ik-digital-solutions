// Generate the bilingual portfolio and its independent demonstrations into docs/.
// Usage: node build.js --base-url https://iksolutions-inc.com/ --cname iksolutions-inc.com
"use strict";
const fs = require("fs"), path = require("path");
global.window = {};
require("./assets/content.js");
const D = window.KDS;
const arg = name => { const i = process.argv.indexOf(name); return i < 0 ? null : process.argv[i + 1]; };
const SITE_URL = (arg("--base-url") || "").replace(/\/+$/, "") + (arg("--base-url") ? "/" : "");
const OUT = path.resolve(__dirname, "docs");
const Site = require("./site/pages")(D, SITE_URL);
const { services, projectServices } = require("./site/content");
const SITE_SLUGS = { kando: "kando-ressources", fleuve: "site-corporate", kimia: "kimia-express" };
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
for (const f of ["style.css", "visual.css", "site.js", "favicon.svg"]) write("assets/" + f, fs.readFileSync(path.join(__dirname, "assets", f)));
copyDir(path.join(__dirname, "assets", "media"), path.join(OUT, "assets", "media"));
write(".nojekyll", "");
if (arg("--cname")) write("CNAME", arg("--cname").trim() + "\n");
const pages = [];
for (const lang of ["fr", "en"]) {
  for (const [key, route] of Object.entries(Site.routes)) { write(route[lang], Site.page(key, lang)); pages.push(route[lang]); }
  for (const p of D.projects) { const route = Site.projectRoute(p, lang); write(route, Site.projectPage(p, lang)); pages.push(route); }
}
function wrapDemo(src, slug) {
  const fragment = fs.readFileSync(src, "utf8"), marker = "<!-- /head -->", i = fragment.indexOf(marker);
  const head = i < 0 ? "" : fragment.slice(0, i), body = i < 0 ? fragment : fragment.slice(i + marker.length);
  // Preserve the demos' page content; return links now lead to their project story.
  const back = "../../projets/" + slug + ".html";
  return ('<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' + head + '</head><body>' + body + '</body></html>\n').replace(/href="\.\.\/\.\.\/index\.html(?:#[^"]*)?"/g, 'href="' + back + '"');
}
for (const f of fs.readdirSync(path.join(__dirname, "demos", "src"))) {
  if (!f.endsWith(".html")) continue;
  const slug = f.slice(0, -5);
  write("demos/" + slug + "/index.html", wrapDemo(path.join(__dirname, "demos", "src", f), slug));
  pages.push("demos/" + slug + "/");
}
for (const { slug, generate } of generators) {
  const n = generate(path.join(OUT, "demos", slug), { portfolioHome: "../../projets/" + slug + ".html", portfolioHomeEn: "../../en/projects/" + slug + ".html" });
  const add = dir => {
    for (const entry of fs.readdirSync(path.join(OUT, dir), { withFileTypes: true })) {
      const rel = dir + "/" + entry.name;
      if (entry.isDirectory()) add(rel); else if (entry.name.endsWith(".html")) pages.push(rel.replace(/index\.html$/, ""));
    }
  };
  add("demos/" + slug);
  console.log("Demo " + slug + ": " + n + " pages");
}
write("404.html", Site.layout({ lang: "fr", route: "404.html", alternate: "404.html", key: "404", title: "Page introuvable", description: "Cette page n'existe pas.", body: '<section class="section"><div class="wrap"><h1>Page introuvable</h1><p><a href="index.html">Retour à l’accueil</a> · <a href="en/index.html">English home</a></p></div></section>' }).replace('<head>', '<head><base href="' + (SITE_URL || "/") + '">'));
if (SITE_URL) {
  write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(p => '  <url><loc>' + SITE_URL + p + '</loc></url>').join("\n") + '\n</urlset>\n');
}
write("robots.txt", "User-agent: *\nAllow: /\n" + (SITE_URL ? "Sitemap: " + SITE_URL + "sitemap.xml\n" : ""));
console.log("Built " + pages.length + " pages + 404 in docs/");

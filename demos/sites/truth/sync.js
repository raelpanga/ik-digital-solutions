// Refreshes snapshot/ from the client's built site. Run after rebuilding TRUTH:
//   node demos/sites/truth/sync.js "<path to truth-construction>/dist"
// Search files and a dead build artefact are left out: the copy is noindex.
"use strict";
const fs = require("fs"), path = require("path");
const src = process.argv[2], dst = path.join(__dirname, "snapshot");
if (!src || !fs.existsSync(path.join(src, "index.html"))) { console.error("usage: node sync.js <truth>/dist"); process.exit(1); }
const skip = new Set(["sitemap.xml", "robots.txt", "CNAME", path.join("scripts", "projects.json")]);
fs.rmSync(dst, { recursive: true, force: true });
let files = 0;
(function copy(from, rel) {
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const r = path.join(rel, e.name);
    if (skip.has(r)) continue;
    if (e.isDirectory()) copy(path.join(from, e.name), r);
    else { fs.mkdirSync(path.join(dst, rel), { recursive: true }); fs.copyFileSync(path.join(from, e.name), path.join(dst, r)); files++; }
  }
})(src, "");
console.log("snapshot: " + files + " files from " + src);

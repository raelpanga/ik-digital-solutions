"use strict";
const fs = require("fs"), path = require("path");

// Public addresses are independent of the HTML filenames used by the generators.
const publicPath = value => value.replace(/(?:^|\/)index\.html$/, "/").replace(/\.html$/, "").replace(/\/$/, "") || "/";
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});

function finalizeUrls(root, siteUrl) {
  const files = walk(root);
  const paths = new Set(files.map(file => "/" + path.relative(root, file).replace(/\\/g, "/")));
  const origin = new URL(siteUrl || "https://portfolio.local/").origin;
  for (const file of files.filter(file => file.endsWith(".html"))) {
    const route = "/" + path.relative(root, file).replace(/\\/g, "/");
    const rewrite = value => {
      if (!value || value.startsWith("#")) return value;
      let url;
      try { url = new URL(value.replace(/&amp;/g, "&"), origin + route); } catch { return value; }
      if (url.origin !== origin) return value;
      let target = decodeURIComponent(url.pathname);
      if (!paths.has(target)) {
        const index = target.replace(/\/$/, "") + "/index.html";
        if (paths.has(index)) target = index;
        else if (paths.has(target + ".html")) target += ".html";
        else return value;
      }
      const address = publicPath(target) + url.search + url.hash;
      // Root-relative assets keep working when an index page loses its trailing slash.
      return (/^(?:https?:)?\/\//.test(value) ? origin : "") + address.replace(/&/g, "&amp;");
    };
    let html = fs.readFileSync(file, "utf8");
    html = html.replace(/\b(href|src|poster|action|data-img|content)=("[^"]*"|'[^']*')/g, (match, attr, quoted) => {
      const quote = quoted[0];
      return attr + "=" + quote + rewrite(quoted.slice(1, -1)) + quote;
    });
    html = html.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g, (match, quote, value) => "url(" + quote + rewrite(value) + quote + ")");
    fs.writeFileSync(file, html);
  }
}

module.exports = { publicPath, finalizeUrls };

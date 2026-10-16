"use strict";
const fs = require("fs"), path = require("path");
const { publicPath } = require("../site/urls");

function resolveFile(root, pathname) {
  let file = path.resolve(root, "." + decodeURIComponent(pathname));
  if (file !== root && !file.startsWith(root + path.sep)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
  return file;
}

// Match Vercel's clean URLs in local browser checks, including old-link redirects.
function handler(root) {
  return (req, res) => {
    const url = new URL(req.url, "http://localhost");
    let file = resolveFile(root, url.pathname);
    if (!file) { res.writeHead(403).end(); return; }
    if (!fs.existsSync(file)) { file = path.join(root, "404.html"); res.statusCode = 404; }
    else if (file.endsWith(".html")) {
      const canonical = publicPath("/" + path.relative(root, file).replace(/\\/g, "/"));
      if (url.pathname !== canonical) { res.writeHead(308, { Location: canonical + url.search }).end(); return; }
    }
    res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4" })[path.extname(file)] || "application/octet-stream");
    fs.createReadStream(file).pipe(res);
  };
}
module.exports = { resolveFile, handler };

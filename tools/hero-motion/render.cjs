// Render the original hero device composition to a poster and H.264 MP4.
// Requires Playwright and Chrome. Use --poster-only while refining the scene.
"use strict";
const fs = require("node:fs"), http = require("node:http"), path = require("node:path");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "../..");
const out = path.join(root, "assets", "media");
const posterOnly = process.argv.includes("--poster-only");
const mime = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };
const server = http.createServer((request, response) => {
  const filename = path.resolve(root, "." + decodeURIComponent(new URL(request.url, "http://localhost").pathname));
  if (!filename.startsWith(root + path.sep) || !fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
    response.writeHead(404).end(); return;
  }
  response.setHeader("Content-Type", mime[path.extname(filename)] || "application/octet-stream");
  fs.createReadStream(filename).pipe(response);
});
(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1120, height: 980 }, deviceScaleFactor: 1, acceptDownloads: true });
    const errors = []; page.on("pageerror", error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/tools/hero-motion/scene.html`, { waitUntil: "load" });
    await page.evaluate(() => window.sceneReady);
    let download = page.waitForEvent("download");
    await page.evaluate(() => window.savePoster());
    await (await download).saveAs(path.join(out, "hero-devices-poster.webp"));
    if (!posterOnly) {
      download = page.waitForEvent("download", { timeout: 30000 });
      await page.evaluate(() => window.recordVideo());
      await (await download).saveAs(path.join(out, "hero-devices.mp4"));
    }
    if (errors.length) throw new Error(errors.join("\n"));
    for (const name of ["hero-devices-poster.webp", ...(!posterOnly ? ["hero-devices.mp4"] : [])]) {
      const file = path.join(out, name);
      console.log(`${name}: ${fs.statSync(file).size} bytes`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());

// Browser checks for the portfolio architecture. Requires Playwright and Chrome.
// Run after build.js. Optional --screenshots writes review images to the OS temp folder.
"use strict";
const fs = require("fs"), path = require("path"), http = require("http"), os = require("os"), assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { routes, services, projectServices } = require("./site/content");
global.window = {}; require("./assets/content");
const projects = window.KDS.projects, root = path.join(__dirname, "docs");
const server = http.createServer((req, res) => {
  let file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) { file = path.join(root, "404.html"); res.statusCode = 404; }
  res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" })[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
});
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const decode = s => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
(async () => {
  // Verify all generated portfolio references without contacting client systems.
  const portfolio = walk(root).filter(f => f.endsWith(".html") && !f.includes(path.sep + "demos" + path.sep) && !f.endsWith("404.html"));
  let references = 0;
  for (const file of portfolio) {
    const relative = path.relative(root, file).replace(/\\/g, "/"), html = fs.readFileSync(file, "utf8");
    for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(decode(m[1]), "https://test.local/" + relative);
      if (url.origin !== "https://test.local") continue;
      let target = path.join(root, decodeURIComponent(url.pathname));
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
      assert.ok(fs.existsSync(target), relative + " has missing link " + m[1]);
      if (url.hash && target.endsWith(".html")) assert.ok(fs.readFileSync(target, "utf8").includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), relative + " has missing fragment " + m[1]);
      references++;
    }
  }
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(new Set(locations).size, locations.length, "Duplicate sitemap routes");
  assert.equal(locations.length, walk(root).filter(f => f.endsWith(".html") && !f.endsWith("404.html")).length);
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
    page.setDefaultTimeout(10000);
    const errors = []; page.on("pageerror", e => errors.push(e.message));
    page.on("response", r => { if (r.url().startsWith(origin) && r.status() >= 400) errors.push(r.status() + " " + r.url()); });
    const goto = route => page.goto(origin + "/" + route, { waitUntil: "domcontentloaded" });
    for (const lang of ["fr", "en"]) {
      const other = lang === "fr" ? "en" : "fr";
      for (const [key, urls] of Object.entries(routes)) {
        await goto(urls[lang]);
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal(await page.locator("body").getAttribute("data-page"), key);
        assert.equal(await page.locator("#main-nav a").count(), 5);
        if (key !== "home" && !["privacy", "legal"].includes(key)) assert.equal(await page.locator('#main-nav [aria-current="page"]').count(), 1);
        await page.locator(`[data-language][lang="${other}"]`).click();
        assert.equal(new URL(page.url()).pathname, "/" + urls[other]);
        assert.equal(await page.locator("html").getAttribute("lang"), other);
      }
      console.log("Page pairs and navigation: " + lang);
      for (const p of projects) {
        const route = (lang === "fr" ? "projets/" : "en/projects/") + p.slug + ".html";
        await goto(route);
        const expected = p.liveUrl || p.demoUrls?.[lang] || p.demoUrl;
        const actual = await page.locator(".spec .actions .btn-primary").getAttribute("href");
        assert.equal(new URL(actual, page.url()).href, /^https?:/.test(expected) ? expected : origin + "/" + expected);
        await page.locator(`[data-language][lang="${other}"]`).click();
        assert.equal(await page.locator("body").getAttribute("data-page"), "project:" + p.slug);
      }
      await goto(routes.home[lang]);
      assert.equal(await page.locator(".selected-work .work-card").count(), 9);
      assert.equal(await page.locator(".offer-card").count(), 6);
      assert.equal(await page.locator(".pill-client,.pill-demo").count(), 0);
      assert.equal(await page.locator(".integration-brands img").count(), 4);
      for (const key of ["payments", "whatsapp"]) {
        await goto(routes[key][lang]);
        assert.ok(!/\d[\d ,–-]*\sUSD|USD\s[\d]/.test(await page.locator("main").innerText()));
        await page.locator('#contact a[href*="service=' + key + '"]').click();
        assert.equal(await page.locator("#f-service").inputValue(), key);
      }
      await goto(routes.work[lang]);
      assert.equal(await page.locator(".work-card:visible").count(), 9);
      await page.locator("#work-service").selectOption("websites"); assert.equal(await page.locator(".work-card:visible").count(), 4);
      await page.locator(`[data-language][lang="${other}"]`).click();
      assert.equal(await page.locator("#work-service").inputValue(), "websites");
      await page.locator("#work-service").selectOption("hosting"); assert.ok(await page.locator("#work-empty").isVisible());
      await goto(routes.commerce[lang]);
      await page.locator('#contact a[href*="service=commerce"]').click();
      assert.equal(await page.locator("#f-service").inputValue(), "commerce");
      await page.locator("#f-project").selectOption("kimia-express");
      await page.locator(`[data-language][lang="${other}"]`).click();
      assert.equal(await page.locator("#f-service").inputValue(), "commerce"); assert.equal(await page.locator("#f-project").inputValue(), "kimia-express");
      await page.locator("#f-name").fill("Test visitor"); await page.locator("#f-need").fill("Example inquiry only");
      // Capture the prepared message locally: no message or request is sent to WhatsApp.
      await page.evaluate(() => { window.open = url => { window.__preparedMessage = url; }; });
      await page.locator("#f-whatsapp").click();
      const message = await page.evaluate(() => window.__preparedMessage);
      assert.ok(new URL(message).searchParams.get("text").includes("Kimia Express"));
      assert.ok(new URL(message).searchParams.get("text").includes("Example inquiry only"));
      assert.ok(!page.url().includes("Test"), "Personal contact fields must not enter the URL");
      await goto(routes.contact[lang] + "?service=invalid&project=%3Cscript%3E");
      assert.equal(await page.locator("#f-service").inputValue(), ""); assert.equal(await page.locator("#f-project").inputValue(), "");
      // All bilingual demos must return to the corresponding project story.
      for (const p of projects.filter(p => p.demoUrls?.en)) {
        await goto(p.demoUrls[lang]);
        await page.locator(".ikbar a").click();
        assert.equal(new URL(page.url()).pathname, "/" + (lang === "fr" ? "projets/" : "en/projects/") + p.slug + ".html");
      }
      console.log("Projects, filters, inquiry context and demo returns: " + lang);
    }
    const noJS = await browser.newPage({ javaScriptEnabled: false });
    await noJS.goto(origin + "/projets/index.html"); assert.equal(await noJS.locator(".work-card:visible").count(), 9);
    await noJS.goto(origin + "/contact.html");
    assert.ok((await noJS.locator("#contact-form").getAttribute("action")).startsWith("mailto:"));
    assert.equal(await noJS.locator("#contact-form").getAttribute("method"), "post");
    await noJS.close();
    await page.setViewportSize({ width: 390, height: 844 });
    for (const file of portfolio) {
      await goto(path.relative(root, file).replace(/\\/g, "/"));
      const dimensions = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: innerWidth }));
      assert.ok(dimensions.actual <= dimensions.viewport, "Overflow: " + page.url() + " " + JSON.stringify(dimensions));
      await page.locator(".nav-toggle").click(); assert.ok(await page.locator("#main-nav").isVisible());
      await page.keyboard.press("Escape"); assert.equal(await page.locator(".nav-toggle").getAttribute("aria-expanded"), "false");
    }
    for (const anchor of ["services", "projets", "preuves", "methode", "conformite", "tarifs", "contact"]) {
      await goto("index.html#" + anchor); assert.equal(await page.locator("#" + anchor).count(), 1);
    }
    if (process.argv.includes("--screenshots")) {
      const dest = path.join(os.tmpdir(), "ik-architecture-preview"); fs.mkdirSync(dest, { recursive: true });
      for (const [kind, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
        await page.setViewportSize({ width, height });
        for (const key of ["home", "services", "work", "commerce", "contact"]) {
          await goto(routes[key].fr); await page.evaluate(() => document.fonts.ready);
          await page.evaluate(async () => {
            const images = [...document.images]; images.forEach(image => image.loading = "eager");
            await Promise.all(images.map(image => image.decode()));
          });
          await page.screenshot({ path: path.join(dest, key + "-" + kind + ".png"), fullPage: true, animations: "disabled" });
          if (key === "home") await page.screenshot({ path: path.join(dest, key + "-" + kind + "-top.png"), animations: "disabled" });
        }
      }
      console.log("Review screenshots: " + dest);
    }
    assert.deepEqual(errors, []);
    console.log(`PASS: ${portfolio.length} portfolio pages, ${references} local references, ${locations.length} sitemap routes, language pairs, mobile menus, filters, inquiry context and demo returns.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => server.close());

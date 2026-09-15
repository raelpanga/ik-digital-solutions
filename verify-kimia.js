// Run after build.js. Requires Playwright (set NODE_PATH to its package directory).
// Tests served docs, page/asset/fragment links, bilingual navigation and demo actions.
// Pass --screenshots to refresh the two portfolio card images.
"use strict";
const fs = require("fs"), path = require("path"), http = require("http"), assert = require("node:assert/strict");
const { chromium } = require("playwright");
const root = path.join(__dirname, "docs"), K = require("./demos/sites/kimia/lib");
const server = http.createServer((req, res) => {
  let file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" };
  res.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream"); fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  console.log("Launching headless Chrome; serving " + origin);
  const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 20000 });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.setDefaultTimeout(10000);
    const errors = []; page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(response.status() + " " + response.url()); });
    let links = 0;
    for (const lang of ["fr", "en"]) {
      for (const key of K.KEYS) {
        const route = "/demos/kimia-express/" + (lang === "en" ? "en/" : "") + K.FILES[lang][key];
        console.log("Checking " + route);
        await page.goto(origin + route);
        assert.equal(await page.locator("html").getAttribute("lang"), lang);
        assert.equal(await page.locator("body").getAttribute("data-page"), key);
        const refs = await page.locator("a[href],link[href],img[src],script[src],form[action]").evaluateAll(els => els.map(el => el.href || el.src || el.action));
        for (const ref of refs) {
          const u = new URL(ref); if (u.origin !== origin) continue;
          let file = path.join(root, decodeURIComponent(u.pathname));
          if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
          assert.ok(fs.existsSync(file), `${route}: missing ${u.pathname}`);
          if (u.hash && path.extname(file) === ".html") {
            const html = fs.readFileSync(file, "utf8"), id = decodeURIComponent(u.hash.slice(1));
            assert.ok(html.includes('id="' + id + '"') || html.includes("id='" + id + "'"), `${route}: missing fragment ${u.pathname}${u.hash}`);
          }
          links++;
        }
        const other = lang === "fr" ? "en" : "fr";
        await page.locator(`[data-lang-link][lang="${other}"]`).click();
        assert.equal(await page.locator("html").getAttribute("lang"), other);
        assert.equal(await page.locator("body").getAttribute("data-page"), key);
      }
      const base = origin + "/demos/kimia-express/" + (lang === "en" ? "en/" : "");
      await page.goto(base); if (await page.locator("#c-no").isVisible()) await page.locator("#c-no").click();
      const price = page.locator('[data-q="total"]'); assert.match(await price.textContent(), /11\D*000/);
      await page.locator('[data-quote] [name="to"]').selectOption("lub"); assert.match(await price.textContent(), /55\D*000/);
      await page.locator('[data-tab="track"]').click(); assert.ok(await page.locator('[data-pane="track"]').isVisible());
      await page.goto(base + K.FILES[lang].send);
      await page.locator('[data-wiz="next"]').click();
      for (const [name, v] of Object.entries({ sName: "Demo sender", sPhone: "+243812345678", sAddr: "Demo origin", rName: "Demo recipient", rPhone: "+243812345679", rAddr: "Demo destination" })) await page.locator(`[name="${name}"]`).fill(v);
      await page.locator('[data-wiz="next"]').click(); await page.locator('[data-wiz="next"]').click();
      await page.locator('[name="pm"][value="cash"]').check(); await page.locator('[data-wiz="confirm"]').click();
      assert.ok(await page.locator('[data-out="done"]').isVisible());
      await page.locator('[data-out="done"] a').first().click(); assert.match(await page.locator("#track-out").textContent(), /KX-\d{4}-\d{6}/);
      for (const shipment of K.C.shipments) { await page.locator(`[data-track="${shipment.id}"]`).click(); assert.ok((await page.locator("#track-out").textContent()).includes(shipment.id)); }
      const other = lang === "fr" ? "en" : "fr";
      await page.locator(`[data-lang-link][lang="${other}"]`).click(); assert.ok(page.url().includes("n=KX-")); assert.match(await page.locator("#track-out").textContent(), /KX-2026-190377/);
      await page.goto(base + K.FILES[lang].network); await page.locator("#relay-city").selectOption("kin");
      assert.ok(await page.locator('#relay-list > li[data-city="kin"]:visible').count() > 0); assert.equal(await page.locator('#relay-list > li:not([data-city="kin"]):visible').count(), 0);
      await page.goto(base + K.FILES[lang].pricing); await page.locator('#vol-form button').click(); assert.ok(await page.locator("#vol-out").isVisible());
      await page.goto(base + K.FILES[lang].help); await page.locator("#faq-q").fill("zzzzzz"); assert.ok(await page.locator("#faq-empty").isVisible());
      await page.locator("[data-doc]").first().click(); assert.ok(await page.locator("dialog").isVisible()); await page.keyboard.press("Escape");
    }
    for (const [route, expected] of [["/projets/kimia-express.html", "/demos/kimia-express/"], ["/en/projects/kimia-express.html", "/demos/kimia-express/en/"]]) {
      await page.goto(origin + route); await page.locator(".spec .actions .btn-primary").click(); assert.equal(new URL(page.url()).pathname, expected);
    }
    await page.setViewportSize({ width: 430, height: 900 });
    for (const lang of ["fr", "en"]) for (const key of K.KEYS) {
      await page.goto(origin + "/demos/kimia-express/" + (lang === "en" ? "en/" : "") + K.FILES[lang][key]);
      const overflow = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth, elements: [...document.querySelectorAll("body *")].filter(el => el.getBoundingClientRect().right > innerWidth + 1).slice(0, 12).map(el => el.tagName + "." + el.className) }));
      if (overflow.width > overflow.viewport) await page.screenshot({ path: path.join(__dirname, ".kimia-mobile-debug.png") });
      assert.ok(overflow.width <= overflow.viewport, `Mobile overflow: ${lang}/${key} ${JSON.stringify(overflow)}`);
      await page.locator("#navtoggle").click(); assert.equal(await page.locator("#navtoggle").getAttribute("aria-expanded"), "true");
      assert.ok(await page.locator("#nav").isVisible()); await page.keyboard.press("Escape");
    }
    if (process.argv.includes("--screenshots")) {
      await page.goto(origin + "/demos/kimia-express/");
      await page.evaluate(() => document.fonts.ready);
      for (const [name, width, height] of [["desktop", 1280, 800], ["mobile", 430, 900]]) {
        await page.setViewportSize({ width, height }); await page.screenshot({ path: path.join(__dirname, "shots", `kimia-express-${name}.png`), animations: "disabled" });
      }
    }
    assert.deepEqual(errors, []);
    console.log(`PASS: 18 pages, ${links} local references, 18 language switches, portfolio entry points, FR/EN booking and tracking, filters, documents, mobile navigation and overflow.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => server.close());

// Browser checks for the portfolio architecture. Requires Playwright and Chrome.
// Run after build.js. Optional --screenshots writes review images to the OS temp folder.
"use strict";
const fs = require("fs"), path = require("path"), http = require("http"), os = require("os"), assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { routes, services, projectServices } = require("./site/content");
global.window = {}; require("./assets/content");
window.KDS.projects.push(...require("./site/concepts").projects);
const projects = window.KDS.projects, root = path.join(__dirname, "docs");
const { publicPath } = require("./site/urls");
const { resolveFile, handler } = require("./tools/static-server");
const server = http.createServer(handler(root));
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const decode = s => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const PAY = /\d[\d ,.]*\s?(USD|CDF|FC|\$|%)|\b(commissions?|primes?|salaire|rémunération|bonus|salary|salaries)\b/i;
(async () => {
  // Verify all generated portfolio references without contacting client systems.
  // The Search Console verification file is a bare token, not a page.
  const portfolio = walk(root).filter(f => f.endsWith(".html") && !f.includes(path.sep + "demos" + path.sep) && !f.endsWith("404.html") && !/[\\/]google[0-9a-f]+\.html$/.test(f));
  let references = 0;
  for (const file of portfolio) {
    const relative = path.relative(root, file).replace(/\\/g, "/"), html = fs.readFileSync(file, "utf8");
    for (const anchor of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) {
      const label = decode(anchor[1].replace(/<[^>]*>/g, ""));
      assert.ok(!/[↗→←↓↑]/.test(label), relative + " has an arrow in link text: " + label.trim());
    }
    for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(decode(m[1]), "https://test.local/" + relative);
      if (url.origin !== "https://test.local") continue;
      const target = resolveFile(root, url.pathname);
      assert.ok(fs.existsSync(target), relative + " has missing link " + m[1]);
      if (url.hash && target.endsWith(".html")) assert.ok(fs.readFileSync(target, "utf8").includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), relative + " has missing fragment " + m[1]);
      references++;
    }
  }
  // Head metadata and structured data: unique, sized copy and clean absolute URLs on every portfolio page.
  const seen = { fr: new Set(), en: new Set() }, site = "https://iksolutions-inc.com";
  for (const file of portfolio) {
    const relative = path.relative(root, file).replace(/\\/g, "/"), html = fs.readFileSync(file, "utf8");
    const lang = html.match(/<html lang="(\w+)"/)[1];
    const title = decode((html.match(/<title>(.*?) · IK Digital Solutions<\/title>/) || [])[1] || "");
    assert.ok(title.length > 0 && title.length <= 70, relative + " title length: " + title.length);
    assert.ok(!html.includes("fonts.googleapis.com") && html.includes("assets/fonts.css"), relative + " must use the self-hosted fonts");
    const description = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
    assert.ok(description.length >= 50 && description.length <= 160, relative + " description length: " + description.length);
    assert.ok(!seen[lang].has(description), relative + " shares its description with another page"); seen[lang].add(description);
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    const frHref = (html.match(/hreflang="fr" href="([^"]*)"/) || [])[1], xDefault = (html.match(/hreflang="x-default" href="([^"]*)"/) || [])[1];
    assert.ok(canonical && canonical.startsWith(site) && !canonical.endsWith(".html"), relative + " canonical: " + canonical);
    assert.equal(xDefault, frHref, relative + " x-default must point at the French page");
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.equal(blocks.length, 1, relative + " must carry one JSON-LD block");
    const graph = JSON.parse(blocks[0][1])["@graph"], types = graph.map(n => n["@type"]);
    assert.ok(types.includes("ProfessionalService") && types.includes("WebPage"), relative + " JSON-LD types: " + types.join(","));
    assert.equal(graph.find(n => n["@type"] === "WebPage").url, canonical, relative + " WebPage url must equal the canonical");
    for (const m of JSON.stringify(graph).matchAll(/"(?:url|@id|item|logo)":"([^"]+)"/g)) assert.ok(m[1].startsWith(site) && !/\.html(?:$|#)/.test(m[1]), relative + " unclean URL in JSON-LD: " + m[1]);
    if (/agents-commerciaux|sales-agents/.test(relative)) {
      const job = graph.find(n => n["@type"] === "JobPosting");
      assert.ok(job && !JSON.stringify(job).includes("baseSalary") && !PAY.test(job.description), relative + " JobPosting must exist without pay terms");
    }
  }
  for (const s of services) for (const lang of ["fr", "en"]) assert.ok(decode(fs.readFileSync(path.join(root, routes[s.key][lang]), "utf8")).includes(s.seo[lang].intro), s.key + " " + lang + " must show its city sentence");
  for (const file of walk(path.join(root, "demos")).filter(f => f.endsWith(".html"))) assert.ok(/<meta name="robots" content="noindex[^"]*">/.test(fs.readFileSync(file, "utf8")), path.relative(root, file) + " must be noindex");
  const notFound = fs.readFileSync(path.join(root, "404.html"), "utf8");
  assert.ok(notFound.includes('content="noindex"') && !notFound.includes('rel="canonical"'), "404 must be noindex without a canonical");
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(new Set(locations).size, locations.length, "Duplicate sitemap routes");
  // Only portfolio pages are listed: every demonstration is noindex and stays out of the sitemap.
  assert.equal(locations.length, portfolio.length, "Sitemap lists exactly the portfolio pages");
  assert.ok(locations.every(l => !l.includes("/demos/")), "No demonstration in the sitemap");
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
        assert.equal(await page.locator("#main-nav a").count(), 6);
        assert.equal(await page.locator(".wa-float").count(), 1, "Floating WhatsApp shortcut on every page");
        assert.ok((await page.locator(".wa-float").getAttribute("href")).startsWith("https://wa.me/18593825280?text="), "WhatsApp shortcut carries a prepared message");
        if (key !== "home" && !["privacy", "legal"].includes(key)) assert.equal(await page.locator('#main-nav [aria-current="page"]').count(), 1);
        await page.locator(`[data-language][lang="${other}"]`).click();
        assert.equal(new URL(page.url()).pathname, publicPath("/" + urls[other]));
        assert.equal(await page.locator("html").getAttribute("lang"), other);
      }
      console.log("Page pairs and navigation: " + lang);
      for (const p of projects) {
        const route = (lang === "fr" ? "projets/" : "en/projects/") + p.slug + ".html";
        await goto(route);
        const expected = p.liveNeedsAccount ? (p.demoUrls?.[lang] || p.demoUrl) : (p.liveUrl || p.demoUrls?.[lang] || p.demoUrl);
        const actual = await page.locator(".spec .actions .btn-primary").getAttribute("href");
        const expectedUrl = new URL(expected, origin + "/");
        if (expectedUrl.origin === origin) expectedUrl.pathname = publicPath(expectedUrl.pathname);
        assert.equal(new URL(actual, page.url()).href, expectedUrl.href);
        await page.locator(`[data-language][lang="${other}"]`).click();
        assert.equal(await page.locator("body").getAttribute("data-page"), "project:" + p.slug);
      }
      await goto(routes.home[lang]);
      assert.equal(await page.locator(".offer-number,.more-num,.case-index,.build-n,.local-principles > div > span,.compact-process li > span").count(), 0);
      assert.equal(await page.locator(".eyebrow").evaluateAll(nodes => nodes.filter(n => /^0\d\s*\//.test(n.textContent.trim())).length), 0);
      assert.equal(await page.locator(".hero-motion").count(), 1);
      assert.equal(await page.locator(".hero-services a").count(), 3);
      assert.ok(/RDC|DRC/.test(await page.locator(".hero-copy h1").innerText()), "The hero states the market in its first line");
      assert.equal(await page.locator(".why-us .content-panel").count(), 4, "Four reasons in the Pourquoi nous block");
      assert.equal(new URL(await page.locator(".hero-motion-video source").getAttribute("src"), page.url()).pathname, "/assets/media/hero-devices.mp4");
      await page.waitForFunction(() => document.querySelector(".hero-motion-video").readyState >= 1);
      assert.deepEqual(await page.locator(".hero-motion-video").evaluate(v => [v.videoWidth, v.videoHeight]), [1120, 980]);
      await page.waitForFunction(() => !document.querySelector(".hero-motion-video").paused);
      await page.locator(".hero-motion-toggle").click();
      assert.equal(await page.locator(".hero-motion-video").evaluate(v => v.paused), true);
      await page.locator(".hero-motion-toggle").click();
      await page.waitForFunction(() => !document.querySelector(".hero-motion-video").paused);
      assert.equal(await page.locator(".wwd-card").count(), 0);
      assert.equal(await page.locator(".pill-client,.pill-demo").count(), 0);
      assert.equal(await page.locator(".integration-brands img").count(), 4);
      assert.equal(await page.locator(".tech-band").count(), 0);
      await goto(routes.services[lang]);
      assert.equal(await page.locator("#services .wwd-card").count(), services.length + 1);
      assert.equal(await page.locator(".tech-band").count(), 1);
      assert.equal(await page.locator(".visual-offers,.showcase-grid,.work-card").count(), 0);
      for (const key of ["payments", "whatsapp"]) {
        await goto(routes[key][lang]);
        assert.ok(!/\d[\d ,–-]*\sUSD|USD\s[\d]/.test(await page.locator("main").innerText()));
        await page.locator('#contact a[href*="service=' + key + '"]').click();
        assert.equal(await page.locator("#f-service").inputValue(), key);
      }
      await goto(routes.work[lang]);
      assert.equal(await page.locator(".concept-grid .work-card[data-project]").count(), projects.filter(p => p.isConcept).length);
      assert.equal(await page.locator("#client .work-card[data-project]").count(), projects.filter(p => p.status === "client").length);
      assert.equal(await page.locator("#demo .work-card[data-project]").count(), projects.filter(p => p.status === "demo").length);
      assert.equal(await page.locator("[data-carousel]").count(), 3);
      for (const kind of ["client", "demo", "concept"]) {
        const group = page.locator("#" + kind), track = group.locator(".work-carousel-track");
        const first = await group.locator('[data-carousel-project][aria-current="true"]').getAttribute("data-carousel-project");
        await group.locator("[data-carousel-next]").click();
        await page.waitForFunction(({kind,first}) => document.querySelector('#'+kind+' [data-carousel-project][aria-current="true"]').dataset.carouselProject !== first, {kind,first});
        await track.focus(); await page.keyboard.press("Home");
        await page.waitForFunction(({kind,first}) => document.querySelector('#'+kind+' [data-carousel-project][aria-current="true"]').dataset.carouselProject === first, {kind,first});
        // Previous from the first project loops to the last one in the same direction.
        await group.locator("[data-carousel-prev]").click();
        const last = await group.locator("[data-carousel-project]").last().getAttribute("data-carousel-project");
        await page.waitForFunction(({kind,last}) => document.querySelector('#'+kind+' [data-carousel-project][aria-current="true"]').dataset.carouselProject === last, {kind,last});
        assert.ok(await group.locator("[data-carousel-next]").isEnabled());
        for (const clone of await group.locator("[data-carousel-clone]").all()) {
          assert.equal(await clone.getAttribute("aria-hidden"), "true");
          assert.equal(await clone.locator('a:not([tabindex="-1"])').count(), 0);
        }
      }
      await page.locator("#work-service").selectOption("websites");
      assert.equal(await page.locator(".work-card[data-project]:not([hidden])").count(), projects.filter(p => projectServices[p.slug].includes("websites")).length);
      for (const group of await page.locator("[data-work-section]:not([hidden])").all()) {
        const current = await group.locator('[data-carousel-project][aria-current="true"]').getAttribute("data-carousel-project");
        assert.equal(current, await group.locator('[data-project]:not([hidden])').first().getAttribute('data-project'));
      }
      await page.locator('[data-kind-filter="concept"]').click();
      assert.equal(await page.locator("[data-work-section]:not([hidden])").count(), 1);
      await page.locator('#concept .work-card[data-project]:not([hidden]) .case-action').first().click();
      assert.ok(new URL(page.url()).pathname.match(/\/(projets|en\/projects)\/[^/.]+$/));
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
      assert.ok(message, "WhatsApp preparation must not require an e-mail address");
      assert.ok(new URL(message).searchParams.get("text").includes("Kimia Express"));
      assert.ok(new URL(message).searchParams.get("text").includes("Example inquiry only"));
      // Intercept the Web3Forms endpoint: the submission is inspected locally and never delivered.
      const endpoint = "https://api.web3forms.com/**";
      let delivered = null;
      await page.route(endpoint, route => { delivered = route.request().postDataJSON(); route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, message: "ok" }) }); });
      await page.locator("#f-email").fill("visitor@example.com");
      await page.locator('#contact-form button[type="submit"]').click();
      await page.locator("#f-status.is-success").waitFor();
      assert.equal(delivered.email, "visitor@example.com"); assert.equal(delivered.message, "Example inquiry only");
      assert.ok(delivered.project.includes("Kimia Express")); assert.ok(delivered.subject.includes("Test visitor"));
      assert.equal(delivered.botcheck, undefined, "An unchecked honeypot sends nothing");
      assert.equal(await page.locator("#f-need").inputValue(), "", "The form resets after a delivered inquiry");
      await page.unroute(endpoint);
      await page.route(endpoint, route => route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ success: false, message: "down" }) }));
      await page.locator("#f-name").fill("Test visitor"); await page.locator("#f-email").fill("visitor@example.com"); await page.locator("#f-need").fill("Example inquiry only");
      await page.locator('#contact-form button[type="submit"]').click();
      await page.locator("#f-status.is-error").waitFor();
      assert.equal(await page.locator("#f-need").inputValue(), "Example inquiry only", "A failed delivery keeps the visitor's text");
      await page.unroute(endpoint);
      assert.ok(!page.url().includes("Test"), "Personal contact fields must not enter the URL");
      // Job posting page: no pay terms, a summary card with a WhatsApp shortcut, and an application form on the same intercepted endpoint.
      await goto(routes.agents[lang]);
      const recruiting = await page.locator("main").innerText();
      assert.ok(!PAY.test(recruiting), "The recruiting page must not mention pay");
      assert.equal(await page.locator(".job-grid .spec .btn-wa").count(), 1, "The summary card offers WhatsApp");
      assert.equal(await page.locator("#candidature #apply-form").count(), 1, "The application form sits under #candidature");
      assert.equal(await page.locator(".inquiry-band, .content-panel h3 a").count(), 0, "No closing band and no service tiles on the job posting");
      if (lang === "fr") assert.ok(/commercial/i.test(await page.locator("h1").innerText()), "Singular job title");
      const fillApplication = async () => { await page.locator("#a-name").fill("Test agent"); await page.locator("#a-city").fill("Lubumbashi"); await page.locator("#a-phone").fill("+243 000 000 000"); await page.locator("#a-network").fill("Example network only"); };
      await fillApplication();
      await page.evaluate(() => { window.open = url => { window.__preparedMessage = url; }; });
      await page.locator("#a-whatsapp").click();
      const applyText = new URL(await page.evaluate(() => window.__preparedMessage)).searchParams.get("text");
      assert.ok(applyText.includes("Lubumbashi") && applyText.includes("Example network only"), "The WhatsApp application is prepared without an e-mail address");
      let application = null;
      await page.route(endpoint, route => { application = route.request().postDataJSON(); route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, message: "ok" }) }); });
      await page.locator('#apply-form button[type="submit"]').click();
      await page.locator("#a-status.is-success").waitFor();
      assert.equal(application.city, "Lubumbashi"); assert.equal(application.whatsapp, "+243 000 000 000"); assert.equal(application.message, "Example network only");
      assert.ok(application.subject.includes("Test agent")); assert.equal(application.botcheck, undefined);
      assert.equal(await page.locator("#a-network").inputValue(), "", "The application form resets after delivery");
      await page.unroute(endpoint);
      await page.route(endpoint, route => route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ success: false, message: "down" }) }));
      await fillApplication();
      await page.locator('#apply-form button[type="submit"]').click();
      await page.locator("#a-status.is-error").waitFor();
      assert.equal(await page.locator("#a-network").inputValue(), "Example network only", "A failed delivery keeps the candidate's text");
      await page.unroute(endpoint);
      assert.ok(!page.url().includes("Test") && !page.url().includes("Lubumbashi"), "Candidate fields must not enter the URL");
      await goto(routes.contact[lang] + "?service=invalid&project=%3Cscript%3E");
      assert.equal(await page.locator("#f-service").inputValue(), ""); assert.equal(await page.locator("#f-project").inputValue(), "");
      // All bilingual demos must return to the corresponding project story.
      for (const p of projects.filter(p => p.demoUrls?.en && !p.isConcept)) {
        await goto(p.demoUrls[lang]);
        await page.locator(".ikbar a").click();
        assert.equal(new URL(page.url()).pathname, "/" + (lang === "fr" ? "projets/" : "en/projects/") + p.slug);
      }
      for (const p of projects.filter(p => p.isConcept && !/^https?:/.test(p.demoUrls?.[lang] || p.demoUrl || ""))) {
        await goto(p.demoUrls[lang]);
        const href = await page.locator(".notice > a").getAttribute("href");
        assert.equal(new URL(href, page.url()).pathname, "/" + (lang === "fr" ? "projets/" : "en/projects/") + p.slug);
      }
      console.log("Projects, filters, inquiry context and demo returns: " + lang);
    }
    const noJS = await browser.newPage({ javaScriptEnabled: false });
    await noJS.goto(origin + "/index.html");
    assert.ok(await noJS.locator(".hero-motion-poster").isVisible());
    assert.ok(await noJS.locator(".hero-motion-toggle").isHidden());
    await noJS.goto(origin + "/projets/index.html"); assert.equal(await noJS.locator(".concept-grid .work-card:visible").count(), projects.filter(p => p.isConcept).length);
    await noJS.goto(origin + "/contact.html");
    assert.equal(await noJS.locator("#contact-form").getAttribute("action"), "https://api.web3forms.com/submit");
    assert.equal(await noJS.locator("#contact-form").getAttribute("method"), "post");
    assert.equal(await noJS.locator('#contact-form input[name="access_key"]').count(), 1);
    assert.ok(await noJS.locator('#contact-form input[name="botcheck"]').isHidden(), "The honeypot must stay invisible");
    await noJS.goto(origin + "/agents-commerciaux.html");
    assert.equal(await noJS.locator("#apply-form").getAttribute("action"), "https://api.web3forms.com/submit");
    assert.equal(await noJS.locator("#apply-form").getAttribute("method"), "post");
    assert.equal(await noJS.locator('#apply-form input[name="access_key"]').count(), 1);
    assert.ok(await noJS.locator('#apply-form input[name="botcheck"]').isHidden(), "The application honeypot must stay invisible");
    assert.equal(await noJS.locator("#main-nav a").count(), 6);
    await noJS.close();
    const reduced = await browser.newPage({ reducedMotion: "reduce" });
    await reduced.goto(origin + "/index.html");
    assert.ok(await reduced.locator(".hero-motion-poster").isVisible());
    assert.ok(await reduced.locator(".hero-motion-video").isHidden());
    assert.equal(await reduced.locator(".hero-motion-video").evaluate(v => v.paused), true);
    await reduced.goto(origin + "/projets/index.html");
    assert.ok(await reduced.locator("#client [data-carousel-toggle]").isHidden());
    const reducedStart = await reduced.locator("#client-track").evaluate(t => t.scrollLeft);
    await reduced.locator("#client [data-carousel-next]").click();
    assert.ok(await reduced.locator("#client-track").evaluate((t,start) => t.scrollLeft > start + 100, reducedStart));
    await reduced.close();
    // Verify native touch scrolling, not just a scripted change to scrollLeft.
    const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    await touch.goto(origin + "/projets/index.html");
    await touch.locator("#client-track").scrollIntoViewIfNeeded();
    const box = await touch.locator("#client-track [data-project] .case-cover").first().boundingBox();
    const touchStart = await touch.locator("#client-track").evaluate(t => t.scrollLeft);
    const session = await touch.context().newCDPSession(touch);
    const swipeY = Math.max(120, box.y + box.height / 2);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 320, y: swipeY }] });
    for (let x = 300; x >= 60; x -= 30) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: swipeY }] });
      await touch.waitForTimeout(25);
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await touch.waitForFunction(start => document.querySelector("#client-track").scrollLeft > start + 100, touchStart);
    assert.equal(await touch.locator("#client [data-carousel-toggle]").innerText(), "Lecture");
    await touch.close();
    await page.setViewportSize({ width: 390, height: 844 });
    for (const file of portfolio) {
      await goto(path.relative(root, file).replace(/\\/g, "/"));
      const dimensions = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: innerWidth }));
      assert.ok(dimensions.actual <= dimensions.viewport, "Overflow: " + page.url() + " " + JSON.stringify(dimensions));
      await page.locator(".nav-toggle").click(); assert.ok(await page.locator("#main-nav").isVisible());
      await page.keyboard.press("Escape"); assert.equal(await page.locator(".nav-toggle").getAttribute("aria-expanded"), "false");
    }
    for (const anchor of ["methode", "conformite", "tarifs", "contact"]) {
      await goto("index.html#" + anchor); assert.equal(await page.locator("#" + anchor).count(), 1);
    }
    await goto("services/index.html#services"); assert.equal(await page.locator("#services").count(), 1);
    if (process.argv.includes("--screenshots")) {
      const dest = path.join(os.tmpdir(), "ik-architecture-preview"); fs.mkdirSync(dest, { recursive: true });
      for (const [kind, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
        await page.setViewportSize({ width, height });
        for (const key of ["home", "services", "work", "commerce", "contact", "agents"]) {
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
    console.log(`PASS: ${portfolio.length} portfolio pages, ${references} local references, ${locations.length} sitemap routes, language pairs, mobile menus, filters, inquiry context, demo returns, head metadata, structured data and demo noindex.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => server.close());

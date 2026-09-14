/* IK Digital Solutions — rendering, routing, language, live metrics.
   No framework. Content comes from assets/content.js (window.KDS). */

(function () {
  "use strict";

  var D = window.KDS;
  var C = D.config;
  var app = document.getElementById("app");
  var lang = "fr";
  var metrics = { ms: null, kb: null };

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function t() { return D.i18n[lang]; }

  function waLink(msg) {
    if (!C.whatsapp) { return "#/contact"; }
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  function waIcon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 0 16.4 8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 2-1.4.2-.7.2-1.2.1-1.4l-.5-.3-2-1c-.3 0-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1a6.8 6.8 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.5v-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.2z"/></svg>';
  }

  function list(items) {
    return "<ul>" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }

  function chips(items) {
    return '<div class="chips">' + items.map(function (i) { return '<span class="chip">' + esc(i) + "</span>"; }).join("") + "</div>";
  }

  function fmtNum(n) {
    if (n === null || n === undefined) { return t().live.pending; }
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "fr" ? " " : ",");
  }

  /* ---------- pieces ---------- */

  function statusRows() {
    var L = t().live;
    var rows = '<div class="status-row"><span>' + esc(L.thisSite) + '<span class="sub">' + esc(L.viewing) + '</span></span><span class="pill pill-ok"><span class="dot"></span>' + esc(L.online) + "</span></div>";
    D.projects.forEach(function (p) {
      var on = !!p.demoUrl;
      rows += '<div class="status-row"><span>' + esc(p[lang].title) + (p.status === "client" ? '<span class="sub">' + esc(t().projects.badgeClient) + "</span>" : "") + "</span>" +
        '<span class="pill ' + (on ? "pill-ok" : "pill-prep") + '"><span class="dot"></span>' + esc(on ? L.online : L.preparing) + "</span></div>";
    });
    return rows;
  }

  function liveCard() {
    var L = t().live;
    return '<aside class="live" aria-label="' + esc(L.title) + '">' +
      '<div class="live-title">' + esc(L.title) + "</div>" +
      '<div class="live-metrics">' +
        '<div class="metric"><span class="metric-label">' + esc(L.load) + '</span><span class="metric-value" id="m-ms">' + fmtNum(metrics.ms) + "<small>" + esc(L.msUnit) + "</small></span></div>" +
        '<div class="metric"><span class="metric-label">' + esc(L.weight) + '</span><span class="metric-value" id="m-kb">' + fmtNum(metrics.kb) + "<small>" + esc(L.kbUnit) + "</small></span></div>" +
      "</div>" +
      '<div class="live-title">' + esc(L.statusTitle) + "</div>" +
      '<div class="status-list">' + statusRows() + "</div>" +
      '<div class="live-note">' + esc(L.note) + "</div>" +
    "</aside>";
  }

  function mockup(p, x) {
    var ext = p.shotExt || "png";
    return '<div class="shot" style="--pc:' + esc(p.color || "#1D3EB5") + '">' +
      '<div class="browser"><div class="bar"><i></i><i></i><i></i><span>' + esc(p.domain || p.slug) + '</span></div>' +
        '<img src="shots/' + esc(p.slug) + '-desktop.' + ext + '" alt="' + esc(x.title) + '" loading="lazy"></div>' +
      '<div class="phone"><img src="shots/' + esc(p.slug) + '-mobile.' + ext + '" alt="" loading="lazy"></div>' +
    "</div>";
  }

  function onLabel(p) {
    var P = t().projects;
    if (!p.demoUrl) { return p.status === "client" ? P.privateApp : P.demoOff; }
    return p.status === "client" ? P.siteOn : P.demoOn;
  }

  function projectCard(p, i, arr) {
    var P = t().projects;
    var x = p[lang];
    var on = !!p.demoUrl;
    var wide = (i === arr.length - 1) && (arr.length % 2 === 1);
    return '<a class="card showcase' + (wide ? " wide" : "") + '" href="#/projets/' + esc(p.slug) + '" style="--pc:' + esc(p.color || "#1D3EB5") + '">' +
      mockup(p, x) +
      '<div class="card-body">' +
        '<div class="card-top"><p class="eyebrow">' + esc(x.sector.split(" · ")[0]) + "</p>" +
          '<span class="pill ' + (p.status === "client" ? "pill-client" : "pill-demo") + '">' + esc(p.status === "client" ? P.badgeClient : P.badgeDemo) + "</span></div>" +
        "<h3>" + esc(x.title) + "</h3>" +
        "<p>" + esc(x.tagline) + "</p>" +
        chips(p.stack.slice(0, 4)) +
        '<div class="card-foot"><span class="pill ' + (on ? "pill-ok" : "pill-prep") + '"><span class="dot"></span>' + esc(onLabel(p)) + "</span>" +
          '<span class="open">' + esc(P.open) + " →</span></div>" +
      "</div>" +
    "</a>";
  }

  function diagram() {
    var M = t().method;
    var d = M.d;
    var box = function (x, y, w, h, title, sub, accent) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="var(--surface)" stroke="' + (accent ? "var(--cobalt)" : "currentColor") + '" stroke-width="1.2"/>' +
        '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 - 4) + '" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">' + esc(title) + "</text>" +
        '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 13) + '" text-anchor="middle" font-size="11" fill="var(--ink-3)">' + esc(sub) + "</text>";
    };
    var label = function (x, y, txt, anchor) {
      return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || "middle") + '" font-size="11" fill="var(--ink-2)">' + esc(txt) + "</text>";
    };
    var svg =
      '<svg viewBox="0 0 980 420" role="img" aria-label="' + esc(M.diagramAria) + '" style="font-family: var(--font-body)">' +
      "<defs>" +
        '<marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>' +
      "</defs>" +
      /* DRC zone */
      '<rect x="420" y="60" width="330" height="330" rx="6" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.4" stroke-dasharray="6 4"/>' +
      '<text x="585" y="84" text-anchor="middle" font-size="12" font-weight="600" fill="var(--cobalt)">' + esc(d.zone) + "</text>" +
      /* boxes */
      box(20, 190, 160, 70, d.user, d.userSub) +
      box(230, 190, 150, 70, d.cf, d.cfSub) +
      box(460, 130, 250, 70, d.app, d.appSub, true) +
      box(460, 280, 250, 70, d.db, d.dbSub, true) +
      box(790, 280, 170, 70, d.aws, d.awsSub) +
      box(790, 130, 170, 70, d.mon, d.monSub) +
      box(790, 20, 170, 60, d.team, d.teamSub) +
      /* user -> cloudflare */
      '<line x1="180" y1="225" x2="228" y2="225" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)"/>' +
      label(204, 215, d.aHttps) +
      /* cloudflare -> app */
      '<path d="M380 225 L420 225 L420 165 L458 165" fill="none" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)"/>' +
      label(400, 215, d.aReq) +
      /* app <-> db */
      '<line x1="585" y1="200" x2="585" y2="278" stroke="currentColor" stroke-width="1.2" marker-start="url(#arr)" marker-end="url(#arr)"/>' +
      label(595, 244, d.aRw, "start") +
      /* db -> aws (backup, dashed) */
      '<line x1="710" y1="315" x2="788" y2="315" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#arr)"/>' +
      label(749, 372, d.aBackup) +
      /* monitoring -> app (probe, dashed) */
      '<line x1="790" y1="165" x2="712" y2="165" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#arr)"/>' +
      label(750, 118, d.aProbe) +
      /* monitoring -> team (alert) */
      '<line x1="875" y1="130" x2="875" y2="82" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)"/>' +
      label(882, 110, d.aAlert, "start") +
      "</svg>";
    return '<figure class="diagram"><div class="frame">' + svg + "</div><figcaption>" + esc(M.diagramCaption) + "</figcaption></figure>";
  }

  /* ---------- views ---------- */

  function renderHome() {
    var T = t();
    var H = T.hero, P = T.proofs, S = T.services, R = T.projects, M = T.method, K = T.compliance, G = T.pricing, A = T.about, N = T.contact;
    var html = "";

    html += '<section class="section hero" id="top"><div class="wrap hero-grid">' +
      "<div>" +
        '<p class="eyebrow">' + esc(H.eyebrow) + "</p>" +
        "<h1>" + esc(H.title) + "</h1>" +
        '<p class="lead measure">' + esc(H.lead) + "</p>" +
        '<div class="cta-row">' +
          '<a class="btn btn-primary" href="#/projets">' + esc(H.cta1) + "</a>" +
          '<a class="btn btn-wa" href="' + esc(waLink(T.waMessage)) + '" ' + (C.whatsapp ? 'target="_blank" rel="noopener"' : "") + ">" + waIcon() + esc(H.cta2) + "</a>" +
        "</div>" +
      "</div>" +
      liveCard() +
    "</div>" +
    '<div class="wrap"><div class="deadline"><span class="date">' + esc(T.deadline.date) + "</span><p>" + esc(T.deadline.text) + "</p></div></div>" +
    "</section>";

    html += '<section class="section" id="preuves"><div class="wrap">' +
      '<div class="section-head"><p class="eyebrow">' + esc(P.eyebrow) + "</p><h2>" + esc(P.title) + '</h2><p class="lead measure">' + esc(P.lead) + "</p></div>" +
      '<div class="grid-4">' + P.items.map(function (i) { return '<div class="proof"><h3>' + esc(i.t) + "</h3><p>" + esc(i.d) + "</p></div>"; }).join("") + "</div>" +
    "</div></section>";

    html += '<section class="section" id="services"><div class="wrap">' +
      '<div class="section-head"><p class="eyebrow">' + esc(S.eyebrow) + "</p><h2>" + esc(S.title) + '</h2><p class="lead measure">' + esc(S.lead) + "</p></div>" +
      '<div class="grid-4">' + S.items.map(function (i) { return '<div class="service"><h3>' + esc(i.t) + "</h3><p>" + esc(i.d) + "</p>" + list(i.list) + "</div>"; }).join("") + "</div>" +
    "</div></section>";

    html += '<section class="section" id="projets"><div class="wrap">' +
      '<div class="section-head"><p class="eyebrow">' + esc(R.eyebrow) + "</p><h2>" + esc(R.title) + '</h2><p class="lead measure">' + esc(R.lead) + "</p></div>" +
      '<div class="showcase-grid">' + D.projects.map(projectCard).join("") + "</div>" +
    "</div></section>";

    html += '<section class="section" id="methode"><div class="wrap">' +
      '<div class="section-head"><p class="eyebrow">' + esc(M.eyebrow) + "</p><h2>" + esc(M.title) + '</h2><p class="lead measure">' + esc(M.lead) + "</p></div>" +
      '<ol class="steps">' + M.steps.map(function (s) { return "<li><h3>" + esc(s.t) + '</h3><span class="when">' + esc(s.when) + "</span><p>" + esc(s.d) + "</p></li>"; }).join("") + "</ol>" +
      diagram() +
    "</div></section>";

    html += '<section class="section" id="conformite"><div class="wrap">' +
      '<div class="section-head"><p class="eyebrow">' + esc(K.eyebrow) + "</p><h2>" + esc(K.title) + '</h2><p class="lead measure">' + esc(K.lead) + "</p></div>" +
      '<div class="grid-2">' +
        '<ul class="checklist">' + K.items.map(function (i) { return "<li><div><strong>" + esc(i.t) + "</strong><span>" + esc(i.d) + "</span></div></li>"; }).join("") + "</ul>" +
        '<div class="aside-box"><h3>' + esc(K.asideTitle) + "</h3><p>" + esc(K.aside) + "</p></div>" +
      "</div>" +
    "</div></section>";

    html += '<section class="section" id="tarifs"><div class="wrap">' +
      '<div class="section-head"><p class="eyebrow">' + esc(G.eyebrow) + "</p><h2>" + esc(G.title) + '</h2><p class="lead measure">' + esc(G.lead) + "</p></div>" +
      '<div class="table-wrap"><table class="pricing"><thead><tr><th>' + esc(G.h.pack) + "</th><th>" + esc(G.h.what) + "</th><th>" + esc(G.h.price) + "</th><th>" + esc(G.h.monthly) + "</th></tr></thead><tbody>" +
        G.rows.map(function (r) { return '<tr><td class="name">' + esc(r.n) + '</td><td class="desc">' + esc(r.d) + '</td><td class="num">' + esc(r.p) + '</td><td class="num">' + esc(r.m) + "</td></tr>"; }).join("") +
      "</tbody></table></div>" +
      '<p class="pricing-note">' + esc(G.note) + "</p>" +
    "</div></section>";

    html += '<section class="section" id="contact"><div class="wrap grid-2">' +
      "<div>" +
        '<p class="eyebrow">' + esc(A.eyebrow) + "</p><h2>" + esc(A.title) + "</h2>" +
        '<p class="lead measure" style="margin-top:1rem">' + esc(A.text) + "</p>" +
        '<div class="founder" style="margin-top:1.4rem"><div class="avatar" aria-hidden="true">' + esc(C.founder.split(" ").map(function (w) { return w.charAt(0); }).join("")) + "</div><div><strong>" + esc(C.founder) + "</strong><small>" + esc(A.founderRole) + "</small></div></div>" +
      "</div>" +
      "<div>" +
        '<p class="eyebrow">' + esc(N.eyebrow) + "</p><h2>" + esc(N.title) + '</h2><p class="lead" style="margin-top:1rem">' + esc(N.lead) + "</p>" +
        '<div class="cta-row"><a class="btn btn-wa" href="' + esc(waLink(T.waMessage)) + '" ' + (C.whatsapp ? 'target="_blank" rel="noopener"' : "") + ">" + waIcon() + esc(T.whatsapp) + "</a></div>" +
        '<div class="contact-lines" style="margin-top:1.2rem">' +
          "<div><strong>" + esc(N.emailLabel) + "</strong> · <a class=\"mono\" href=\"mailto:" + esc(C.email) + '">' + esc(C.email) + "</a></div>" +
          "<div><strong>" + esc(N.cityLabel) + "</strong> · <span class=\"mono\">" + esc(C.location[lang]) + "</span></div>" +
        "</div>" +
        '<form class="contact-form" id="contact-form" style="margin-top:1.4rem">' +
          '<div class="field"><label for="f-name">' + esc(N.form.name) + '</label><input id="f-name" name="name" type="text" autocomplete="name"></div>' +
          '<div class="field"><label for="f-company">' + esc(N.form.company) + '</label><input id="f-company" name="company" type="text" autocomplete="organization"></div>' +
          '<div class="field"><label for="f-need">' + esc(N.form.need) + '</label><textarea id="f-need" name="need" placeholder="' + esc(N.form.needPh) + '"></textarea></div>' +
          '<div><button class="btn btn-primary" type="submit" id="f-send">' + esc(N.form.send) + "</button></div>" +
          '<p class="hint" style="font-size:.82rem;color:var(--ink-3)">' + esc(N.form.hint) + "</p>" +
        "</form>" +
      "</div>" +
    "</div></section>";

    app.innerHTML = html;
    document.title = T.docTitle;

    var form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = document.getElementById("f-name").value.trim();
        var company = document.getElementById("f-company").value.trim();
        var need = document.getElementById("f-need").value.trim();
        var subject = (lang === "fr" ? "Projet — " : "Project — ") + (company || name || "");
        var body = (lang === "fr" ? "Nom : " : "Name: ") + name + "\n" + (lang === "fr" ? "Entreprise : " : "Company: ") + company + "\n\n" + need + "\n";
        window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      });
    }
  }

  function renderProject(slug) {
    var p = null;
    D.projects.forEach(function (q) { if (q.slug === slug) { p = q; } });
    if (!p) { location.hash = "#/projets"; return; }
    var T = t(), J = T.project, R = T.projects;
    var x = p[lang];
    var on = !!p.demoUrl;
    var isClient = p.status === "client";
    var askMsg = (lang === "fr" ? "Bonjour IK Digital Solutions, je souhaite une démo guidée de « " : "Hello IK Digital Solutions, I would like a guided demo of \"") + x.title + (lang === "fr" ? " »." : "\".");

    var block = function (label, inner) {
      return '<div class="pblock"><p class="eyebrow">' + esc(label) + "</p>" + inner + "</div>";
    };

    var html =
      '<div class="wrap project-head">' +
        '<a class="back" href="#/projets">← ' + esc(J.back) + "</a>" +
        '<div class="row"><span class="pill ' + (isClient ? "pill-client" : "pill-demo") + '">' + esc(isClient ? R.badgeClient : R.badgeDemo) + "</span>" +
          '<span class="pill ' + (on ? "pill-ok" : "pill-prep") + '"><span class="dot"></span>' + esc(onLabel(p)) + "</span></div>" +
        "<h1>" + esc(x.title) + "</h1>" +
        '<p class="lead measure">' + esc(x.tagline) + "</p>" +
      "</div>" +
      '<div class="wrap"><div class="gallery">' + mockup(p, x) + "</div></div>" +
      '<div class="wrap project-grid">' +
        '<aside class="spec"><dl>' +
          '<div class="kv"><dt>' + esc(J.status) + "</dt><dd>" + esc(isClient ? R.badgeClient : R.badgeDemo) + "</dd></div>" +
          '<div class="kv"><dt>' + esc(J.sector) + "</dt><dd>" + esc(x.sector) + "</dd></div>" +
          '<div class="kv"><dt>' + esc(J.timeline) + '</dt><dd class="mono">' + esc(p.timeline[lang]) + "</dd></div>" +
          '<div class="kv"><dt>' + esc(J.price) + '</dt><dd class="mono">' + esc(p.price[lang]) + "</dd></div>" +
          '<div class="kv"><dt>' + esc(J.monthly) + '</dt><dd class="mono">' + esc(p.monthly[lang]) + "</dd></div>" +
        "</dl>" +
        '<div class="actions">' +
          (on
            ? '<a class="btn btn-primary" href="' + esc(p.demoUrl) + '" target="_blank" rel="noopener">' + esc(p.openLabel ? p.openLabel[lang] : (isClient ? J.openSite : J.openDemo)) + " ↗</a>"
            : (isClient ? "" : '<a class="btn btn-primary" aria-disabled="true" href="#/projets/' + esc(p.slug) + '" tabindex="-1">' + esc(J.openDemo) + "</a>")) +
          (p.liveUrl ? '<a class="btn btn-outline" href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener">' + esc(J.liveLink) + " ↗</a>" : "") +
          (isClient ? "" : '<a class="btn btn-wa" href="' + esc(waLink(askMsg)) + '" ' + (C.whatsapp ? 'target="_blank" rel="noopener"' : "") + ">" + waIcon() + esc(J.askDemo) + "</a>") +
          (on || isClient ? "" : '<p class="hint">' + esc(J.demoHint) + "</p>") +
          (p.note ? '<p class="hint">' + esc(p.note[lang]) + "</p>" : "") +
        "</div></aside>" +
        "<div>" +
          '<div class="pblock"><div class="transparency">' + (isClient ? "" : "<strong>" + esc(R.badgeDemo) + ".</strong> ") + esc(isClient ? J.transparencyClient : J.transparency) + "</div></div>" +
          block(J.s1, "<h2>" + esc(x.sector) + "</h2>" + x.problem.map(function (s) { return "<p>" + esc(s) + "</p>"; }).join("")) +
          block(J.s2, list(x.built)) +
          block(p.s3Label ? p.s3Label[lang] : J.s3, list(x.congo)) +
          block(J.s4, list(x.deploy)) +
          block(J.s5, list(x.monitor)) +
          block(J.s6, '<p class="mono">' + esc(p.timeline[lang]) + " · " + esc(p.price[lang]) + " · " + esc(p.monthly[lang]) + "</p>") +
          block(J.stack, chips(p.stack)) +
        "</div>" +
      "</div>";

    app.innerHTML = html;
    document.title = x.title + " · " + T.docTitle;
  }

  /* ---------- chrome (header / footer) ---------- */

  function renderChrome() {
    var T = t();
    var nav = document.getElementById("nav");
    var keys = ["services", "projets", "methode", "conformite", "tarifs", "contact"];
    nav.innerHTML = keys.map(function (k) { return '<a href="#/' + k + '">' + esc(T.nav[k]) + "</a>"; }).join("");

    var wa = document.getElementById("hdr-wa");
    wa.href = waLink(T.waMessage);
    if (C.whatsapp) { wa.target = "_blank"; wa.rel = "noopener"; }
    wa.innerHTML = waIcon() + esc(T.whatsapp);

    document.getElementById("brand-name").textContent = C.brand;
    document.getElementById("brand-sub").textContent = C.brandSub;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    document.documentElement.setAttribute("lang", lang);

    document.getElementById("foot-left").innerHTML =
      "© " + new Date().getFullYear() + " " + esc(C.company) + ". " + esc(T.footer.rights) +
      "<br>" + esc(C.location[lang]) + " · " + esc(C.email);
    document.getElementById("foot-right").innerHTML =
      esc(T.footer.made) + ' · <a href="#/conformite">' + esc(T.footer.legal) + "</a>";
  }

  /* ---------- routing ---------- */

  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    renderChrome();
    if (h.indexOf("projets/") === 0) {
      renderProject(h.slice(8));
      window.scrollTo(0, 0);
      return;
    }
    renderHome();
    if (h) {
      var el = document.getElementById(h);
      if (el) { el.scrollIntoView(); } else { window.scrollTo(0, 0); }
    } else {
      window.scrollTo(0, 0);
    }
  }

  function setLang(l) {
    if (l !== "fr" && l !== "en") { return; }
    lang = l;
    try { localStorage.setItem("kds-lang", l); } catch (e) { /* storage unavailable */ }
    var y = window.scrollY;
    var h = location.hash.replace(/^#\/?/, "");
    renderChrome();
    if (h.indexOf("projets/") === 0) { renderProject(h.slice(8)); } else { renderHome(); }
    window.scrollTo(0, y);
  }

  /* ---------- live metrics ---------- */

  function measure() {
    try {
      var nav = performance.getEntriesByType("navigation")[0];
      var ms = null, bytes = 0;
      if (nav) {
        var end = nav.loadEventEnd > 0 ? nav.loadEventEnd : nav.domContentLoadedEventEnd;
        ms = Math.max(1, Math.round(end - nav.startTime));
        bytes += nav.transferSize || nav.encodedBodySize || 0;
      }
      performance.getEntriesByType("resource").forEach(function (r) {
        bytes += r.transferSize || r.encodedBodySize || 0;
      });
      metrics.ms = ms;
      metrics.kb = bytes > 0 ? Math.max(1, Math.round(bytes / 1024)) : null;
    } catch (e) { /* Performance API unavailable */ }
    var a = document.getElementById("m-ms"), b = document.getElementById("m-kb");
    var L = t().live;
    if (a) { a.innerHTML = fmtNum(metrics.ms) + "<small>" + esc(L.msUnit) + "</small>"; }
    if (b) { b.innerHTML = fmtNum(metrics.kb) + "<small>" + esc(L.kbUnit) + "</small>"; }
  }

  /* ---------- boot ---------- */

  try {
    var saved = localStorage.getItem("kds-lang");
    if (saved === "fr" || saved === "en") { lang = saved; }
    else if ((navigator.language || "fr").toLowerCase().indexOf("en") === 0) { lang = "en"; }
  } catch (e) { /* storage unavailable */ }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  window.addEventListener("hashchange", route);
  window.addEventListener("load", function () { setTimeout(measure, 0); });
  route();
})();

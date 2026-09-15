/* Cimenterie du Fleuve SA — page behaviour: navigation, consent banner, news and job filters,
   tender status filter, forms with reference numbers, document placeholders. No dependencies. */
(function () {
  "use strict";
  var lang = document.documentElement.getAttribute("lang") || "fr";
  var T = lang === "fr" ? {
    docTitle: "Document fourni par la société", docBody: "Sur le site en production, ce lien ouvre le PDF publié par la société (fiche technique, dossier de consultation, rapport). Dans cette démonstration, le document n'existe pas encore.", close: "Fermer",
    formOk: "Message reçu. Nous vous répondons sous deux jours ouvrés (simulé).", applyOk: "Candidature reçue sous la référence ", applyNext: ". Un SMS de confirmation vous est envoyé (simulé).",
    supOk: "Demande de référencement enregistrée sous le numéro ", supNext: ". Le service achats vous répond sous dix jours ouvrés (simulé).",
    quoteOk: "Demande de devis enregistrée sous la référence ", quoteNext: ". Un commercial vous rappelle sous un jour ouvré (simulé).",
    noNews: "Aucune actualité ne correspond à cette recherche.", noJobs: "Aucun poste ne correspond à ces filtres.", noTenders: "Aucune consultation dans cet état."
  } : {
    docTitle: "Document provided by the company", docBody: "On the production site this link opens the PDF published by the company (datasheet, tender file, report). In this demonstration the document does not exist yet.", close: "Close",
    formOk: "Message received. We reply within two working days (simulated).", applyOk: "Application received under reference ", applyNext: ". A confirmation SMS is sent to you (simulated).",
    supOk: "Registration request recorded under number ", supNext: ". Procurement replies within ten working days (simulated).",
    quoteOk: "Quote request recorded under reference ", quoteNext: ". A sales representative calls you back within one working day (simulated).",
    noNews: "No news item matches this search.", noJobs: "No position matches these filters.", noTenders: "No tender in this state."
  };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var ref = function (p) { return p + "-" + new Date().getFullYear() + "-" + String(Math.floor(1000 + Math.random() * 9000)); };
  function modal(title, body) {
    var m = $("modal"); if (!m) return;
    m.innerHTML = '<div class="overlay"><div class="dialog" role="dialog" aria-modal="true"><h3>' + esc(title) + "</h3><p>" + esc(body) + '</p><div class="actions"><button type="button" class="btn btn-dark btn-small" id="m-close">' + esc(T.close) + "</button></div></div></div>";
    $("m-close").onclick = function () { m.innerHTML = ""; }; $("m-close").focus();
  }
  var tog = $("navtoggle"), nav = $("nav");
  if (tog && nav) tog.addEventListener("click", function () { var open = nav.classList.toggle("open"); tog.setAttribute("aria-expanded", open ? "true" : "false"); });

  /* consent banner (Code du numérique) */
  var consent = $("consent");
  if (consent) {
    var c = null; try { c = localStorage.getItem("cdf-consent"); } catch (e) {}
    if (c) consent.hidden = true;
    ["c-yes", "c-no"].forEach(function (id) { var b = $(id); if (b) b.addEventListener("click", function () { try { localStorage.setItem("cdf-consent", id === "c-yes" ? "yes" : "no"); } catch (e) {} consent.hidden = true; }); });
  }

  document.querySelectorAll("[data-doc]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); modal(T.docTitle, a.getAttribute("data-doc") + " · " + T.docBody); });
  });

  function filterList(listId, emptyId, test, emptyText) {
    var list = $(listId); if (!list) return;
    var n = 0;
    list.querySelectorAll(":scope > li, :scope > tbody > tr").forEach(function (el) { var ok = test(el); el.hidden = !ok; if (ok) n++; });
    var e = $(emptyId); if (e) { e.hidden = n > 0; e.textContent = emptyText; }
  }
  var q = $("news-q"), cat = $("news-cat"), year = $("news-year");
  function fNews() { var s = (q && q.value || "").toLowerCase(), cv = cat && cat.value || "", y = year && year.value || ""; filterList("news-list", "news-empty", function (li) { return (!cv || li.getAttribute("data-cat") === cv) && (!y || li.getAttribute("data-year") === y) && (!s || li.textContent.toLowerCase().indexOf(s) > -1); }, T.noNews); }
  [q, cat, year].forEach(function (el) { if (el) el.addEventListener("input", fNews); });
  var js = $("job-site"), jd = $("job-dept");
  function fJobs() { var s = js && js.value || "", d = jd && jd.value || ""; filterList("job-list", "job-empty", function (li) { return (!s || li.getAttribute("data-site") === s) && (!d || li.getAttribute("data-dept") === d); }, T.noJobs); }
  [js, jd].forEach(function (el) { if (el) el.addEventListener("change", fJobs); });
  var ts = $("tender-status");
  if (ts) ts.addEventListener("change", function () { var v = ts.value; filterList("tender-list", "tender-empty", function (tr) { return !v || tr.getAttribute("data-status") === v; }, T.noTenders); });
  document.querySelectorAll("[data-apply]").forEach(function (b) {
    b.addEventListener("click", function () { var sel = $("ap-job"); if (sel) sel.value = b.getAttribute("data-apply"); var f = $("apply-form"); if (f) { f.scrollIntoView({ block: "start" }); var n = $("ap-name"); if (n) n.focus(); } });
  });
  function bind(id, out, fn) {
    var f = $(id); if (!f) return;
    f.addEventListener("submit", function (e) { e.preventDefault(); var o = $(out); if (o) o.innerHTML = '<div class="ack">' + fn() + "</div>"; f.reset(); });
  }
  bind("contact-form", "contact-out", function () { return esc(T.formOk); });
  bind("apply-form", "apply-out", function () { return esc(T.applyOk) + "<b>" + ref("CAND") + "</b>" + esc(T.applyNext); });
  bind("supplier-form", "supplier-out", function () { return esc(T.supOk) + "<b>" + ref("FRS") + "</b>" + esc(T.supNext); });
  bind("quote-form", "quote-out", function () { return esc(T.quoteOk) + "<b>" + ref("DEV") + "</b>" + esc(T.quoteNext); });
  bind("alert-form", "alert-out", function () { return esc(T.formOk); });
})();

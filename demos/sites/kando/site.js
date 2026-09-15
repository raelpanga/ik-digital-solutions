/* Kando Ressources SA — page behaviour: mobile navigation, news and job filters,
   forms with reference numbers, document placeholders. No dependencies. */
(function () {
  "use strict";
  var lang = document.documentElement.getAttribute("lang") || "fr";
  var T = lang === "fr" ? {
    docTitle: "Document fourni par la société", docBody: "Sur le site en production, ce lien ouvre le PDF publié par la société (rapport, communiqué, politique). Dans cette démonstration, le document n'existe pas encore.", close: "Fermer",
    grievanceOk: "Votre signalement est enregistré sous la référence ", grievanceNext: ". Un accusé de réception vous est envoyé par SMS ou par e-mail dans les 48 heures, et une réponse dans les 30 jours (simulé).",
    formOk: "Message envoyé. Nous vous répondons sous deux jours ouvrés (simulé).", applyOk: "Candidature reçue sous la référence ", applyNext: ". Les entretiens ont lieu à Kolwezi et Lubumbashi (simulé).",
    noNews: "Aucun communiqué ne correspond à cette recherche.", noJobs: "Aucun poste ne correspond à ces filtres.", alertOk: "Inscription enregistrée (simulé)."
  } : {
    docTitle: "Document provided by the company", docBody: "On the production site this link opens the PDF published by the company (report, release, policy). In this demonstration the document does not exist yet.", close: "Close",
    grievanceOk: "Your report is registered under reference ", grievanceNext: ". An acknowledgement is sent by SMS or e-mail within 48 hours, and a response within 30 days (simulated).",
    formOk: "Message sent. We reply within two working days (simulated).", applyOk: "Application received under reference ", applyNext: ". Interviews take place in Kolwezi and Lubumbashi (simulated).",
    noNews: "No release matches this search.", noJobs: "No position matches these filters.", alertOk: "Subscription recorded (simulated)."
  };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var ref = function (p) { return p + "-" + new Date().getFullYear() + "-" + String(Math.floor(1000 + Math.random() * 9000)); };

  function toast(msg) { var t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3200); }
  function modal(title, body) {
    var m = $("modal"); if (!m) return;
    m.innerHTML = '<div class="overlay"><div class="dialog" role="dialog" aria-modal="true"><h3>' + esc(title) + "</h3><p>" + esc(body) + '</p><div class="actions"><button type="button" class="btn btn-dark" id="m-close">' + esc(T.close) + "</button></div></div></div>";
    $("m-close").onclick = function () { m.innerHTML = ""; };
    $("m-close").focus();
  }

  /* mobile nav */
  var tog = $("navtoggle"), nav = $("nav");
  if (tog && nav) { tog.addEventListener("click", function () { var open = nav.classList.toggle("open"); tog.setAttribute("aria-expanded", open ? "true" : "false"); }); }

  /* document placeholders */
  document.querySelectorAll("[data-doc]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); modal(T.docTitle, a.getAttribute("data-doc") + " · " + T.docBody); });
  });

  /* news filter */
  var q = $("news-q"), cat = $("news-cat"), year = $("news-year"), list = $("news-list");
  function filterNews() {
    if (!list) return;
    var s = (q && q.value || "").toLowerCase(), c = cat && cat.value || "", y = year && year.value || "", n = 0;
    list.querySelectorAll("li").forEach(function (li) {
      var ok = (!c || li.getAttribute("data-cat") === c) && (!y || li.getAttribute("data-year") === y) && (!s || li.textContent.toLowerCase().indexOf(s) > -1);
      li.hidden = !ok; if (ok) n++;
    });
    var e = $("news-empty"); if (e) { e.hidden = n > 0; e.textContent = T.noNews; }
  }
  [q, cat, year].forEach(function (el) { if (el) el.addEventListener("input", filterNews); });

  /* jobs filter */
  var js = $("job-site"), jd = $("job-dept"), jl = $("job-list");
  function filterJobs() {
    if (!jl) return;
    var s = js && js.value || "", d = jd && jd.value || "", n = 0;
    jl.querySelectorAll("li").forEach(function (li) {
      var ok = (!s || li.getAttribute("data-site") === s) && (!d || li.getAttribute("data-dept") === d);
      li.hidden = !ok; if (ok) n++;
    });
    var e = $("job-empty"); if (e) { e.hidden = n > 0; e.textContent = T.noJobs; }
  }
  [js, jd].forEach(function (el) { if (el) el.addEventListener("change", filterJobs); });
  document.querySelectorAll("[data-apply]").forEach(function (b) {
    b.addEventListener("click", function () { var sel = $("ap-job"); if (sel) { sel.value = b.getAttribute("data-apply"); } var f = $("apply-form"); if (f) { f.scrollIntoView({ block: "start" }); var n = $("ap-name"); if (n) n.focus(); } });
  });

  /* forms */
  function bind(id, out, fn) {
    var f = $(id); if (!f) return;
    f.addEventListener("submit", function (e) { e.preventDefault(); var o = $(out); if (o) { o.innerHTML = '<div class="ack">' + fn() + "</div>"; } f.reset(); });
  }
  bind("grievance-form", "grievance-out", function () { return esc(T.grievanceOk) + "<b>" + ref("GR") + "</b>" + esc(T.grievanceNext); });
  bind("contact-form", "contact-out", function () { return esc(T.formOk); });
  bind("apply-form", "apply-out", function () { return esc(T.applyOk) + "<b>" + ref("CAND") + "</b>" + esc(T.applyNext); });
  bind("alert-form", "alert-out", function () { return esc(T.alertOk); });
  bind("ir-form", "ir-out", function () { return esc(T.formOk); });
})();

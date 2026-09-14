/* IK Digital Solutions — page script for the static site.
   Fills the two live metrics in the hero and turns the contact form into a mailto. */
(function () {
  "use strict";

  function esc(s) { return String(s); }

  function fmt(n, lang) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "fr" ? " " : ",");
  }

  function measure() {
    var lang = document.documentElement.getAttribute("lang") || "fr";
    var ms = null, bytes = 0;
    try {
      var nav = performance.getEntriesByType("navigation")[0];
      if (nav) {
        var end = nav.loadEventEnd > 0 ? nav.loadEventEnd : nav.domContentLoadedEventEnd;
        ms = Math.max(1, Math.round(end - nav.startTime));
        bytes += nav.transferSize || nav.encodedBodySize || 0;
      }
      performance.getEntriesByType("resource").forEach(function (r) {
        bytes += r.transferSize || r.encodedBodySize || 0;
      });
    } catch (e) { /* Performance API unavailable */ }
    var a = document.getElementById("m-ms"), b = document.getElementById("m-kb");
    if (a && ms !== null) { a.innerHTML = fmt(ms, lang) + "<small>" + esc(a.getAttribute("data-unit")) + "</small>"; }
    if (b && bytes > 0) { b.innerHTML = fmt(Math.max(1, Math.round(bytes / 1024)), lang) + "<small>" + esc(b.getAttribute("data-unit")) + "</small>"; }
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lang = form.getAttribute("data-lang") || "fr";
      var name = (document.getElementById("f-name").value || "").trim();
      var company = (document.getElementById("f-company").value || "").trim();
      var need = (document.getElementById("f-need").value || "").trim();
      var subject = (lang === "fr" ? "Projet — " : "Project — ") + (company || name || "");
      var body = (lang === "fr" ? "Nom : " : "Name: ") + name + "\n" + (lang === "fr" ? "Entreprise : " : "Company: ") + company + "\n\n" + need + "\n";
      window.location.href = "mailto:" + form.getAttribute("data-email") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  if (document.readyState === "complete") { setTimeout(measure, 0); }
  else { window.addEventListener("load", function () { setTimeout(measure, 0); }); }
})();

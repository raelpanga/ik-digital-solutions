// Demonstration layer for the portfolio copy of TRUTH Construction & Development.
// A classic script, so it runs before the site's own deferred modules.
(function () {
  // English case-study links open the copy in English. The site keeps its language
  // in localStorage, so the choice is written before its language module reads it.
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "fr") localStorage.setItem("truth-language", q);
  } catch (e) {}
  // WhatsApp, phone and e-mail are the client's real routes. People exploring the
  // portfolio should not reach them by accident, so those links are intercepted.
  var contact = /^(https:\/\/wa\.me\/|tel:|mailto:)/, box, timer;
  function notice() {
    var en = document.documentElement.lang === "en";
    if (!box) { box = document.createElement("p"); box.className = "ik-notice"; box.setAttribute("role", "status"); document.body.appendChild(box); }
    box.textContent = en
      ? "Contact buttons are disabled in this demonstration copy. The live site reaches TRUTH directly."
      : "Les boutons de contact sont désactivés dans cette copie de démonstration. Le site en ligne joint TRUTH directement.";
    box.hidden = false; clearTimeout(timer); timer = setTimeout(function () { box.hidden = true; }, 4200);
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("a[href], #copy-email");
    if (!el) return;
    if (el.id === "copy-email" || contact.test(el.getAttribute("href") || "")) {
      e.preventDefault(); e.stopImmediatePropagation(); notice();
    }
  }, true);
})();

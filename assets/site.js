/* Portfolio interactions: navigation, progressive project filters and local message preparation. */
"use strict";
(() => {
  const $ = s => document.querySelector(s);
  const all = s => [...document.querySelectorAll(s)];
  const lang = document.documentElement.lang;
  const fr = lang === "fr";
  const syncLanguages = () => all("[data-language]").forEach(a => {
    const url = new URL(a.href); url.search = location.search; url.hash = location.hash; a.href = url.href;
  });
  syncLanguages();
  const toggle = $(".nav-toggle"), nav = $("#main-nav");
  if (toggle && nav) {
    const close = () => { toggle.setAttribute("aria-expanded", "false"); toggle.textContent = toggle.dataset.open; nav.classList.remove("is-open"); };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open)); toggle.textContent = open ? toggle.dataset.close : toggle.dataset.open;
      nav.classList.toggle("is-open", open);
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { close(); toggle.focus(); } });
    document.addEventListener("click", e => { if (!e.target.closest(".site-header")) close(); });
    nav.addEventListener("click", e => { if (e.target.closest("a")) close(); });
    matchMedia("(min-width: 1101px)").addEventListener("change", close);
    document.documentElement.classList.add("js");
  }
  const choose = (select, value) => { if (select && [...select.options].some(o => o.value === value)) select.value = value; };
  const filters = $("[data-work-filters]");
  if (filters) {
    filters.hidden = false;
    const service = $("#work-service"), chips = all("[data-kind-filter]"), params = new URLSearchParams(location.search);
    const demoGrid = $(".work-group"), studyGrid = $(".concept-grid"), studyBtn = $("[data-study-toggle]");
    let studiesOpen = false;
    choose(service, params.get("service"));
    let kind = params.get("kind") || "";
    if (!chips.some(c => c.dataset.kindFilter === kind)) kind = "";
    const filter = () => {
      let visible = 0;
      const picked = service ? service.value : "";
      all(".work-card").forEach(card => {
        const match = (!picked || card.dataset.services.split(" ").includes(picked)) && (!kind || card.dataset.kind === kind);
        card.hidden = !match; if (match) visible++;
      });
      // A section whose cards are all filtered out takes its heading with it.
      all("[data-work-section]").forEach(s => { s.hidden = !s.querySelector(".work-card:not([hidden])"); });
      // The demonstrator grid leads with one oversized card; that placement only holds while all six are shown.
      if (demoGrid) demoGrid.classList.toggle("is-filtered", all(".work-group .work-card").some(c => c.hidden));
      // Studies collapse to the first four, unless the visitor opened them or is filtering.
      if (studyGrid && studyBtn) {
        const filtering = !!picked || !!kind;
        studyGrid.classList.toggle("is-collapsed", !studiesOpen && !filtering);
        studyBtn.hidden = filtering;
        studyBtn.textContent = studiesOpen ? studyBtn.dataset.less : studyBtn.dataset.more;
        studyBtn.setAttribute("aria-expanded", String(studiesOpen));
      }
      chips.forEach(c => c.setAttribute("aria-pressed", String(c.dataset.kindFilter === kind)));
      const counter = $("#work-count");
      counter.textContent = visible + " " + (visible === 1 && counter.dataset.unitOne ? counter.dataset.unitOne : counter.dataset.unit);
      $("#work-empty").hidden = visible !== 0;
      const url = new URL(location.href);
      for (const [key, value] of [["service", picked], ["kind", kind]]) { if (value) url.searchParams.set(key, value); else url.searchParams.delete(key); }
      history.replaceState(null, "", url); syncLanguages();
    };
    if (service) service.addEventListener("change", filter);
    chips.forEach(c => c.addEventListener("click", () => { kind = c.dataset.kindFilter; filter(); }));
    if (studyBtn) {
      studyBtn.hidden = false;
      studyBtn.addEventListener("click", () => { studiesOpen = !studiesOpen; filter(); });
    }
    filter();
  }
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!motion.matches) entry.target.animate([{ transform: "translateY(22px)" }, { transform: "translateY(0)" }], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" });
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    all(".work-card, .offer-card, .integration-feature, .local-principles > div").forEach(el => observer.observe(el));
    motion.addEventListener("change", () => { if (motion.matches) document.getAnimations().forEach(a => a.cancel()); });
  }
  const form = $("#contact-form");
  if (form) {
    $("#f-whatsapp").hidden = false;
    const service = $("#f-service"), project = $("#f-project"), params = new URLSearchParams(location.search);
    choose(service, params.get("service")); choose(project, params.get("project"));
    const context = () => {
      const url = new URL(location.href);
      for (const [key, value] of [["service", service.value], ["project", project.value]]) { if (value) url.searchParams.set(key, value); else url.searchParams.delete(key); }
      history.replaceState(null, "", url); syncLanguages();
    };
    service.addEventListener("change", context); project.addEventListener("change", context); context();
    const message = () => {
      const name = $("#f-name").value.trim(), company = $("#f-company").value.trim(), need = $("#f-need").value.trim();
      return (fr ? "Bonjour IK Digital Solutions,\n\nNom : " : "Hello IK Digital Solutions,\n\nName: ") + name + "\n" + (fr ? "Entreprise : " : "Company: ") + company + "\n" +
        (fr ? "Service : " : "Service: ") + service.selectedOptions[0].textContent + "\n" + (fr ? "Projet de référence : " : "Reference project: ") + project.selectedOptions[0].textContent + "\n\n" + need;
    };
    form.addEventListener("submit", e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      const subject = (fr ? "Projet : " : "Project: ") + ($("#f-company").value.trim() || $("#f-name").value.trim());
      location.href = "mailto:" + form.dataset.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message());
    });
    $("#f-whatsapp").addEventListener("click", () => {
      if (!form.reportValidity()) return;
      window.open("https://wa.me/" + form.dataset.whatsapp + "?text=" + encodeURIComponent(message()), "_blank", "noopener,noreferrer");
    });
  }
})();

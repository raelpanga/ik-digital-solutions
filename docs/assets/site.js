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
      document.dispatchEvent(new Event("workfilterchange"));
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
    filter();
  }
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  // Native scroll snapping keeps touch scrolling and the no-JavaScript fallback usable.
  all("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".work-carousel-track");
    const slides = [...track.querySelectorAll(".work-card")];
    const controls = carousel.querySelector(".carousel-controls");
    const previous = carousel.querySelector("[data-carousel-prev]"), next = carousel.querySelector("[data-carousel-next]");
    const toggle = carousel.querySelector("[data-carousel-toggle]");
    const dots = [...carousel.querySelectorAll("[data-carousel-project]")];
    let items = [], index = 0, direction = 1, timer, scrollFrame, inView = false, hovered = false;
    let paused = motion.matches, drag = null, suppressClick = false;
    const position = slide => slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const sync = () => {
      const active = items[index];
      previous.disabled = index === 0;
      next.disabled = index >= items.length - 1;
      toggle.textContent = paused || motion.matches ? (fr ? "Lecture" : "Play") : "Pause";
      toggle.setAttribute("aria-label", paused || motion.matches ? (fr ? "Démarrer le défilement automatique" : "Start automatic slideshow") : (fr ? "Mettre le défilement en pause" : "Pause automatic slideshow"));
      toggle.hidden = motion.matches || items.length < 2;
      dots.forEach(dot => {
        const slide = slides.find(s => s.dataset.project === dot.dataset.carouselProject);
        dot.hidden = slide.hidden;
        if (slide === active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      slides.forEach(slide => {
        const current = slide === active;
        slide.setAttribute("aria-hidden", String(!current));
        slide.querySelectorAll("a").forEach(a => a.tabIndex = current ? 0 : -1);
      });
    };
    const go = target => {
      if (!items.length) return;
      index = Math.max(0, Math.min(target, items.length - 1));
      track.scrollTo({ left: position(items[index]), behavior: motion.matches ? "instant" : "smooth" });
      sync();
    };
    const schedule = () => {
      clearTimeout(timer);
      if (paused || motion.matches || hovered || !inView || document.hidden || items.length < 2) return;
      timer = setTimeout(() => {
        // Reverse at the ends, avoiding a long rewind across every project.
        if (index === items.length - 1) direction = -1;
        if (index === 0) direction = 1;
        go(index + direction);
        schedule();
      }, 6500);
    };
    const stop = () => { paused = true; schedule(); sync(); };
    const refresh = () => {
      items = slides.filter(slide => !slide.hidden);
      index = 0; direction = 1;
      track.scrollTo({ left: 0, behavior: "instant" });
      carousel.querySelector(".carousel-hint").hidden = items.length < 2;
      controls.hidden = items.length < 2;
      sync(); schedule();
    };
    slides.forEach(slide => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", fr ? "diapositive" : "slide");
      slide.setAttribute("aria-label", slide.querySelector("h3").textContent);
    });
    previous.addEventListener("click", () => { stop(); go(index - 1); });
    next.addEventListener("click", () => { stop(); go(index + 1); });
    dots.forEach(dot => dot.addEventListener("click", () => {
      stop(); go(items.findIndex(slide => slide.dataset.project === dot.dataset.carouselProject));
    }));
    toggle.addEventListener("click", () => { paused = !paused; sync(); schedule(); });
    carousel.addEventListener("focusin", e => { if (e.target !== toggle) stop(); });
    carousel.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") { hovered = true; schedule(); } });
    carousel.addEventListener("pointerleave", () => { hovered = false; schedule(); });
    track.addEventListener("keydown", e => {
      if (e.target !== track || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault(); stop();
      go(e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : index + (e.key === "ArrowRight" ? 1 : -1));
    });
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        if (!items.length) return;
        index = items.reduce((best, slide, i) => Math.abs(position(slide) - track.scrollLeft) < Math.abs(position(items[best]) - track.scrollLeft) ? i : best, 0);
        sync();
      });
    }, { passive: true });
    track.addEventListener("wheel", stop, { passive: true });
    track.addEventListener("pointerdown", e => {
      stop();
      if (e.pointerType !== "mouse" || e.button !== 0 || e.target.closest("a,button")) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, left: track.scrollLeft, moved: false };
    });
    track.addEventListener("pointermove", e => {
      if (!drag || e.pointerId !== drag.id) return;
      if (!(e.buttons & 1)) { drag = null; track.classList.remove("is-dragging"); return; }
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - drag.y)) {
        drag.moved = true; track.setPointerCapture(e.pointerId); track.classList.add("is-dragging");
      }
      if (drag.moved) { e.preventDefault(); track.scrollLeft = drag.left - dx; }
    });
    const endDrag = e => {
      if (!drag || e.pointerId !== drag.id) return;
      const moved = drag.moved; drag = null;
      track.classList.remove("is-dragging");
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
      if (moved) {
        suppressClick = true;
        const closest = items.reduce((best, slide, i) => Math.abs(position(slide) - track.scrollLeft) < Math.abs(position(items[best]) - track.scrollLeft) ? i : best, 0);
        go(closest); setTimeout(() => { suppressClick = false; }, 0);
      }
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("lostpointercapture", endDrag);
    track.addEventListener("click", e => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } }, true);
    new ResizeObserver(() => { if (items[index]) track.scrollTo({ left: position(items[index]), behavior: "instant" }); }).observe(track);
    if ("IntersectionObserver" in window) new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .55; schedule();
    }, { threshold: [0, .55] }).observe(carousel);
    document.addEventListener("visibilitychange", schedule);
    document.addEventListener("workfilterchange", refresh);
    motion.addEventListener("change", () => { paused = motion.matches || paused; sync(); schedule(); });
    refresh();
  });
  const heroVideo = $(".hero-motion-video"), heroToggle = $(".hero-motion-toggle");
  if (heroVideo && heroToggle) {
    let userPaused = false;
    const sync = () => {
      const paused = heroVideo.paused;
      heroToggle.querySelector("span").textContent = paused ? "▶" : "Ⅱ";
      heroToggle.setAttribute("aria-label", paused ? heroToggle.dataset.play : heroToggle.dataset.pause);
    };
    const update = () => {
      heroToggle.hidden = motion.matches;
      if (motion.matches) heroVideo.pause();
      else if (!userPaused) heroVideo.play().catch(sync);
      sync();
    };
    heroToggle.addEventListener("click", () => {
      if (heroVideo.paused) { userPaused = false; heroVideo.play().catch(sync); }
      else { userPaused = true; heroVideo.pause(); }
      sync();
    });
    heroVideo.addEventListener("play", sync);
    heroVideo.addEventListener("pause", sync);
    motion.addEventListener("change", update);
    update();
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!motion.matches) entry.target.animate([{ transform: "translateY(22px)" }, { transform: "translateY(0)" }], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" });
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    all(".work-card, .integration-feature, .local-principles > div").forEach(el => observer.observe(el));
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

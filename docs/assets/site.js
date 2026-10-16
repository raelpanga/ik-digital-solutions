/* Portfolio interactions: navigation, progressive project filters, contact form delivery (Web3Forms) and WhatsApp message preparation. */
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
      all(".work-card[data-project]").forEach(card => {
        const match = (!picked || card.dataset.services.split(" ").includes(picked)) && (!kind || card.dataset.kind === kind);
        card.hidden = !match; if (match) visible++;
      });
      // A section whose cards are all filtered out takes its heading with it.
      all("[data-work-section]").forEach(s => { s.hidden = !s.querySelector(".work-card[data-project]:not([hidden])"); });
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
  // A continuous, constant-speed stream with native touch scrolling and seamless copies.
  all("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".work-carousel-track");
    const slides = [...track.querySelectorAll("[data-project]")];
    const controls = carousel.querySelector(".carousel-controls");
    const previous = carousel.querySelector("[data-carousel-prev]"), next = carousel.querySelector("[data-carousel-next]");
    const toggle = carousel.querySelector("[data-carousel-toggle]");
    const dots = [...carousel.querySelectorAll("[data-carousel-project]")];
    let items = [], index = 0, origin = 0, cycle = 0, stride = 0, width = 0;
    let paused = motion.matches, hovered = false, inView = false, drag = null, suppressClick = false;
    let frame = 0, lastTime = 0, remainder = 0, settling = 0, navigating = false;
    const position = slide => slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const phase = () => cycle ? ((track.scrollLeft - origin) % cycle + cycle) % cycle : 0;
    const sync = () => {
      index = items.length ? Math.round(phase() / stride) % items.length : 0;
      previous.disabled = next.disabled = items.length < 2;
      toggle.textContent = paused || motion.matches ? (fr ? "Lecture" : "Play") : "Pause";
      toggle.setAttribute("aria-label", paused || motion.matches ? (fr ? "Démarrer le défilement continu" : "Start continuous motion") : (fr ? "Mettre le défilement en pause" : "Pause continuous motion"));
      toggle.hidden = motion.matches || items.length < 2;
      dots.forEach(dot => {
        const slide = slides.find(s => s.dataset.project === dot.dataset.carouselProject);
        dot.hidden = slide.hidden;
        if (slide === items[index]) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };
    const normalize = () => {
      if (items.length < 2 || !cycle) return;
      const offset = track.scrollLeft - origin;
      if (offset < -.5 || offset >= cycle) track.scrollLeft = origin + ((offset % cycle + cycle) % cycle);
    };
    const running = () => !paused && !motion.matches && !hovered && inView && !document.hidden && items.length > 1;
    const tick = time => {
      frame = 0;
      if (!running()) { lastTime = 0; return; }
      if (lastTime) {
        // Accumulate fractions so rounded browser scroll positions do not alter the speed.
        remainder += Math.min(time - lastTime, 64) * 36 / 1000;
        const pixels = Math.floor(remainder); remainder -= pixels;
        if (pixels) { track.scrollLeft += pixels; normalize(); }
      }
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      cancelAnimationFrame(frame); frame = 0; lastTime = 0;
      if (running()) frame = requestAnimationFrame(tick);
    };
    const stop = () => { paused = true; schedule(); sync(); };
    const copy = slide => {
      const clone = slide.cloneNode(true);
      clone.dataset.carouselClone = "";
      clone.removeAttribute("data-project");
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a").forEach(a => a.tabIndex = -1);
      return clone;
    };
    const rebuild = (reset = true) => {
      const fraction = reset || !cycle ? 0 : phase() / cycle;
      cancelAnimationFrame(frame); frame = 0; lastTime = 0; remainder = 0;
      clearTimeout(settling); navigating = false;
      track.querySelectorAll("[data-carousel-clone]").forEach(node => node.remove());
      track.classList.remove("is-looping");
      items = slides.filter(slide => !slide.hidden);
      width = track.clientWidth;
      origin = cycle = stride = 0;
      if (items.length && width) {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        stride = items[0].getBoundingClientRect().width + gap;
        cycle = stride * items.length;
        if (items.length > 1) {
          const copies = Math.max(1, Math.ceil(width / cycle));
          const before = document.createDocumentFragment(), after = document.createDocumentFragment();
          for (let i = 0; i < copies; i++) items.forEach(slide => { before.append(copy(slide)); after.append(copy(slide)); });
          track.prepend(before); track.append(after); track.classList.add("is-looping");
        }
        origin = position(items[0]);
        track.scrollTo({ left: origin + fraction * cycle, behavior: "instant" });
      }
      carousel.querySelector(".carousel-hint").hidden = items.length < 2;
      controls.hidden = items.length < 2;
      sync(); schedule();
    };
    const go = target => {
      if (!items.length) return;
      navigating = true;
      track.scrollTo({ left: origin + target * stride, behavior: motion.matches ? "instant" : "smooth" });
      clearTimeout(settling);
      settling = setTimeout(() => { navigating = false; normalize(); sync(); }, 700);
    };
    slides.forEach(slide => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", fr ? "diapositive" : "slide");
      slide.setAttribute("aria-label", slide.querySelector("h3").textContent);
    });
    previous.addEventListener("click", () => { stop(); go(Math.round(phase() / stride) - 1); });
    next.addEventListener("click", () => { stop(); go(Math.round(phase() / stride) + 1); });
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
      go(e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : Math.round(phase() / stride) + (e.key === "ArrowRight" ? 1 : -1));
    });
    track.addEventListener("scroll", () => {
      if (!navigating && !drag) normalize();
      sync();
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
      if (moved) { normalize(); suppressClick = true; setTimeout(() => { suppressClick = false; }, 0); }
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("lostpointercapture", endDrag);
    track.addEventListener("click", e => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } }, true);
    new ResizeObserver(() => { if (track.clientWidth !== width) rebuild(false); }).observe(track);
    if ("IntersectionObserver" in window) new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting; schedule();
    }, { threshold: 0 }).observe(carousel);
    document.addEventListener("visibilitychange", schedule);
    document.addEventListener("workfilterchange", () => rebuild());
    motion.addEventListener("change", () => { paused = motion.matches || paused; sync(); schedule(); });
    rebuild();
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
    all(".work-card:not([data-carousel-clone]), .integration-feature, .local-principles > div").forEach(el => observer.observe(el));
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
    const status = $("#f-status"), submit = form.querySelector('button[type="submit"]');
    const notify = (text, kind) => { status.textContent = text; status.classList.toggle("is-success", kind === "success"); status.classList.toggle("is-error", kind === "error"); status.hidden = false; };
    form.addEventListener("submit", async e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      // Web3Forms delivers the fields by e-mail; readable labels replace the option keys.
      const data = Object.fromEntries(new FormData(form));
      data.subject = (fr ? "Projet : " : "Project: ") + ($("#f-company").value.trim() || $("#f-name").value.trim());
      data.service = service.selectedOptions[0].textContent; data.project = project.selectedOptions[0].textContent; data.language = lang;
      submit.disabled = true; submit.textContent = submit.dataset.busy; status.hidden = true;
      try {
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
        form.reset(); context();
        notify(fr ? "Merci, votre demande est envoyée. Nous vous répondons par e-mail." : "Thank you, your inquiry has been sent. We will reply by e-mail.", "success");
      } catch (err) {
        notify((fr ? "L'envoi a échoué. Écrivez-nous directement à " : "Sending failed. Write to us directly at ") + form.dataset.email + (fr ? " ou préparez un message WhatsApp." : " or prepare a WhatsApp message."), "error");
      } finally { submit.disabled = false; submit.textContent = submit.dataset.label; }
    });
    $("#f-whatsapp").addEventListener("click", () => {
      // WhatsApp needs no e-mail address: only the name and the request are checked.
      if (!$("#f-name").reportValidity() || !$("#f-need").reportValidity()) return;
      window.open("https://wa.me/" + form.dataset.whatsapp + "?text=" + encodeURIComponent(message()), "_blank", "noopener,noreferrer");
    });
  }
})();

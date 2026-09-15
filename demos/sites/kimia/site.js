/* Kimia Express demonstrator. All actions are local; no payment or message is sent. */
"use strict";
(() => {
  const C = window.KX, lang = document.documentElement.lang, J = C.js[lang];
  const $ = (s, root = document) => root.querySelector(s);
  const all = (s, root = document) => [...root.querySelectorAll(s)];
  const L = v => v && typeof v === "object" ? v[lang] : v;
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = (s, values) => s.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");
  const money = n => Math.round(n).toLocaleString(J.locale) + " FC";
  const city = key => C.cities.find(c => c.key === key);
  const value = (f, k) => f.elements.namedItem(k)?.value || "";
  const num = (f, k) => Math.max(0, Number(value(f, k)) || 0);
  const checked = (f, k) => !!f.elements.namedItem(k)?.checked;
  const text = (s, v) => { const el = $(s); if (el) el.textContent = v; };
  const lines = rows => rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  const storage = {
    get(k, fallback) { try { return JSON.parse(localStorage.getItem("kx-" + k)) ?? fallback; } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem("kx-" + k, JSON.stringify(v)); } catch { /* private browsing */ } }
  };
  const toast = message => { const el = $("#toast"); el.textContent = message; el.hidden = false; setTimeout(() => el.hidden = true, 5000); };
  const languageLinks = () => all("[data-lang-link]").forEach(a => { const u = new URL(a.href); u.search = location.search; u.hash = location.hash; a.href = u.href; });
  languageLinks();
  $("#navtoggle")?.addEventListener("click", e => {
    const open = $("#nav").classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { $("#nav")?.classList.remove("open"); $("#navtoggle")?.setAttribute("aria-expanded", "false"); } });
  if (!storage.get("consent", null)) $("#consent").hidden = false;
  for (const choice of ["yes", "no"]) $("#c-" + choice)?.addEventListener("click", () => { storage.set("consent", choice); $("#consent").hidden = true; });
  all("[data-doc]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    const dialog = document.createElement("dialog"); dialog.className = "dialog";
    dialog.innerHTML = `<h2>${esc(a.dataset.doc)}</h2><p>${esc(J.docBody)}</p><form method="dialog"><button class="btn btn-primary">${esc(J.close)}</button></form>`;
    document.body.append(dialog); dialog.addEventListener("close", () => { dialog.remove(); a.focus(); }); dialog.showModal();
  }));
  all("[data-tab]").forEach(button => button.addEventListener("click", () => {
    const root = button.closest("[data-qw]");
    all("[data-tab]", root).forEach(b => b.setAttribute("aria-selected", String(b === button)));
    all("[data-pane]", root).forEach(p => p.hidden = p.dataset.pane !== button.dataset.tab);
  }));

  function estimate(f) {
    const from = city(value(f, "from")), to = city(value(f, "to")), P = C.prices;
    let size = C.sizes.find(s => s.key === value(f, "size")) || C.sizes[1];
    const weight = Math.max(num(f, "kg"), num(f, "dl") * num(f, "dw") * num(f, "dh") / 5000);
    if (weight > 30) return { error: J.tooHeavy };
    if (weight) size = C.sizes.find(s => s.max >= weight);
    const urban = from.key === to.key;
    if (urban && !from.urban) return { error: J.noUrban };
    const mode = urban ? "urban" : from.mode === "air" || to.mode === "air" ? "air" : "road";
    const zone = c => c.communes?.find(x => x[0] === value(f, c === from ? "fc" : "tc"))?.[1] || 1;
    const base = P[mode][size.key], extra = urban ? (Math.max(zone(from), to.communes?.find(x => x[0] === value(f, "tc"))?.[1] || 1) - 1) * P.zoneStep : 0;
    const express = value(f, "speed") === "exp";
    const exp = express ? (base + extra) * ((urban ? P.urbanExpress : P.intercityExpress) - 1) : 0;
    const relay = ["pickup", "drop"].filter(k => value(f, k) === "relay").length * (urban ? P.relayUrban : P.relayIntercity);
    const insurance = Math.max(0, num(f, "value") - P.insuredIncluded) * P.insuranceRate;
    const cod = checked(f, "cod") ? Math.max(P.codMin, num(f, "codAmount") * P.codRate) : 0;
    const total = Math.max(0, Math.round(base + extra + exp - relay + insurance + cod));
    let days = from.key === "kin" ? to.days : to.key === "kin" ? from.days : from.region === to.region ? P.regionalDays[from.region] || 2 : from.days + to.days;
    if (express) days = Math.max(mode === "road" ? 0 : 1, days - 1);
    const date = new Date(); date.setDate(date.getDate() + days);
    const eta = urban ? express ? J.urbanExp : J.urbanStd : fmt(J.etaDate, { d: date.toLocaleDateString(J.locale) });
    return { from, to, size, weight, mode, total, eta, rows: [[J.lines.base, money(base)], [J.lines.zone, money(extra)], [J.lines.express, money(exp)], [J.lines.relay, money(-relay)], [J.lines.insurance, money(insurance)], [J.lines.cod, money(cod)]] };
  }
  function cities(f) {
    for (const side of ["f", "t"]) {
      const c = city(value(f, side === "f" ? "from" : "to")), select = $(`[data-commune="${side}"]`, f);
      if (select && select.dataset.forCity !== c.key) {
        const old = select.value; select.innerHTML = (c.communes || []).map(([n]) => `<option>${esc(n)}</option>`).join("");
        if (all("option", select).some(o => o.value === old)) select.value = old;
        select.dataset.forCity = c.key; select.closest(".field").hidden = !c.communes;
      }
      const relay = $(`[data-relays="${side}"]`, f);
      if (relay && relay.dataset.forCity !== c.key) {
        relay.innerHTML = C.relays.filter(r => r.city === c.key).map(r => `<option value="${esc(r.n)}">${esc(r.n)}</option>`).join(""); relay.dataset.forCity = c.key;
      }
    }
  }
  all("[data-quote]").forEach(f => {
    const update = () => {
      cities(f); const q = estimate(f);
      $('[data-q="total"]', f).textContent = q.error || money(q.total);
      $('[data-q="usd"]', f).textContent = q.error ? "" : fmt(J.usd, { n: (q.total / C.rate).toFixed(2) });
      $('[data-q="eta"]', f).textContent = q.error ? "" : q.eta;
      $('button[type="submit"]', f).disabled = !!q.error;
    };
    f.addEventListener("change", update); update();
  });

  const wizard = $("#wizard");
  if (wizard) {
    let step = 0;
    for (const [k, v] of new URLSearchParams(location.search)) {
      if (!["from", "to", "fc", "tc", "size", "speed"].includes(k)) continue;
      const field = wizard.elements.namedItem(k); if (field) field.value = v;
    }
    const update = () => {
      cities(wizard);
      const pm = C.payments.find(p => p.key === value(wizard, "pm"));
      all("[data-when]", wizard).forEach(el => {
        const [k, v] = el.dataset.when.split("-");
        const show = k === "pm" && v === "mm" ? pm.mm : v ? value(wizard, k) === v : checked(wizard, k);
        el.hidden = !show; all("input,select,textarea", el).forEach(input => input.disabled = !show);
      });
      const q = estimate(wizard);
      text('[data-out="total"]', q.error || money(q.total));
      text('[data-out="usd"]', q.error ? "" : fmt(J.usd, { n: (q.total / C.rate).toFixed(2) }));
      text('[data-out="eta"]', q.eta || "");
      $('[data-out="summary"]').innerHTML = q.error ? "" : lines([[J.route, q.from.n + " → " + q.to.n], ...q.rows]);
      text('[data-out="billed"]', q.error || fmt(J.billed, { w: q.weight || q.size.max, s: L(q.size.t) }));
      $('[data-out="battery"]').hidden = !checked(wizard, "battery") || q.mode !== "air";
      return q;
    };
    const show = () => {
      all("[data-step]", wizard).forEach(p => p.hidden = Number(p.dataset.step) !== step);
      all("[data-step-tab]", wizard).forEach(p => { p.classList.toggle("on", Number(p.dataset.stepTab) === step); if (Number(p.dataset.stepTab) === step) p.setAttribute("aria-current", "step"); else p.removeAttribute("aria-current"); });
      $('[data-wiz="back"]').hidden = step === 0; $('[data-wiz="next"]').hidden = step === 3; $('[data-wiz="confirm"]').hidden = step !== 3;
      text('[data-out="err"]', "");
    };
    const valid = () => {
      for (const input of all("input,select,textarea", $(`[data-step="${step}"]`, wizard))) {
        if (!input.disabled && !input.checkValidity()) { input.reportValidity(); return false; }
      }
      const q = update(); text('[data-out="err"]', q.error || ""); return !q.error;
    };
    wizard.addEventListener("input", update); wizard.addEventListener("change", update);
    $('[data-wiz="next"]').addEventListener("click", () => { if (valid()) { step++; show(); } });
    $('[data-wiz="back"]').addEventListener("click", () => { step--; show(); });
    wizard.addEventListener("submit", e => {
      e.preventDefault(); if (step !== 3 || !valid()) return;
      const pm = C.payments.find(p => p.key === value(wizard, "pm"));
      if (pm.mm && !/^\+?\d[\d\s-]{8,17}$/.test(value(wizard, "mmPhone"))) { text('[data-out="err"]', J.badPhone); return; }
      const q = update(), id = "KX-" + new Date().getFullYear() + "-" + String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, "0");
      // Store only the demo route and price, never contact details or uploaded files.
      const shipment = { id, from: q.from.n, to: q.to.n, fromCity: q.from.key, toCity: q.to.key, size: q.size.key, weight: (q.weight || q.size.max) + " kg", mode: q.mode, speed: value(wizard, "speed"), status: "booked", stage: 0, events: [{ d: new Date().toISOString(), t: { fr: "Réservation simulée", en: "Simulated booking" }, p: q.from.n }] };
      storage.set("shipments", [...storage.get("shipments", []).slice(-49), shipment]);
      all("[data-step],.wiz-nav", wizard).forEach(el => el.hidden = true);
      const done = $('[data-out="done"]'); done.hidden = false;
      done.innerHTML = `<h2>${esc(J.okTitle)}</h2><p>${esc(J.okSms)}</p><p>${esc(J.okTrack)} <b>${id}</b></p><p>${esc(q.from.n)} → ${esc(q.to.n)} · ${esc(money(q.total))}</p><a class="btn btn-primary" href="${C.files[lang].track}?n=${id}">${esc(J.trackIt)}</a> <a class="btn btn-ghost" href="${C.files[lang].send}">${esc(J.newOne)}</a>`;
    });
    update(); show();
  }

  const track = $("#track-form");
  if (track) {
    const render = n => {
      n = n.trim().toUpperCase(); $("#track-n").value = n;
      const shipment = [...C.shipments, ...storage.get("shipments", [])].find(s => s.id === n);
      text("#track-err", !/^KX-\d{4}-\d{6}$/.test(n) ? J.trackBad : shipment ? "" : J.trackNone);
      $("#track-out").innerHTML = ""; if (!shipment) return;
      const u = new URL(location.href); u.searchParams.set("n", n); history.replaceState(null, "", u); languageLinks();
      const s = shipment;
      $("#track-out").innerHTML = `<article class="card pad"><h2>${esc(s.id)}</h2><p class="status">${esc(J.status[s.status])}</p><dl>${lines([[J.route, s.from + " → " + s.to], [J.parcel, L(C.sizes.find(x => x.key === s.size).t)], [J.mode, J.modes[s.mode]], [J.weight, s.weight]])}</dl><ol class="timeline">${s.events.map(ev => `<li><time>${esc(new Date(ev.d).toLocaleString(J.locale))}</time><p>${esc(L(ev.t))}<br>${esc(L(ev.p))}</p></li>`).join("")}</ol>${s.next ? `<p>${esc(L(s.next))}</p>` : ""}${s.courier ? `<h3>${esc(J.courier)}</h3><p>${esc(s.courier.n)} · ${esc(L(s.courier.v))}</p>` : ""}${s.proof ? `<h3>${esc(J.proofT)}</h3><dl>${lines([[J.receivedBy, s.proof.by], [J.at, new Date(s.proof.at).toLocaleString(J.locale)], [J.codCollected, money(s.proof.cod)], [J.payout, L(s.proof.payout)]])}</dl>` : ""}<button class="btn btn-ghost" type="button" id="share-track">${esc(J.share)}</button></article>`;
      $("#share-track").addEventListener("click", async () => { try { await navigator.clipboard.writeText(location.href); toast(J.copied); } catch { toast(location.href); } });
    };
    track.addEventListener("submit", e => { e.preventDefault(); render(value(track, "n")); });
    all("[data-track]").forEach(b => b.addEventListener("click", () => render(b.dataset.track)));
    const n = new URLSearchParams(location.search).get("n"); if (n) render(n);
  }

  for (const [id, fields, message] of [
    ["relay", [["city", "city"], ["q", "text"]], J.noRelay], ["job", [["city", "city"], ["dept", "dept"]], J.noJobs],
    ["faq", [["cat", "cat"], ["q", "text"]], J.noFaq], ["news", [["cat", "cat"], ["q", "text"]], J.noNews]
  ]) {
    const list = $("#" + id + "-list"); if (!list) continue;
    const filter = () => {
      let count = 0;
      all(":scope > li", list).forEach(row => {
        const match = fields.every(([name, attr]) => { const needle = $("#" + id + "-" + name).value.toLowerCase(); const hay = (attr === "text" ? row.dataset.text || row.textContent : row.dataset[attr] || "").toLowerCase(); return !needle || (name === "q" ? hay.includes(needle) : hay === needle); });
        row.hidden = !match; if (match) count++;
      });
      const empty = $("#" + id + "-empty"); empty.hidden = count > 0; empty.textContent = message;
    };
    fields.forEach(([name]) => $("#" + id + "-" + name).addEventListener("input", filter)); filter();
  }
  all("[data-apply]").forEach(b => b.addEventListener("click", () => { $("#ap-job").value = b.dataset.apply; $("#ap-name").focus(); }));
  for (const [id, message] of [["biz", J.bizOk], ["apply", J.applyOk], ["claim", J.claimOk], ["contact", J.formOk], ["notify", J.notifyOk]]) {
    const form = $("#" + id + "-form"); if (!form) continue;
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (id === "claim" && !/^KX-\d{4}-\d{6}$/i.test(value(form, "tracking"))) { text("#claim-out", J.invalidTracking); return; }
      text("#" + id + "-out", fmt(message, { r: "KX-" + Date.now().toString(36).toUpperCase(), p: value(form, "phone"), c: value(form, "channel") }));
    });
  }
  const vol = $("#vol-form");
  vol?.addEventListener("submit", e => {
    e.preventDefault(); const v = num(vol, "dl") * num(vol, "dw") * num(vol, "dh") / 5000, b = Math.max(v, num(vol, "kg")), s = C.sizes.find(s => s.max >= b);
    text("#vol-out", fmt(s ? J.volOut : J.volOver, { v: v.toFixed(1), b: b.toFixed(1), s: s ? L(s.t) : "" })); $("#vol-out").hidden = false;
  });
  const sim = $("#sim-form");
  if (sim) {
    const update = () => {
      const n = num(sim, "orders"), urban = Math.min(100, num(sim, "urban")) / 100, cod = Math.min(100, num(sim, "cod")) / 100;
      const base = n * (urban * C.prices.sim.urbanAvg + (1 - urban) * C.prices.sim.interAvg);
      const rate = C.prices.sim.tiers.filter(([min]) => n >= min).at(-1)?.[1] || 0;
      const fee = n * cod * Math.max(C.prices.codMin, num(sim, "avg") * C.prices.codRate);
      $("#sim-out").innerHTML = lines([[J.sim.base, money(base)], [fmt(J.sim.discount, { p: Math.round(rate * 100) + "%" }), money(-base * rate)], [J.sim.cod, money(fee)], [J.sim.total, money(base * (1 - rate) + fee)]]);
    };
    sim.addEventListener("input", update); sim.addEventListener("submit", e => e.preventDefault()); update();
  }
  const earn = $("#earn-form");
  if (earn) {
    const update = () => {
      const days = num(earn, "daysWk") * 4, n = num(earn, "perDay") * days, gross = n * 2200, fuel = days * 5000;
      const rent = value(earn, "moto") === "rent" ? 45000 * 4 : 0, bonus = checked(earn, "bonus") ? 25000 * 4 : 0;
      all("[data-range-out]").forEach(o => o.textContent = value(earn, o.dataset.rangeOut));
      $("#earn-out").innerHTML = lines([[fmt(J.earn.gross, { n }), money(gross)], [J.earn.fuel + (lang === "fr" ? " (5 000 FC/jour, 4 semaines)" : " (5,000 FC/day, 4 weeks)"), money(-fuel)], [J.earn.rent, money(-rent)], [J.earn.bonus, money(bonus)], [J.earn.net, money(gross - fuel - rent + bonus)]]);
    };
    earn.addEventListener("input", update); earn.addEventListener("submit", e => e.preventDefault()); update();
  }
})();

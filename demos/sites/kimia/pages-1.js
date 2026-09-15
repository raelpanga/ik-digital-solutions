/* Kimia Express — page bodies: home, send, track. */
"use strict";
const K = require("./lib.js"), C = K.C;
const { esc, L, href, fc, pic, head, field, sel, figure } = K;
const ILLUS = lang => ["parcel-box.svg", "courier-motorbike.svg", lang === "en" ? "parcel-tracking-en.svg" : "parcel-tracking.svg", "delivery-van.svg"];

function home(lang, base) {
  const U = C.ui[lang], H = U.home;
  const hero = '<section class="hero-home"><div class="wrap hero-grid"><div class="hero-text"><p class="eyebrow">' + esc(H.eyebrow) + "</p><h1>" + esc(H.h1) + '</h1><p class="lead">' + esc(H.lead) + "</p>" + K.quickWidget(lang, base) + "</div>" +
    '<div class="hero-visual"><figure class="hero-photo"><img src="' + pic(base, "rider.jpg") + '" alt="' + (lang === "fr" ? "Coursier à moto chargé de cartons dans une rue de Kinshasa" : "Motorbike courier loaded with boxes on a Kinshasa street") + '"><figcaption>' + esc(H.photoCap) + "</figcaption></figure>" +
    '<div class="live-card" aria-hidden="true"><span class="live-dot"></span><div><small class="mono">' + C.shipments[1].id + "</small><b>" + esc(H.live.st) + "</b><span>" + esc(H.live.eta) + '</span><span class="who">' + esc(H.live.who) + "</span></div></div></div></div></section>";
  const stats = '<div class="stats"><div class="wrap">' + C.facts.map(f => "<div><b>" + esc(L(f.v, lang)) + "</b><span>" + esc(f[lang]) + "</span></div>").join("") + "</div></div>";
  const services = '<section><div class="wrap">' + head(H.servicesEyebrow, H.servicesTitle, H.servicesLead) + '<div class="grid-4">' + C.services.map(s => '<article class="card svc"><div class="pic"><img src="' + pic(base, s.img) + '" alt="" loading="lazy"></div><div class="body"><span class="meta">' + esc(s.delay[lang]) + "</span><h3>" + esc(s.t[lang]) + "</h3><p>" + esc(s.d[lang]) + '</p><p class="from">' + esc(U.common.from) + " <b>" + fc(s.from, lang) + "</b>" + (s.per ? " " + esc(s.per[lang]) : "") + "</p></div></article>").join("") + "</div></div></section>";
  const steps = '<section class="alt"><div class="wrap">' + head(H.stepsEyebrow, H.stepsTitle) + '<ol class="steps">' + H.steps.map((s, i) => '<li><div class="step-art"><img src="' + pic(base, ILLUS(lang)[i]) + '" alt="" loading="lazy"></div><span class="step-n">' + (i + 1) + "</span><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></li>").join("") + "</ol></div></section>";
  const net = '<section class="dark"><div class="wrap grid-2 net-teaser"><div>' + head(H.netEyebrow, H.netTitle, H.netLead) +
    '<div class="table-wrap"><table class="compact"><thead><tr>' + H.netCols.map((c, i) => "<th" + (i ? ' class="num"' : "") + ">" + esc(c) + "</th>").join("") + "</tr></thead><tbody>" +
    C.cities.filter(c => c.key !== "kin").map(c => "<tr><td><b>" + esc(c.n) + "</b> <small>" + esc(c.prov) + '</small></td><td class="num">' + esc(K.days(c.days, lang)) + '</td><td class="num">' + esc(K.days(K.expressDays(c), lang)) + "</td></tr>").join("") + "</tbody></table></div>" +
    '<p class="cta-line"><a class="btn btn-primary" href="' + href(lang, "network", base) + '">' + esc(H.netMore) + '</a></p></div><div class="map-wrap">' + K.networkMap(lang) + "</div></div></section>";
  const pay = '<section><div class="wrap grid-2 middle"><div>' + figure(base, "momo.jpg", H.payCap) + "</div><div>" + head(H.payEyebrow, H.payTitle, H.payLead) + K.payChips(lang) + "</div></div></section>";
  const biz = '<section class="alt"><div class="wrap grid-2 middle"><div>' + head(H.bizEyebrow, H.bizTitle, H.bizLead) + '<ul class="ticks">' + H.bizList.map(b => "<li>" + esc(b) + "</li>").join("") + '</ul><p class="cta-line"><a class="btn btn-dark" href="' + href(lang, "business", base) + '">' + esc(H.bizMore) + "</a></p></div><div>" + figure(base, "warehouse.jpg") + "</div></div></section>";
  const drv = '<section class="band"><img class="bg" src="' + pic(base, "goma-motos.jpg") + '" alt="" loading="lazy"><div class="wrap"><div class="band-card"><p class="eyebrow">' + esc(H.drvEyebrow) + "</p><h2>" + esc(H.drvTitle) + "</h2><p>" + esc(H.drvLead) + '</p><p class="cta-line"><a class="btn btn-primary" href="' + href(lang, "couriers", base) + '">' + esc(H.drvMore) + '</a></p></div></div><span class="credit">' + esc(H.drvCap) + "</span></section>";
  const news = '<section><div class="wrap news-grid"><div>' + head(H.newsEyebrow, H.newsTitle, null, '<a class="btn btn-ghost btn-small" href="' + href(lang, "about", base, "#actualites") + '">' + esc(H.newsMore) + "</a>") + '<ul class="news">' + C.news.slice(0, 3).map(n => K.newsItem(n, lang)).join("") + "</ul></div>" +
    '<aside class="app-card"><img src="' + pic(base, ILLUS(lang)[2]) + '" alt="" loading="lazy"><div><h3>' + esc(H.appTitle) + "</h3><p>" + esc(H.appLead) + '</p><div class="apps"><span>' + esc(H.apps[0]) + "</span><span>" + esc(H.apps[1]) + '</span><a href="' + K.wa(C.company.whatsapp) + '" rel="noopener">' + esc(H.apps[2]) + "</a></div></div></aside></div></section>";
  return hero + stats + services + steps + net + pay + biz + drv + news;
}

function send(lang, base) {
  const U = C.ui[lang], S = U.send;
  const radio = (name, value, label, checked, sub) => '<label class="radio"><input type="radio" name="' + name + '" value="' + value + '"' + (checked ? " checked" : "") + "><span>" + esc(label) + (sub ? "<small>" + esc(sub) + "</small>" : "") + "</span></label>";
  const party = (p, title, doorLabel, relayLabel, groupName, cityRef) => '<div class="party"><h3>' + esc(title) + "</h3>" +
    field(S.name, '<input name="' + p + 'Name" required autocomplete="name">') + field(S.phone, '<input name="' + p + 'Phone" type="tel" required placeholder="+243 81 234 56 78" autocomplete="tel">') +
    '<h4>' + esc(groupName === "pickup" ? S.pickupT : S.dropT) + "</h4>" + radio(groupName, "door", doorLabel, true) + radio(groupName, "relay", relayLabel, false) +
    '<div data-when="' + groupName + '-door">' + field(S.address, '<input name="' + p + 'Addr" required>') + field(S.landmark, '<input name="' + p + 'Mark" placeholder="' + esc(S.landmarkPh) + '">') + "</div>" +
    '<div data-when="' + groupName + '-relay" hidden>' + field(S.relay, '<select name="' + p + 'Relay" data-relays="' + cityRef + '"></select>') + "</div></div>";
  const pane0 = '<fieldset class="wiz-pane" data-step="0"><legend class="sr">' + esc(S.steps[0]) + '</legend><div class="route-pick">' +
    '<div class="rp"><h3>' + esc(S.from) + '</h3><div class="frow">' + field(S.city, sel("from", K.cityOpts(lang, "kin"), ' data-city="f"')) + field(S.commune, sel("fc", K.communeOpts("kin", "Gombe"), ' data-commune="f"'), "commune") + "</div></div>" +
    '<div class="rp"><h3>' + esc(S.to) + '</h3><div class="frow">' + field(S.city, sel("to", K.cityOpts(lang, "kin"), ' data-city="t"')) + field(S.commune, sel("tc", K.communeOpts("kin", "Ngaliema"), ' data-commune="t"'), "commune") + "</div></div></div>" +
    '<h3 class="sub">' + esc(S.sizeT) + '</h3><div class="size-grid">' + C.sizes.map(s => '<label class="opt"><input type="radio" name="size" value="' + s.key + '"' + (s.key === "s" ? " checked" : "") + '><span class="opt-ico ico-' + s.key + '" aria-hidden="true"></span><b>' + esc(s.t[lang]) + "</b><small>" + esc(s.sub[lang]) + "</small></label>").join("") + "</div>" +
    '<details class="dims"><summary>' + esc(S.dimsT) + '</summary><div class="frow4">' + field(S.weight, '<input name="kg" type="number" min="0" step="0.1" inputmode="decimal">') + field(S.L, '<input name="dl" type="number" min="0" inputmode="numeric">') + field(S.W, '<input name="dw" type="number" min="0" inputmode="numeric">') + field(S.H, '<input name="dh" type="number" min="0" inputmode="numeric">') + '</div><p class="note">' + esc(S.dimsHint) + '</p><p class="note strong" data-out="billed"></p></details>' +
    '<div class="frow">' + field(S.value, '<input name="value" type="number" min="0" step="1000" inputmode="numeric" placeholder="0"><small>' + esc(S.valueHint) + "</small>") + field(S.contents, sel("contents", S.contentsList)) + "</div>" +
    '<label class="check"><input type="checkbox" name="battery"><span>' + esc(S.battery) + '</span></label><p class="warn" data-out="battery" hidden>' + esc(S.batteryWarn) + "</p></fieldset>";
  const pane1 = '<fieldset class="wiz-pane" data-step="1" hidden><legend class="sr">' + esc(S.steps[1]) + '</legend><div class="parties">' +
    party("s", S.senderT, S.pickupDoor, S.pickupRelay, "pickup", "f") + party("r", S.recipT, S.dropDoor, S.dropRelay, "drop", "t") + '</div><p class="note">' + esc(S.relayDiscount) + "</p></fieldset>";
  const pane2 = '<fieldset class="wiz-pane" data-step="2" hidden><legend class="sr">' + esc(S.steps[2]) + '</legend><h3 class="sub">' + esc(S.speedT) + '</h3><div class="speed-grid">' +
    '<label class="opt"><input type="radio" name="speed" value="std" checked><b>' + esc(U.quick.std) + "</b><small>" + esc(S.stdSub) + '</small></label><label class="opt"><input type="radio" name="speed" value="exp"><b>' + esc(U.quick.exp) + "</b><small>" + esc(S.expSub) + "</small></label></div>" +
    '<h3 class="sub">' + esc(S.whenT) + '</h3><div class="radios">' + radio("when", "asap", S.asap, true) + radio("when", "later", S.later, false) + '</div><div class="frow" data-when="when-later" hidden>' + field(S.date, '<input type="date" name="date">') + field(S.slot, sel("slot", S.slots)) + "</div>" +
    '<h3 class="sub">' + esc(S.codT) + '</h3><label class="check"><input type="checkbox" name="cod"><span>' + esc(S.codCheck) + '</span></label><div data-when="cod" hidden>' + field(S.codAmount, '<input name="codAmount" type="number" min="0" step="500" inputmode="numeric">') + '<p class="note">' + esc(S.codHint) + "</p></div>" +
    field(S.notes, '<textarea name="notes" rows="3"></textarea>') + "</fieldset>";
  const pane3 = '<fieldset class="wiz-pane" data-step="3" hidden><legend class="sr">' + esc(S.steps[3]) + '</legend><h3 class="sub">' + esc(S.payer) + '</h3><div class="radios">' + radio("payer", "sender", S.payerSender, true) + radio("payer", "recipient", S.payerRecip, false) + "</div>" +
    '<h3 class="sub">' + esc(S.payT) + '</h3><div class="pay-grid">' + C.payments.map(p => '<label class="pay-opt pm-' + p.key + '"><input type="radio" name="pm" value="' + p.key + '"' + (p.key === "mpesa" ? " checked" : "") + '><i aria-hidden="true"></i><span>' + esc(L(p.n, lang)) + "</span></label>").join("") + "</div>" +
    '<div data-when="pm-mm">' + field(S.mmPhone, '<input name="mmPhone" type="tel" placeholder="+243 81 234 56 78">') + '</div><p class="note" data-when="pm-card" hidden>' + esc(S.cardNote) + '</p><p class="note" data-when="pm-cash" hidden>' + esc(S.cashNote) + '</p><div class="wiz-status" data-out="pay" aria-live="polite"></div></fieldset>';
  const form = '<form class="wizard" id="wizard" novalidate><ol class="wiz-steps">' + S.steps.map((t, i) => '<li data-step-tab="' + i + '"' + (i === 0 ? ' class="on" aria-current="step"' : "") + "><span>" + (i + 1) + "</span>" + esc(t) + "</li>").join("") + "</ol>" +
    pane0 + pane1 + pane2 + pane3 + '<div class="wiz-done" data-out="done" hidden></div><p class="err" data-out="err" role="alert"></p>' +
    '<div class="wiz-nav"><button type="button" class="btn btn-ghost" data-wiz="back" hidden>' + esc(S.back) + '</button><button type="button" class="btn btn-primary" data-wiz="next">' + esc(S.next) + '</button><button type="submit" class="btn btn-primary" data-wiz="confirm" hidden>' + esc(S.confirm) + "</button></div></form>";
  const side = '<aside class="wiz-side"><div class="summary"><h3>' + esc(S.summaryT) + '</h3><dl data-out="summary"></dl><div class="sum-total"><span>Total</span><b data-out="total">—</b><small data-out="usd"></small></div><p class="sum-eta" data-out="eta"></p></div><p class="note">' + esc(S.help) + "</p>" +
    '<div class="pack">' + figure(base, "packaging.jpg", S.packCap) + "<h4>" + esc(S.packT) + '</h4><ul class="ticks small">' + S.pack.map(p => "<li>" + esc(p) + "</li>").join("") + "</ul></div></aside>";
  return K.pageHead(lang, base, { h1: S.h1, lead: S.lead, img: "boxes.jpg", cap: lang === "fr" ? "Livraison à domicile, Kinshasa · Rahul Tilak, CC BY-SA 4.0" : "Home delivery, Kinshasa · Rahul Tilak, CC BY-SA 4.0" }) +
    '<section class="tight-top"><div class="wrap wiz-grid">' + form + side + "</div></section>";
}

function track(lang, base) {
  const U = C.ui[lang], T = U.track;
  return K.pageHead(lang, base, { h1: T.h1, lead: T.lead, img: "kin-night.jpg", cap: T.nightCap }) +
    '<section class="tight-top"><div class="wrap track-grid"><div>' +
    '<form class="track-form" id="track-form">' + field(T.label, '<input name="n" id="track-n" class="mono" placeholder="KX-2026-000000" autocomplete="off" required>') + '<button class="btn btn-primary" type="submit">' + esc(T.btn) + "</button></form>" +
    '<p class="demo-nums">' + esc(T.hint) + " " + T.demos.map(d => '<button type="button" class="linkish mono" data-track="' + d[0] + '">' + d[0] + "</button> <small>(" + esc(d[1]) + ")</small>").join(" ") + "</p>" +
    '<p class="err" id="track-err" role="alert"></p><div id="track-out" aria-live="polite"></div></div>' +
    '<aside class="track-side"><div class="card pad"><h3>' + esc(T.notifyT) + "</h3><p>" + esc(T.notifyLead) + '</p><form class="f-compact" id="notify-form">' + field(T.notifyPhone, '<input name="phone" type="tel" required placeholder="+243 81 234 56 78">') + field(T.channel, sel("channel", T.channels)) + '<button class="btn btn-dark btn-small" type="submit">' + esc(T.notifyBtn) + '</button></form><div id="notify-out"></div></div>' +
    '<div class="callout"><h3>' + esc(T.helpT) + "</h3><p>" + esc(T.helpLead) + '</p><p><a class="btn btn-ghost btn-small" href="' + href(lang, "help", base, "#reclamation") + '">' + esc(T.helpBtn) + "</a></p></div></aside></div></section>" +
    '<section class="alt"><div class="wrap narrow">' + head(null, T.faqT) + K.faqList(lang, C.faqs.filter(f => f.cat === "track")) + "</div></section>";
}

module.exports = { home, send, track };

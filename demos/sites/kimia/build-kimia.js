/* Generates the Kimia Express website (French + English, 18 pages) from content.js.
   Usage: node build-kimia.js <outDir>
   or require("./build-kimia.js").build(outDir, { portfolioHome: "../../index.html" }) */
"use strict";
const fs = require("fs"), path = require("path");
const K = require("./lib.js"), C = K.C;
const BUILDERS = Object.assign({}, require("./pages-1.js"), require("./pages-2.js"), require("./pages-3.js"));

const TITLES = {
  fr: { home: ["Kimia Express · Livraison de colis à Kinshasa et dans 12 villes de RDC", "Coursiers à moto à Kinshasa, Lubumbashi et Goma, colis intervilles par route et par avion, paiement mobile money et suivi en direct."], send: ["Envoyer un colis", "Réservez une collecte en quatre étapes : prix immédiat, paiement M-Pesa, Orange Money, Airtel Money ou espèces."], track: ["Suivre un colis", "Suivi de colis Kimia Express : étapes, position du coursier, preuve de livraison."], pricing: ["Tarifs", "Tarifs en ville et entre les villes, zones de Kinshasa, délais, poids volumétrique, options."], business: ["Entreprises", "Livraison e-commerce, stockage, contre-remboursement, API et tarifs dégressifs pour les entreprises."], network: ["Réseau et points relais", "12 villes desservies, hub de Masina et 28 agences et points relais en RDC."], couriers: ["Devenir coursier", "Rejoignez Kimia Express : revenus, formation, équipement, programme Kimia Moto et emplois."], help: ["Aide et contact", "Questions fréquentes, réclamations, objets interdits, contacts et mentions légales."], about: ["À propos", "Histoire, direction, engagements et actualités de Kimia Express."] },
  en: { home: ["Kimia Express · Parcel delivery in Kinshasa and 12 DRC cities", "Motorbike couriers in Kinshasa, Lubumbashi and Goma, intercity parcels by road and air, mobile money payment and live tracking."], send: ["Send a parcel", "Book a pickup in four steps: instant price, payment by M-Pesa, Orange Money, Airtel Money or cash."], track: ["Track a parcel", "Kimia Express parcel tracking: steps, courier position, proof of delivery."], pricing: ["Pricing", "Prices within and between cities, Kinshasa zones, delivery times, volumetric weight, options."], business: ["Business", "E-commerce delivery, storage, cash on delivery, API and volume pricing for businesses."], network: ["Network and relay points", "12 cities served, the Masina hub and 28 offices and relay points in the DRC."], couriers: ["Become a courier", "Join Kimia Express: income, training, equipment, the Kimia Moto programme and jobs."], help: ["Help and contact", "Frequent questions, claims, prohibited items, contacts and legal notice."], about: ["About", "Story, leadership, commitments and news from Kimia Express."] }
};

/* the user's four Kimia illustrations, recoloured to the brand palette */
const RECOLOR = [["#1d4ed8", "#0E5A43"], ["#f7b500", "#FF6A1A"], ["#e3a600", "#E0540A"], ["#14213d", "#10201A"], ["#f5f7fb", "#F4F1EA"], ["#e8eefc", "#DDEFE6"], ["#d7e0f3", "#C9E3D6"], ["#c9d3e6", "#D6D0C4"], ["#cfe1ff", "#BFE3D1"], ["#fff4d6", "#FFE6D6"], ["#16a34a", "#1E7F48"], ["#5f6b85", "#45534C"]];
const ILLUS_EN = [["En transit", "In transit"], ["Arrivée aujourd'hui, 14 h – 16 h", "Arriving today, 2 – 4 pm"], ["Partager le lien de suivi", "Share tracking link"]];

function dataJs() {
  const pick = ["rate", "sizes", "prices", "cities", "relays", "payments", "shipments", "js"];
  const D = {}; for (const k of pick) D[k] = C[k];
  D.files = K.FILES;
  return "/* Generated from content.js by build-kimia.js. Do not edit. */\nwindow.KX = " + JSON.stringify(D) + ";\n";
}

function build(outDir, opts) {
  const portfolioHome = (opts && opts.portfolioHome) || "../../index.html";
  fs.mkdirSync(path.join(outDir, "en"), { recursive: true });
  fs.mkdirSync(path.join(outDir, "img"), { recursive: true });
  let n = 0;
  for (const lang of ["fr", "en"]) {
    const base = lang === "en" ? "../" : "";
    for (const key of K.KEYS) {
      const [t, d] = TITLES[lang][key];
      const title = key === "home" ? t : t + " · " + C.company.name;
      const html = K.layout(lang, key, { title, description: d, body: BUILDERS[key](lang, base), portfolioHome: lang === "en" && opts?.portfolioHomeEn ? opts.portfolioHomeEn : portfolioHome });
      fs.writeFileSync(path.join(outDir, lang === "en" ? "en" : "", K.FILES[lang][key]), html);
      n++;
    }
  }
  fs.writeFileSync(path.join(outDir, "data.js"), dataJs());
  for (const f of ["style.css", "site.js"]) fs.copyFileSync(path.join(__dirname, f), path.join(outDir, f));
  for (const f of fs.readdirSync(path.join(__dirname, "img"))) fs.copyFileSync(path.join(__dirname, "img", f), path.join(outDir, "img", f));
  const illus = path.join(__dirname, "..", "..", "assets", "kimia");
  for (const f of ["courier-motorbike.svg", "delivery-van.svg", "parcel-box.svg", "parcel-tracking.svg"]) {
    let svg = fs.readFileSync(path.join(illus, f), "utf8");
    for (const [a, b] of RECOLOR) svg = svg.split(a).join(b);
    fs.writeFileSync(path.join(outDir, "img", f), svg);
    if (f === "parcel-tracking.svg") { let en = svg; for (const [a, b] of ILLUS_EN) en = en.split(a).join(b); fs.writeFileSync(path.join(outDir, "img", "parcel-tracking-en.svg"), en); }
  }
  return n;
}
module.exports = { build };
if (require.main === module) console.log("wrote " + build(process.argv[2] || path.join(__dirname, "out"), { portfolioHome: process.argv[3] || "../../index.html" }) + " pages");

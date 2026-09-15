/* Cimenterie du Fleuve SA — all site content (French + English).
   Fictitious company built for demonstration. Every figure is illustrative.
   To deliver to a client: replace values here, drop their PDFs into docs/ and point data-doc links at them. */
"use strict";
module.exports = {
  company: {
    name: "Cimenterie du Fleuve",
    short: "CDF",
    tagline: { fr: "Ciment · Béton · Granulats", en: "Cement · Concrete · Aggregates" },
    hq: { fr: "Route de la Carrière, Quartier Ville-Basse, Matadi, Kongo Central, RD Congo", en: "Route de la Carrière, Ville-Basse, Matadi, Kongo Central, DR Congo" },
    phone: "+243 81 000 00 00",
    sales: "+243 81 000 00 01",
    email: "contact@cimenterie-du-fleuve.cd",
    salesEmail: "ventes@cimenterie-du-fleuve.cd",
    procurement: "achats@cimenterie-du-fleuve.cd",
    press: "presse@cimenterie-du-fleuve.cd",
    hr: "recrutement@cimenterie-du-fleuve.cd",
    rccm: "CD/MAT/RCCM/14-B-0217", idnat: "01-H4900-N31207K", nif: "A1409876Q",
    domain: "cimenterie-du-fleuve.cd"
  },
  facts: [
    { v: "1,0 Mt", fr: "de capacité annuelle de ciment", en: "annual cement capacity" },
    { v: "1974", fr: "année de la première cuisson à Matadi", en: "first clinker burnt at Matadi" },
    { v: "640", fr: "salariés, dont 96 % congolais", en: "employees, 96% Congolese" },
    { v: "5", fr: "sites : usine, carrière, terminal, deux dépôts", en: "sites: plant, quarry, terminal, two depots" }
  ],
  products: [
    { key: "cem1", img: "silos.jpg", badge: "CEM I 42,5 R", t: { fr: "Ciment Portland CEM I 42,5 R", en: "Portland cement CEM I 42.5 R" },
      d: { fr: "Ciment à haute résistance initiale pour le béton armé, les éléments préfabriqués et les ouvrages d'art. Livré en sacs de 50 kg ou en vrac par citerne.", en: "High early-strength cement for reinforced concrete, precast elements and civil structures. Delivered in 50 kg bags or in bulk by tanker." },
      spec: [[{ fr: "Norme", en: "Standard" }, "NF EN 197-1"], [{ fr: "Résistance à 2 jours", en: "Strength at 2 days" }, "≥ 20 MPa"], [{ fr: "Résistance à 28 jours", en: "Strength at 28 days" }, "42,5 – 62,5 MPa"], [{ fr: "Début de prise", en: "Initial setting" }, "≥ 60 min"], [{ fr: "Conditionnement", en: "Packaging" }, { fr: "Sac 50 kg · palette 40 sacs · vrac", en: "50 kg bag · 40-bag pallet · bulk" }]],
      uses: { fr: ["Béton armé", "Préfabrication", "Ponts et dalles", "Béton haute performance"], en: ["Reinforced concrete", "Precast", "Bridges and slabs", "High-performance concrete"] } },
    { key: "cem2a", img: "bags.jpg", badge: "CEM II/A-L 42,5 N", t: { fr: "Ciment composé CEM II/A-L 42,5 N", en: "Composite cement CEM II/A-L 42.5 N" },
      d: { fr: "Le ciment polyvalent des chantiers de bâtiment : fondations, poteaux, poutres, dalles. Bonne maniabilité, montée en résistance régulière, moins de retrait.", en: "The all-round cement for building sites: foundations, columns, beams, slabs. Good workability, steady strength gain, less shrinkage." },
      spec: [[{ fr: "Norme", en: "Standard" }, "NF EN 197-1"], [{ fr: "Résistance à 7 jours", en: "Strength at 7 days" }, "≥ 16 MPa"], [{ fr: "Résistance à 28 jours", en: "Strength at 28 days" }, "42,5 – 62,5 MPa"], [{ fr: "Teneur en calcaire", en: "Limestone content" }, "6 – 20 %"], [{ fr: "Conditionnement", en: "Packaging" }, { fr: "Sac 50 kg · palette 40 sacs", en: "50 kg bag · 40-bag pallet" }]],
      uses: { fr: ["Gros œuvre", "Fondations", "Blocs et parpaings", "Chapes"], en: ["Structural work", "Foundations", "Blocks", "Screeds"] } },
    { key: "cem2b", img: "zambia.jpg", badge: "CEM II/B-L 32,5 R", t: { fr: "Ciment de maçonnerie CEM II/B-L 32,5 R", en: "Masonry cement CEM II/B-L 32.5 R" },
      d: { fr: "Pour les mortiers, enduits, joints et petits ouvrages. Prise rapide, finition facile, le sac le plus vendu chez nos revendeurs de quartier.", en: "For mortars, renders, joints and small works. Fast setting, easy finish, the best-selling bag at our neighbourhood retailers." },
      spec: [[{ fr: "Norme", en: "Standard" }, "NF EN 197-1"], [{ fr: "Résistance à 2 jours", en: "Strength at 2 days" }, "≥ 10 MPa"], [{ fr: "Résistance à 28 jours", en: "Strength at 28 days" }, "32,5 – 52,5 MPa"], [{ fr: "Teneur en calcaire", en: "Limestone content" }, "21 – 35 %"], [{ fr: "Conditionnement", en: "Packaging" }, { fr: "Sac 50 kg", en: "50 kg bag" }]],
      uses: { fr: ["Mortiers", "Enduits", "Maçonnerie", "Auto-construction"], en: ["Mortars", "Renders", "Masonry", "Self-build"] } },
    { key: "bpe", img: "mixer.jpg", badge: { fr: "Béton prêt à l'emploi", en: "Ready-mix concrete" }, t: { fr: "Béton prêt à l'emploi, Kinshasa", en: "Ready-mix concrete, Kinshasa" },
      d: { fr: "Centrale de Limete : bétons C20/25 à C40/50, pompage jusqu'à 36 m, livraison en toupie de 6 et 8 m³ dans un rayon de 40 km. Commande la veille avant 15 h.", en: "Limete batching plant: C20/25 to C40/50 concretes, pumping up to 36 m, delivery in 6 and 8 m³ mixers within 40 km. Order the day before, by 3 pm." },
      spec: [[{ fr: "Classes", en: "Classes" }, "C20/25 · C25/30 · C30/37 · C40/50"], [{ fr: "Capacité", en: "Capacity" }, "90 m³/h"], [{ fr: "Flotte", en: "Fleet" }, { fr: "12 toupies · 2 pompes", en: "12 mixers · 2 pumps" }], [{ fr: "Contrôle", en: "Control" }, { fr: "Éprouvettes à 7 et 28 j sur chaque livraison", en: "7 and 28-day cubes on every delivery" }]],
      uses: { fr: ["Immeubles", "Dalles industrielles", "Voiries", "Fondations profondes"], en: ["Buildings", "Industrial slabs", "Roads", "Deep foundations"] } },
    { key: "agg", img: "quarry.jpg", badge: { fr: "Granulats", en: "Aggregates" }, t: { fr: "Granulats calcaires concassés", en: "Crushed limestone aggregates" },
      d: { fr: "Gravillons 5/15 et 15/25, sable de concassage 0/4 et tout-venant 0/31,5 issus de la carrière de Luvu. Chargement sur camion client ou livraison.", en: "5/15 and 15/25 chippings, 0/4 crushed sand and 0/31.5 all-in from the Luvu quarry. Loaded onto customer trucks or delivered." },
      spec: [[{ fr: "Fractions", en: "Fractions" }, "0/4 · 5/15 · 15/25 · 0/31,5"], [{ fr: "Norme", en: "Standard" }, "NF EN 12620"], [{ fr: "Production", en: "Output" }, { fr: "600 000 t/an", en: "600,000 t/yr" }], [{ fr: "Vente", en: "Sales" }, { fr: "Minimum 10 t, par tonne", en: "Minimum 10 t, per tonne" }]],
      uses: { fr: ["Béton", "Couches de forme", "Remblais", "Préfabrication"], en: ["Concrete", "Capping layers", "Fill", "Precast"] } }
  ],
  sites: [
    { key: "usine", img: "plant-day.jpg", t: { fr: "Usine de Matadi", en: "Matadi plant" }, sub: { fr: "Kongo Central · four voie sèche", en: "Kongo Central · dry-process kiln" }, d: { fr: "Ligne de cuisson de 2 800 t/j de clinker, deux broyeurs à ciment dont un broyeur vertical mis en service en 2026, ensachage automatique 2 400 sacs/h et chargement vrac.", en: "2,800 t/d clinker line, two cement mills including a vertical mill commissioned in 2026, automatic bagging at 2,400 bags/h and bulk loading." } },
    { key: "carriere", img: "quarry.jpg", t: { fr: "Carrière de Luvu", en: "Luvu quarry" }, sub: { fr: "12 km de l'usine · calcaire", en: "12 km from the plant · limestone" }, d: { fr: "Gisement de calcaire de 38 ans de réserves au rythme actuel. Abattage à l'explosif deux fois par semaine, concassage primaire sur site, convoyeur couvert jusqu'à l'usine.", en: "Limestone deposit with 38 years of reserves at the current rate. Blasting twice a week, primary crushing on site, covered conveyor to the plant." } },
    { key: "terminal", img: "kinshasa-aerial.jpg", t: { fr: "Terminal de Kinshasa-Limete", en: "Kinshasa-Limete terminal" }, sub: { fr: "Silos 2 × 4 000 t · centrale à béton", en: "2 × 4,000 t silos · batching plant" }, d: { fr: "Réception par rail et par route, ensachage local, centrale à béton de 90 m³/h et quai fluvial pour les barges vers Bandundu, Mbandaka et Kisangani.", en: "Receives by rail and road, local bagging, 90 m³/h batching plant and river quay for barges to Bandundu, Mbandaka and Kisangani." } },
    { key: "boma", img: "matadi.jpg", t: { fr: "Dépôt de Boma", en: "Boma depot" }, sub: { fr: "Stock 3 000 t", en: "3,000 t stock" }, d: { fr: "Dessert le Bas-Fleuve et Muanda. Ouvert du lundi au samedi, enlèvement client et livraison.", en: "Serves Bas-Fleuve and Muanda. Open Monday to Saturday, customer pick-up and delivery." } },
    { key: "kikwit", img: "bags.jpg", t: { fr: "Dépôt de Kikwit", en: "Kikwit depot" }, sub: { fr: "Stock 2 000 t · ouvert en 2026", en: "2,000 t stock · opened 2026" }, d: { fr: "Premier dépôt hors Kinshasa-Kongo Central. Approvisionné par la N1, il dessert le Kwilu et le Kwango.", en: "First depot outside Kinshasa-Kongo Central. Supplied via the N1, it serves Kwilu and Kwango." } }
  ],
  distributors: [
    { city: "Kinshasa", z: "Limete, 7e rue", n: "Terminal CDF", p: "+243 81 000 00 02" },
    { city: "Kinshasa", z: "Ngaliema, av. de la Libération", n: "Ets Kabeya & Fils", p: "+243 99 000 00 10" },
    { city: "Kinshasa", z: "Masina, marché de la Liberté", n: "Quincaillerie Mama Lisa", p: "+243 84 000 00 11" },
    { city: "Matadi", z: "Ville-Basse, route de la Carrière", n: "Comptoir usine", p: "+243 81 000 00 01" },
    { city: "Boma", z: "Av. du Port", n: "Dépôt CDF Boma", p: "+243 81 000 00 03" },
    { city: "Kisantu", z: "Route N1, PK 118", n: "Matériaux Nsanda", p: "+243 82 000 00 12" },
    { city: "Kikwit", z: "Quartier Nzinda", n: "Dépôt CDF Kikwit", p: "+243 81 000 00 04" },
    { city: "Mbandaka", z: "Port fluvial", n: "Ets Bolingo Matériaux", p: "+243 85 000 00 13" }
  ],
  leaders: [
    { n: "Mireille Nsimba Lukoki", r: { fr: "Directrice générale", en: "Chief Executive Officer" }, b: { fr: "Ingénieure civile, 22 ans dans le ciment en Afrique centrale, dont huit à la tête de l'usine de Matadi avant de prendre la direction générale en 2023.", en: "Civil engineer, 22 years in cement in Central Africa, including eight running the Matadi plant before becoming CEO in 2023." } },
    { n: "Patrick Mavungu Kiala", r: { fr: "Directeur d'usine", en: "Plant Director" }, b: { fr: "Ingénieur procédé formé à Lubumbashi et à Lyon. Il a piloté la conversion du four en voie sèche et le projet du broyeur vertical.", en: "Process engineer trained in Lubumbashi and Lyon. He led the conversion of the kiln to dry process and the vertical-mill project." } },
    { n: "Grâce Mbuyi Kalonji", r: { fr: "Directrice administrative et financière", en: "Chief Financial Officer" }, b: { fr: "Expert-comptable, ancienne auditrice, responsable des relations avec les banques et les assureurs.", en: "Chartered accountant, former auditor, in charge of relations with banks and insurers." } },
    { n: "Dieudonné Tshiala Mwamba", r: { fr: "Directeur commercial et logistique", en: "Sales and Logistics Director" }, b: { fr: "Dirige le réseau de distributeurs, le terminal de Kinshasa et les contrats de transport rail, route et fleuve.", en: "Runs the distributor network, the Kinshasa terminal and the rail, road and river transport contracts." } },
    { n: "Nadine Kiese Mabiala", r: { fr: "Directrice QHSE", en: "QHSE Director" }, b: { fr: "Responsable de la qualité produit, de la sécurité des 640 salariés et sous-traitants et de la conformité environnementale.", en: "Responsible for product quality, the safety of 640 employees and contractors and environmental compliance." } },
    { n: "Jean-Paul Bakala Nzuzi", r: { fr: "Directeur des achats", en: "Procurement Director" }, b: { fr: "Gère les appels d'offres, le référencement des fournisseurs et le programme de contenu local.", en: "Manages tenders, supplier registration and the local-content programme." } }
  ],
  timeline: [
    { y: 1974, fr: "Première cuisson de clinker à Matadi, sur un four à voie humide de 300 000 t/an.", en: "First clinker burnt at Matadi, on a 300,000 t/yr wet-process kiln." },
    { y: 1996, fr: "Deuxième broyeur à ciment et premier ensachage automatique.", en: "Second cement mill and first automatic bagging line." },
    { y: 2009, fr: "Recapitalisation. Conversion du four en voie sèche, capacité portée à 1 Mt/an.", en: "Recapitalisation. Kiln converted to dry process, capacity raised to 1 Mt/yr." },
    { y: 2016, fr: "Ouverture du terminal de Kinshasa-Limete, raccordé au chemin de fer Matadi–Kinshasa.", en: "Kinshasa-Limete terminal opens, connected to the Matadi–Kinshasa railway." },
    { y: 2019, fr: "Centrale à béton de Limete, premier béton prêt à l'emploi de la société.", en: "Limete batching plant, the company's first ready-mix concrete." },
    { y: 2022, fr: "Certification ISO 9001 et ISO 14001 de l'usine et de la carrière.", en: "ISO 9001 and ISO 14001 certification of the plant and quarry." },
    { y: 2025, fr: "Premier convoi de barges vers Mbandaka. Dépôt de Boma.", en: "First barge convoy to Mbandaka. Boma depot." },
    { y: 2026, fr: "Broyeur vertical de 120 t/h. Dépôt de Kikwit.", en: "120 t/h vertical mill. Kikwit depot." }
  ],
  kpis: [
    { v: "0,9", fr: "accidents avec arrêt par million d'heures (LTIFR), 12 mois", en: "lost-time injuries per million hours (LTIFR), 12 months" },
    { v: "1 214", fr: "jours sans accident mortel", en: "days without a fatality" },
    { v: "612 kg", fr: "de CO₂ par tonne de ciment (objectif 2030 : 520)", en: "CO₂ per tonne of cement (2030 target: 520)" },
    { v: "71 %", fr: "de taux de clinker dans le ciment", en: "clinker factor in cement" },
    { v: "9 %", fr: "de combustibles alternatifs au four (coques de palmiste, pneus)", en: "alternative fuels in the kiln (palm-kernel shells, tyres)" },
    { v: "18 mg/Nm³", fr: "de poussières à la cheminée du four (limite : 30)", en: "kiln stack dust (limit: 30)" },
    { v: "96 %", fr: "de salariés congolais, 71 % originaires du Kongo Central", en: "Congolese employees, 71% from Kongo Central" },
    { v: "58 %", fr: "des achats auprès de fournisseurs congolais", en: "of purchases from Congolese suppliers" }
  ],
  programs: [
    { t: { fr: "École de Luvu", en: "Luvu school" }, d: { fr: "Six salles de classe reconstruites en 2024, 420 élèves, cantine et forage. Entretien pris en charge par la société.", en: "Six classrooms rebuilt in 2024, 420 pupils, canteen and borehole. Maintenance covered by the company." } },
    { t: { fr: "Centre de formation aux métiers", en: "Trades training centre" }, d: { fr: "Électricité, soudure, maintenance : 60 jeunes formés par an à Matadi, dont la moitié embauchés par nos sous-traitants.", en: "Electrical, welding, maintenance: 60 young people trained each year in Matadi, half of them hired by our contractors." } },
    { t: { fr: "Fonds de développement local", en: "Local development fund" }, d: { fr: "0,3 % du chiffre d'affaires versé chaque année, projets choisis avec les chefs de groupement de Luvu et de Matadi.", en: "0.3% of turnover paid each year, projects chosen with the Luvu and Matadi community leaders." } },
    { t: { fr: "Eau et poussière", en: "Water and dust" }, d: { fr: "Arrosage des pistes, filtres à manches sur tous les points de transfert, mesure mensuelle publiée dans les villages voisins.", en: "Road watering, bag filters on every transfer point, monthly measurements posted in neighbouring villages." } }
  ],
  tenders: [
    { ref: "AO-2026-015", t: { fr: "Restauration collective de l'usine de Matadi (contrat 2 ans)", en: "Catering for the Matadi plant (2-year contract)" }, cat: { fr: "Services", en: "Services" }, close: "2026-11-06", status: "soon" },
    { ref: "AO-2026-014", t: { fr: "Fourniture de sacs kraft deux plis, 50 kg, 12 millions d'unités", en: "Supply of two-ply kraft bags, 50 kg, 12 million units" }, cat: { fr: "Fournitures", en: "Supplies" }, close: "2026-10-10", status: "open" },
    { ref: "AO-2026-013", t: { fr: "Transport routier Matadi–Kinshasa–Kikwit, contrat cadre 2027", en: "Road haulage Matadi–Kinshasa–Kikwit, 2027 framework contract" }, cat: { fr: "Transport", en: "Transport" }, close: "2026-10-24", status: "open" },
    { ref: "AO-2026-012", t: { fr: "Fourniture de boulets de broyage haute teneur en chrome", en: "Supply of high-chrome grinding media" }, cat: { fr: "Fournitures", en: "Supplies" }, close: "2026-09-30", status: "open" },
    { ref: "AO-2026-011", t: { fr: "Maintenance annuelle des broyeurs et du four (arrêt de novembre)", en: "Annual maintenance of mills and kiln (November shutdown)" }, cat: { fr: "Travaux", en: "Works" }, close: "2026-09-12", status: "closed" },
    { ref: "AO-2026-009", t: { fr: "Fourniture de gasoil, 2,4 millions de litres", en: "Supply of diesel, 2.4 million litres" }, cat: { fr: "Énergie", en: "Energy" }, close: "2026-07-18", status: "closed" },
    { ref: "AO-2026-007", t: { fr: "Réfection des pistes de la carrière de Luvu", en: "Repair of the Luvu quarry haul roads" }, cat: { fr: "Travaux", en: "Works" }, close: "2026-06-05", status: "closed" }
  ],
  supplierCats: { fr: ["Transport et logistique", "Pièces et maintenance", "Emballages", "Énergie et combustibles", "Bâtiment et travaux", "Services (restauration, gardiennage, IT)", "Autre"], en: ["Transport and logistics", "Parts and maintenance", "Packaging", "Energy and fuels", "Building and works", "Services (catering, security, IT)", "Other"] },
  docs: [
    { t: { fr: "Fiche technique CEM I 42,5 R", en: "Datasheet CEM I 42.5 R" }, m: "PDF · 2 p. · 2026" },
    { t: { fr: "Fiche technique CEM II/A-L 42,5 N", en: "Datasheet CEM II/A-L 42.5 N" }, m: "PDF · 2 p. · 2026" },
    { t: { fr: "Fiche technique CEM II/B-L 32,5 R", en: "Datasheet CEM II/B-L 32.5 R" }, m: "PDF · 2 p. · 2026" },
    { t: { fr: "Fiche de données de sécurité, ciments", en: "Safety data sheet, cements" }, m: "PDF · 8 p. · 2025" },
    { t: { fr: "Certificat de conformité OCC", en: "OCC certificate of conformity" }, m: "PDF · 1 p. · 2026" },
    { t: { fr: "Conditions générales de vente", en: "General terms of sale" }, m: "PDF · 4 p. · 2026" },
    { t: { fr: "Rapport développement durable 2025", en: "Sustainability report 2025" }, m: "PDF · 36 p." },
    { t: { fr: "Politique QHSE", en: "QHSE policy" }, m: "PDF · 2 p. · 2025" },
    { t: { fr: "Code de conduite des fournisseurs", en: "Supplier code of conduct" }, m: "PDF · 6 p. · 2024" },
    { t: { fr: "Dossier de référencement fournisseur (formulaire)", en: "Supplier registration file (form)" }, m: "PDF · 3 p." }
  ],
  news: [
    { d: "2026-08-27", cat: { fr: "Usine", en: "Plant" }, t: { fr: "Le broyeur vertical atteint sa cadence nominale de 120 t/h", en: "Vertical mill reaches its rated 120 t/h" }, b: { fr: ["Mis en service en mai, le nouveau broyeur vertical de l'usine de Matadi a atteint sa cadence nominale le 21 août après trois mois d'essais. Il remplace le broyeur à boulets n° 1 de 1974 et consomme 30 % d'électricité en moins par tonne.", "La capacité de broyage passe à 1,2 Mt/an, au-dessus de la capacité de cuisson, ce qui permet d'importer du clinker en période de pointe."], en: ["Commissioned in May, the Matadi plant's new vertical mill reached its rated output on 21 August after three months of trials. It replaces ball mill no. 1 from 1974 and uses 30% less electricity per tonne.", "Grinding capacity rises to 1.2 Mt/yr, above kiln capacity, allowing clinker imports at peak periods."] } },
    { d: "2026-07-30", cat: { fr: "Résultats", en: "Results" }, t: { fr: "Premier semestre 2026 : 486 000 tonnes vendues, en hausse de 11 %", en: "First half 2026: 486,000 tonnes sold, up 11%" }, b: { fr: ["Les ventes de ciment ont atteint 486 000 tonnes au premier semestre, portées par les chantiers de Kinshasa et l'ouverture du dépôt de Kikwit. Le béton prêt à l'emploi progresse de 24 % à 61 000 m³.", "Le four a fonctionné 171 jours sur 181, avec un arrêt programmé de six jours en mars."], en: ["Cement sales reached 486,000 tonnes in the first half, driven by Kinshasa construction and the opening of the Kikwit depot. Ready-mix concrete grew 24% to 61,000 m³.", "The kiln ran 171 days out of 181, with a six-day planned stop in March."] } },
    { d: "2026-06-18", cat: { fr: "Sécurité", en: "Safety" }, t: { fr: "Journée sécurité : 1 200 jours sans accident mortel", en: "Safety day: 1,200 days without a fatality" }, b: { fr: ["Les 640 salariés et 300 sous-traitants ont participé à la journée sécurité annuelle. Le thème de 2026 : les déplacements des camions dans l'enceinte de l'usine, première cause de presqu'accidents relevée en 2025.", "Un nouveau plan de circulation sépare les piétons des poids lourds à l'ensachage et au chargement vrac."], en: ["All 640 employees and 300 contractors took part in the annual safety day. The 2026 theme: truck movements inside the plant, the leading cause of near-misses recorded in 2025.", "A new traffic plan separates pedestrians from heavy vehicles at bagging and bulk loading."] } },
    { d: "2026-05-12", cat: { fr: "Logistique", en: "Logistics" }, t: { fr: "Contrat de cinq ans avec la SCTP pour le rail Matadi–Kinshasa", en: "Five-year contract with SCTP for the Matadi–Kinshasa railway" }, b: { fr: ["La société a signé un contrat de cinq ans avec la Société commerciale des transports et des ports pour l'acheminement de 300 000 tonnes de ciment par an vers le terminal de Limete, soit trois trains par semaine.", "Le rail retire environ 9 000 passages de camions par an de la route nationale n° 1."], en: ["The company signed a five-year contract with the Société commerciale des transports et des ports to carry 300,000 tonnes of cement a year to the Limete terminal, three trains a week.", "Rail removes about 9,000 truck journeys a year from national road no. 1."] } },
    { d: "2026-04-03", cat: { fr: "Communautés", en: "Communities" }, t: { fr: "Rentrée dans les six nouvelles classes de l'école de Luvu", en: "Six new classrooms open at the Luvu school" }, b: { fr: ["Les 420 élèves de l'école primaire de Luvu, voisine de la carrière, ont fait leur rentrée dans six salles reconstruites en dur, avec cantine, forage et latrines. Le chantier a été confié à une entreprise de Matadi.", "La société prend en charge l'entretien des bâtiments pendant dix ans."], en: ["The 420 pupils of Luvu primary school, next to the quarry, started the term in six rebuilt classrooms, with canteen, borehole and latrines. The work was awarded to a Matadi contractor.", "The company will maintain the buildings for ten years."] } },
    { d: "2026-03-10", cat: { fr: "Commercial", en: "Sales" }, t: { fr: "Ouverture du dépôt de Kikwit", en: "Kikwit depot opens" }, b: { fr: ["Premier dépôt de la société hors de Kinshasa et du Kongo Central, le dépôt de Kikwit stocke 2 000 tonnes et dessert les revendeurs du Kwilu et du Kwango. Les prix affichés sont identiques à ceux de Kinshasa, transport compris."], en: ["The company's first depot outside Kinshasa and Kongo Central, the Kikwit depot holds 2,000 tonnes and serves retailers in Kwilu and Kwango. Posted prices match Kinshasa, transport included."] } },
    { d: "2026-02-14", cat: { fr: "Qualité", en: "Quality" }, t: { fr: "Certificat OCC renouvelé pour les trois ciments", en: "OCC certificate renewed for all three cements" }, b: { fr: ["L'Office congolais de contrôle a renouvelé le certificat de conformité des ciments CEM I 42,5 R, CEM II/A-L 42,5 N et CEM II/B-L 32,5 R après audit de l'usine et essais sur 36 échantillons prélevés chez les distributeurs."], en: ["The Office congolais de contrôle renewed the certificate of conformity for CEM I 42.5 R, CEM II/A-L 42.5 N and CEM II/B-L 32.5 R after a plant audit and tests on 36 samples taken from distributors."] } },
    { d: "2025-12-05", cat: { fr: "Communautés", en: "Communities" }, t: { fr: "Trente bourses pour des étudiants du Kongo Central", en: "Thirty scholarships for Kongo Central students" }, b: { fr: ["Trente étudiants en génie civil, électromécanique et chimie des universités de Matadi, Boma et Kinshasa reçoivent une bourse complète et un stage d'été à l'usine."], en: ["Thirty civil-engineering, electromechanical and chemistry students from the universities of Matadi, Boma and Kinshasa receive a full scholarship and a summer internship at the plant."] } },
    { d: "2025-10-22", cat: { fr: "Logistique", en: "Logistics" }, t: { fr: "Premier convoi de barges vers Mbandaka", en: "First barge convoy to Mbandaka" }, b: { fr: ["Deux barges de 400 tonnes ont quitté le quai de Limete pour Mbandaka, à douze jours de navigation. C'est la première livraison directe de la société dans l'Équateur, jusqu'ici approvisionné par des grossistes."], en: ["Two 400-tonne barges left the Limete quay for Mbandaka, twelve days upstream. It is the company's first direct delivery to Équateur province, previously supplied through wholesalers."] } },
    { d: "2025-09-08", cat: { fr: "Usine", en: "Plant" }, t: { fr: "Arrêt annuel du four : 18 jours, 210 intervenants", en: "Annual kiln stop: 18 days, 210 workers" }, b: { fr: ["Le four de Matadi a été arrêté du 20 août au 6 septembre pour le remplacement des briques réfractaires, la révision du refroidisseur et le contrôle des virole. L'arrêt s'est déroulé sans accident."], en: ["The Matadi kiln was stopped from 20 August to 6 September to replace refractory bricks, overhaul the cooler and inspect the shell. The stop passed without injury."] } }
  ],
  jobs: [
    { t: { fr: "Ingénieur(e) procédé cuisson", en: "Kiln process engineer" }, site: "Matadi", dept: { fr: "Production", en: "Production" }, type: { fr: "CDI", en: "Permanent" }, close: "2026-10-05" },
    { t: { fr: "Électromécanicien(ne) de maintenance", en: "Maintenance electromechanic" }, site: "Matadi", dept: { fr: "Maintenance", en: "Maintenance" }, type: { fr: "CDI · 3 postes", en: "Permanent · 3 positions" }, close: "2026-10-12" },
    { t: { fr: "Technicien(ne) de laboratoire ciment", en: "Cement laboratory technician" }, site: "Matadi", dept: { fr: "Qualité", en: "Quality" }, type: { fr: "CDI", en: "Permanent" }, close: "2026-09-28" },
    { t: { fr: "Responsable de dépôt", en: "Depot manager" }, site: "Kikwit", dept: { fr: "Logistique", en: "Logistics" }, type: { fr: "CDI", en: "Permanent" }, close: "2026-10-19" },
    { t: { fr: "Chauffeur(se) poids lourd, toupie", en: "Heavy-goods driver, mixer truck" }, site: "Kinshasa", dept: { fr: "Logistique", en: "Logistics" }, type: { fr: "CDD 12 mois · 4 postes", en: "12-month contract · 4 positions" }, close: "2026-09-30" },
    { t: { fr: "Commercial(e) grands comptes BTP", en: "Key-account sales, construction" }, site: "Kinshasa", dept: { fr: "Commercial", en: "Sales" }, type: { fr: "CDI", en: "Permanent" }, close: "2026-10-26" },
    { t: { fr: "Contrôleur(se) de gestion industriel", en: "Industrial management controller" }, site: "Matadi", dept: { fr: "Finance", en: "Finance" }, type: { fr: "CDI", en: "Permanent" }, close: "2026-10-09" },
    { t: { fr: "Stagiaire QHSE", en: "QHSE intern" }, site: "Matadi", dept: { fr: "QHSE", en: "QHSE" }, type: { fr: "Stage 6 mois", en: "6-month internship" }, close: "2026-11-15" }
  ],
  credits: [
    ["Hoping cement plant", "CEphoto, Uwe Aranas", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Hoping_Taiwan-Cement-Corporation-Hoping-Plant-02.jpg"],
    ["Cimenterie Jbal Ressas", "Smailtn", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Cimenterie_Jbal_Ressas_la_nuit.jpg"],
    ["Cement factory, Zambia", "Thatlowdownwoman", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Zambia_-Directing_traffic_outside_the_cement_factory.jpg"],
    ["Matadi harbour by night", "MONUSCO Photos", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Matadi_harbour_%26_Congo_river_by_night_(20626303603).jpg"],
    ["Portland cement bags", "KVDP", "public domain", "https://commons.wikimedia.org/wiki/File:Portland_Cement_Bags.jpg"],
    ["Fishermen of the Congo Basin", "Cethuyghe", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Fishermen_of_the_Congo_Basin_3.jpg"],
    ["Matadi Bridge", "Χρίστος Ιμμανοελ", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Matadi_Bridge_DR_Congo.jpg"],
    ["Pont Maréchal, Matadi", "3nigma", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Pont_Marechal,_Matadi,_Congo.jpg"],
    ["Rotary kilns, Sundon", "Dylan Moore", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Rotary_kilns,_Sundon_cement_plant_-_geograph.org.uk_-_2421111.jpg"],
    ["Limestone quarry", "Thomas Bjørkan", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Limestone_quarry.jpg"],
    ["Cement mixer truck", "CEphoto, Uwe Aranas", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Kaohsiung_Taiwan_Cement-mixer-truck-01.jpg"],
    ["Concrete boom pump truck", "Bernardobenzecry", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Concrete_boom_pump_truck.jpg"],
    ["Cement plant, Obajana", "Abelidoko49", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Dangote_cement_plant_Obajana_Kogi_state_Nigeria.jpg"],
    ["Cement factory silos", "Gaurav Dhwaj Khadka", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Cement_Factory_Silos.jpg"],
    ["Boulevard du 30 juin, Kinshasa", "Antoine Moens de Hase", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:2013_Boulevard_du_30_juin_Kinshasa_8756681993.jpg"],
    ["Kinshasa from above", "EdwinAlden.1995", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kinshasa_city_from_above,_2020_leveled.jpg"],
    ["Gouvernorat du Kongo Central, Matadi", "Shaloom Yave", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Gouvernaurat_du_Kongo_Central_Par_Shaloom_Yave.jpg"]
  ],
  ui: {
    fr: {
      demoBar: "Démonstrateur IK Digital Solutions · Cimenterie du Fleuve SA est une société fictive. Chiffres, personnes et documents sont illustratifs ; les formulaires sont simulés.",
      back: "← Retour au portfolio",
      util: { sales: "Service commercial", quote: "Demander un devis", tenders: "Appels d'offres", careers: "Carrières" },
      nav: [["about", "Qui sommes-nous"], ["products", "Produits"], ["sites", "Sites & logistique"], ["sust", "Durabilité & sécurité"], ["news", "Actualités"], ["careers", "Carrières"], ["suppliers", "Fournisseurs"], ["contact", "Contact"]],
      menu: "Menu",
      illustrative: "Chiffres illustratifs : société fictive créée pour la démonstration.",
      consent: { text: "Ce site utilise un stockage local pour mémoriser votre choix de langue et vos préférences. Aucun traceur publicitaire. Conformément au Code du numérique, vous pouvez accepter ou refuser.", yes: "Accepter", no: "Refuser", more: "Politique de données" },
      common: { download: "Télécharger", more: "En savoir plus", quote: "Demander un devis", apply: "Postuler", back: "Retour", contact: "Nous contacter" },
      home: {
        h1: "Le ciment du Kongo Central, depuis 1974",
        lead: "Une usine à Matadi, une carrière à Luvu, un terminal à Kinshasa. Trois ciments certifiés OCC, du béton prêt à l'emploi et des granulats, livrés par rail, route et fleuve.",
        cta1: "Nos produits", cta2: "Où acheter",
        prodEyebrow: "Produits", prodTitle: "Trois ciments, un béton, des granulats", prodLead: "Chaque lot est contrôlé au laboratoire de l'usine avant expédition. Fiches techniques et certificat OCC téléchargeables.", prodMore: "Voir la fiche",
        sitesEyebrow: "Sites", sitesTitle: "De la carrière au chantier", sitesLead: "Cinq sites reliés par la route nationale n° 1, le chemin de fer Matadi–Kinshasa et le fleuve Congo.",
        sustEyebrow: "Durabilité et sécurité", sustTitle: "Produire proprement, travailler sans accident", sustLead: "Poussières mesurées et publiées, combustibles alternatifs, 96 % de salariés congolais. Les chiffres complets sont dans le rapport annuel.", sustMore: "Nos indicateurs",
        newsEyebrow: "Actualités", newsTitle: "Dernières nouvelles", newsMore: "Toutes les actualités",
        suppEyebrow: "Fournisseurs", suppTitle: "Appels d'offres en cours", suppLead: "Nos consultations sont publiées ici. Les entreprises congolaises sont encouragées à se référencer.", suppMore: "Voir les appels d'offres",
        buyTitle: "Où acheter", buyLead: "Comptoir usine, terminal de Kinshasa, dépôts de Boma et Kikwit, et un réseau de revendeurs agréés. Prix affichés en francs congolais, identiques dans tous les dépôts."
      },
      about: {
        h1: "Qui sommes-nous", lead: "Cimenterie du Fleuve SA est un producteur intégré de ciment installé à Matadi depuis 1974. Capitaux congolais majoritaires, 640 salariés, un seul métier : les matériaux de construction.",
        missionT: "Notre mission", mission: "Fournir aux constructeurs congolais un ciment de qualité constante, au même prix dans chaque dépôt, produit ici avec le calcaire d'ici.",
        valuesT: "Ce qui nous guide", values: [["Sécurité d'abord", "Aucune tonne ne vaut une blessure. Chaque salarié peut arrêter une tâche dangereuse sans justification."], ["Qualité constante", "Contrôle à chaque étape, du tir de mine au sac, et des essais sur les sacs achetés chez les revendeurs."], ["Ancrage local", "Emplois, achats et formation d'abord dans le Kongo Central, puis en RDC."], ["Compte rendu", "Nos indicateurs de sécurité et d'environnement sont publiés chaque année, bons ou mauvais."]],
        historyT: "Cinquante ans à Matadi", leadersT: "Direction", govT: "Gouvernance", gov: "Société anonyme à conseil d'administration de sept membres, dont trois indépendants. Comité d'audit et comité HSE trimestriels. Comptes audités chaque année et déposés au greffe du tribunal de commerce de Matadi.",
        shareT: "Actionnariat", share: [["52 %", "Groupe industriel congolais"], ["30 %", "Partenaire cimentier international"], ["12 %", "Fonds de développement régional"], ["6 %", "Salariés et cadres"]]
      },
      products: {
        h1: "Produits", lead: "Trois ciments conformes à la norme NF EN 197-1 et certifiés par l'Office congolais de contrôle, du béton prêt à l'emploi à Kinshasa et des granulats de la carrière de Luvu.",
        docsT: "Fiches techniques et certificats", docsLead: "Documents à jour, valables pour les lots en circulation.",
        qualityT: "Contrôle qualité", quality: "Le laboratoire de l'usine réalise chaque jour des essais de finesse, de temps de prise et de résistance sur chaque broyeur. Chaque sac porte le numéro de lot et la date d'ensachage. Des sacs sont achetés anonymement chez les revendeurs et testés chaque mois.",
        storageT: "Conseils de stockage", storage: ["Conserver les sacs à l'abri de la pluie et de l'humidité, sur palette, jamais à même le sol.", "Utiliser dans les trois mois suivant la date d'ensachage imprimée sur le sac.", "Ne pas empiler plus de dix sacs. Utiliser d'abord les sacs les plus anciens.", "Porter gants et lunettes : le ciment est irritant pour la peau et les yeux."],
        quoteT: "Demander un devis", quoteLead: "Chantiers, préfabricateurs, revendeurs : réponse sous un jour ouvré. Pour un particulier, le comptoir de Matadi et nos revendeurs vendent au sac."
      },
      sites: {
        h1: "Sites et logistique", lead: "Cinq sites entre Boma et Kikwit, reliés par la route nationale n° 1, le chemin de fer Matadi–Kinshasa et les barges du fleuve.",
        sitesT: "Nos sites", mapT: "Réseau", mapLead: "Le clinker est cuit à Matadi, le ciment broyé et ensaché à Matadi et à Limete, puis distribué par rail, route et fleuve.",
        logT: "Comment le ciment voyage", log: [["Rail", "Trois trains par semaine de la SCTP entre l'usine et le terminal de Limete : 300 000 t par an, 9 000 camions de moins sur la N1."], ["Route", "Transporteurs sous contrat cadre pour Kinshasa, Boma et Kikwit, camions bâchés et citernes vrac. Suivi GPS de chaque chargement."], ["Fleuve", "Barges de 400 t depuis le quai de Limete vers Bandundu, Mbandaka et Kisangani, de six à trente jours selon la destination."]],
        buyT: "Où acheter", buyLead: "Comptoir usine, terminal, dépôts et revendeurs agréés. Les revendeurs agréés affichent l'enseigne CDF et vendent aux prix conseillés.", cols: ["Ville", "Adresse", "Point de vente", "Téléphone"]
      },
      sust: {
        h1: "Durabilité et sécurité", lead: "Une cimenterie émet du CO₂ et des poussières et fait rouler des camions. Nous mesurons, nous publions et nous réduisons, année après année.",
        kpiT: "Indicateurs, douze derniers mois", frameworks: "Certifications ISO 9001 et ISO 14001 (usine et carrière). Étude d'impact environnemental et social et plan de gestion approuvés par l'Agence congolaise de l'environnement. Rapport annuel vérifié par un tiers.",
        safetyT: "Sécurité au travail", safety: [["Règles qui sauvent", "Huit règles non négociables : consignation, travail en hauteur, espaces confinés, circulation, tirs de mine, levage, chaleur, équipements de protection."], ["Droit d'arrêt", "Tout salarié ou sous-traitant peut arrêter une tâche qu'il juge dangereuse. Aucune sanction, jamais."], ["Sous-traitants", "Mêmes règles, même formation, mêmes statistiques. Les 300 sous-traitants comptent dans notre LTIFR."], ["Santé", "Infirmerie 24 h/24 à l'usine, visite médicale annuelle, suivi respiratoire des postes exposés aux poussières."]],
        envT: "Environnement", env: [["CO₂", "612 kg par tonne de ciment. Levier principal : baisser le taux de clinker par l'ajout de calcaire, objectif 520 kg en 2030."], ["Poussières", "Filtres à manches sur le four, les broyeurs et l'ensachage. Mesure en continu à la cheminée, affichage mensuel à Luvu et à Matadi."], ["Combustibles", "9 % de coques de palmiste et de pneus broyés dans le four, objectif 25 %. Chaque tonne remplace du charbon importé."], ["Carrière", "Réaménagement progressif des fronts exploités, pépinière de 12 000 plants par an, suivi des sources voisines par un laboratoire indépendant."]],
        commT: "Communautés", commLead: "Luvu, Matadi, Limete : nous écoutons avant d'agir. Un comité de concertation trimestriel réunit chefs de groupement, autorités locales, société civile et la société.",
        grievT: "Mécanisme de plainte", grievLead: "Toute personne affectée par nos activités (poussière, bruit, tirs de mine, camions, emploi) peut déposer une plainte. Réponse sous 15 jours, gratuitement, sans représailles.",
        grievSteps: [["1. Dépôt", "Formulaire ci-dessous, ligne verte, WhatsApp, ou boîte de plainte à Luvu et à la porte de l'usine."], ["2. Accusé", "Numéro de plainte sous 48 h, par SMS ou par écrit."], ["3. Examen", "Enquête par le service communautés, visite sur place si nécessaire."], ["4. Réponse", "Réponse écrite et mesures sous 15 jours. Recours possible auprès du comité de concertation."]],
        green: "Ligne verte", greenNum: "0 800 000 000", greenLead: "Gratuite, 7 jours sur 7, en français, kikongo et lingala.",
        form: { name: "Nom (facultatif)", phone: "Téléphone", place: "Lieu concerné", type: "Objet", types: ["Poussière", "Bruit ou vibrations", "Circulation des camions", "Emploi ou recrutement", "Eau", "Autre"], msg: "Description", anon: "Je souhaite rester anonyme", send: "Déposer la plainte" },
        docsT: "Documents"
      },
      news: { h1: "Actualités", lead: "Résultats, chantiers, sécurité, communautés : ce que nous publions, dans l'ordre.", search: "Rechercher", allCat: "Toutes les rubriques", allYear: "Toutes les années", pressT: "Contact presse", alertT: "Recevoir nos communiqués", alertBtn: "S'abonner", email: "Adresse e-mail" },
      careers: {
        h1: "Carrières", lead: "640 personnes font tourner un four, une carrière, un terminal et deux dépôts. Nous recrutons à Matadi, Kinshasa, Boma et Kikwit.",
        whyT: "Pourquoi nous rejoindre", why: [["Formation", "Centre de formation interne, habilitations électriques et levage, parcours d'apprentissage de 18 mois pour les jeunes diplômés."], ["Salaire et protection", "Grille salariale publiée, assurance santé pour la famille, transport et cantine pris en charge."], ["Sécurité", "L'usine la plus sûre du groupe : LTIFR de 0,9. Nous ne transigeons pas."], ["Progression", "Sept membres du comité de direction ont commencé comme techniciens ou stagiaires."]],
        jobsT: "Postes ouverts", allSites: "Tous les sites", allDepts: "Tous les services", closes: "Clôture",
        applyT: "Postuler", applyLead: "Une candidature, une réponse : chaque candidat reçoit un SMS sous 48 h et une réponse sous trois semaines.",
        localT: "Emploi local", local: "96 % de nos salariés sont congolais et 71 % viennent du Kongo Central. À compétences égales, la priorité va aux candidats des groupements voisins de la carrière et de l'usine. Nous ne demandons jamais d'argent pour un recrutement : signalez toute demande à la ligne verte.",
        form: { name: "Nom complet", phone: "Téléphone", email: "E-mail", job: "Poste", spontaneous: "Candidature spontanée", cv: "CV (PDF, 5 Mo maximum)", msg: "Message", send: "Envoyer la candidature" }
      },
      suppliers: {
        h1: "Fournisseurs et appels d'offres", lead: "58 % de nos achats vont à des entreprises congolaises. Les consultations sont publiées ici, avec leur date de clôture. Les dossiers se retirent par e-mail.",
        tendersT: "Consultations", allStatus: "Tous les états", status: { open: "Ouvert", soon: "À venir", closed: "Clôturé" }, cols: ["Référence", "Objet", "Catégorie", "Clôture", "État", "Dossier"], getFile: "Dossier",
        howT: "Comment répondre", how: [["1. Se référencer", "Formulaire ci-dessous, avec RCCM, numéro d'impôt et attestation fiscale. Validation sous dix jours ouvrés."], ["2. Retirer le dossier", "Les fournisseurs référencés reçoivent le dossier de consultation par e-mail dès sa publication."], ["3. Déposer l'offre", "Offre technique et financière sous plis séparés, avant la date de clôture, à l'adresse indiquée dans le dossier."], ["4. Résultat", "Chaque soumissionnaire est informé du résultat par écrit, avec les motifs en cas de rejet."]],
        rulesT: "Règles", rules: "Nous payons à 30 jours date de facture. Aucun cadeau, aucune commission : tout salarié qui en demande doit être signalé à la ligne verte ou à achats@cimenterie-du-fleuve.cd. Le code de conduite des fournisseurs fait partie de chaque contrat.",
        regT: "Demande de référencement", form: { company: "Raison sociale", rccm: "Numéro RCCM", nif: "Numéro d'impôt (NIF)", cat: "Catégorie principale", city: "Ville", contact: "Nom du contact", phone: "Téléphone", email: "E-mail", msg: "Activités et références", send: "Envoyer la demande" }
      },
      contact: {
        h1: "Contact", lead: "Ventes, logistique, communautés, presse : voici qui joindre. Nous répondons sous deux jours ouvrés.",
        pointsT: "Nos points de contact", points: [["Service commercial", "Devis, commandes, revendeurs", "sales", "salesEmail"], ["Terminal de Kinshasa-Limete", "Béton, enlèvements, barges", "terminalPhone", "salesEmail"], ["Achats", "Référencement, appels d'offres", "phone", "procurement"], ["Recrutement", "Candidatures, stages", "phone", "hr"], ["Presse", "Journalistes, visites d'usine", "phone", "press"], ["Communautés et plaintes", "Ligne verte gratuite", "green", "email"]],
        formT: "Écrire à la société", form: { name: "Nom", org: "Société", email: "E-mail", subject: "Objet", subjects: ["Devis ou commande", "Question technique", "Fournisseur", "Recrutement", "Presse", "Autre"], msg: "Message", send: "Envoyer" },
        quoteT: "Demande de devis", quoteLead: "Réponse sous un jour ouvré.", quote: { name: "Nom", org: "Société ou chantier", phone: "Téléphone", product: "Produit", qty: "Quantité (t ou m³)", city: "Lieu de livraison", date: "Date souhaitée", msg: "Précisions", send: "Envoyer la demande" },
        hoursT: "Horaires", hours: [["Comptoir usine, Matadi", "Lundi–samedi, 7 h – 17 h"], ["Terminal de Limete", "Lundi–samedi, 6 h – 18 h"], ["Dépôts de Boma et Kikwit", "Lundi–samedi, 7 h – 16 h"], ["Ligne verte", "7 jours sur 7, 24 h/24"]],
        legalT: "Mentions légales", legal: [["Dénomination", "Cimenterie du Fleuve SA, société anonyme au capital de 48 000 000 000 FC"], ["Siège", "Route de la Carrière, Ville-Basse, Matadi, Kongo Central"], ["RCCM", "CD/MAT/RCCM/14-B-0217"], ["Id. Nat.", "01-H4900-N31207K"], ["NIF", "A1409876Q"], ["Directrice de la publication", "Mireille Nsimba Lukoki"], ["Hébergement", "Serveurs situés à Kinshasa, RDC, avec copie de secours chiffrée"], ["Données personnelles", "Les formulaires collectent uniquement les données nécessaires à la réponse. Elles sont conservées 12 mois puis supprimées. Droit d'accès, de rectification et d'effacement par e-mail à contact@cimenterie-du-fleuve.cd, conformément à l'ordonnance-loi n° 23/010 du 13 mars 2023 portant Code du numérique."], ["Cookies", "Aucun traceur publicitaire. Stockage local limité au choix de langue et aux préférences de consentement."]]
      },
      footer: { about: "Producteur intégré de ciment, béton et granulats à Matadi, Kongo Central, depuis 1974.", cols: [["Société", ["Qui sommes-nous", "Sites & logistique", "Actualités", "Carrières"]], ["Produits", ["Ciments", "Béton prêt à l'emploi", "Granulats", "Fiches techniques"]], ["Partenaires", ["Appels d'offres", "Se référencer", "Mécanisme de plainte", "Mentions légales"]]], legal: "© 2026 Cimenterie du Fleuve SA · RCCM CD/MAT/RCCM/14-B-0217 · Société fictive, démonstrateur", by: "Site réalisé par", photos: "Photos d'illustration via Wikimedia Commons :" }
    },
    en: {
      demoBar: "IK Digital Solutions demonstrator · Cimenterie du Fleuve SA is a fictitious company. Figures, people and documents are illustrative; forms are simulated.",
      back: "← Back to portfolio",
      util: { sales: "Sales desk", quote: "Request a quote", tenders: "Tenders", careers: "Careers" },
      nav: [["about", "Who we are"], ["products", "Products"], ["sites", "Sites & logistics"], ["sust", "Sustainability & safety"], ["news", "News"], ["careers", "Careers"], ["suppliers", "Suppliers"], ["contact", "Contact"]],
      menu: "Menu",
      illustrative: "Illustrative figures: fictitious company created for demonstration.",
      consent: { text: "This site uses local storage to remember your language choice and preferences. No advertising trackers. Under the Digital Code you may accept or decline.", yes: "Accept", no: "Decline", more: "Data policy" },
      common: { download: "Download", more: "Learn more", quote: "Request a quote", apply: "Apply", back: "Back", contact: "Contact us" },
      home: {
        h1: "Kongo Central's cement, since 1974",
        lead: "A plant in Matadi, a quarry at Luvu, a terminal in Kinshasa. Three OCC-certified cements, ready-mix concrete and aggregates, delivered by rail, road and river.",
        cta1: "Our products", cta2: "Where to buy",
        prodEyebrow: "Products", prodTitle: "Three cements, one concrete, aggregates", prodLead: "Every batch is tested in the plant laboratory before dispatch. Datasheets and the OCC certificate are downloadable.", prodMore: "View datasheet",
        sitesEyebrow: "Sites", sitesTitle: "From the quarry to the site", sitesLead: "Five sites linked by national road no. 1, the Matadi–Kinshasa railway and the Congo River.",
        sustEyebrow: "Sustainability and safety", sustTitle: "Produce cleanly, work without injury", sustLead: "Dust measured and published, alternative fuels, 96% Congolese employees. The full figures are in the annual report.", sustMore: "Our indicators",
        newsEyebrow: "News", newsTitle: "Latest news", newsMore: "All news",
        suppEyebrow: "Suppliers", suppTitle: "Open tenders", suppLead: "Our tenders are published here. Congolese companies are encouraged to register.", suppMore: "View tenders",
        buyTitle: "Where to buy", buyLead: "Plant counter, Kinshasa terminal, Boma and Kikwit depots, and a network of approved retailers. Prices posted in Congolese francs, identical at every depot."
      },
      about: {
        h1: "Who we are", lead: "Cimenterie du Fleuve SA is an integrated cement producer established in Matadi since 1974. Majority Congolese capital, 640 employees, one trade: building materials.",
        missionT: "Our mission", mission: "Give Congolese builders a cement of constant quality, at the same price in every depot, made here with local limestone.",
        valuesT: "What guides us", values: [["Safety first", "No tonne is worth an injury. Any employee may stop a dangerous task without justification."], ["Constant quality", "Control at every step, from the blast to the bag, and tests on bags bought from retailers."], ["Local roots", "Jobs, purchases and training first in Kongo Central, then in the DRC."], ["Accountability", "Our safety and environmental indicators are published every year, good or bad."]],
        historyT: "Fifty years in Matadi", leadersT: "Leadership", govT: "Governance", gov: "Public limited company with a seven-member board, three of them independent. Quarterly audit and HSE committees. Accounts audited every year and filed with the Matadi commercial court registry.",
        shareT: "Shareholders", share: [["52%", "Congolese industrial group"], ["30%", "International cement partner"], ["12%", "Regional development fund"], ["6%", "Employees and managers"]]
      },
      products: {
        h1: "Products", lead: "Three cements complying with NF EN 197-1 and certified by the Office congolais de contrôle, ready-mix concrete in Kinshasa and aggregates from the Luvu quarry.",
        docsT: "Datasheets and certificates", docsLead: "Current documents, valid for batches in circulation.",
        qualityT: "Quality control", quality: "The plant laboratory runs fineness, setting-time and strength tests on every mill every day. Every bag carries the batch number and bagging date. Bags are bought anonymously from retailers and tested every month.",
        storageT: "Storage advice", storage: ["Keep bags away from rain and damp, on pallets, never on bare ground.", "Use within three months of the bagging date printed on the bag.", "Do not stack more than ten bags. Use the oldest bags first.", "Wear gloves and goggles: cement irritates skin and eyes."],
        quoteT: "Request a quote", quoteLead: "Contractors, precasters, retailers: reply within one working day. Private customers can buy by the bag at the Matadi counter and from our retailers."
      },
      sites: {
        h1: "Sites and logistics", lead: "Five sites between Boma and Kikwit, linked by national road no. 1, the Matadi–Kinshasa railway and river barges.",
        sitesT: "Our sites", mapT: "Network", mapLead: "Clinker is burnt at Matadi, cement ground and bagged at Matadi and Limete, then distributed by rail, road and river.",
        logT: "How cement travels", log: [["Rail", "Three SCTP trains a week between the plant and the Limete terminal: 300,000 t a year, 9,000 fewer trucks on the N1."], ["Road", "Hauliers under framework contracts for Kinshasa, Boma and Kikwit, sheeted trucks and bulk tankers. GPS tracking of every load."], ["River", "400 t barges from the Limete quay to Bandundu, Mbandaka and Kisangani, six to thirty days depending on destination."]],
        buyT: "Where to buy", buyLead: "Plant counter, terminal, depots and approved retailers. Approved retailers display the CDF sign and sell at recommended prices.", cols: ["City", "Address", "Outlet", "Phone"]
      },
      sust: {
        h1: "Sustainability and safety", lead: "A cement plant emits CO₂ and dust and puts trucks on the road. We measure, we publish and we reduce, year after year.",
        kpiT: "Indicators, last twelve months", frameworks: "ISO 9001 and ISO 14001 certified (plant and quarry). Environmental and social impact study and management plan approved by the Agence congolaise de l'environnement. Annual report verified by a third party.",
        safetyT: "Safety at work", safety: [["Life-saving rules", "Eight non-negotiable rules: lock-out, work at height, confined spaces, traffic, blasting, lifting, heat, protective equipment."], ["Right to stop", "Any employee or contractor may stop a task they judge dangerous. No sanction, ever."], ["Contractors", "Same rules, same training, same statistics. Our 300 contractors count in our LTIFR."], ["Health", "24-hour clinic at the plant, annual medical check, respiratory monitoring for dust-exposed posts."]],
        envT: "Environment", env: [["CO₂", "612 kg per tonne of cement. Main lever: lower the clinker factor by adding limestone, target 520 kg in 2030."], ["Dust", "Bag filters on the kiln, mills and bagging. Continuous stack measurement, monthly display in Luvu and Matadi."], ["Fuels", "9% palm-kernel shells and shredded tyres in the kiln, target 25%. Every tonne replaces imported coal."], ["Quarry", "Progressive rehabilitation of worked-out faces, 12,000-plant nursery a year, neighbouring springs monitored by an independent laboratory."]],
        commT: "Communities", commLead: "Luvu, Matadi, Limete: we listen before we act. A quarterly consultation committee brings together community leaders, local authorities, civil society and the company.",
        grievT: "Grievance mechanism", grievLead: "Anyone affected by our activities (dust, noise, blasting, trucks, employment) may file a complaint. Reply within 15 days, free of charge, without reprisal.",
        grievSteps: [["1. File", "Form below, green line, WhatsApp, or complaint box at Luvu and the plant gate."], ["2. Acknowledge", "Complaint number within 48 h, by SMS or in writing."], ["3. Review", "Investigation by the communities team, site visit where needed."], ["4. Reply", "Written reply and measures within 15 days. Appeal possible to the consultation committee."]],
        green: "Green line", greenNum: "0 800 000 000", greenLead: "Free, 7 days a week, in French, Kikongo and Lingala.",
        form: { name: "Name (optional)", phone: "Phone", place: "Place concerned", type: "Subject", types: ["Dust", "Noise or vibration", "Truck traffic", "Employment or recruitment", "Water", "Other"], msg: "Description", anon: "I wish to remain anonymous", send: "File the complaint" },
        docsT: "Documents"
      },
      news: { h1: "News", lead: "Results, projects, safety, communities: what we publish, in order.", search: "Search", allCat: "All categories", allYear: "All years", pressT: "Press contact", alertT: "Receive our releases", alertBtn: "Subscribe", email: "E-mail address" },
      careers: {
        h1: "Careers", lead: "640 people run a kiln, a quarry, a terminal and two depots. We hire in Matadi, Kinshasa, Boma and Kikwit.",
        whyT: "Why join us", why: [["Training", "In-house training centre, electrical and lifting certifications, 18-month apprenticeship for young graduates."], ["Pay and protection", "Published salary scale, health insurance for the family, transport and canteen provided."], ["Safety", "The safest plant in the group: LTIFR of 0.9. We do not compromise."], ["Progression", "Seven members of the management committee started as technicians or interns."]],
        jobsT: "Open positions", allSites: "All sites", allDepts: "All departments", closes: "Closes",
        applyT: "Apply", applyLead: "One application, one answer: every candidate receives an SMS within 48 h and a reply within three weeks.",
        localT: "Local employment", local: "96% of our employees are Congolese and 71% come from Kongo Central. With equal skills, priority goes to candidates from the communities next to the quarry and the plant. We never ask for money for a job: report any request to the green line.",
        form: { name: "Full name", phone: "Phone", email: "E-mail", job: "Position", spontaneous: "Unsolicited application", cv: "CV (PDF, 5 MB maximum)", msg: "Message", send: "Send application" }
      },
      suppliers: {
        h1: "Suppliers and tenders", lead: "58% of our purchases go to Congolese companies. Tenders are published here with their closing date. Files are obtained by e-mail.",
        tendersT: "Tenders", allStatus: "All states", status: { open: "Open", soon: "Upcoming", closed: "Closed" }, cols: ["Reference", "Subject", "Category", "Closing", "State", "File"], getFile: "File",
        howT: "How to respond", how: [["1. Register", "Form below, with RCCM, tax number and tax certificate. Validation within ten working days."], ["2. Obtain the file", "Registered suppliers receive the tender file by e-mail as soon as it is published."], ["3. Submit the bid", "Technical and financial bids in separate envelopes, before the closing date, at the address given in the file."], ["4. Result", "Every bidder is informed of the result in writing, with reasons in case of rejection."]],
        rulesT: "Rules", rules: "We pay at 30 days from invoice date. No gifts, no commissions: any employee who asks for one must be reported to the green line or to achats@cimenterie-du-fleuve.cd. The supplier code of conduct is part of every contract.",
        regT: "Registration request", form: { company: "Company name", rccm: "RCCM number", nif: "Tax number (NIF)", cat: "Main category", city: "City", contact: "Contact name", phone: "Phone", email: "E-mail", msg: "Activities and references", send: "Send request" }
      },
      contact: {
        h1: "Contact", lead: "Sales, logistics, communities, press: here is who to reach. We reply within two working days.",
        pointsT: "Our contact points", points: [["Sales desk", "Quotes, orders, retailers", "sales", "salesEmail"], ["Kinshasa-Limete terminal", "Concrete, pick-ups, barges", "terminalPhone", "salesEmail"], ["Procurement", "Registration, tenders", "phone", "procurement"], ["Recruitment", "Applications, internships", "phone", "hr"], ["Press", "Journalists, plant visits", "phone", "press"], ["Communities and complaints", "Free green line", "green", "email"]],
        formT: "Write to the company", form: { name: "Name", org: "Company", email: "E-mail", subject: "Subject", subjects: ["Quote or order", "Technical question", "Supplier", "Recruitment", "Press", "Other"], msg: "Message", send: "Send" },
        quoteT: "Quote request", quoteLead: "Reply within one working day.", quote: { name: "Name", org: "Company or site", phone: "Phone", product: "Product", qty: "Quantity (t or m³)", city: "Delivery place", date: "Requested date", msg: "Details", send: "Send request" },
        hoursT: "Opening hours", hours: [["Plant counter, Matadi", "Monday–Saturday, 7 am – 5 pm"], ["Limete terminal", "Monday–Saturday, 6 am – 6 pm"], ["Boma and Kikwit depots", "Monday–Saturday, 7 am – 4 pm"], ["Green line", "7 days a week, 24 hours"]],
        legalT: "Legal notice", legal: [["Company", "Cimenterie du Fleuve SA, public limited company with a capital of 48,000,000,000 FC"], ["Registered office", "Route de la Carrière, Ville-Basse, Matadi, Kongo Central"], ["RCCM", "CD/MAT/RCCM/14-B-0217"], ["Nat. ID", "01-H4900-N31207K"], ["NIF", "A1409876Q"], ["Publication director", "Mireille Nsimba Lukoki"], ["Hosting", "Servers located in Kinshasa, DRC, with encrypted backup copy"], ["Personal data", "Forms collect only the data needed to reply. It is kept for 12 months then deleted. Right of access, rectification and erasure by e-mail to contact@cimenterie-du-fleuve.cd, under ordinance-law no. 23/010 of 13 March 2023 on the Digital Code."], ["Cookies", "No advertising trackers. Local storage limited to language choice and consent preferences."]]
      },
      footer: { about: "Integrated producer of cement, concrete and aggregates in Matadi, Kongo Central, since 1974.", cols: [["Company", ["Who we are", "Sites & logistics", "News", "Careers"]], ["Products", ["Cements", "Ready-mix concrete", "Aggregates", "Datasheets"]], ["Partners", ["Tenders", "Register as a supplier", "Grievance mechanism", "Legal notice"]]], legal: "© 2026 Cimenterie du Fleuve SA · RCCM CD/MAT/RCCM/14-B-0217 · Fictitious company, demonstrator", by: "Site built by", photos: "Illustrative photos via Wikimedia Commons:" }
    }
  }
};

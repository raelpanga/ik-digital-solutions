/* Kando Ressources SA — all site content (French and English).
   Fictitious company built as a delivery-ready template for a DRC copper-cobalt producer.
   Every figure is illustrative and labelled as such on the pages. Replace with the client's data. */
"use strict";

const company = {
  name: "Kando Ressources SA",
  short: "Kando",
  tagline: { fr: "Cuivre et cobalt du Lualaba", en: "Copper and cobalt from Lualaba" },
  hq: { fr: "Avenue Lumumba, Kolwezi, Lualaba, République démocratique du Congo", en: "Avenue Lumumba, Kolwezi, Lualaba, Democratic Republic of the Congo" },
  phone: "+243 97 000 00 00",
  green: "0 800 00 12 12",
  email: "contact@kando-ressources.example",
  ir: "investisseurs@kando-ressources.example",
  press: "presse@kando-ressources.example",
  grievanceWa: "+243 97 000 00 12"
};

const facts = [
  { v: "61 400 t", fr: "cuivre cathode produit en 2025", en: "copper cathode produced in 2025" },
  { v: "3 900 t", fr: "cobalt contenu (hydroxyde) en 2025", en: "contained cobalt (hydroxide) in 2025" },
  { v: "2 340", fr: "employés, dont 93 % de Congolais", en: "employees, 93% Congolese" },
  { v: "118 M USD", fr: "versés à l'État en 2025 (déclaration ITIE)", en: "paid to the State in 2025 (EITI disclosure)" }
];

const leaders = [
  { n: "Jean-Claude Mwamba Kalenga", r: { fr: "Directeur général", en: "Chief Executive Officer" }, b: { fr: "Ingénieur des mines (Université de Lubumbashi), 24 ans dans le Copperbelt, dont 9 ans à la direction d'exploitations à ciel ouvert.", en: "Mining engineer (University of Lubumbashi), 24 years in the Copperbelt, including 9 years running open-pit operations." } },
  { n: "Thérèse Ilunga Kabongo", r: { fr: "Directrice financière", en: "Chief Financial Officer" }, b: { fr: "Expert-comptable, ancienne auditrice, responsable de la conformité fiscale et des déclarations ITIE depuis 2019.", en: "Chartered accountant, former auditor, in charge of tax compliance and EITI disclosures since 2019." } },
  { n: "Patrick Ngoy Mutombo", r: { fr: "Directeur des opérations", en: "Chief Operating Officer" }, b: { fr: "Métallurgiste, a conduit l'extension de l'usine SX-EW en 2019 et la montée en production de 2024.", en: "Metallurgist, led the 2019 SX-EW expansion and the 2024 production ramp-up." } },
  { n: "Nathalie Kabeya Tshibanda", r: { fr: "Directrice développement durable et communautés", en: "Director of Sustainability and Communities" }, b: { fr: "Juriste de formation, pilote le cahier des charges sociales, le mécanisme de plaintes et la certification en cours.", en: "Trained lawyer, leads the community obligations plan, the grievance mechanism and the ongoing certification." } },
  { n: "Emmanuel Kasongo Mbuyi", r: { fr: "Directeur HSE", en: "Head of Health, Safety and Environment" }, b: { fr: "Vingt ans de sécurité minière ; zéro accident mortel sur le site depuis trois ans.", en: "Twenty years in mine safety; zero fatalities on site for three years." } },
  { n: "Marie-Claire Banza Kayembe", r: { fr: "Directrice des ressources humaines", en: "Director of Human Resources" }, b: { fr: "Responsable du plan de formation et de la politique d'emploi local, 48 000 heures de formation en 2025.", en: "Owns the training plan and local employment policy, 48,000 training hours in 2025." } }
];

const board = [
  { n: "Augustin Kalala Kabwe", r: { fr: "Président du conseil d'administration", en: "Chairman of the Board" } },
  { n: "Sarah Mwila Ngalula", r: { fr: "Administratrice indépendante, présidente du comité d'audit", en: "Independent director, chair of the audit committee" } },
  { n: "David Okonkwo", r: { fr: "Administrateur, représentant de Kando Holdings", en: "Director, Kando Holdings representative" } },
  { n: "Faustin Lukusa Mpoyi", r: { fr: "Administrateur, représentant de l'État", en: "Director, State representative" } }
];

const timeline = [
  { y: "2009", fr: "Obtention du permis de recherche sur le gisement de Kando, à 28 km de Kolwezi.", en: "Exploration permit granted over the Kando deposit, 28 km from Kolwezi." },
  { y: "2013", fr: "Étude de faisabilité bancable : 42 Mt de réserves à 2,4 % Cu et 0,31 % Co.", en: "Bankable feasibility study: 42 Mt of reserves at 2.4% Cu and 0.31% Co." },
  { y: "2016", fr: "Première cathode de cuivre produite à l'usine de Kando (SX-EW, 35 000 t/an).", en: "First copper cathode produced at the Kando plant (SX-EW, 35,000 t/yr)." },
  { y: "2019", fr: "Extension de l'usine à 65 000 t/an et circuit cobalt (hydroxyde).", en: "Plant expanded to 65,000 t/yr with a cobalt hydroxide circuit." },
  { y: "2022", fr: "Mise en service de la centrale solaire de 20 MWc, première du Lualaba sur un site minier.", en: "20 MWp solar plant commissioned, the first on a Lualaba mine site." },
  { y: "2024", fr: "Certification ISO 45001 du site ; lancement de l'audit Copper Mark.", en: "Site certified ISO 45001; Copper Mark assurance process launched." },
  { y: "2025", fr: "Production record : 61 400 t de cuivre cathode. Publication du premier rapport de durabilité vérifié.", en: "Record output: 61,400 t of copper cathode. First independently assured sustainability report published." }
];

const operations = [
  { key: "mine", img: "haul.jpg", t: { fr: "Mine de Kando", en: "Kando Mine" }, sub: { fr: "Fosse à ciel ouvert · Lualaba", en: "Open pit · Lualaba" }, d: { fr: "Extraction de minerai oxydé de cuivre-cobalt par méthode conventionnelle (forage, tir, chargement, transport). 5,2 Mt de minerai extraites en 2025, ratio de découverture 3,1.", en: "Conventional drill-blast-load-haul mining of oxide copper-cobalt ore. 5.2 Mt of ore mined in 2025, strip ratio 3.1." } },
  { key: "plant", img: "kamoto.jpg", t: { fr: "Usine de Kando", en: "Kando Plant" }, sub: { fr: "Concentrateur, lixiviation, SX-EW", en: "Concentrator, leach, SX-EW" }, d: { fr: "Broyage, lixiviation en cuve, extraction par solvant et électrolyse : 65 000 t/an de cathodes de cuivre grade A et 4 500 t/an de cobalt contenu sous forme d'hydroxyde.", en: "Milling, tank leach, solvent extraction and electrowinning: 65,000 t/yr of grade A copper cathode and 4,500 t/yr of contained cobalt as hydroxide." } },
  { key: "explo", img: "t17.jpg", t: { fr: "Exploration Kanzenze-Sud", en: "Kanzenze South Exploration" }, sub: { fr: "Permis de recherche · 96 km²", en: "Exploration permit · 96 km²" }, d: { fr: "Campagne de 18 000 m de sondages en 2025-2026 sur une extension du gisement. Premières ressources attendues au premier semestre 2027.", en: "18,000 m drilling campaign in 2025-2026 on a deposit extension. Maiden resource expected in the first half of 2027." } }
];

const commodities = [
  { key: "cu", img: "cathode.jpg", t: { fr: "Cuivre", en: "Copper" }, d: { fr: "Nos cathodes de cuivre grade A (99,99 %) partent par route vers Dar es Salaam et Durban, puis vers les raffineries et câbleries d'Asie et d'Europe. Le cuivre est le métal de l'électrification : réseaux, moteurs, énergies renouvelables.", en: "Our grade A copper cathodes (99.99%) travel by road to Dar es Salaam and Durban, then to refineries and cable makers in Asia and Europe. Copper is the metal of electrification: grids, motors, renewables." }, kv: [[{ fr: "Production 2025", en: "2025 output" }, "61 400 t"], [{ fr: "Capacité", en: "Capacity" }, "65 000 t/an"], [{ fr: "Teneur réserves", en: "Reserve grade" }, "2,4 % Cu"], [{ fr: "Réserves", en: "Reserves" }, "42 Mt"]] },
  { key: "co", img: "malachite.jpg", t: { fr: "Cobalt", en: "Cobalt" }, d: { fr: "Le cobalt est récupéré sous forme d'hydroxyde (30 à 35 % Co) et vendu à des raffineurs sous contrats pluriannuels. Chaque lot est tracé de la fosse au conteneur, sans aucun apport artisanal, conformément au Guide OCDE sur le devoir de diligence.", en: "Cobalt is recovered as hydroxide (30 to 35% Co) and sold to refiners under multi-year contracts. Every lot is traced from pit to container, with no artisanal input, in line with the OECD Due Diligence Guidance." }, kv: [[{ fr: "Production 2025", en: "2025 output" }, "3 900 t Co"], [{ fr: "Capacité", en: "Capacity" }, "4 500 t/an"], [{ fr: "Teneur réserves", en: "Reserve grade" }, "0,31 % Co"], [{ fr: "Traçabilité", en: "Traceability" }, { fr: "lot par lot", en: "lot by lot" }]] }
];

const kpis = [
  { v: "0,42", fr: "taux de fréquence des accidents avec arrêt (LTIFR, par million d'heures)", en: "lost-time injury frequency rate (per million hours)" },
  { v: "0", fr: "accident mortel depuis 2023", en: "fatalities since 2023" },
  { v: "71 %", fr: "d'eau de procédé recyclée", en: "process water recycled" },
  { v: "38 %", fr: "d'électricité d'origine renouvelable (hydro + solaire)", en: "electricity from renewable sources (hydro + solar)" },
  { v: "93 %", fr: "d'employés congolais, 41 % originaires du Lualaba", en: "Congolese employees, 41% from Lualaba" },
  { v: "61 %", fr: "des achats auprès de fournisseurs congolais", en: "of purchases from Congolese suppliers" },
  { v: "4,2 M USD", fr: "investis en 2025 dans le cahier des charges sociales", en: "invested in 2025 under the community obligations plan" },
  { v: "48 000 h", fr: "de formation dispensées en 2025", en: "of training delivered in 2025" }
];

const programs = [
  { t: { fr: "Éducation", en: "Education" }, d: { fr: "Trois écoles réhabilitées à Kando et Kanzenze, 1 200 élèves, cantine scolaire et bourses pour 40 étudiants en filières techniques à Lubumbashi.", en: "Three schools rebuilt in Kando and Kanzenze, 1,200 pupils, a school canteen and scholarships for 40 technical students in Lubumbashi." } },
  { t: { fr: "Santé", en: "Health" }, d: { fr: "Centre de santé de Kando ouvert aux communautés, maternité, campagnes contre le paludisme et clinique mobile mensuelle.", en: "Kando health centre open to the community, maternity ward, malaria campaigns and a monthly mobile clinic." } },
  { t: { fr: "Eau", en: "Water" }, d: { fr: "Douze forages équipés de pompes solaires dans les villages riverains, entretien assuré par des comités d'usagers formés.", en: "Twelve solar-pumped boreholes in neighbouring villages, maintained by trained user committees." } },
  { t: { fr: "Agriculture et revenus", en: "Agriculture and livelihoods" }, d: { fr: "Coopératives maraîchères fournissant la cantine du site, 340 familles, appui technique et accès au crédit.", en: "Market-garden cooperatives supplying the site canteen, 340 families, technical support and access to credit." } }
];

const itie = [
  { y: "2023", roy: "38,1", tax: "27,4", cust: "11,9", prov: "6,2", tot: "83,6" },
  { y: "2024", roy: "44,7", tax: "33,0", cust: "13,5", prov: "7,1", tot: "98,3" },
  { y: "2025", roy: "52,9", tax: "40,6", cust: "15,8", prov: "8,7", tot: "118,0" }
];

const production = [
  { p: { fr: "T1 2026", en: "Q1 2026" }, ore: "1,31 Mt", cu: "15 800 t", co: "980 t", ltifr: "0,38" },
  { p: { fr: "T2 2026", en: "Q2 2026" }, ore: "1,36 Mt", cu: "16 400 t", co: "1 020 t", ltifr: "0,41" },
  { p: { fr: "Exercice 2025", en: "FY 2025" }, ore: "5,20 Mt", cu: "61 400 t", co: "3 900 t", ltifr: "0,42" },
  { p: { fr: "Exercice 2024", en: "FY 2024" }, ore: "4,85 Mt", cu: "56 200 t", co: "3 550 t", ltifr: "0,55" }
];

const docs = [
  { t: { fr: "Rapport annuel 2025", en: "2025 Annual Report" }, m: "PDF · 6,4 Mo · 2026-03-27" },
  { t: { fr: "États financiers audités 2025", en: "2025 Audited Financial Statements" }, m: "PDF · 2,1 Mo · 2026-03-27" },
  { t: { fr: "Rapport de durabilité 2025 (vérifié)", en: "2025 Sustainability Report (assured)" }, m: "PDF · 9,8 Mo · 2026-05-15" },
  { t: { fr: "Rapport de production, T2 2026", en: "Production Report, Q2 2026" }, m: "PDF · 0,6 Mo · 2026-07-22" },
  { t: { fr: "Déclaration ITIE 2024", en: "2024 EITI Disclosure" }, m: "PDF · 1,2 Mo · 2025-12-10" },
  { t: { fr: "Plan de gestion environnementale et sociale (résumé)", en: "Environmental and Social Management Plan (summary)" }, m: "PDF · 3,3 Mo · 2025-09-01" },
  { t: { fr: "Politique de diligence raisonnable sur les minerais", en: "Mineral Due Diligence Policy" }, m: "PDF · 0,4 Mo · 2025-06-30" },
  { t: { fr: "Code de conduite et politique anticorruption", en: "Code of Conduct and Anti-Corruption Policy" }, m: "PDF · 0,5 Mo · 2024-11-12" }
];

const calendar = [
  { d: "2026-10-21", fr: "Rapport de production du troisième trimestre 2026", en: "Third quarter 2026 production report" },
  { d: "2027-01-27", fr: "Rapport de production du quatrième trimestre et de l'exercice 2026", en: "Fourth quarter and full-year 2026 production report" },
  { d: "2027-03-26", fr: "Résultats annuels 2026 et rapport annuel", en: "2026 annual results and annual report" },
  { d: "2027-04-29", fr: "Assemblée générale des actionnaires, Kolwezi", en: "Annual general meeting, Kolwezi" }
];

const news = [
  { d: "2026-07-22", cat: { fr: "Production", en: "Production" }, t: { fr: "Production du deuxième trimestre 2026 : 16 400 tonnes de cuivre cathode", en: "Second quarter 2026 production: 16,400 tonnes of copper cathode" }, b: { fr: ["Kando Ressources a produit 16 400 t de cuivre cathode et 1 020 t de cobalt contenu au deuxième trimestre 2026, en hausse de 4 % sur le trimestre précédent, grâce à la disponibilité de l'usine (94 %) et à des teneurs alimentées conformes au plan.", "Le taux de fréquence des accidents avec arrêt s'établit à 0,41. Les prévisions annuelles de 64 000 à 66 000 t de cuivre sont maintenues."], en: ["Kando Ressources produced 16,400 t of copper cathode and 1,020 t of contained cobalt in the second quarter of 2026, up 4% on the previous quarter, on plant availability of 94% and feed grades in line with plan.", "The lost-time injury frequency rate was 0.41. Full-year guidance of 64,000 to 66,000 t of copper is maintained."] } },
  { d: "2026-06-30", cat: { fr: "Durabilité", en: "Sustainability" }, t: { fr: "L'audit Copper Mark entre dans sa phase de vérification sur site", en: "Copper Mark assurance enters on-site verification" }, b: { fr: ["Les vérificateurs indépendants ont achevé la revue documentaire des 32 critères du Copper Mark et conduiront la visite du site de Kando en septembre 2026.", "La société publiera le rapport de vérification dans son intégralité."], en: ["Independent assessors have completed the desk review of the 32 Copper Mark criteria and will conduct the Kando site visit in September 2026.", "The company will publish the assessment report in full."] } },
  { d: "2026-05-15", cat: { fr: "Durabilité", en: "Sustainability" }, t: { fr: "Publication du rapport de durabilité 2025, vérifié par un tiers indépendant", en: "2025 sustainability report published with independent assurance" }, b: { fr: ["Le rapport, aligné sur les normes GRI et les recommandations de la TCFD, couvre la sécurité, l'eau, les émissions, l'emploi local et le cahier des charges sociales.", "Les émissions de scopes 1 et 2 ont reculé de 9 % en 2025 avec la montée en puissance de la centrale solaire."], en: ["The report, aligned with GRI standards and TCFD recommendations, covers safety, water, emissions, local employment and the community obligations plan.", "Scope 1 and 2 emissions fell 9% in 2025 as the solar plant ramped up."] } },
  { d: "2026-04-24", cat: { fr: "Communauté", en: "Community" }, t: { fr: "Inauguration de l'école primaire de Kanzenze, 420 élèves à la rentrée", en: "Kanzenze primary school inaugurated, 420 pupils enrolled" }, b: { fr: ["Douze salles de classe, un bloc administratif et des latrines ont été construits dans le cadre du cahier des charges sociales, en concertation avec le comité local de développement.", "La cantine scolaire est approvisionnée par les coopératives maraîchères soutenues par la société."], en: ["Twelve classrooms, an administrative block and sanitation were built under the community obligations plan, in consultation with the local development committee.", "The school canteen is supplied by the market-garden cooperatives the company supports."] } },
  { d: "2026-03-27", cat: { fr: "Résultats", en: "Results" }, t: { fr: "Résultats annuels 2025 : production record et 118 millions de dollars versés à l'État", en: "2025 annual results: record output and 118 million dollars paid to the State" }, b: { fr: ["La production de cuivre cathode a atteint 61 400 t (+9 %). Les paiements à l'État congolais, détaillés dans la déclaration ITIE, se sont élevés à 118,0 M USD.", "Le conseil d'administration a approuvé un programme d'investissement de 85 M USD pour 2026, dont l'extension du parc à résidus et la campagne de sondages de Kanzenze-Sud."], en: ["Copper cathode output reached 61,400 t (+9%). Payments to the Congolese State, detailed in the EITI disclosure, amounted to USD 118.0 million.", "The board approved an 85 million dollar investment programme for 2026, including the tailings facility extension and the Kanzenze South drilling campaign."] } },
  { d: "2026-02-10", cat: { fr: "Sécurité", en: "Safety" }, t: { fr: "Trois ans sans accident mortel sur le site de Kando", en: "Three years without a fatality at the Kando site" }, b: { fr: ["Le site a franchi le cap de 1 000 jours sans accident mortel. Le programme de règles vitales, les inspections avant démarrage et la formation des sous-traitants ont été étendus à l'ensemble des entreprises présentes sur le site.", "Le taux de fréquence des accidents avec arrêt est passé de 0,55 en 2024 à 0,42 en 2025."], en: ["The site passed 1,000 days without a fatality. The life-saving rules programme, pre-start inspections and contractor training have been extended to every company working on site.", "The lost-time injury frequency rate fell from 0.55 in 2024 to 0.42 in 2025."] } },
  { d: "2026-01-28", cat: { fr: "Production", en: "Production" }, t: { fr: "Production du quatrième trimestre et de l'exercice 2025", en: "Fourth quarter and full-year 2025 production" }, b: { fr: ["Production annuelle de 61 400 t de cuivre et 3 900 t de cobalt contenu, dans le haut de la fourchette de prévisions.", "L'usine a traité 5,20 Mt de minerai à une teneur moyenne de 2,31 % Cu."], en: ["Annual output of 61,400 t of copper and 3,900 t of contained cobalt, at the top of the guidance range.", "The plant treated 5.20 Mt of ore at an average grade of 2.31% Cu."] } },
  { d: "2025-11-18", cat: { fr: "Nomination", en: "Appointment" }, t: { fr: "Nathalie Kabeya Tshibanda nommée directrice développement durable et communautés", en: "Nathalie Kabeya Tshibanda appointed Director of Sustainability and Communities" }, b: { fr: ["Juriste, précédemment responsable des relations communautaires, elle rejoint le comité de direction et pilotera le mécanisme de plaintes, le cahier des charges sociales et la certification Copper Mark.", "Elle succède à Michel Tshisekedi Kanku, admis à la retraite."], en: ["A lawyer and previously head of community relations, she joins the executive committee and will lead the grievance mechanism, the community obligations plan and the Copper Mark certification.", "She succeeds Michel Tshisekedi Kanku, who has retired."] } },
  { d: "2025-09-01", cat: { fr: "Durabilité", en: "Sustainability" }, t: { fr: "Mise à jour du plan de gestion environnementale et sociale approuvée", en: "Updated environmental and social management plan approved" }, b: { fr: ["Le plan révisé intègre l'extension du parc à résidus, le suivi de la qualité de l'eau de la rivière Kando et le programme de réhabilitation progressive des zones exploitées.", "Un résumé non technique est disponible en français et en swahili dans les bureaux communautaires."], en: ["The revised plan covers the tailings facility extension, water quality monitoring on the Kando River and the progressive rehabilitation programme for mined-out areas.", "A non-technical summary is available in French and Swahili at the community offices."] } },
  { d: "2025-06-12", cat: { fr: "Communauté", en: "Community" }, t: { fr: "Douze forages solaires mis en service dans les villages riverains", en: "Twelve solar boreholes commissioned in neighbouring villages" }, b: { fr: ["Chaque forage dessert environ 400 personnes et est géré par un comité d'usagers formé à l'entretien des pompes.", "Le programme répond à la première demande exprimée lors des consultations de 2024."], en: ["Each borehole serves about 400 people and is managed by a user committee trained in pump maintenance.", "The programme answers the first request voiced in the 2024 consultations."] } },
  { d: "2024-12-10", cat: { fr: "Résultats", en: "Results" }, t: { fr: "Déclaration ITIE 2024 : 98,3 millions de dollars de paiements à l'État", en: "2024 EITI disclosure: 98.3 million dollars paid to the State" }, b: { fr: ["La société publie le détail de ses paiements par nature et par entité bénéficiaire, rapproché avec les données de l'administration dans le cadre du processus ITIE-RDC.", "La redevance minière représente 45 % du total."], en: ["The company publishes its payments by type and receiving entity, reconciled with government data under the EITI-DRC process.", "Mining royalties account for 45% of the total."] } },
  { d: "2024-07-03", cat: { fr: "Sécurité", en: "Safety" }, t: { fr: "Certification ISO 45001 du système de management de la santé et de la sécurité", en: "ISO 45001 certification of the health and safety management system" }, b: { fr: ["L'audit de certification a couvert la mine, l'usine et les activités des sous-traitants.", "La certification sera renouvelée par audits de suivi annuels."], en: ["The certification audit covered the mine, the plant and contractor activities.", "Certification is maintained through annual surveillance audits."] } }
];

const jobs = [
  { id: "KR-26-041", t: { fr: "Ingénieur(e) des mines senior", en: "Senior Mining Engineer" }, site: "Kando", dept: { fr: "Mine", en: "Mine" }, type: { fr: "CDI", en: "Permanent" } },
  { id: "KR-26-042", t: { fr: "Opérateur(trice) d'engins lourds", en: "Heavy Equipment Operator" }, site: "Kando", dept: { fr: "Mine", en: "Mine" }, type: { fr: "CDI · 6 postes", en: "Permanent · 6 positions" } },
  { id: "KR-26-043", t: { fr: "Technicien(ne) SX-EW", en: "SX-EW Technician" }, site: "Usine", dept: { fr: "Usine", en: "Plant" }, type: { fr: "CDI", en: "Permanent" } },
  { id: "KR-26-044", t: { fr: "Géologue d'exploration", en: "Exploration Geologist" }, site: "Kanzenze", dept: { fr: "Exploration", en: "Exploration" }, type: { fr: "CDD 18 mois", en: "18-month contract" } },
  { id: "KR-26-045", t: { fr: "Responsable HSE adjoint(e)", en: "Deputy HSE Manager" }, site: "Kando", dept: { fr: "HSE", en: "HSE" }, type: { fr: "CDI", en: "Permanent" } },
  { id: "KR-26-046", t: { fr: "Comptable fournisseurs", en: "Accounts Payable Accountant" }, site: "Lubumbashi", dept: { fr: "Finance", en: "Finance" }, type: { fr: "CDI", en: "Permanent" } },
  { id: "KR-26-047", t: { fr: "Infirmier(ère) de site", en: "Site Nurse" }, site: "Kando", dept: { fr: "Santé", en: "Health" }, type: { fr: "CDI · rotation", en: "Permanent · roster" } },
  { id: "KR-26-048", t: { fr: "Chargé(e) de relations communautaires", en: "Community Relations Officer" }, site: "Kanzenze", dept: { fr: "Communautés", en: "Communities" }, type: { fr: "CDI", en: "Permanent" } }
];

const credits = [
  ["KOV Pit", "Martin Tuchscherer", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:KOV_Pit_-_panoramio.jpg"],
  ["Kamoto Mine", "Martin Tuchscherer", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Kamoto_Mine_-_panoramio.jpg"],
  ["T17 Pit", "Martin Tuchscherer", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:T17_Pit_-_panoramio.jpg"],
  ["Shituru refinery", "Gécamines", "domaine public / public domain", "https://commons.wikimedia.org/wiki/File:Flow_racks_for_the_electrolyzed_copper,_Gecamines_Shituru_refinery_near_Likasi.jpg"],
  ["Copper cathode", "ChrisFountain", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Bundles_of_cathode_copper.png"],
  ["Kolwezi 1973", "Rob Mieremet / Anefo", "CC0", "https://commons.wikimedia.org/wiki/File:Kopermijn_te_Kolwezi,in_de_provincie_Shaba_(Katanka),_Bestanddeelnr_926-7698.jpg"],
  ["Lubumbashi", "Oasisk.", "CC BY 2.5", "https://commons.wikimedia.org/wiki/File:Downtown_Lubumbashi,_Democratic_Republic_of_the_Congo_-_20061130.jpg"],
  ["École / school", "MONUSCO Photos", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:La_MONUSCO_distribue_des_cahiers_aux_enfants_du_village_pour_les_encourager_%C3%A0_fr%C3%A9quenter_l%E2%80%99%C3%A9cole_(16151496190).jpg"],
  ["Khi Solar One", "Franz Reinisch", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Khi_Solar_One_1200.jpg"],
  ["Haul truck", "Sandrerro", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Belaz_haul_truck_and_a_Hitachi_mining_excavator.jpg"],
  ["Workshop", "Calistemon", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Haul_truck_under_repair_at_Brockman_4,_September_2018.jpg"],
  ["Malachite", "Ji-Elle", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Malachite_sur_cobaltocalcite-Musonoi-RDC.jpg"]
];

const ui = {
  fr: {
    demoBar: "Démonstrateur IK Digital Solutions · société minière fictive · chiffres illustratifs · photos sous licence libre (crédits en pied de page)",
    back: "← Retour au portfolio",
    util: { green: "Numéro vert plaintes et signalements", ir: "Espace investisseurs", careers: "Recrutement" },
    nav: [["index", "Qui sommes-nous", "qui-sommes-nous.html"], ["ops", "Nos activités", "activites.html"], ["ir", "Investisseurs", "investisseurs.html"], ["sust", "Durabilité", "durabilite.html"], ["news", "Actualités", "actualites.html"], ["careers", "Carrières", "carrieres.html"], ["contact", "Contact", "contact.html"]],
    menu: "Menu",
    illustrative: "Chiffres illustratifs, à remplacer par les données de la société.",
    home: {
      title: "Kando Ressources SA · Cuivre et cobalt du Lualaba",
      h1: "Le cuivre et le cobalt du Lualaba, produits avec rigueur, déclarés avec transparence.",
      lead: "Kando Ressources exploite une mine à ciel ouvert et une usine SX-EW à 28 km de Kolwezi. Nous publions nos chiffres de production, nos paiements à l'État et nos résultats de sécurité, et nous répondons à chaque plainte.",
      cta1: "Découvrir nos activités", cta2: "Rapport de durabilité 2025",
      opsEyebrow: "Nos activités", opsTitle: "Une mine, une usine, un permis d'exploration", opsLead: "Tout ce que nous produisons est extrait, traité et expédié depuis le Lualaba.", opsMore: "Voir la fiche",
      sustEyebrow: "Durabilité", sustTitle: "Ce que nous mesurons, nous le publions.", sustLead: "Sécurité, eau, énergie, emploi local et paiements à l'État : les mêmes indicateurs chaque année, vérifiés par un tiers.", sustMore: "Tous les indicateurs et rapports",
      newsEyebrow: "Actualités", newsTitle: "Derniers communiqués", newsMore: "Toutes les actualités",
      irEyebrow: "Investisseurs et partenaires", irTitle: "Les documents que vous cherchez, au même endroit.", irLead: "Rapports annuels, états financiers, rapports de production trimestriels et déclarations ITIE.", irMore: "Espace investisseurs",
      communityTitle: "Nos voisins avant tout", communityLead: "Trois écoles, un centre de santé, douze forages et 340 familles en coopératives : le cahier des charges sociales est un engagement annuel, décidé avec les comités locaux de développement.", communityMore: "Programmes communautaires et mécanisme de plaintes"
    },
    about: {
      title: "Qui sommes-nous", h1: "Une société minière congolaise, ancrée à Kolwezi depuis 2009.",
      lead: "Kando Ressources SA est une société de droit congolais détenue à 90 % par Kando Holdings et à 10 % par l'État congolais, conformément au Code minier de 2018. Nous employons 2 340 personnes, dont 93 % de Congolais.",
      missionT: "Notre mission", mission: "Produire du cuivre et du cobalt dont l'origine et les conditions de production ne laissent aucune question sans réponse : pour nos clients, pour l'État, pour nos voisins.",
      valuesT: "Nos engagements", values: [["Sécurité", "Personne ne doit être blessé en travaillant pour nous. Les règles vitales s'appliquent à tous, employés et sous-traitants."], ["Transparence", "Production, paiements à l'État et incidents sont publiés selon un calendrier fixe."], ["Emploi local", "Recrutement et achats en priorité dans le Lualaba, formation pour faire progresser chacun."], ["Respect", "Consultation des communautés avant chaque projet, réponse à chaque plainte dans les 30 jours."]],
      historyT: "Notre histoire", leadersT: "Comité de direction", boardT: "Conseil d'administration", govT: "Gouvernance",
      gov: "Le conseil d'administration compte quatre membres, dont une administratrice indépendante qui préside le comité d'audit. Un comité santé, sécurité, environnement et communautés se réunit chaque trimestre. Le code de conduite et la politique anticorruption s'appliquent à tous les employés, fournisseurs et sous-traitants ; une ligne d'alerte confidentielle est ouverte à tous."
    },
    ops: {
      title: "Nos activités", h1: "De la fosse à la cathode, sur un seul site.",
      lead: "La mine de Kando alimente l'usine voisine, qui produit des cathodes de cuivre grade A et de l'hydroxyde de cobalt. Le permis de Kanzenze-Sud prépare la suite.",
      sitesT: "Nos sites", commT: "Nos produits", mapT: "Où nous sommes", mapLead: "À 28 km au nord-ouest de Kolwezi, dans le Lualaba, au cœur du Copperbelt congolais.",
      logisticsT: "Logistique et marchés", logistics: "Les cathodes partent en camion vers Dar es Salaam (2 300 km) et Durban (2 900 km) puis par mer. Nous expédions environ 2 400 conteneurs par an et travaillons avec des transporteurs congolais et zambiens agréés. L'hydroxyde de cobalt est vendu sous contrats pluriannuels à des raffineurs qui publient leur propre diligence raisonnable.",
      energyT: "Énergie", energy: "Le site est alimenté par le réseau hydroélectrique national et par notre centrale solaire de 20 MWc, mise en service en 2022. La part renouvelable atteint 38 % ; l'objectif est de 60 % en 2028 avec une seconde tranche solaire et du stockage."
    },
    ir: {
      title: "Investisseurs", h1: "Informations financières et opérationnelles.",
      lead: "Kando Ressources n'est pas cotée. Cette page s'adresse à nos actionnaires, à nos prêteurs, à nos partenaires commerciaux et aux administrations. Les rapports sont publiés selon un calendrier fixe et restent accessibles en archive.",
      highlightsT: "Faits saillants 2025", prodT: "Production trimestrielle", prodNote: "Cuivre cathode et cobalt contenu dans l'hydroxyde. LTIFR : accidents avec arrêt par million d'heures travaillées.",
      docsT: "Rapports et documents", calT: "Calendrier", itieT: "Paiements à l'État (ITIE)", itieNote: "Millions de dollars US. Redevance minière, impôt sur les bénéfices et profits, droits et taxes de douane (DGDA), taxes provinciales et locales. Données rapprochées dans le cadre de l'ITIE-RDC.",
      shareT: "Structure du capital", share: "90 % Kando Holdings Ltd · 10 % République démocratique du Congo (participation non diluable prévue par le Code minier de 2018).",
      contactT: "Contact investisseurs", contactLead: "Pour toute question sur les résultats, les rapports ou le calendrier.",
      form: { name: "Nom", org: "Organisation", email: "E-mail", msg: "Votre question", send: "Envoyer" },
      alertT: "Recevoir les communiqués par e-mail", alertBtn: "S'inscrire"
    },
    sust: {
      title: "Durabilité", h1: "Sécurité, environnement, communautés : les chiffres d'abord.",
      lead: "Chaque année nous publions les mêmes indicateurs, vérifiés par un tiers indépendant, et nous rendons compte de ce qui n'a pas marché autant que de ce qui a marché.",
      kpiT: "Indicateurs 2025", frameworks: "Rapport aligné sur GRI, TCFD et SASB (métaux et mines). Déclaration ITIE-RDC. Diligence raisonnable selon le Guide OCDE. Audit Copper Mark en cours.",
      envT: "Environnement", env: [["Eau", "71 % de l'eau de procédé est recyclée. La qualité de la rivière Kando est mesurée chaque mois en amont et en aval, et les résultats sont affichés dans les bureaux communautaires."], ["Résidus", "Parc à résidus conçu selon la norme mondiale de gestion des résidus (GISTM), inspecté chaque trimestre par un ingénieur indépendant."], ["Climat", "Émissions de scopes 1 et 2 de 210 kt CO₂e en 2025, en baisse de 9 %. Centrale solaire de 20 MWc, objectif 60 % d'électricité renouvelable en 2028."], ["Réhabilitation", "Réhabilitation progressive des zones exploitées, pépinière de 40 000 plants d'espèces locales, provision financière pour la fermeture révisée chaque année."]],
      commT: "Programmes communautaires", commLead: "Le cahier des charges sociales, prévu par le Code minier, est établi avec les comités locaux de développement de Kando et de Kanzenze. Budget 2025 : 4,2 M USD.",
      consultT: "Consultation et consentement", consult: "Aucun projet n'est lancé sans consultation préalable des communautés concernées. Les réunions se tiennent en français, en swahili et en lunda, et leurs comptes rendus sont affichés dans les bureaux communautaires. Aucune réinstallation n'a été nécessaire à ce jour.",
      mineralsT: "Origine des minerais", minerals: "Tout le cuivre et le cobalt que nous vendons provient de la mine de Kando. Nous n'achetons aucun minerai artisanal. Chaque lot est tracé de la fosse au conteneur et notre politique de diligence raisonnable suit le Guide OCDE.",
      grievT: "Mécanisme de plaintes et de signalements", grievLead: "Toute personne, employé, sous-traitant, riverain, peut déposer une plainte gratuitement, y compris de façon anonyme. Chaque plainte reçoit un numéro, un accusé de réception sous 48 heures et une réponse dans les 30 jours.",
      grievSteps: [["1 · Réception", "Numéro vert, WhatsApp, bureaux communautaires de Kando et Kanzenze, ou ce formulaire."], ["2 · Enregistrement", "Numéro de référence remis au plaignant, sous 48 heures."], ["3 · Examen", "Enquête par l'équipe communautaire, avec visite si nécessaire, sous 30 jours."], ["4 · Réponse et recours", "Réponse écrite. En cas de désaccord, médiation par le comité local de développement."]],
      form: { name: "Nom (facultatif)", phone: "Téléphone ou e-mail pour l'accusé de réception", place: "Village ou site concerné", type: "Objet", types: ["Environnement (eau, poussière, bruit)", "Emploi ou sous-traitance", "Terres et cultures", "Comportement du personnel", "Autre"], msg: "Description", anon: "Je souhaite rester anonyme", send: "Déposer le signalement" },
      docsT: "Rapports et politiques"
    },
    news: { title: "Actualités", h1: "Communiqués et actualités", lead: "Résultats, production, durabilité, communautés et nominations. Archive complète, consultable par mot-clé, catégorie et année.", search: "Rechercher un communiqué", allCat: "Toutes les catégories", allYear: "Toutes les années", pressT: "Contact presse" },
    careers: { title: "Carrières", h1: "Travailler à Kando.", lead: "2 340 collègues, 93 % de Congolais, 41 % originaires du Lualaba. Nous recrutons localement d'abord et nous formons : 48 000 heures en 2025.", whyT: "Pourquoi nous rejoindre", why: [["Sécurité", "Site certifié ISO 45001, règles vitales, droit de refus de tout travail dangereux."], ["Formation", "Centre de formation sur site, apprentissage pour les jeunes du Lualaba, bourses techniques à Lubumbashi."], ["Progression", "Deux tiers des postes d'encadrement sont pourvus en interne."], ["Conditions", "Transport, restauration, couverture santé pour la famille, logement en rotation."]], jobsT: "Postes ouverts", allSites: "Tous les sites", allDepts: "Tous les services", applyT: "Postuler", form: { job: "Poste", name: "Nom complet", phone: "Téléphone", email: "E-mail", cv: "CV (PDF)", consent: "J'accepte que mes données soient traitées pour ce recrutement.", send: "Envoyer ma candidature" }, localT: "Emploi local et sous-traitance", local: "Conformément à la loi 17/001 sur la sous-traitance, les prestations éligibles sont confiées à des entreprises à capitaux congolais. Les fournisseurs peuvent se référencer auprès du service achats de Lubumbashi." },
    contact: { title: "Contact", h1: "Nous contacter", lead: "Trois bureaux et un numéro vert. Les bureaux communautaires reçoivent sans rendez-vous du lundi au vendredi.", officesT: "Bureaux", offices: [["Siège · Kolwezi", "Avenue Lumumba, Kolwezi, Lualaba", company.phone], ["Bureau de Lubumbashi", "Avenue Sendwe, Lubumbashi, Haut-Katanga", "+243 97 000 00 01"], ["Bureau communautaire · Kando", "Village de Kando, en face de l'école", company.green]], form: { name: "Nom", email: "E-mail ou téléphone", subject: "Objet", subjects: ["Question générale", "Fournisseurs et achats", "Presse", "Investisseurs", "Communautés"], msg: "Message", send: "Envoyer" }, greenT: "Numéro vert plaintes et signalements", greenLead: "Gratuit depuis tous les réseaux, du lundi au samedi de 7 h à 19 h. WhatsApp 24 h/24." },
    footer: { about: "Kando Ressources SA, société minière de droit congolais. Mine et usine de Kando, Lualaba. Société fictive créée pour cette démonstration.", cols: [["Société", ["Qui sommes-nous", "Nos activités", "Carrières", "Contact"]], ["Transparence", ["Espace investisseurs", "Rapports et documents", "Déclaration ITIE", "Mécanisme de plaintes"]], ["Informations", ["Actualités", "Politique de confidentialité", "Code de conduite", "Fournisseurs"]]], legal: "© 2026 Kando Ressources SA · Kolwezi · RCCM CD/KOL/RCCM/26-B-00000 (exemple)", by: "Site réalisé par", photos: "Photos via Wikimedia Commons :" },
    common: { readMore: "Lire", download: "Télécharger", details: "Détails", apply: "Postuler", grievanceCta: "Déposer un signalement", all: "Tous" }
  },
  en: {
    demoBar: "IK Digital Solutions demonstrator · fictitious mining company · illustrative figures · freely licensed photos (credits in the footer)",
    back: "← Back to portfolio",
    util: { green: "Grievance and whistleblowing hotline", ir: "Investors", careers: "Careers" },
    nav: [["index", "Who we are", "who-we-are.html"], ["ops", "What we do", "what-we-do.html"], ["ir", "Investors", "investors.html"], ["sust", "Sustainability", "sustainability.html"], ["news", "News", "news.html"], ["careers", "Careers", "careers.html"], ["contact", "Contact", "contact.html"]],
    menu: "Menu",
    illustrative: "Illustrative figures, to be replaced with the company's data.",
    home: {
      title: "Kando Ressources SA · Copper and cobalt from Lualaba",
      h1: "Lualaba copper and cobalt, produced with rigour, reported with transparency.",
      lead: "Kando Ressources operates an open-pit mine and an SX-EW plant 28 km from Kolwezi. We publish our production figures, our payments to the State and our safety results, and we answer every grievance.",
      cta1: "Explore our operations", cta2: "2025 Sustainability Report",
      opsEyebrow: "What we do", opsTitle: "One mine, one plant, one exploration permit", opsLead: "Everything we produce is mined, processed and shipped from Lualaba.", opsMore: "Read more",
      sustEyebrow: "Sustainability", sustTitle: "What we measure, we publish.", sustLead: "Safety, water, energy, local employment and payments to the State: the same indicators every year, independently assured.", sustMore: "All indicators and reports",
      newsEyebrow: "News", newsTitle: "Latest releases", newsMore: "All news",
      irEyebrow: "Investors and partners", irTitle: "The documents you need, in one place.", irLead: "Annual reports, financial statements, quarterly production reports and EITI disclosures.", irMore: "Investor centre",
      communityTitle: "Neighbours first", communityLead: "Three schools, a health centre, twelve boreholes and 340 families in cooperatives: the community obligations plan is an annual commitment agreed with the local development committees.", communityMore: "Community programmes and grievance mechanism"
    },
    about: {
      title: "Who we are", h1: "A Congolese mining company, rooted in Kolwezi since 2009.",
      lead: "Kando Ressources SA is a company under Congolese law, 90% owned by Kando Holdings and 10% by the Congolese State under the 2018 Mining Code. We employ 2,340 people, 93% of them Congolese.",
      missionT: "Our mission", mission: "To produce copper and cobalt whose origin and production conditions leave no question unanswered: for our customers, for the State, for our neighbours.",
      valuesT: "Our commitments", values: [["Safety", "Nobody should be hurt working for us. Life-saving rules apply to everyone, employees and contractors."], ["Transparency", "Production, payments to the State and incidents are published on a fixed calendar."], ["Local employment", "Hiring and purchasing first in Lualaba, training so that everyone can progress."], ["Respect", "Communities are consulted before every project; every grievance is answered within 30 days."]],
      historyT: "Our history", leadersT: "Executive committee", boardT: "Board of directors", govT: "Governance",
      gov: "The board has four members, including an independent director who chairs the audit committee. A health, safety, environment and communities committee meets quarterly. The code of conduct and anti-corruption policy apply to all employees, suppliers and contractors; a confidential whistleblowing line is open to all."
    },
    ops: {
      title: "What we do", h1: "From pit to cathode, on a single site.",
      lead: "The Kando mine feeds the neighbouring plant, which produces grade A copper cathode and cobalt hydroxide. The Kanzenze South permit prepares what comes next.",
      sitesT: "Our sites", commT: "Our products", mapT: "Where we are", mapLead: "28 km north-west of Kolwezi, in Lualaba, in the heart of the Congolese Copperbelt.",
      logisticsT: "Logistics and markets", logistics: "Cathodes leave by truck for Dar es Salaam (2,300 km) and Durban (2,900 km), then by sea. We ship about 2,400 containers a year and work with licensed Congolese and Zambian hauliers. Cobalt hydroxide is sold under multi-year contracts to refiners who publish their own due diligence.",
      energyT: "Energy", energy: "The site is powered by the national hydroelectric grid and by our 20 MWp solar plant, commissioned in 2022. The renewable share is 38%; the target is 60% in 2028 with a second solar phase and storage."
    },
    ir: {
      title: "Investors", h1: "Financial and operational information.",
      lead: "Kando Ressources is not listed. This page serves our shareholders, lenders, commercial partners and public administrations. Reports are published on a fixed calendar and remain archived here.",
      highlightsT: "2025 highlights", prodT: "Quarterly production", prodNote: "Copper cathode and cobalt contained in hydroxide. LTIFR: lost-time injuries per million hours worked.",
      docsT: "Reports and documents", calT: "Calendar", itieT: "Payments to the State (EITI)", itieNote: "Millions of US dollars. Mining royalties, corporate income tax, customs duties and taxes (DGDA), provincial and local taxes. Reconciled under the EITI-DRC process.",
      shareT: "Ownership", share: "90% Kando Holdings Ltd · 10% Democratic Republic of the Congo (non-dilutable interest under the 2018 Mining Code).",
      contactT: "Investor contact", contactLead: "For any question about results, reports or the calendar.",
      form: { name: "Name", org: "Organisation", email: "E-mail", msg: "Your question", send: "Send" },
      alertT: "Receive releases by e-mail", alertBtn: "Subscribe"
    },
    sust: {
      title: "Sustainability", h1: "Safety, environment, communities: figures first.",
      lead: "Every year we publish the same indicators, independently assured, and we report what did not work as well as what did.",
      kpiT: "2025 indicators", frameworks: "Report aligned with GRI, TCFD and SASB (metals and mining). EITI-DRC disclosure. Due diligence under the OECD Guidance. Copper Mark assurance in progress.",
      envT: "Environment", env: [["Water", "71% of process water is recycled. Kando River quality is measured monthly upstream and downstream, and results are posted at the community offices."], ["Tailings", "Tailings facility designed to the Global Industry Standard on Tailings Management, inspected quarterly by an independent engineer."], ["Climate", "Scope 1 and 2 emissions of 210 kt CO₂e in 2025, down 9%. 20 MWp solar plant, target of 60% renewable electricity by 2028."], ["Rehabilitation", "Progressive rehabilitation of mined-out areas, nursery of 40,000 native seedlings, closure provision reviewed annually."]],
      commT: "Community programmes", commLead: "The community obligations plan required by the Mining Code is agreed with the Kando and Kanzenze local development committees. 2025 budget: USD 4.2 million.",
      consultT: "Consultation and consent", consult: "No project starts without prior consultation of the communities concerned. Meetings are held in French, Swahili and Lunda, and minutes are posted at the community offices. No resettlement has been required to date.",
      mineralsT: "Mineral origin", minerals: "All the copper and cobalt we sell comes from the Kando mine. We buy no artisanal ore. Every lot is traced from pit to container and our due diligence policy follows the OECD Guidance.",
      grievT: "Grievance and whistleblowing mechanism", grievLead: "Anyone, employee, contractor or neighbour, can file a grievance free of charge, including anonymously. Each grievance receives a reference number, an acknowledgement within 48 hours and a response within 30 days.",
      grievSteps: [["1 · Receipt", "Hotline, WhatsApp, community offices in Kando and Kanzenze, or this form."], ["2 · Registration", "Reference number given to the complainant within 48 hours."], ["3 · Review", "Investigation by the community team, with a site visit where needed, within 30 days."], ["4 · Response and appeal", "Written response. In case of disagreement, mediation by the local development committee."]],
      form: { name: "Name (optional)", phone: "Phone or e-mail for the acknowledgement", place: "Village or site concerned", type: "Subject", types: ["Environment (water, dust, noise)", "Employment or contracting", "Land and crops", "Staff conduct", "Other"], msg: "Description", anon: "I wish to remain anonymous", send: "Submit the report" },
      docsT: "Reports and policies"
    },
    news: { title: "News", h1: "Releases and news", lead: "Results, production, sustainability, communities and appointments. Full archive, searchable by keyword, category and year.", search: "Search releases", allCat: "All categories", allYear: "All years", pressT: "Press contact" },
    careers: { title: "Careers", h1: "Working at Kando.", lead: "2,340 colleagues, 93% Congolese, 41% from Lualaba. We hire locally first and we train: 48,000 hours in 2025.", whyT: "Why join us", why: [["Safety", "ISO 45001 certified site, life-saving rules, the right to refuse unsafe work."], ["Training", "On-site training centre, apprenticeships for young people from Lualaba, technical scholarships in Lubumbashi."], ["Progression", "Two thirds of supervisory positions are filled internally."], ["Conditions", "Transport, meals, family health cover, roster accommodation."]], jobsT: "Open positions", allSites: "All sites", allDepts: "All departments", applyT: "Apply", form: { job: "Position", name: "Full name", phone: "Phone", email: "E-mail", cv: "CV (PDF)", consent: "I agree to my data being processed for this recruitment.", send: "Send my application" }, localT: "Local employment and subcontracting", local: "Under Law 17/001 on subcontracting, eligible services are awarded to Congolese-owned companies. Suppliers can register with the procurement office in Lubumbashi." },
    contact: { title: "Contact", h1: "Contact us", lead: "Three offices and a free hotline. Community offices welcome visitors without appointment, Monday to Friday.", officesT: "Offices", offices: [["Head office · Kolwezi", "Avenue Lumumba, Kolwezi, Lualaba", company.phone], ["Lubumbashi office", "Avenue Sendwe, Lubumbashi, Haut-Katanga", "+243 97 000 00 01"], ["Community office · Kando", "Kando village, opposite the school", company.green]], form: { name: "Name", email: "E-mail or phone", subject: "Subject", subjects: ["General enquiry", "Suppliers and procurement", "Press", "Investors", "Communities"], msg: "Message", send: "Send" }, greenT: "Grievance and whistleblowing hotline", greenLead: "Free from all networks, Monday to Saturday, 7am to 7pm. WhatsApp 24/7." },
    footer: { about: "Kando Ressources SA, a mining company under Congolese law. Kando mine and plant, Lualaba. Fictitious company created for this demonstration.", cols: [["Company", ["Who we are", "What we do", "Careers", "Contact"]], ["Transparency", ["Investor centre", "Reports and documents", "EITI disclosure", "Grievance mechanism"]], ["Information", ["News", "Privacy policy", "Code of conduct", "Suppliers"]]], legal: "© 2026 Kando Ressources SA · Kolwezi · RCCM CD/KOL/RCCM/26-B-00000 (example)", by: "Site by", photos: "Photos via Wikimedia Commons:" },
    common: { readMore: "Read", download: "Download", details: "Details", apply: "Apply", grievanceCta: "File a report", all: "All" }
  }
};

module.exports = { company, facts, leaders, board, timeline, operations, commodities, kpis, programs, itie, production, docs, calendar, news, jobs, credits, ui };

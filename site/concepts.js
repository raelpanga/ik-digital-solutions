"use strict";
/* Concept websites are original static studies. They are not client commissions. */
const specs = [
  ["mama-kivu", "Restaurant", "Mama Kivu", "A table shaped by the river, the market and the season.", "A restaurant concept built around reservations, a changing menu and an atmosphere that begins before guests arrive.", "#a6422b", "Congo River kitchen", "Restaurant & reservations", "Reservation flow", "Menu du jour", "Mobile"],
  ["maison-kiro", "Real estate", "Maison Kiro", "Homes with room to become your own.", "A real-estate concept with a calmer property search, detailed neighbourhood stories and a focused enquiry journey.", "#2a423d", "Kinshasa property journal", "Real estate", "Property search", "Neighbourhoods", "Mobile"],
  ["clinique-ubwiza", "Medical clinic", "Clinique Ubwiza", "Care that starts before the consultation.", "A clinic concept where patients find the right service, doctor and appointment without navigating medical jargon.", "#177c89", "A considered care experience", "Healthcare", "Appointments", "Care pathways", "Mobile"],
  ["ecole-nkamba", "School", "École Nkamba", "Curiosity belongs in every classroom.", "A school concept that brings programmes, admissions and family updates into one warm, practical experience.", "#e8a93b", "Learning for a changing world", "Education", "Admissions", "Family portal", "Mobile"],
  ["cabinet-mbala", "Law firm", "Cabinet Mbala", "Clarity in the decisions that matter.", "A legal-services concept designed to establish trust, explain specialist expertise and make a first conversation easy.", "#352c28", "Business law in plain language", "Legal services", "Expertise", "Secure enquiry", "Bilingual"],
  ["batir-congo", "Construction", "Bâtir Congo", "Make every foundation count.", "A construction concept that gives developers, partners and future clients a clear view of projects, standards and capability.", "#19467a", "Building places that last", "Construction", "Project portfolio", "Capability", "Bilingual"],
  ["hotel-azur", "Hotel", "Hôtel Azur", "A quieter way to arrive in the city.", "A hospitality concept pairing an immersive stay preview with direct booking and local recommendations.", "#135b5b", "Stay close to the city, far from its noise", "Hospitality", "Direct booking", "City guide", "Mobile"],
  ["atelier-commun", "Retail", "Atelier Commun", "Objects chosen for everyday rituals.", "A retail concept that turns a small catalogue into an editorial shopping experience with a clear WhatsApp handoff.", "#cd4e3f", "Independent objects for living", "Retail & e-commerce", "Catalogue", "WhatsApp", "Mobile"]
];
const features = {
  fr: ["Un premier écran conçu pour une décision claire", "Une histoire de marque et des contenus hiérarchisés", "Un appel à l’action adapté à l’activité", "Une lecture confortable sur téléphone"],
  en: ["A first screen designed around one clear decision", "Brand story and content with a strong hierarchy", "A call to action shaped for the business", "Comfortable reading on a phone"]
};
const editorial = [
  ['Restauration','Une cuisine généreuse, une table ouverte.','Good food. Better company.',['Carte filtrable','Photographie culinaire','Parcours de réservation'],['Filterable menu','Food photography','Booking journey']],
  ['Immobilier','La bonne adresse. Votre prochaine histoire.','The right address. Your next chapter.',['Recherche par type de bien','Sélection de logements','Demande de visite'],['Property type filter','Property selection','Viewing enquiry']],
  ['Santé','Être écouté. Être accompagné.','Be heard. Be cared for.',['Orientation par soin','Préparation de la visite','Parcours de rendez-vous'],['Care navigation','Visit preparation','Appointment journey']],
  ['Éducation','Le monde commence par une question.','The world starts with a question.',['Cycles scolaires','Vie à l’école','Questions sur les admissions'],['Learning stages','School life','Admissions questions']],
  ['Droit','Vos enjeux. Une voie claire.','Your priorities. A clear way forward.',['Expertises détaillées','Méthode de conseil','Premier échange'],['Expandable expertise','Advisory approach','Initial enquiry']],
  ['Construction','Des idées aux ouvrages.','From plans to places.',['Domaines d’intervention','Projet illustratif','Étapes de construction'],['Construction capabilities','Illustrative project','Construction stages']],
  ['Hôtellerie','Le plaisir de ralentir.','The pleasure of slowing down.',['Chambres en images','Découverte du séjour','Choix de chambre'],['Room photography','Stay preview','Room selection']],
  ['Mobilier & objets','Vivre avec les belles choses.','Live with beautiful things.',['Catalogue filtrable','Sélection de produits','Matières et intérieurs'],['Filterable collection','Product shortlist','Materials and interiors']]
];
const projects = specs.map(([slug, industry, title, frTitle, enTitle, color, strap, sector, ...facts], i) => ({
  slug, status: "concept", isConcept: true, demoUrl: `demos/${slug}/`, demoUrls: { fr: `demos/${slug}/`, en: `demos/${slug}/en/` },
  color, domain: `${slug}.concept`, stack: ["HTML", "CSS", "JavaScript", "Responsive design"],
  timeline: { fr: "Étude statique", en: "Static study" }, price: { fr: "sur devis", en: "on quote" }, monthly: { fr: "à définir", en: "to be defined" },
  fr: { title, sector: `${sector} · concept`, tagline: frTitle, problem: [`${title} est une étude de conception créée pour explorer une présence digitale dans le secteur ${industry.toLowerCase()}. Il ne représente pas une entreprise cliente ni des résultats commerciaux.`, "Le travail cherche un équilibre entre identité, information utile et un parcours d’entrée simple pour la personne qui visite le site."], built: features.fr, congo: ["Une hiérarchie lisible sur téléphone", "Des contenus et une navigation adaptables au français et à l’anglais", "Des parcours de contact ou de réservation définis selon l’activité"], deploy: ["Prototype statique consultable dans le portfolio", "Contenus, formulaires et intégrations à définir avec l’entreprise réelle"], monitor: ["Aucune donnée réelle ni intégration de production dans cette étude"] },
  en: { title, sector: `${sector} · concept`, tagline: enTitle, problem: [`${title} is an original design study exploring a digital presence for the ${industry.toLowerCase()} sector. It does not represent a client business or commercial results.`, "The work balances identity, useful information and a simple first step for a visitor."], built: features.en, congo: ["A hierarchy that remains clear on a phone", "Content and navigation that can adapt to French and English", "Contact or booking journeys shaped for the business"], deploy: ["A static prototype available in this portfolio", "Content, forms and integrations to be defined with the real business"], monitor: ["No real data or live production integration in this study"] }
}));
projects.forEach((p,i)=>{const [sector,fr,en,frFeatures,enFeatures]=editorial[i];p.fr.sector=sector;p.en.sector=specs[i][7];p.fr.tagline=fr;p.en.tagline=en;p.fr.built=frFeatures.concat('Photographies réelles, interface responsive et version anglaise');p.en.built=enFeatures.concat('Real photography, responsive layout and French version');p.fr.problem[0]=`${p.fr.title} est une étude de conception originale dans le secteur ${sector.toLowerCase()}. Elle ne représente pas une entreprise cliente ni des résultats commerciaux.`;p.fr.deploy=['Site statique bilingue consultable dans le portfolio','Formulaire de prévisualisation local : aucun envoi ni réservation réelle'];p.en.deploy=['Bilingual static website available in the portfolio','Local request preview: no message sent or real booking made'];});
// A separately hosted, English-language concept. Keep it distinct from commissioned client work.
const fieldstoneUrl = "https://fieldstone-construction.raelpanga.chatgpt.site/";
projects.unshift({
  slug: "fieldstone-construction", status: "concept", isConcept: true, externalConcept: true,
  demoUrl: fieldstoneUrl, demoUrls: { fr: fieldstoneUrl, en: fieldstoneUrl },
  color: "#e8813c", domain: "fieldstone-construction.raelpanga.chatgpt.site",
  stack: ["HTML", "CSS", "JavaScript", "Responsive design", "Video"],
  timeline: { fr: "Concept indépendant", en: "Independent concept" },
  price: { fr: "sur devis", en: "on quote" }, monthly: { fr: "à définir", en: "to be defined" },
  note: { fr: "Le site concept est en anglais.", en: "Portfolio concept for a fictional construction brand." },
  transparencyNote: {
    fr: "Projet de portfolio indépendant pour une marque fictive. Les photographies et la vidéo sont des visuels d’illustration ; elles ne montrent pas des chantiers clients.",
    en: "Independent portfolio project for a fictional brand. Photography and video are illustrative stock media, not client construction work."
  },
  exploreNote: {
    fr: "Le site public montre l’accueil vidéo, deux parcours de services distincts, les inspirations de projets et un formulaire de planification de démonstration. Aucun devis réel n’est envoyé.",
    en: "Explore the video-led homepage, separate service journeys, project inspiration and a sample project planner. No real quote is sent."
  },
  fr: {
    title: "Fieldstone Construction", sector: "Construction résidentielle · concept", tagline: "Deux spécialités, visibles dès le premier regard.",
    problem: [
      "Fieldstone Construction est une marque fictive créée pour ce portfolio. Le défi était de montrer immédiatement que l’entreprise propose à la fois la rénovation de maisons et la construction rurale.",
      "Chaque visiteur doit pouvoir reconnaître son type de projet et trouver un point de départ clair."
    ],
    built: ["Identité visuelle et direction éditoriale pour la marque concept", "Accueil avec vidéo en arrière-plan, titre centré et appels à l’action", "Pages distinctes pour la rénovation de maisons et la construction rurale", "Galerie d’inspiration, interface mobile et animations au défilement"],
    congo: ["Deux parcours de services visibles depuis l’accueil et la navigation", "Texte contrasté sur la vidéo et commande de lecture accessible", "Animations adaptées aux préférences de mouvement réduit"],
    deploy: ["Prototype public en anglais, consultable sur ordinateur et téléphone", "Contenus et visuels définitifs à remplacer pour une entreprise réelle"],
    monitor: ["Aucun chantier ni résultat commercial réel n’est revendiqué"]
  },
  en: {
    title: "Fieldstone Construction", sector: "Residential construction · concept", tagline: "Two specialties made clear from the first screen.",
    problem: [
      "Fieldstone Construction is a fictional brand created for this portfolio. The design challenge was to make home remodeling and rural construction equally clear from the moment a visitor arrives.",
      "Visitors should recognize their kind of project quickly and have an obvious next step."
    ],
    built: ["Visual identity and editorial direction for the concept brand", "Video-led homepage with centered headline and calls to action", "Separate pages for home remodeling and rural construction", "Project inspiration gallery, mobile layout and scroll motion"],
    congo: ["Both service paths visible on the homepage and in navigation", "Readable text over video with an accessible playback control", "Motion adjusted for reduced-motion preferences"],
    deploy: ["Public English-language concept viewable on desktop and mobile", "Final business content and imagery would be needed for a real company"],
    monitor: ["No real construction projects or commercial results are claimed"]
  }
});
const projectServices = Object.fromEntries(projects.map(p => [p.slug, ["websites"]]));
const projectCopy = Object.fromEntries(projects.slice(1).map((p, i) => [p.slug, { title: p.fr.title, fr: p.fr.tagline, en: p.en.tagline, type: [p.fr.sector, p.en.sector], facts: editorial[i][3], factsEn: editorial[i][4], tint: ["#f4e6df", "#dfe9e3", "#dceff0", "#f8edcb", "#ede5dd", "#dce7f3", "#dceceb", "#f5e1dc"][i] }]));
projectCopy["fieldstone-construction"] = {
  title: "Fieldstone Construction", fr: "Deux spécialités, visibles dès le premier regard.", en: "Two specialties made clear from the first screen.",
  type: ["Site web · construction", "Website · construction"],
  facts: ["Vidéo", "Deux spécialités", "Mobile"], factsEn: ["Video", "Two specialties", "Mobile"], tint: "#f1e1d5"
};
const demos = specs.map(([slug, industry, title, frTitle, enTitle, color, strap], i) => ({ slug, industry, title, frTitle, enTitle, color, strap, mode: ["restaurant", "estate", "clinic", "school", "law", "build", "hotel", "retail"][i] }));
module.exports = { projects, projectServices, projectCopy, demos };

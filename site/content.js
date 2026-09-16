"use strict";
// Stable page keys pair equivalent French and English destinations.
const routes = {
  payments: { fr: "services/paiements-mobile-money.html", en: "en/services/mobile-money-payments.html" },
  whatsapp: { fr: "services/automatisation-whatsapp.html", en: "en/services/whatsapp-automation.html" },
  home: { fr: "index.html", en: "en/index.html" },
  services: { fr: "services/index.html", en: "en/services/index.html" },
  work: { fr: "projets/index.html", en: "en/projects/index.html" },
  process: { fr: "methode.html", en: "en/process.html" },
  about: { fr: "a-propos.html", en: "en/about.html" },
  contact: { fr: "contact.html", en: "en/contact.html" },
  legal: { fr: "mentions-legales.html", en: "en/legal.html" },
  privacy: { fr: "confidentialite.html", en: "en/privacy.html" },
  guide: { fr: "guides/construire-pour-la-rdc.html", en: "en/guides/building-for-the-drc.html" },
  websites: { fr: "services/sites-web.html", en: "en/services/websites.html" },
  commerce: { fr: "services/commerce-reservations.html", en: "en/services/commerce-bookings.html" },
  applications: { fr: "services/applications-metier.html", en: "en/services/business-applications.html" },
  hosting: { fr: "services/hebergement-maintenance.html", en: "en/services/hosting-maintenance.html" }
};
const services = [
  {
    key: "websites",
    examples: ["ets-financial", "kando-ressources", "site-corporate", "kimia-express"],
    fr: {
      title: "Sites web", brief: "Présentez votre entreprise avec un site clair, soigné et facile à consulter sur téléphone.",
      audience: "Pour les entreprises de services, les PME et les organisations qui veulent expliquer leur activité et recevoir des demandes qualifiées.",
      includes: ["Architecture des pages et rédaction à partir de vos informations", "Identité visuelle adaptée et pages en français et en anglais", "Présentation des services, références et moyens de contact", "Version mobile, métadonnées et mise en ligne"],
      needs: ["Votre logo, vos coordonnées et vos informations d'entreprise", "Les services à présenter et les photos dont vous avez les droits", "Une personne disponible pour valider les contenus"],
      faq: [["Combien de pages sont comprises ?", "L'offre indicative couvre cinq à huit pages de contenu, avec leur traduction. Une structure plus étendue fait l'objet d'un devis."], ["Pourrai-je mettre le site à jour ?", "Nous définissons au cadrage si les modifications passent par notre maintenance ou par un outil d'édition. Ce choix est indiqué dans le devis."]]
    },
    en: {
      title: "Websites", brief: "Present your business through a clear, considered website that works well on a phone.",
      audience: "For service companies, small businesses and organizations that need to explain their work and receive relevant inquiries.",
      includes: ["Page structure and copy developed from your information", "A tailored visual identity and French and English pages", "Services, references and clear contact options", "Mobile layouts, metadata and launch"],
      needs: ["Your logo, contact details and business information", "Services to present and photographs you have permission to use", "A contact who can review and approve the content"],
      faq: [["How many pages are included?", "The indicative package covers five to eight content pages and their translations. A larger structure is quoted separately."], ["Can I update the website?", "During scoping, we decide whether updates are handled through maintenance or an editing tool. Your quote records that choice."]]
    }
  },
  {
    key: "commerce",
    examples: ["genos-rentals", "ndala-beauty", "kimia-express"],
    fr: {
      title: "E-commerce & réservations", brief: "Transformez votre catalogue en un parcours de commande ou de réservation, du choix à la confirmation.",
      audience: "Pour les commerces, les services de livraison et les entreprises qui prennent aujourd'hui leurs commandes par téléphone ou WhatsApp.",
      includes: ["Catalogue, disponibilité et parcours de commande ou de réservation", "Gestion des demandes et confirmations", "Choix du prestataire de paiement et intégration selon son accès disponible", "Tests des parcours, formation et mise en ligne"],
      needs: ["Votre catalogue, vos prix et vos règles de réservation", "Vos conditions de livraison, d'annulation et de remboursement", "Un compte marchand validé si vous souhaitez encaisser en ligne"],
      faq: [["Les paiements des démonstrations sont-ils réels ?", "Non. Les démonstrateurs utilisent des paiements simulés. L'encaissement réel exige une intégration et un compte marchand propres à votre entreprise."], ["Les frais de paiement sont-ils inclus ?", "Les commissions du prestataire, les SMS et les autres frais variables sont distingués du prix de construction dans le devis."]]
    },
    en: {
      title: "E-commerce & bookings", brief: "Turn your catalogue into an ordering or booking journey, from selection to confirmation.",
      audience: "For retailers, delivery services and companies currently taking orders by phone or WhatsApp.",
      includes: ["Catalogue, availability and ordering or booking journeys", "Request management and confirmations", "Payment-provider selection and integration subject to available access", "Journey testing, training and launch"],
      needs: ["Your catalogue, prices and booking rules", "Delivery, cancellation and refund terms", "An approved merchant account if you want to collect payments online"],
      faq: [["Are demo payments real?", "No. Demonstrators use simulated payments. Real collection requires an integration and a merchant account for your business."], ["Are payment fees included?", "Provider commissions, SMS and other usage-based fees are itemized separately from the build price."]]
    }
  },
  {
    key: "applications",
    examples: ["macclay-wedding-tracker", "commande-distributeur", "portail-sous-traitant"],
    fr: {
      title: "Applications métier", brief: "Réunissez les dossiers, les tâches et les décisions de votre équipe dans un outil adapté à son travail.",
      audience: "Pour les distributeurs, les équipes de terrain et les entreprises dont les opérations reposent sur plusieurs fichiers et ressaisies.",
      includes: ["Analyse d'un parcours métier et définition d'une première version utile", "Écrans par rôle, dossiers partagés et suivi des actions", "Exports et intégrations définis avec vos outils existants", "Parcours hors ligne si nécessaire, tests et formation"],
      needs: ["Des exemples anonymisés de vos formulaires et fichiers", "Vos rôles, règles de validation et priorités", "Des utilisateurs disponibles pour tester les versions intermédiaires"],
      faq: [["Faut-il tout construire dès le départ ?", "Nous commençons par un périmètre précis. Les autres parcours sont planifiés après les premiers retours des utilisateurs."], ["L'application peut-elle fonctionner hors ligne ?", "Certains parcours peuvent être conçus pour la saisie hors ligne. Les règles de synchronisation et de résolution des conflits sont définies au cadrage."]]
    },
    en: {
      title: "Business applications", brief: "Bring your team's records, tasks and decisions into a tool designed around its work.",
      audience: "For distributors, field teams and businesses whose operations depend on multiple files and repeated data entry.",
      includes: ["Workflow analysis and definition of a useful first release", "Role-specific screens, shared records and action tracking", "Exports and integrations with your existing tools", "Offline journeys where needed, testing and training"],
      needs: ["Anonymized examples of your forms and files", "Roles, approval rules and priorities", "Users available to test intermediate versions"],
      faq: [["Must everything be built at once?", "We start with a defined scope. Further workflows are planned after feedback from the first users."], ["Can the application work offline?", "Selected workflows can support offline entry. Synchronization and conflict-resolution rules are agreed during scoping."]]
    }
  },
  {
    key: "hosting", examples: [],
    fr: {
      title: "Hébergement & maintenance", brief: "Organisez la mise en ligne, les mises à jour et le suivi de votre site ou application existante.",
      audience: "Pour les entreprises qui ont déjà un système et souhaitent clarifier qui le maintient, où il fonctionne et comment réagir à un incident.",
      includes: ["Inventaire des accès, dépendances et besoins d'hébergement", "Plan de déploiement ou de migration avec procédure de retour arrière", "Périmètre de surveillance et de sauvegarde défini au contrat", "Corrections, mises à jour et compte rendu selon l'offre retenue"],
      needs: ["L'accès au code, au nom de domaine et à l'hébergement", "Vos contraintes de disponibilité et de localisation des données", "Les incidents connus et les responsabilités des prestataires actuels"],
      faq: [["Reprenez-vous un système construit ailleurs ?", "Oui, après un examen de son état, de ses accès et de sa documentation. Le devis précise les travaux préalables nécessaires."], ["Garantissez-vous une surveillance 24 h/24 ?", "Les horaires, les alertes et les engagements d'intervention sont convenus au contrat. Une démonstration publique ne constitue pas une preuve de service de surveillance."]]
    },
    en: {
      title: "Hosting & maintenance", brief: "Plan deployment, updates and ongoing care for your existing website or application.",
      audience: "For businesses that already have a system and need clear responsibility for maintenance, hosting and incident response.",
      includes: ["Review of access, dependencies and hosting requirements", "Deployment or migration plan with rollback steps", "Contract-defined monitoring and backup scope", "Fixes, updates and reporting under the chosen support plan"],
      needs: ["Access to the code, domain and hosting", "Availability and data-location requirements", "Known incidents and current suppliers' responsibilities"],
      faq: [["Can you take over a system built elsewhere?", "Yes, following a review of its condition, access and documentation. The quote identifies any preliminary work required."], ["Is monitoring available around the clock?", "Coverage hours, alerts and response commitments are agreed in the contract. A public demonstration is not evidence of an operating monitoring service."]]
    }
  }
];
const projectServices = {
  "genos-rentals": ["commerce", "applications"], "macclay-wedding-tracker": ["applications"],
  "ets-financial": ["websites"], "kando-ressources": ["websites"],
  "kimia-express": ["websites", "commerce"], "commande-distributeur": ["applications"],
  "portail-sous-traitant": ["applications"], "ndala-beauty": ["commerce"], "site-corporate": ["websites"]
};
const labels = {
  fr: { home: "Accueil", services: "Services", work: "Réalisations", process: "Notre méthode", about: "À propos", contact: "Contact", legal: "Mentions légales", privacy: "Confidentialité", discuss: "Parlons de votre projet", view: "Voir le projet", allWork: "Toutes les réalisations", allServices: "Tous les services", client: "Projet client", demo: "Démonstrateur", scope: "Ce que vous recevez", needs: "Ce que nous préparons ensemble", budget: "Budget & accompagnement", examples: "Des exemples à explorer", questions: "Questions fréquentes", build: "Construction / mise en place", monthly: "Accompagnement mensuel", related: "Services associés", menu: "Menu", close: "Fermer le menu" },
  en: { home: "Home", services: "Services", work: "Work", process: "Our process", about: "About", contact: "Contact", legal: "Legal notice", privacy: "Privacy", discuss: "Discuss your project", view: "View project", allWork: "All work", allServices: "All services", client: "Client project", demo: "Demonstrator", scope: "What you receive", needs: "What we prepare together", budget: "Budget & support", examples: "Examples to explore", questions: "Frequently asked questions", build: "Build / setup", monthly: "Monthly support", related: "Related services", menu: "Menu", close: "Close menu" }
};
services.push(...require("./integrations").services);
projectServices["commande-distributeur"].push("payments");
module.exports = { routes, services, projectServices, labels };

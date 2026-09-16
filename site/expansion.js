"use strict";
// Services added alongside the original six. Same shape as site/content.js: each entry needs a
// routes key, bilingual copy and, having no project examples yet, a `panel` shown in their place.
const services = [
  {
    key: "mobile", examples: [],
    fr: {
      title: "Applications mobiles", brief: "Mettez votre service dans la poche de vos clients ou de vos équipes, sur Android comme sur iPhone.",
      audience: "Pour les entreprises qui veulent une application installable : commande, suivi de terrain, fidélité, ou un outil interne utilisé hors du bureau.",
      includes: ["Choix entre application publiée sur les stores et application web installable (PWA)", "Écrans pensés pour un usage à une main, sur connexion lente", "Notifications, mode hors ligne et synchronisation selon le périmètre retenu", "Comptes développeur, tests sur appareils réels et publication", "Suivi des versions et corrections après publication"],
      needs: ["Les tâches prioritaires à couvrir dans la première version", "Vos comptes Google Play et Apple Developer, ou leur création", "Les modèles de téléphones et les versions réellement utilisés par vos utilisateurs"],
      panel: ["Installable, ou simplement partageable", "Une application web installable s’ouvre depuis un lien, se pose sur l’écran d’accueil et évite les délais de validation des stores. Une application publiée apporte les notifications et un accès plus large au téléphone. Nous comparons les deux au cadrage, avec leurs coûts."],
      faq: [["Faut-il obligatoirement publier sur les stores ?", "Non. Une application web installable couvre déjà beaucoup d’usages. La publication devient utile pour les notifications, l’usage hors ligne poussé ou l’accès continu à l’appareil photo et au GPS."], ["Quels frais restent à notre charge ?", "Les comptes développeur sont facturés par Google et par Apple, ce dernier chaque année. Ces frais vous sont facturés directement et figurent séparément dans le devis."]]
    },
    en: {
      title: "Mobile applications", brief: "Put your service in your customers’ or your team’s pocket, on Android and iPhone.",
      audience: "For businesses that want an installable app: ordering, field reporting, loyalty, or an internal tool used away from the office.",
      includes: ["A choice between store-published apps and installable web apps (PWA)", "Screens designed for one-handed use on a slow connection", "Notifications, offline mode and synchronization within the agreed scope", "Developer accounts, testing on real devices and publication", "Version tracking and fixes after release"],
      needs: ["The priority tasks for a first release", "Your Google Play and Apple Developer accounts, or their creation", "The phone models and versions your users actually carry"],
      panel: ["Installable, or simply shareable", "An installable web app opens from a link, sits on the home screen and avoids store review delays. A published app adds notifications and wider device access. We compare both during scoping, with their costs."],
      faq: [["Do we have to publish to the stores?", "No. An installable web app already covers many uses. Publishing becomes worthwhile for notifications, heavy offline use, or continuous camera and GPS access."], ["Which fees remain ours?", "Developer accounts are billed by Google and by Apple, the latter annually. Those fees are billed to you directly and appear separately in the quote."]]
    }
  },
  {
    key: "ai", examples: [],
    fr: {
      title: "IA & automatisation", brief: "Confiez les tâches répétitives à une automatisation surveillée : tri des demandes, lecture de documents, réponses assistées.",
      audience: "Pour les équipes qui recopient des données d’un fichier à l’autre, répondent chaque jour aux mêmes questions ou traitent des documents à la main.",
      includes: ["Repérage des tâches répétitives et estimation du temps réellement gagné", "Lecture de vos documents — factures, bons de livraison, formulaires — avec relecture humaine", "Assistant de réponse connecté à vos contenus, avec sources vérifiables", "Règles de contrôle : ce que l’automatisation décide, ce qu’une personne valide", "Suivi des coûts d’utilisation et mesure des résultats après mise en service"],
      needs: ["Des exemples réels de documents ou de demandes à traiter", "Vos règles métier et les cas où une décision humaine reste obligatoire", "Votre position sur l’envoi de données à un fournisseur d’IA"],
      panel: ["L’automatisation reste sous contrôle", "Chaque parcours indique ce qui a été décidé automatiquement, à partir de quelle source, et qui peut l’annuler. Les décisions sensibles passent par une validation humaine. Nous mesurons le résultat sur vos propres dossiers avant d’élargir le périmètre."],
      faq: [["L’IA peut-elle se tromper ?", "Oui. Nous concevons ces parcours avec une relecture humaine sur les décisions importantes, un historique des traitements et la possibilité de revenir en arrière."], ["Où vont nos données ?", "Cela dépend du fournisseur retenu et de son offre. Nous listons les données envoyées, le lieu de traitement et les durées de conservation avant de démarrer."]]
    },
    en: {
      title: "AI & automation", brief: "Hand repetitive work to supervised automation: sorting requests, reading documents, assisted replies.",
      audience: "For teams copying data between files, answering the same questions every day or processing documents by hand.",
      includes: ["Identifying repetitive tasks and estimating the time actually saved", "Reading your documents — invoices, delivery notes, forms — with human review", "A reply assistant connected to your content, with checkable sources", "Control rules: what automation decides, what a person approves", "Usage-cost tracking and measurement of results after go-live"],
      needs: ["Real examples of the documents or requests to process", "Your business rules and the cases that must stay with a human", "Your position on sending data to an AI provider"],
      panel: ["Automation stays under control", "Every journey records what was decided automatically, from which source, and who can reverse it. Sensitive decisions require human approval. We measure results on your own records before widening the scope."],
      faq: [["Can AI get it wrong?", "Yes. We design these journeys with human review on important decisions, a processing history and the ability to roll back."], ["Where does our data go?", "It depends on the provider and plan chosen. We list the data sent, where it is processed and how long it is kept before starting."]]
    }
  },
  {
    key: "audit", examples: [],
    fr: {
      title: "Audit & conseil", brief: "Faites examiner un site, une application ou un projet avant d’investir : état réel, risques, priorités et budget.",
      audience: "Pour les dirigeants qui héritent d’un système, hésitent entre réparer et reconstruire, ou veulent un avis indépendant avant de signer un devis.",
      includes: ["Examen du site ou de l’application : vitesse, usage mobile, accessibilité, référencement, sécurité de base", "Revue du code, des accès, des sauvegardes et des dépendances", "Points de conformité à examiner : Code du numérique, données personnelles, mentions obligatoires", "Rapport classé par priorité, avec estimation d’effort et de budget", "Restitution avec vos équipes et plan d’action à trois, six et douze mois"],
      needs: ["Un accès en lecture au site, au code ou à l’hébergement", "L’historique des incidents et des interventions connues", "Vos objectifs pour les douze prochains mois"],
      panel: ["Un rapport qui vous appartient", "Vous recevez un document classé par priorité : ce qui est urgent, ce qui peut attendre, ce que votre équipe peut corriger sans nous. Il reste utilisable avec n’importe quel prestataire, y compris celui qui a construit le système."],
      faq: [["Faut-il ensuite travailler avec vous ?", "Non. Le rapport vous appartient et reste utilisable avec n’importe quel prestataire. Nous indiquons ce qui peut être corrigé en interne."], ["Combien de temps prend un audit ?", "De quelques jours pour un site vitrine à deux semaines pour une application métier. Le délai et le périmètre sont fixés avant de commencer."]]
    },
    en: {
      title: "Audit & advice", brief: "Have a website, application or project examined before you invest: real condition, risks, priorities and budget.",
      audience: "For owners inheriting a system, choosing between repair and rebuild, or seeking an independent view before signing a quote.",
      includes: ["Review of the site or application: speed, mobile use, accessibility, search visibility, basic security", "Review of code, access, backups and dependencies", "Compliance points to examine: Digital Code, personal data, required notices", "A priority-ordered report with effort and budget estimates", "A debrief with your team and an action plan at three, six and twelve months"],
      needs: ["Read access to the site, code or hosting", "The history of known incidents and interventions", "Your objectives for the next twelve months"],
      panel: ["A report that belongs to you", "You receive a priority-ordered document: what is urgent, what can wait, what your own team can fix without us. It stays usable with any supplier, including the one who built the system."],
      faq: [["Do we then have to work with you?", "No. The report is yours and remains usable with any supplier. We indicate what can be fixed in-house."], ["How long does an audit take?", "From a few days for a brochure site to two weeks for a business application. Timing and scope are agreed before we start."]]
    }
  },
  {
    key: "modernisation", examples: [],
    fr: {
      title: "Modernisation & intégrations", brief: "Faites communiquer vos outils existants et remplacez par étapes ce qui vous freine, sans arrêter votre activité.",
      audience: "Pour les entreprises qui vivent avec un logiciel ancien, des fichiers partagés qui se dupliquent ou des outils qui ne se parlent pas.",
      includes: ["Inventaire des systèmes, des données et des échanges actuels", "Connexions entre vos outils — comptabilité, stock, boutique, paiement — selon les accès disponibles", "Reprise et nettoyage des données existantes, avec vérification par vos équipes", "Remplacement progressif : un parcours à la fois, avec retour arrière possible", "Documentation et formation pour que vos équipes suivent le changement"],
      needs: ["Les accès et la documentation des systèmes actuels", "Un export de vos données existantes", "Les personnes qui connaissent les règles du système en place"],
      panel: ["Un parcours à la fois", "Nous commençons par l’échange qui coûte le plus cher en ressaisie, nous le remplaçons, puis nous passons au suivant. Votre activité continue pendant la migration et chaque étape peut revenir en arrière."],
      faq: [["Peut-on tout remplacer d’un coup ?", "C’est rarement le meilleur choix. Remplacer un parcours à la fois garde votre activité en marche et limite les risques."], ["Et si l’ancien système n’a pas d’API ?", "Nous étudions les autres voies : exports programmés, accès à la base de données, fichiers partagés. La faisabilité est vérifiée avant tout engagement."]]
    },
    en: {
      title: "Modernisation & integrations", brief: "Connect the tools you already use and replace what holds you back, step by step, without stopping your business.",
      audience: "For businesses living with ageing software, duplicated shared files or tools that do not talk to each other.",
      includes: ["An inventory of current systems, data and exchanges", "Connections between your tools — accounting, stock, storefront, payments — subject to available access", "Migration and cleaning of existing data, verified by your team", "Progressive replacement: one workflow at a time, with rollback", "Documentation and training so your team can follow the change"],
      needs: ["Access and documentation for the current systems", "An export of your existing data", "The people who know the rules of the system in place"],
      panel: ["One workflow at a time", "We start with the exchange that costs the most in re-keying, replace it, then move to the next. Your business keeps running during the migration and each step can be rolled back."],
      faq: [["Can everything be replaced at once?", "That is rarely the best choice. Replacing one workflow at a time keeps your business running and limits risk."], ["What if the old system has no API?", "We examine the alternatives: scheduled exports, database access, shared files. Feasibility is verified before any commitment."]]
    }
  },
  {
    key: "team", examples: [],
    fr: {
      title: "Renfort d’équipe", brief: "Ajoutez une capacité de développement à votre équipe, au mois, avec un interlocuteur unique en français et en anglais.",
      audience: "Pour les agences, éditeurs et directions informatiques qui ont plus de travail que de mains disponibles, en RDC comme aux États-Unis.",
      includes: ["Intégration à vos outils et à vos rituels : suivi des tâches, revues de code, point hebdomadaire", "Développement front-end, back-end ou reprise de correctifs selon vos priorités", "Code livré dans votre dépôt, avec compte rendu hebdomadaire", "Engagement mensuel, avec préavis convenu au contrat", "Transfert de connaissances et documentation à la fin de la mission"],
      needs: ["Un référent technique chez vous pour les arbitrages", "L’accès à votre dépôt, à vos environnements et à vos standards", "Une file de tâches priorisée"],
      panel: ["Une capacité, pas une boîte noire", "Vous gardez la priorisation et la propriété du code. Nous travaillons dans votre dépôt, avec vos standards et vos revues. Le compte rendu hebdomadaire indique ce qui a avancé, ce qui bloque et ce qui est prévu."],
      faq: [["Comment gérez-vous le décalage horaire ?", "Le studio travaille depuis le Kentucky et échange en français comme en anglais. Les plages de disponibilité commune sont fixées avant le démarrage."], ["Qui est propriétaire du code ?", "Vous. Le code est livré dans votre dépôt, sous votre licence, avec la documentation nécessaire pour continuer sans nous."]]
    },
    en: {
      title: "Team augmentation", brief: "Add development capacity to your team, by the month, with one point of contact in French and English.",
      audience: "For agencies, software companies and IT departments with more work than available hands, in the DRC and in the United States.",
      includes: ["Working inside your tools and rituals: issue tracking, code review, weekly check-in", "Front-end, back-end or maintenance work according to your priorities", "Code delivered in your repository, with a weekly written update", "Monthly engagement, with notice agreed in the contract", "Knowledge transfer and documentation at the end of the engagement"],
      needs: ["A technical contact on your side for decisions", "Access to your repository, environments and standards", "A prioritized backlog"],
      panel: ["Capacity, not a black box", "You keep prioritization and ownership of the code. We work in your repository, with your standards and reviews. The weekly update states what moved, what is blocked and what comes next."],
      faq: [["How do you handle time zones?", "The studio works from Kentucky and operates in French and English. Shared availability windows are agreed before we start."], ["Who owns the code?", "You do. Code is delivered in your repository, under your licence, with the documentation needed to continue without us."]]
    }
  }
];
// Short promise shown on the compact cards in the services grid.
const cardCopy = {
  fr: { mobile: "Votre service, dans leur poche.", ai: "Moins de ressaisie, plus de suivi.", audit: "Savoir avant d’investir.", modernisation: "Vos outils, enfin reliés.", team: "Une capacité de plus, au mois." },
  en: { mobile: "Your service, in their pocket.", ai: "Less re-keying, better tracking.", audit: "Know before you invest.", modernisation: "Your tools, finally connected.", team: "Extra capacity, by the month." }
};
module.exports = { services, cardCopy };

/* IK Digital Solutions — all site content.
   Edit this file to change text, add a real client, or set demo URLs.
   Rule of the house: no figure appears here that a prospect cannot verify. */

window.KDS = {

  config: {
    company: "IK Digital Solutions",
    brand: "IK",
    brandSub: "Digital Solutions",
    founder: "Israel Kapanga",
    // WhatsApp number in international format without "+".
    whatsapp: "18593825280",
    email: "consultation@iksolutions-inc.com",
    location: { fr: "Kentucky, États-Unis", en: "Kentucky, United States" }
  },

  i18n: {
    fr: {
      code: "FR",
      docTitle: "IK Digital Solutions",
      nav: { services: "Services", projets: "Réalisations", methode: "Méthode", conformite: "Conformité", tarifs: "Tarifs", contact: "Contact" },
      whatsapp: "Écrire sur WhatsApp",
      waMessage: "Bonjour IK Digital Solutions, je souhaite discuter d'un projet de site ou d'application.",
      hero: {
        eyebrow: "Studio de développement · Kentucky, États-Unis · clients en RDC",
        title: "Nous concevons, déployons et supervisons vos applications. En RDC, sur des serveurs en RDC.",
        lead: "Sites web, applications métier et paiement mobile money pour les entreprises, écoles, distributeurs et sous-traitants qui doivent fonctionner avec une connexion 3G, des coupures d'électricité et des factures en dollars.",
        cta1: "Voir les démonstrateurs",
        cta2: "Écrire sur WhatsApp"
      },
      live: {
        title: "Mesuré sur votre appareil, à l'instant",
        load: "Chargement de cette page",
        weight: "Données transférées",
        msUnit: "ms",
        kbUnit: "Ko",
        pending: "…",
        note: "Ces deux chiffres sont lus par votre navigateur au moment où vous ouvrez la page. Ce sont les seuls chiffres de ce site, et vous pouvez les vérifier.",
        statusTitle: "État des services",
        thisSite: "Ce site",
        viewing: "vous le consultez maintenant",
        online: "En ligne",
        preparing: "En préparation"
      },
      deadline: {
        date: "9 avril 2027",
        text: "Fin des paiements en espèces en devises étrangères, décidée par la Banque Centrale du Congo. Vos clients qui paient en dollars devront passer par virement, carte ou portefeuille mobile. Nous intégrons M-Pesa, Airtel Money et Orange Money dans vos sites et applications avant cette date."
      },
      proofs: {
        eyebrow: "Ce que vous pouvez vérifier",
        title: "Pas de chiffres inventés. Des preuves que vous pouvez tester.",
        lead: "Beaucoup de portfolios affichent des milliers d'utilisateurs et des millions de dollars d'impact. Nous préférons montrer ce qui se vérifie en deux clics.",
        items: [
          { t: "Des démonstrateurs cliquables", d: "Chaque projet ci-dessous est un logiciel réel que vous pouvez ouvrir avec un compte de test. Pas seulement des captures d'écran." },
          { t: "L'état de nos services, affiché ici", d: "Chaque démonstrateur est marqué en ligne ou en préparation sur cette page, et le lien s'ouvre devant vous. Pour les systèmes que nous exploitons, une page d'état publique fait partie du contrat." },
          { t: "Un pipeline de déploiement documenté", d: "Comment nous mettons en ligne sans interruption, comment nous revenons en arrière, où vont les sauvegardes. C'est écrit plus bas, pas dans une annexe." },
          { t: "Un statut honnête sur chaque projet", d: "Chaque fiche indique « Démonstrateur » ou « Client ». Un démonstrateur ne cite aucun client réel et n'affiche aucun résultat commercial." }
        ]
      },
      services: {
        eyebrow: "Services",
        title: "De la première maquette à la supervision, une seule équipe.",
        lead: "Nous ne livrons pas un site puis disparaissons. Nous le faisons tourner.",
        items: [
          { t: "Conception", d: "Ateliers avec vos équipes, écrans testés sur un téléphone Android d'entrée de gamme, en français et, si besoin, en lingala ou swahili.", list: ["Cahier des charges en langage clair", "Maquettes cliquables", "Parcours hors ligne prévus dès le départ"] },
          { t: "Création", d: "Sites vitrines, boutiques, portails et applications mobiles. Pages légères pour la 3G, paiement mobile money intégré.", list: ["Sites et applications web", "Applications Android hors ligne", "M-Pesa, Airtel Money, Orange Money"] },
          { t: "Déploiement cloud", d: "Mise en production sans interruption, données hébergées en RDC, sauvegardes chiffrées et testées.", list: ["Hébergement à Kinshasa", "Cloudflare devant chaque site", "Retour arrière en une commande"] },
          { t: "Supervision", d: "Surveillance 24h/24, alertes à notre équipe, corrections comprises dans l'abonnement, rapport mensuel.", list: ["Sonde toutes les 60 secondes", "Alerte WhatsApp et SMS", "Rapport mensuel de disponibilité"] }
        ]
      },
      projects: {
        eyebrow: "Réalisations",
        title: "Trois projets clients en production, six démonstrateurs.",
        lead: "Chaque fiche suit le même plan : le problème, ce que nous avons construit, comment cela tient en RDC, comment c'est déployé, comment c'est supervisé, ce que cela coûte. Le badge vert signale un client réel, le badge cuivre un démonstrateur.",
        badgeDemo: "Démonstrateur",
        badgeClient: "Client",
        open: "Voir la fiche",
        demoOn: "Démo en ligne",
        demoOff: "Démo en préparation",
        siteOn: "En production",
        privateApp: "Application privée"
      },
      method: {
        eyebrow: "Méthode",
        title: "Comment nous déployons",
        lead: "Cinq étapes, toujours dans cet ordre. Vous voyez une version qui fonctionne toutes les deux semaines.",
        steps: [
          { t: "Cadrage", when: "1 semaine", d: "Atelier avec vous. Nous écrivons ce que le système doit faire, en français, avec des écrans dessinés ensemble." },
          { t: "Conception", when: "1 à 2 semaines", d: "Maquettes cliquables, testées sur un téléphone Android à moins de 100 USD et sur une connexion 3G bridée." },
          { t: "Construction", when: "cycles de 2 semaines", d: "Vous testez chaque version sur un lien de recette. Ce que vous validez part en production, le reste est corrigé." },
          { t: "Déploiement", when: "1 jour", d: "Mise en production sans interruption. Données en RDC, sauvegarde immédiate, procédure de retour arrière prête." },
          { t: "Supervision", when: "en continu", d: "Sondes, alertes, corrections et rapport mensuel. C'est l'abonnement, et c'est ce qui vous évite de nous rappeler en urgence." }
        ],
        diagramCaption: "Où vont les données : l'utilisateur passe par Cloudflare, l'application et sa base de données tournent à Kinshasa, seules des copies de sauvegarde chiffrées sortent du pays, et la supervision sonde l'application toutes les 60 secondes.",
        diagramAria: "Schéma de déploiement : utilisateur, Cloudflare, serveurs et base de données hébergés à Kinshasa, sauvegardes chiffrées vers AWS Cape Town, supervision et alertes.",
        d: {
          user: "Utilisateur", userSub: "Android · 3G ou Starlink",
          cf: "Cloudflare", cfSub: "cache · pare-feu · HTTPS",
          zone: "Hébergé en RDC — Kinshasa (centre de données Tier III)",
          app: "Serveurs applicatifs", appSub: "conteneurs Docker",
          db: "Base de données", dbSub: "PostgreSQL",
          aws: "AWS Cape Town", awsSub: "copies chiffrées uniquement",
          mon: "Supervision", monSub: "Uptime Kuma · Grafana",
          team: "Équipe IK", teamSub: "WhatsApp · SMS",
          aHttps: "HTTPS", aReq: "requêtes", aRw: "lecture / écriture", aBackup: "sauvegarde chiffrée, chaque nuit", aProbe: "sonde toutes les 60 s", aAlert: "alerte immédiate"
        }
      },
      compliance: {
        eyebrow: "Conformité & sécurité",
        title: "Le Code du numérique, écrit dans nos contrats.",
        lead: "Depuis 2023, la loi congolaise encadre l'hébergement et le traitement des données. Nous en faisons un livrable, pas une note de bas de page.",
        items: [
          { t: "Données hébergées en RDC", d: "Ordonnance-loi 23/010 portant Code du numérique. Vos données de production restent à Kinshasa ; seules des copies chiffrées de sauvegarde sont répliquées hors du pays." },
          { t: "Déclaration ARPTC préparée avec vous", d: "Le traitement de données personnelles doit être déclaré ou autorisé auprès du régulateur. Nous préparons le dossier avec vous." },
          { t: "HTTPS partout, mots de passe hachés, journaux d'accès", d: "Aucune exception, y compris sur les tableaux de bord internes." },
          { t: "Sauvegardes chiffrées chaque nuit, restauration testée chaque trimestre", d: "La date du dernier test de restauration figure dans le rapport mensuel remis au client." },
          { t: "Vous êtes propriétaire", d: "Du code source, des données, du nom de domaine et des comptes d'hébergement. Nous vous remettons les accès à la livraison." }
        ],
        asideTitle: "Notre engagement de transparence",
        aside: "Chaque projet affiché sur ce site indique s'il s'agit d'un démonstrateur construit par nos soins ou d'un client réel. Nous ne publions aucun chiffre d'usage, de revenu ou d'impact que vous ne pouvez pas vérifier vous-même. Si un jour un client accepte d'être cité, son nom et son témoignage apparaîtront ici, avec un contact."
      },
      pricing: {
        eyebrow: "Tarifs",
        title: "Des fourchettes en dollars, un abonnement qui inclut les corrections.",
        lead: "Le prix exact dépend du cadrage. Ces fourchettes vous disent si nous sommes dans votre budget avant le premier appel.",
        h: { pack: "Offre", what: "Contenu", price: "Prix (USD)", monthly: "Abonnement (USD / mois)" },
        rows: [
          { n: "Site Vitrine Pro", d: "5 à 8 pages bilingues, bouton WhatsApp, fiche Google, hébergement en RDC, supervision, sauvegardes.", p: "900 – 2 500", m: "40 – 80" },
          { n: "Site + Encaissement", d: "Site Vitrine Pro + commande ou réservation en ligne + paiement M-Pesa, Airtel Money, Orange Money.", p: "2 500 – 6 000", m: "80 – 150" },
          { n: "Application métier", d: "Application web ou mobile sur mesure (portail scolaire, commande distributeur, portail sous-traitant), mode hors ligne, tableau de bord.", p: "6 000 – 25 000", m: "150 – 500" },
          { n: "Exploitation & supervision", d: "Pour un système existant : migration de l'hébergement en RDC, supervision, astreinte, mise en conformité.", p: "1 000 – 3 000 (mise en place)", m: "200 – 800" }
        ],
        note: "Facturation par virement bancaire ou portefeuille mobile, en USD ou en CDF au taux du jour. L'abonnement couvre l'hébergement, la supervision, les sauvegardes et les corrections."
      },
      about: {
        eyebrow: "À propos",
        title: "Un studio basé dans le Kentucky, au service des entreprises de Kinshasa, Lubumbashi et de l'Est.",
        text: "IK Digital Solutions est un studio de développement fondé par Israel Kapanga, installé dans le Kentucky, aux États-Unis. Nous construisons des systèmes qui doivent tenir dans les conditions réelles du Congo : réseau instable, électricité coupée, clients sans adresse e-mail, paiements en dollars et en francs. Nous travaillons en français avec vos équipes, en anglais avec vos partenaires, et nous nous déplaçons pour le cadrage et la mise en service.",
        founderRole: "Fondateur · développement et exploitation"
      },
      contact: {
        eyebrow: "Contact",
        title: "Parlons de votre projet.",
        lead: "Le plus simple est WhatsApp. Sinon, laissez-nous trois lignes et nous vous rappelons.",
        emailLabel: "E-mail",
        cityLabel: "Bureau",
        form: { name: "Votre nom", company: "Entreprise ou organisation", need: "Votre besoin en quelques mots", needPh: "Ex. : site pour notre école avec paiement des frais par mobile money", send: "Envoyer par e-mail", hint: "Le bouton ouvre votre messagerie avec le message pré-rempli. Rien n'est envoyé sans votre accord." }
      },
      project: {
        back: "Toutes les réalisations",
        status: "Statut",
        sector: "Secteur",
        timeline: "Délai",
        price: "Prix indicatif",
        monthly: "Abonnement",
        stack: "Pile technique",
        openDemo: "Ouvrir la démo",
        askDemo: "Demander une démo guidée",
        demoHint: "La démo publique est en cours de déploiement. Une démo guidée sur WhatsApp est possible dès maintenant.",
        s1: "Client type et problème",
        s2: "Ce que nous avons construit",
        s3: "Comment cela tient en RDC",
        s4: "Déploiement",
        s5: "Supervision",
        s6: "Délai et prix",
        transparency: "Ce projet est un démonstrateur construit par IK Digital Solutions pour montrer notre méthode. Aucun client réel n'est cité et aucun résultat commercial n'est affiché. Les fonctionnalités décrites sont testables dans la démo.",
        openSite: "Ouvrir le site",
        liveLink: "Application en production (connexion)",
        transparencyClient: "Ce projet a été livré à un client réel. Le site est en ligne à l'adresse indiquée : ouvrez-le et vérifiez vous-même ce qui est décrit ici."
      },
      footer: {
        rights: "Tous droits réservés.",
        legal: "Mentions légales et données",
        made: "Ce site est notre premier démonstrateur : léger, bilingue, sans framework."
      }
    },

    en: {
      code: "EN",
      docTitle: "IK Digital Solutions",
      nav: { services: "Services", projets: "Work", methode: "Method", conformite: "Compliance", tarifs: "Pricing", contact: "Contact" },
      whatsapp: "Message on WhatsApp",
      waMessage: "Hello IK Digital Solutions, I would like to discuss a website or application project.",
      hero: {
        eyebrow: "Software studio · Kentucky, United States · clients in the DRC",
        title: "We design, deploy and keep your applications running. In the DRC, on servers in the DRC.",
        lead: "Websites, business applications and mobile money payments for companies, schools, distributors and contractors that must work on 3G, through power cuts, and with invoices in dollars.",
        cta1: "See the demonstrators",
        cta2: "Message on WhatsApp"
      },
      live: {
        title: "Measured on your device, right now",
        load: "This page loaded in",
        weight: "Data transferred",
        msUnit: "ms",
        kbUnit: "KB",
        pending: "…",
        note: "Your browser read these two numbers when you opened the page. They are the only numbers on this site, and you can check them.",
        statusTitle: "Service status",
        thisSite: "This site",
        viewing: "you are viewing it now",
        online: "Online",
        preparing: "In preparation"
      },
      deadline: {
        date: "9 April 2027",
        text: "End of cash payments in foreign currency, ruled by the Central Bank of Congo. Customers who pay in dollars will have to use bank transfer, card or a mobile wallet. We integrate M-Pesa, Airtel Money and Orange Money into your sites and applications before that date."
      },
      proofs: {
        eyebrow: "What you can verify",
        title: "No invented numbers. Proof you can test.",
        lead: "Many portfolios show thousands of users and millions of dollars of impact. We prefer to show what can be checked in two clicks.",
        items: [
          { t: "Clickable demonstrators", d: "Every project below is real software you can open with a test account. Not just screenshots." },
          { t: "Our service status, shown here", d: "Each demonstrator is marked online or in preparation on this page, and the link opens in front of you. For the systems we operate, a public status page is part of the contract." },
          { t: "A documented deployment pipeline", d: "How we go live without downtime, how we roll back, where backups go. It is written below, not in an appendix." },
          { t: "An honest status on every project", d: "Each project page says \"Demonstrator\" or \"Client\". A demonstrator names no real client and shows no commercial result." }
        ]
      },
      services: {
        eyebrow: "Services",
        title: "From first mockup to monitoring, one team.",
        lead: "We do not hand over a site and disappear. We run it.",
        items: [
          { t: "Design", d: "Workshops with your teams, screens tested on an entry-level Android phone, in French and, where needed, Lingala or Swahili.", list: ["Plain-language specification", "Clickable mockups", "Offline paths planned from day one"] },
          { t: "Build", d: "Brochure sites, shops, portals and mobile apps. Light pages for 3G, mobile money built in.", list: ["Websites and web apps", "Offline-first Android apps", "M-Pesa, Airtel Money, Orange Money"] },
          { t: "Cloud deployment", d: "Zero-downtime releases, data hosted in the DRC, encrypted and tested backups.", list: ["Hosting in Kinshasa", "Cloudflare in front of every site", "One-command rollback"] },
          { t: "Monitoring", d: "24/7 monitoring, alerts to our team, fixes included in the subscription, monthly report.", list: ["Probe every 60 seconds", "WhatsApp and SMS alerts", "Monthly availability report"] }
        ]
      },
      projects: {
        eyebrow: "Work",
        title: "Three client projects in production, six demonstrators.",
        lead: "Every page follows the same plan: the problem, what we built, how it holds up in the DRC, how it is deployed, how it is monitored, what it costs. The green badge marks a real client, the copper badge a demonstrator.",
        badgeDemo: "Demonstrator",
        badgeClient: "Client",
        open: "Open the page",
        demoOn: "Demo online",
        demoOff: "Demo in preparation",
        siteOn: "In production",
        privateApp: "Private app"
      },
      method: {
        eyebrow: "Method",
        title: "How we deploy",
        lead: "Five steps, always in this order. You see a working version every two weeks.",
        steps: [
          { t: "Scoping", when: "1 week", d: "A workshop with you. We write what the system must do, in plain language, with screens sketched together." },
          { t: "Design", when: "1 to 2 weeks", d: "Clickable mockups tested on an Android phone under 100 USD and on a throttled 3G connection." },
          { t: "Build", when: "2-week cycles", d: "You test each version on a staging link. What you approve goes to production, the rest is fixed." },
          { t: "Deployment", when: "1 day", d: "Zero-downtime release. Data in the DRC, immediate backup, rollback procedure ready." },
          { t: "Monitoring", when: "continuous", d: "Probes, alerts, fixes and a monthly report. That is the subscription, and it is what keeps you from calling us in an emergency." }
        ],
        diagramCaption: "Where the data goes: the user passes through Cloudflare, the application and its database run in Kinshasa, only encrypted backup copies leave the country, and monitoring probes the application every 60 seconds.",
        diagramAria: "Deployment diagram: user, Cloudflare, application servers and database hosted in Kinshasa, encrypted backups to AWS Cape Town, monitoring and alerts.",
        d: {
          user: "User", userSub: "Android · 3G or Starlink",
          cf: "Cloudflare", cfSub: "cache · firewall · HTTPS",
          zone: "Hosted in the DRC — Kinshasa (Tier III data center)",
          app: "Application servers", appSub: "Docker containers",
          db: "Database", dbSub: "PostgreSQL",
          aws: "AWS Cape Town", awsSub: "encrypted copies only",
          mon: "Monitoring", monSub: "Uptime Kuma · Grafana",
          team: "IK team", teamSub: "WhatsApp · SMS",
          aHttps: "HTTPS", aReq: "requests", aRw: "read / write", aBackup: "encrypted backup, nightly", aProbe: "probe every 60 s", aAlert: "immediate alert"
        }
      },
      compliance: {
        eyebrow: "Compliance & security",
        title: "The Digital Code, written into our contracts.",
        lead: "Since 2023, Congolese law governs data hosting and processing. We treat it as a deliverable, not a footnote.",
        items: [
          { t: "Data hosted in the DRC", d: "Ordinance-Law 23/010, the Digital Code. Your production data stays in Kinshasa; only encrypted backup copies are replicated outside the country." },
          { t: "ARPTC declaration prepared with you", d: "Personal-data processing must be declared to or authorised by the regulator. We prepare the file with you." },
          { t: "HTTPS everywhere, hashed passwords, access logs", d: "No exceptions, including internal dashboards." },
          { t: "Encrypted nightly backups, restore tested every quarter", d: "The date of the last restore test appears in the monthly report delivered to the client." },
          { t: "You own it", d: "The source code, the data, the domain name and the hosting accounts. We hand over every credential at delivery." }
        ],
        asideTitle: "Our transparency commitment",
        aside: "Every project on this site says whether it is a demonstrator we built ourselves or a real client. We publish no usage, revenue or impact figure that you cannot verify yourself. When a client agrees to be named, their name and testimonial will appear here, with a contact."
      },
      pricing: {
        eyebrow: "Pricing",
        title: "Ranges in dollars, a subscription that includes fixes.",
        lead: "The exact price depends on scoping. These ranges tell you whether we fit your budget before the first call.",
        h: { pack: "Package", what: "Included", price: "Price (USD)", monthly: "Subscription (USD / month)" },
        rows: [
          { n: "Site Vitrine Pro", d: "5 to 8 bilingual pages, WhatsApp button, Google Business listing, hosting in the DRC, monitoring, backups.", p: "900 – 2,500", m: "40 – 80" },
          { n: "Site + Payments", d: "Site Vitrine Pro + online ordering or booking + M-Pesa, Airtel Money, Orange Money payments.", p: "2,500 – 6,000", m: "80 – 150" },
          { n: "Business application", d: "Custom web or mobile app (school portal, distributor ordering, contractor portal), offline mode, dashboard.", p: "6,000 – 25,000", m: "150 – 500" },
          { n: "Operations & monitoring", d: "For an existing system: hosting migration to the DRC, monitoring, on-call, compliance.", p: "1,000 – 3,000 (setup)", m: "200 – 800" }
        ],
        note: "Invoiced by bank transfer or mobile wallet, in USD or CDF at the day's rate. The subscription covers hosting, monitoring, backups and fixes."
      },
      about: {
        eyebrow: "About",
        title: "A Kentucky-based studio, serving businesses in Kinshasa, Lubumbashi and the East.",
        text: "IK Digital Solutions is a software studio founded by Israel Kapanga, based in Kentucky, United States. We build systems that must hold up in Congo's real conditions: unstable network, power cuts, customers without e-mail, payments in dollars and francs. We work in French with your teams and in English with your partners, and we travel for scoping and go-live.",
        founderRole: "Founder · development and operations"
      },
      contact: {
        eyebrow: "Contact",
        title: "Let's talk about your project.",
        lead: "WhatsApp is the easiest. Otherwise, leave us three lines and we will call you back.",
        emailLabel: "E-mail",
        cityLabel: "Office",
        form: { name: "Your name", company: "Company or organisation", need: "Your need in a few words", needPh: "E.g. a website for our school with fee payment by mobile money", send: "Send by e-mail", hint: "The button opens your e-mail app with the message pre-filled. Nothing is sent without your consent." }
      },
      project: {
        back: "All work",
        status: "Status",
        sector: "Sector",
        timeline: "Timeline",
        price: "Indicative price",
        monthly: "Subscription",
        stack: "Tech stack",
        openDemo: "Open the demo",
        askDemo: "Ask for a guided demo",
        demoHint: "The public demo is being deployed. A guided demo over WhatsApp is available now.",
        s1: "Client type and problem",
        s2: "What we built",
        s3: "How it holds up in the DRC",
        s4: "Deployment",
        s5: "Monitoring",
        s6: "Timeline and price",
        transparency: "This project is a demonstrator built by IK Digital Solutions to show our method. No real client is named and no commercial result is shown. The features described can be tested in the demo.",
        openSite: "Open the site",
        liveLink: "Production app (login)",
        transparencyClient: "This project was delivered to a real client. The site is live at the address shown: open it and check for yourself what is described here."
      },
      footer: {
        rights: "All rights reserved.",
        legal: "Legal notice and data",
        made: "This site is our first demonstrator: light, bilingual, no framework."
      }
    }
  },

  /* Projects. status: "demo" | "client". demoUrl: null until the demo is live. shotExt: "png" (default) or "jpg". */
  projects: [
    {
      slug: "genos-rentals",
      status: "client",
      demoUrl: "demos/genos-rentals/",
      liveUrl: "https://style.macandclay.com/",
      color: "#1F2A44",
      domain: "style.macandclay.com",
      openLabel: { fr: "Ouvrir la démo", en: "Open the demo" },
      note: { fr: "La démo reproduit l'application de production avec des données fictives : inscrivez un mariage, approuvez-le, créez une commande à l'essayage et encaissez par carte (Stripe simulé). L'application réelle est réservée au personnel et aux clients du magasin.", en: "The demo reproduces the production app with mock data: register a wedding, approve it, create an order at the fitting and collect by card (simulated Stripe). The real app is reserved for the store's staff and customers." },
      s3Label: { fr: "Ce qui est transférable en RDC", en: "What carries over to the DRC" },
      stack: ["React 18", "TypeScript", "Vite", "Tailwind", "Express", "Supabase (PostgreSQL)", "Stripe", "Twilio", "SendGrid", "Sentry", "Vercel", "Railway", "GitHub Actions"],
      timeline: { fr: "en production depuis juillet 2026", en: "in production since July 2026" },
      price: { fr: "sur devis", en: "on quote" },
      monthly: { fr: "évolutions continues", en: "ongoing development" },
      fr: {
        title: "Geno's & MAC&CLAY · Locations et mariages",
        sector: "Location de tenues de cérémonie · Lexington, Kentucky (États-Unis)",
        tagline: "Application complète pour un magasin de location de smokings et costumes : inscription des mariages, tenues, commandes, paiements Stripe, SMS et tableau du jour.",
        problem: [
          "Geno's & MAC&CLAY loue et retouche des tenues de cérémonie, avec un entrepôt, des essayages en magasin et une forte activité de cortèges de mariage. Chaque commande était saisie dans trois logiciels : inscription des locations, caisse, gestion d'entrepôt. Triple saisie, erreurs de transcription, aucune source unique de vérité.",
          "Le propriétaire a abandonné une intégration Shopify en cours de route. Il fallait une application sur mesure qui devienne le système de référence, avec Stripe pour les paiements et une synchronisation à sens unique depuis l'ancien logiciel d'entrepôt."
        ],
        built: [
          "Parcours client : le marié inscrit son mariage, compose des tenues complètes (veste, pantalon, chemise, gilet, cravate, chaussures) et les attribue à chaque membre du cortège",
          "Espace administration : tableau du jour, commandes, comptes à encaisser, cortèges par onglets (actifs, cette semaine, en attente, archives), clients, clôture de caisse, rapports",
          "Commandes créées à l'essayage, pré-remplies depuis la tenue réservée ; menus de tailles, dates de retrait et de retour calculées automatiquement",
          "Paiements par carte via Stripe Checkout avec webhook idempotent, acomptes partiels, remises, taxe et garantie dommages",
          "SMS (Twilio) et e-mails (SendGrid), rappels planifiés, liens publics sécurisés pour les essayages et les commandes",
          "Synchronisation depuis l'ERP MySQL existant, journal d'audit, limitation de débit, validation des entrées (Zod), suivi des erreurs (Sentry)"
        ],
        congo: [
          "Même schéma qu'un portail scolaire ou une plateforme de distributeur : un seul point de saisie, des rôles, des paiements en ligne et des SMS",
          "Stripe ici, M-Pesa, Airtel Money et Orange Money chez vous : l'architecture de paiement par webhook est la même",
          "Liens publics sans compte pour les clients finaux, comme des parents ou des détaillants sans adresse e-mail",
          "Tests automatisés, intégration continue et environnement de préproduction : ce que nous mettons en place pour chaque application métier"
        ],
        deploy: [
          "Interface React sur Vercel, API Express sur Railway, base PostgreSQL et authentification Supabase",
          "Déploiement automatique à chaque publication sur la branche principale, environnement de préproduction séparé",
          "Secrets hébergés chez l'hébergeur, jamais dans le code",
          "Point de contrôle de santé de l'API, en-têtes de sécurité, limitation de débit"
        ],
        monitor: [
          "Suivi des erreurs de l'interface et de l'API avec Sentry",
          "Tests unitaires et d'intégration exécutés en intégration continue sur GitHub, analyse SonarCloud",
          "Tâches planifiées pour les rappels et les retards, protégées par secret",
          "Documentation de passation pour reprendre le projet sur une nouvelle machine"
        ]
      },
      en: {
        title: "Geno's & MAC&CLAY · Rentals and weddings",
        sector: "Formal-wear rental · Lexington, Kentucky (United States)",
        tagline: "Complete application for a tuxedo and suit rental store: wedding registration, looks, orders, Stripe payments, SMS and a daily board.",
        problem: [
          "Geno's & MAC&CLAY rents and tailors formal wear, with a warehouse, in-store fittings and a heavy wedding-party business. Every order was typed into three systems: rental registration, point of sale, warehouse software. Triple entry, transcription errors, no single source of truth.",
          "The owner pivoted away from a Shopify integration midway. The store needed a custom application to become the system of record, with Stripe for payments and a one-way sync from the legacy warehouse software."
        ],
        built: [
          "Customer journey: the groom registers the wedding, builds complete looks (coat, pants, shirt, vest, tie, shoes) and assigns them to each party member",
          "Admin area: today's board, orders, accounts due, wedding parties in tabs (active, this week, pending, archive), customers, daily close, reports",
          "Orders created at the fitting, prefilled from the reserved look; size dropdowns, pickup and return dates computed automatically",
          "Card payments through Stripe Checkout with an idempotent webhook, partial payments, discounts, tax and damage waiver",
          "SMS (Twilio) and e-mail (SendGrid), scheduled reminders, secure public links for fittings and orders",
          "Sync from the existing MySQL ERP, audit log, rate limiting, input validation (Zod), error tracking (Sentry)"
        ],
        congo: [
          "Same pattern as a school portal or a distributor platform: one point of entry, roles, online payments and SMS",
          "Stripe here, M-Pesa, Airtel Money and Orange Money there: the webhook payment architecture is the same",
          "Public links without an account for end customers, like parents or retailers without e-mail",
          "Automated tests, continuous integration and a staging environment: what we set up for every business application"
        ],
        deploy: [
          "React front end on Vercel, Express API on Railway, PostgreSQL database and authentication on Supabase",
          "Automatic deployment on every push to the main branch, separate staging environment",
          "Secrets held by the host, never in the code",
          "API health check, security headers, rate limiting"
        ],
        monitor: [
          "Front-end and API error tracking with Sentry",
          "Unit and integration tests run in continuous integration on GitHub, SonarCloud analysis",
          "Scheduled jobs for reminders and overdue returns, protected by a secret",
          "Handoff documentation to resume the project on a new machine"
        ]
      }
    },
    {
      slug: "macclay-wedding-tracker",
      status: "client",
      demoUrl: "demos/macclay-wedding-tracker/",
      liveUrl: "https://weddings.macandclay.com/",
      color: "#1B2433",
      domain: "weddings.macandclay.com",
      openLabel: { fr: "Ouvrir la démo", en: "Open the demo" },
      note: { fr: "La démo reproduit l'outil de production avec des données fictives : créez un mariage, prenez les mesures, validez les pointages, envoyez un lien de paiement et voyez les brouillons Shopify se mettre à jour (simulé). L'outil réel est réservé au personnel.", en: "The demo reproduces the production tool with mock data: create a wedding, take measurements, validate check-ins, send a pay link and watch the Shopify drafts update (simulated). The real tool is staff-only." },
      s3Label: { fr: "Ce qui est transférable en RDC", en: "What carries over to the DRC" },
      stack: ["Next.js 14", "React 18", "Supabase", "Shopify Admin API", "Resend", "Twilio", "Vercel"],
      timeline: { fr: "en production, évolutions en cours", en: "in production, evolving" },
      price: { fr: "sur devis", en: "on quote" },
      monthly: { fr: "évolutions continues", en: "ongoing development" },
      fr: {
        title: "Mac & Clay · Suivi des cortèges de mariage",
        sector: "Boutique de tenues de cérémonie · Kentucky (États-Unis)",
        tagline: "Outil du personnel pour suivre chaque cortège de mariage : membres, mesures, pointages, relances, et commandes Shopify créées automatiquement.",
        problem: [
          "L'équipe de la boutique suivait les cortèges de mariage dans des feuilles et ressaisissait chaque commande dans Shopify au moment du paiement. Les membres d'un cortège venaient se faire mesurer à des dates différentes, dans plusieurs magasins, et personne n'avait une vue d'ensemble des mariages à risque.",
          "Il fallait un outil simple pour le personnel, avec des rôles (propriétaire, coordinateur, responsable de magasin, personnel), des rappels automatiques et zéro double saisie."
        ],
        built: [
          "Tableau de bord : mariages actifs, 30 prochains jours, pointages dus, revues en attente, locations sorties, filtres par magasin et par styliste",
          "Fiche mariage : couple, date, magasin, membres du cortège, statut mesuré ou commandé, fiche imprimable et récapitulatif",
          "Saisie des mesures par membre avec instantanés planifiés ; journal d'activité attribué à l'utilisateur connecté",
          "Calendrier de pointages avec alertes e-mail (Resend) et SMS (Twilio) : nouveau mariage, prise en charge, mesures terminées, note ajoutée",
          "Synchronisation Shopify : brouillon de commande créé et mis à jour automatiquement pour chaque membre, lien de paiement par SMS, frais de retard, conversion en commande sept jours avant le mariage, solde reflété dans l'outil",
          "Administration : utilisateurs et rôles, catalogue configurable, notifications, rapports, état de la synchronisation"
        ],
        congo: [
          "Rôles et permissions par magasin : le même modèle qu'une école à plusieurs sites ou un distributeur à plusieurs dépôts",
          "Notifications automatiques par SMS et e-mail à chaque étape, sans intervention du personnel",
          "Intégration avec la caisse existante plutôt que remplacement : le personnel garde ses habitudes",
          "Environnement de préproduction avec sa propre base de données pour tester sans risque"
        ],
        deploy: [
          "Next.js 14 sur Vercel, base de données et authentification Supabase",
          "Branche de préproduction déployée séparément, avec sa propre base Supabase et la boutique Shopify de test",
          "Variables d'environnement par environnement, aucun secret dans le code",
          "Tâches planifiées pour la synchronisation Shopify et les instantanés de mesures"
        ],
        monitor: [
          "Journal d'activité horodaté sur chaque mariage",
          "Page d'état de la synchronisation Shopify pour l'administrateur",
          "Tests automatisés de la synchronisation Shopify",
          "Guides écrits pour le personnel et pour le déploiement, remis au client"
        ]
      },
      en: {
        title: "Mac & Clay · Wedding party tracker",
        sector: "Formal-wear store · Kentucky (United States)",
        tagline: "Staff tool to follow every wedding party: members, measurements, check-ins, reminders, and Shopify orders created automatically.",
        problem: [
          "The store team tracked wedding parties in spreadsheets and retyped every order into Shopify at payment time. Party members came in to be measured on different dates, in several stores, and nobody had an overview of the weddings at risk.",
          "The store needed a simple staff tool with roles (owner, coordinator, location lead, staff), automatic reminders and zero double entry."
        ],
        built: [
          "Dashboard: active weddings, next 30 days, check-ins due, pending review, rentals out, filters by store and stylist",
          "Wedding page: couple, date, store, party members, measured or ordered status, printable sheet and summary",
          "Measurement entry per member with scheduled snapshots; activity log attributed to the logged-in user",
          "Check-in timeline with e-mail alerts (Resend) and SMS (Twilio): new wedding, intake, measurements complete, note added",
          "Shopify sync: a draft order is created and updated automatically for each member, pay link by SMS, late fees, conversion to an order seven days before the wedding, balance reflected in the tool",
          "Admin: users and roles, configurable catalog, notifications, reports, sync status"
        ],
        congo: [
          "Roles and permissions per store: the same model as a school with several sites or a distributor with several depots",
          "Automatic SMS and e-mail notifications at every step, with no staff action",
          "Integration with the existing till rather than replacement: staff keep their habits",
          "Staging environment with its own database to test without risk"
        ],
        deploy: [
          "Next.js 14 on Vercel, database and authentication on Supabase",
          "Staging branch deployed separately, with its own Supabase project and the Shopify test store",
          "Environment variables per environment, no secret in the code",
          "Scheduled jobs for Shopify sync and measurement snapshots"
        ],
        monitor: [
          "Timestamped activity log on every wedding",
          "Shopify sync status page for the administrator",
          "Automated tests for the Shopify sync",
          "Written guides for staff and for deployment, handed to the client"
        ]
      }
    },
    {
      slug: "ets-financial",
      status: "client",
      demoUrl: "https://www.etsfinancialdrc.com/",
      color: "#0B3D5C",
      domain: "etsfinancialdrc.com",
      shotExt: "jpg",
      stack: ["HTML / CSS / JS statique", "Bilingue FR / EN", "Vercel", "Web3Forms", "Google Apps Script", "En-têtes CSP et HSTS", "Accessibilité ARIA", "Sitemap et SEO"],
      timeline: { fr: "Site en ligne", en: "Live site" },
      price: { fr: "sur devis", en: "on quote" },
      monthly: { fr: "mises à jour à la demande", en: "updates on request" },
      fr: {
        title: "ETS Financial Services SARLU",
        sector: "Conseil financier et assurance · Lubumbashi",
        tagline: "Site bilingue de douze pages pour un cabinet de conseil financier de Lubumbashi, avec prise de rendez-vous en ligne et formulaires sécurisés.",
        problem: [
          "ETS Financial Services accompagne les entreprises et les particuliers du Haut-Katanga : développement commercial, relations avec les partenaires, assurance vie, revenu, hypothèque et obsèques, planification de la retraite et protection du patrimoine. Le cabinet avait besoin d'une présence en ligne crédible pour ses partenaires locaux et étrangers, en français et en anglais.",
          "Il fallait un site rapide, sécurisé et accessible, qui permette de prendre rendez-vous, de télécharger la plaquette du cabinet et de le contacter par WhatsApp ou e-mail, sans serveur à maintenir."
        ],
        built: [
          "Site statique bilingue : accueil, services, ressources, carrières, prise de rendez-vous et contact, en français et en anglais",
          "Prise de rendez-vous avec calendrier et créneaux horaires utilisables au clavier",
          "Formulaires de contact et de candidature avec champ piège anti-spam et messages d'erreur intégrés, sans fenêtres d'alerte",
          "Bouton WhatsApp, téléchargement de la présentation du cabinet en PDF, questions fréquentes en accordéon, articles en fenêtre modale",
          "Audit sécurité et accessibilité : en-têtes CSP, HSTS et anti-clickjacking, repères ARIA sur toutes les pages, lien d'accès direct au contenu, contraste corrigé"
        ],
        congo: [
          "Pages statiques sans framework : rapides sur les connexions mobiles de Lubumbashi",
          "Contact par WhatsApp et e-mail, sans création de compte",
          "Version anglaise complète pour les partenaires miniers et les investisseurs étrangers",
          "Aucun serveur applicatif ni base de données : rien à redémarrer après une coupure"
        ],
        deploy: [
          "Hébergement Vercel avec HTTPS automatique, CDN mondial et URL propres",
          "Déploiement automatique depuis le dépôt GitHub à chaque modification",
          "En-têtes de sécurité déclarés dans la configuration d'hébergement",
          "Plan du site et robots.txt pour le référencement"
        ],
        monitor: [
          "Site statique sans base de données : surface d'attaque minimale, rien à sauvegarder côté serveur",
          "Formulaires acheminés par e-mail via Web3Forms, rendez-vous via Google Apps Script",
          "Mises à jour de contenu des pages françaises et anglaises à la demande du client",
          "Audits sécurité et accessibilité rejoués après chaque évolution"
        ]
      },
      en: {
        title: "ETS Financial Services SARLU",
        sector: "Financial consulting and insurance · Lubumbashi",
        tagline: "A twelve-page bilingual site for a Lubumbashi financial consulting firm, with online appointment booking and secured forms.",
        problem: [
          "ETS Financial Services serves companies and individuals in Haut-Katanga: business development, partner relations, life, income, mortgage and funeral insurance, retirement planning and wealth protection. The firm needed a credible online presence for local and foreign partners, in French and English.",
          "The site had to be fast, secure and accessible, let visitors book an appointment, download the firm's profile and reach it by WhatsApp or e-mail, with no server to maintain."
        ],
        built: [
          "Bilingual static site: home, services, resources, careers, appointment booking and contact, in French and English",
          "Appointment booking with a calendar and keyboard-accessible time slots",
          "Contact and application forms with a honeypot anti-spam field and inline error messages, no alert pop-ups",
          "WhatsApp button, downloadable company profile in PDF, FAQ accordion, articles in a modal window",
          "Security and accessibility audit: CSP, HSTS and anti-clickjacking headers, ARIA landmarks on every page, skip-to-content link, corrected colour contrast"
        ],
        congo: [
          "Static pages with no framework: fast on Lubumbashi mobile connections",
          "Contact by WhatsApp and e-mail, no account needed",
          "Full English version for mining partners and foreign investors",
          "No application server or database: nothing to restart after a power cut"
        ],
        deploy: [
          "Vercel hosting with automatic HTTPS, global CDN and clean URLs",
          "Automatic deployment from the GitHub repository on every change",
          "Security headers declared in the hosting configuration",
          "Sitemap and robots.txt for search engines"
        ],
        monitor: [
          "Static site with no database: minimal attack surface, nothing to back up server-side",
          "Forms delivered by e-mail through Web3Forms, appointments through Google Apps Script",
          "Content updates to the French and English pages on the client's request",
          "Security and accessibility audits repeated after each change"
        ]
      }
    },
    {
      slug: "kando-ressources",
      status: "demo",
      demoUrl: "demos/kando-ressources/",
      demoUrls: { fr: "demos/kando-ressources/", en: "demos/kando-ressources/en/" },
      color: "#9A4B1E",
      domain: "kando-ressources.cd",
      stack: ["HTML / CSS / JS statique", "16 pages FR / EN", "Espace investisseurs", "Rapports et ITIE", "Mécanisme de plaintes", "Archive de communiqués", "Cloudflare", "Hébergement RDC"],
      timeline: { fr: "6 à 10 semaines", en: "6 to 10 weeks" },
      price: { fr: "à partir de 8 000 USD", en: "from 8,000 USD" },
      monthly: { fr: "250 à 600 USD / mois", en: "250 to 600 USD / month" },
      fr: {
        title: "Kando Ressources",
        sector: "Société minière · cuivre et cobalt, Lualaba",
        tagline: "Site corporate bilingue pour un producteur de cuivre-cobalt : activités, espace investisseurs, durabilité avec mécanisme de plaintes, actualités, carrières.",
        problem: [
          "Les grandes sociétés minières présentent toutes la même architecture : qui nous sommes, activités, investisseurs, durabilité, actualités, carrières, contact. Leurs partenaires, prêteurs, administrations et communautés s'y attendent. La plupart des opérateurs installés en RDC n'ont pourtant aucun site à la hauteur de cette attente.",
          "Il fallait un site qui serve deux publics à la fois : les partenaires financiers, qui cherchent rapports, chiffres de production et déclaration ITIE, et les communautés riveraines, qui cherchent les programmes, les emplois et un moyen de déposer une plainte."
        ],
        built: [
          "Seize pages en français et en anglais, générées depuis un seul fichier de contenu que le service communication peut modifier sans coder",
          "Page d'accueil avec chiffres clés, activités, indicateurs de durabilité, derniers communiqués, documents investisseurs et programmes communautaires",
          "Espace investisseurs : faits saillants, production trimestrielle, bibliothèque de rapports, calendrier, tableau ITIE des paiements à l'État, structure du capital, contact et alertes",
          "Durabilité : indicateurs sécurité, eau, climat et emploi local, programmes communautaires, consultation, origine des minerais, mécanisme de plaintes en quatre étapes avec formulaire et numéro de référence",
          "Archive de communiqués consultable par mot-clé, catégorie et année ; offres d'emploi filtrables par site et service avec candidature en ligne",
          "Carte schématique des sites, fiches par produit (cuivre, cobalt), équipe de direction et conseil d'administration, gouvernance et politiques"
        ],
        congo: [
          "Bilingue français-anglais pour les partenaires étrangers, numéro vert et bureaux communautaires mis en avant pour les riverains",
          "Déclaration ITIE, loi 17/001 sur la sous-traitance, Code minier de 2018 et diligence raisonnable OCDE cités là où un lecteur congolais les attend",
          "Photos compressées et pages statiques : lisible en 3G depuis Kolwezi ou Fungurume",
          "Chaque chiffre est un emplacement à remplir par la société ; rien n'est inventé sur un client réel"
        ],
        deploy: [
          "Site statique servi depuis un hébergement en RDC, Cloudflare devant pour le cache, la protection et la disponibilité",
          "Mise en ligne par pipeline automatisé à chaque publication de communiqué, retour arrière immédiat",
          "Bibliothèque de PDF servie par le CDN, formulaires branchés sur la messagerie du service communication",
          "Sauvegarde chiffrée chaque nuit, copie hors du pays"
        ],
        monitor: [
          "Sonde toutes les 60 secondes, objectif de disponibilité 99,9 %",
          "Contrôle des certificats, du nom de domaine et des liens vers les documents",
          "Alerte WhatsApp et SMS à notre équipe et au service communication",
          "Rapport mensuel de disponibilité et de fréquentation"
        ]
      },
      en: {
        title: "Kando Ressources",
        sector: "Mining company · copper and cobalt, Lualaba",
        tagline: "Bilingual corporate site for a copper-cobalt producer: operations, investor centre, sustainability with a grievance mechanism, news, careers.",
        problem: [
          "Every major mining company presents the same architecture: who we are, what we do, investors, sustainability, news, careers, contact. Their partners, lenders, administrations and communities expect it. Most operators established in the DRC have no site that meets that expectation.",
          "The site had to serve two audiences at once: financial partners looking for reports, production figures and the EITI disclosure, and neighbouring communities looking for programmes, jobs and a way to file a grievance."
        ],
        built: [
          "Sixteen pages in French and English, generated from a single content file that the communications team can edit without code",
          "Home page with key figures, operations, sustainability indicators, latest releases, investor documents and community programmes",
          "Investor centre: highlights, quarterly production, report library, calendar, EITI table of payments to the State, ownership, contact and alerts",
          "Sustainability: safety, water, climate and local employment indicators, community programmes, consultation, mineral origin, four-step grievance mechanism with a form and reference number",
          "Release archive searchable by keyword, category and year; job openings filterable by site and department with online application",
          "Schematic site map, product pages (copper, cobalt), executive team and board, governance and policies"
        ],
        congo: [
          "Bilingual French-English for foreign partners, hotline and community offices prominent for neighbours",
          "EITI disclosure, Law 17/001 on subcontracting, the 2018 Mining Code and OECD due diligence cited where a Congolese reader expects them",
          "Compressed photos and static pages: readable on 3G from Kolwezi or Fungurume",
          "Every figure is a slot for the company to fill; nothing is invented about a real client"
        ],
        deploy: [
          "Static site served from hosting in the DRC, Cloudflare in front for caching, protection and availability",
          "Automated release pipeline on every press release, immediate rollback",
          "PDF library served by the CDN, forms routed to the communications team's mailbox",
          "Encrypted nightly backup, off-country copy"
        ],
        monitor: [
          "Probe every 60 seconds, 99.9% availability target",
          "Certificate, domain and document-link checks",
          "WhatsApp and SMS alert to our team and to the communications team",
          "Monthly availability and traffic report"
        ]
      }
    },
    {
      slug: "kimia-express",
      status: "demo",
      demoUrl: "demos/kimia-express/",
      demoUrls: { fr: "demos/kimia-express/", en: "demos/kimia-express/en/" },
      color: "#0E5A43",
      domain: "kimia-express.cd",
      stack: ["HTML / CSS / JS", "FR / EN · 18 pages", "M-Pesa · Orange Money · Airtel Money (démo)", "Cloudflare", "Hébergement local"],
      timeline: { fr: "3 à 5 semaines", en: "3 to 5 weeks" },
      price: { fr: "à partir de 2 500 USD", en: "from 2,500 USD" },
      monthly: { fr: "80 à 150 USD / mois", en: "80 to 150 USD / month" },
      fr: {
        title: "Kimia Express",
        sector: "Livraison et logistique · 12 villes de RDC",
        tagline: "Site bilingue de livraison express : 18 pages, réservation de collecte, suivi de colis, tarifs et réseau de points relais en RDC. Données et paiements simulés.",
        problem: [
          "Une société de coursiers reçoit ses commandes par appels et messages WhatsApp, donne ses prix de tête, et ses clients rappellent trois fois pour savoir où est leur colis. Les entreprises qui expédient tous les jours veulent un compte, des tarifs dégressifs et une facture mensuelle.",
          "Il fallait un site bilingue qui présente les services, les tarifs, le réseau et les parcours d’envoi et de suivi de colis."
        ],
        built: [
          "18 pages : neuf en français et neuf en anglais, avec changement de langue vers la page équivalente",
          "Accueil, envoi de colis, suivi et tarifs ; parcours de démonstration sans paiement réel",
          "Réseau de 12 villes et 28 agences et points relais fictifs en RDC",
          "Pages entreprises, coursiers, aide et contact, et à propos",
          "Identité vert et orange, photographies locales et illustrations adaptées"
        ],
        congo: [
          "Pages statiques adaptées au mobile, photos compressées et navigation en français et en anglais",
          "Paiement mobile money et espèces au coursier, sans carte bancaire obligatoire",
          "Parcours de confirmation et de suivi simulés, sans application à installer",
          "Prix en francs, délais réalistes par ville, adaptable à Lubumbashi ou Goma en changeant une liste"
        ],
        deploy: [
          "Site statique servi depuis un hébergement local, Cloudflare devant pour le cache et la protection",
          "Mise en ligne par pipeline automatisé, retour arrière immédiat",
          "Passerelle mobile money et SMS branchées côté serveur en production",
          "Sauvegarde chiffrée chaque nuit"
        ],
        monitor: [
          "Sonde toutes les 60 secondes sur le site et sur la passerelle de paiement",
          "Suivi des réservations en échec et des SMS non délivrés",
          "Alerte WhatsApp et SMS à notre équipe",
          "Rapport mensuel de disponibilité"
        ]
      },
      en: {
        title: "Kimia Express",
        sector: "Delivery and logistics · 12 DRC cities",
        tagline: "Bilingual express delivery site: 18 pages, pickup booking, parcel tracking, pricing and a DRC relay network. Simulated data and payments.",
        problem: [
          "A courier company takes orders by phone and WhatsApp, quotes prices from memory, and customers call three times to ask where their parcel is. Businesses that ship every day want an account, volume rates and a monthly invoice.",
          "The site needed to present services, pricing, the network and parcel booking and tracking journeys in French and English."
        ],
        built: [
          "18 pages: nine in French and nine in English, with language links to the equivalent page",
          "Home, parcel booking, tracking and pricing; demonstration journeys without real payments",
          "Network of 12 cities and 28 fictitious offices and relay points in the DRC",
          "Business, couriers, help and contact, and about pages",
          "Green and orange identity, local photography and adapted illustrations"
        ],
        congo: [
          "Mobile-friendly static pages, compressed photos and French and English navigation",
          "Mobile money and cash to the courier, no bank card required",
          "Simulated confirmation and tracking journeys, with no app to install",
          "Prices in francs, realistic delivery times per city, adaptable to Lubumbashi or Goma by changing one list"
        ],
        deploy: [
          "Static site served from local hosting, Cloudflare in front for caching and protection",
          "Automated release pipeline, immediate rollback",
          "Mobile money and SMS gateways connected server-side in production",
          "Encrypted nightly backup"
        ],
        monitor: [
          "Probe every 60 seconds on the site and on the payment gateway",
          "Tracking of failed bookings and undelivered SMS",
          "WhatsApp and SMS alert to our team",
          "Monthly availability report"
        ]
      }
    },
    {
      slug: "commande-distributeur",
      status: "demo",
      demoUrl: "demos/commande-distributeur/",
      color: "#1D3EB5",
      domain: "mokili-distribution.cd",
      stack: ["React", "Android hors ligne", "Node.js", "PostgreSQL", "Redis", "Cloudflare", "Docker", "Agrégateur mobile money", "Grafana"],
      timeline: { fr: "8 à 12 semaines", en: "8 to 12 weeks" },
      price: { fr: "à partir de 6 000 USD", en: "from 6,000 USD" },
      monthly: { fr: "150 à 500 USD / mois", en: "150 to 500 USD / month" },
      fr: {
        title: "Commande & Encaissement Distributeur",
        sector: "Distribution et gros · boissons, biens de consommation, pharmacie, matériaux",
        tagline: "Les détaillants commandent depuis leur téléphone, le distributeur encaisse en mobile money et rapproche automatiquement.",
        problem: [
          "Un distributeur reçoit ses commandes par téléphone, promet des produits qu'il n'a plus en stock, encaisse en espèces à la livraison et passe ses soirées à rapprocher les tournées.",
          "À partir du 9 avril 2027, les paiements en espèces en devises sont interdits. Les détaillants qui paient en dollars devront payer autrement."
        ],
        built: [
          "Catalogue et stock en temps réel, visibles par chaque détaillant",
          "Commande depuis un téléphone Android, validation par le commercial de secteur",
          "Encaissement M-Pesa, Airtel Money, Orange Money, avec reçu SMS",
          "Rapprochement automatique commandes / paiements / livraisons",
          "Tableau de bord des tournées, des impayés et des produits en rupture"
        ],
        congo: [
          "Les commerciaux en tournée travaillent hors ligne ; tout se synchronise au retour du réseau",
          "Les détaillants sans smartphone reçoivent une confirmation par SMS",
          "Montants en USD et en CDF, taux du jour saisi par le distributeur",
          "Fonctionne sur les téléphones Android d'entrée de gamme"
        ],
        deploy: [
          "Hébergement à Kinshasa, Cloudflare devant l'application",
          "Conteneurs Docker, base PostgreSQL, cache Redis pour le stock en temps réel",
          "Sauvegarde chiffrée chaque nuit, copie hors du pays, restauration testée"
        ],
        monitor: [
          "Sonde toutes les 60 secondes sur l'application et sur la passerelle de paiement",
          "Suivi des paiements en échec et des synchronisations en attente",
          "Alerte WhatsApp et SMS à notre équipe",
          "Rapport mensuel de disponibilité et d'incidents"
        ]
      },
      en: {
        title: "Distributor Ordering & Collection",
        sector: "Distribution and wholesale · beverages, consumer goods, pharma, building materials",
        tagline: "Retailers order from their phone, the distributor collects by mobile money and reconciles automatically.",
        problem: [
          "A distributor takes orders by phone, promises products that are out of stock, collects cash on delivery and spends evenings reconciling delivery rounds.",
          "From 9 April 2027, cash payments in foreign currency are banned. Retailers who pay in dollars will have to pay another way."
        ],
        built: [
          "Real-time catalogue and stock, visible to every retailer",
          "Ordering from an Android phone, approval by the territory sales rep",
          "M-Pesa, Airtel Money, Orange Money collection with SMS receipt",
          "Automatic reconciliation of orders, payments and deliveries",
          "Dashboard of rounds, unpaid balances and out-of-stock products"
        ],
        congo: [
          "Sales reps on the road work offline; everything syncs when the network returns",
          "Retailers without a smartphone receive an SMS confirmation",
          "Amounts in USD and CDF, day's rate entered by the distributor",
          "Runs on entry-level Android phones"
        ],
        deploy: [
          "Hosted in Kinshasa, Cloudflare in front of the application",
          "Docker containers, PostgreSQL database, Redis cache for live stock",
          "Encrypted nightly backup, off-country copy, restore tested"
        ],
        monitor: [
          "Probe every 60 seconds on the application and on the payment gateway",
          "Tracking of failed payments and pending syncs",
          "WhatsApp and SMS alert to our team",
          "Monthly availability and incident report"
        ]
      }
    },
    {
      slug: "portail-sous-traitant",
      status: "demo",
      demoUrl: "demos/portail-sous-traitant/",
      color: "#B45309",
      domain: "app.sotramines.cd",
      stack: ["Android hors ligne", "React", "Node.js", "PostgreSQL", "Stockage objet", "Cloudflare", "Docker", "Export PDF", "Uptime Kuma"],
      timeline: { fr: "10 à 14 semaines", en: "10 to 14 weeks" },
      price: { fr: "à partir de 10 000 USD", en: "from 10,000 USD" },
      monthly: { fr: "200 à 500 USD / mois", en: "200 to 500 USD / month" },
      fr: {
        title: "Portail Sous-traitant Minier",
        sector: "Sous-traitance minière · Haut-Katanga, Lualaba",
        tagline: "Rapports HSE, inspections d'équipements et dossier de conformité, saisis sur site sans réseau.",
        problem: [
          "Une entreprise congolaise sous-traitante d'une mine doit fournir à son donneur d'ordre des rapports d'incidents, des checklists d'équipements, des feuilles de temps et un dossier de conformité à jour. Tout se fait sur papier, puis se ressaisit au bureau.",
          "Un dossier incomplet retarde le paiement ou fait perdre le contrat au prochain appel d'offres."
        ],
        built: [
          "Application Android pour les rapports d'incidents, inspections et pointage, avec photos",
          "Dossier de conformité par contrat : assurances, certifications, agrément ARSP, échéances",
          "Tableau de bord du responsable : incidents ouverts, inspections en retard, documents expirés",
          "Export PDF au format attendu par le donneur d'ordre",
          "Interface en français, anglais et swahili"
        ],
        congo: [
          "Fonctionne sans réseau sur site ; synchronisation en 4G ou Starlink au retour",
          "Photos compressées automatiquement pour ne pas saturer la connexion",
          "Utilisable avec des gants sur un téléphone durci, gros boutons, peu de texte",
          "Pas de dépendance à une adresse e-mail pour les agents de terrain"
        ],
        deploy: [
          "Hébergement à Kinshasa, Cloudflare devant l'application",
          "Conteneurs Docker, base PostgreSQL, stockage objet pour les photos et PDF",
          "Sauvegarde chiffrée chaque nuit, copie hors du pays, restauration testée"
        ],
        monitor: [
          "Sonde toutes les 60 secondes, publiée sur la page d'état",
          "Suivi des synchronisations en échec par appareil",
          "Alerte WhatsApp et SMS à notre équipe",
          "Rapport mensuel de disponibilité et d'incidents"
        ]
      },
      en: {
        title: "Mining Contractor Portal",
        sector: "Mining subcontracting · Haut-Katanga, Lualaba",
        tagline: "HSE reports, equipment inspections and compliance file, captured on site without network.",
        problem: [
          "A Congolese company subcontracting for a mine must give its principal incident reports, equipment checklists, timesheets and an up-to-date compliance file. Everything is done on paper, then retyped at the office.",
          "An incomplete file delays payment or loses the contract at the next tender."
        ],
        built: [
          "Android app for incident reports, inspections and time tracking, with photos",
          "Compliance file per contract: insurance, certifications, ARSP approval, deadlines",
          "Manager dashboard: open incidents, overdue inspections, expired documents",
          "PDF export in the format the principal expects",
          "Interface in French, English and Swahili"
        ],
        congo: [
          "Works without network on site; syncs over 4G or Starlink on return",
          "Photos compressed automatically so they do not saturate the connection",
          "Usable with gloves on a rugged phone: large buttons, little text",
          "No e-mail address required for field staff"
        ],
        deploy: [
          "Hosted in Kinshasa, Cloudflare in front of the application",
          "Docker containers, PostgreSQL database, object storage for photos and PDFs",
          "Encrypted nightly backup, off-country copy, restore tested"
        ],
        monitor: [
          "Probe every 60 seconds, published on the status page",
          "Tracking of failed syncs per device",
          "WhatsApp and SMS alert to our team",
          "Monthly availability and incident report"
        ]
      }
    },
    {
      slug: "ndala-beauty",
      status: "demo",
      demoUrl: "demos/ndala-beauty/",
      color: "#2F6B4F",
      domain: "ndala.cd",
      stack: ["HTML / CSS / JS", "Panier et code promo", "MTN MoMo · Airtel Money", "SMS", "Cloudflare", "Hébergement local"],
      timeline: { fr: "4 à 6 semaines", en: "4 to 6 weeks" },
      price: { fr: "à partir de 2 500 USD", en: "from 2,500 USD" },
      monthly: { fr: "80 à 150 USD / mois", en: "80 to 150 USD / month" },
      fr: {
        title: "Ndala Beauty",
        sector: "Commerce en ligne · cosmétiques naturels, Kinshasa",
        tagline: "Boutique en ligne de soins naturels avec catalogue filtrable, panier, remise coffret, code promo et paiement mobile money.",
        problem: [
          "Une marque de cosmétiques vend sur Instagram et WhatsApp : les prix se négocient en message privé, les commandes se perdent, et chaque paiement est vérifié à la main sur le téléphone du gérant. Impossible de proposer des coffrets, des codes promo ou des recharges sans tout expliquer à chaque cliente.",
          "Il fallait une boutique qui présente la marque, laisse la cliente composer son panier, applique les remises toute seule et encaisse par mobile money avant l'expédition."
        ],
        built: [
          "Page d'accueil avec héros, promesses de service, catégories illustrées et best-sellers",
          "Catalogue avec filtres par catégorie et par prix, tri, recherche par produit ou ingrédient, favoris",
          "Panier latéral avec quantités, seuil de livraison offerte, remise coffret automatique dès trois produits et code promo",
          "Paiement MTN MoMo, Airtel Money, carte ou à la livraison, avec référence de commande et SMS de confirmation",
          "Avis clients, bandeau ingrédients, inscription à la lettre d'information"
        ],
        congo: [
          "Illustrations vectorielles et photos compressées : la page reste rapide en 3G",
          "Mobile money et paiement à la livraison, sans carte bancaire obligatoire",
          "SMS de confirmation pour les clientes sans e-mail",
          "Prix en francs, livraison en 1 à 2 jours dans les grandes villes, adaptable à Lubumbashi en changeant les zones"
        ],
        deploy: [
          "Site statique servi depuis un hébergement local, Cloudflare devant pour le cache et la protection",
          "Mise en ligne par pipeline automatisé, retour arrière immédiat",
          "Passerelle mobile money et SMS branchées côté serveur en production",
          "Sauvegarde chiffrée chaque nuit"
        ],
        monitor: [
          "Sonde toutes les 60 secondes sur la boutique et sur la passerelle de paiement",
          "Suivi des paniers abandonnés et des paiements en échec",
          "Alerte WhatsApp et SMS à notre équipe",
          "Rapport mensuel de disponibilité et de ventes"
        ]
      },
      en: {
        title: "Ndala Beauty",
        sector: "E-commerce · natural skincare, Kinshasa",
        tagline: "Natural skincare online shop with a filterable catalogue, bag, set discount, promo code and mobile money payment.",
        problem: [
          "A skincare brand sells on Instagram and WhatsApp: prices are negotiated in private messages, orders get lost, and every payment is checked by hand on the owner's phone. Sets, promo codes and refills are impossible to offer without explaining everything to each customer.",
          "The brand needed a shop that presents the products, lets the customer build a bag, applies discounts on its own and collects by mobile money before shipping."
        ],
        built: [
          "Home page with hero, service promises, illustrated categories and bestsellers",
          "Catalogue with category and price filters, sorting, search by product or ingredient, wishlist",
          "Side bag with quantities, free-delivery threshold, automatic set discount from three products and a promo code",
          "Payment by MTN MoMo, Airtel Money, card or on delivery, with an order reference and SMS confirmation",
          "Customer reviews, ingredients banner, newsletter sign-up"
        ],
        congo: [
          "Vector illustrations and compressed photos: the page stays fast on 3G",
          "Mobile money and cash on delivery, no bank card required",
          "SMS confirmation for customers without e-mail",
          "Prices in francs, delivery in 1 to 2 days in major cities, adaptable to Lubumbashi by changing the zones"
        ],
        deploy: [
          "Static site served from local hosting, Cloudflare in front for caching and protection",
          "Automated release pipeline, immediate rollback",
          "Mobile money and SMS gateways connected server-side in production",
          "Encrypted nightly backup"
        ],
        monitor: [
          "Probe every 60 seconds on the shop and on the payment gateway",
          "Tracking of abandoned bags and failed payments",
          "WhatsApp and SMS alert to our team",
          "Monthly availability and sales report"
        ]
      }
    },
    {
      slug: "site-corporate",
      status: "demo",
      demoUrl: "demos/site-corporate/",
      demoUrls: { fr: "demos/site-corporate/", en: "demos/site-corporate/en/" },
      color: "#1F4E79",
      domain: "cimenterie-du-fleuve.cd",
      stack: ["HTML / CSS / JS statique", "18 pages FR / EN", "Fiches produits", "Appels d'offres", "Candidatures", "Mécanisme de plaintes", "Mentions légales", "Cloudflare", "Hébergement RDC"],
      timeline: { fr: "5 à 8 semaines", en: "5 to 8 weeks" },
      price: { fr: "à partir de 5 000 USD", en: "from 5,000 USD" },
      monthly: { fr: "150 à 400 USD / mois", en: "150 to 400 USD / month" },
      fr: {
        title: "Cimenterie du Fleuve",
        sector: "Industrie · ciment, béton et granulats, Kongo Central",
        tagline: "Site corporate bilingue pour un cimentier : produits et fiches techniques, sites et logistique, appels d'offres, carrières, durabilité, mentions légales conformes au Code du numérique.",
        problem: [
          "Un industriel congolais vend à trois publics à la fois : les chantiers et revendeurs qui cherchent une fiche technique et un point de vente, les fournisseurs qui cherchent les appels d'offres, et les candidats, partenaires et administrations qui le jugent sur son site. Un site vitrine d'une page ne sert aucun des trois.",
          "Il fallait aussi un site que le service communication puisse tenir à jour seul : nouveau communiqué, nouvel appel d'offres, poste ouvert, sans repasser par un prestataire."
        ],
        built: [
          "Dix-huit pages en français et en anglais, générées depuis un seul fichier de contenu : neuf pages par langue, mêmes adresses, même navigation",
          "Produits : cinq fiches (trois ciments CEM I et CEM II, béton prêt à l'emploi, granulats) avec caractéristiques normalisées, usages, fiches techniques, certificat OCC et conseils de stockage",
          "Sites et logistique : usine, carrière, terminal, dépôts, carte schématique rail-route-fleuve et tableau des points de vente avec téléphones cliquables",
          "Fournisseurs : tableau des consultations filtrable par état (ouvert, à venir, clôturé), procédure de réponse, règles d'achat et formulaire de référencement avec numéro de dossier",
          "Durabilité et sécurité : huit indicateurs, règles de sécurité, environnement, programmes communautaires et mécanisme de plainte en quatre étapes avec ligne verte",
          "Actualités filtrables par mot-clé, rubrique et année ; postes filtrables par site et service avec candidature en ligne ; contact avec demande de devis, horaires, mentions légales et bandeau de consentement"
        ],
        congo: [
          "Réalités logistiques congolaises intégrées : rail SCTP Matadi–Kinshasa, route nationale n° 1, barges depuis Kinshasa vers Bandundu, Mbandaka et Kisangani",
          "Certificat OCC, RCCM, numéro d'impôt, ordonnance-loi 23/010 (Code du numérique) : les références qu'un lecteur congolais attend, à leur place",
          "Prix affichés en francs congolais, téléphones en +243, ligne verte gratuite en français, kikongo et lingala",
          "Pages statiques et photos compressées : lisible en 3G depuis un chantier ; chaque chiffre est un emplacement à remplir par la société"
        ],
        deploy: [
          "Site statique servi depuis un hébergement en RDC, Cloudflare devant pour le cache et la protection",
          "Mise en ligne par pipeline automatisé à chaque modification du fichier de contenu, retour arrière immédiat",
          "Fiches techniques et dossiers d'appel d'offres en PDF servis par le CDN, formulaires branchés sur la messagerie du service concerné",
          "Sauvegarde chiffrée chaque nuit, copie hors du pays"
        ],
        monitor: [
          "Sonde toutes les 60 secondes, objectif de disponibilité 99,9 %",
          "Contrôle du certificat HTTPS, du nom de domaine et des liens vers les documents",
          "Alerte WhatsApp et SMS à notre équipe et au service communication",
          "Rapport mensuel de disponibilité et de fréquentation"
        ]
      },
      en: {
        title: "Cimenterie du Fleuve",
        sector: "Industry · cement, concrete and aggregates, Kongo Central",
        tagline: "Bilingual corporate site for a cement maker: products and datasheets, sites and logistics, tenders, careers, sustainability, legal notice compliant with the Digital Code.",
        problem: [
          "A Congolese manufacturer sells to three audiences at once: contractors and retailers looking for a datasheet and an outlet, suppliers looking for tenders, and candidates, partners and administrations who judge it on its site. A one-page brochure site serves none of them.",
          "The communications team also had to be able to keep the site current alone: a new release, a new tender, an open position, without going back to a vendor."
        ],
        built: [
          "Eighteen pages in French and English, generated from one content file: nine pages per language, same addresses, same navigation",
          "Products: five sheets (three CEM I and CEM II cements, ready-mix concrete, aggregates) with standardised characteristics, uses, datasheets, OCC certificate and storage advice",
          "Sites and logistics: plant, quarry, terminal, depots, schematic rail-road-river map and outlet table with tappable phone numbers",
          "Suppliers: tender table filterable by state (open, upcoming, closed), response procedure, purchasing rules and registration form with file number",
          "Sustainability and safety: eight indicators, safety rules, environment, community programmes and a four-step grievance mechanism with a green line",
          "News filterable by keyword, category and year; positions filterable by site and department with online application; contact with quote request, opening hours, legal notice and consent banner"
        ],
        congo: [
          "Congolese logistics built in: SCTP Matadi–Kinshasa railway, national road no. 1, barges from Kinshasa to Bandundu, Mbandaka and Kisangani",
          "OCC certificate, RCCM, tax number, ordinance-law 23/010 (Digital Code): the references a Congolese reader expects, where they belong",
          "Prices posted in Congolese francs, +243 phone numbers, free green line in French, Kikongo and Lingala",
          "Static pages and compressed photos: readable on 3G from a building site; every figure is a slot for the company to fill"
        ],
        deploy: [
          "Static site served from DRC hosting, Cloudflare in front for caching and protection",
          "Automated pipeline on every change to the content file, immediate rollback",
          "Datasheets and tender files as PDFs served by the CDN, forms wired to the relevant department's mailbox",
          "Encrypted backup every night, copy outside the country"
        ],
        monitor: [
          "Probe every 60 seconds, 99.9% availability target",
          "HTTPS certificate, domain name and document link checks",
          "WhatsApp and SMS alert to our team and the communications team",
          "Monthly availability and traffic report"
        ]
      }
    }
  ]
};

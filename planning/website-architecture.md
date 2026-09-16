# IK Digital Solutions — website information architecture

Approved architecture · implemented 15 September 2026

Scope: pages, navigation, service organization, project stories and visitor journeys.
This records the approved structure implemented in `site/content.js`, `site/pages.js`
and the shared portfolio assets. Existing project and demonstration URLs are preserved.

## 1. What the existing material tells us

Reviewed: the BusinessHub, TradeConnect and MineTrack case studies; the DRC portfolio
strategy; the portfolio README; the current generator, content and browser script.

- BusinessHub supplies useful customer needs: a credible website, a product catalogue,
  bookings/orders, customer records and invoices.
- TradeConnect supplies distributor workflows: stock visibility, retailer orders,
  collection and reconciliation. The current distributor demo is the narrower example.
- MineTrack supplies field-work needs: reports, equipment checks, documentation and
  offline entry. The current mining contractor portal is the narrower example.
- The strategy emphasizes clear offers, working demonstrations, client evidence and
  continued support after delivery.
- The current portfolio contains nine project records: three labelled client and six
  labelled demonstrator. These classifications come from the repository; this review
  does not independently verify client contracts or outcomes.
- The main navigation currently points to six sections of one long homepage. Services
  are labelled Conception, Création, Déploiement cloud and Supervision: these describe
  stages of our work, while visitors also need to choose what they want to buy.
- Individual project pages already exist. Kimia, Kando and Fleuve have independent
  bilingual demo sites. Their identities and existing routes should remain intact.

The README explicitly identifies the original case-study performance figures as
invented. Use their problem descriptions as planning material, not as customer
testimonials, delivered features or measured results. Verify dated legal and market
claims separately before using them in new public copy.

## 2. Organizing principle

Help visitors answer, in this order:

1. Can you help with my business need?
2. Have you built something relevant that I can inspect?
3. What would a project include, cost and require from me?
4. How do I start a conversation?

Primary journey: **Service → relevant project → live site or demonstration → inquiry**.
Visitors arriving directly at a project page should be able to follow this journey too.

## 3. Main navigation

Logo links to Home. Five labelled destinations, followed by one prominent inquiry button:

| French | English | Purpose |
|---|---|---|
| Services | Services | Choose a type of solution |
| Réalisations | Work | Inspect relevant client work and demonstrations |
| Notre méthode | Our process | Understand delivery, ownership and ongoing support |
| À propos | About | Understand who is responsible for the work |
| Contact | Contact | Discuss requirements and next steps |

Persistent button: **Parlons de votre projet / Discuss your project**. FR/EN remains
available on desktop and inside the mobile menu. Use ordinary page links, visible
current-page state and a keyboard-operable mobile menu; do not depend on hover.

Services opens an overview page with four offers. A short dropdown can also expose
those offers, but the overview must remain accessible as a normal link.

Pricing belongs on each service page and in a comparison section on the service
overview. Security and operational details belong on Our process and the hosting
service page. Legal information belongs in the footer. These subjects remain easy
to find without occupying separate primary-navigation positions.

## 4. Page and route map

The implementation keeps the .html convention and French-first structure. The route
map below is implemented; existing project and demo routes stay.

| Page | French route | English route |
|---|---|---|
| Home | `/index.html` | `/en/index.html` |
| Services overview | `/services/index.html` | `/en/services/index.html` |
| Business and corporate websites | `/services/sites-web.html` | `/en/services/websites.html` |
| E-commerce and bookings | `/services/commerce-reservations.html` | `/en/services/commerce-bookings.html` |
| Business applications | `/services/applications-metier.html` | `/en/services/business-applications.html` |
| Hosting and maintenance | `/services/hebergement-maintenance.html` | `/en/services/hosting-maintenance.html` |
| Work directory | `/projets/index.html` | `/en/projects/index.html` |
| Existing project stories | `/projets/<slug>.html` | `/en/projects/<slug>.html` |
| Our process | `/methode.html` | `/en/process.html` |
| About | `/a-propos.html` | `/en/about.html` |
| Contact | `/contact.html` | `/en/contact.html` |
| Legal notice | `/mentions-legales.html` | `/en/legal.html` |
| Privacy | `/confidentialite.html` | `/en/privacy.html` |
| Existing demonstrations | `/demos/<existing-slug>/` | Existing English equivalent where available |

Do not publish empty legal or service pages. Complete each page's content before adding
it to navigation. Preserve existing homepage anchors such as `#services`, `#projets`,
`#methode`, `#conformite`, `#tarifs` and `#contact` as concise sections linking onward.

## 5. Service catalogue and evidence

| Offer | Visitor need | Relevant existing projects |
|---|---|---|
| Sites web | Present an organization, explain services and generate inquiries | ETS Financial; Kando; Cimenterie du Fleuve; Kimia |
| E-commerce & réservations | Let customers browse, order or reserve | Geno's & MAC&CLAY; Ndala Beauty; Kimia as a simulated booking journey |
| Applications métier | Organize recurring work, records and team workflows | Mac & Clay wedding tracker; distributor ordering; mining contractor portal |
| Hébergement & maintenance | Keep an existing site or application maintained | Link to documented delivery/support evidence; do not imply that a demo proves an operating monitoring service |

Each service page:

1. Who the service is for and the problem it addresses.
2. What the client receives, in practical language.
3. Two or three relevant project examples, each with its status.
4. The delivery stages and information the client supplies.
5. Indicative build price, recurring support, inclusions and exclusions.
6. A short FAQ.
7. A contact action carrying the chosen service into the inquiry.

Mobile money, bilingual content, mobile layouts and offline workflows are capabilities
within relevant offers. Describe which are implemented, simulated or proposed on each
project rather than suggesting they are universal.

## 6. Homepage sequence

1. **Clear introduction:** what IK builds, for whom, and where it works. Primary action
   to discuss a project; secondary action to browse work.
2. **Selected work:** three strong examples, with actual screenshots and visible
   client/demo labels. Lead with suitable client work; include a demo where it best
   demonstrates the offer. The full collection lives in Work.
3. **Choose a service:** four cards matching the service catalogue.
4. **How a project works:** brief summary linking to Our process.
5. **Budget and support:** a compact comparison linking to the relevant service details.
6. **Who you work with:** a short introduction linking to About.
7. **Contact:** WhatsApp and email, plus a clear project-inquiry action.

Move detailed deployment diagrams and operational explanations to the relevant pages.
Do not make an availability panel the main introduction. The current availability
labels are inferred from configured links, not an independent uptime-monitoring feed.

## 7. Work directory and project stories

Use one directory, keeping all current project URLs. Show client projects first, then
demonstrators, with labels on every card. Offer service-category filters and a separate
Client/Demonstrator filter. Filtering should enhance a complete, usable list.

Card content: screenshot, title, status, sector, one sentence about the work and
**Voir le projet / View project**. Avoid putting an entire technology list on cards.

Project-story order:

1. Title, client/demo status, short summary and main screenshot.
2. Client context or explicitly fictional scenario.
3. The problem and scope of IK's contribution.
4. Key user journeys, illustrated with two or three screens.
5. What can be inspected: live website, public demo, documented checks or approved quote.
6. Delivery and support details specific to this project.
7. Relevant services, followed by a project-specific inquiry button.

Client pages: lead with the production link when public. If a separate demo copy is
offered, label it explicitly. Demonstrator pages: lead with the demo link and explain
simulation boundaries. Do not present an indicative price as a client's actual invoice.

Reframe the original documents as internal concept briefs until rewritten against
verifiable implementations. They should not become three additional public client cases.

## 8. Language and contact behavior

- Every new portfolio page has an equivalent French and English page.
- Language switching preserves the page's purpose rather than returning to Home.
- Project links open the appropriate demo language when it exists. Mark French-only
  demos on English project pages.
- A demo's portfolio-return link should return to its project story in the chosen
  language, with the Work directory one step away.
- Service and project inquiry buttons carry that context into Contact or a prefilled
  WhatsApp message. Visitors can edit it before sending.
- Keep the existing mailto behavior explicit. Do not show a sent confirmation unless
  a future submission service actually accepts the inquiry.
- About should use confirmed identity, location and experience; no invented team,
  local office, certifications or testimonials.

## 9. Implementation sequence followed

1. Establish the route map and service-to-project assignments in content data.
2. Create the shared navigation and the Services and Work overview pages.
3. Reshape Home into the short introduction above, preserving its old anchors.
4. Add the four service pages using one consistent page structure.
5. Reorganize project stories and distinguish production links from demo copies.
6. Add Our process, About, Contact and completed footer/legal pages.
7. Verify both languages, inquiry context, mobile navigation and every existing demo URL.

Before publishing: no dead links, no language switch to an unrelated page, no incorrect
client/demo label, and no statement of operational results without supporting evidence.
The first review should show Home, Services and Work together, because those pages define
the visitor journey for the rest of the site.

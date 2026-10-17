# IK Digital Solutions — website

A static website: HTML, CSS and JavaScript generated from shared page templates and
bilingual content, deployed publicly on Vercel. Every portfolio page has an English equivalent.
Five client projects in production and six demonstrations, including three bilingual
multi-page sites, plus a demonstration copy of one client site. The portfolio and demos are public; linked production systems may require an account.
The design studies include Fieldstone Construction, an independently hosted concept for a fictional home-remodeling and rural-construction brand.
Client projects also include Fuel Fortress Lexington, with French and English portfolio stories linking to its English-language website.

**Public site:** https://iksolutions-inc.com/
**Vercel production:** https://ik-digital-solutions.vercel.app/
**Vercel project:** https://vercel.com/geno-s/ik-digital-solutions
**Repository:** https://github.com/raelpanga/ik-digital-solutions

Hosting moved to Vercel on 16 October 2026. Both custom domains are configured,
HTTPS is enabled, and GitHub Pages is disabled. GitHub retains the source repository.
Canonical public URLs omit `.html` and trailing slashes (except `/`). Vercel permanently
redirects old HTML addresses. The build normalizes links, assets, canonical URLs and the
sitemap through `site/urls.js`; physical files in `docs/` still end in `.html`.

## What the site contains

| Page | French | English |
|---|---|---|
| Home (selected work, services, process, budget and contact) | `/` | `/en` |
| Services overview and four offers | `services` | `en/services` |
| Work carousels for clients, demonstrators and studies, with service and kind filters | `projets` | `en/projects` |
| One page per project | `projets/<slug>` | `en/projects/<slug>` |
| Our process | `methode` | `en/process` |
| About | `a-propos` | `en/about` |
| Contact, preserving service/project inquiry context | `contact` | `en/contact` |
| Job posting for one field sales representative, with application form | `agents-commerciaux` | `en/sales-agents` |
| Legal notice and privacy | `mentions-legales`, `confidentialite` | `en/legal`, `en/privacy` |
| Single-page demo applications (5, French only) | `demos/<slug>` | same |
| Kando Ressources mining site (16 pages, bilingual) | `demos/kando-ressources` | `demos/kando-ressources/en` |
| Cimenterie du Fleuve site (18 pages, bilingual) | `demos/site-corporate` | `demos/site-corporate/en` |
| TRUTH Construction demonstration copy (13 pages, language toggle, noindex) | `demos/truth-construction` | `demos/truth-construction?lang=en` |
| Kimia Express delivery site (18 pages, bilingual) | `demos/kimia-express` | `demos/kimia-express/en` |

Demo routes: `kimia-express` (bilingual delivery site, replaced the pharmacy demo), `ndala-beauty`
(skincare shop, replaced the school demo), `commande-distributeur`, `portail-sous-traitant`,
`site-corporate`, `kando-ressources`, `genos-rentals`, `macclay-wedding-tracker`. The replaced demo
sources are kept in `demos/archive/` and are not published.

Images for the demos live in `demos/assets/<slug>/` and are copied to
`docs/demos/assets/`. The new Kimia site copies photos from `demos/sites/kimia/img/`
and recolours the project's SVG illustrations into `docs/demos/kimia-express/img/`.
Photo credits appear in each page footer; `raw/` originals are ignored by git.
Ndala uses the SVG set only, with
labels translated to French and four extra jars generated to match.

Every demo uses fictitious data and simulated payments, SMS, e-mails and Shopify, and says
so in its banner. Client project pages describe only what the repositories and live
sites show. Their main button opens the production address; any demonstration copy is
labelled separately. A client project with no `liveUrl` publishes no production link: its
page leads with the demonstration instead. Each Work carousel card opens the project story with a View project button. Demonstrator project pages lead with the demo link. English pages
open English demos where available and identify French-only examples.

The navigation follows **Services → Work → a relevant example → Contact**. Pricing is
part of Services; delivery and security are explained under Our process. Existing
homepage anchors and every existing project/demo route are preserved. Demo return links
lead to the corresponding project story, in the selected language for bilingual demos.

Each Work group is a continuously moving horizontal ribbon of project cards. The flow loops
at a constant speed and supports native touch swiping, mouse dragging, keyboard navigation,
project selectors and previous/next buttons. Motion runs only while the carousel is in view;
hover pauses it temporarily, and interaction pauses it until Play is selected. Visual copies
make the wrap seamless and are excluded from the keyboard and screen-reader sequence.
Reduced-motion preferences disable automatic motion. Without JavaScript, all projects remain
available in horizontally scrollable tracks.

## How it is built

| Path | Role |
|---|---|
| `assets/content.js` | Company config, bilingual project stories, demo paths and card colours. Also retains legacy homepage copy. |
| `site/content.js` | Paired FR/EN routes, service descriptions, project-to-service assignments and labels. |
| `site/pages.js` | Shared layout and page rendering for Home, Services, Work, project stories and supporting pages. |
| `site/expansion.js` | The five services without a showcase project yet: mobile apps, AI & automation, audit & advice, modernisation & integrations, team augmentation. Each entry carries a `panel` shown where project examples would go, plus its short card promise. |
| `site/tech.js` | The technology names and icon paths used by the scrolling band. Icons come from Simple Icons (CC0) on a 24×24 grid; add or remove a line and rebuild to change the band. |
| `build.js` | Validates source dependencies, generates `docs/`, runs registered demo generators and writes the sitemap. |
| `assets/style.css`, `assets/site.js`, `assets/favicon.svg` | Stylesheet, mobile navigation, progressive project filters, contact form delivery through Web3Forms, WhatsApp message preparation and icon. |
| `shots/` | Screenshots used on the cards. Copied into `docs/shots/`. |
| `demos/src/<slug>.html` | Demo sources (head + body fragment). Wrapped into `docs/demos/<slug>/index.html`. |
| `demos/sites/<name>/` | Bilingual demo generators and assets; public route mapping in `build.js`. |
| `docs/` | The generated site. Vercel builds and serves this folder. Do not edit by hand. |
| `site/urls.js` | Finalizes public URLs while preserving external destinations, fragments and query strings. |
| `tools/static-server.js` | Serves clean URLs and legacy redirects for local browser tests. |
| `vercel.json` | Vercel's build command, output folder and URL settings. |
| `.vercelignore` | Excludes generated output, local drafts and development-only files from CLI uploads. |
| `check.js` | Syntax-checks inline scripts: `node check.js demos/src/*.html`. |
| `verify-site.js` | Browser checks for navigation, paired languages, links, filters, inquiry context, demo returns and mobile overflow. |
| `tojpg.js` | Converts a PNG screenshot to JPEG through headless Chrome. |
| `src/page.html`, `assets/app.js` | The earlier single-page version used for claude.ai previews. Not part of the site. |

## Updating the site

1. Edit the relevant content or template in `site/`, `assets/content.js`, or a demo source.
2. Run `node build.js --base-url https://iksolutions-inc.com/` for the current custom domain.
3. Run `node verify-site.js` and `node verify-kimia.js` (Playwright and Google Chrome required;
   set `NODE_PATH` to the installed package directory if needed). `verify-site.js --screenshots`
   saves desktop/mobile review images in the OS temporary directory under `ik-architecture-preview/`.
4. Commit and push:

```bash
git add -A
git commit -m "Update"
git push
```

Vercel builds and publishes pushes to `main` through the connected GitHub repository.
GitHub stores the source; Vercel hosts the website. The framework preset is **Other**,
the build command is `node build.js --base-url https://iksolutions-inc.com/`,
the output directory is `docs`, and no dependency installation is required.
Existing `.html` and directory URLs are preserved.

For a manual production deployment from a linked checkout:

```bash
vercel deploy --prod --scope geno-s
```

Keep `.vercel/` and `.env*` local and untracked.

## SEO

The site targets searches made in the DR Congo, in French first. The pieces:

- **Titles and descriptions.** Each service carries a `seo` block (`fr`/`en` `title`,
  `description`, `intro`) next to its copy in `site/content.js`, `site/integrations.js` and
  `site/expansion.js`; the `intro` sentence is shown under the page lead and names Kinshasa,
  Lubumbashi and the DRC. The other routes read `pageSeo` in `site/content.js`. Project pages
  use the tagline, or "Title · Sector. First problem sentence" when the tagline is short;
  concept titles add their sector. `<title>` is the SEO title plus " · IK Digital Solutions".
  `verify-site.js` enforces titles of at most 70 characters before the suffix, descriptions
  of 50 to 160 characters, and no duplicate description within a language.
- **Head tags.** Canonical, `hreflang` fr/en plus `x-default` (French), `og:url`,
  `og:site_name`, `og:locale`, a Twitter card, and the Search Console tag when
  `config.googleSiteVerification` is set. When `config.googleSiteVerificationFile` names a
  `google….html` file, `build.js` writes it to the site root with the body Google expects
  (the "HTML file" method). The build throws if the name does not look like a Google token.
- **Structured data.** `site/seo.js` writes one JSON-LD graph per page: the studio as a
  `ProfessionalService` serving the DRC (Kinshasa, Lubumbashi), the `WebSite`, the `WebPage`,
  breadcrumbs on service and project pages, a `Service` and the two FAQs on each service
  page, the ten FAQs on the services index, and a `JobPosting` on the recruiting page. By
  the owner's decision the posting states no pay, so it carries no salary; set
  `config.agentsPostedOn` to `""` once the position is filled and the node disappears.
  All URLs are the clean public addresses.
- **Indexing scope.** Every demonstration page is `noindex` (added by `build.js` after
  generation) and absent from the sitemap, which lists the portfolio pages only.
  `robots.txt` must keep allowing `/demos/`: a blocked page cannot show its `noindex`.
  The 404 page is `noindex` without a canonical.
- **No analytics.** The privacy page promises no audience measurement; do not add a tag
  manager or analytics script.

Google Search Console, once:

1. Add a URL-prefix property for `https://iksolutions-inc.com/`. With the HTML file method,
   put the file name Google gives you (`google….html`) in `config.googleSiteVerificationFile`;
   with the HTML tag method, put the tag's `content` value in `config.googleSiteVerification`.
2. Rebuild, commit and push. Vercel publishes within a minute. Note that clean URLs redirect
   `/google….html` to `/google…` with a 308; the file body is served at both addresses.
3. Click Verify in Search Console, then Sitemaps → submit `https://iksolutions-inc.com/sitemap.xml`.
4. Check a few pages with the Rich Results Test (https://search.google.com/test/rich-results)
   and https://validator.schema.org/. Warnings about a missing street address or salary are
   expected; errors are not.

## Adding a project

Copy a project object in `assets/content.js`. Fields: `slug`, `status` ("client" or
"demo"), `demoUrl` (a relative demo path like `demos/x/` or an external URL), optional
`demoUrls` (language-specific demo URLs, for example `{ fr: "demos/x/", en: "demos/x/en/" }`),
`liveUrl` (production address, the primary link for client projects), `color`, `domain`, optional
`shotExt`, `note`, `s3Label`, then `stack`, `timeline`, `price`, `monthly`,
and `fr` / `en` blocks with `title`, `sector`, `tagline`, `problem`, `built`, `congo`,
`deploy`, `monitor`. Add two screenshots to `shots/` named `<slug>-desktop.png` and
`<slug>-mobile.png`. Assign the slug to one or more services in `site/content.js`;
add it to an offer's `examples` when appropriate, then rebuild. A new portfolio page
needs paired routes and nav labels in `site/content.js`, a renderer registered in
`renderers` in `site/pages.js` (plus both nav arrays there if it is a header item) and,
for a header item, the `#main-nav a` count in `verify-site.js`.

## Screenshots

Kimia's repeatable browser verification and card capture (requires Playwright and
Google Chrome; `NODE_PATH` can point to the installed Playwright package directory):

```bash
node build.js --base-url https://iksolutions-inc.com/
node verify-kimia.js --screenshots
node build.js --base-url https://iksolutions-inc.com/
```

The check serves `docs` locally, follows all 18 FR/EN language switches, checks page,
asset and fragment links, exercises simulated booking/tracking and filters, and checks
mobile navigation and overflow. Screenshots use real 1280 × 800 and 430 × 900 browser
viewports. The final build copies both new card images from `shots/` into `docs/shots/`.

## Contact form: Web3Forms

The contact page and the field sales application page (`agents-commerciaux.html`) post to
Web3Forms (`https://api.web3forms.com/submit`), which delivers each message by e-mail to
the address in `config.email`. There is no server in this repository and nothing is stored
on the site.

1. Create an access key at https://web3forms.com using `consultation@iksolutions-inc.com`.
   The key arrives by e-mail at that address.
2. Paste it into `config.web3formsKey` in `assets/content.js`. The key is designed to be
   public: it only identifies the inbox that receives the form.
3. Rebuild. `build.js` warns while the key is empty, and the live form then shows an error
   with the e-mail address and WhatsApp as fallbacks.

With JavaScript, the shared `wireWeb3Form` helper in `assets/site.js` sends the fields as
JSON and shows the result inline. Subjects: "Projet : <company or name>" for inquiries and
"Candidature commercial(e) terrain : <name> · <city>" for applications; the visitor's e-mail, when given, is
the reply-to. `build.js` trims the key.
Without JavaScript the form posts directly and Web3Forms shows its own confirmation page.
The hidden `botcheck` checkbox is the Web3Forms honeypot. `verify-site.js` intercepts the
endpoint, so test runs never deliver anything.

## Custom domain: iksolutions-inc.com (GoDaddy)

Vercel's recommended DNS records for this project (checked 16 October 2026).
Keep the domain registered at GoDaddy and leave every mail record untouched:

| Type | Name | Data |
|---|---|---|
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | 35e47ffddb1b5bd6.vercel-dns-017.com |

The two A records above replace the four legacy GitHub Pages `185.199.x.153`
records; `www` no longer points to `raelpanga.github.io`. Keep the existing
nameservers, MX, SPF, DKIM and DMARC. Both domains are attached to the Vercel production project;
`www` redirects permanently to `iksolutions-inc.com`.

```bash
vercel domains verify iksolutions-inc.com --scope geno-s
vercel domains verify www.iksolutions-inc.com --scope geno-s
```

GitHub Pages is disabled and its legacy `docs/CNAME` file has been removed.
The repository and its history stay on GitHub. Vercel does not use a `CNAME` file.

## Multi-page demo sites (`demos/sites/`)

Larger demos that need several pages live in `demos/sites/<name>/` with their own
generator, registered in `build.js` under `SITE_SLUGS`. The generator receives French
and English project-return paths through `portfolioHome` and `portfolioHomeEn`:

- `demos/sites/kimia/` — **Kimia Express**, a fictitious delivery company serving 12
  DRC cities. `build-kimia.js`, `content.js`, `lib.js` and `pages-1.js` through
  `pages-3.js` generate 18 pages under the existing `docs/demos/kimia-express/`
  route: home, send, track, pricing, business, network, couriers, help and about,
  in French and English (`en/`). Each language switch opens the equivalent page.
  `style.css`, `site.js`, generated `data.js`, photos and recoloured illustrations
  accompany the pages. The portfolio's English project page opens the English demo.
  The old single-page source is retained at `demos/archive/kimia-express-v1.html`.
- `demos/sites/kando/` — **Kando Ressources SA**, a fictitious copper-cobalt producer in
  Lualaba. `content.js` holds all text (FR + EN), figures, leaders, news, jobs, documents
  and photo credits; `build-kando.js` generates 16 pages (8 French at the root, 8 English
  under `en/`) into `docs/demos/kando-ressources/`; `style.css`, `site.js` and `img/` are
  copied alongside. Structure follows the major-miner pattern: Who we are, What we do,
  Investors (production table, report library, calendar, EITI payments), Sustainability
  (indicators, environment, community programmes, consultation, mineral origin, grievance
  mechanism with reference numbers), News (searchable archive), Careers (filterable jobs,
  application), Contact. To deliver it to a client: replace the figures in `content.js`,
  drop their PDFs into a `docs/` folder and point the `data-doc` links at them, remove the
  demonstrator bar in `build-kando.js`, and rebuild.
- `demos/sites/fleuve/` — **Cimenterie du Fleuve SA**, a fictitious cement producer in
  Matadi, Kongo Central. Same pattern (`content.js`, `build-fleuve.js`, `style.css`,
  `site.js`, `img/`), published as `docs/demos/site-corporate/` (the slug map is in
  `build.js`). 18 pages: home, Who we are, Products (five datasheets with spec tables),
  Sites & logistics (schematic map, outlets table), Sustainability & safety (indicators,
  grievance mechanism), News, Careers, Suppliers (tender table filterable by state,
  registration form), Contact (quote request, opening hours, legal notice) plus a consent
  banner. Its own identity: Archivo / Source Sans 3 / IBM Plex Mono, river blue and safety
  yellow. The previous single-page version is kept in `demos/archive/site-corporate-v1.html`.

- `demos/sites/truth/` — **TRUTH Construction & Development**, a *real* client, unlike the
  demos above. By choice, the portfolio links only this demonstration copy and never the
  production site: the project sets no `liveUrl`, so its page and card open the copy, and it
  supplies its own `transparencyNote` because the shared client sentence refers to an
  address shown on the page. `snapshot/` is the client's own build output, copied unchanged
  by `sync.js`, so the client's repository carries no portfolio code. `build-truth.js` adds
  only what a copy on this domain needs: `noindex` on every page (a full copy of a real
  company's site must not compete with it in search; the canonicals already name the live
  site), no schema.org business record, and a fixed `.ikbar` at the bottom (the client's
  homepage header is fixed to the top). `site.js` intercepts WhatsApp, `tel:`, `mailto:` and
  the copy-address button, showing a notice instead, so visitors never contact the client by
  accident; it also reads `?lang=en` so the English project page opens the copy in English.
  The copy is left out of the sitemap like every other demonstration (see SEO), and the project
  sets `exploreNote` because the generic sentence about demonstration copies using fictional
  data is untrue here. To refresh it after the client site changes:

```bash
node demos/sites/truth/sync.js "../../contr/truth-construction-codex/truth-construction/dist"
node build.js --base-url https://iksolutions-inc.com/ --cname iksolutions-inc.com
```

Mobile card screenshots: headless Chrome will not open a window narrower than about 500 px,
so a plain `--window-size=430,900` shot is a crop of a 504 px layout. Use
`node mshot.js docs/demos/<slug>/index.html shots/<slug>-mobile.png 900`, which frames the
page in a 430 px iframe first.

## Visual presentation — September 2026

The portfolio now uses a photographic Kinshasa hero, large desktop/mobile project
compositions, short benefit-led service cards and a visible founder introduction.
The editorial direction draws on Kava and VegaTech; all project captures are IK's
own work or labelled demonstrations. Competitor projects and images are not reused.

- `site/visual.js`: homepage, concise project labels, illustrated services,
  Six service offers with tailored proposals, ten FAQs and the bilingual DRC scoping guide.
- `assets/visual.css`: responsive presentation shared by portfolio pages.
- `assets/media/`: optimized local photography and source/license record.
- `guides/construire-pour-la-rdc.html` and
  `en/guides/building-for-the-drc.html`: mobile money, offline planning and Digital
  Code questions, with official source links and project-specific legal validation.

The generator produces 82 portfolio pages and 86 demo pages (13 of them the TRUTH copy), plus the 404 page.
Existing demo and project URLs remain stable. Photo credits appear on the legal
pages. Testimonials, a real founder portrait and measured client outcomes require
approved source material; no placeholder quotes or invented results are published.

## Original case-study material

The three original case studies and the zip in the parent folder still contain invented
figures. Nothing on the site uses them.

### Connected services and expanded gallery

The homepage opens on the hero and a strip of client links, then a looping CSS sequence that shows one wireframe being sketched, structured, designed and published — no video, no added request. The work page sorts its seventeen entries by what each one is — three client systems, six demonstrators, eight design studies — and offers progressive filters by kind and by service, deep-linkable through `?kind=` and `?service=`. Every card carries a status badge and, on the work page, a direct link to the production site or the published build; individual case studies retain accurate explanations of simulated operations. Public service prices are replaced with scope and tailored-proposal copy. New paired service pages cover mobile-money integration and WhatsApp Business automation. `site/integrations.js` owns these services and illustrative workflows. Brand images are local, credited in `assets/media/README.md`, and do not imply partnerships. Motion respects reduced-motion preferences; content remains visible without JavaScript.

### Photography-led industry studies

Eight distinct restaurant, property, healthcare, education, legal, construction, hotel and retail studies live in `demos/sites/concepts/`. `pages.js` defines the individual layouts; `style.css` supplies their separate art directions; `site.js` provides local interactions. All sixteen FR/EN routes use real, locally hosted WebP photography, with credits in `img/sources.json` and each page footer. See `planning/concept-redesign.md` for references and design decisions. Run `node verify-concepts.js --screenshots` to validate the studies and regenerate desktop/mobile cards, then rebuild `docs` and run `node verify-site.js`.

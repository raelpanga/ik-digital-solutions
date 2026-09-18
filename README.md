# IK Digital Solutions — website

A static website: HTML, CSS and JavaScript generated from shared page templates and
bilingual content, hosted publicly on GitHub Pages. Every portfolio page has an English equivalent.
Three client projects in production and six demonstrations, including three bilingual
multi-page sites. The portfolio and demos are public; linked production systems may require an account.

**Public site:** https://iksolutions-inc.com/
**Repository:** https://github.com/raelpanga/ik-digital-solutions

## What the site contains

| Page | French | English |
|---|---|---|
| Home (selected work, services, process, budget and contact) | `index.html` | `en/index.html` |
| Services overview and four offers | `services/` | `en/services/` |
| Work directory, with service and client/demo filters | `projets/` | `en/projects/` |
| One page per project (9) | `projets/<slug>.html` | `en/projects/<slug>.html` |
| Our process | `methode.html` | `en/process.html` |
| About | `a-propos.html` | `en/about.html` |
| Contact, preserving service/project inquiry context | `contact.html` | `en/contact.html` |
| Legal notice and privacy | `mentions-legales.html`, `confidentialite.html` | `en/legal.html`, `en/privacy.html` |
| Single-page demo applications (5, French only) | `demos/<slug>/` | same |
| Kando Ressources mining site (16 pages, bilingual) | `demos/kando-ressources/` | `demos/kando-ressources/en/` |
| Cimenterie du Fleuve site (18 pages, bilingual) | `demos/site-corporate/` | `demos/site-corporate/en/` |
| Kimia Express delivery site (18 pages, bilingual) | `demos/kimia-express/` | `demos/kimia-express/en/` |

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
labelled separately. Demonstrator project pages lead with the demo link. English pages
open English demos where available and identify French-only examples.

The navigation follows **Services → Work → a relevant example → Contact**. Pricing is
part of Services; delivery and security are explained under Our process. Existing
homepage anchors and every existing project/demo route are preserved. Demo return links
lead to the corresponding project story, in the selected language for bilingual demos.

## How it is built

| Path | Role |
|---|---|
| `assets/content.js` | Company config, bilingual project stories, demo paths and card colours. Also retains legacy homepage copy. |
| `site/content.js` | Paired FR/EN routes, service descriptions, project-to-service assignments and labels. |
| `site/pages.js` | Shared layout and page rendering for Home, Services, Work, project stories and supporting pages. |
| `site/expansion.js` | The five services without a showcase project yet: mobile apps, AI & automation, audit & advice, modernisation & integrations, team augmentation. Each entry carries a `panel` shown where project examples would go, plus its short card promise. |
| `site/tech.js` | The technology names and icon paths used by the scrolling band. Icons come from Simple Icons (CC0) on a 24×24 grid; add or remove a line and rebuild to change the band. |
| `build.js` | Validates source dependencies, generates `docs/`, runs registered demo generators and writes the sitemap. |
| `assets/style.css`, `assets/site.js`, `assets/favicon.svg` | Stylesheet, mobile navigation, progressive project filters, local email/WhatsApp preparation and icon. |
| `shots/` | Screenshots used on the cards. Copied into `docs/shots/`. |
| `demos/src/<slug>.html` | Demo sources (head + body fragment). Wrapped into `docs/demos/<slug>/index.html`. |
| `demos/sites/<name>/` | Bilingual demo generators and assets; public route mapping in `build.js`. |
| `docs/` | The generated site. GitHub Pages serves this folder. Do not edit by hand. |
| `check.js` | Syntax-checks inline scripts: `node check.js demos/src/*.html`. |
| `verify-site.js` | Browser checks for navigation, paired languages, links, filters, inquiry context, demo returns and mobile overflow. |
| `tojpg.js` | Converts a PNG screenshot to JPEG through headless Chrome. |
| `src/page.html`, `assets/app.js` | The earlier single-page version used for claude.ai previews. Not part of the site. |

## Updating the site

1. Edit the relevant content or template in `site/`, `assets/content.js`, or a demo source.
2. Run `node build.js --base-url https://iksolutions-inc.com/ --cname iksolutions-inc.com` for the current custom domain.
3. Run `node verify-site.js` and `node verify-kimia.js` (Playwright and Google Chrome required;
   set `NODE_PATH` to the installed package directory if needed). `verify-site.js --screenshots`
   saves desktop/mobile review images in the OS temporary directory under `ik-architecture-preview/`.
4. Commit and push:

```bash
git add -A
git commit -m "Update"
git push
```

GitHub Pages republishes within about a minute.

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
needs paired routes in `site/content.js` and a renderer in `site/pages.js`.

## Screenshots

Kimia's repeatable browser verification and card capture (requires Playwright and
Google Chrome; `NODE_PATH` can point to the installed Playwright package directory):

```bash
node build.js --base-url https://iksolutions-inc.com/ --cname iksolutions-inc.com
node verify-kimia.js --screenshots
node build.js --base-url https://iksolutions-inc.com/ --cname iksolutions-inc.com
```

The check serves `docs` locally, follows all 18 FR/EN language switches, checks page,
asset and fragment links, exercises simulated booking/tracking and filters, and checks
mobile navigation and overflow. Screenshots use real 1280 × 800 and 430 × 900 browser
viewports. The final build copies both new card images from `shots/` into `docs/shots/`.

## Custom domain: iksolutions-inc.com (GoDaddy)

DNS records at GoDaddy (leave every mail record untouched):

| Type | Name | Data |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | raelpanga.github.io |

Delete the existing `A @ WebsiteBuilder Site` record and change the existing `www`
CNAME (it currently points to the apex). Then, once `nslookup iksolutions-inc.com`
returns a 185.199.x.153 address, set the custom domain on GitHub (Settings → Pages →
Custom domain → `iksolutions-inc.com`, then tick Enforce HTTPS after the certificate is
issued) and rebuild with the CNAME file:

```bash
node build.js --base-url https://iksolutions-inc.com/ --cname iksolutions-inc.com
git add -A && git commit -m "Custom domain" && git push
```

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

The generator produces 48 portfolio pages and 57 demo pages, plus the 404 page.
Existing demo and project URLs remain stable. Photo credits appear on the legal
pages. Testimonials, a real founder portrait and measured client outcomes require
approved source material; no placeholder quotes or invented results are published.

## Original case-study material

The three original case studies and the zip in the parent folder still contain invented
figures. Nothing on the site uses them.

### Connected services and expanded gallery

The homepage highlights three client projects. The work page organizes nine existing projects and eight original industry studies. Cards and project headings omit status badges; individual case studies retain accurate explanations of simulated operations. Public service prices are replaced with scope and tailored-proposal copy. New paired service pages cover mobile-money integration and WhatsApp Business automation. `site/integrations.js` owns these services and illustrative workflows. Brand images are local, credited in `assets/media/README.md`, and do not imply partnerships. Motion respects reduced-motion preferences; content remains visible without JavaScript.

### Photography-led industry studies

Eight distinct restaurant, property, healthcare, education, legal, construction, hotel and retail studies live in `demos/sites/concepts/`. `pages.js` defines the individual layouts; `style.css` supplies their separate art directions; `site.js` provides local interactions. All sixteen FR/EN routes use real, locally hosted WebP photography, with credits in `img/sources.json` and each page footer. See `planning/concept-redesign.md` for references and design decisions. Run `node verify-concepts.js --screenshots` to validate the studies and regenerate desktop/mobile cards, then rebuild `docs` and run `node verify-site.js`.

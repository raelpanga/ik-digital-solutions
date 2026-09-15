# IK Digital Solutions — website

A real static website: HTML, CSS and JavaScript pages generated from one content file,
hosted publicly on GitHub Pages. French first, with a full English copy of every page.
Three client projects in production and six demonstrations, including three bilingual
multi-page sites. No sign-in anywhere.

**Public site:** https://raelpanga.github.io/ik-digital-solutions/
**Repository:** https://github.com/raelpanga/ik-digital-solutions

## What the site contains

| Page | French | English |
|---|---|---|
| Home (services, proofs, projects, method, compliance, pricing, contact) | `index.html` | `en/index.html` |
| One page per project (9) | `projets/<slug>.html` | `en/projects/<slug>.html` |
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
sites show, and link to the real production address as a secondary button.

## How it is built

| Path | Role |
|---|---|
| `assets/content.js` | **All text** (FR + EN), company config, project list, demo paths, card colours. Edit this. |
| `build.js` | Generates the whole site into `docs/`. Run `node build.js --base-url https://raelpanga.github.io/ik-digital-solutions/`. |
| `assets/style.css`, `assets/site.js`, `assets/favicon.svg` | Stylesheet, page script (live metrics, contact form), icon. Copied into `docs/assets/`. |
| `shots/` | Screenshots used on the cards. Copied into `docs/shots/`. |
| `demos/src/<slug>.html` | Demo sources (head + body fragment). Wrapped into `docs/demos/<slug>/index.html`. |
| `demos/sites/<name>/` | Bilingual demo generators and assets; public route mapping in `build.js`. |
| `docs/` | The generated site. GitHub Pages serves this folder. Do not edit by hand. |
| `check.js` | Syntax-checks inline scripts: `node check.js demos/src/*.html`. |
| `tojpg.js` | Converts a PNG screenshot to JPEG through headless Chrome. |
| `src/page.html`, `assets/app.js` | The earlier single-page version used for claude.ai previews. Not part of the site. |

## Updating the site

1. Edit `assets/content.js`, a demo in `demos/src/`, or a multi-page site in `demos/sites/`.
2. Run `node build.js --base-url https://iksolutions-inc.com/ --cname iksolutions-inc.com` for the current custom domain.
3. Commit and push:

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
`liveUrl` (production address, shown as a secondary button), `color`, `domain`, optional
`shotExt`, `openLabel`, `note`, `s3Label`, then `stack`, `timeline`, `price`, `monthly`,
and `fr` / `en` blocks with `title`, `sector`, `tagline`, `problem`, `built`, `congo`,
`deploy`, `monitor`. Add two screenshots to `shots/` named `<slug>-desktop.png` and
`<slug>-mobile.png`, then rebuild.

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
generator, run automatically by `build.js`:

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

## Old material

The three original case studies and the zip in the parent folder still contain invented
figures. Nothing on the site uses them.

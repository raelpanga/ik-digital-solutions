# IK Digital Solutions — Portfolio site and live demos

Static, dependency-free portfolio plus one real client site and five working demo
applications. French first, English toggle on the portfolio. Every project card shows a
real screenshot of the site inside a browser frame and a phone frame. Demos are labelled
"Démonstrateur" and use fictitious businesses with sample data and a visible mobile money
sandbox. The client site is labelled "Client" and links to the live address. No usage,
revenue or impact figure appears anywhere.

## Live links (claude.ai artifacts)

| Page | URL |
|---|---|
| Portfolio | https://claude.ai/code/artifact/4dfc22de-e0d3-4c18-8057-3ba550ff55c3 |
| Geno's & MAC&CLAY demo with mock data (real production app is at style.macandclay.com, staff login) | https://claude.ai/code/artifact/617e0f0f-ef31-4abc-86ef-c400515f29c6 |
| Mac & Clay wedding tracker demo with mock data (real production tool is at weddings.macandclay.com, staff login) | https://claude.ai/code/artifact/a68bed8c-48a0-4c4a-a859-4a3f24f2dd61 |
| ETS Financial Services (real client, live site) | https://www.etsfinancialdrc.com/ |
| BusinessHub (PME boutique + gérant) | https://claude.ai/code/artifact/50a31628-6159-4720-be63-aef175a94adf |
| Commande & Encaissement Distributeur | https://claude.ai/code/artifact/9b732d6f-0ddb-4f7a-9141-461a21dfb63d |
| Portail Sous-traitant Minier | https://claude.ai/code/artifact/0380bd7f-6243-49f7-8627-4ec5e25bb53a |
| Portail Scolaire & Frais | https://claude.ai/code/artifact/4521741a-ab58-4292-99b6-68ab0aaa7107 |
| Site Corporate & Hébergement Conforme | https://claude.ai/code/artifact/d9494fb2-ad1d-490d-8a29-736899f51223 |

Artifacts are private until shared. Before sending the portfolio to a prospect, open each
of the six artifact pages and use its share menu, otherwise the demo buttons will ask
visitors to sign in.

## Files

| Path | What it is |
|---|---|
| `index.html` | Deployable portfolio page (generated). Upload with `assets/` and `shots/`. |
| `src/page.html` | Portfolio source fragment. Edit, then run `build.sh`. |
| `assets/content.js` | All portfolio text (FR + EN), project list, company config, demo URLs, card colours. **Edit this most.** |
| `assets/app.js` | Portfolio rendering, hash routing, language toggle, live metrics, card mockups. |
| `assets/style.css` | Portfolio styling, light and dark, showcase cards. |
| `shots/<slug>-desktop.png` and `-mobile.png` (or `.jpg`) | Screenshots used in the cards and project pages. |
| `demos/src/<slug>.html` | Demo source fragments, one self-contained file each. |
| `demos/<slug>/index.html` | Deployable demo pages (generated). |
| `build.sh` | Wraps every fragment into a full HTML document. |
| `check.js` | Syntax-checks all inline scripts: `node check.js demos/src/*.html`. |
| `tojpg.js` | Converts a PNG screenshot to JPEG through headless Chrome: `node tojpg.js in.png out.jpg 1200`. |

## Company config

In `assets/content.js`, the `config` block holds the company name, founder, WhatsApp
number (international format, no "+"), e-mail and office location in both languages.

## Project entries

Each object in `projects` has: `slug`, `status` ("client" or "demo"), `demoUrl`, `color`
(card accent), `domain` (shown in the browser frame), optional `shotExt` ("jpg" when the
screenshots are JPEG), `stack`, `timeline`, `price`, `monthly`, and `fr` / `en` blocks with
`title`, `sector`, `tagline`, `problem`, `built`, `congo`, `deploy`, `monitor`.

Optional per-project fields for client work: `liveUrl` (the real production address,
shown as a secondary "Application en production" link), `openLabel` (primary button
text), `note` (shown under the buttons), `s3Label` (replaces the "Comment cela tient en
RDC" heading, used for projects outside the DRC). A client project with no public
`demoUrl` shows a "Application privée" pill and no button.

For the two staff-only apps, `demoUrl` points to a demo rebuilt with mock data
(`demos/src/genos-rentals.html`, `demos/src/macclay-wedding-tracker.html`) so a visitor
can walk through the real workflows: register a wedding, approve it, create an order at
the fitting, pay by simulated card; or take measurements, validate check-ins, send a pay
link and watch the simulated Shopify drafts update. The demo banners say the production
apps are in English and reserved for staff.

The three client entries describe only what the repositories and the live pages show:

- **Geno's & MAC&CLAY** (repo `raelpanga/Genos-s-Web-App-Project`): React + Vite +
  TypeScript front end on Vercel at style.macandclay.com, Express API on Railway,
  Supabase, Stripe, Twilio, SendGrid, Sentry, GitHub Actions CI. Dates and facts come
  from its AI_HANDOFF.md and DEPLOYMENT.md.
- **Mac & Clay wedding tracker** (repo `macandclay/mac-clay-wedding-tracker`): Next.js
  14 on Vercel at weddings.macandclay.com, Supabase, Resend, Twilio, Shopify sync.
- **ETS Financial Services** (repo `raelpanga/EST-webapp`): bilingual static site on
  Vercel, Web3Forms, Google Apps Script booking, security headers, accessibility work.

Ask each client before adding a quote or a named contact. Prices show "sur devis" and
timelines only what the docs state.

## Screenshots

Taken with headless Chrome. From `portfolio/` in Git Bash:

```bash
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
u="file:///$(cygpath -m "$PWD/demos/businesshub/index.html")"; u="${u// /%20}"
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,800 --virtual-time-budget=9000 \
  --user-data-dir="$TEMP/ik-shots" --screenshot="$(cygpath -w "$PWD/shots/businesshub-desktop.png")" "$u"
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=430,900 --virtual-time-budget=9000 \
  --user-data-dir="$TEMP/ik-shots" --screenshot="$(cygpath -w "$PWD/shots/businesshub-mobile.png")" "$u"
```

For a live site, pass its URL instead of the file URL. Photo-heavy sites produce large
PNGs; convert them with `node tojpg.js shots/x-desktop.png shots/x-desktop.jpg 1200` and
set `shotExt: "jpg"` on the project.

## What each demo does

- **BusinessHub**: three business templates (pharmacie, restaurant, quincaillerie), each
  with its own hero, hours and delivery zone. Customer view: catalogue, cart, mobile money
  sandbox, WhatsApp order preview. Manager view: orders, revenue, editable prices and stock.
- **Commande & Encaissement Distributeur**: welcome dashboard per retailer, promo band,
  three roles (détaillant, commercial, distributeur), offline switch that queues orders,
  stock check on validation, mobile money collection, reconciliation table.
- **Portail Sous-traitant Minier**: app-style home with site, team and counters; big
  icon buttons for incidents (with photo), 6-point inspections and clock-in; offline
  queue; recent entries; manager dashboard; PDF export via print.
- **Portail Scolaire & Frais**: school header and key facts, parent view by pupil code
  (sample codes shown), fee schedule, partial payment by mobile money with SMS receipt,
  announcements; direction dashboard; secretariat entry for cash or transfer.
- **Site Corporate**: bilingual static site for a fictitious cement company with hero
  illustration, values band, news, careers, tenders, supplier registration, consent
  banner and a Digital Code legal notice.

All demo state lives in the visitor's browser (localStorage). Each demo has a
"Réinitialiser la démo" button.

## Self-hosting instead of claude.ai

1. Run `bash build.sh`.
2. Upload `index.html`, `assets/`, `shots/` and `demos/` to your web host.
3. In `assets/content.js`, change each demo `demoUrl` to the relative path `demos/<slug>/`.
4. In each `demos/src/<slug>.html`, change the "Retour au portfolio" link to your domain,
   then rebuild.
5. Put Cloudflare in front, enable HTTPS, add an Uptime Kuma monitor per page.

## Old material

The three original case studies and the zip in the parent folder still contain invented
user counts and revenue figures. Nothing here uses them. Delete them or rewrite them as
demonstrator descriptions before sending any of them to a prospect.

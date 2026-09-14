# IK Digital Solutions — website

A real static website: HTML, CSS and JavaScript pages generated from one content file,
hosted publicly on GitHub Pages. French first, with a full English copy of every page.
Three client projects in production and seven demo applications, each demo a page of
the same site. No sign-in anywhere.

**Public site:** https://raelpanga.github.io/ik-digital-solutions/
**Repository:** https://github.com/raelpanga/ik-digital-solutions

## What the site contains

| Page | French | English |
|---|---|---|
| Home (services, proofs, projects, method, compliance, pricing, contact) | `index.html` | `en/index.html` |
| One page per project (8) | `projets/<slug>.html` | `en/projects/<slug>.html` |
| Demo applications (7, French only) | `demos/<slug>/` | same |

Demo pages: `businesshub`, `commande-distributeur`, `portail-sous-traitant`,
`portail-scolaire`, `site-corporate`, `genos-rentals`, `macclay-wedding-tracker`.

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
| `docs/` | The generated site. GitHub Pages serves this folder. Do not edit by hand. |
| `check.js` | Syntax-checks inline scripts: `node check.js demos/src/*.html`. |
| `tojpg.js` | Converts a PNG screenshot to JPEG through headless Chrome. |
| `src/page.html`, `assets/app.js` | The earlier single-page version used for claude.ai previews. Not part of the site. |

## Updating the site

1. Edit `assets/content.js` (or a demo in `demos/src/`).
2. Run `node build.js --base-url https://raelpanga.github.io/ik-digital-solutions/`.
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
`liveUrl` (production address, shown as a secondary button), `color`, `domain`, optional
`shotExt`, `openLabel`, `note`, `s3Label`, then `stack`, `timeline`, `price`, `monthly`,
and `fr` / `en` blocks with `title`, `sector`, `tagline`, `problem`, `built`, `congo`,
`deploy`, `monitor`. Add two screenshots to `shots/` named `<slug>-desktop.png` and
`<slug>-mobile.png`, then rebuild.

## Screenshots

From `portfolio/` in Git Bash, after building:

```bash
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
u="file:///$(cygpath -m "$PWD/docs/demos/businesshub/index.html")"; u="${u// /%20}"
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,800 --virtual-time-budget=9000 \
  --user-data-dir="$TEMP/ik-shots" --screenshot="$(cygpath -w "$PWD/shots/businesshub-desktop.png")" "$u"
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=430,900 --virtual-time-budget=9000 \
  --user-data-dir="$TEMP/ik-shots" --screenshot="$(cygpath -w "$PWD/shots/businesshub-mobile.png")" "$u"
```

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

## Old material

The three original case studies and the zip in the parent folder still contain invented
figures. Nothing on the site uses them.

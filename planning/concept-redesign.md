# Photography-led industry studies

## Direction

The original eight studies reused a geometric illustration and a split hero. This redesign uses eight explicit page compositions, appropriate content and interactions, and licensed photographs. These are fictional brands, not client commissions. The portfolio states this once in the collection introduction; each study also carries a concise disclosure and photo credits.

| Study | Art direction | Useful interaction |
| --- | --- | --- |
| Mama Kivu | Warm dining-room photograph, large serif, burgundy menu section | Filter the menu |
| Maison Kiro | White architectural journal, panorama and property search | Filter houses/apartments |
| Clinique Ubwiza | Patient conversation, teal care navigation, practical visit steps | Preview an appointment request |
| École Nkamba | Classroom collage, navy and warm paper, learning stages | Admissions disclosures and visit request |
| Cabinet Mbala | Monochrome office photograph, typographic index, restrained legal editorial | Expand practice areas |
| Bâtir Congo | Site photography, condensed industrial lettering, orange capability strip | Explore construction stages |
| Hôtel Azur | Immersive evening pool image, quiet serif, room photography | Choose a room for an enquiry |
| Atelier Commun | Furniture editorial, generous product imagery, natural materials | Filter and shortlist products |

## References studied

- [FYN](https://www.fynrestaurant.com/): dining atmosphere, menu and reservation priorities.
- [Pam Golding](https://www.pamgolding.co.za/): a property search followed by concrete listings.
- [Netcare](https://www.netcare.co.za/): patient-oriented service navigation.
- [Bishops](https://www.bishops.org.za/): school stages, admissions and school life.
- [SAOTA](https://www.saota.com/projects/): architectural images given room to communicate.
- [Singita](https://singita.com/lodges/): immersion followed by accommodation details.
- [Weylandts](https://www.weylandts.co.za/): collections, materials and interior photography.

These references informed priorities and composition; their assets and copy were not reused. Original portfolio work remains the context for navigation and case studies.

## Photography

Photographs are locally stored, optimized WebP files from Pexels. Exact original image URLs, source pages and licensing links are recorded in `demos/sites/concepts/img/sources.json`. The [Pexels license](https://www.pexels.com/license/) permits website use and modification. The people, buildings and objects are illustrative; no endorsement or ownership by these fictional brands is implied. Every generated study includes its own photo credits.

## Behavior and verification

French and English versions have matching sections and language links. Navigation works without JavaScript; optional controls add filtering, local selections and request previews. No request is sent or stored and no real reservation or payment occurs.

Run `node verify-concepts.js --screenshots` with Playwright available to check all sixteen routes, local assets and anchors, image decoding, language pairs, forms, menus and filters at desktop, 430 px and 320 px. It regenerates the sixteen French card captures. Rebuild after capture to copy them into `docs`. Run `node verify-site.js` for the surrounding portfolio.

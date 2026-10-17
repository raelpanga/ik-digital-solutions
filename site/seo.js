// Structured data and absolute public addresses for the portfolio pages.
// Every URL goes through publicPath: finalizeUrls never rewrites <script> text, so the
// JSON-LD must already carry the clean addresses that Vercel serves.
"use strict";
const { publicPath } = require("./urls");
const { routes } = require("./content");

module.exports = function createSeo(D, siteUrl) {
  const C = D.config, origin = (siteUrl || "").replace(/\/$/, "");
  const url = route => origin + publicPath("/" + route);
  const ORG = url("index.html") + "#organization", SITE = url("index.html") + "#website";
  const country = lang => ({ "@type": "Country", name: lang === "fr" ? "République démocratique du Congo" : "Democratic Republic of the Congo", alternateName: "CD" });
  const areaServed = lang => [country(lang), { "@type": "City", name: "Kinshasa" }, { "@type": "City", name: "Lubumbashi" }];
  const logoUrl = url("assets/apple-touch-icon.png");
  return {
    url,
    organization: (lang, description, image) => ({
      "@type": "ProfessionalService", "@id": ORG, name: C.company, url: url("index.html"),
      logo: { "@type": "ImageObject", url: logoUrl, width: 180, height: 180 }, image, description,
      email: C.email, telephone: "+" + C.whatsapp, founder: { "@type": "Person", name: C.founder },
      address: { "@type": "PostalAddress", addressRegion: "Kentucky", addressCountry: "US" },
      areaServed: areaServed(lang), availableLanguage: ["fr", "en"],
      contactPoint: { "@type": "ContactPoint", contactType: "sales", telephone: "+" + C.whatsapp, email: C.email, availableLanguage: ["fr", "en"], url: url(routes.contact[lang]) }
    }),
    website: () => ({ "@type": "WebSite", "@id": SITE, url: url("index.html"), name: C.company, inLanguage: ["fr", "en"], publisher: { "@id": ORG } }),
    webPage: ({ lang, route, title, description, image, breadcrumb }) => ({
      "@type": "WebPage", "@id": url(route), url: url(route), name: title, description, inLanguage: lang,
      isPartOf: { "@id": SITE }, about: { "@id": ORG }, primaryImageOfPage: image,
      ...(breadcrumb ? { breadcrumb: { "@id": url(route) + "#breadcrumb" } } : {})
    }),
    breadcrumbs: (route, items) => ({ "@type": "BreadcrumbList", "@id": url(route) + "#breadcrumb", itemListElement: items.map(([name, r], i) => ({ "@type": "ListItem", position: i + 1, name, item: url(r) })) }),
    service: ({ s, lang, route, description }) => ({ "@type": "Service", "@id": url(route) + "#service", name: s[lang].title, serviceType: s[lang].title, description, url: url(route), inLanguage: lang, provider: { "@id": ORG }, areaServed: areaServed(lang) }),
    faqPage: (route, pairs) => ({ "@type": "FAQPage", "@id": url(route) + "#faq", mainEntity: pairs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }),
    // By the owner's decision the posting states no pay: no baseSalary. validThrough is omitted; empty config.agentsPostedOn removes the node.
    jobPosting: ({ lang, route, title, description }) => ({
      "@type": "JobPosting", title, description, datePosted: C.agentsPostedOn, employmentType: "CONTRACTOR", url: url(route), directApply: true,
      hiringOrganization: { "@type": "Organization", "@id": ORG, name: C.company, url: url("index.html"), logo: logoUrl },
      jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "CD" } }, applicantLocationRequirements: country(lang)
    }),
    script: nodes => '<script type="application/ld+json">' + JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c") + "</script>"
  };
};

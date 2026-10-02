const SITE = "https://gustavoandrade.vercel.app";

// meta/OG em PT, igual ao <head> de cada HTML antigo
export function seo(title: string, description: string, path: string, image = "/assets/og-home.jpg") {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Gustavo Andrade" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:url", content: SITE + path },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: SITE + image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

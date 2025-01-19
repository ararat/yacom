import fs from "fs";
const globby = require("globby");

function addPage(page) {
  const path = page
    .replace("pages", "")
    .replace(".tsx", "")
    .replace(".md", "")
    .replace("posts", "/blog");

  const route = path === "/index" ? "" : path;
  const domain = process.env.WEBSITE_URL || "https://yuvalararat.com";
  return `  <url>
    <loc>${`${domain.trim()}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    "pages/**/*{.tsx,.mdx,.md}",
    "posts/**/*{.md,.mdx}",
    "!pages/_*.tsx",
    "!pages/blog/[*.tsx",
    "!pages/api",
  ]);
  //console.log(pages);
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(addPage).join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}
generateSitemap();

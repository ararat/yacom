import fs from "fs";
import { globby } from "globby";

const domain = (process.env.WEBSITE_URL || "https://yuvalararat.com").trim();

// Last-modified date: a post's front-matter date, otherwise the file's mtime.
function lastmod(file) {
  if (file.endsWith(".md") || file.endsWith(".mdx")) {
    const match = fs.readFileSync(file, "utf8").match(/^date:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})/m);
    if (match) return match[1];
  }
  return fs.statSync(file).mtime.toISOString().slice(0, 10);
}

function addPage(file) {
  const path = file
    .replace("pages", "")
    .replace(".tsx", "")
    .replace(".md", "")
    .replace("posts", "/blog");

  const route = path === "/index" ? "/" : path;
  const priority = route === "/" ? "1.0" : "0.6";
  return `  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${lastmod(file)}</lastmod>
    <priority>${priority}</priority>
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
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join("\n")}
</urlset>
`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}
generateSitemap();

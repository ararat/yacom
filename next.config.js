/** @type {import('next').NextConfig} */

module.exports = {
  // react-markdown and its remark/rehype/unified dependency tree ship as ESM-only
  // packages; Jest (via next/jest) can only transform node_modules packages that
  // are explicitly listed here.
  transpilePackages: [
    "@ungap/structured-clone", "bail", "ccount", "character-entities",
    "character-entities-html4", "character-entities-legacy",
    "character-reference-invalid", "comma-separated-tokens", "debug",
    "decode-named-character-reference", "dequal", "devlop", "entities",
    "escape-string-regexp", "estree-util-is-identifier-name", "extend",
    "hast-util-from-parse5", "hast-util-parse-selector", "hast-util-raw",
    "hast-util-to-jsx-runtime", "hast-util-to-parse5", "hast-util-whitespace",
    "hastscript", "html-url-attributes", "html-void-elements",
    "inline-style-parser", "is-alphabetical", "is-alphanumerical",
    "is-decimal", "is-hexadecimal", "is-plain-obj", "longest-streak",
    "markdown-table", "mdast-util-find-and-replace", "mdast-util-from-markdown",
    "mdast-util-gfm", "mdast-util-gfm-autolink-literal",
    "mdast-util-gfm-footnote", "mdast-util-gfm-strikethrough",
    "mdast-util-gfm-table", "mdast-util-gfm-task-list-item",
    "mdast-util-mdx-expression", "mdast-util-mdx-jsx", "mdast-util-mdxjs-esm",
    "mdast-util-phrasing", "mdast-util-to-hast", "mdast-util-to-markdown",
    "mdast-util-to-string", "micromark", "micromark-core-commonmark",
    "micromark-extension-gfm", "micromark-extension-gfm-autolink-literal",
    "micromark-extension-gfm-footnote", "micromark-extension-gfm-strikethrough",
    "micromark-extension-gfm-table", "micromark-extension-gfm-tagfilter",
    "micromark-extension-gfm-task-list-item", "micromark-factory-destination",
    "micromark-factory-label", "micromark-factory-space",
    "micromark-factory-title", "micromark-factory-whitespace",
    "micromark-util-character", "micromark-util-chunked",
    "micromark-util-classify-character", "micromark-util-combine-extensions",
    "micromark-util-decode-numeric-character-reference",
    "micromark-util-decode-string", "micromark-util-encode",
    "micromark-util-html-tag-name", "micromark-util-normalize-identifier",
    "micromark-util-resolve-all", "micromark-util-sanitize-uri",
    "micromark-util-subtokenize", "micromark-util-symbol",
    "micromark-util-types", "ms", "parse-entities", "parse5",
    "property-information", "react-markdown", "rehype-raw", "remark-gfm",
    "remark-parse", "remark-rehype", "remark-stringify",
    "space-separated-tokens", "stringify-entities", "style-to-js",
    "style-to-object", "trim-lines", "trough", "unified", "unist-util-is",
    "unist-util-position", "unist-util-stringify-position",
    "unist-util-visit", "unist-util-visit-parents", "vfile",
    "vfile-location", "vfile-message", "web-namespaces", "zwitch",
  ],
  env: {
    site_address: "https://yacom.pages.dev",
    WEBSITE_URL: "https://yuvalararat.com",
  },
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false },
  images: {
    loader: "imgix",
    path: "/",
  },
  output: "export",
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap.js");
    }
    return config;
  },
};

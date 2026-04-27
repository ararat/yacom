/** @type {import('next').NextConfig} */

module.exports = {
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
  // Next.js 16 uses Turbopack by default; declare empty config to silence
  // the "webpack config present but no turbopack config" error
  turbopack: {},
};

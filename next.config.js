/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    site_address: 'https://yacom.pages.dev',
    WEBSITE_URL: 'https://yuvalararat.com'
  },
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false, },
  images: {
    loader: 'imgix',
    path: '/',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap.js");
    }
    return config;
  },
}

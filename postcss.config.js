const isProduction = process.env.NODE_ENV === 'production'

// PurgeCSS runs only for production builds. It keeps a class only if its
// name appears literally in pages/ or components/, so never build class
// names at runtime (e.g. styles[`fx_${x}`]) or the styles get stripped.
const purgecss = [
    '@fullhuman/postcss-purgecss',
    {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    },
]

module.exports = {
    plugins: [
        'tailwindcss',
        ...(isProduction ? [purgecss] : []),
        'postcss-preset-env',
    ],
}

module.exports = {
    plugins: [
        // Tailwind's own content-based JIT purging (see tailwind.config.js `content`)
        // already removes unused classes, including arbitrary-value classes like
        // `min-h-[100svh]`. A second PurgeCSS pass here used a hand-written
        // extractor regex that didn't account for `[...]` arbitrary values, so it
        // silently stripped those classes from production builds only. Removing
        // the redundant pass avoids that class of dev/prod drift.
        'tailwindcss',
        'postcss-preset-env'
    ],
}
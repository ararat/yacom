import { Html, Head, Main, NextScript } from 'next/document'

/*
 * Runs before first paint:
 * - Adds the "dark" class for visitors who prefer dark mode, so blog pages
 *   don't flash light first (the theme provider only runs after hydration).
 * - Keeps the page visible when Adobe Target applies its body-hiding style.
 *   Launch loads after the page has painted, so pre-hiding can't prevent
 *   flicker here; it only blanks a page the visitor is already reading.
 */
const THEME_SCRIPT =
    "try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')}catch(e){}"
const KEEP_VISIBLE = 'body{opacity:1!important}'

export default function Document() {
    return (
        <Html className="scroll-smooth" lang="en">
            <Head>
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
                <style dangerouslySetInnerHTML={{ __html: KEEP_VISIBLE }} />
                <link rel="icon" href="/img/cropped-Avatar-2-32x32.png" sizes="32x32" />
                <link rel="icon" href="/img/cropped-Avatar-2-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="/img/cropped-Avatar-2-180x180.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html className="scroll-smooth" lang="en">
            <Head>

                <link rel="icon" href="img/cropped-Avatar-2-32x32.png" sizes="32x32" />
                <link rel="icon" href="img/cropped-Avatar-2-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="img/cropped-Avatar-2-180x180.png" />
                <link rel="preload" href="/img/yuval-ararat.png" as="image" />
                <link rel="preload" href="/img/blog/blog-thumbnail.jpeg" as="image" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
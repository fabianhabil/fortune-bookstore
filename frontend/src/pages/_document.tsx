import type { EmotionCache } from '@emotion/cache';
import type { EmotionCriticalToChunks } from '@emotion/server/create-instance';
import createEmotionServer from '@emotion/server/create-instance';
import type {
    AppPropsType,
    DocumentInitialProps,
    RenderPage
} from 'next/dist/shared/lib/utils';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { NextRouter } from 'next/router';
import { Children } from 'react';
import createEmotionCache from '@/styles/createEmotionCache';

// eslint-disable-next-line import/exports-last
export default class MyDocument extends Document {

    render(): JSX.Element {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='anonymous'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap'
                        rel='stylesheet'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
                        rel='stylesheet'
                    />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }

}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const originalRenderPage: RenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache: EmotionCache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    /* eslint-disable */
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) => (props: AppPropsType<NextRouter, {}>) =>
                <App emotionCache={cache} {...props} />
        });
    /* eslint-enable */

    const initialProps: DocumentInitialProps = await Document.getInitialProps(
        ctx
    );
    const emotionStyles: EmotionCriticalToChunks = extractCriticalToChunks(
        initialProps.html
    );
    const emotionStyleTags: JSX.Element[] = emotionStyles.styles.map(
        (style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(' ')}`}
                // eslint-disable-next-line react/no-unknown-property
                key={style.key}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        )
    );

    return {
        ...initialProps,
        styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
    };
};

import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/utils';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { FunctionComponent, PropsWithChildren } from 'react';
import createEmotionCache from '@/styles/createEmotionCache';
// eslint-disable-next-line import/extensions
import '@/styles/globals.css';
import theme from '@/styles/theme';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache: EmotionCache = createEmotionCache();

const MyApp: FunctionComponent<MyAppProps> = (props: PropsWithChildren<MyAppProps>) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;

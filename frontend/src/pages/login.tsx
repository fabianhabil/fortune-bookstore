import LoginPage from '@/components/template/Login/Login';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Login | Fortune Bookstore</title>
            </Head>
            <LoginPage />
        </>
    );
};
export default Home;

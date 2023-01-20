import RegisterPage from '@/components/template/Register/Register';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Fortune Bookstore | Register</title>
            </Head>
            <RegisterPage />
        </>
    );
};
export default Home;

import HomePage from '@/components/template/HomePage/HomePage';
import Layout from '@/components/template/Layout/Layout';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Fortune Bookstore</title>
            </Head>
            <HomePage />
        </>
    );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <>
            <Layout>{page}</Layout>
        </>
    );
};

export default Home;

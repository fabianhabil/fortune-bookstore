import Layout from '@/components/template/Layout/Layout';
import Transactions from '@/components/template/Transactions/Transactions';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Fortune Bookstore | Transactions</title>
            </Head>
            <Transactions />
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

import Dashboard from '@/components/template/Dashboard/Dashboard/Dashboard';
import Layout from '@/components/template/Layout/Layout';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Fortune Bookstore | Admin Dashboard</title>
            </Head>
            <Dashboard />
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

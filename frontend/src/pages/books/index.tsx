import BrowseBooks from '@/components/template/Books/BrowseBooks/BrowseBooks';
import Layout from '@/components/template/Layout/Layout';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Fortune Bookstore | Books</title>
            </Head>
            <BrowseBooks />
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

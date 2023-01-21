import ContentWrapper from '@/components/atoms/Layout/ContentWrapper/ContentWrapper';
import Head from 'next/head';
import Navbar from '@/components/template/Navbar/Navbar';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { getUserData, loading } = useContext(AuthContext)!;

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>Fortune Bookstore</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1'
                />
            </Head>
            {!loading ? (
                <>
                    <Navbar />
                    <ContentWrapper>{children}</ContentWrapper>
                </>
            ) : null}
        </>
    );
};

export default Layout;

import ContentWrapper from '@/components/atoms/Layout/ContentWrapper/ContentWrapper';
import Head from 'next/head';
import Navbar from '@/components/molecules/Navbar/Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1'
                />
            </Head>
            <Navbar />
            <ContentWrapper>{children}</ContentWrapper>
        </>
    );
};

export default Layout;

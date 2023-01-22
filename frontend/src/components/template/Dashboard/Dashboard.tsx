import ButtonMenu from '@/components/atoms/Dashboard/ButtonMenu/ButtonMenu';
import ToastError from '@/components/atoms/Toast/ToastError';
import type { ButtonMenuListTypes } from '@/components/constants/Dashboard/ButtonMenuList';
import { ButtonMenuList } from '@/components/constants/Dashboard/ButtonMenuList';
import BooksCategoryDashboard from '@/components/molecules/Dashboard/BooksCategoryDashboard/BooksCategoryDashboard';
import BooksDashboard from '@/components/molecules/Dashboard/BooksDashboard/BooksDashboard';
import PublisherDashboard from '@/components/molecules/Dashboard/PublisherDashboard/PublisherDashboard';
import TransactionDashboard from '@/components/molecules/Dashboard/TransactionDashboard/TransactionDashboard';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const DashboardPage = [
    <BooksDashboard key={1} />,
    <PublisherDashboard key={2} />,
    <BooksCategoryDashboard key={3} />,
    <TransactionDashboard key={4} />
];

const Dashboard = () => {
    const { isLoggedIn, userData } = useContext(AuthContext)!;
    const router = useRouter();
    const [renderMenu, setRenderMenu] = useState<number>(1);

    useEffect(() => {
        const loggedIn = isLoggedIn();
        // To access this page, need to loggedin and an admin
        if (!loggedIn && userData?.role !== 1) {
            ToastError('You are not authorized');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
    }, [isLoggedIn, router, userData?.role]);

    return (
        <>
            <Grid
                container
                direction='row'
                spacing={2}
                justifyContent='stretch'
            >
                <Grid item md={2} xs={12}>
                    <Grid
                        container
                        sx={{
                            borderRight: { md: '2px solid #eeeeef', xs: '' }
                        }}
                        spacing={0}
                    >
                        <Grid
                            container
                            sx={{
                                flexDirection: { md: 'column', xs: 'row' },
                            }}
                        >
                            {ButtonMenuList.map(
                                (data: ButtonMenuListTypes, index: number) => {
                                    return (
                                        <Grid
                                            item
                                            key={index}
                                            sx={{
                                                width: {
                                                    md: '100%',
                                                    xs: '50%'
                                                },
                                                p: { xs: 1, md: 0 },
                                                mb: { md: 2, xs: 0 }
                                            }}
                                        >
                                            <ButtonMenu
                                                title={data.title}
                                                onClick={() =>
                                                    setRenderMenu(
                                                        () => index + 1
                                                    )
                                                }
                                                active={
                                                    renderMenu === index + 1
                                                }
                                            />
                                        </Grid>
                                    );
                                }
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={10} xs={12}>
                    <Grid
                        container
                        sx={{ pt: { md: 0.7, xs: 1 } }}
                        direction='column'
                    >
                        <Grid item>
                            {DashboardPage.map(
                                (data: React.ReactNode, index: number) => {
                                    if (renderMenu === index + 1) {
                                        return data;
                                    }
                                }
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;

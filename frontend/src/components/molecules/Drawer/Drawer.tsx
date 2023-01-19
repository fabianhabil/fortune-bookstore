import NavbarLink from '@/components/atoms/Navbar/NavbarLink/NavbarLink';
import { Grid } from '@mui/material';
import { NavbarList } from '@/components/constants/Navbar/NavbarList';
import type { NavbarListTypes } from '@/components/constants/Navbar/NavbarList';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';

const Drawer = () => {
    const { isAuthenticated, userData } = useContext(AuthContext)!;

    return (
        <>
            <Grid container spacing={3}>
                {NavbarList.map((data: NavbarListTypes, index: number) => {
                    if (isAuthenticated) {
                        if (
                            data.href === '/dashboard' &&
                            userData?.role === 1
                        ) {
                            console.log(data.href);
                            return (
                                <Grid item key={index}>
                                    <NavbarLink {...data} />
                                </Grid>
                            );
                        }
                        if (
                            data.href !== '/login' &&
                            data.href !== '/register' &&
                            data.href !== '/dashboard'
                        ) {
                            return (
                                <Grid item key={index}>
                                    <NavbarLink {...data} />
                                </Grid>
                            );
                        }
                    } else {
                        if (data.href !== '/dashboard') {
                            return (
                                <Grid item key={index}>
                                    <NavbarLink {...data} />
                                </Grid>
                            );
                        }
                    }
                })}
            </Grid>
        </>
    );
};

export default Drawer;

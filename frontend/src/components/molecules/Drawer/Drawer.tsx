import NavbarLink from '@/components/atoms/Navbar/NavbarLink/NavbarLink';
import { Grid } from '@mui/material';
import { NavbarList } from '@/components/constants/Navbar/NavbarList';
import type { NavbarListTypes } from '@/components/constants/Navbar/NavbarList';

const Drawer = () => {
    return (
        <>
            <Grid container spacing={3}>
                {NavbarList.map((data: NavbarListTypes, index: number) => {
                    return (
                        <Grid item key={index}>
                            <NavbarLink {...data} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default Drawer;

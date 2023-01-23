import { Grid, Typography } from '@mui/material';
import Link from 'next/link';
import type { NavbarListTypes } from '@/components/constants/Navbar/NavbarList';

const NavbarLink: React.FC<NavbarListTypes> = ({
    href,
    title,
    hideIfLoggedIn,
    adminPage,
    isAuthenticated,
    isAdmin,
    onDrawer,
    needLoggedIn
}) => {
    const render = (): boolean => {
        if (isAuthenticated) {
            if (hideIfLoggedIn) {
                return false;
            } else {
                if (adminPage) {
                    if (isAdmin) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            }
        } else {
            if (needLoggedIn) return false;
            else {
                if (!adminPage) return true;
                return true;
            }
        }
    };

    return (
        <>
            <Grid item sx={{ display: render() ? '' : 'none' }}>
                <Link
                    href={href}
                    style={{
                        color: 'inherit',
                        textDecoration: 'none'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: onDrawer ? '18px' : '16px',
                            '&:hover': {
                                textDecoration: 'underline',
                                textUnderlineOffset: '6px',
                                textDecorationThickness: '2px',
                                textDecorationColor: '#6C63FF'
                            }
                        }}
                    >
                        {title}
                    </Typography>
                </Link>
            </Grid>
        </>
    );
};

export default NavbarLink;

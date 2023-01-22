import NavbarLink from '@/components/atoms/Navbar/NavbarLink/NavbarLink';
import { Drawer, Grid, IconButton, Typography } from '@mui/material';
import { NavbarList } from '@/components/constants/Navbar/NavbarList';
import type { NavbarListTypes } from '@/components/constants/Navbar/NavbarList';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import { AiOutlineUser } from 'react-icons/ai';
import PopperAccount from '@/components/atoms/Navbar/Popper/PopperAccount';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';

const DrawerComponent = () => {
    const { isAuthenticated, userData } = useContext(AuthContext)!;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Grid
                container
                spacing={3}
                alignItems='center'
                sx={{ display: { xs: 'none', md: 'flex' } }}
            >
                {NavbarList.map((data: NavbarListTypes, index: number) => {
                    return (
                        <NavbarLink
                            {...data}
                            isAuthenticated={isAuthenticated}
                            isAdmin={userData?.role !== 0}
                            key={index}
                            onDrawer={false}
                        />
                    );
                })}
                {isAuthenticated ? (
                    <Grid
                        item
                        sx={{
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    >
                        <Typography
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={(event: any) => handleClick(event)}
                            sx={{
                                '&:hover': {
                                    opacity: 0.7
                                },
                                fontSize: '16px'
                            }}
                        >
                            Hi,{' '}
                            <Typography
                                component='span'
                                sx={{ textDecoration: 'underline' }}
                            >
                                {userData?.name}
                            </Typography>
                        </Typography>
                        <PopperAccount
                            open={open}
                            anchorEl={anchorEl}
                            handleCloseMenu={handleCloseMenu}
                        />
                    </Grid>
                ) : null}
            </Grid>
            <Grid
                container
                sx={{ display: { md: 'none', xs: 'flex' } }}
                alignItems='center'
                justifyItems='center'
                spacing={0.5}
            >
                <Grid item>
                    <IconButton
                        onClick={() => setOpenDrawer((state) => !state)}
                    >
                        <GiHamburgerMenu
                            style={{
                                color: 'black',
                                fontSize: '24px',
                                verticalAlign: 'middle'
                            }}
                        />
                    </IconButton>
                </Grid>
                {isAuthenticated ? (
                    <Grid
                        item
                        sx={{
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    >
                        <IconButton
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={(event: any) => handleClick(event)}
                        >
                            <AiOutlineUser
                                style={{
                                    fontSize: '24px',
                                    verticalAlign: 'middle',
                                    color: 'black'
                                }}
                            />
                        </IconButton>
                        <PopperAccount
                            open={open}
                            anchorEl={anchorEl}
                            handleCloseMenu={handleCloseMenu}
                        />
                    </Grid>
                ) : null}
            </Grid>
            <Drawer
                sx={{
                    width: '200px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '200px'
                    }
                }}
                anchor='right'
                open={openDrawer}
                onClose={() => setOpenDrawer((state) => !state)}
            >
                <Grid container direction='column'>
                    <Grid item sx={{ py: 2, borderBottom: '1px solid gray' }}>
                        <Grid container justifyContent='center'>
                            <Grid item>
                                <Link href='/'>
                                    <img
                                        src='/logo/logo-transparent.png'
                                        alt='logo-transparent'
                                        style={{
                                            maxWidth: '130px',
                                            width: '100%',
                                            height: 'auto'
                                        }}
                                    />
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ py: 2 }}>
                        <Grid
                            container
                            direction='column'
                            justifyContent='center'
                            alignItems='center'
                            spacing={2}
                        >
                            {userData?.name ? (
                                <Grid item>
                                    <Typography
                                        sx={{
                                            '&:hover': {
                                                opacity: 0.7
                                            },
                                            fontSize: '18px'
                                        }}
                                    >
                                        Hi,{' '}
                                        <Typography
                                            component='span'
                                            sx={{ textDecoration: 'underline' }}
                                        >
                                            {userData?.name}
                                        </Typography>
                                    </Typography>
                                </Grid>
                            ) : null}
                            {NavbarList.map(
                                (data: NavbarListTypes, index: number) => {
                                    return (
                                        <NavbarLink
                                            {...data}
                                            isAuthenticated={isAuthenticated}
                                            isAdmin={userData?.role !== 0}
                                            key={index}
                                            onDrawer={true}
                                        />
                                    );
                                }
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Drawer>
        </>
    );
};

export default DrawerComponent;

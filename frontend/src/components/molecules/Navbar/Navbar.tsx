import { AppBar, Container, Grid, Toolbar } from '@mui/material';
import Link from 'next/link';
import Drawer from '../Drawer/Drawer';

const Navbar = () => {
    return (
        <>
            <AppBar
                position='sticky'
                elevation={0}
                sx={{
                    height: '9vh',
                    backgroundColor: 'white',
                    boxShadow: '0 6px 10px #bbbbbb59'
                }}
            >
                <Toolbar disableGutters>
                    <Container maxWidth='xl' sx={{ py: 3 }}>
                        <Grid
                            container
                            alignItems='center'
                            justifyContent='space-between'
                            sx={{ color: 'black' }}
                        >
                            <Grid item>
                                <Link href='/'>
                                    <img
                                        src={'/logo/logo.png'}
                                        alt={'logo'}
                                        style={{
                                            maxWidth: '130px',
                                            height: 'auto',
                                            width: '100%'
                                        }}
                                    />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Drawer />
                            </Grid>
                            {/* <Grid item>
                                <TopDrawer />
                            </Grid> */}
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;

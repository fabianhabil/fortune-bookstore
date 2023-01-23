/* eslint-disable @next/next/no-img-element */
import { Grid, Box, Typography } from '@mui/material';
import Link from 'next/link';

const HomePage = () => {
    return (
        <>
            <Grid
                container
                sx={{ minHeight: '85vh' }}
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                    container
                    sx={{ justifyContent: { md: 'flex-start', xs: 'center' } }}
                >
                    <Grid item>
                        <Box
                            component='div'
                            sx={{
                                maxWidth: { md: '500px', xs: '300px' },
                                height: 'auto',
                                width: '100%'
                            }}
                        >
                            <img
                                src={'/logo/logoBesar.svg'}
                                alt={'logo'}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid
                        container
                        direction='column'
                        sx={{
                            alignItems: { md: 'flex-end', xs: 'center' }
                        }}
                        spacing={1}
                    >
                        <Grid item>
                            <Typography
                                sx={{
                                    fontSize: {
                                        md: '64px',
                                        sm: '36px',
                                        xs: '32px'
                                    },
                                    fontWeight: 600
                                }}
                            >
                                Fortune Bookstore
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 300,
                                    textAlign: { md: 'end', xs: 'center' }
                                }}
                            >
                                From applied literature to educational
                                resources, Fortune Bookstore is your favorite
                                lovable bookstore that have a lot of textbooks
                                to offer you.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link
                                href='/books'
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                <Typography sx={{ color: '#6C63FF' }}>
                                    Shop now!
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sx={{
                        visibility: 'hidden',
                        display: { md: 'none', xs: '' }
                    }}
                    xs={12}
                />
            </Grid>
        </>
    );
};

export default HomePage;

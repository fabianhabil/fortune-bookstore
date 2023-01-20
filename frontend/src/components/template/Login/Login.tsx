import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { textFieldStyles } from '@/components/atoms/TextField/TextField';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { useRouter } from 'next/router';
import api from '@/api/axios-instance';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';

const LoginPage = () => {
    const { isLoggedIn } = useContext(AuthContext)!;
    const styles = textFieldStyles();
    const [login, setLogin] = useState<{ email: string; password: string }>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickPassword = () => setShowPassword(!showPassword);
    const router = useRouter();

    const loginAccount = async () => {
        try {
            const response = await api.post('/auth/login', login, {
                withCredentials: true
            });
            if (response) {
                console.log(response);
                localStorage.setItem(
                    'user-data',
                    JSON.stringify(response.data.data)
                );
                ToastSuccess('Login Success!');
                router.push('/');
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (e?.response?.status === 400) {
                    ToastError('Invalid credentials!');
                } else if (e?.response?.status === 404) {
                    ToastError('Account not found!');
                }
            } else {
                ToastError('Unexpected Error!');
            }
        }
    };

    useEffect(() => {
        const logged = isLoggedIn();
        if (logged) {
            const notice = 'Already Logged in!';
            ToastError(notice);
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
    }, [router, isLoggedIn]);

    return (
        <>
            <Grid
                container
                sx={{ minHeight: '100vh', backgroundColor: '#CEEFFC' }}
                alignItems='center'
                justifyContent='center'
            >
                <Grid item xs={12} md={'auto'} sm={8} sx={{ p: 4 }}>
                    <Grid container direction='column' spacing={3}>
                        <Grid
                            item
                            container
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Link href='/'>
                                <img
                                    src='/logo/logo-transparent.png'
                                    alt='logo-transparent'
                                    style={{
                                        maxWidth: '190px',
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                />
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{
                                    color: '#0D4066',
                                    fontSize: '48px',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                Sign In
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            direction='column'
                            spacing={2}
                            sx={{ minWidth: { xs: '100%', md: '500px' } }}
                        >
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <EmailIcon
                                                sx={{
                                                    fontSize: '24px',
                                                    mr: '8px'
                                                }}
                                            />{' '}
                                            {' Email Address'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setLogin({
                                            ...login,
                                            email: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            loginAccount();
                                        }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !login.email ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <Lock
                                                sx={{
                                                    fontSize: '24px',
                                                    mr: '8px'
                                                }}
                                            />{' '}
                                            {' Password'}
                                        </>
                                    }
                                    autoComplete='off'
                                    variant='outlined'
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    onClick={
                                                        handleClickPassword
                                                    }
                                                    sx={{ color: '#0D4066' }}
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            loginAccount();
                                        }
                                    }}
                                    onChange={(e) => {
                                        setLogin({
                                            ...login,
                                            password: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !login.password ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    sx={{
                                        width: '100%',
                                        backgroundColor: '#6DB0DC',
                                        color: 'black',
                                        textTransform: 'none',
                                        borderRadius: '18px',
                                        height: '50px',
                                        '&:hover': {
                                            backgroundColor:
                                                'rgba(109, 176, 220, 0.7)'
                                        }
                                    }}
                                    onClick={loginAccount}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: 'white'
                                        }}
                                    >
                                        Login
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid
                                item
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                sx={{
                                    '@media (max-width:371px)': {
                                        justifyContent: 'center'
                                    },
                                    '@media (max-width:950px) and (min-width:900px)':
                                        {
                                            justifyContent: 'center'
                                        }
                                }}
                            >
                                <Grid item>
                                    <Link
                                        href='/register'
                                        style={{
                                            color: 'inherit',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                textAlign: 'center',
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                    color: 'gray'
                                                }
                                            }}
                                        >
                                            Don't have an account?
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;

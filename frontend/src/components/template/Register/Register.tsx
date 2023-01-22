import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import {
    Button,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputBase,
    TextField,
    Typography
} from '@mui/material';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { textFieldStyles } from '@/components/atoms/TextField/TextField';
import { FaCalendar, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import ToastError from '@/components/atoms/Toast/ToastError';
import api from '@/api/axios-instance';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import { validateEmail } from '@/utils/validateEmail';
import DatePicker from 'react-datepicker';
import type { UserRegisterType } from '@/types/user';

const RegisterPage = () => {
    const styles = textFieldStyles();
    const { isLoggedIn } = useContext(AuthContext)!;
    const [register, setRegister] = useState<UserRegisterType>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        alamat: '',
        phone: '',
        tglLahir: new Date()
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    const handleClickPassword = () => setShowPassword(!showPassword);
    const handleClickPassword2 = () => setShowPassword2(!showPassword2);

    const registerAccount = () => {
        if (
            validateEmail(register.email) &&
            register.password === register.confirmPassword &&
            register.alamat !== '' &&
            register.name !== '' &&
            register.alamat !== '' &&
            register.phone !== ''
        ) {
            setError(false);
            postRegister();
        } else {
            setError(true);
        }
    };

    const postRegister = async () => {
        try {
            const response = await api.post(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`,
                register
            );
            if (response) {
                console.log(response);
                ToastSuccess('Register Berhasil!');
            }
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                if (e?.response?.status === 400) {
                    if (e?.response?.data.email) {
                        ToastError(
                            'Email Registered! Please use another Email'
                        );
                    }
                    if (e?.response?.data.alamat) {
                        ToastError(
                            'alamat Registered! Please use another alamat'
                        );
                    }
                }
            } else {
                ToastError('Server Error!');
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
                                    alt='logo'
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
                                Register
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
                                            <AccountBoxIcon
                                                sx={{
                                                    fontSize: '24px',
                                                    mr: '8px'
                                                }}
                                            />{' '}
                                            {' Full Name'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            name: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    error={error && register.name === ''}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.name ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='name'
                                />
                                <FormHelperText
                                    id='name'
                                    sx={{ color: 'red', ml: 1.5 }}
                                >
                                    {error && register.name === ''
                                        ? 'Name cannot be empty!'
                                        : ''}
                                </FormHelperText>
                            </Grid>
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
                                        setRegister({
                                            ...register,
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
                                    error={
                                        error && !validateEmail(register.email)
                                    }
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.email ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='email'
                                />
                                <FormHelperText
                                    id='email'
                                    sx={{ color: 'red', ml: 1.5 }}
                                >
                                    {error && !validateEmail(register.email)
                                        ? 'Format Email not correct!'
                                        : ''}
                                </FormHelperText>
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
                                            // registerAccount(register);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
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
                                            opacity: !register.password ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='password'
                                />
                                <FormHelperText
                                    id='password'
                                    sx={{ color: 'red', ml: 1.5 }}
                                >
                                    {error && register.password === ''
                                        ? "Password can't be empty!"
                                        : register.password !==
                                          register.confirmPassword
                                        ? 'Password Not Match!'
                                        : ''}
                                </FormHelperText>
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
                                            {' Confirm Password'}
                                        </>
                                    }
                                    autoComplete='off'
                                    variant='outlined'
                                    type={showPassword2 ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    onClick={
                                                        handleClickPassword2
                                                    }
                                                    sx={{ color: '#0D4066' }}
                                                >
                                                    {showPassword2 ? (
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
                                            // registerAccount(register);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            confirmPassword: e.target.value
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
                                            opacity: !register.confirmPassword
                                                ? 1
                                                : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='confirm-password'
                                />
                                <FormHelperText
                                    id='confirm-password'
                                    sx={{ color: 'red', ml: 1.5 }}
                                >
                                    {error && register.confirmPassword === ''
                                        ? "Password can't be empty!"
                                        : register.password !==
                                          register.confirmPassword
                                        ? 'Password Not Match!'
                                        : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <FaLocationArrow
                                                style={{
                                                    fontSize: '22px',
                                                    marginRight: '8px'
                                                }}
                                            />{' '}
                                            {' Address'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            alamat: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    error={error && register.alamat === ''}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.alamat ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                                <FormHelperText
                                    id='alamat'
                                    sx={{ color: 'red', ml: 1.5 }}
                                >
                                    {error && register.alamat === ''
                                        ? 'Address cannot be empty!'
                                        : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <FaPhoneAlt
                                                style={{
                                                    fontSize: '22px',
                                                    marginRight: '8px'
                                                }}
                                            />{' '}
                                            {' Phone Number'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            phone: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    error={error && register.phone === ''}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.phone ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                                <FormHelperText
                                    id='phone'
                                    sx={{ color: 'red', ml: 1.5 }}
                                >
                                    {error && register.phone === ''
                                        ? 'Phone Number cannot be empty!'
                                        : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <DatePicker
                                    closeOnScroll={true}
                                    selected={register.tglLahir}
                                    onChange={(date: Date) => {
                                        setRegister((data) => ({
                                            ...data,
                                            tglLahir: date
                                        }));
                                    }}
                                    scrollableYearDropdown
                                    showYearDropdown
                                    showMonthDropdown
                                    yearDropdownItemNumber={100}
                                    onKeyDown={(e) => e.preventDefault()}
                                    dateFormat='MM/dd/yyyy'
                                    customInput={
                                        <InputBase
                                            sx={{
                                                width: '100%',
                                                padding: '16.5px',
                                                py: '12px',
                                                fontSize: '16px',
                                                color: '#0D4066',
                                                fontWeight: 'bold',
                                                border: 'white',
                                                backgroundColor: 'white',
                                                '&:hover': {
                                                    cursor: 'pointer'
                                                }
                                            }}
                                            className={styles.inputTextfield}
                                            startAdornment={
                                                <FaCalendar
                                                    style={{
                                                        fontSize: '24px',
                                                        marginRight: '8px'
                                                    }}
                                                />
                                            }
                                        />
                                    }
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
                                    onClick={registerAccount}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: 'white'
                                        }}
                                    >
                                        Register
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
                                        href='/login'
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
                                            Already have an account?
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

export default RegisterPage;

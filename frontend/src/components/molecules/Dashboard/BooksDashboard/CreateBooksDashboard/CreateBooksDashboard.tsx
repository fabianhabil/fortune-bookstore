/* eslint-disable @typescript-eslint/no-explicit-any */
import InputBookInfo from '@/components/atoms/Dashboard/BookDashboard/InputBookInfo/InputBookInfo';
import { Button, Grid, InputBase, InputLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { textFieldStyles } from '@/components/atoms/TextField/TextField';
import SelectInputBookInfo from '@/components/atoms/Dashboard/BookDashboard/SelectInputBookInfo/SelectInputBookInfo';
import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { useRouter } from 'next/router';

interface bookInfoTypes {
    name: string;
    deskripsi: string;
    harga: number;
    stok: number;
    jumlahHalaman: number;
    tanggalTerbit: Date;
    bahasa: number;
    berat: number;
    lebar: number;
    panjang: number;
    penerbitId: number;
    kategoriBukuId: number;
}

const CreateBooksDashboard = () => {
    const [bookInfo, setBookInfo] = useState<bookInfoTypes>({
        name: '',
        deskripsi: '',
        harga: 0,
        stok: 0,
        jumlahHalaman: 0,
        tanggalTerbit: new Date(),
        bahasa: 0,
        berat: 0,
        lebar: 0,
        panjang: 0,
        penerbitId: 1,
        kategoriBukuId: 1
    });

    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [penerbitData, setPenerbitData] = useState<
        { penerbitId: string; nama: string }[]
    >([]);
    const [kategoriBukuData, setKategoriBukuData] = useState<
        { kategoriBukuId: number; nama: string }[]
    >([]);

    const [fotoBuku, setFotoBuku] = useState<File | null>(null);

    const getImageBase64Input = (e: any) => {
        const imageFile = e.target.files[0];
        const reader = new FileReader();
        reader.onerror = (error) => {
            return error;
        };
        reader.readAsDataURL(imageFile);
        return imageFile;
    };

    const getPenerbitData = async () => {
        try {
            const response = await api.get('/penerbit');
            if (response) {
                setPenerbitData(response.data.data.penerbit);
            }
        } catch (e) {
            ToastError('Server Error!');
            console.log(e);
        }
    };

    const getKategoriBukuData = async () => {
        try {
            const response = await api.get('/kategori');
            if (response) {
                setKategoriBukuData(response.data.data.kategoriBuku);
                setLoading(false);
            }
        } catch (e) {
            ToastError('Server Error!');
            console.log(e);
        }
    };

    useEffect(() => {
        getPenerbitData();
        getKategoriBukuData();
    }, []);

    const styles = textFieldStyles();

    const postBook = async () => {
        try {
            const formData: any = new FormData();
            formData.append('name', bookInfo.name);
            formData.append('deskripsi', bookInfo.deskripsi);
            formData.append('harga', bookInfo.harga);
            formData.append('stok', bookInfo.stok);
            formData.append('jumlahHalaman', bookInfo.jumlahHalaman);
            formData.append('tanggalTerbit', bookInfo.tanggalTerbit);
            formData.append('bahasa', bookInfo.bahasa - 1);
            formData.append('berat', bookInfo.berat);
            formData.append('lebar', bookInfo.lebar);
            formData.append('panjang', bookInfo.panjang);
            formData.append(
                'penerbitId',
                penerbitData[bookInfo.penerbitId - 1].penerbitId
            );
            formData.append('kategoriBukuId', bookInfo.kategoriBukuId);
            formData.append('bukuImage', fotoBuku);

            const response = await api.post('/books', formData);
            if (response) {
                console.log(response);
                ToastSuccess('Book Added!');
                router.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {!loading ? (
                <>
                    <Grid container direction='column'>
                        <Grid item container direction='column' spacing={2}>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Name'
                                    value={bookInfo.name}
                                    onChange={(e: string) =>
                                        setBookInfo((state) => ({
                                            ...state,
                                            name: e
                                        }))
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Description'
                                    value={bookInfo.deskripsi}
                                    onChange={(e: string) =>
                                        setBookInfo((state) => ({
                                            ...state,
                                            deskripsi: e
                                        }))
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Price'
                                    value={bookInfo.harga}
                                    onChange={(e: string) => {
                                        let newValue: any = e;
                                        if (!newValue) {
                                            newValue = 0;
                                        }
                                        setBookInfo((state) => ({
                                            ...state,
                                            harga: parseFloat(newValue)
                                        }));
                                    }}
                                    type='number'
                                />
                            </Grid>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Stock'
                                    value={bookInfo.stok}
                                    onChange={(e: string) => {
                                        let newValue: any = e;
                                        if (!newValue) {
                                            newValue = 0;
                                        }
                                        setBookInfo((state) => ({
                                            ...state,
                                            stok: parseFloat(newValue)
                                        }));
                                    }}
                                    type='number'
                                />
                            </Grid>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Page'
                                    value={bookInfo.jumlahHalaman}
                                    onChange={(e: string) => {
                                        let newValue: any = e;
                                        if (!newValue) {
                                            newValue = 0;
                                        }
                                        setBookInfo((state) => ({
                                            ...state,
                                            jumlahHalaman: parseFloat(newValue)
                                        }));
                                    }}
                                    type='number'
                                />
                            </Grid>
                            <Grid item>
                                <SelectInputBookInfo
                                    label={'Book Language'}
                                    value={bookInfo.bahasa}
                                    data={[
                                        { value: 1, title: 'Bahasa Indonesia' },
                                        { value: 2, title: 'English' }
                                    ]}
                                    onChange={(arg) =>
                                        setBookInfo((state) => ({
                                            ...state,
                                            bahasa: Number(arg.target.value)
                                        }))
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <InputLabel>
                                    <Typography
                                        sx={{
                                            fontSize: {
                                                md: '18px',
                                                xs: '14px'
                                            },
                                            fontWeight: 'bold',
                                            color: 'black',
                                            mb: 0.5
                                        }}
                                    >
                                        Date of Issue
                                    </Typography>
                                </InputLabel>
                                <DatePicker
                                    closeOnScroll={true}
                                    selected={bookInfo.tanggalTerbit}
                                    onChange={(date: Date) => {
                                        setBookInfo((data) => ({
                                            ...data,
                                            tanggalTerbit: date
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
                                                pr: 0,
                                                py: '12px',
                                                fontSize: '16px',
                                                color: 'black',
                                                fontWeight: 'bold',
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
                                                        marginRight: '8px',
                                                        marginLeft: '-16px'
                                                    }}
                                                />
                                            }
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Weight (kg)'
                                    value={bookInfo.berat}
                                    onChange={(e: string) => {
                                        let newValue: any = e;
                                        if (!newValue) {
                                            newValue = 0;
                                        }
                                        setBookInfo((state) => ({
                                            ...state,
                                            berat: parseFloat(newValue)
                                        }));
                                    }}
                                    type='number'
                                />
                            </Grid>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Wide (cm)'
                                    value={bookInfo.lebar}
                                    onChange={(e: string) => {
                                        let newValue: any = e;
                                        if (!newValue) {
                                            newValue = 0;
                                        }
                                        setBookInfo((state) => ({
                                            ...state,
                                            lebar: parseFloat(newValue)
                                        }));
                                    }}
                                    type='number'
                                />
                            </Grid>
                            <Grid item>
                                <InputBookInfo
                                    label='Book Width (cm)'
                                    value={bookInfo.panjang}
                                    onChange={(e: string) => {
                                        let newValue: any = e;
                                        if (!newValue) {
                                            newValue = 0;
                                        }
                                        setBookInfo((state) => ({
                                            ...state,
                                            panjang: parseFloat(newValue)
                                        }));
                                    }}
                                    type='number'
                                />
                            </Grid>
                            <Grid item>
                                <SelectInputBookInfo
                                    label={'Book Publisher'}
                                    value={bookInfo.penerbitId}
                                    data={penerbitData}
                                    onChange={(arg) =>
                                        setBookInfo((state) => ({
                                            ...state,
                                            penerbitId: Number(arg.target.value)
                                        }))
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <SelectInputBookInfo
                                    label={'Book Category'}
                                    value={bookInfo.kategoriBukuId}
                                    data={kategoriBukuData}
                                    onChange={(arg) =>
                                        setBookInfo((state) => ({
                                            ...state,
                                            kategoriBukuId: Number(
                                                arg.target.value
                                            )
                                        }))
                                    }
                                />
                            </Grid>
                            <Grid item>
                                {!fotoBuku ? (
                                    <>
                                        <InputLabel>
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        md: '18px',
                                                        xs: '14px'
                                                    },
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                    mb: 0.5
                                                }}
                                            >
                                                Book Picture
                                            </Typography>
                                        </InputLabel>
                                        <Button
                                            component='label'
                                            fullWidth
                                            variant='contained'
                                        >
                                            Upload Book Photo
                                            <input
                                                type='file'
                                                hidden
                                                accept='.jpg'
                                                onChange={async (e: any) => {
                                                    // console.log('upload');
                                                    const image = new Image();
                                                    image.src =
                                                        window.URL.createObjectURL(
                                                            e.target.files[0]
                                                        );

                                                    image.onload = function () {
                                                        const blob =
                                                            getImageBase64Input(
                                                                e
                                                            );
                                                        setFotoBuku(blob);
                                                    };
                                                }}
                                            />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={URL.createObjectURL(fotoBuku)}
                                            alt='buku'
                                            style={{
                                                maxWidth: '350px',
                                                width: '100%',
                                                height: '100%',
                                                margin: 'auto'
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    md: '18px',
                                                    xs: '14px'
                                                },
                                                fontWeight: 'bold',
                                                color: 'black',
                                                mb: 0.5,
                                                '&:hover': {
                                                    cursor: 'pointer'
                                                }
                                            }}
                                            onClick={() => setFotoBuku(null)}
                                        >
                                            {fotoBuku.name} selected! Click here
                                            to remove the photo!
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                            <Grid item sx={{ mt: 3 }}>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    onClick={postBook}
                                >
                                    Add Book
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Grid
                    item
                    container
                    alignItems='center'
                    justifyContent='center'
                    sx={{ mt: 1 }}
                >
                    <img src='/loading/loading.svg' alt='loading' />
                </Grid>
            )}
        </>
    );
};

export default CreateBooksDashboard;

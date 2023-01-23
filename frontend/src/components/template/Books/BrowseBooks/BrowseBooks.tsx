import api from '@/api/axios-instance';
import BookInfo from '@/components/atoms/Books/BookInfo/BookInfo';
import ToastError from '@/components/atoms/Toast/ToastError';
import Topup from '@/components/atoms/User/Topup/Topup';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import integerToStringRupiah from '@/utils/integerToStringRupiah';
import { Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

interface bookInfoTypes {
    bukuId: number;
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
    penerbit: {
        penerbitId: string;
        nama: string;
    };
    kategoriBuku: {
        kategoriBukuId: number;
        nama: string;
    };
    imagePath: string;
}

const BrowseBooks = () => {
    const [books, setBooks] = useState<bookInfoTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [topupModal, setTopupModal] = useState<boolean>(false);
    const [penerbitData, setPenerbitData] = useState<
        { penerbitId: string; nama: string }[]
    >([]);
    const [kategoriBukuData, setKategoriBukuData] = useState<
        { kategoriBukuId: number; nama: string }[]
    >([]);

    const [selectedPenerbitData, setSelectedPenerbitData] = useState<number>(0);
    const [selectedKategoriBukuData, setSelectedKategoriBukuData] =
        useState<number>(0);

    const { userData, isLoggedIn } = useContext(AuthContext)!;

    const getBooks = async () => {
        try {
            const response = await api.get('/books');
            if (response) {
                console.log(response);
                setBooks(response.data.data.books);
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
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
        getBooks();
    }, []);

    const getBukuByFilter = async () => {
        try {
            const response = await api.get(
                `/books/${
                    selectedPenerbitData === 0
                        ? 'all'
                        : penerbitData[selectedPenerbitData - 1].penerbitId
                }/${selectedKategoriBukuData}`
            );
            if (response) {
                console.log(response);
                setBooks(response.data.data.book);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Grid container direction='column' spacing={2}>
                {!loading ? (
                    <>
                        <Grid item>
                            <Grid
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontSize: '28px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Browse Books
                                    </Typography>
                                </Grid>
                                {isLoggedIn() ? (
                                    <>
                                        <Grid item>
                                            {userData?.role === 1 ? (
                                                <>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '18px',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        You're an admin, cant
                                                        buy books!
                                                    </Typography>
                                                </>
                                            ) : (
                                                <>
                                                    <Grid
                                                        container
                                                        direction='row'
                                                        spacing={2}
                                                    >
                                                        <Grid item>
                                                            <Typography
                                                                sx={{
                                                                    fontSize:
                                                                        '18px',
                                                                    fontWeight:
                                                                        'bold'
                                                                }}
                                                            >
                                                                Your Balance: Rp
                                                                {integerToStringRupiah(
                                                                    userData?.saldo as number
                                                                )}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography
                                                                sx={{
                                                                    fontSize:
                                                                        '18px',
                                                                    fontWeight:
                                                                        'bold',
                                                                    color: 'blue',
                                                                    '&:hover': {
                                                                        cursor: 'pointer'
                                                                    }
                                                                }}
                                                                onClick={() =>
                                                                    setTopupModal(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                Click here to
                                                                topup.
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )}
                                        </Grid>
                                    </>
                                ) : null}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{ fontSize: '18px', fontWeight: 600 }}
                            >
                                Find book by:
                            </Typography>
                        </Grid>
                        <Grid item sx={{ mb: 1 }}>
                            <Grid
                                container
                                direction='row'
                                spacing={2}
                                alignItems='center'
                            >
                                <Grid item>
                                    <Select
                                        sx={{ width: '300px' }}
                                        value={selectedPenerbitData}
                                        onChange={(e) =>
                                            setSelectedPenerbitData(
                                                e.target.value as number
                                            )
                                        }
                                    >
                                        <MenuItem value={0}>
                                            All Publisher
                                        </MenuItem>
                                        {penerbitData.map(
                                            (data, index: number) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        value={index + 1}
                                                    >
                                                        {data.nama}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Select
                                        sx={{ width: '300px' }}
                                        value={selectedKategoriBukuData}
                                        onChange={(e) =>
                                            setSelectedKategoriBukuData(
                                                e.target.value as number
                                            )
                                        }
                                    >
                                        <MenuItem value={0}>
                                            All Book Category
                                        </MenuItem>
                                        {kategoriBukuData.map(
                                            (data, index: number) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        value={index + 1}
                                                    >
                                                        {data.nama}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        onClick={getBukuByFilter}
                                    >
                                        Find
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction='column' spacing={3}>
                                {books?.map(
                                    (data: bookInfoTypes, index: number) => {
                                        return (
                                            <Grid item key={index}>
                                                <BookInfo data={data} />
                                            </Grid>
                                        );
                                    }
                                )}
                                {books.length === 0 ? (
                                    <>
                                        <Grid item>
                                            <Typography
                                                sx={{
                                                    fontSize: '28px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                No Books 😭😢😢
                                            </Typography>
                                        </Grid>
                                    </>
                                ) : null}
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
            </Grid>
            <Topup open={topupModal} handleClose={() => setTopupModal(false)} />
        </>
    );
};

export default BrowseBooks;

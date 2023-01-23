import { Button, Grid, Typography } from '@mui/material';
import LabelValueBook from '../../Dashboard/BookDashboard/LabelValueBook/LabelValueBook';
import integerToStringRupiah from '@/utils/integerToStringRupiah';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import ToastError from '../../Toast/ToastError';
import api from '@/api/axios-instance';
import ToastSuccess from '../../Toast/ToastSuccess';
import { useRouter } from 'next/router';

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

const BookInfo = ({ data }: { data: bookInfoTypes }) => {
    const { userData, getUserData } = useContext(AuthContext)!;
    const router = useRouter();

    const checkBookLanguage = (enumBook: number) => {
        if (enumBook === 0) return 'Bahasa Indonesia';
        return 'English';
    };

    const buyBooks = async () => {
        if (userData?.role === 1) {
            ToastError('You are an admin, cant buy books!');
            return;
        }

        if ((userData?.saldo as number) - data.harga < 0) {
            ToastError('Not Enough Balance!');
            return;
        }

        if (data.stok === 0) {
            ToastError('Book doesnt have enough stock!');
            return;
        }

        try {
            const response = await api.post('/transaksi', {
                jumlahBuku: 1,
                total: data.harga,
                bukuId: data.bukuId
            });

            if (response) {
                localStorage.setItem(
                    'user-data',
                    JSON.stringify(response.data.data.userPayload)
                );
                getUserData();
                ToastSuccess('Book purchased!');
                router.reload();
            }
        } catch (e: any) {
            if (
                e.response.data.message === 'This book doesnt have enough stok!'
            ) {
                ToastError('Book Stock is empty!');
            } else if (e.response.data.message === 'Not Enough Fund') {
                ToastError('Not enough balance!');
            }
        }
    };

    return (
        <>
            <Grid container direction='row' spacing={2}>
                <Grid item>
                    <img
                        src={`http://localhost:5000/public/images/${data.imagePath}`}
                        style={{
                            maxWidth: '200px',
                            // maxHeight: '200px',
                            width: '100%',
                            height: 'auto'
                        }}
                        alt='cover-buku'
                        crossOrigin='anonymous'
                    />
                </Grid>
                <Grid item xs>
                    <Grid
                        container
                        direction='column'
                        sx={{ height: '100%' }}
                        justifyContent='space-between'
                    >
                        <Grid container direction='row' sx={{ height: '100%' }}>
                            <Grid item md={4}>
                                <Grid
                                    container
                                    direction='row'
                                    sx={{ height: '100%' }}
                                >
                                    <Grid
                                        item
                                        sx={{
                                            height: '100%'
                                        }}
                                    >
                                        <Grid
                                            container
                                            direction='column'
                                            justifyContent='space-between'
                                            sx={{
                                                height: '100%'
                                            }}
                                        >
                                            <LabelValueBook
                                                label={'Book Name'}
                                                value={data.name}
                                            />
                                            <LabelValueBook
                                                label={'Book Description'}
                                                value={data.deskripsi}
                                            />
                                            <LabelValueBook
                                                label={'Book Price'}
                                                value={`Rp${integerToStringRupiah(
                                                    data.harga
                                                )}`}
                                            />
                                            <LabelValueBook
                                                label={'Book Stock'}
                                                value={`${data.stok} pcs`}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4}>
                                <Grid
                                    container
                                    direction='row'
                                    sx={{ height: '100%' }}
                                >
                                    <Grid
                                        item
                                        sx={{
                                            height: '100%'
                                        }}
                                    >
                                        <Grid
                                            container
                                            direction='column'
                                            justifyContent='space-between'
                                            sx={{
                                                height: '100%'
                                            }}
                                        >
                                            <LabelValueBook
                                                label={'Book Pages'}
                                                value={`${data.jumlahHalaman} pages`}
                                            />
                                            <LabelValueBook
                                                label={'Book Issue Date'}
                                                value={new Date(
                                                    data.tanggalTerbit
                                                ).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            />
                                            <LabelValueBook
                                                label={'Book Language'}
                                                value={checkBookLanguage(
                                                    data.bahasa
                                                )}
                                            />
                                            <LabelValueBook
                                                label={'Publisher'}
                                                value={data.penerbit.nama}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={3}>
                                <Grid
                                    container
                                    direction='row'
                                    sx={{ height: '100%' }}
                                >
                                    <Grid
                                        item
                                        sx={{
                                            height: '100%'
                                        }}
                                    >
                                        <Grid
                                            container
                                            direction='column'
                                            justifyContent='space-between'
                                            sx={{
                                                height: '100%'
                                            }}
                                        >
                                            <LabelValueBook
                                                label={'Book Weight'}
                                                value={`${data.berat} kg`}
                                            />
                                            <LabelValueBook
                                                label={'Book Wide'}
                                                value={`${data.lebar} cm`}
                                            />
                                            <LabelValueBook
                                                label={'Book Width'}
                                                value={`${data.panjang} cm`}
                                            />
                                            <LabelValueBook
                                                label={'Book Category'}
                                                value={data.kategoriBuku.nama}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={1}>
                                <Grid
                                    container
                                    direction='row'
                                    sx={{ height: '100%' }}
                                >
                                    <Grid
                                        item
                                        sx={{
                                            height: '100%'
                                        }}
                                    >
                                        <Grid
                                            container
                                            direction='column'
                                            justifyContent='center'
                                            sx={{
                                                height: '100%'
                                            }}
                                            alignItems='center'
                                        >
                                            <Grid item>
                                                <Button
                                                    onClick={buyBooks}
                                                    disabled={
                                                        userData === null ||
                                                        data.stok <= 0 ||
                                                        userData.role === 1
                                                    }
                                                >
                                                    Buy Books
                                                </Button>
                                            </Grid>
                                            {data.stok <= 0 ? (
                                                <>
                                                    <Grid item>
                                                        <Typography
                                                            sx={{
                                                                textAlign:
                                                                    'center'
                                                            }}
                                                        >
                                                            Book out of stock!
                                                        </Typography>
                                                    </Grid>
                                                </>
                                            ) : null}
                                            {userData === null ? (
                                                <>
                                                    <Grid item>
                                                        <Typography
                                                            sx={{
                                                                textAlign:
                                                                    'center'
                                                            }}
                                                        >
                                                            Please login first!
                                                        </Typography>
                                                    </Grid>
                                                </>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default BookInfo;

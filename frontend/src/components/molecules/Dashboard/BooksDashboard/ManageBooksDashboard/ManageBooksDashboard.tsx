/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api/axios-instance';
import BookInfo from '@/components/atoms/Dashboard/BookDashboard/BookInfo/BookInfo';
import InputBookInfo from '@/components/atoms/Dashboard/BookDashboard/InputBookInfo/InputBookInfo';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

const ManageBooksDashboard = () => {
    const [stepperPage, setStepperPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [books, setBooks] = useState<bookInfoTypes[] | null>(null);
    const [bookSelected, setBookSelected] = useState<any>(null);
    const router = useRouter();

    const editBook = async () => {
        try {
            const response = await api.put(`/books/${bookSelected.bukuId}`, {
                name: bookSelected.name,
                deskripsi: bookSelected.deskripsi,
                harga: bookSelected.harga,
                stok: bookSelected.stok,
                jumlahHalaman: bookSelected.jumlahHalaman,
                berat: bookSelected.berat,
                lebar: bookSelected.lebar,
                panjang: bookSelected.panjang
            });
            if (response) {
                console.log(response);
                ToastSuccess('Book Edited!');
                router.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

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
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <Grid container direction='column' spacing={4}>
                        {stepperPage === 0 ? (
                            <>
                                {books?.map(
                                    (data: bookInfoTypes, index: number) => {
                                        return (
                                            <Grid item key={index}>
                                                <BookInfo
                                                    data={data}
                                                    getBooks={getBooks}
                                                    setBookSelected={
                                                        setBookSelected
                                                    }
                                                    setStepperPage={
                                                        setStepperPage
                                                    }
                                                />
                                            </Grid>
                                        );
                                    }
                                )}
                            </>
                        ) : (
                            <>
                                <Grid
                                    item
                                    container
                                    direction='column'
                                    spacing={2}
                                >
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Name'
                                            value={bookSelected.name}
                                            onChange={(e: string) =>
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        name: e
                                                    })
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Description'
                                            value={bookSelected.deskripsi}
                                            onChange={(e: string) =>
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        deskripsi: e
                                                    })
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Price'
                                            value={bookSelected.harga}
                                            onChange={(e: string) => {
                                                let newValue: any = e;
                                                if (!newValue) {
                                                    newValue = 0;
                                                }
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        harga: parseFloat(
                                                            newValue
                                                        )
                                                    })
                                                );
                                            }}
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Stock'
                                            value={bookSelected.stok}
                                            onChange={(e: string) => {
                                                let newValue: any = e;
                                                if (!newValue) {
                                                    newValue = 0;
                                                }
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        stok: parseFloat(
                                                            newValue
                                                        )
                                                    })
                                                );
                                            }}
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Page'
                                            value={bookSelected.jumlahHalaman}
                                            onChange={(e: string) => {
                                                let newValue: any = e;
                                                if (!newValue) {
                                                    newValue = 0;
                                                }
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        jumlahHalaman:
                                                            parseFloat(newValue)
                                                    })
                                                );
                                            }}
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Weight (kg)'
                                            value={bookSelected.berat}
                                            onChange={(e: string) => {
                                                let newValue: any = e;
                                                if (!newValue) {
                                                    newValue = 0;
                                                }
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        berat: parseFloat(
                                                            newValue
                                                        )
                                                    })
                                                );
                                            }}
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Wide (cm)'
                                            value={bookSelected.lebar}
                                            onChange={(e: string) => {
                                                let newValue: any = e;
                                                if (!newValue) {
                                                    newValue = 0;
                                                }
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        lebar: parseFloat(
                                                            newValue
                                                        )
                                                    })
                                                );
                                            }}
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputBookInfo
                                            label='Book Width (cm)'
                                            value={bookSelected.panjang}
                                            onChange={(e: string) => {
                                                let newValue: any = e;
                                                if (!newValue) {
                                                    newValue = 0;
                                                }
                                                setBookSelected(
                                                    (state: any) => ({
                                                        ...state,
                                                        panjang:
                                                            parseFloat(newValue)
                                                    })
                                                );
                                            }}
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid item sx={{ mt: 3 }}>
                                        <Button
                                            fullWidth
                                            variant='contained'
                                            onClick={editBook}
                                        >
                                            Edit Book
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        )}
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

export default ManageBooksDashboard;

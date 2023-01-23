import { Grid, IconButton } from '@mui/material';
import LabelValueBook from '../LabelValueBook/LabelValueBook';
import integerToStringRupiah from '@/utils/integerToStringRupiah';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import ToastError from '@/components/atoms/Toast/ToastError';
import api from '@/api/axios-instance';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { useState } from 'react';
import DeleteBook from '../DeleteBook/DeleteBook';

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

const BookInfo = ({
    data,
    getBooks,
    setBookSelected,
    setStepperPage
}: {
    data: bookInfoTypes;
    getBooks: () => void;
    setBookSelected: (_arg: bookInfoTypes) => void;
    setStepperPage: (_arg: number) => void;
}) => {
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

    const checkBookLanguage = (enumBook: number) => {
        if (enumBook === 0) return 'Bahasa Indonesia';
        return 'English';
    };

    const deleteBook = async () => {
        try {
            const response = await api.delete(`/books/${data.bukuId}`);
            if (response) {
                ToastSuccess('Book deleted!');
                await getBooks();
                setOpenModalDelete(false);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
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
                        <Grid item>
                            <Grid
                                container
                                direction='row'
                                sx={{ height: '100%' }}
                            >
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
                                                    label={'Book price'}
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
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        }
                                                    )}
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
                                                    value={
                                                        data.kategoriBuku.nama
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ py: 2 }}>
                            <Grid
                                container
                                direction='row'
                                alignItems='center'
                                justifyContent='center'
                                spacing={2}
                            >
                                <Grid item>
                                    <IconButton
                                        onClick={() => {
                                            setBookSelected(data);
                                            setStepperPage(1);
                                        }}
                                    >
                                        <AiTwotoneEdit
                                            style={{ color: 'green' }}
                                        />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        onClick={() => setOpenModalDelete(true)}
                                    >
                                        <AiTwotoneDelete
                                            style={{ color: 'red' }}
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DeleteBook
                open={openModalDelete}
                handleClose={(arg: boolean) => setOpenModalDelete(arg)}
                deleteBook={deleteBook}
            />
        </>
    );
};

export default BookInfo;

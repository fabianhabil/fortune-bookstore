import api from '@/api/axios-instance';
import TransactionsInfo from '@/components/atoms/Transactions/TransactionsInfo/TransactionsInfo';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface transaksiTypes {
    buku: {
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
    };
    jumlahBuku: number;
    total: number;
    track: {
        updatedAt: string;
        createdAt: string;
    };
    transaksiId: number;
}

const Transactions = () => {
    const [transaksi, setTransaksi] = useState<transaksiTypes[]>([]);

    const getTransaksi = async () => {
        try {
            const response = await api.get('/transaksi');
            if (response) {
                setTransaksi(response.data.data.transaksi);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTransaksi();
    }, []);

    return (
        <>
            <Grid container direction='column' spacing={2}>
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
                                Transactions List
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction='column' spacing={4}>
                        {transaksi?.map(
                            (data: transaksiTypes, index: number) => {
                                return (
                                    <Grid item key={index}>
                                        <TransactionsInfo data={data} />
                                    </Grid>
                                );
                            }
                        )}
                        {transaksi.length === 0 ? (
                            <>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontSize: '28px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        You dont have any transactions 😭😢😢
                                    </Typography>
                                </Grid>
                            </>
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Transactions;

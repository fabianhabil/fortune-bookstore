import { Grid, Typography } from '@mui/material';
import LabelValueBook from '../../Dashboard/BookDashboard/LabelValueBook/LabelValueBook';
import integerToStringRupiah from '@/utils/integerToStringRupiah';

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

const TransactionsInfo = ({ data }: { data: transaksiTypes }) => {
    console.log(data);
    const checkBookLanguage = (enumBook: number) => {
        if (enumBook === 0) return 'Bahasa Indonesia';
        return 'English';
    };

    return (
        <>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>
                        Transactions #{`${data.transaksiId}`} (
                        {`${new Date(data.track.createdAt).toLocaleDateString(
                            'en-GB',
                            {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            }
                        )}`}{' '}
                        {`${new Date(data.track.createdAt).toLocaleTimeString(
                            'en-US'
                        )}`}
                        )
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='row' spacing={2}>
                        <Grid item>
                            <img
                                src={`http://localhost:5000/public/images/${data.buku.imagePath}`}
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
                                                        value={data.buku.name}
                                                    />
                                                    <LabelValueBook
                                                        label={
                                                            'Book Description'
                                                        }
                                                        value={
                                                            data.buku.deskripsi
                                                        }
                                                    />
                                                    <LabelValueBook
                                                        label={'Book Price'}
                                                        value={`Rp${integerToStringRupiah(
                                                            data.buku.harga
                                                        )}`}
                                                    />
                                                    <LabelValueBook
                                                        label={'Book Purchased'}
                                                        value={'1 pcs'}
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
                                                        value={`${data.buku.jumlahHalaman} pages`}
                                                    />
                                                    <LabelValueBook
                                                        label={
                                                            'Book Issue Date'
                                                        }
                                                        value={new Date(
                                                            data.buku.tanggalTerbit
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
                                                            data.buku.bahasa
                                                        )}
                                                    />
                                                    <LabelValueBook
                                                        label={'Publisher'}
                                                        value={
                                                            data.buku.penerbit
                                                                .nama
                                                        }
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
                                                        label={
                                                            'Transactions Date'
                                                        }
                                                        value={
                                                            `${new Date(
                                                                data.track.createdAt
                                                            ).toLocaleDateString(
                                                                'en-GB',
                                                                {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                }
                                                            )}` +
                                                            ' ' +
                                                            `${new Date(
                                                                data.track.createdAt
                                                            ).toLocaleTimeString(
                                                                'en-US'
                                                            )}`
                                                        }
                                                    />
                                                    <LabelValueBook
                                                        label={'Book Category'}
                                                        value={
                                                            data.buku
                                                                .kategoriBuku
                                                                .nama
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
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

export default TransactionsInfo;

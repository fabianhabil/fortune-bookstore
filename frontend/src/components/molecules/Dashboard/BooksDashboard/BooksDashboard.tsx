import InputBookInfo from '@/components/atoms/Dashboard/BookDashboard/InputBookInfo/InputBookInfo';
import ButtonMenu from '@/components/atoms/Dashboard/ButtonMenu/ButtonMenu';
import { Grid, InputBase, InputLabel, Typography } from '@mui/material';
import { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { textFieldStyles } from '@/components/atoms/TextField/TextField';

const booksDashboardMenu: string[] = ['Add Books', 'Manage Books'];

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

const BooksDashboard = () => {
    const [bookMenu, setBookMenu] = useState<number>(1);
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
    console.log(bookInfo);
    const styles = textFieldStyles();

    return (
        <>
            <Grid container direction='column'>
                <Grid item>
                    <Grid container direction='row'>
                        {booksDashboardMenu.map(
                            (data: string, index: number) => {
                                return (
                                    <Grid item xs={6} key={index}>
                                        <ButtonMenu
                                            title={data}
                                            onClick={() =>
                                                setBookMenu(index + 1)
                                            }
                                            active={bookMenu === index + 1}
                                        />
                                    </Grid>
                                );
                            }
                        )}
                    </Grid>
                </Grid>
                <Grid item container direction='column' spacing={2}>
                    <Grid item>
                        <InputBookInfo
                            label='Book Name'
                            value={bookInfo.name}
                            onChange={(e: string) =>
                                setBookInfo((state) => ({ ...state, name: e }))
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
                            onChange={(e: string) =>
                                setBookInfo((state) => ({
                                    ...state,
                                    harga: Number(e)
                                }))
                            }
                        />
                    </Grid>
                    <Grid item>
                        <InputBookInfo
                            label='Book Stock'
                            value={bookInfo.stok}
                            onChange={(e: string) =>
                                setBookInfo((state) => ({
                                    ...state,
                                    stok: Number(e)
                                }))
                            }
                        />
                    </Grid>
                    <Grid item>
                        <InputBookInfo
                            label='Book Page'
                            value={bookInfo.jumlahHalaman}
                            onChange={(e: string) =>
                                setBookInfo((state) => ({
                                    ...state,
                                    jumlahHalaman: Number(e)
                                }))
                            }
                        />
                    </Grid>
                    <Grid item>
                        <InputLabel>
                            <Typography
                                sx={{
                                    fontSize: { md: '18px', xs: '14px' },
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
                            label='Book Weight'
                            value={bookInfo.berat}
                            onChange={(e: string) =>
                                setBookInfo((state) => ({
                                    ...state,
                                    berat: Number(e)
                                }))
                            }
                        />
                    </Grid>
                    <Grid item>
                        <InputBookInfo
                            label='Book Width'
                            value={bookInfo.lebar}
                            onChange={(e: string) =>
                                setBookInfo((state) => ({
                                    ...state,
                                    lebar: Number(e)
                                }))
                            }
                        />
                    </Grid>
                    <Grid item>
                        <InputBookInfo
                            label='Book Height'
                            value={bookInfo.lebar}
                            onChange={(e: string) =>
                                setBookInfo((state) => ({
                                    ...state,
                                    lebar: Number(e)
                                }))
                            }
                        />
                    </Grid>
                    <Grid item>
                        <InputBookInfo
                            label='Book Length'
                            value={bookInfo.panjang}
                            onChange={(e: string) =>
                                setBookInfo((state) => ({
                                    ...state,
                                    panjang: Number(e)
                                }))
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default BooksDashboard;

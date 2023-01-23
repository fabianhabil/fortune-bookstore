/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonMenu from '@/components/atoms/Dashboard/ButtonMenu/ButtonMenu';
import { Grid } from '@mui/material';
import { useState } from 'react';
import CreateBooksDashboard from '@/components/molecules/Dashboard/BooksDashboard/CreateBooksDashboard/CreateBooksDashboard';
import ManageBooksDashboard from '@/components/molecules/Dashboard/BooksDashboard/ManageBooksDashboard/ManageBooksDashboard';

const booksDashboardMenu: string[] = ['Add Books', 'Manage Books'];

const BooksDashboard = () => {
    const [bookMenu, setBookMenu] = useState<number>(1);

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
                {bookMenu === 1 ? <CreateBooksDashboard /> : null}
                {bookMenu === 2 ? <ManageBooksDashboard /> : null}
            </Grid>
        </>
    );
};

export default BooksDashboard;

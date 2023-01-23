/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonMenu from '@/components/atoms/Dashboard/ButtonMenu/ButtonMenu';
import CreatePublisherDashboard from '@/components/molecules/Dashboard/PublisherDashboard/CreatePublisherDashboard/CreatePublisherDashboard';
import { Grid } from '@mui/material';
import { useState } from 'react';

const booksDashboardMenu: string[] = ['Add Publisher'];

const PublisherDashboard = () => {
    const [bookMenu, setBookMenu] = useState<number>(1);

    return (
        <>
            <Grid container direction='column'>
                <Grid item>
                    <Grid container direction='row' sx={{ mb: 2 }}>
                        {booksDashboardMenu.map(
                            (data: string, index: number) => {
                                return (
                                    <Grid item xs={12} key={index}>
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
                {bookMenu === 1 ? <CreatePublisherDashboard /> : null}
            </Grid>
        </>
    );
};

export default PublisherDashboard;

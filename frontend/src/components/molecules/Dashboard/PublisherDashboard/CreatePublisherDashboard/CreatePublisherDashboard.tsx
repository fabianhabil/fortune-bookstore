import api from '@/api/axios-instance';
import InputBookInfo from '@/components/atoms/Dashboard/BookDashboard/InputBookInfo/InputBookInfo';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';

const CreatePublisherDashboard = () => {
    const [publisherName, setPublisherName] = useState<string>('');

    const postPublisher = async () => {
        try {
            const response = await api.post('/penerbit', {
                nama: publisherName
            });
            if (response) {
                console.log(response);
                ToastSuccess('Publisher added!');
                setPublisherName('');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (e.response.status === 409) {
                ToastError('Publisher name is registered!');
            } else {
                ToastError('Server Error!');
            }
        }
    };

    return (
        <>
            <Grid container direction='column'>
                <Grid item container direction='column' spacing={2}>
                    <Grid item>
                        <InputBookInfo
                            label='Publisher Name'
                            value={publisherName}
                            onChange={(e: string) => setPublisherName(e)}
                        />
                    </Grid>
                    <Grid item sx={{ mt: 3 }}>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={postPublisher}
                        >
                            Add Publisher
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CreatePublisherDashboard;

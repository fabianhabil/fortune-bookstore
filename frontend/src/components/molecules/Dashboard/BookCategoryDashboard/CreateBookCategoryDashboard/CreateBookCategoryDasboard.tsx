import api from '@/api/axios-instance';
import InputBookInfo from '@/components/atoms/Dashboard/BookDashboard/InputBookInfo/InputBookInfo';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';

const CreateBookCategoryDashboard = () => {
    const [categoryBook, setCategoryBook] = useState<string>('');

    const postCategory = async () => {
        try {
            const response = await api.post('/kategori', {
                nama: categoryBook
            });
            if (response) {
                console.log(response);
                ToastSuccess('Book Category added!');
                setCategoryBook('');
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
                            label='Book Category Name'
                            value={categoryBook}
                            onChange={(e: string) => setCategoryBook(e)}
                        />
                    </Grid>
                    <Grid item sx={{ mt: 3 }}>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={postCategory}
                        >
                            Add Book Category
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CreateBookCategoryDashboard;

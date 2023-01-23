import { Modal, Box, Grid, Typography, Button } from '@mui/material';

const DeleteBook = ({
    open,
    handleClose,
    deleteBook
}: {
    open: boolean;
    handleClose: (_arg: boolean) => void;
    deleteBook: () => void;
}) => {
    return (
        <>
            <Modal
                open={open}
                onClose={() => {
                    handleClose(false);
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 2,
                        px: 4,
                        '&:focus': {
                            outline: 'none'
                        }
                    }}
                >
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <Typography
                                sx={{ fontSize: '24px', fontWeight: 'bold' }}
                            >
                                Are you sure you want to delete this book?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction='row'>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        onClick={() => handleClose(false)}
                                    >
                                        NO
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth onClick={deleteBook}>
                                        YES
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default DeleteBook;

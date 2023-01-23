import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import ToastError from '../../Toast/ToastError';
import api from '@/api/axios-instance';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext/AuthContext';
import ToastSuccess from '../../Toast/ToastSuccess';

const Topup = ({
    open,
    handleClose
}: {
    open: boolean;
    handleClose: (_arg: boolean) => void;
}) => {
    const [saldo, setSaldo] = useState<number>(0);
    const { getUserData } = useContext(AuthContext)!;

    const topup = async () => {
        try {
            const response = await api.post('/users/topup', { saldo });
            if (response) {
                localStorage.setItem(
                    'user-data',
                    JSON.stringify(response.data.data.userPayload)
                );
                getUserData();
                ToastSuccess('Balance Added!');
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

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
                    <Grid
                        container
                        direction='column'
                        justifyContent='center'
                        spacing={2}
                    >
                        <Grid item>
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}
                            >
                                Topup Balance
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                type='number'
                                label='Balance'
                                onChange={(e) =>
                                    setSaldo(parseInt(e.target.value))
                                }
                            />
                        </Grid>
                        <Grid item>
                            <Button fullWidth onClick={topup}>
                                Topup
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default Topup;

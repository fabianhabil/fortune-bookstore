import { Grid, Typography } from '@mui/material';

const LabelValueBook = ({
    label,
    value
}: {
    label: string;
    value: string | number;
}) => {
    return (
        <>
            <Grid item container direction='column' spacing={0} sx={{ pr: 2 }}>
                <Grid item>
                    <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{ width: '100%' }}>{value}</Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default LabelValueBook;

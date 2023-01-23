import { InputLabel, TextField, Typography } from '@mui/material';

const InputBookInfo = ({
    value,
    label,
    onChange,
    type
}: {
    value: string | number;
    label: string;
    onChange: (_arg: string) => void;
    type?: string;
}) => {
    return (
        <>
            <InputLabel>
                <Typography
                    sx={{
                        fontSize: { md: '18px', xs: '14px' },
                        fontWeight: 'bold',
                        color: 'black',
                        mb: 0.5
                    }}
                >
                    {label}
                </Typography>
            </InputLabel>
            <TextField
                fullWidth
                InputLabelProps={{
                    style: { color: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }
                }}
                value={value === null ? '' : value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.value);
                }}
                type={type ?? 'string'}
            />
        </>
    );
};

export default InputBookInfo;

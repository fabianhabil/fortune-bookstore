import { InputLabel, Select, Typography } from '@mui/material';

const SelectInputBookInfo = ({
    label,
    value,
    onChange,
    data
}: {
    label: string;
    value: number;
    onChange: (_arg: number) => void;
    data: {
        value: number;
        title: string;
    };
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
            <Select value={value} label='label' onChange={onChange}>
                {/* {data} */}
            </Select>
        </>
    );
};

export default SelectInputBookInfo;

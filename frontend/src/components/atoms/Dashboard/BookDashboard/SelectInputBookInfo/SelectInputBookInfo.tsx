/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputLabel, MenuItem, Select, Typography } from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';

const SelectInputBookInfo = ({
    label,
    value,
    onChange,
    data
}: {
    label: string;
    value: number;
    onChange: (_arg: SelectChangeEvent<number>) => void;
    data: any;
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
            <Select value={value} label={label} onChange={onChange} fullWidth>
                <MenuItem value={0}>Please choose {label}!</MenuItem>
                {data.map(
                    (data: any, index: number) => {
                        return (
                            <MenuItem value={index + 1} key={index}>
                                {data.title || data.nama}
                            </MenuItem>
                        );
                    }
                )}
                {/* {data} */}
            </Select>
        </>
    );
};

export default SelectInputBookInfo;

import type { ButtonMenuListTypes } from '@/components/constants/Dashboard/ButtonMenuList';
import { Button, Typography } from '@mui/material';

const ButtonMenu = ({ title, onClick, active }: ButtonMenuListTypes) => {
    return (
        <>
            <Button
                sx={{
                    textTransform: 'none',
                    width: '100%'
                }}
                onClick={onClick}
            >
                <Typography
                    sx={{
                        color: 'black',
                        fontSize: '18px',
                        textDecoration: 'underline',
                        textUnderlineOffset: '6px',
                        textDecorationThickness: '1.5px',
                        textDecorationColor: active ? '#3772ff' : 'black'
                    }}
                >
                    {title}
                </Typography>
            </Button>
        </>
    );
};

export default ButtonMenu;

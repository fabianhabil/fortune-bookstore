import { Typography } from '@mui/material';
import Link from 'next/link';

interface NavbarLinkProps {
    href: string;
    title: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, title }) => {
    return (
        <>
            <Link
                href={href}
                style={{ color: 'inherit', textDecoration: 'none' }}
            >
                <Typography
                    sx={{
                        fontSize: '16px',
                        textDecoration: 'underline',
                        textUnderlineOffset: '6px',
                        textDecorationThickness: '2px',
                        '&:hover': {
                            textDecorationColor: '#6C63FF'
                        },
                        transition: 'all .1s ease-in'
                    }}
                >
                    {title}
                </Typography>
            </Link>
        </>
    );
};

export default NavbarLink;

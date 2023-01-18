import { Container } from '@mui/material';
import React from 'react';

interface ContentWrapperProps {
    children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    return (
        <>
            <Container sx={{ minHeight: '91vh', py: 2 }} maxWidth='xl'>
                {children}
            </Container>
        </>
    );
};

export default ContentWrapper;

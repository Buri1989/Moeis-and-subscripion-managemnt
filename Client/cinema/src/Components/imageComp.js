import React from 'react';
import { Container } from '@mui/system';

const ImageComp = () => {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src='/images/cinema_background_with_red_curtains-.jpg' alt='My Image' />
        </Container>
    )
}

export default ImageComp
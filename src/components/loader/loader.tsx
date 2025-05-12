import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Wrapper } from './styled';

export const Loader: React.FC = () => {
    return (
        <Wrapper>
            <CircularProgress />
        </Wrapper>
    );
};

import React from 'react';
import Button from '@mui/material/Button';

import type { Book } from '@/types/general';
import { BooksList } from '@/components';

import { Wrapper } from './styled';

interface IPrivateBooksView {
    books: Book[];
    onAddBook: () => void;
}

export const PrivateBooksView: React.FC<IPrivateBooksView> = ({ onAddBook, books }) => {
    return (
        <Wrapper>
            <Button
                variant="contained"
                sx={{ marginLeft: 'auto', marginBottom: '15px' }}
                onClick={onAddBook}
            >
                Add book
            </Button>
            <BooksList books={books} />
        </Wrapper>
    );
};

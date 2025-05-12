import React, { useEffect } from 'react';

import type { CreateBookDto } from '@/types/dto';
import { booksStore } from '@/stores/books';

import { PrivateBooksView } from './private-books.view';

export const PrivateBooks: React.FC = () => {
    useEffect(() => {
        booksStore.getBooks();
    }, []);

    const onAddBook = (values: CreateBookDto) => {
        booksStore.addBook(values);
    };

    return (
        <PrivateBooksView
            store={booksStore}
            onAddBook={onAddBook}
        />
    );
};

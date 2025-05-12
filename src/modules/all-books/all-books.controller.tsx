import React, { useEffect } from 'react';

import type { CreateBookDto } from '@/types/dto';
import { booksStore } from '@/stores/books';

import { AllBooksView } from './all-books.view';

export const AllBooks: React.FC = () => {
    useEffect(() => {
        booksStore.getBooks();
    }, []);

    const onAddBook = (values: CreateBookDto) => {
        booksStore.addBook(values);
    };

    return (
        <AllBooksView
            store={booksStore}
            onAddBook={onAddBook}
        />
    );
};

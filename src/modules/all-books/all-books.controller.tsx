import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import type { CreateBookDto } from '@/types/dto';
import { booksStore } from '@/stores/books';
import { Loader, CreateBookModal } from '@/components';

import { AllBooksView } from './all-books.view';

export const AllBooks: React.FC = observer(() => {
    const { books, initialLoading, isLoading, isSuccess } = booksStore;

    const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false);

    useEffect(() => {
        booksStore.getBooks();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setIsCreateBookModalOpen(false);
        }
    }, [isSuccess]);

    const onAddBook = (values: Pick<CreateBookDto, 'author' | 'name'>) => {
        booksStore.addBook(values);
    };

    if (initialLoading) {
        return <Loader />;
    }

    return (
        <>
            <AllBooksView
                books={books}
                onAddBook={() => setIsCreateBookModalOpen(true)}
            />
            <CreateBookModal
                isLoading={isLoading}
                isOpen={isCreateBookModalOpen}
                onClose={() => setIsCreateBookModalOpen(false)}
                onSubmit={onAddBook}
            />
        </>
    );
});

import React, { useEffect } from 'react';

import { booksStore } from '@/stores/books';

import { HeaderView } from './header.view';

export const Header: React.FC = () => {
    useEffect(() => {
        booksStore.getBooks();
    }, []);

    return (
        <HeaderView store={booksStore} />
    );
};

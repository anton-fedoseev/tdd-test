import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { booksStore } from '@/stores/books';

import { HeaderView } from './header.view';

export const Header: React.FC = observer(() => {
    const { privateBooks } = booksStore;

    useEffect(() => {
        booksStore.getBooks();
    }, []);

    return (
        <HeaderView privateTotal={privateBooks.length} />
    );
});

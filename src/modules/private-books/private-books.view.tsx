import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import { Loader, CreateBookModal } from '@/components';
import type { CreateBookDto } from '@/types/dto';
import { BooksStore } from '@/stores/books';

import { Wrapper } from './styled';

interface IPrivateBooksView {
    store: BooksStore;
    onAddBook: (values: CreateBookDto) => void;
}

export const PrivateBooksView = observer<IPrivateBooksView>(({ store, onAddBook }) => {
    const { privateBooks, initialLoading, isLoading, isSuccess } = store;

    const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setIsCreateBookModalOpen(false);
        }
    }, [isSuccess]);

    if (initialLoading) {
        return <Loader />;
    }

    return (
        <Wrapper>
            <Button
                variant="contained"
                sx={{ marginLeft: 'auto', marginBottom: '15px' }}
                onClick={() => setIsCreateBookModalOpen(true)}
            >
                Add book
            </Button>
            <List>
                {privateBooks.map((book, index) => (
                    <ListItem
                        key={index}
                        sx={{ border: '1px solid #1976d2', marginBottom: '5px' }}
                    >
                        <ListItemText
                            primary={book.name}
                            secondary={book.author}
                        />
                    </ListItem>
                ))}
            </List>
            <CreateBookModal
                isLoading={isLoading}
                isOpen={isCreateBookModalOpen}
                onClose={() => setIsCreateBookModalOpen(false)}
                onSubmit={onAddBook}
            />
        </Wrapper>
    );
});

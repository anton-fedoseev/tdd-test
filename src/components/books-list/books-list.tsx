import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import type { Book } from '@/types/general';

interface IBooksList {
    books: Book[];
}

export const BooksList: React.FC<IBooksList> = ({ books }) => {
    return (
        <List>
            {books.map((book, index) => (
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
    );
};
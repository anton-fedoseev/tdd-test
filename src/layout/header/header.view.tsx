import { observer } from "mobx-react-lite";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { BooksStore } from '@/stores/books';

interface IHeaderView {
    store: BooksStore;
}

export const HeaderView = observer<IHeaderView>(({ store }) => {
    const { privateBooks } = store;

    console.log('store', store);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ marginLeft: 'auto' }}>
                        Private books: {privateBooks.length}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
});

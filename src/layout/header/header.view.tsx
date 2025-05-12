import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface IHeaderView {
    privateTotal: number;
}

export const HeaderView: React.FC<IHeaderView> = ({ privateTotal }) => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ marginLeft: 'auto' }}>
                        Private books: {privateTotal}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

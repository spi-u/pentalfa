import { ThemeProvider, createTheme } from '@mui/material';
import Game from './components/Game';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Game />
        </ThemeProvider>
    );
};

export default App;

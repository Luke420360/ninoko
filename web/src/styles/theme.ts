import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8a2dcd'
        },
        secondary: {
            main: '#ff6f61' // Coral
        },
        error: {
            main: '#dc143c' // Crimson Red
        },
        warning: {
            main: '#ffbf00' // Amber
        },
        info: {
            main: '#008080' // Teal
        },
        success: {
            main: '#50c878' // Emerald Green
        }
    },
    typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;

import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
      fontFamily: 'Yusei Magic'
    },

    palette: {
      primary: {
        main: '#003049',
        light: '#F77F00',
        A100: '#FCBF49',
        A200: '#EAE2B7',
        A400: '#D62828'
      },
      secondary: {
        main: '#1D2124',
        grey: '#5E737D',
        A100:'rgb(236, 233, 233)'
      },
    },
  });
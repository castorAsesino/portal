import { createTheme } from "@mui/material/styles";
import { esES } from '@mui/material/locale';
import LogoModiga from "../assets/img/logo-modiga.svg";
import LogoModigaNavbar from "../assets/img/logo-modiga-blanco.svg";
import logoantell from "../assets/img/logoantell.png";

/* se definen los colores y las imagenes que se utilizan el sistema */
export const customTheme = createTheme({
  palette: {
    primary: {
      light: '#4d5382',
      main: '#212b55',
      dark: '#00002c',
      contrastText: '#fff',
      error: '#d85454'
    },
    secondary: {main: '#fd9710', contrastText: '#fff',}
  },
  
  status: {
    imgLogin: LogoModiga,
    imgNavbar: LogoModigaNavbar,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: "Poppins, sans-serif"
        },
        a: {
          "&:hover": {
            color: '#00002c',
          },
        }
      }
    }
  },
  typography: {
    fontFamily: [
      "Poppins",
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    title: {
      fontStyle: 'Poppins',
      fontSize: '1.7rem',
      
      color: '#6d6d6d',
    },
    poster: {
      color: 'red',
    }
  },
  esES
});

export const antellTheme = createTheme({
  palette: {
    primary: {
      light: '#009EBE',
      main: '#005A74',
      dark: '#009EBF',
      contrastText: '#fff',
      error: '#d85454'
    },
    secondary: {main: '#fd9710', contrastText: '#fff',}
  },
  
  status: {
    imgLogin: logoantell,
    imgNavbar: logoantell,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: "Poppins, sans-serif"
        },
        a: {
          "&:hover": {
            color: '#00002c',
          },
        }
      }
    }
  },
  typography: {
    fontFamily: [
      "Poppins",
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    title: {
      fontStyle: 'Poppins',
      fontSize: '1.7rem',
      
      color: '#6d6d6d',
    },
    poster: {
      color: 'red',
    }
  }
});

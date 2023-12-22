// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { blue, red, cyan, amber, green, grey } from '@mui/material/colors';
import config from '../config';
import Typography from './typography';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

export const MODE = {
    DARK: 'dark',
    LIGHT: 'light'
};

const Palette = (mode) => {
    const contrastText = '#fff';
    const themeTypography = Typography(config.fontFamily);
    return mode === MODE.DARK
        ? //다크모드 색상
          createTheme({
              typography: themeTypography,
              palette: {
                  mode: mode,
                  common: {
                      transparent: 'transparent',
                      white: '#000',
                      grayPale: 'rgba(30, 30, 30, 1)',
                      grayLightest: 'rgba(30, 30, 30, 1)',
                      grayBorder: 'rgba(255, 255, 255, 0.15)',
                      grayNoti: 'rgba(255, 255, 255, 0.2)',
                      grayMid: '#a2a6ab',
                      grayLight: 'rgb(160, 160, 160)',
                      grayDark: ' #fff',
                      black: '#fff',
                      orange: '#fab005',
                      red: '#fe5f57',
                      green: '#02b776',
                      mint: '#00c2d5',
                      main: 'rgb(0, 105, 216)',
                      mainHover: 'rgba(0, 105, 216, 0.3)',
                      blue: '#0069d8',
                      violet: '#7761ff',
                      stepperbg: '#0069d8',
                      tableHeader: '#141414',
                      tableRow: 'rgba(30, 30, 30, 1)',
                      tableShadow: 'rgba(0, 0, 0, 1)'
                  },
                  primary: {
                      lighter: blue[50],
                      100: blue[100],
                      200: blue[200],
                      light: blue[300],
                      400: blue[400],
                      main: blue[500],
                      dark: blue[600],
                      700: blue[700],
                      darker: blue[800],
                      900: blue[900],
                      contrastText,
                      logo: '#fff',
                      version: '#fff',
                      hometext: '#60879A',
                      homelogo: '#2196f3',
                      centerIcon1: '#fff'
                  },
                  secondary: {
                      lighter: grey[100],
                      100: grey[100],
                      200: grey[200],
                      light: grey[300],
                      400: grey[400],
                      main: grey[500],
                      600: grey[600],
                      dark: grey[700],
                      800: grey[800],
                      darker: grey[900],
                      A100: grey[0],
                      A200: grey[800],
                      A300: grey[900],
                      contrastText: grey[50]
                  },
                  error: {
                      lighter: red[50],
                      light: red[200],
                      main: red[400],
                      dark: red[700],
                      darker: red[900],
                      contrastText
                  },
                  warning: {
                      lighter: amber[50],
                      light: amber[300],
                      main: amber[500],
                      dark: amber[700],
                      darker: amber[900],
                      contrastText: grey[100]
                  },
                  info: {
                      lighter: cyan[50],
                      light: cyan[300],
                      main: cyan[500],
                      dark: cyan[700],
                      darker: cyan[900],
                      contrastText
                  },
                  success: {
                      lighter: green[50],
                      light: green[300],
                      main: green[500],
                      dark: green[700],
                      darker: green[900],
                      contrastText
                  },
                  text: {
                      primary: '#fff',
                      secondary: grey[500],
                      disabled: grey[400],
                      tableHeaderText: '#a2a6ab'
                  },
                  action: {
                      disabled: grey[300]
                  },
                  divider: grey.A100,
                  background: {
                      paper: 'rgba(30, 30, 30, 1)',
                      default: '#141414',
                      contrast: '#f9f9f9'
                      // default: grey[50]
                  }
              }
          })
        : //라이트모드 색상
          createTheme({
              palette: {
                  mode: mode,
                  common: {
                      transparent: 'transparent',
                      white: '#fff',
                      grayPale: '#f6f7f9',
                      grayLightest: '#f3f4f5',
                      grayBorder: '#d5dbe0',
                      grayNoti: '#f5f5f5',
                      grayLight: '#9ea3ab',
                      grayMid: ' #666b73',
                      grayDark: '#252d3a',
                      black: '#000',
                      orange: '#fab005',
                      red: '#fe5f57',
                      green: '#02b776',
                      mint: '#00c2d5',
                      main: ' rgb(0, 105, 216)',
                      mainHover: 'rgba(0, 105, 216, 0.1)',
                      blue: '#0069d8',
                      violet: '#7761ff',
                      stepperbg: '#fff',
                      tableHeader: '#f6f7f9',
                      tableRow: '#fff',
                      tableShadow: 'RGBA(229, 231, 245, 1)'
                  },
                  primary: {
                      lighter: blue[50],
                      100: blue[100],
                      200: blue[200],
                      light: blue[300],
                      400: blue[400],
                      main: blue[500],
                      dark: blue[600],
                      700: blue[700],
                      darker: blue[800],
                      900: blue[900],
                      contrastText,
                      logo: '#252D3A',
                      version: '#8d6e63',
                      hometext: '#344457',
                      homelogo: '#005CAC',
                      centerIcon1: '#fff'
                  },
                  secondary: {
                      lighter: grey[100],
                      100: grey[100],
                      200: grey[200],
                      light: grey[300],
                      400: grey[400],
                      main: grey[500],
                      600: grey[600],
                      dark: grey[700],
                      800: grey[800],
                      darker: grey[900],
                      A100: grey[0],
                      A200: grey[800],
                      A300: grey[900],
                      contrastText: grey[50]
                  },
                  error: {
                      lighter: red[50],
                      light: red[200],
                      main: red[400],
                      dark: red[700],
                      darker: red[900],
                      contrastText
                  },
                  warning: {
                      lighter: amber[50],
                      light: amber[300],
                      main: amber[500],
                      dark: amber[700],
                      darker: amber[900],
                      contrastText: grey[100]
                  },
                  info: {
                      lighter: cyan[50],
                      light: cyan[300],
                      main: cyan[500],
                      dark: cyan[700],
                      darker: cyan[900],
                      contrastText
                  },
                  success: {
                      lighter: green[50],
                      light: green[300],
                      main: green[500],
                      dark: green[700],
                      darker: green[900],
                      contrastText
                  },
                  text: {
                      primary: grey[700],
                      secondary: grey[500],
                      disabled: grey[400],
                      tableHeaderText: '#666b73'
                  },
                  action: {
                      disabled: grey[300]
                  },
                  divider: grey.A100,
                  background: {
                      paper: '#fff',
                      default: '#f6f7f9',
                      contrast: '#424242'
                      // default: grey[50]
                  }
              }
          });
};

export default Palette;

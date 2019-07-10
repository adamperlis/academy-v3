/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';


// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      main: '#848484',
      // dark: will be calculated from palette.secondary.main,
    },
    default: 'rgba(0,0,0,0)',
    // error: will us the default color
  },
  typography: {
      // Use the system font over Roboto.
      fontFamily: 'Montserrat, sans-serif',
      fontWeightMedium: 500,
      fontSize: 10,
      body1: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 300,
        lineHeight: 1.7,
        fontSize: 14,
      },
      body2: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 300,
        lineHeight: 1.7,
        fontSize: 10,
      },
      display4: {
        fontFamily: 'Crimson Text, serif',
        color: 'black',
        fontSize: 'calc(1.5em + 1.25vw)',
        lineHeight:'1.3em'
      },
      display3: {
        fontFamily: 'Crimson Text, serif',
        color: '#848484',
        fontSize: 'calc(1.5em + 1.25vw)',
        lineHeight:'1.3em'
      },
      display2: {
        fontFamily: 'Crimson Text, serif',
        color: 'black',
        fontSize: 'calc(1.5em + 1vw)',
        lineHeight:'1.20588em',
        marginLeft:'0'
      },
      display1: {
        fontFamily: 'Crimson Text, serif',
        color: '#848484',
        fontSize: 'calc(1.5em + 1vw)',
        lineHeight:'1.20588em',
        marginLeft:'0'
      },
      title: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        letterSpacing:'.5px',
        textTransform:'uppercase',
        fontSize: 'calc(.5em + .25vw)'
      },
      headline: {
        fontFamily: 'Crimson Text, serif',
        fontWeight: 400,
        fontSize: 'calc(1.6em + .5vw)',
      },
      button: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: 12,
        color: '#2f2f40',
        textTransform:'none',
        letterSpacing: 'normal',
      },
      caption: {
        color: 'rgba(0, 0, 0, .5)',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 300,
        lineHeight: 1.75,
        fontSize: 12,
      }
    },
    overrides: {
      MuiButton: {
        // Name of the styleSheet
        root: {
          // Name of the rule
          borderRadius: 3,
          border: 0,
          height: 'auto',
          padding: '0px',
          fontSize: 12,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          letterSpacing:'1.8px',
          textTransform:'uppercase',
          minWidth: 'auto',
          display:'inline-block',
          borderRadius:0,
          boxShadow:'none',
          backgroundColor: 'none',

          '&:hover': {
            textDecoration: 'none',
            // Reset on mouse devices
            backgroundColor: 'none',
          },
        },
    },
    MuiIconButton: {
      // Name of the styleSheet
      root: {
        borderRadius: '100px',
        background:'rgba(255,255,255,.25)',
        // Name of the rule
        '&:hover': {
          textDecoration: 'none',
          // Reset on mouse devices
          backgroundColor: 'none',
        },
        '&:focus':{
          background:'rgba(255,255,255,.25)',
        }
      },
    },
    MuiAppBar: {
      root: {
        boxShadow:'none',
        backgroundColor: 'transparent',
      },
    },
    MuiModal:{
      root:{
        zIndex:999999999,
      }
    },
    MuiChip:{
      root:{
        borderRadius:0,
        marginRight:'10px',
        marginBottom:'10px',
      }
    },
    MuiDialogActions:{
      root:{
        margin:'8px 8px'
      }
    }
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}

import Router from './routes/index';
import {BrowserRouter} from 'react-router-dom';
import {  ThemeProvider } from '@material-ui/core';
import theme from "./theme/theme";
import { CssBaseline } from '@material-ui/core';
import { StyledEngineProvider } from '@material-ui/core';

export default function App(){


  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  )
}

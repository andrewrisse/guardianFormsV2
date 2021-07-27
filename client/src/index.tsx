import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { store } from "./redux/store";
import { Auth0Provider } from '@auth0/auth0-react';
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN_NAME
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_REDIRECT_URL= process.env.REACT_APP_REDIRECT_URL

ReactDOM.render(
    <Auth0Provider domain={AUTH0_DOMAIN!} clientId={AUTH0_CLIENT_ID!} redirectUri={AUTH0_REDIRECT_URL!}>
      <HelmetProvider>
        <React.StrictMode>
          <ReduxProvider store={store}>
          <App />
          </ReduxProvider>
        </React.StrictMode>
      </HelmetProvider>
    </Auth0Provider>,
  document.getElementById('root')
);


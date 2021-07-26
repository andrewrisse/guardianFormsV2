import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { store } from "./redux/store";
import { Auth0Provider } from '@auth0/auth0-react';
const AUTH0_DOMAIN = "dev-vcyhieqy.us.auth0.com";
const AUTH0_CLIENT_ID = "z3wGICauB28K5HorU1oHfD57k1QIXeZO";
const AUTH0_REDIRECT_URL= "http://localhost:3000/dashboard";

ReactDOM.render(
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID} redirectUri={AUTH0_REDIRECT_URL}>
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


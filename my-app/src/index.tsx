import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import ToastNotify from "./components/ToastNotify";
import {Auth0Provider} from '@auth0/auth0-react';
import App from "./App";

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const audience = process.env.REACT_APP_AUTH0_AUDIENCE
const redirectURL = process.env.REACT_APP_AUTH0_REDIRECT_URI

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




root.render(
    <Auth0Provider
        domain={domain as string}
        clientId={clientId as string}
        authorizationParams={{
            redirect_uri: redirectURL,
            audience: audience
        }}>
        <Provider store={store}>
              <BrowserRouter>
                  <App />
                  <ToastNotify/>
              </BrowserRouter>
        </Provider>
    </Auth0Provider>
);

reportWebVitals();

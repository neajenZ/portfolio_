import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {Store} from "./Store/Store";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = {
    media: {
        notebook: '(max-width: 1024px)',
        tablet: '(max-width: 768px)',
        phone: '(max-width: 420px)'
    }
}

root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Provider store={Store}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Provider>
        </ThemeProvider>
    </BrowserRouter>

);

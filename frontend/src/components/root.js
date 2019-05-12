import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';

const Root = ({ store }) => (
    <Provide store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provide>
);

export default Root;
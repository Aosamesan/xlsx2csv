import '@babel/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import storeFactory from './state';
import { Provider } from 'react-redux';
import { App } from './components';

const store = storeFactory();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
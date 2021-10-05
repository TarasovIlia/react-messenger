import './style.scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store'
import {
    withRouter,
    BrowserRouter as Router,
    Route, 
    Link, 
    Switch, 
    Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';

const mainApp = document.getElementById('root')
const history = createBrowserHistory()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    mainApp
);
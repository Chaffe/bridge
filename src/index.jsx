import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App/App.jsx";

ReactDOM.render (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('bridge')
)
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

import { issuesReducer } from './reducer/index';

const store = createStore(issuesReducer, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
<Router>
    <App />
</Router>
</Provider>
, document.getElementById('root'));
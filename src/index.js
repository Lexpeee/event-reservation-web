import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { baseUrl } from "./static";
import axios from 'axios'

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap-lux.min.css'
import 'material-icons/iconfont/material-icons.css'

axios.defaults.baseURL = baseUrl



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

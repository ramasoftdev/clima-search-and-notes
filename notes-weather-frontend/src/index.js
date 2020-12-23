import './includes/bootstrap';
import './index.css';
import "./assets/scss/paper-dashboard.scss?v=1.2.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "react-notifications-component/dist/theme.css";

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactNotification from 'react-notifications-component'
import configureStore from './redux/configureStore';

// import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactNotification />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

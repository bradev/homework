// polyfill
import "babel-polyfill";

import 'semantic-ui-css/semantic.min.css';
import { render } from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';
import store from "./store";
import registerServiceWorker from './registerServiceWorker';
import App from "./App";

render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();

import * as React from "react";
import App from "./App";
import { Provider } from "mobx-react";
import store from "./store";
import "./index.less";

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

import * as React from "react";
import App from "./App";
import { Provider } from "mobx-react";
import store from "./store";
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

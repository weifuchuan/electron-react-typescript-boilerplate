import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "renderer/index";
import "./app.global.css";

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("root")
);

if ((module as any).hot) {
  (module as any).hot.accept("renderer/index", () => {
    const NextRoot = require("renderer/index").default;
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}

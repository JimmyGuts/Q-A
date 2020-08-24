import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./components/App.jsx";

const FullApp = () => {
  return (
    <Switch>
      <Route
        path="/products/:productID"
        render={(props) => {
          const { productID } = props.match.params || { productID: undefined };
          return <App productID={productID} />;
        }}
      />
    </Switch>
  );
};

ReactDom.render(
  <BrowserRouter>
    <FullApp />
  </BrowserRouter>,
  document.getElementById("qanda")
);

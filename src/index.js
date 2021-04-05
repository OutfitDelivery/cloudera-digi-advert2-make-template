import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

function temp(){
  //var node = ReactDOM.findDOMNode(document.getElementById("root"));
  //console.log(node.querySelector("#test"))
}

ReactDOM.render(
  <React.StrictMode>
    <App {...window.templateProps} />
  </React.StrictMode>,
  document.getElementById("root"),
  temp()
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

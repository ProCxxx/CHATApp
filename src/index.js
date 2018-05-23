import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

// CSS
import "./index.css";

// Components
import App from "./app";
var status = "out";
var uuid = null;
var lsin = localStorage.getItem("status");
if (lsin === "in" && localStorage.getItem("uuid") !== "") {
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4) {
      try {
        var respons = JSON.parse(ajax.response);
        if (respons.status === "error") {
          alert(respons.message);
        } else if (respons.status === "success") {
          status = "in";
          uuid = respons.uuid;
        }
      } catch (e) {
        console.log(e);
      }
      ReactDOM.render(
        <App status={status} uuid={uuid} />,
        document.getElementById("root")
      );
    }
  };
  ajax.open("POST", "http://localhost/CHATApp/checkcreds.php");
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajax.send("uuid=" + localStorage.getItem("uuid"));
}

registerServiceWorker();

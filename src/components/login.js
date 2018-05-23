import React, { Component } from "react";
import "./css/login.css";

export default class LogIn extends Component {
  constructor() {
    super();
    this.state = {};
  }

  tryLogIn(e) {
    e.preventDefault();
    var err = e.currentTarget.parentNode.querySelector(".error");
    if (this.refs.username.value !== "" && this.refs.password.value !== "") {
      var username = this.refs.username.value;
      var password = this.refs.password.value;
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          try {
            var response = JSON.parse(ajax.response);
            if (response.status === "error") {
              err.innerText = response.message;
              err.classList.add("set");
            } else if (response.status === "success") {
              localStorage.setItem("status", "in");
              localStorage.setItem("uuid", response.uuid);
              this.props.changeActive({
                active: "chat",
                status: "in",
                uuid: response.uuid
              });
            }
          } catch (e) {
            console.error(e);
          }
        }
      };

      ajax.open("POST", "http://localhost/CHATApp/login.php");
      ajax.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      ajax.send("username=" + username + "&password=" + password);
    } else {
      err.classList.add("set");
      err.innerText = "Enter both, username and password";
    }
  }
  render() {
    return (
      <div className="login">
        <p className="title">Log in</p>
        <form onSubmit={this.tryLogIn.bind(this)}>
          <input
            ref="username"
            placeholder="Username"
            type="text"
            required=""
          />
          <input
            ref="password"
            placeholder="Password"
            type="password"
            required=""
          />
          <input ref="submit" value="Log in" type="submit" />
        </form>
        <p className="error" />
      </div>
    );
  }
}

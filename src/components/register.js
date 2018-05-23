import React, { Component } from "react";
import "./css/register.css";
export default class Register extends Component {
  tryRegister(e) {
    e.preventDefault();
    var err = e.currentTarget.parentNode.querySelector(".error");
    if (
      this.refs.name.value !== "" &&
      this.refs.username.value !== "" &&
      this.refs.password.value !== ""
    ) {
      if (this.refs.password.value === this.refs.password2.value) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () => {
          if (ajax.readyState === 4) {
            try {
              var response = JSON.parse(ajax.response);
              if (response.status === "error") {
                this.setError(err, response.message);
              } else if (response.status === "success") {
                localStorage.setItem("status", "in");
                localStorage.setItem("uuid", response.uuid);
                this.props.changeActive({
                  active: "profile",
                  status: "in",
                  uuid: response.uuid
                });
              }
            } catch (e) {
              console.error(e);
            }
          }
        };
        ajax.open("POST", "http://localhost/CHATApp/register.php");
        ajax.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        ajax.send(
          "username=" +
            this.refs.username.value +
            "&name=" +
            this.refs.name.value +
            "&password=" +
            this.refs.password.value +
            "&password2=" +
            this.refs.password2.value
        );
      } else {
        this.setError(err, "Passwords doesn't match");
      }
    } else {
      this.setError(err, "Enter all fields");
    }
  }
  setError(el, msg) {
    el.innerText = msg;
    el.classList.add("set");
  }
  render() {
    return (
      <div className="register">
        <p className="title">Register</p>
        <form onSubmit={this.tryRegister.bind(this)}>
          <input ref="name" placeholder="Full name" type="text" />
          <input ref="username" placeholder="Username" type="text" />
          <input ref="password" placeholder="Password" type="password" />
          <input ref="password2" placeholder="And again" type="password" />
          <input ref="submit" value="Register" type="submit" />
        </form>
        <p className="error" />
      </div>
    );
  }
}

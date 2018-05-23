import React, { Component } from "react";
import NavbarItem from "./navbarItem";

import "./css/navbar.css";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = { items: [] };
  }
  changeActive(obj) {
    this.props.changeActive(obj);
  }
  componentDidMount() {
    var el = [];
    if (this.props.status === "in") {
      el.push(
        <NavbarItem
          text="Chat"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
      el.push(
        <NavbarItem
          text="Profile"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
      el.push(
        <NavbarItem
          text="Log out"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
    } else {
      el.push(
        <NavbarItem
          text="Log in"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
      el.push(
        <NavbarItem
          text="Register"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
    }
    this.setState({ items: el });
  }
  componentWillReceiveProps = nextProps => {
    var el = [];
    if (nextProps.status === "in") {
      el.push(
        <NavbarItem
          text="Chat"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
      el.push(
        <NavbarItem
          text="Profile"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
      el.push(
        <NavbarItem
          text="Log out"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
    } else {
      el.push(
        <NavbarItem
          text="Log in"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
      el.push(
        <NavbarItem
          text="Register"
          key={Math.floor(Date.now() * Math.random())}
          changeActive={this.changeActive.bind(this)}
        />
      );
    }
    this.setState({ items: el });
  };
  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <p className="title">CHAT</p>
        </div>
        <div className="items">{this.state.items}</div>
      </div>
    );
  }
}

import React, { Component } from "react";

import Navbar from "./components/navbar";
import Chat from "./components/chat";
import LogIn from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.status === "out" ? "log in" : "profile",
      activeComponent: null, // <LogIn changeActive={this.changeActive.bind(this)}/>,
      status: this.props.status,
      uuid: props.uuid
    };
  }
  changeActive(obj) {
    var x = {
      active: obj.active
    };
    if (obj.status !== undefined && obj.status !== null) {
      x.status = obj.status;
    } else {
      x.status = this.state.status;
    }
    if (obj.uuid !== undefined && obj.uuid !== null) {
      x.uuid = obj.uuid;
    } else {
      x.uuid = this.state.uuid;
    }
    var act = { activeComponent: this.state.activeComponent };
    if (x.active === "chat") {
      act = {
        activeComponent: (
          <Chat
            uuid={this.state.uuid}
            changeActive={this.changeActive.bind(this)}
          />
        )
      };
    } else if (x.active === "profile") {
      act = {
        activeComponent: (
          <Profile
            uuid={this.state.uuid}
            changeActive={this.changeActive.bind(this)}
          />
        )
      };
    } else if (x.active === "log in") {
      act = {
        activeComponent: <LogIn changeActive={this.changeActive.bind(this)} />
      };
    } else if (x.active === "register") {
      act = {
        activeComponent: (
          <Register changeActive={this.changeActive.bind(this)} />
        )
      };
    } else if (x.active === "log out") {
      act = {
        activeComponent: <LogIn changeActive={this.changeActive.bind(this)} />
      };
      x.status = "out";
      x.active = "log in";
      x.uuid = null;
      localStorage.setItem("uuid", "");
      localStorage.setItem("status", "out");
    }
    this.setState({
      active: x.active,
      status: x.status,
      uuid: x.uuid,
      activeComponent: act.activeComponent
    });
  }
  componentDidMount() {
    this.setState({ status: this.props.status });
    this.changeActive(this.state);
  }
  // componentWillReceiveProps(nextProps) {
  //     console.log(nextProps)
  //     // this.setState(nextProps);
  //     // this.changeActive(this.state)
  // }
  render() {
    return (
      <div>
        <Navbar
          status={this.state.status}
          changeActive={this.changeActive.bind(this)}
        />
        {this.state.activeComponent}
      </div>
    );
  }
}

import React, { Component } from "react";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { uuid: props.uuid };
    this.getInfo = this.getInfo.bind(this);
  }
  getInfo() {
    if (this.state.uuid === localStorage.getItem("uuid")) {
      this.props.changeActive({ active: "log in", uuid: null, status: "out" });
      return;
    }
  }
  componentDidMount = () => {
    this.getInfo();
  };

  render() {
    return (
      <div className="profile">
        <p className="title">Profile</p>
        <div className="img" />
      </div>
    );
  }
}

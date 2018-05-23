import React, { Component } from "react";

export default class UserInfo extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="userInfo">
        <div className="top">
          <p className="name">{this.props.info.name}</p>
        </div>
        <div className="mid">
          <img src={this.props.info.profilePic} alt={this.props.info.name} />
        </div>
      </div>
    );
  }
}

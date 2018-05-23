import React, { Component } from "react";

export default class Person extends Component {
  handleClick(e) {
    this.props.personClick(this.props.id);
  }
  render() {
    return (
      <div className="person" onClick={this.handleClick.bind(this)}>
        <img src={this.props.profilePic} alt={this.props.name} />
        <div className="wrap">
          <p className="name">{this.props.name}</p>
          <p className="lastMsg">{this.props.lastMsg}</p>
        </div>
      </div>
    );
  }
}

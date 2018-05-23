import React, { Component } from "react";

export default class NavbarItem extends Component {
  changeActive() {
    this.props.changeActive({
      active: this.props.text.toString().toLowerCase()
    });
  }
  render() {
    return (
      <div
        style={{cursor: "pointer"}}
        className="navbarItem"
        onClick={this.changeActive.bind(this)}
      >
        <p className="text">{this.props.text}</p>
      </div>
    );
  }
}

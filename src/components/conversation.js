import React, { Component } from "react";
import UserInfo from "./userinfo";

export default class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: props.uuid,
      convID: props.convID,
      userInfo: "show"
    };
  }
  showUserInfo(e) {
    var clasa = this.state.userInfo;
    clasa === "show" ? (clasa = "hide") : (clasa = "show");
    this.setState({ userInfo: clasa });
    if (clasa === "show") {
      e.target.innerText = "X";
    } else {
      e.target.innerText = "ooo";
    }
  }
  sendMessage(e) {
    e.preventDefault();
    if (e.target.children[0].value) {
      this.props.sendMessage(e.target.children[0].value);
      e.target.children[0].value = "";
      e.target.children[0].focus();
    }
  }
  render() {
    return (
      <div className="conversation">
        <div className="left">
          <div className="top">
            {/* <img src={this.props.info.profilePic} alt={this.props.info.name} /> */}
            <div className="info">
              {/* <p className="name">{this.props.info.name}</p> */}
              <p className="lastOnline">
                {
                  /*this.props.info.lastOnline */
                  "3 min ago"
                }
              </p>
            </div>
            <div className="action">
              <p className="infoIcon" onClick={this.showUserInfo.bind(this)}>
                ooo
              </p>
            </div>
          </div>
          <div className="mid" />
          <form className="bot" onSubmit={this.sendMessage.bind(this)}>
            <input type="text" placeholder="Enter message..." />
          </form>
        </div>
        <div className={"right " + this.state.userInfo}>
          {/* <UserInfo info={this.props.info} /> */}
        </div>
      </div>
    );
  }
}

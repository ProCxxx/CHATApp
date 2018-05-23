import React, { Component } from "react";

import "./css/chat.css";

import Chats from "./chats";
import Conversation from "./conversation";

var user = {
  name: "Pr0xY",
  profileImg: "favicon.ico",
  time: Date.now(),
  convs: [
    {
      name: "Tarik Lowris",
      lastMsg: "Dobar 3",
      profilePic: "favicon.ico"
    },
    {
      name: "1br0 Husic",
      lastMsg: "Duvaj zmaja",
      profilePic: "favicon.ico"
    }
  ]
};

export default class Chat extends Component {
  constructor() {
    super();
    this.state = { user: user };
  }
  sendMessage(val) {
    var cur = this.state.user;
    cur.convs[0].lastMsg = val;
    this.setState({ user: cur });
    this.setState({ chat: <Chats time={Date.now()} user={this.state.user} /> });
  }
  componentWillMount = () => {
    this.setState({ chat: <Chats user={this.state.user} /> });
  };
  render() {
    return (
      <div className="chat">
        {this.state.chat}
        <Conversation
          info={user.convs[0]}
          sendMessage={this.sendMessage.bind(this)}
        />
      </div>
    );
  }
}

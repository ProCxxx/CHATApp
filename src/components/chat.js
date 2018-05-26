import React, { Component } from "react";

import "./css/chat.css";

import Chats from "./chats";
import Conversation from "./conversation";
// const Conversation = props => {
//   return <div />;
// };

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: props.uuid,
      user: { uuid: props.uuid },
      convs: [],
      chat: <div />,
      conversation: <div />
    };
  }
  sendMessage(val) {
    var cur = this.state.convs;
    cur.convs[0].lastMsg = val;
    this.setState({ chat: <Chats /> });
  }

  changeActiveChat(id) {
    for (var i = 0; i < this.state.convs.length; i++) {
      if (this.state.convs[i].convID === id) {
        var curr = i;
        break;
      }
    }
    this.setState({
      conversation: (
        <Conversation
          sendMessage={this.sendMessage.bind(this)}
          uuid={this.state.uuid}
          convID={this.state.convs[curr].convID}
        />
      )
    });
  }

  componentWillMount = () => {
    this.setState({
      chat: (
        <Chats
          convs={this.state.convs}
          user={{
            uuid: this.state.user.uuid,
            name: "",
            profilepic: ""
          }}
          changeActiveChat={this.changeActiveChat.bind(this)}
        />
      ),
      conversation: (
        <Conversation
          uuid={this.state.uuid}
          sendMessage={this.sendMessage.bind(this)}
        />
      )
    });
  };
  componentDidMount() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        try {
          var response = JSON.parse(ajax.responseText);
          if (response.status === "error") {
            alert(response.message);
          } else if (response.status === "success") {
            this.setState({
              user: {
                name: response.name,
                profilepic: response.profilepic,
                uuid: this.state.user.uuid
              },
              convs: response.convs,
              chat: (
                <Chats
                  changeActiveChat={this.changeActiveChat.bind(this)}
                  convs={response.convs}
                  user={{
                    uuid: this.state.uuid,
                    name: response.name,
                    profilepic: response.profilepic
                  }}
                />
              ),
              conversation: <Conversation />
            });
          }
        } catch (e) {
          console.log(e);
          console.log(ajax.response);
        }
      }
    };
    ajax.open("POST", "http://localhost/CHATApp/getinfo.php");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(
      "uuid=" + this.state.uuid + "&action=conversation&val=" + Date.now()
    );
  }
  render() {
    return (
      <div className="chat">
        {this.state.chat}
        {this.state.conversation}
      </div>
    );
  }
}

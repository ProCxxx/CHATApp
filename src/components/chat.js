import React, { Component } from "react";

import "./css/chat.css";

// import Chats from "./chats";
// import Conversation from "./conversation";
const Chats = props => {
  return <div />;
};
const Conversation = props => {
  return <div />;
};

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { uuid: props.uuid, user: { convs: [] } };
  }
  sendMessage(val) {
    var cur = this.state.user;
    cur.convs[0].lastMsg = val;
    this.setState({ chat: <Chats /> });
  }
  componentWillMount = () => {
    this.setState({
      chat: <Chats />,
      conversation: (
        <Conversation info={0} sendMessage={this.sendMessage.bind(this)} />
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
              user: { name: response.name, profilepic: response.profilepic },
              convs: response.convs
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

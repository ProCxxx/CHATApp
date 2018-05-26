import React, { Component } from "react";
import Person from "./person";

export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: props.user.uuid,
      convs: props.convs,
      user: { name: props.user.name, profilePic: props.user.profilepic }
    };
    this.updatePeople = this.updatePeople.bind(this);
  }

  updatePeople(obj) {
    var svi;
    if (obj === undefined) {
      svi = this.state.convs;
    } else {
      svi = obj;
    }
    var ljudi = [];
    for (var i = 0; i < svi.length; i++) {
      var item = (
        <Person
          personClick={this.personClick.bind(this)}
          id={svi[i].convID}
          name={svi[i].name}
          lastMsg={svi[i].lastmsg.toString().substr(0, 15)}
          profilePic={svi[i].profilepic}
          key={Math.floor(Math.random() * Date.now())}
        />
      );
      ljudi.push(item);
    }
    this.setState({ persons: ljudi });
  }
  trigerSearch(e) {
    var svi = this.state.convs;
    if (e.target.value === "") {
      this.updatePeople();
      return;
    }
    var text = e.target.value;
    var ljudi = [];
    for (var i = 0; i < svi.length; i++) {
      if (
        svi[i].name
          .toString()
          .toLowerCase()
          .includes(text.toString().toLowerCase())
      ) {
        ljudi.push(
          <Person
            personClick={this.personClick.bind(this)}
            id={svi[i].convID}
            name={svi[i].name}
            lastMsg={svi[i].lastmsg.toString().substr(0, 20)}
            profilePic={svi[i].profilepic}
          />
        );
      }
    }
    this.setState({ persons: ljudi });
  }
  personClick(id) {
    this.props.changeActiveChat(id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ convs: nextProps.convs, user: nextProps.user });
    this.updatePeople(nextProps.convs);
  }
  componentDidMount = () => {
    this.updatePeople();
  };
  render() {
    return (
      <div className="chats">
        <div className="title">
          <img src={this.state.user.profilepic} alt={this.state.user.name} />
          <p className="name">{this.props.user.name}</p>
        </div>
        <div className="search">
          <input
            type="serach"
            placeholder="Search for person"
            onChange={this.trigerSearch.bind(this)}
          />
        </div>
        <div className="chatss">{this.state.persons}</div>
      </div>
    );
  }
}

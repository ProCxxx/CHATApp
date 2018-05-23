import React, { Component } from "react";
import Person from "./person";

export default class Chats extends Component {
  constructor() {
    super();
    this.state = {};
    this.updatePeople = this.updatePeople.bind(this);
  }

  updatePeople(obj) {
    var svi;
    if (obj === undefined) {
      svi = this.props.user.convs;
    } else {
      svi = obj;
    }
    var ljudi = [];
    for (var i = 0; i < svi.length; i++) {
      var item = (
        <Person
          personClick={this.personClick.bind(this)}
          id={Math.floor(Math.random() * Date.now())}
          name={this.props.user.convs[i].name}
          lastMsg={this.props.user.convs[i].lastMsg.toString().substr(0, 15)}
          profilePic={this.props.user.convs[i].profilePic}
          key={Math.floor(Math.random() * Date.now())}
        />
      );
      ljudi.push(item);
    }
    this.setState({ persons: ljudi });
  }
  trigerSearch(e) {
    var svi = this.props.user.convs;
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
            id={Math.floor(Math.random() * Date.now())}
            name={svi[i].name}
            lastMsg={svi[i].lastMsg.toString().substr(0, 20)}
            profilePic={svi[i].profilePic}
          />
        );
      }
    }
    this.setState({ persons: ljudi });
  }
  personClick(id) {}
  componentWillReceiveProps() {
    this.updatePeople();
  }
  componentDidMount = () => {
    this.updatePeople();
  };

  render() {
    return (
      <div className="chats">
        <div className="title">
          <img src={this.props.user.profileImg} alt="profilePic" />
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

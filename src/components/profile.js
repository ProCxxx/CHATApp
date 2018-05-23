import React, { Component } from "react";
import "./css/profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { uuid: props.uuid, info: {} };
    this.getInfo = this.getInfo.bind(this);
  }
  getInfo() {
    if (this.state.uuid !== localStorage.getItem("uuid")) {
      this.props.changeActive({ active: "log in", uuid: null, status: "out" });
      return;
    }
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        try {
          var response = JSON.parse(ajax.response);
          if (response.status === "success") {
            this.setState({ info: response });
          } else {
            throw ReferenceError;
          }
        } catch (e) {
          this.setState({ info: { status: "error", code: 1 } });
        }
      }
    };
    ajax.open("POST", "http://localhost/CHATApp/getinfo.php");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("uuid=" + this.state.uuid + "&action=profile");
  }
  changeProfilePic(e) {
    e.preventDefault();
    e.currentTarget.parentNode.querySelector("img").src =
      this.refs.profilePic.value || "img/dui.png";
  }
  changeName(e) {
    e.preventDefault();
  }
  changePW(e) {
    e.preventDefault();
  }
  componentDidMount = () => {
    this.getInfo();
  };

  render() {
    return (
      <div className="profile">
        <p className="title">Profile</p>
        <div className="info">
          <div className="img">
            <img
              src={this.state.info.profilepic || "img/dui.png"}
              alt={this.state.info.name}
              onError={e => {
                e.target.src = "img/dui.png";
              }}
            />
            <form onSubmit={this.changeProfilePic.bind(this)}>
              <input
                ref="profilePic"
                type="text"
                placeholder={this.state.info.profilepic || "URL to picture"}
                // value={this.state.info.profilepic}
              />
              <input type="submit" value="Save" />
            </form>
          </div>
          <div className="name">
            <form onSubmit={this.changeName.bind(this)}>
              <input
                ref="name"
                type="text"
                placeholder={this.state.info.name || "Name..."}
              />
              <input
                type="text"
                disabled
                placeholder={this.state.info.username}
              />
              <input type="submit" value="Save" />
            </form>
          </div>
          <div className="password">
            <form onSubmit={this.changePW.bind(this)}>
              <input type="password" placeholder="Current password" ref="pw0" />
              <input type="password" placeholder="New one" ref="pw1" />
              <input type="password" placeholder="New again" ref="pw2" />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./css/profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { uuid: props.uuid, info: {}, img: {} };
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
            this.refs.profilePic.value = response.profilepic;
            this.refs.profilePic.parentNode.parentNode.querySelector(
              "img"
            ).src =
              response.profilePic;
            this.refs.description.value = response.description;
            this.setState({ info: response });
          } else if (response.status === "error") {
            throw ReferenceError;
          }
        } catch (e) {
          console.log(e);
          console.log(ajax.response);
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
    if (
      this.state.img.status === "error" &&
      this.state.img.value === this.refs.profilePic.value
    ) {
      return;
    } else {
      var target = e.currentTarget.parentNode.querySelector("img");
      target.src = this.refs.profilePic.value || "img/dui.png";
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          try {
            var response = JSON.parse(ajax.response);
            if (response.status === "success") {
              this.setState({ img: { status: "success", value: target.src } });
            } else {
              this.setState({ img: { status: "error", value: target.src } });
            }
          } catch (e) {
            console.log(e);
            console.log(ajax.response);
          }
        }
      };
      if (
        this.state.img.status === "error" &&
        this.state.img.value === this.refs.profilePic.value
      ) {
        return;
      } else {
        ajax.open("POST", "http://localhost/CHATApp/setinfo.php");
        ajax.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        ajax.send(
          "uuid=" +
            this.state.uuid +
            "&action=profilePic&val=" +
            this.refs.profilePic.value
        );
      }
    }
  }
  changeName(e) {
    e.preventDefault();
    if (
      this.refs.name.value !== "" &&
      this.refs.name.value !== this.state.info.name &&
      this.refs.name.value.match(/[a-zA-Z\ ]+/g)[0] === this.refs.name.value &&
      this.refs.name.value.match(/[\ ]+/g) != this.refs.name.value
    ) {
      var n = this.refs.name.value
        .split(" ")
        .filter(x => x !== "")
        .reverse();
      var val = n.pop();
      while (n.length !== 0) {
        val += " " + n.pop();
      }

      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          try {
            var response = JSON.parse(ajax.responseText);
            if (response.status === "success") {
              this.setState({
                info: Object.assign(this.state.info, {
                  name: val
                })
              });
              this.refs.name.placeholder = val;
              this.refs.name.value = "";
              this.refs.name.style.backgroundColor = "rgba(200,255,200,0.5)";
              setTimeout(() => {
                this.refs.name.style.backgroundColor = "transparent";
              }, 1000);
            } else {
              this.refs.name.style.backgroundColor = "rgba(255,200,200,0.5)";
              setTimeout(() => {
                this.refs.name.style.backgroundColor = "transparent";
              }, 1000);
            }
          } catch (e) {
            console.log(e);
            console.log(ajax.response);
          }
        }
      };
      ajax.open("POST", "http://localhost/CHATApp/setinfo.php");
      ajax.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      ajax.send("uuid=" + this.state.uuid + "&action=name&val=" + val);
    } else {
      this.refs.name.style.backgroundColor = "rgba(255,200,200,0.5)";
      setTimeout(() => {
        this.refs.name.style.backgroundColor = "transparent";
      }, 1000);
    }
  }
  changePW(e) {
    e.preventDefault();
    var pw0 = this.refs.pw0.value;
    var pw1 = this.refs.pw1.value;
    var pw2 = this.refs.pw2.value;
    if (pw0 === "") {
      this.refs.pw0.style.backgroundColor = "rgba(255,200,200,0.5)";
      return;
    } else {
      this.refs.pw0.style.backgroundColor = "rgba(200,255,200,0.5)";
    }
    if (pw1 === "") {
      this.refs.pw1.style.backgroundColor = "rgba(255,200,200,0.5)";
      return;
    }
    if (pw2 === "") {
      this.refs.pw2.style.backgroundColor = "rgba(255,200,200,0.5)";
      return;
    }
    if (pw1 === pw2) {
      this.refs.pw1.style.backgroundColor = "rgba(200,255,200,0.5)";
      this.refs.pw2.style.backgroundColor = "rgba(200,255,200,0.5)";
    } else {
      this.refs.pw1.style.backgroundColor = "rgba(255,200,200,0.5)";
      this.refs.pw2.style.backgroundColor = "rgba(255,200,200,0.5)";
    }
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        try {
          var response = JSON.parse(ajax.responseText);
          if (response.status === "success") {
            this.refs.pw0.style.backgroundColor = "rgba(200,255,200,0.5)";
            this.refs.pw1.style.backgroundColor = "rgba(200,255,200,0.5)";
            this.refs.pw2.style.backgroundColor = "rgba(200,255,200,0.5)";
            this.refs.pw0.value = "";
            this.refs.pw1.value = "";
            this.refs.pw2.value = "";
            setTimeout(() => {
              this.refs.pw0.style.backgroundColor = "transparent";
              this.refs.pw1.style.backgroundColor = "transparent";
              this.refs.pw2.style.backgroundColor = "transparent";
            }, 1000);
          } else if (response.status === "error") {
            this.refs.pw0.style.backgroundColor = "rgba(255,200,200,0.5)";
          }
        } catch (e) {
          console.log(e);
          console.log(ajax.response);
        }
      }
    };
    ajax.open("POST", "http://localhost/CHATApp/setinfo.php");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(
      "uuid=" +
        this.state.uuid +
        "&action=password" +
        "&val=" +
        this.refs.pw0.value +
        "&pw1=" +
        this.refs.pw2.value
    );
  }

  changeDesc(e) {
    e.preventDefault();
    var val = this.refs.description.value;
    if (val !== "") {
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          try {
            var response = JSON.parse(ajax.responseText);
            if (response.status === "success") {
              this.setState({
                info: Object.assign(this.state.info, { description: val })
              });
              alert("Updated");
            }
          } catch (e) {
            console.log(e);
            console.log(ajax.response);
          }
        }
      };
      ajax.open("POST", "http://localhost/CHATApp/setinfo.php");
      ajax.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      ajax.send("uuid=" + this.state.uuid + "&action=description&val=" + val);
    }
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
                console.log(e);
                this.setState({
                  img: { status: "error", value: e.target.src }
                });
                e.target.src = "img/dui.png";
                // e.currentTarget.parentElement.querySelector('input[type=text]').value ='';
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
          <div className="description">
            <form onSubmit={this.changeDesc.bind(this)}>
              <textarea ref="description" placeholder="Description" />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

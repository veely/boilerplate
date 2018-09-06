import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
  }

  handleSubmit = (event) => {
    if (event.target.value && event.key === "Enter") {
      const currentUser = this.props.currentUser;
      const inputMessage = event.target.value;
      const newMessage = {username: currentUser, content: inputMessage};
      this.props.addMessage(newMessage);
      event.target.value = "";
    }
  }

  handleChangeUser = (event) => {
    if (event.target.value && event.key === "Enter") {
      const username = event.target.value;
      this.props.changeUser(username);
      event.target.value = "";

    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} onKeyPress={this.handleChangeUser}/>
        <input name="chatbar" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleSubmit} />
      </footer>
    );
  }
}


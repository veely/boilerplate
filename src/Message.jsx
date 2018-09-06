import React, {Component} from 'react';

export default class Message extends Component {
  constructor() {
    super();
  }


  render() {

    if (this.props.message.type === "message") {
      return (
        <div>
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      )
    } else if (this.props.message.type === "changeUser") {
      return (
        <div>
          <span className="message-notification">{this.props.message.content}</span>
        </div>
      )
    }
  }
}
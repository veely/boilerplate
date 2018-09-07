import React, {Component} from 'react';

export default class Message extends Component {
  constructor() {
    super();
  }


  render() {

    switch (this.props.message.type) {

      case "incomingMessage":
        return (
          <div>
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        )
        break;

      case "incomingNotification":
        return (
          <div>
            <span className="message-notification">{this.props.message.content}</span>
          </div>
        )
        break;

      case "clientConnected":
        return (
          <div>
            <span className="message-notification">{this.props.message.content}</span>
          </div>
        )
        break;
    }
  }
}
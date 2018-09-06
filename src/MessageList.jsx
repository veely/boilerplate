import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map( (messageObject, index) =>
          <Message key={messageObject.id} message={messageObject} />
        )}
        <div className="message system">
        </div>
      </main>
    );
  }
}
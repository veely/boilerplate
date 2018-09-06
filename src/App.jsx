import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: "e018d",
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: "o10dy",
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: data.currentUser,
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.chattySocket = new WebSocket("ws://localhost:3001/");
  }

  addMessage = (newMessage) => {
    newMessage.type = "postMessage";
    this.chattySocket.send(JSON.stringify(newMessage));
  }

  changeUser = (username) => {
    const oldName = this.state.currentUser.name;
    const notification = oldName + " has change their name to " + username;
    const changeUserObj = {
      content: notification,
      type: "postNotification"
    };
    this.chattySocket.send(JSON.stringify(changeUserObj));
    this.setState({ currentUser: {name: username} });
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    this.chattySocket.onopen = (openEvent) => {
      console.log('Connection established');

      this.chattySocket.onmessage = (event) => {
        const broadcastMsg = JSON.parse(event.data);
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, broadcastMsg];
        this.setState({messages: newMessages});
      }
    }
  }

  render() {
    return (
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} changeUser={this.changeUser}/>
        <MessageList messages={this.state.messages} />
      </body>
    );
  }
}

export default App;

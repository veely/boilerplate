// server.js
const webSocket = require('ws');
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // Set up a callback for when a client closes the socket. This usually means they closed their browser.
//   ws.on('close', () => console.log('Client disconnected'));
// });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === webSocket.OPEN) {
      const dataObject = JSON.parse(data);
      dataObject.id = uuid();

      switch (dataObject.type) {
        case "postMessage":

          dataObject.type = "incomingMessage";
          client.send(JSON.stringify(dataObject));
          break;

        case "postNotification":
          dataObject.type = "incomingNotification";
          client.send(JSON.stringify(dataObject));
          break;
      }
    }
  });
};

wss.on('connection', function connection(socket) {
  socket.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.broadcast(message)
  });
});
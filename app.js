const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
}

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
    // ws.send(message);
    broadcast(message);
  });
});
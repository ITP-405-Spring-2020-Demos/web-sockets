const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
}

wss.on('connection', (ws) => {  
  ws.on('message', (message) => {
    let { type } = JSON.parse(message);
    console.log('Received:', type);

    if (type === 'total-users-changed') {
      broadcast(JSON.stringify({
        type,
        data: wss.clients.size
      }));
    } else {
      // ws.send(message);
      broadcast(message);
    }
  });

  ws.on('close', () => {
    broadcast(JSON.stringify({
      type: 'total-users-changed',
      data: wss.clients.size
    }));
  });
});
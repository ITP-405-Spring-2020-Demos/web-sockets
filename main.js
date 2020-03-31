const connection = new WebSocket('ws://localhost:8080');

connection.onmessage = (event) => {
  let { type, data } = JSON.parse(event.data)
  pubsub.publish(type, data);
};

pubsub.subscribe('chat-message', (message) => {
  let li = document.createElement('li');
  li.innerText = message;
  document.querySelector('ul').append(li);
});

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let message = document.querySelector('#message').value;
  let data = JSON.stringify({
    type: 'chat-message',
    data: message
  });
  connection.send(data);
  document.querySelector('#message').value = '';
});
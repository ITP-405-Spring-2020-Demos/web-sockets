const connection = new WebSocket('ws://localhost:8080');

connection.onmessage = (event) => {
  let { type, data } = JSON.parse(event.data)
  pubsub.publish(type, data);
};

pubsub.subscribe('total-users-changed', (count) => {
  document.getElementById('total').innerText = count;
});

connection.onopen = () => {  
  connection.send(JSON.stringify({
    type: 'total-users-changed'
  }));
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

document.querySelector('#leave').addEventListener('click', () => {
  connection.close();
});
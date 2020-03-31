const connection = new WebSocket('ws://localhost:8080');

connection.onmessage = (event) => {
  console.log('received', event.data);
  let li = document.createElement('li');
  let message = JSON.parse(event.data).data;
  li.innerText = message;
  document.querySelector('ul').append(li);
};

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let message = document.querySelector('#message').value;
  let data = JSON.stringify({
    type: 'message',
    data: message
  });
  connection.send(data);
  document.querySelector('#message').value = '';
});
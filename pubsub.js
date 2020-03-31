const pubsub = {
  _callbacksByEvent: {},

  publish(event, data) {
    this._callbacksByEvent[event].forEach((callback) => {
      callback(data);
    });
  },

  subscribe(event, callback) {
    if (!this._callbacksByEvent[event]) {
      this._callbacksByEvent[event] = [];
    }

    this._callbacksByEvent[event].push(callback);
  }
};
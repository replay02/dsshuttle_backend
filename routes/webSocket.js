var WebSocketServer = require("ws").Server;

module.exports = function() {
  var wss = new WebSocketServer({
    port: 3001
  });
  wss.on("connection", function(ws) {
    ws.send("Hello! I am a server.");
    ws.on("message", function(message) {
      console.log("Received: %s", message);
    });
  });
};

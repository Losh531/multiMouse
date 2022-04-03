const protocol = location.protocol === "https:" ? "wss" : "ws";
console.log("Creating the web socket");
const ws = new WebSocket(`${protocol}://${location.host}/multiplayer`);
console.log("Web socket created");

export function onConnectionToServer(onOpen) {
  //ws.onopen = onOpen;
  ws.addEventListener('open', onOpen);
}

export function sendMessage(message) {
  console.log("Sending message to the server", message);
  ws.send(JSON.stringify(message));
}

export function isWebSocketOpen() {
  return ws.readyState === WebSocket.OPEN;
}

const serverMessageHandlers = { };

export function addServerMessageHandler(action, handler) {
  serverMessageHandlers[action] = handler;
}

ws.onmessage = (msg) => {
    console.log(msg);
    const serverAction = JSON.parse(msg.data);
    console.log("Message from server: ", serverAction);

    if (! serverMessageHandlers[serverAction.action]) {
      console.error("UNRECOGNIZED ACTION", serverAction);
      return; // TODO Handle louder
    }

    serverMessageHandlers[serverAction.action](serverAction.data);
}
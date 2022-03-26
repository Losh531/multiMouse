import { processPlayerAction, addPlayerActionHandler } from "./PlayerActionHandler.mjs";
import { PLAYER_ACTION } from "../actions.mjs";
import BROADCAST from "./broadcastOptions.mjs";
import { registerPlayer } from './action-registerPlayer.mjs';
import { movePlayerLeft, movePlayerRight, movePlayerUp, movePlayerDown } from './action-movePlayer.mjs';
import { newPos } from './action-newPos.mjs';
import ws from 'ws';

// Registering all actions the server will handle
addPlayerActionHandler(PLAYER_ACTION.INIT,
  (data, broadcast) => registerPlayer(data, broadcast));
addPlayerActionHandler(PLAYER_ACTION.MOVE_LEFT,
  (data, broadcast) => movePlayerLeft(data, broadcast));
addPlayerActionHandler(PLAYER_ACTION.MOVE_RIGHT,
  (data, broadcast) => movePlayerRight(data, broadcast));
addPlayerActionHandler(PLAYER_ACTION.MOVE_UP,
  (data, broadcast) => movePlayerUp(data, broadcast));
addPlayerActionHandler(PLAYER_ACTION.MOVE_DOWN,
  (data, broadcast) => movePlayerDown(data, broadcast));
addPlayerActionHandler(PLAYER_ACTION.NEW_POS,
  (data, broadcast) => newPos(data, broadcast));

// TODO 

export default function multiplayer(server) {
	const socket = new ws.Server({ server: server, path: "/multiplayer" });

	socket.on("connection", (conn) => {

    function broadcast(data, broadcastOption) {
      const respondToPlayerDirectly = broadcastOption === BROADCAST.PLAYER_ONLY
          || broadcastOption === BROADCAST.ALL;
      const sendToOtherPlayers = broadcastOption === BROADCAST.OTHERS_ONLY
          || broadcastOption === BROADCAST.ALL;

      socket.clients.forEach((client) => {
        if (client.readyState !== ws.OPEN) {
          return; // Skip closed connections
        }

        if ((client === conn && respondToPlayerDirectly)
            || (client !== conn && sendToOtherPlayers)) {
          client.send(JSON.stringify(data));
        }
      });
    }

		conn.on("message", (data) => {
      const actionObject = JSON.parse(data.toString());
      processPlayerAction(actionObject, broadcast);
		});

		conn.on("close", (data) => {
			// TODO Remove the player
      // Probably: processPlayerAction(PLAYER_ACTION.QUIT, broadcast);
		});
	});
};
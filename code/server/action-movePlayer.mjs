import { SERVER_MESSAGE, MOVE_SPEED } from "../actions.mjs";
import { addPlayer, changePos, players } from "./Players.mjs";
import Message from "../Message.mjs";
import BROADCAST from "./broadcastOptions.mjs";

const STAY = 0, LEFT = -8, RIGHT = 8, UP = -8, DOWN = 8;

export function movePlayerLeft(actionData, broadcast) {
  changePos(actionData.playerId, LEFT, STAY);

  const broadcastMessage = new Message(SERVER_MESSAGE.MOVE_TO, {
    playerId: actionData.playerId,
    currentX: players[actionData.playerId].currentX,
    currentY: players[actionData.playerId].currentY,
  });
  broadcast(broadcastMessage, BROADCAST.ALL);
}

export function movePlayerRight(actionData, broadcast) {
  changePos(actionData.playerId, RIGHT, STAY);

  const broadcastMessage = new Message(SERVER_MESSAGE.MOVE_TO, {
    playerId: actionData.playerId,
    currentX: players[actionData.playerId].currentX,
    currentY: players[actionData.playerId].currentY,
  });
  broadcast(broadcastMessage, BROADCAST.ALL);
}

export function movePlayerUp(actionData, broadcast) {
  changePos(actionData.playerId, STAY, UP); //TODO: Make it a constant

  const broadcastMessage = new Message(SERVER_MESSAGE.MOVE_TO, {
    playerId: actionData.playerId,
    currentX: players[actionData.playerId].currentX,
    currentY: players[actionData.playerId].currentY,
  });
  broadcast(broadcastMessage, BROADCAST.ALL);
}

export function movePlayerDown(actionData, broadcast) {
  changePos(actionData.playerId, STAY, DOWN); //TODO: Make it a constant

  const broadcastMessage = new Message(SERVER_MESSAGE.MOVE_TO, {
    playerId: actionData.playerId,
    currentX: players[actionData.playerId].currentX,
    currentY: players[actionData.playerId].currentY,
  });
  broadcast(broadcastMessage, BROADCAST.ALL);
}
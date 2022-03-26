import { SERVER_MESSAGE, MOVE_SPEED } from "../actions.mjs";
import { setPos, debugPlayerPositions } from "./Players.mjs";
import Message from "../Message.mjs";
import BROADCAST from "./broadcastOptions.mjs";

export function newPos(actionData, broadcast) {
  setPos(actionData.playerId, actionData.currentX, actionData.currentY);
  // TODO send messages to players?
  debugPlayerPositions();
}
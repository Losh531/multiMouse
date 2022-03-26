import { PLAYER_ACTION } from "../actions.mjs";
import { registerPlayer } from "./action-registerPlayer.mjs";

const messageHandlers = { };

export function addPlayerActionHandler(action, handler) {
  messageHandlers[action] = handler;
}

/**
 * @param {Message} message
 * @param {function} broadcast(message, sendToSelf, sendToOthers)
 */
export function processPlayerAction(message, sendResponse) {
  console.log("Processing message from player", message);

  if (! messageHandlers[message.action]) {
    console.error("UNRECOGNIZED ACTION", message.action);
    process.exit();
  }

  messageHandlers[message.action](message.data, sendResponse);
}

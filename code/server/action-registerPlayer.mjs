import { PLAYER_ACTION, SERVER_MESSAGE } from "../actions.mjs";
import { addCheese, cheese } from "./Cheese.mjs";
import { addPlayer, players } from "./Players.mjs";
import Message from "../Message.mjs";
import BROADCAST from "./broadcastOptions.mjs";

export function registerPlayer(actionData, broadcast) {
  // TODO Creates the new user and adds to the array
  // TODO Send the full user array to the new user
  // TODO randomize initial x/y coordinates
  const newPlayer = addPlayer("Test Name");

  // TODO We are temporarily adding a new cheese whenever we add a new player
  const newCheese = addCheese();

  const messageToNewPlayer = new Message(SERVER_MESSAGE.INIT,
    {
      players: players,
      cheese: cheese,
      yourId: newPlayer.id
    });
  broadcast(messageToNewPlayer, BROADCAST.PLAYER_ONLY);

  const messageToPlayers = new Message(SERVER_MESSAGE.NEW_PLAYER,
    {
      id: newPlayer.id,
      name: newPlayer.name,
      currentX: newPlayer.currentX,
      currentY: newPlayer.currentY,
    });
  broadcast(messageToPlayers, BROADCAST.OTHERS_ONLY);

  console.log("New cheese x: " + newCheese.currentX);
  const newCheeseMessage = new Message(SERVER_MESSAGE.NEW_CHEESE,
    {
      id: newCheese.id,
      currentX: newCheese.currentX,
      currentY: newCheese.currentY
    });
  broadcast(newCheeseMessage, BROADCAST.OTHERS_ONLY)
}

import { SERVER_MESSAGE, MOVE_SPEED } from "../actions.mjs";
import { setPos, debugPlayerPositions } from "./Players.mjs";
import Message from "../Message.mjs";
import BROADCAST from "./broadcastOptions.mjs";
import { addCheese, cheese } from "./Cheese.mjs";

export function eatCheese(actionData, broadcast) {
    const newCheese = addCheese();
    console.log("New cheese x: " + newCheese.currentX);
    const newCheeseMessage = new Message(SERVER_MESSAGE.NEW_CHEESE,
    {
      id: newCheese.id,
      currentX: newCheese.currentX,
      currentY: newCheese.currentY
    });
  broadcast(newCheeseMessage, BROADCAST.OTHERS_ONLY)
}
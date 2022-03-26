# In this folder:

## Things
"Thing" files contain the objects in the game, and their behavior

* [Cheese](https://replit.com/@losh531/multiMouse#code/client/Cheese.mjs)
* [Players](https://replit.com/@losh531/multiMouse#code/client/Players.mjs)

## Actions

There are two types of actions:
* Things the player can tell their mouse to do locally
* Things the server can tell the client to do

### Mouse Actions

Mouse actions are initiated by the player through the keyboard. These usually send a message to the server, so the server can communicate the results of that action to all players currently in the game.

Every mouse action has a constant in the `PLAYER_ACTION` array in [actions.mjs](https://replit.com/@losh531/multiMouse#code/actions.mjs).

These actions are set up in [main](https://replit.com/@losh531/multiMouse#code/client/main.js) in the `addServerMessageHandler(SERVER_MESSAGE.INIT,` section.  When a player starts the game, the server tells the client to INIT itself, and that handler hooks up all of the local mouse actions.

To add a new player action:
* add a constant in the `PLAYER_ACTION` array in [actions.mjs](https://replit.com/@losh531/multiMouse#code/actions.mjs).
* In [main](https://replit.com/@losh531/multiMouse#code/client/main.js), inside the `INIT` section, have a Kaboom event send the server a message
* Create an "action-____.mjs" file under the server folder
* Add a player handler to the server in [multiplayer.mjs](https://replit.com/@losh531/multiMouse#code/server/multiplayer.mjs) that invokes the action in the "action-____.mjs" file
* Have the server send the player(s) a message in response to the action

### Client Actions

Client "Action" files define things the server can tell the clients to do.

### Deciding between a mouse action and a client action

TODO

# How to add player actions




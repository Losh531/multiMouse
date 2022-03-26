
import kaboom from "kaboom";
import { PLAYER_ACTION, SERVER_MESSAGE, MOVE_SPEED } from "../actions.mjs";
import { onConnectionToServer, sendMessage, addServerMessageHandler } from "./ServerConnection.mjs";
import Message from "../Message.mjs";
import addPlayer from "./action-addPlayer.mjs";
import addCheese from "./action-addCheese.mjs";
import { getKaboomObjectForPlayer } from './Players.mjs';

// initialize context
kaboom();

// load assets
loadSprite("mouse", "sprites/mouse.png");
loadSprite("cheese", "sprites/cheese.png");
loadSprite("back", "sprites/background.png");

scene("game", () => {

  layers([
      "bg",   // the background
      "obj",  // the mice and cheese
      "ui",   // the score overlay
  ], "obj");  // the default layer

  // Notifying the server a new player has entered the game
  onConnectionToServer( (event) => sendMessage(new Message(PLAYER_ACTION.INIT, { name: "test" })) );
  
  let id = null
  // TODO Remove the player when they close their window
  window.onbeforeunload = function() {
  
  }

  // Setting up the score overlay in the ui layer
  const score = add([
      text("Score: 0"),
      layer("ui"),
      fixed(),
      { value: 0 },
  ]);

  // Setting up the background image
  add([
    sprite("back"),
    layer("bg"),
    //fixed()
  ])
  
  addServerMessageHandler(SERVER_MESSAGE.NEW_CHEESE,
    function(data) {
      addCheese(data.id, data.currentX, data.currentY);
    });
  
  addServerMessageHandler(SERVER_MESSAGE.INIT,
   function(data) {
      const allPlayers = data.players;
      const myPlayerId = data.yourId;
      console.log("All Players", allPlayers);
      console.log("My player ID", data.yourId);
  
      let myPlayer = null;
      for (let i = 0; i < allPlayers.length; ++i) {
          let player = allPlayers[i];
          
          console.log("Adding user", player);
          const playerObject = addPlayer(player.id, 'default', player.currentX, player.currentY);
          if (player.id === myPlayerId) {
            myPlayer = playerObject;
          }
      }
      console.log("My player object", myPlayer);
  
      // Adding all the existing cheese
      // TODO We're adding cheese when a player starts
      const allCheese = data.cheese;
      console.log("All Cheese", allCheese);
      for (let i = 0; i < allCheese.length; ++i) {
          let cheese = allCheese[i];
          
          console.log("Adding cheese", cheese);
          const cheeseObject = addCheese(cheese.id,
              cheese.currentX, cheese.currentY);
          console.log(cheese.currentX)
      }
  
      const mouse = myPlayer.kaboomObject;
      camPos(mouse.pos)
      onKeyDown("left", () => {
         sendMessage(new Message(PLAYER_ACTION.MOVE_LEFT, { playerId: myPlayer.id })) });
      onKeyDown("right", () => {
         sendMessage(new Message(PLAYER_ACTION.MOVE_RIGHT, { playerId: myPlayer.id })) });
      onKeyDown("up", () => {
         sendMessage(new Message(PLAYER_ACTION.MOVE_UP, { playerId: myPlayer.id })) });
      onKeyDown("down", () => {
         sendMessage(new Message(PLAYER_ACTION.MOVE_DOWN, { playerId: myPlayer.id })) });
      onCollide("mouse" + myPlayerId, "cheese", (mouse, cheese) => {
      destroy(cheese)
      score.value += 1
      score.text = "Score:" + score.value
          
      });
      addServerMessageHandler(SERVER_MESSAGE.MOVE_TO, function(data) {
        const kaboomObject = getKaboomObjectForPlayer(data.playerId);
        console.log("Moving the player to " + data.currentX + " " + data.currentY);
        kaboomObject.moveTo(data.currentX, data.currentY);
        camPos(mouse.pos)
      })
  
      // addServerMessageHandler(SERVER_MESSAGE.MOVE_LEFT, function(data) {
      //   const kaboomObject = getKaboomObjectForPlayer(data.playerId);
      //   kaboomObject.move(-MOVE_SPEED, 0);
      //   // TODO Report to the server the new coordinates
      //   sendMessage(new Message(PLAYER_ACTION.NEW_POS,
      //     { playerId: data.playerId, currentX: kaboomObject.pos.x, currentY: kaboomObject.pos.y}));
          
      // });
  
      addServerMessageHandler(SERVER_MESSAGE.NEW_PLAYER, function(data) {
          addPlayer(data.id, data.name, data.currentX, data.currentY);
          // TODO Get the other player positions via msg.data.players
          // TODO Store them all in a client-side array
      });
  
    // mouse.action(() => {
    //     // center camera to player
    //     camPos(mouse.pos);
    // });
  
    // keyDown("left", () => {
    //     mouse.move(-MOVE_SPEED, 0);
    // });
    // keyDown("right", () => {
    //     mouse.move(MOVE_SPEED, 0);
    // });
    // keyDown("up", () => {
    //     mouse.move(0, -MOVE_SPEED);
    // });
    // keyDown("down", () => {
    //     mouse.move(0, MOVE_SPEED);
    // });
  });
});


go("game");
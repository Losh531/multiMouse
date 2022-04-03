export const MOVE_SPEED = 500;

// Messages that the server will send to the players
export const SERVER_MESSAGE = {
  INIT: "INIT",
  NEW_CHEESE: "NEW_CHEESE",
  NEW_PLAYER: "NEW_PLAYER",
  MOVE_TO: "MOVE_TO",
  CLIENT_LEAVE: "CLIENT_LEAVE"
};

// Messages that the player sends to the server
export const PLAYER_ACTION = {
  INIT: "INIT",
  MOVE_LEFT: "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT",
  MOVE_UP: "MOVE_UP",
  MOVE_DOWN: "MOVE_DOWN",
  NEW_POS: "NEW_POS",
  CLIENT_LEAVE: "CLIENT_LEAVE",
  EAT_CHEESE: "EAT_CHEESE"
};

import kaboom from "kaboom";

export const players = [];

class Player {
  constructor(id, name, kaboomObject) {
    this.id = id;
    this.name = name;
    this.kaboomObject = kaboomObject;
  }
}

export function getKaboomObjectForPlayer(id) {
  return players[id].kaboomObject;
}

export function saveNewPlayer(id, name, initialX, initialY) {
  console.log(`saving player with id ${id}, name ${name}, x ${initialX}, y ${initialY}`)
  const mouse = add([
    // list of components
    sprite("mouse"),
    pos(initialX, initialY),
    area(),
    scale(0.5),
    "mouse" + id
  ]);
  console.log("mouse", mouse);
  players[id] = new Player(id, name, mouse);
  console.log("new player set", players);
  return players[id];
}

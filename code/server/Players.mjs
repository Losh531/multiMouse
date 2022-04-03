
export const players = [];

const scale = 2;
const backgroundImageWidth = 3841 * scale;
const backgroundImageHeight = 2161 * scale;

class Player {
  constructor(id, name, currentX, currentY) {
    this.id = id;
    this.name = name;
    this.currentX = currentX;
    this.currentY = currentY;
  }
}

export function debugPlayerPositions() {
  for (var i = 0; i < players.length; ++i) {
    console.log(`Player ${players[i].id} is at [${players[i].currentX}, ${players[i].currentY}]`);
  }
}

// TODO Check whether this overlaps with another cheese or player
export function addPlayer(name) {
  const newPlayerId = players.length;
  players[newPlayerId] = new Player(newPlayerId, name, Math.floor(Math.random() * backgroundImageWidth), Math.floor(Math.random() * backgroundImageHeight));
  return players[newPlayerId];
}

export function changePos(id, changeX, changeY){
    players[id].currentX += changeX;
    players[id].currentY += changeY;
}

export function setPos(id, x, y){
    players[id].currentX = x
    players[id].currentY = y
}
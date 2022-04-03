
export const cheese = [];

const scale = 2;
const backgroundImageWidth = 3841 * scale;
const backgroundImageHeight = 2161 * scale;

class Cheese {
  constructor(id, currentX, currentY) {
    this.id = id;
    this.currentX = currentX;
    this.currentY = currentY;
  }
}

export function debugCheesePositions() {
  for (var i = 0; i < cheese.length; ++i) {
    console.log(`Cheese ${cheese[i].id} is at [${cheese[i].currentX}, ${cheese[i].currentY}]`);
  }
}

// TODO Check whether this overlaps with another cheese or player
export function addCheese() {
  const newCheeseId = cheese.length;
  cheese[newCheeseId] = new Cheese(newCheeseId,
    Math.floor(Math.random() * backgroundImageWidth),
    Math.floor(Math.random() * backgroundImageHeight));
  return cheese[newCheeseId];
}

export function changePos(id, changeX, changeY){
    cheese[id].currentX += changeX;
    cheese[id].currentY += changeY;
}

export function setPos(id, x, y){
    cheese[id].currentX = x
    cheese[id].currentY = y
}
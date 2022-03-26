import kaboom from "kaboom";

export const cheese = [];

class Cheese {
  constructor(id, kaboomObject) {
    this.id = id;
    this.kaboomObject = kaboomObject;
  }
}

export function getKaboomObjectForCheese(id) {
  return cheese[id].kaboomObject;
}

export function saveNewCheese(id, initialX, initialY) {
  console.log(`saving cheese with id ${id}, x ${initialX}, y ${initialY}`)
  const cheese = add([
    // list of components
    sprite("cheese"),
    pos(initialX, initialY),
    area(),
    scale(1.5),
    "cheese"
  ]);
  console.log("cheese", cheese);
  cheese[id] = new Cheese(id, cheese);
  console.log("new cheese set", cheese);
  return cheese[id];
}

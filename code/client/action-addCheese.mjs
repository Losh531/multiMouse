import { saveNewCheese } from './Cheese.mjs';

export default function addCheese(id, x, y) {
  console.log("Adding a cheese");

  return saveNewCheese(id, x, y);
}
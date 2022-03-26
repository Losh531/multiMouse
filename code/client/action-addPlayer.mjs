import { saveNewPlayer } from './Players.mjs';

export default function addPlayer(id, name, x, y) {
  console.log("Adding a player");

  return saveNewPlayer(id, name, x, y);
}
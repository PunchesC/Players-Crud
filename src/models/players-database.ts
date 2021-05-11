import Player from "./Player";

let nextId: number = 1;
let data: Player[] = [];

// Prepopulate some data
createPlayer({ name: "Douglas MacArthur", jersey: 45 });
createPlayer({ name: "Grace Hopper", jersey: 44 });
createPlayer({ name: "Frank Lloyd Wright", jersey: 35 });
createPlayer({ name: "Louis Vuitton", jersey: 54 });

export function createPlayer(player: Player):void {
  player.id = nextId++;
  data.push(player);
}

export function readAllPlayers(): Player[] {
  return data;
}

export function readPlayerById(id: number): Player|undefined {
  return data.find(player => player.id === id);
}

/**
 * Replace the player with the same ID.
 * 
 * @return true if found, false if not found
 */
export function updatePlayer(player: Player): boolean {
  const index = data.findIndex(p => p.id === player.id);
  if (index == -1) {
    return false;
  } else {
    data[index] = player;
    return true;
  }
}

/**
 * @return true if found, false if not found
 */
export function deletePlayer(id: number): boolean {
  const index = data.findIndex(player => player.id === id);
  if (index == -1) {
    return false;
  } else {
    data.splice(index, 1);
    return true;
  }
}
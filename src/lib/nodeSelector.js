import {
  allMoviesNode1,
  before1980Node1,
  from1980Node1,
  allMoviesNode2,
  before1980Node2,
  from1980Node2,
  allMoviesNode3,
  before1980Node3,
  from1980Node3,
} from "./db";

const nodes = [
  { allMovies: allMoviesNode1, before1980: before1980Node1, from1980: from1980Node1 },
  { allMovies: allMoviesNode2, before1980: before1980Node2, from1980: from1980Node2 },
  { allMovies: allMoviesNode3, before1980: before1980Node3, from1980: from1980Node3 },
];

export async function selectNode(schema) {
  let currentNodeIndex = 0;

  while (currentNodeIndex < nodes.length) {
    const node = nodes[currentNodeIndex][schema];

    try {
      await node.authenticate();
      console.log("Node is healthy:", currentNodeIndex);
      return node;
    } catch (error) {
      console.log("Node is down:", currentNodeIndex);
      currentNodeIndex += 1;
    }
  }

  throw new Error("All nodes are down.");
}

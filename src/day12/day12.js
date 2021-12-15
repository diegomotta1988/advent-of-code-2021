import { RAW_INPUT } from './day12.data';

const graph = {};
const parsedInput = RAW_INPUT.split('\n').map((row) => {
  const [from, to] = row.split('-');
  if (!graph[from]) {
    graph[from] = [];
  }
  if (!graph[to]) {
    graph[to] = [];
  }
  graph[from].push(to);
  graph[to].push(from);
  return { from, to };
});

console.log(parsedInput);
console.log(graph);

const isSmallCave = (string) => {
  return /[a-z]/.test(string);
};

const part1 = () => {
  const depthFirstSearch = (node, visited = [], paths) => {
    visited.push(node);
    if (node === 'end') {
      paths.push(visited.join`,`);
      return visited;
    }
    for (const neighbor of graph[node]) {
      if (isSmallCave(neighbor) && visited.includes(neighbor)) {
        continue;
      }
      depthFirstSearch(neighbor, [...visited], paths);
    }
  };
  const paths = [];
  depthFirstSearch('start', [], paths);
  console.log(paths.length);
};

const part2 = () => {
  const depthFirstSearch = (node, visited = [], visitedTwiceAlready, paths) => {
    visited.push(node);
    if (node === 'end') {
      paths.push(visited.join`,`);
      return visited;
    }
    for (const neighbor of graph[node]) {
      if (neighbor === 'start') continue;
      if (isSmallCave(neighbor) && visited.includes(neighbor)) {
        if (visitedTwiceAlready) {
          continue;
        }
        depthFirstSearch(neighbor, [...visited], true, paths);
      } else {
        depthFirstSearch(neighbor, [...visited], visitedTwiceAlready, paths);
      }
    }
  };
  const paths = [];
  depthFirstSearch('start', [], false, paths);
  console.log(paths.length);
};

part2();

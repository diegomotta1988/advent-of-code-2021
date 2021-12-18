import { lines } from './day9.data';

const solvePartOne = () => {
  let risk = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const current = line[j];

      if (
        (!(i - 1 >= 0) || current < lines[i - 1][j]) &&
        (!(i + 1 < lines.length) || current < lines[i + 1][j]) &&
        (!(j - 1 >= 0) || current < lines[i][j - 1]) &&
        (!(j + 1 < line.length) || current < lines[i][j + 1])
      ) {
        risk += +current + 1;
      }
    }
  }
  console.log(risk);
};

const floodFill = (i, j, map) => {
  if (map[i][j] === 1) return 0; // comprobamos si ha sido visitado

  map[i][j] = 1; // marcamos como visitado

  let size = 1;

  if (i - 1 >= 0) {
    size += floodFill(i - 1, j, map);
  }
  if (i + 1 < map.length) {
    size += floodFill(i + 1, j, map);
  }
  if (j - 1 >= 0) {
    size += floodFill(i, j - 1, map);
  }
  if (j + 1 < map[i].length) {
    size += floodFill(i, j + 1, map);
  }

  return size;
};

const solvePartTwo = () => {
  const map = Array(lines.length)
    .fill(0)
    .map((x, i) =>
      Array(lines[0].length)
        .fill(0)
        .map((x, j) => (lines[i][j] === '9' ? 1 : 0))
    );

  let bassins = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const current = line[j];
      const size = floodFill(i, j, map);
      size && bassins.push(size);
    }
  }
  const result = calculateResult(bassins);
  console.log(result);
};

const calculateResult = (bassins) => {
  const threeLargest = bassins.sort((a, b) => b - a).slice(0, 3);
  return threeLargest.reduce((acc, current) => {
    acc = !acc ? current : acc * current;
    return acc;
  }, 0);
};

solvePartTwo();

import { parsedInput } from './day9.data';

const solvePart1 = () => {
  const lowestLocations = getLowestLocations();

  const totalRiskLevel = lowestLocations
    .map((item) => item.value + 1)
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  console.log('La suma de riesgo es: ', totalRiskLevel);
};

const getLowestLocations = () => {
  const lowestLocations = [];
  for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[i].length; j++) {
      checkSurroundings(i, j) &&
        lowestLocations.push({ i, j, value: parsedInput[i][j] });
    }
  }
  return lowestLocations;
};

const solvePart2 = () => {
  const lowestLocations = getLowestLocations();
  for (let location of lowestLocations) {
    findBasin(location);
  }
};

const findBasin = (location) => {
  const rowLimit = parsedInput.length - 1;
  const columnLimit = parsedInput[0].length - 1;
  const basin = [];
  for (let i = location.i; i <= rowLimit; i++) {
    for (let j = location.j; j <= columnLimit; j++) {
      // const target = parsedInput[i][j];
      while (i > 0) {}
      const column = parsedInput.map((x) => x[i]);
      // if (target == 9) {
      //   break;
      // } else {
      //   basin.push(target);
      // }
    }
  }
};

const surroundings = (input, i, j) => {
  const rowLimit = input.length - 1;
  const columnLimit = input[0].length - 1;
  const surroundings = [];
  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
      if (x !== i || y !== j) {
        surroundings.push(input[x][y]);
      }
    }
  }
  return surroundings;
};

const checkSurroundings = (i, j) => {
  return (
    parsedInput[i][j] ===
    Math.min(parsedInput[i][j], ...surroundings(parsedInput, i, j))
  );
};

solvePart2();

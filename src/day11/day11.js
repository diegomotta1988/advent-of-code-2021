import { parsedInput } from './day10.data';
let input = [...parsedInput];
let flashed = [];
let flashCount = 0;
let synchronized = false;

const flash = (i, j) => {
  flashed.push(`${i},${j}`);
  flashCount++;
  const itemSurroundings = surroundings(input, i, j);
  itemSurroundings.map((item) => {
    input[item.i][item.j] += 1;
    if (input[item.i][item.j] > 9 && !flashed.includes(`${item.i},${item.j}`)) {
      flash(item.i, item.j);
    }
    return item;
  });
};

const step = () => {
  increaseByOne();
  checkFlashes();
  if (!checkSynchronicity()) {
    setFlashedToZero();
    return false;
  } else {
    return true;
  }
};

const checkFlashes = () => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] > 9 && !flashed.includes(`${i},${j}`)) {
        flash(i, j);
      }
    }
  }
};

const increaseByOne = () => {
  input = input.map((row) => {
    return row.map((item) => item + 1);
  });
};

const checkSynchronicity = () => {
  return flashed.length === 100;
};

const setFlashedToZero = () => {
  while (flashed.length) {
    const [i, j] = flashed.pop().split(',');
    input[i][j] = 0;
  }
};

const surroundings = (input, i, j) => {
  const rowLimit = input.length - 1;
  const columnLimit = input[0].length - 1;
  const surroundings = [];
  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
      if (x !== i || y !== j) {
        surroundings.push({ value: input[x][y], i: x, j: y });
      }
    }
  }
  return surroundings;
};

const runPartOne = () => {
  let steps = 0;

  while (steps < 100) {
    step();
    steps++;
    console.log(`Paso ${steps}`, input);
  }

  console.log(`Un total de ${flashCount} flashes`);
};

const runPartTwo = () => {
  let steps = 0;
  let synchronyzed = false;
  while (!synchronyzed) {
    synchronyzed = step();
    steps++;
  }
  console.log('Sincronizan en el paso: ', steps);
};

// runPartOne();

runPartTwo();

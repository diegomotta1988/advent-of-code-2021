import { RAW_INPUT } from './day13.data';

let [dots, folds] = RAW_INPUT.split('\n\n');

folds = folds
  .split('\n')
  .map((item) => item.replace('fold along ', '').split('='));
dots = new Set(dots.split('\n'));

const fold = (instruction) => {
  let [direction, number] = instruction;

  dots.forEach((dot) => {
    const [x, y] = dot.split(',');
    if (direction === 'x') {
      if (+x >= number) {
        dots.add(`${Math.abs(number * 2 - x)},${y}`);
        dots.delete(`${x},${y}`);
      }
    } else {
      if (+y >= number) {
        dots.add(`${x},${Math.abs(number * 2 - y)}`);
        dots.delete(`${x},${y}`);
      }
    }
  });

  return dots;
};

const calculateMaxSize = () => {
  let maxX = 0;
  let maxY = 0;
  Array.from(dots).forEach((item) => {
    const [x, y] = item.split(',');
    maxX = +x > maxX ? +x : maxX;
    maxY = +y > maxY ? +y : maxY;
  });
  return { maxX, maxY };
};

const drawArray = (maxX, maxY) => {
  const array = new Array(maxY + 1).fill(' ');

  for (let j = 0; j < array.length; j++) {
    array[j] = new Array(maxX + 1).fill(' ');
  }

  dots.forEach((dot) => {
    const [x, y] = dot.split(',');
    array[y][x] = '#';
  });
  console.log(array);
};

const solvePartOne = () => {
  const dotsAfterOneFold = fold(folds[0]);
  console.log(dotsAfterOneFold.size);
};

const solvePartTwo = () => {
  for (let [index, instruction] of folds.entries()) {
    fold(instruction);

    if (index === folds.length - 1) {
      const { maxX, maxY } = calculateMaxSize();
      drawArray(maxX, maxY);
    }
  }

  console.log(dots);
};

// solvePartOne();
solvePartTwo();

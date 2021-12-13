import { parsedInput } from './day7.data';

const availablePositions = [...Array(Math.max(...parsedInput) + 1).keys()];
const part = 'part2'; // 'part1' o 'part2'

const checkPositions = (part) => {
  let minFuel;
  for (let position of availablePositions) {
    const calculatedFuel =
      part === 'part1'
        ? calculateFuel(parsedInput, position)
        : calculateFuelPart2(parsedInput, position);
    minFuel = isNaN(minFuel)
      ? calculatedFuel
      : Math.min(calculatedFuel, minFuel);
  }
  return minFuel;
};

const calculateFuel = (input, position) => {
  return input.reduce((acc, current) => {
    acc += Math.abs(current - position);
    return acc;
  }, 0);
};

function recursiveSum(n) {
  if (n == 0) {
    return 0;
  }
  return n + recursiveSum(n - 1);
}

const calculateFuelPart2 = (input, mode) => {
  return input.reduce((acc, current) => {
    acc += recursiveSum(Math.abs(current - mode));
    return acc;
  }, 0);
};

const fuel = checkPositions(part);

console.log('Fuel necesario: ', fuel);

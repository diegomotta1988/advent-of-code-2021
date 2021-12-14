import { parsedInput } from './day10.data';
const OPENERS_AND_CLOSURES = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
};

const SYMBOLS_AND_SCORES_PART_ONE = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const SYMBOLS_AND_SCORES_PART_TWO = { ')': 1, ']': 2, '}': 3, '>': 4 };

const checkLines = (part) => {
  let expectedValues = [];
  let errors = [];
  let itemsToComplete = [];
  for (let line of parsedInput) {
    for (let [index, char] of line.split('').entries()) {
      let expectedValue = expectedValues.at(-1);
      if (Object.keys(OPENERS_AND_CLOSURES).includes(char)) {
        expectedValues.push(OPENERS_AND_CLOSURES[char]);
      } else if (char !== expectedValue) {
        console.log(`se esperaba ${expectedValue} y se recibió ${char}`);
        errors.push(char);
        expectedValues = [];
        break;
      } else if (char === expectedValue) {
        expectedValues.pop();
      }
      if (index === line.length - 1) {
        itemsToComplete.push(expectedValues.reverse());
        expectedValues = [];
      }
    }
  }
  if (part === 'part1') {
    return errors;
  } else {
    return itemsToComplete;
  }
};

const calculateScorePartTwo = (itemsToAdd) => {
  return itemsToAdd.reduce((acc, current) => {
    acc = acc * 5 + SYMBOLS_AND_SCORES_PART_TWO[current];
    return acc;
  }, 0);
};

const calculateScorePartOne = (errors) => {
  return errors.reduce((acc, current) => {
    acc += SYMBOLS_AND_SCORES_PART_ONE[current];
    return acc;
  }, 0);
};

const runPartOne = () => {
  const errors = checkLines('part1');
  const score = calculateScorePartOne(errors);
  console.log('El resultado fue: ', score);
};

const runPartTwo = () => {
  const itemsToComplete = checkLines('part2');
  console.log(itemsToComplete);
  const scores = [];
  for (let item of itemsToComplete) {
    scores.push(calculateScorePartTwo(item));
  }

  const result = scores.sort((a, b) => a - b);
  console.log(result[Math.floor(result.length / 2)]);
};

// runPartOne();
runPartTwo();

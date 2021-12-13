import { parsedInput } from './day8.data';

const charsToNumbers = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
};

const checkLengths = () => {
  return parsedInput
    .flat()
    .filter((element, index, array) => index % 2 === 1)
    .map((item) => item.split(' '))
    .flat()
    .reduce((acc, current) => {
      charsToNumbers[current.length] && acc++;
      return acc;
    }, 0);
};

console.log(checkLengths());

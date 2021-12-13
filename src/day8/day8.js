import { RAW_INPUT, RAW_INPUT_DEMO, RAW_INPUT_DEMO2 } from './day8.data';

let parsedInput = RAW_INPUT.split('\n').map((el) => el.split(' | '));

const numbersToChars = {
  1: 2,
  4: 4,
  7: 3,
  8: 7,
};

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

// console.log(checkLengths());

const solvePart2 = () => {
  let sum = 0;
  for (const line of sortedInput()) {
    const [input, output] = line;
    sum += +deduceChars(input, output);
  }
  console.log('El resultado de la suma es: ', sum);
};

const deduceChars = (input, output) => {
  const keys = getKey(input);
  let response = '';
  for (let item of output.split(' ')) {
    response += Object.keys(keys).find((key) => keys[key] === item);
  }
  return response;
};

const getKey = (input) => {
  let keys = {};
  const splittedInput = input.split(' ');
  keys[1] = splittedInput.find((item) => item.length === numbersToChars[1]);
  keys[4] = splittedInput.find((item) => item.length === numbersToChars[4]);
  keys[7] = splittedInput.find((item) => item.length === numbersToChars[7]);
  keys[8] = splittedInput.find((item) => item.length === numbersToChars[8]);
  const top = removeItems(keys[7], keys[1].split(''));

  const topRightAndBottomRight = keys[1];

  const middleAndTopLeft = removeItems(keys[4], keys[1].split(''));
  const bottomAndBottomLeft = removeItems(keys[8], [
    ...keys[4].split(''),
    ...top,
  ]);

  keys[9] = splittedInput.find(
    (item) =>
      item.length === 6 &&
      checkIfContains(keys[4].split(''), item) &&
      checkIfContains(top.split(''), item)
  );
  const bottom = removeItems(keys[9], keys[4].split('')).replace(top, '');
  const bottomLeft = removeItems(bottomAndBottomLeft, bottom.split(''));
  keys[3] = splittedInput.find(
    (item) => item.length === 5 && checkIfContains(keys[1].split(''), item)
  );
  const topLeft = removeItems(keys[9], keys[3]);
  const middle = removeItems(middleAndTopLeft, topLeft);
  keys[0] = removeItems(keys[8], middle.split(''));
  keys[6] = splittedInput.find(
    (item) => item.length === 6 && item !== keys[9] && item !== keys[0]
  );
  const bottomRight = removeItems(keys[6], [
    ...top,
    ...middle,
    ...topLeft,
    ...bottomLeft,
    ...bottom,
  ]);
  const topRight = removeItems(topRightAndBottomRight, bottomRight);
  keys[2] = (top + topRight + middle + bottomLeft + bottom).split('').sort()
    .join``;
  keys[5] = (top + topLeft + middle + bottomRight + bottom).split('').sort()
    .join``;
  return keys;
};

const removeItems = (target, itemsToRemove) => {
  for (let item of itemsToRemove) {
    target = target.replace(item, '');
  }
  return target;
};

function checkIfContains(charsToSearch, string) {
  return charsToSearch.every((item) => string.includes(item));
}

const sortedInput = () => {
  return RAW_INPUT.split('\n')
    .map((line) =>
      line
        .split(' ')
        .map((x) => x.split('').sort().join``)
        .join(' ')
        .split('\n')
        .map((item) => item.split(' | '))
    )
    .flat();
};

solvePart2();

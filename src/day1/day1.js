import { parsedInput } from './day1.data';

function measureIncreasement(inputArray) {
  return inputArray.reduce((acc, current, index) => {
    index > 0 && current > inputArray[index - 1] && acc++;
    return acc;
  }, 0);
}
// Primer ejercicio
console.log('Primer ejercicio: ' + measureIncreasement(parsedInput));

function mapIntoThreeWindows(inputArray) {
  return inputArray
    .map((item, index) => {
      return (
        index < inputArray.length - 2 &&
        item + inputArray[index + 1] + inputArray[index + 2]
      );
    })
    .filter((el) => el);
}

// Segundo ejercicio
const threeWindowsInput = mapIntoThreeWindows(parsedInput);
console.log('Segundo ejercicio: ' + measureIncreasement(threeWindowsInput));

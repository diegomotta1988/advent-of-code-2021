import { parsedInput } from './day3.data';

let gammaRate = '';
let epsilonRate = '';

function part1() {
  for (let i = 0; i < parsedInput[0].length; i++) {
    const mostCommon = getMostCommonValue(parsedInput.map((x) => x[i]));
    gammaRate += mostCommon.toString();
    epsilonRate += (+!mostCommon).toString();
  }
  console.log(gammaRate, epsilonRate);
  const resultado =
    convertBinaryToDecimal(gammaRate) * convertBinaryToDecimal(epsilonRate);
  console.log('Resultado ejercicio 1: ', resultado);
}

function part2() {
  const oxygenGenerator = getOxygenGeneratorRating();
  const co2Scrubber = getCo2ScbrubberRating();
  console.log(
    'Resultado parte 2',
    convertBinaryToDecimal(...oxygenGenerator) *
      convertBinaryToDecimal(...co2Scrubber)
  );
}

function convertBinaryToDecimal(binary) {
  return parseInt(binary, 2);
}

function getMostCommonValue(target) {
  const maxLength = target.length;
  const sum = target.reduce((acc, current) => {
    return acc + +current;
  }, 0);

  return +(sum >= maxLength / 2);
}

function getOxygenGeneratorRating() {
  let oxygenGeneratorRating = [...parsedInput];

  for (let i = 0; i < oxygenGeneratorRating[0].length; i++) {
    let mostCommon = getMostCommonValue(oxygenGeneratorRating.map((x) => x[i]));
    oxygenGeneratorRating = oxygenGeneratorRating.filter(
      (item) => item[i] == mostCommon
    );
    if (oxygenGeneratorRating.length === 1) {
      break;
    }
  }
  console.log('Oxygen generator', oxygenGeneratorRating);
  return oxygenGeneratorRating;
}

function getCo2ScbrubberRating() {
  let co2Scrubber = [...parsedInput];

  for (let i = 0; i < co2Scrubber[0].length; i++) {
    let mostCommon = getMostCommonValue(co2Scrubber.map((x) => x[i]));
    co2Scrubber = co2Scrubber.filter((item) => item[i] != mostCommon);

    if (co2Scrubber.length === 1) {
      break;
    }
  }
  console.log('co2Scrubber', co2Scrubber);
  return co2Scrubber;
}

part1();

part2();

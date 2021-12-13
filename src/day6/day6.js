import { parsedInput } from './day6.data';

let day = 0;

const part1 = (days) => {
  let lanterns = parsedInput;
  while (day < days) {
    day++;
    lanterns = manageLanterns(lanterns);
    day === days && console.log('Total peces: ', lanterns.length);
  }
};

const manageLanterns = (lanterns) => {
  let newLanternsCount = 0;
  lanterns = lanterns.map((item) => {
    if (item === 0) {
      item = 6;
      newLanternsCount++;
    } else {
      item--;
    }
    return item;
  });
  for (let i = 0; i < newLanternsCount; i++) {
    lanterns.push(8);
  }

  // console.log(lanterns);
  return lanterns;
};

const manageLanternsOptimized = (numDays) => {
  let fish = Array(9).fill(0);
  parsedInput.map((item) => fish[Number(item)]++);

  for (let day = 0; day < numDays; day++) {
    let births = fish.shift();
    fish[6] += births;
    fish.push(births);
  }
  fish = fish.reduce((acc, current) => acc + current, 0);
  console.log(fish);
};

part1(80);

manageLanternsOptimized(256);

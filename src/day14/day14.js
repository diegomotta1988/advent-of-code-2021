import { RAW_INPUT } from './day14.data';

let [polymerTemplate, rulesString] = RAW_INPUT.split('\n\n');

const pairRules = rulesString
  .trim()
  .split('\n')
  .map((row) => (row = row.split(' -> ')));

function addToMap(map, key, val = 1) {
  if (!map.has(key)) {
    map.set(key, 0);
  }
  map.set(key, map.get(key) + val);
}

function resolve(steps) {
  // create better pairRule data structure
  const pairRulesMap = new Map();
  for (const rule of pairRules) {
    // CH => B : CH creates CB and BH;
    pairRulesMap.set(rule[0], [rule[0][0] + rule[1], rule[1] + rule[0][1]]);
  }

  // create datastructure for template
  let map = new Map();
  for (let i = 0; i < polymerTemplate.length - 1; i++) {
    const pair = polymerTemplate[i] + polymerTemplate[i + 1];
    addToMap(map, pair);
  }
  const lastChar = polymerTemplate.at(-1);
  for (let step = 0; step < steps; step++) {
    let current = new Map();
    const keys = map.keys();
    for (const key of keys) {
      const next = pairRulesMap.get(key);
      addToMap(current, next[0], map.get(key));
      addToMap(current, next[1], map.get(key));
    }
    map = current;
  }
  //   console.log(map);

  const elementCount = new Map();
  addToMap(elementCount, lastChar);
  const keys = map.keys();
  for (const key of keys) {
    addToMap(elementCount, key[0], map.get(key));
  }
  //   console.log(elementCount);
  const values = [...elementCount.values()];
  const min = Math.min(...values);
  const max = Math.max(...values);
  console.log(max - min);
}

const part1 = () => {
  resolve(10);
};

const part2 = () => {
  resolve(40);
};

part2();

// VERSIÓN 14/12

// let polymer = polymerTemplate;
// const rules = {};
// rulesString.split('\n').map((row) => {
//   row = row.split(' -> ');
//   rules[row[0]] = row[1];
//   return row;
// });

// const checkPairs = (polymer) => {
//   for (let i = 0; i < polymer.length; i++) {
//     const insertion = rules[`${polymer[i]}${polymer[i + 1]}`];
//     if (insertion) {
//       polymer = [polymer.slice(0, i + 1), insertion, polymer.slice(i + 1)].join(
//         ''
//       );
//       i++;
//     }
//   }
//   return polymer;
// };

// const getFrecuencies = (polymer) => {
//   return polymer.split('').reduce((acc, current) => {
//     acc[current] ? acc[current]++ : (acc[current] = 1);
//     return acc;
//   }, {});
// };

// const runPartOne = () => {
//   let step = 0;
//   while (step < 10) {
//     polymer = checkPairs(polymer);
//     step++;
//   }
//   const frecuencies = getFrecuencies(polymer);
//   const max = Math.max(...Object.values(frecuencies));
//   const min = Math.min(...Object.values(frecuencies));
//   console.log('El resultado es: ', max - min);
// };

// // runPartOne();

// const runPartTwo = () => {
//   let pairs = [];
//   let steps = 10;
//   for (let i = 0; i < polymer.length - 1; i++) {
//     pairs.push(`${polymer[i]}${polymer[i + 1]}`);
//   }

//   for (let j = 0; j < steps; j++) {
//     const newPairs = [];
//     for (let pair of pairs) {
//       const insertion = rules[pair];
//       const newPair1 = `${pair[0]}${insertion}`;
//       const newPair2 = `${insertion}${pair[1]}`;
//       newPairs.push(newPair1, newPair2);
//     }
//     pairs = newPairs;
//   }
//   console.log(pairs);
// };

// runPartTwo();

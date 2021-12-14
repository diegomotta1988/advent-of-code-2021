const RAW_INPUT_DEMO = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const RAW_INPUT = `SNPVPFCPPKSBNSPSPSOF

CF -> N
NK -> B
SF -> B
HV -> P
FN -> S
VV -> F
FO -> F
VN -> V
PV -> P
FF -> P
ON -> S
PB -> S
PK -> P
OO -> P
SP -> F
VF -> H
OV -> C
BN -> P
OH -> H
NC -> F
BH -> N
CS -> C
BC -> N
OF -> N
SN -> B
FP -> F
FV -> K
HP -> H
VB -> P
FH -> F
HF -> P
BB -> O
HH -> S
PC -> O
PP -> B
VS -> B
HC -> H
NS -> N
KF -> S
BO -> V
NP -> S
NF -> K
BS -> O
KK -> O
VC -> V
KP -> K
CK -> P
HN -> F
KN -> H
KH -> N
SB -> S
NO -> K
HK -> H
BF -> V
SV -> B
CV -> P
CO -> P
FC -> O
CP -> H
CC -> N
CN -> P
SK -> V
SS -> V
VH -> B
OS -> N
FB -> H
NB -> N
SC -> K
NV -> H
HO -> S
SO -> P
PH -> C
VO -> O
OB -> O
FK -> S
PN -> P
VK -> O
NH -> N
OC -> B
BP -> O
PF -> F
KB -> K
KV -> B
PO -> N
NN -> K
CH -> O
KC -> P
OP -> V
VP -> F
OK -> P
FS -> K
CB -> S
HB -> N
KS -> O
BK -> C
BV -> O
SH -> H
PS -> N
HS -> K
KO -> N`;

let [polymerTemplate, rulesString] = RAW_INPUT_DEMO.split('\n\n');

let polymer = polymerTemplate;
const rules = {};
rulesString.split('\n').map((row) => {
  row = row.split(' -> ');
  rules[row[0]] = row[1];
  return row;
});

const checkPairs = (polymer) => {
  for (let i = 0; i < polymer.length; i++) {
    const insertion = rules[`${polymer[i]}${polymer[i + 1]}`];
    if (insertion) {
      polymer = [polymer.slice(0, i + 1), insertion, polymer.slice(i + 1)].join(
        ''
      );
      i++;
    }
  }
  return polymer;
};

const getFrecuencies = (polymer) => {
  return polymer.split('').reduce((acc, current) => {
    acc[current] ? acc[current]++ : (acc[current] = 1);
    return acc;
  }, {});
};

const runPartOne = () => {
  let step = 0;
  while (step < 10) {
    polymer = checkPairs(polymer);
    step++;
  }
  const frecuencies = getFrecuencies(polymer);
  const max = Math.max(...Object.values(frecuencies));
  const min = Math.min(...Object.values(frecuencies));
  console.log('El resultado es: ', max - min);
};

// runPartOne();

const runPartTwo = () => {
  let pairs = [];
  let steps = 10;
  for (let i = 0; i < polymer.length - 1; i++) {
    pairs.push(`${polymer[i]}${polymer[i + 1]}`);
  }

  for (let j = 0; j < steps; j++) {
    const newPairs = [];
    for (let pair of pairs) {
      const insertion = rules[pair];
      const newPair1 = `${pair[0]}${insertion}`;
      const newPair2 = `${insertion}${pair[1]}`;
      newPairs.push(newPair1, newPair2);
    }
    pairs = newPairs;
  }
  console.log(pairs);
};

runPartTwo();

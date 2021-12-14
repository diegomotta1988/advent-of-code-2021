const RAW_INPUT_DEMO = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const keyValues = {};

const parsedInput = RAW_INPUT_DEMO.split('\n')
  .map((row) => row.split('-'))
  .map((item) => {
    keyValues[item[0]]
      ? keyValues[item[0]].push(item[1])
      : (keyValues[item[0]] = [item[1]]);
  });

console.log(keyValues);

const getPaths = () => {
  for (let link of keyValues.start) {
  }
};

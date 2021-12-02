import { parsedInput } from './day2.data';

let horizontal = 0;
let depth = 0;
let aim = 0;

let part2 = true;

function forward(value) {
  horizontal += value;
  part2 && (depth += aim * value);
}

function down(value) {
  if (part2) {
    aim += value;
  } else {
    depth += value;
  }
}

function up(value) {
  if (part2) {
    aim -= value;
  } else {
    depth -= value;
  }
}

function followCourse() {
  for (let { instruction, value } of parsedInput) {
    executeInstruction(instruction, value);
  }
  console.log('Horizontal', horizontal);
  console.log('Depth', depth);
  console.log('Multiplicación horizontal y depth', horizontal * depth);
}

function executeInstruction(instruction, value) {
  switch (instruction) {
    case 'forward':
      forward(value);
      break;
    case 'down':
      down(value);
      break;
    case 'up':
      up(value);
      break;
    default:
      break;
  }
}

followCourse();

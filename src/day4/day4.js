import { parsedInput } from './day4.data';

let [bingoSequence, boards] = [parsedInput.shift(), parsedInput];

bingoSequence = bingoSequence.split(',');
boards = boards.map((item) => item.split('\n'));
boards = boards.map((el) => el.map((x) => x.split(' ').filter((y) => y)));

let stopGame;
let countWinners = 0;

function playBingo(part2) {
  for (let i = 0; i < bingoSequence.length; i++) {
    if (stopGame) {
      break;
    }
    searchNumberInBoards(bingoSequence[i], i, part2);
  }
}

function searchNumberInBoards(number, count, part2) {
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    if (stopGame) {
      break;
    }
    for (let boardRow = 0; boardRow < boards[boardIndex].length; boardRow++) {
      const target = boards[boardIndex][boardRow].findIndex(
        (item) => item === number
      );
      if (target != -1) {
        boards[boardIndex][boardRow][target] = '*';
        if (count >= 5) {
          const winner = checkRowAndColumn(
            boardIndex,
            boards[boardIndex],
            boardRow,
            target
          );
          if (winner !== null) {
            if (part2) {
              countWinners++;
              if (countWinners === boards.length) {
                console.log(boards);
                console.log('Ultimo Ganador: ', winner);
                stopGame = true;
                const score = calculateScore(boards[boardIndex], number);
                console.log('Puntuacion', score);
                break;
              }
            } else {
              stopGame = true;
              const score = calculateScore(boards[boardIndex], number);
              console.log('Ganador: ', winner);
              console.log('Puntuacion', score);
              break;
            }
          }
        }
      }
    }
  }
}

function checkRowAndColumn(boardIndex, board, row, column) {
  if (
    board[row].every((item) => item === '*') ||
    board.map((x) => x[column]).every((el) => el === '*')
  ) {
    return boardIndex;
  }
  return null;
}

function calculateScore(board, currentNumber) {
  const sum = board.flat().reduce((acc, current) => {
    !isNaN(current) && (acc += +current);
    return acc;
  }, 0);

  return sum * +currentNumber;
}
playBingo(true);

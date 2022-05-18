const fs = require('fs');

const { deepEqual } = require('./deepEqual.js');
const { generatePage } = require('./generatePage.js');

const isOverflow = (stack, maxSize) => {
  return stack.length + 1 > maxSize;
};

const isUnderflow = function (stack) {
  return stack.length === 0;
};

const topOfStack = function (stack) {
  const top = stack[stack.length - 1];
  return top ? top : Infinity;
};

const isValidMove = function ({ destinationTower, sourceTower }, maxSize) {
  if (isOverflow(destinationTower, maxSize)) {
    return false;
  }
  if (isUnderflow(sourceTower)) {
    return false;
  }
  return topOfStack(destinationTower) > topOfStack(sourceTower);
};

const copy = (obj) => JSON.parse(JSON.stringify(obj));

const isInRange = (value, max) => value >= 0 && value <= max;

const areValidInputs = (from, to, max) => {
  return isInRange(from, max) && isInRange(to, max);
};

const playMove = function (game, { from, to }) {
  const gameStatus = copy(game);
  const sourceTower = gameStatus.towers[from];
  const destinationTower = gameStatus.towers[to];

  gameStatus.totalMoves++;
  const towers = { sourceTower, destinationTower };
  const { totalTowers, maxSize } = game;
  if (areValidInputs(from, to, totalTowers) && isValidMove(towers, maxSize)) {
    destinationTower.push(sourceTower.pop());
  }

  return gameStatus;
};

const isGameOver = (game) => deepEqual(game.towers[3], [9, 8, 7, 6]);

const readFile = file => {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    throw error.name + '->' + error.message;
  }
};

const saveChanges = (file, data) => {
  try {
    fs.writeFileSync(file, data, 'utf8');
  } catch (error) {
    throw error.name + '->' + error.message;
  }
};

const readJsonFile = filePath => JSON.parse(readFile(filePath));

const main = function (filePaths, userInput) {
  let game = readJsonFile(filePaths.gameStatusFile);

  game = playMove(game, userInput);
  game.isOver = isGameOver(game);

  const template = readFile(filePaths.templateFile);
  const html = generatePage(game, template);
  saveChanges(filePaths.targetFile, html);

  saveChanges(filePaths.gameStatusFile, JSON.stringify(game));
};

exports.main = main;
exports.isOverflow = isOverflow;
exports.isUnderflow = isUnderflow;
exports.isValidMove = isValidMove;
exports.isGameOver = isGameOver;
exports.topOfStack = topOfStack;

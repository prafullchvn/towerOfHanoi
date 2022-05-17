const { generatePage } = require('./generatePage.js');
const fs = require('fs');

const isOverflow = function (stack, maxSize) {
  return stack.length + 1 > maxSize;
};

const isUnderflow = function (stack) {
  return stack.length === 0;
};

const topOfStack = function (stack) {
  const top = stack[stack.length - 1];
  return top ? top : 50;
};

const isValidMove = function (from, to) {
  if (isOverflow(to)) {
    return false;
  }
  if (isUnderflow(from)) {
    return false;
  }
  return topOfStack(to) > topOfStack(from);
};

const playMove = function (game, { from, to }) {
  const sourceTower = game.towers[from];
  const destinationTower = game.towers[to];

  game.totalMoves++;
  if (isValidMove(sourceTower, destinationTower)) {
    destinationTower.push(sourceTower.pop());
  }
};

const isGameOver = (game) => game.towers['3'].join('') === '9876';

const readFile = file => {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    throw error.name + '->' + error.message;
  }
};

const saveChanges = (file, data) => {
  try {
    return fs.writeFileSync(file, data, 'utf8');
  } catch (error) {
    throw error.name + '->' + error.message;
  }
};

const main = function (files, userInput) {
  const game = JSON.parse(readFile(files.gameStatusFile));
  playMove(game, userInput);
  game.isGameOver = isGameOver(game); // doubt

  const template = readFile(files.templateFile);
  const html = generatePage(game, template);
  saveChanges(files.targetFile, html);

  saveChanges(files.gameStatusFile, JSON.stringify(game));
};

const files = {
  gameStatusFile: './resources/gameStatus.json',
  templateFile: './resources/template.html',
  targetFile: './towers/towers.html'
};

const userInput = {
  from: process.argv[2],
  to: process.argv[3]
};

main(files, userInput);

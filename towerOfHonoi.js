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

const playMove = function (game, from, to) {
  game.totalMoves++;
  if (!isValidMove(from, to)) {
    return false;
  }
  to.push(from.pop());
};

const isGameOver = (game) => game.towers['3'].join('') === '9876';

const readStatus = file => JSON.parse(fs.readFileSync(file, 'utf8'));

const commitStatus = (file, gameStatus) => {
  fs.writeFileSync(file, JSON.stringify(gameStatus), 'utf8');
};

const writeHtmlFile = function (targetFile, html) {
  fs.writeFileSync(targetFile, html + '', 'utf8');
};

let main = function ({ gameStatusFile, templateFile, targetFile }, userInput) {
  const game = readStatus(gameStatusFile);

  const sourceTower = game.towers[userInput.fromTower];
  const destinationTower = game.towers[userInput.toTower];
  playMove(game, sourceTower, destinationTower);
  game.isGameOver = isGameOver(game); // doubt

  const template = fs.readFileSync(templateFile, 'utf8')
  const html = generatePage(game, template);
  writeHtmlFile(targetFile, html);

  commitStatus(gameStatusFile, game);
};

const files = {
  gameStatusFile: './resources/gameStatus.json',
  templateFile: './resources/template.html',
  targetFile: './towers/towers.html'
};

const userInput = {
  fromTower: process.argv[2],
  toTower: process.argv[3]
};

main(files, userInput);

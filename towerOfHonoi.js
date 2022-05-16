const { generatePage } = require('./generatePage.js');
const { readFileSync, writeFileSync } = require('fs');

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

const readStatus = file => JSON.parse(readFileSync(file, 'utf8'));

const commitStatus = (file, gameStatus) => {
  writeFileSync(file, JSON.stringify(gameStatus), 'utf8');
};

const writeHtmlFile = function (targetFile, html) {
  writeFileSync(targetFile, html + '', 'utf8');
};

let main = function (fromTower, toTower) {
  const game = readStatus(this.gameStatusFile);
  playMove(game, game.towers[fromTower], game.towers[toTower]);
  game.isGameOver = isGameOver(game);
  commitStatus(this.gameStatusFile, game);
  const html = generatePage(game, readFileSync(this.templateFile, 'utf8'));
  writeHtmlFile(this.targetFile, html);
};

main = main.bind({
  gameStatusFile: './resources/gameStatus.json',
  templateFile: './resources/template.html',
  targetFile: './towers/towers.html'
});

main(process.argv[2], process.argv[3]);

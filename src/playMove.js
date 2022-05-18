const { main } = require('./towerOfHonoi.js');

const FILE_PATHS = {
  gameStatusFile: './resources/gameStatus.json',
  templateFile: './resources/template.html',
  targetFile: './towers/towers.html'
};

const USER_INPUT = {
  from: process.argv[2],
  to: process.argv[3]
};

main(FILE_PATHS, USER_INPUT);
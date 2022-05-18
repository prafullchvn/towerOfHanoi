const { element, attribute } = require('./createHtml.js');

const createTower = function (tower) {
  const rings = tower.map(value => {
    const elementClass = attribute('class', 'ring');
    const width = value * 9;
    const style = attribute('style', 'width:' + width + '%');

    return element('div', '', [elementClass, style].join(' '));
  }).reverse().join('');

  return element('div', rings, attribute('class', 'tower'));
};

const message = (game) => {
  const visibility = game.isOver ? 'initial' : 'hidden';
  const elementClass = attribute('class', 'message');
  const style = attribute('style', 'visibility:' + visibility);
  return element('div', 'You WON!', elementClass + ' ' + style);
};

const replace = (template, placeholders) => {
  return Object.keys(placeholders).reduce((page, placeholder) => {
    return page.replace(placeholder, placeholders[placeholder]);
  }, template);
};

const generatePage = function (game, template) {
  const { totalMoves: moves } = game;
  const towers = Object.values(game.towers).map(createTower).join('\n');

  const placeholders = {
    '__TOWERS__': towers,
    '__MOVES__': moves,
    '__MESSAGE__': message(game)
  };

  return replace(template, placeholders);
};

exports.generatePage = generatePage;

const { writeFileSync } = require('fs');
const { convertBase } = require('./convertBase.js');
const { createHtml } = require('./createHtml.js');

const onOff = (bit) => {
  return bit ? 'limegreen' : 'tomato';
};

const style = (styles) => {
  const properties = Object.entries(styles).map(([key, val]) => {
    return key + ':' + val;
  }).join(';');
  return 'style="' + properties + '"';
};

const identical = (pos, bits, base) => {
  return Math.pow(base, bits.length - pos - 1);
};

const createSquares = (bits, base) => {
  return bits.map((bit, pos) => {
    const bitStyles = {
      width: 100,
      height: 50,
      'background-color': onOff(+bit),
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
    };
    return createHtml('div', identical(pos, bits, base), style(bitStyles));
  }).join('');
};

const bitsBoard = (bits, base) => {
  const squares = createSquares(bits, base);
  const boardStyles = {
    display: 'flex',
    'flex-wrap': 'wrap',
    'column-gap': '10px',
    'font-size': '1.4em',
  };
  return createHtml('div', squares, style(boardStyles));
};

const main = () => {
  const base = 2;
  const number = process.argv[2];
  const bits = convertBase(number, base).split('');
  const board = bitsBoard(bits, base);
  writeFileSync('demo.html', board);
};

main();

const assert = require('assert');
const { playMove } = require('../src/towerOfHonoi.js');

describe('playMove tests', () => {
  it.only('Should return modified object after move is played.', () => {
    const game = {
      towers: { '1': [9, 8, 7, 6], '2': [], '3': [] },
      maxSize: 4,
      isOver: false,
      totalMoves: 0,
      totalTowers: 3
    };
    const expected = {
      towers: { '1': [9, 8, 7], '2': [6], '3': [] },
      maxSize: 4,
      isOver: false,
      totalMoves: 1,
      totalTowers: 3
    };
    assert.deepStrictEqual(playMove(game, { from: 1, to: 2 }), expected);
  });
  it('Should return the same object to tower num is out of range.', () => {
    const game = {
      towers: { '1': [9, 8, 7, 6], '2': [], '3': [] },
      maxSize: 4,
      isOver: false,
      totalMoves: 0,
      totalTowers: 3
    };
    const expected = {
      towers: { '1': [9, 8, 7, 6], '2': [], '3': [] },
      maxSize: 4,
      isOver: false,
      totalMoves: 1,
      totalTowers: 3
    };
    assert.deepStrictEqual(playMove(game, { from: 1, to: 5 }), expected);
  });
  it.only('Should return the same object from tower num is out of range.', () => {
    const game = {
      towers: { '1': [9, 8, 7, 6], '2': [], '3': [] },
      maxSize: 4,
      isOver: false,
      totalMoves: 0,
      totalTowers: 3
    };
    const expected = {
      towers: { '1': [9, 8, 7, 6], '2': [], '3': [] },
      maxSize: 4,
      isOver: false,
      totalMoves: 1,
      totalTowers: 3
    };
    assert.deepStrictEqual(playMove(game, { from: -1, to: 2 }), expected);
  });
});

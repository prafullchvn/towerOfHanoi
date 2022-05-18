const assert = require('assert');

const { isGameOver } = require('../src/towerOfHonoi.js');

describe('IsGameOver', () => {
  it('Should return false when game is not over.', () => {
    assert.strictEqual(isGameOver({ towers: { '3': [9, 8, 6] } }), false);
  });
  it('Should return true when game is over.', () => {
    assert.strictEqual(isGameOver({ towers: { '3': [9, 8, 7, 6] } }), true);
  });
});

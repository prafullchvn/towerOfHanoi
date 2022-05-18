const assert = require('assert');
const { isValidMove } = require('../src/towerOfHonoi.js');

describe('IsValidMove tests', () => {
  it('Should return false when destination tower is overflow.', () => {
    const inputs = {
      sourceTower: [1],
      destinationTower: [3, 2],
    };
    assert.strictEqual(isValidMove(inputs, 2), false);
  });
  it('Should return false when source tower is underflow.', () => {
    const inputs = {
      sourceTower: [],
      destinationTower: [3, 2],
      maxSize: 3
    };
    assert.strictEqual(isValidMove(inputs), false);
  });
  it(
    'Should return false when top of source tower is greater than top of destination tower.',
    () => {
      const inputs = {
        sourceTower: [4],
        destinationTower: [2, 3],
        maxSize: 3
      };
      assert.strictEqual(isValidMove(inputs), false);
    }
  );
  it(
    'Should return true when top of source tower is smaller than top of destination tower.',
    () => {
      const inputs = {
        sourceTower: [1],
        destinationTower: [2, 3],
        maxSize: 3
      };
      assert.strictEqual(isValidMove(inputs), true);
    }
  );
});

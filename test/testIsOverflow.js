const assert = require('assert');

const { isOverflow } = require('../src/towerOfHonoi.js');

describe('IsOverflow Tests', () => {
  it('Should return false if stack is not overflowing.', () => {
    assert.strictEqual(isOverflow([1, 2], 3), false);
  });
  it('Should return true if stack is overflowing.', () => {
    assert.strictEqual(isOverflow([1, 2], 2), true);
  });
});

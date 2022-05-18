const assert = require('assert');
const { isUnderflow } = require('../src/towerOfHonoi.js');

describe('IsUnderflow', () => {
  it('Should return false if stack is not underflow.', () => {
    assert.strictEqual(isUnderflow([1]), false);
  });

  it('Should return true if stack is underflow.', () => {
    assert.strictEqual(isUnderflow([]), true);
  });
});

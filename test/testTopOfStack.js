const assert = require('assert');
const { topOfStack } = require('../src/towerOfHonoi.js');

describe('Testing topOfStack.', () => {
  it('Should return Infinity if stack is empty.', () => {
    assert.strictEqual(topOfStack([]), Infinity);
  });

  it('Should return top of stack.', () => {
    assert.strictEqual(topOfStack([1, 2, 3]), 3);
  });
});

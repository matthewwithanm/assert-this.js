/*eslint-env mocha */

import assert from 'assert';
import better from '../better';


const assertIsFunction = maybeFunction => assert(typeof maybeFunction === 'function');

describe('better', () => {
  it('can be used directly to assert', () => {
    assert.throws(() => {
      0::better(assert.equal, 1);
    }, 'AssertionError: 0 == 1');
  });

  describe('partial', () => {

    it('returns a partially applied assertion', () => {
      const betterEqual = better.partial(assert.equal);
      assertIsFunction(betterEqual);
      assert.throws(() => {
        0::betterEqual(1);
      }, 'AssertionError: 0 == 1');

      const betterEqual1 = better.partial(assert.equal, 1);
      assertIsFunction(betterEqual1);
      assert.throws(() => {
        0::betterEqual1();
      }, 'AssertionError: 0 == 1');

      const betterEqual1WithMessage = better.partial(assert.equal, 1, 'Errored!');
      assertIsFunction(betterEqual1WithMessage);
      assert.throws(() => {
        0::betterEqual1WithMessage();
      }, 'Errored!');
    });

    it('returns a function that can be further partially applied', () => {
      const betterEqual = better.partial(assert.equal);

      const betterEqual1 = betterEqual.partial(1);
      assertIsFunction(betterEqual1);
      assert.throws(() => {
        0::betterEqual1();
      }, 'AssertionError: 0 == 1');

      const betterEqual1WithMessage = betterEqual.partial(1).partial('Errored!');
      assertIsFunction(betterEqual1WithMessage);
      assert.throws(() => {
        0::betterEqual1WithMessage();
      }, 'Errored!');
    });

  });

  it('can be passed more args at assertion time', () => {
    const betterEqual1 = better.partial(assert.equal, 1);
    assert.throws(() => {
      0::betterEqual1('Errored!');
    }, 'Errored!');
  });

  it('chains', () => {
    const betterEqual = better.partial(assert.equal);
    assert.equal(0::betterEqual(0), 0);
  });

});

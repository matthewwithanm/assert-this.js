/*eslint-env mocha */

import assert from 'assert';
import assertThis from '../assert-this';


const assertIsFunction = maybeFunction => assert(typeof maybeFunction === 'function');

describe('assertThis', () => {
  it('can be used directly to assert', () => {
    assert.throws(() => {
      0::assertThis(assert.equal, 1);
    }, 'AssertionError: 0 == 1');
  });

  describe('partial', () => {

    it('returns a partially applied assertion', () => {
      const equals = assertThis.partial(assert.equal);
      assertIsFunction(equals);
      assert.throws(() => {
        0::equals(1);
      }, 'AssertionError: 0 == 1');

      const equals1 = assertThis.partial(assert.equal, 1);
      assertIsFunction(equals1);
      assert.throws(() => {
        0::equals1();
      }, 'AssertionError: 0 == 1');

      const equals1WithMessage = assertThis.partial(assert.equal, 1, 'Errored!');
      assertIsFunction(equals1WithMessage);
      assert.throws(() => {
        0::equals1WithMessage();
      }, 'Errored!');
    });

    it('returns a function that can be further partially applied', () => {
      const equals = assertThis.partial(assert.equal);

      const equals1 = equals.partial(1);
      assertIsFunction(equals1);
      assert.throws(() => {
        0::equals1();
      }, 'AssertionError: 0 == 1');

      const equals1WithMessage = equals.partial(1).partial('Errored!');
      assertIsFunction(equals1WithMessage);
      assert.throws(() => {
        0::equals1WithMessage();
      }, 'Errored!');
    });

  });

  it('can be passed more args at assertion time', () => {
    const equals1 = assertThis.partial(assert.equal, 1);
    assert.throws(() => {
      0::equals1('Errored!');
    }, 'Errored!');
  });

  it('chains', () => {
    const equals = assertThis.partial(assert.equal);
    assert.equal(0::equals(0), 0);
  });

});

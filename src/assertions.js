import {assert} from 'chai';
import keys from 'object-keys';
import better from './better';


const nameMap = {
  // fail: '?',
  isOk: 'isTruthy',
  isNotOk: 'isFalsy',
  equal: 'equals',
  // notEqual: '?',
  strictEqual: 'strictEquals',
  // notStrictEqual: '?',
  deepEqual: 'deepEquals',
  // notDeepEqual: '?',
  isAbove: null,
  isBelow: null,
  isTrue: null,
  isFalse: null,
  isNull: null,
  isNotNull: null,
  isNaN: null,
  isNotNaN: null,
  isUndefined: null,
  isDefined: null,
  isFunction: null,
  isNotFunction: null,
  isObject: null,
  isNotObject: null,
  isArray: null,
  isNotArray: null,
  isString: null,
  isNotString: null,
  isNumber: null,
  isNotNumber: null,
  isBoolean: null,
  isNotBoolean: null,
  // typeOf: '?',
  // notTypeOf: '?',
  instanceOf: 'isInstanceOf',
  notInstanceOf: 'isNotInstanceOf',
  include: 'includes',
  notInclude: 'doesNotInclude',
  match: 'matches',
  notMatch: 'doesNotMatch',
  property: 'hasProperty',
  notProperty: 'doesNotHaveProperty',
  // deepProperty: '?',
  // notDeepProperty: '?',
  // propertyVal: '?',
  // propertyNotVal: '?',
  // deepPropertyVal: '?',
  // deepPropertyNotVal: '?',
  lengthOf: 'hasLengthOf',
  throws: null,
  doesNotThrow: null,
  // operator: '?',
  closeTo: 'isCloseTo',
  sameMembers: 'hasSameMembersAs',
  // sameDeepMembers: '?',
  includeMembers: 'includesMembers',
  changes: null,
  doesNotChange: null,
  increases: null,
  doesNotIncrease: null,
  decreases: null,
  doesNotDecrease: null,
  // ifError: '?',
  isExtensible: null,
  isNotExtensible: null,
  isSealed: null,
  isNotSealed: null,
  isFrozen: null,
  isNotFrozen: null,
};

module.exports = keys(nameMap).reduce((exports, name) => {
  const newName = nameMap[name] || name;
  exports[newName] = better.partial(assert[name]);
  return exports;
}, {});
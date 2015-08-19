export default function assertThis(assertion, ...args) {
  assertion(this, ...args);
  return this;
}

assertThis.partial = function(...args) {
  const applied = partial(this, ...args);
  applied.partial = assertThis.partial;
  return applied;
}

function partial(fn, ...args) {
  return function(...moreArgs) {
    return fn.call(this, ...args, ...moreArgs);
  };
}

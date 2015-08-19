export default function better(assertion, ...args) {
  assertion(this, ...args);
}

better.partial = function(...args) {
  const applied = partial(this, ...args);
  applied.partial = better.partial;
  return applied;
}

function partial(fn, ...args) {
  return function(...moreArgs) {
    return fn.call(this, ...args, ...moreArgs);
  };
}

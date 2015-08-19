Assert This!
============

Assert This! is an experimental assertion library that leverages the proposed
[function-bind operator] to create a clear left-to-right assertion style that
doesn't require wrapping (like [expect-style asssertions][expect]) or
`Object.prototype` changes (like [should-style assertions][should]).


Examples
--------

```js
import {equals, isTrue, isFalse} from 'assert-this/assertions';
import sum from './sum';
import isOdd from './is-odd';

sum(1, 2)::equals(3);
isOdd(3)::isTrue();
isOdd(2)::isFalse();
```

They chain if you want to:

```js
random(1, 5)::isAbove(1)::isBelow(5);
```

Since we're just dealing with functions, you can name them whatever you want:

```js
import {
  equals as betterEqual,
  isTrue as betterBeTrue,
  isFalse as betterBeFalse,
} from 'assert-this/assertions';
import sum from './sum';
import isOdd from './is-odd';

sum(1, 2)::betterEqual(3);
isOdd(3)::betterBeTrue();
isOdd(2)::betterBeFalse();
```

Also, since we're just dealing with functions, there's no need for plugins. To
create your own assert-this-style assertions, just use `assertThis.partial` with
a normal assert-style assertion function:

```js
import assertThis from 'assert-this';
const betterBeGreaterThan5 = assertThis.partial((actual, msg) => {
  if (actual <= 5) throw new Error(msg || `${actual}  isn't greater than 5!`);
});

1::betterBeGreaterThan5();
2::betterBeGreaterThan5("This number's too small.");
```

Or just use Assert This! with regular assert-style functions at test time:

```js
import assertThis from 'assert-this';
import {equal as equals} from 'assert'; // Plain old node assert module!
import sum from './sum';

sum(1, 2)::asssertThis(equals, 3);
```

In fact, this is really all the library does! For convenience, common assertions
are included pre-wrapped in the `'assert-this/assertions'` module (currently,
they're wrapping [chai]'s), but you don't have to use them if you don't want to.


Why?
----

I'm not a big fan of [expect-style assertions][expect]. The `expect()` function
returns a wrapper object with assertion methods. If you want to make custom
assertions (and maintain the same style), you'll need to add them to the wrapper
object. This means plugins, a shared namespace, and possible namespace
collisions. [Regular functions][assert], on the other hand, don't have these
issues.

At the same time, I get why people like the `expect()` style. It reads well from
left-to-right and there's no confusion about which is the expected value and
which is the actual. Needing to use a wrapper object to accomplish this is a
shortcoming in the language.

This project is an attempt to get the best of both worlds.


Warning!
--------

This is an experiment. Stuff might change.


[chai]: http://chaijs.com
[expect]: http://chaijs.com/guide/styles/#expect
[should]: http://chaijs.com/guide/styles/#should
[assert]: http://chaijs.com/guide/styles/#assert
[function-bind operator]: https://github.com/zenparsing/es-function-bind

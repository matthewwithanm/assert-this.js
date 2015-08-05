better-assertions
=================

I don't like [expect-style assertions]. The `expect()` function returns a
wrapper object with assertion methods. If you want to make custom assertions
(and maintain the same style), you'll need to add them to the wrapper object.
You have to figure out how to do that, and people using your code have to know
you've done it. And the shared namespace can cause collision issues. [Regular
functions][2], on the other hand, don't have these issues.

At the same time, I get why people like the `expect()` style. It reads well from
left-to-right and there's no confusion about which is the expected value and
which is the actual. Needing to use a wrapper object to accomplish this is a
shortcoming in the language. But the [function-bind operator proposal] addresses
that. This library is built around that solution.


[expect-style assertions]: http://chaijs.com/api/bdd/
[2]: http://chaijs.com/api/assert/
[function-bind operator proposal]: https://github.com/zenparsing/es-function-bind

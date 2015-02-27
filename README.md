[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

A node.js module to interface with the ELIQ API promise style.

```
var config = {
  eliqAccesstoken: '...',
},
eliq = require('eliq-promise')(config);

eliq.getToday().then(console.log);

eliq.getThisHour().then(console.log);
```

[npm-url]: https://npmjs.org/package/eliq-promise
[downloads-image]: http://img.shields.io/npm/dm/eliq-promise.svg
[npm-image]: http://img.shields.io/npm/v/eliq-promise.svg
[travis-url]: https://travis-ci.org/ashpool/eliq-promise
[travis-image]: http://img.shields.io/travis/ashpool/eliq-promise.svg

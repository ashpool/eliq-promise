[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

A node.js module to interface with the ELIQ API promise style.

```
var config = {
  eliqAccesstoken: '...',
},
eliq = require('eliq-promise')(config);

eliq.getToday().then(console.log);
```


[npm-url]: https://npmjs.org/package/eliq-promise
[downloads-image]: http://img.shields.io/npm/dm/eliq-promise.svg
[npm-image]: http://img.shields.io/npm/v/eliq-promise.svg
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
[travis-url]: https://travis-ci.org/ashpool/eliq-promise
[travis-image]: http://img.shields.io/travis/ashpool/eliq-promise.svg

# eliq-promise
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

A node.js module to interface with the [ELIQ API](http://eliq.se) [promise style](https://promisesaplus.com).

## Prerequisites
ELIQ [access token](https://my.eliq.se/user/settings/api)

## Install
``npm install eliq-promise``

## API

### Setup
```
var config = {
  eliqAccesstoken: '...',
},
eliq = require('eliq-promise')(config);
```

### From
```
eliq.getFrom(<hours ago>, '6min' | 'hour' | 'day').then(console.log).catch(console.log);
```

### From => To
```
eliq.getFromTo (<startdate>, <enddate>, '6min' | 'hour' | 'day').then(console.log).catch(console.log);
```

## Notes

* It seems like the ``6min`` resolution is limited to 1 hour when just supplying ``startdate``.
* ELIQ's uptime is not 99.9998%.

[npm-url]: https://npmjs.org/package/eliq-promise
[downloads-image]: http://img.shields.io/npm/dm/eliq-promise.svg
[npm-image]: http://img.shields.io/npm/v/eliq-promise.svg
[travis-url]: https://travis-ci.org/ashpool/eliq-promise
[travis-image]: http://img.shields.io/travis/ashpool/eliq-promise.svg

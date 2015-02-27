# eliq-promise
A node.js module to interface with the ELIQ API promise style.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]



## Prerequisites
Your personal access token: https://my.eliq.se/user/settings/api

## Install
``npm install eliq-promise``

## API
```
var config = {
  eliqAccesstoken: '...',
},
eliq = require('eliq-promise')(config);

eliq.getToday().then(<do something>);

eliq.getThisHour().then(<do something>);
```

[npm-url]: https://npmjs.org/package/eliq-promise
[downloads-image]: http://img.shields.io/npm/dm/eliq-promise.svg
[npm-image]: http://img.shields.io/npm/v/eliq-promise.svg
[travis-url]: https://travis-ci.org/ashpool/eliq-promise
[travis-image]: http://img.shields.io/travis/ashpool/eliq-promise.svg

# eliq-promise
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

A node.js module to interface with the [ELIQ API](http://eliq.se) [promise style](https://promisesaplus.com).

## Prerequisites
Your personal access token: https://my.eliq.se/user/settings/api

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
### Today
```
eliq.getToday().then(console.log);
=>
{ startdate: '2015-02-26T23:00:00+00:00',
  enddate: '2015-02-27T23:00:00+00:00',
  intervaltype: 'hour',
  data: 
   [ { avgpower: 3230,
       energy: 3229,
       temp_out: null,
       time_start: '2015-02-26T23:00:00',
       time_end: '2015-02-27T00:00:00' },
     ...
     ] }
```

### This hour
```
eliq.getThisHour().then(console.log);
=>
{ startdate: '2015-02-27T18:00:00+00:00',
  enddate: '2015-02-27T19:00:00+00:00',
  intervaltype: '6min',
  data: 
   [ { avgpower: 3130,
       energy: 313,
       temp_out: null,
       time_start: '2015-02-27T18:00:00',
       time_end: '2015-02-27T18:06:00' },
     ...
     ] }

```

[npm-url]: https://npmjs.org/package/eliq-promise
[downloads-image]: http://img.shields.io/npm/dm/eliq-promise.svg
[npm-image]: http://img.shields.io/npm/v/eliq-promise.svg
[travis-url]: https://travis-ci.org/ashpool/eliq-promise
[travis-image]: http://img.shields.io/travis/ashpool/eliq-promise.svg

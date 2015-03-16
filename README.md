# eliq-promise
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

A node.js module to interface with the [ELIQ API](http://eliq.se) [promise style](https://promisesaplus.com).

## Prerequisites
ELIQ [access token](https://my.eliq.se/user/settings/api)

## Install
```Bash
npm install eliq-promise
```

## API

### Setup
```Javascript
var config = {
  eliqAccesstoken: '...',
  recover: true|false
},
eliq = require('eliq-promise')(config);
```
### Now
```Javascript
eliq.getNow().then(console.log).catch(console.log);
=>
{ createddate: '2015-03-10T05:38:20', power: 1285 }
```

### From
```Javascript
eliq.getFrom(<hours ago>, '6min' | 'hour' | 'day').then(console.log).catch(console.log);
=>
{ startdate: '2015-03-10T00:00:00+00:00',
  enddate: '2015-03-10T01:00:00+00:00',
  intervaltype: '6min',
  data:
   [ { avgpower: 1170,
       energy: 117,
       temp_out: null,
       time_start: '2015-03-10T00:00:00',
       time_end: '2015-03-10T00:06:00' },
   ...
   ]
}
```

### From => To
```Javascript
eliq.getFromTo (<startdate>, <enddate>, '6min' | 'hour' | 'day').then(console.log).catch(console.log);
=>
{ startdate: '2015-03-02T20:00:00+00:00',
  enddate: '2015-03-02T23:00:00+00:00',
  intervaltype: '6min',
  data:
   [ { avgpower: 2790,
       energy: 279,
       temp_out: null,
       time_start: '2015-03-02T20:00:00',
       time_end: '2015-03-02T20:06:00' },
    ...
   ]
}
```

## Recover (Experimental)
In case ELIQ API is unresponsive (ie. response code 503), this options enable recovery
of failed requests to the ELIQ API. Each failed request is persisted on file and being
re-executed when calling ``eliq.recover(...)``.

```Javascript
var eliq = require('eliq-promise')({recover: true});
```

```Javascript
eliq.recover(console.log);
```

## Notes

* It seems like the ``6min`` resolution is limited to 1 hour when just supplying ``startdate``.
* ELIQ's uptime is not 99.9998%.

[npm-url]: https://npmjs.org/package/eliq-promise
[downloads-image]: http://img.shields.io/npm/dm/eliq-promise.svg
[npm-image]: http://img.shields.io/npm/v/eliq-promise.svg
[travis-url]: https://travis-ci.org/ashpool/eliq-promise
[travis-image]: http://img.shields.io/travis/ashpool/eliq-promise.svg

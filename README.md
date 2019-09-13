# eliq-promise
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Actions Status](https://github.com/ashpool/eliq-promise/workflows/Node.js%20Package/badge.svg)](https://github.com/ashpool/eliq-promise/actions)
[![Actions Status](https://github.com/ashpool/eliq-promise/workflows/Node%20CI/badge.svg)](https://github.com/ashpool/eliq-promise/actions)


A node.js module to interface with the [ELIQ API](https://eliq.io) [promise style](https://promisesaplus.com).

## Prerequisites
ELIQ [access token](https://my.eliq.io/user/settings/api)

## Install
```Bash
npm install eliq-promise
```

## API

### Setup
```Javascript
var config = {
  eliqAccesstoken: '...',
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

## Notes

* It seems like the ``6min`` resolution is limited to 1 hour when just supplying ``startdate``.
* ELIQ's uptime is not 99.9998%.

[npm-url]: https://npmjs.org/package/eliq-promise
[downloads-image]: http://img.shields.io/npm/dm/eliq-promise.svg
[npm-image]: http://img.shields.io/npm/v/eliq-promise.svg

var RSVP = require('rsvp'),
    request = require('request'),
    date = require('./date');

module.exports = function (config) {
    'use strict';
    var eliqUrl = require('./eliqurl')(config),
        recover = require('./recover')(config);

    function restore (log) {
        return recover.restore(fetchData, log);
    }

    function fetchData (url) {
        return new RSVP.Promise(function (resolve, reject) {
            var options = {
                url: url,
                json: true,
                timeout: 3000
            };
            request(options, function (error, response, body) {
                if (!error && response && (response.statusCode === 200 || response.statusCode === 201)) {
                    resolve(body);
                } else if (response.code >= 500 && response.code <= 599) {
                    recover.log(url);
                    reject(new Error('Got status code ' + response.statusCode + ' for ' + options.url));
                } else if (error) {
                    reject(error);
                } else {
                    reject(new Error('Got status code ' + response.statusCode + ' for ' + options.url));
                }
            });
        });
    }

    function getNow () {
        return fetchData(eliqUrl.now());
    }

    function getFrom (age, resolution) {
        var startdate = date.hoursAgoFromNow(age);
        return fetchData(eliqUrl.from(startdate, resolution));
    }

    function getFromTo (startdate, enddate, resolution) {
        return fetchData(eliqUrl.fromTo(startdate, enddate, resolution));
    }

    return {
        getNow: getNow,
        getFrom: getFrom,
        getFromTo: getFromTo,
        restore: restore
    };
};

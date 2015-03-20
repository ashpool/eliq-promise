var RSVP = require('rsvp'),
    request = require('request'),
    date = require('./date');

module.exports = function (config) {
    'use strict';
    var eliqUrl = require('./eliqurl')(config);

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
                } else {
                    error = error || new Error('Got status code ' + response.statusCode + ' for ' + options.url);
                    reject(error);
                }
            });
        });
    }

    function getNow() {
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
        getFromTo: getFromTo
    };
};

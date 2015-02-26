var RSVP = require('rsvp'),
    request = require('request');


module.exports = function (config) {
    'use strict';

    var eliqUrl = require('./eliqurl')(config),
        eliqAcesstoken = config.eliqAccesstoken;

    function fetchData (url) {
        return new RSVP.Promise(function (resolve, reject) {
            var time = new Date(),
                options = {
                    url: url,
                    json: true,
                    timeout: 1000
                };
            request(options, function (error, response, body) {
                if (!error && response && (response.statusCode === 200 || response.statusCode === 201)) {
                    resolve(body);
                } else {
                    error = error || 'Got status code ' + response.statusCode + ' for ' + options.url;
                    reject(error);
                }
            });
        });
    }

    function getToday () {
        return fetchData(eliqUrl.day(new Date()));
    }

    function getThisHour () {
        return fetchData(eliqUrl.hour(new Date()));
    }

    return {getToday: getToday, getThisHour: getThisHour};
};
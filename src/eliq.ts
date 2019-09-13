import request from 'request';
import * as date from './date';

module.exports = function (config: any) {
  'use strict';
  var eliqUrl = require('./eliqurl')(config);

  function fetchData(url: any) {
    return new Promise(function (resolve, reject) {
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

  function getFrom(age: any, resolution: any) {
    var startdate = date.hoursAgoFromNow(age);
    return fetchData(eliqUrl.from(startdate, resolution));
  }

  function getFromTo(startdate: any, enddate: any, resolution: any) {
    return fetchData(eliqUrl.fromTo(startdate, enddate, resolution));
  }

  return {
    getNow: getNow,
    getFrom: getFrom,
    getFromTo: getFromTo
  };
};

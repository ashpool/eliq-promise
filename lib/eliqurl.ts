var date = require('./date');

module.exports = function (config) {
  if (!config || !config.eliqAccesstoken) {
    throw new Error('config.eliqAccesstoken must be configured');
  }

  function baseUrl() {
    return (config.eliqUrl || 'https://my.eliq.io/api/').replace(/\/?$/, '');
  }

  function accesstoken() {
    return '?accesstoken=' + config.eliqAccesstoken;
  }

  function now() {
    return baseUrl() + '/datanow' + accesstoken();
  }

  function from(startdate, resolution) {
    return baseUrl() + '/data' + accesstoken() + '&startdate=' + date.toISOHour(startdate).slice(0, -1) + '&intervaltype=' + resolution;
  }

  function fromTo(startdate, enddate, resolution) {
    return baseUrl() + '/data' + accesstoken() + '&startdate=' + date.toISOHour(startdate).slice(0, -1) + '&enddate=' + date.toISOHour(enddate).slice(0, -1) + '&intervaltype=' + resolution;
  }

  return {
    now: now,
    from: from,
    fromTo: fromTo
  };
};

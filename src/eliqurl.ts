import * as date from './date';

module.exports = function (config: any) {
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

  function from(startdate: any, resolution: any) {
    return baseUrl() + '/data' + accesstoken() + '&startdate=' + date.toISOHour(startdate).slice(0, -1) + '&intervaltype=' + resolution;
  }

  function fromTo(startdate: any, enddate: any, resolution: any) {
    return baseUrl() + '/data' + accesstoken() + '&startdate=' + date.toISOHour(startdate).slice(0, -1) + '&enddate=' + date.toISOHour(enddate).slice(0, -1) + '&intervaltype=' + resolution;
  }

  return {
    now: now,
    from: from,
    fromTo: fromTo
  };
};

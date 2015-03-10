var date = require('./date');

module.exports = function (config) {
    if (!config || !config.eliqAccesstoken) {
        throw new Error('config.eliqAccesstoken must be configured');
    }

    function baseUrl () {
        return (config.eliqUrl || 'https://my.eliq.se/api/').replace(/\/?$/, '');
    }

    function accesstoken () {
        return '?accesstoken=' + config.eliqAccesstoken;
    }

    function now () {
        return baseUrl() + '/datanow' + accesstoken();
    }

    function from (startdate, resolution) {
        return baseUrl() + '/data' + accesstoken() + '&startdate=' + date.toISOHour(startdate) + '&intervaltype=' + resolution;
    }

    function fromTo (startdate, enddate, resolution) {
        return baseUrl() + '/data' + accesstoken() + '&startdate=' + date.toISOHour(startdate) + '&enddate=' + date.toISOHour(enddate) + '&intervaltype=' + resolution;
    }

    return {
        now: now,
        from: from,
        fromTo: fromTo
    };
};

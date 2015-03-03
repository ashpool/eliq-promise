var date = require('./date');

module.exports = function (config) {

    function baseUrl () {
        return (config.eliqUrl || 'https://my.eliq.se/api/data') + '/?accesstoken=' + config.eliqAccesstoken;
    }

    function from(startdate, resolution) {
        return baseUrl() + '&startdate=' + date.toISODay(startdate) + '&intervaltype=' + resolution;
    }

    function fromTo(startdate, enddate, resolution) {
        return baseUrl() + '&startdate=' + date.toISODay(startdate) + '&enddate=' + date.toISODay(enddate) + '&intervaltype=' + resolution;
    }

    function day (startDate) {
        return baseUrl() + '&startdate=' + date.toISODay(startDate) + '&intervaltype=hour';
    }

    function hour (startDate) {
        return baseUrl() + '&startdate=' + date.toISOHour(startDate) + '&intervaltype=6min';
    }

    return {
        from: from,
        fromTo: fromTo,
        day: day,
        hour: hour
    };
};
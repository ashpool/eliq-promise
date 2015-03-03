var date = require('./date');

module.exports = function (config) {

    function baseUrl () {
        return (config.eliqUrl || 'https://my.eliq.se/api/data') + '/?accesstoken=' + config.eliqAccesstoken;
    }

    function from(from, resolution) {
        return baseUrl() + '&startdate=' + date.toISODay(from) + '&intervaltype=' + resolution;
    }

    function fromTo(from, to, resolution) {
        return baseUrl() + '&startdate=' + date.toISODay(from) + '&enddate=' + date.toISODay(to) + '&intervaltype=' + resolution;
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
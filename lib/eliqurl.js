var date = require('./date');

module.exports = function (config) {

    function baseUrl () {
        return (config.eliqUrl || 'https://my.eliq.se/api/data') + '/?accesstoken=' + config.eliqAccesstoken;
    }

    function from(startdate, resolution) {
        return baseUrl() + '&startdate=' + date.toISOHour(startdate) + '&intervaltype=' + resolution;
    }

    function fromTo(startdate, enddate, resolution) {
        return baseUrl() + '&startdate=' + date.toISOHour(startdate) + '&enddate=' + date.toISOHour(enddate) + '&intervaltype=' + resolution;
    }

    return {
        from: from,
        fromTo: fromTo
    };
};

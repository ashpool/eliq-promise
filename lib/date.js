var moment = require('moment-timezone');
/**
 * Returns ISO8601 formatted date string rounded down to day
 * e.g 2012-11-04T00:00:00.000Z
 * @param date date or timestamp
 * @returns {string|*}
 */
function toISODay (date) {
    return moment(date).hours(0).minutes(0).second(0).millisecond(0).toISOString();
}

/**
 * Returns ISO8601 formatted date string rounded down to hour
 * e.g 2012-11-04T17:00:00.000Z
 * @param date date or timestamp
 * @returns {string|*}
 */
function toISOHour (date) {
    return moment(date).minute(0).second(0).millisecond(0).toISOString();
}

function hoursAgoFromNow (age) {
    return moment().subtract(age, 'hours').toDate();
}

module.exports = {
    toISODay: toISODay,
    toISOHour: toISOHour,
    hoursAgoFromNow: hoursAgoFromNow
};
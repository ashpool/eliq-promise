var moment = require('moment-timezone');

function toISODay (date) {
    return moment(date).hours(0).minutes(0).second(0).millisecond(0).toISOString();
}
function toISOHour (date) {
    return moment(date).minute(0).second(0).millisecond(0).toISOString();
}

module.exports = {
    toISODay: toISODay,
    toISOHour: toISOHour
};
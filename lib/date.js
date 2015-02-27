var moment = require('moment-timezone');

module.exports = {
    toISODay: function yyymmdd (date) {
        return moment(date).utc().hours(0).minutes(0).second(0).millisecond(0).toISOString();
    },
    toISOHour: function toISO (date) {
        return moment(date).utc().minute(0).second(0).millisecond(0).toISOString();
    }
};
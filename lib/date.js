var moment = require('moment');

module.exports = {
    toISODay: function yyymmdd (date) {
        return moment(date).hours(1).minutes(0).second(0).millisecond(0).toISOString();
    },
    toISOHour: function toISO (date) {
        return moment(date).minute(0).second(0).millisecond(0).toISOString();
    }
};
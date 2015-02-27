var moment = require('moment');

module.exports = {
    toISODay: function yyymmdd (date) {
        return moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).toISOString();
    },
    toISOHour: function toISO (date) {
        return moment(date).minutes(0).seconds(0).milliseconds(0).toISOString();
    }
};
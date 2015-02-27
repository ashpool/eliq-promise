var moment = require('moment-timezone');

module.exports = {
    toISODay: function yyymmdd (date) {
        var z = moment().zone()/60;
        return moment(date).utc().hours(0 + z).minutes(0).second(0).millisecond(0).toISOString();
    },
    toISOHour: function toISO (date) {
        return moment(date).utc().minute(0).second(0).millisecond(0).toISOString();
    }
};
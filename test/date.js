/*jshint undef:false */
var chai = require('chai'),
    expect = chai.expect,
    date = require('../lib/date'),
    moment = require('moment-timezone');


describe('date', function () {
    describe('#toISODay', function () {
        it('formats date into YYYY-MM-DDT00:00:00.000Z', function () {
            expect(date.toISODay(moment.tz("2012-11-04 00:59:59", "America/New_York"))).to.equal('2012-11-04T04:00:00.000Z');

            expect(date.toISODay(moment.tz("2012-11-04 00:59:59", "Europe/Stockholm"))).to.equal('2012-11-03T23:00:00.000Z');
        });
    });
    describe('#toISOHour', function () {
        it('formats date into YYYY-MM-DDTHH:00:00.000Z', function () {
           // expect(date.toISOHour(Date.UTC(1973, 0, 13, 0, 0, 0))).to.equal('1973-01-13T00:00:00.000Z');
        });
    });
});

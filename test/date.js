/*jshint undef:false */
var chai = require('chai'),
    expect = chai.expect,
    date = require('../lib/date'),
    moment = require('moment-timezone');


describe('date', function () {
    describe('#toISODay', function () {
        it('formats date into YYYY-MM-DDT00:00:00.000Z', function () {
            expect(date.toISODay(moment("1973-01-13 0:00 +0000", "YYYY-MM-DD HH:mm Z"))).to.equal('1973-01-13T00:00:00.000Z');
            expect(date.toISODay(moment("1973-01-13 0:01 +0000", "YYYY-MM-DD HH:mm Z"))).to.equal('1973-01-13T00:00:00.000Z');
            expect(date.toISODay(moment("1973-01-13 0:30 +0000", "YYYY-MM-DD HH:mm Z"))).to.equal('1973-01-13T00:00:00.000Z');
            expect(date.toISODay(moment("1973-01-13 0:59 +0000", "YYYY-MM-DD HH:mm Z"))).to.equal('1973-01-13T00:00:00.000Z');
            expect(date.toISODay(moment("1973-01-13 18:30 +0000", "YYYY-MM-DD HH:mm Z"))).to.equal('1973-01-13T00:00:00.000Z');
            expect(date.toISODay(moment("1973-01-13 23:59 +0000", "YYYY-MM-DD HH:mm Z"))).to.equal('1973-01-13T00:00:00.000Z');
        });
    });
    describe('#toISOHour', function () {
        it('formats date into YYYY-MM-DDTHH:00:00.000Z', function () {
            expect(date.toISOHour(moment("1973-01-13 0:00 +0000", "YYYY-MM-DD HH:mm Z"))).to.equal('1973-01-13T00:00:00.000Z');
        });
    });
});

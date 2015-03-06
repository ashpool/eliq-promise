/*jshint undef:false */
var moment = require('moment-timezone'),
    chai = require('chai'),
    expect = chai.expect;

describe('eliqurl', function () {
    describe('#from', function () {
        it('reads config.eliqUrl and accessToken', function () {
            var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
                eliqurl = require('./../lib/eliqurl')(config),
                startdate = moment.tz('2012-11-04 17:30:15', 'GMT');
            expect(eliqurl.from(startdate, '6min')).to
                .equal('https://eliq.url/?accesstoken=xxxxx&startdate=2012-11-04T00:00:00.000Z&intervaltype=6min');
        });
    });
    describe('#fromTo', function () {
        it('reads config.eliqUrl and accessToken', function () {
            var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
                eliqurl = require('./../lib/eliqurl')(config),
                startdate = moment.tz('2012-11-03 17:30:15', 'GMT'),
                enddate = moment.tz('2012-11-04 17:30:15', 'GMT');
            expect(eliqurl.fromTo(startdate, enddate, 'day')).to
                .equal('https://eliq.url/?accesstoken=xxxxx&startdate=2012-11-03T00:00:00.000Z&enddate=2012-11-04T00:00:00.000Z&intervaltype=day');
        });
    });
});
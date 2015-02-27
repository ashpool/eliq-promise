/*jshint undef:false */
var moment = require('moment-timezone'),
    chai = require('chai'),
    expect = chai.expect;

describe('eliqurl', function () {
    describe('#day', function () {
        it('reads config.eliqUrl and accessToken', function () {
            var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
                eliqurl = require('./../lib/eliqurl')(config),
                date = Date.UTC(1973, 0, 13, 1, 0);
            expect(eliqurl.day(date)).to.equal('https://eliq.url/?accesstoken=xxxxx&startdate=1973-01-12T23:00:00.000Z&intervaltype=hour');
        });
    });
});
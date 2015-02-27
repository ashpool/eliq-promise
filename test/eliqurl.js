/*jshint undef:false */
var moment = require('moment-timezone'),
    chai = require('chai'),
    expect = chai.expect;

describe('eliqurl', function () {
    describe('#day', function () {
        it('reads config.eliqUrl and accessToken', function () {
            var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
                eliqurl = require('./../lib/eliqurl')(config),
                date = moment.tz("2012-11-04 17:30:15", "GMT");
            expect(eliqurl.day(date)).to.equal('https://eliq.url/?accesstoken=xxxxx&startdate=2012-11-04T00:00:00.000Z&intervaltype=hour');
        });
    });
});
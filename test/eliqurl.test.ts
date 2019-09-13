import moment from 'moment-timezone';
import chai from  'chai';

const expect = chai.expect;

describe('eliqurl', function () {
  it('throws an error if accesstoken is not configured', function () {
    var eliqurl = require('../src/eliqurl');
    expect(eliqurl).to.throw(Error);
  });

  describe('#now', function () {
    it('reads config.Url and accessToken', function () {
      var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
        eliqurl = require('../src/eliqurl')(config);
      expect(eliqurl.now()).to.equal('https://eliq.url/datanow?accesstoken=xxxxx');
    });
    it('has a default url', function () {
      var config = {eliqAccesstoken: 'xxxxx'},
        eliqurl = require('../src/eliqurl')(config);
      expect(eliqurl.now()).to.equal('https://my.eliq.io/api/datanow?accesstoken=xxxxx');
    });
  });

  describe('#from', function () {
    it('reads config.eliqUrl and accessToken', function () {
      var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
        eliqurl = require('../src/eliqurl')(config),
        startdate = moment.tz('2012-11-04 17:30:15', 'GMT');
      expect(eliqurl.from(startdate, '6min')).to
        .equal('https://eliq.url/data?accesstoken=xxxxx&startdate=2012-11-04T17:00:00.000&intervaltype=6min');
    });
  });

  describe('#fromTo', function () {
    it('reads config.eliqUrl and accessToken', function () {
      var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
        eliqurl = require('../src/eliqurl')(config),
        startdate = moment.tz('2012-11-03 17:30:15', 'GMT'),
        enddate = moment.tz('2012-11-04 17:30:15', 'GMT');
      expect(eliqurl.fromTo(startdate, enddate, 'day')).to
        .equal('https://eliq.url/data?accesstoken=xxxxx&startdate=2012-11-03T17:00:00.000&enddate=2012-11-04T17:00:00.000&intervaltype=day');
    });
  });
});

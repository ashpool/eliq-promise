/*jshint undef:false */
var nock = require('nock'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

describe('eliq', function () {
  describe('#getNow', function () {

    afterEach(function () {
      nock.cleanAll();
    });

    it('fetches createddate and power', function (done) {
      nock('https://my.eliq.io')
        .get('/api/datanow?accesstoken=fake')
        .reply(200, {createddate: '2015-03-10T05:38:20', power: 1285});
      var eliq = require('../lib/eliq')({eliqAccesstoken: 'fake'});
      expect(eliq.getNow()).to.eventually.deep.equal({createddate: '2015-03-10T05:38:20', power: 1285}).notify(done);
    });
    describe('#getFromTo', function () {
      it('fetches avgpower and energy', function (done) {
        var result = {
          startdate: '2015-03-02T20:00:00+00:00',
          enddate: '2015-03-02T23:00:00+00:00',
          intervaltype: '6min',
          data: [{
            avgpower: 2790,
            energy: 279,
            temp_out: null,
            time_start: '2015-03-02T20:00:00',
            time_end: '2015-03-02T20:06:00'
          }]
        };
        nock('https://my.eliq.io')
          .get('/api/data?accesstoken=fake&startdate=2015-03-02T20:00:00.000&enddate=2015-03-02T23:00:00.000&intervaltype=6min')
          .reply(200, result);
        var eliq = require('../lib/eliq')({eliqAccesstoken: 'fake'});
        expect(eliq.getFromTo(new Date('2015-03-02T20:00:00+00:00'), new Date('2015-03-02T23:00:00+00:00'), '6min'))
          .to.eventually.deep.equal(result).notify(done);
      });
      it('throws an error when server is down', function (done) {
        nock('https://my.eliq.io')
          .get('/api/data?accesstoken=fake&startdate=2015-03-02T20:00:00.000Z&enddate=2015-03-02T23:00:00.000Z&intervaltype=6min')
          .reply(503, {});
        var eliq = require('../lib/eliq')({eliqAccesstoken: 'fake'});
        expect(eliq.getFromTo(new Date('2015-03-02T20:00:00+00:00'), new Date('2015-03-02T23:00:00+00:00'), '6min')).to.eventually.be.rejected.and.notify(done);
      });
    });
  });
});

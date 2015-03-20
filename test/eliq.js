/*jshint undef:false */
var nock = require('nock'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('eliq', function () {
    describe('#getNow', function () {
        it('fetches createddate and power', function (done) {
            var scope = nock('https://my.eliq.se')
                .get('/api/datanow?accesstoken=fake')
                .reply(200, {createddate: '2015-03-10T05:38:20', power: 1285});
            var eliq = require('../lib/eliq')({eliqAccesstoken: 'fake'});
            eliq.getNow().then(function (result) {
                expect(result.createddate).to.equal('2015-03-10T05:38:20');
                expect(result.power).to.equal(1285);
                scope.done();
                done();
            }).catch(function (reason) {
                done(reason);
            }).finally(function () {
                nock.cleanAll();
            });
        });
        describe('#getFromTo', function () {
            it('fetches avgpower and energy', function (done) {
                var scope = nock('https://my.eliq.se')
                    .get('/api/data?accesstoken=fake&startdate=2015-03-02T20:00:00.000Z&enddate=2015-03-02T23:00:00.000Z&intervaltype=6min')
                    .reply(200, {
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
                    });
                var eliq = require('../lib/eliq')({eliqAccesstoken: 'fake'});
                eliq.getFromTo(new Date('2015-03-02T20:00:00+00:00'), new Date('2015-03-02T23:00:00+00:00'), '6min').then(function (result) {
                    expect(result.startdate).to.equal('2015-03-02T20:00:00+00:00');
                    expect(result.enddate).to.equal('2015-03-02T23:00:00+00:00');
                    expect(result.intervaltype).to.equal('6min');
                    scope.done();
                    done();
                }).catch(function (reason) {
                    done(reason);
                }).finally(function () {
                    nock.cleanAll();
                });
            });
            it('throws an error when server is down', function (done) {
                var scope = nock('https://my.eliq.se')
                    .get('/api/data?accesstoken=fake&startdate=2015-03-02T20:00:00.000Z&enddate=2015-03-02T23:00:00.000Z&intervaltype=6min')
                    .reply(503, {});
                var eliq = require('../lib/eliq')({eliqAccesstoken: 'fake'});
                eliq.getFromTo(new Date('2015-03-02T20:00:00+00:00'), new Date('2015-03-02T23:00:00+00:00'), '6min').then(function () {
                    done('we should never get here');
                }).catch(function (reason) {
                    expect(reason).to.be.an.instanceof(Error);
                    scope.done();
                    done();
                }).finally(function () {
                    nock.cleanAll();
                });
            });
        });
    });
});
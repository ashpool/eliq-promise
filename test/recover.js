/*jshint undef:false */
/*jshint unused:false */
var fs = require('fs'),
    _ = require('lodash'),
    RSVP = require('rsvp'),
    nock = require('nock'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

function file2Array (file) {
    return _.compact(fs.readFileSync(file).toString().split('\n'));
}

describe('recover', function () {
    var file = '/tmp/test-eliq.recover',
        recover = require('../lib/recover')({recoveryFile: file}),
        url = 'https://fuu.bar.com';

    beforeEach(function () {
        fs.closeSync(fs.openSync(file, 'w'));
    });

    afterEach(function (done) {
        if (!fs.existsSync(file)) {
            done();
            return;
        }
        fs.unlink(file, function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });

    describe('#log', function () {
        it('writes url to file', function (done) {
            recover.log(url).then(function () {
                var array = file2Array(file);
                expect(array.length).to.equal(1);
                expect(array[0]).to.equal(url);
                done();
            }).catch(function (reason) {
                done(reason);
            });
        });
        it('writes urls to file', function (done) {
            RSVP.allSettled([url + 'a', url + 'b', url + 'c', url + 'd'].map(recover.log)).then(function () {
                var array = file2Array(file);
                expect(array.length).to.equal(4);
                expect(array).to.contain(url + 'a');
                done();
            }).catch(function (reason) {
                done(reason);
            });
        });
        it('writes url to file only once', function (done) {
            recover.log(url).then(function () {
                recover.log(url).then(function () {
                    var array = file2Array(file);
                    expect(array.length).to.equal(1);
                    expect(array[0]).to.equal(url);
                    done();
                }).catch(function (reason) {
                    done(reason);
                });
            }).catch(function (reason) {
                done(reason);
            });
        });
    });

    describe('#restore', function () {
        it('returns happily if there is no log', function (done) {
            function fetch () {
            }

            function log () {
            }

            require('../lib/recover')({recoveryFile: './nonexistingfile'}).restore(fetch, log).then(function () {
                done();
            }).catch(function (reason) {
                done(reason);
            });
        });
        it('calls fetch and log', function (done) {
            var fetchCalled = false,
                logCalled = false;

            function fetch () {
                return new RSVP.Promise(function (resolve) {
                    fetchCalled = true;
                    resolve();
                });
            }

            function log () {
                return new RSVP.Promise(function (resolve) {
                    logCalled = true;
                    resolve();
                });
            }

            recover.log(url).then(function () {
                recover.restore(fetch, log).should.be.fulfilled().notify(done);
                console.log('FUUUU');
/*                fetch.should.be.fulfilled();
                log.should.be.fulfilled();*/
            });
        });
    });
});

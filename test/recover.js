/*jshint undef:false */
/*jshint unused:false */
var fs = require('fs'),
    _ = require('lodash'),
    RSVP = require('rsvp'),
    nock = require('nock'),
    chai = require('chai'),
    expect = chai.expect;


function file2Array (file) {
    return _.compact(fs.readFileSync(file).toString().split('\n'));
}

describe('recover', function () {
    var file = '/tmp/test-eliq.recover',
        recover = require('../lib/recover')({recoveryFile: file});

    describe('#log', function () {
        var url = 'https://fuu.bar.com';

        beforeEach(function () {
            fs.closeSync(fs.openSync(file, 'w'));
        });

        afterEach(function (done) {
            fs.unlink(file, function (err) {
                if (err) {
                    throw err;
                }
                done();
            });
        });

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
});

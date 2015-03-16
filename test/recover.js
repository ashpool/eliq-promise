/*jshint undef:false */
var nock = require('nock'),
    chai = require('chai'),
    expect = chai.expect;

describe('recover', function () {
    var recover = require('../lib/recover')({file: '/tmp/eliq.recover'});
    describe('#log', function () {
        it('writes url to file', function(done) {
            var url = "https://fuu.bar.com";
            recover.log(url);



            done();
        });
    });
});

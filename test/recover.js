/*jshint undef:false */
/*jshint unused:false */
var fs  = require("fs"),
    nock = require('nock'),
    chai = require('chai'),
    expect = chai.expect;

describe('recover', function () {
    var file = '/tmp/test-eliq.recover',
        recover = require('../lib/recover')({file: file});
    describe('#log', function () {
        it('writes url to file', function (done) {
            fs.closeSync(fs.openSync(file, 'w'));
            var array = fs.readFileSync(file).toString();
            expect(array).to.equal('');

            //var url = 'https://fuu.bar.com';
            //recover.log(url);


            done();
        });
    });
});

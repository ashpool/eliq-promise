var fs = require('fs'),
    readline = require('readline'),
    RSVP = require('rsvp');

module.exports = function (config) {
    var file = config.recoveryFile || '/tmp/recovery.eliq';

    function _append (url) {
        return new RSVP.Promise(function (resolve, reject) {
            fs.appendFile(file, url + '\n', function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    function _exists (url) {
        return new RSVP.Promise(function (resolve, reject) {
            var rs = fs.createReadStream(file),
                rl = readline.createInterface({
                    input: rs,
                    output: process.stdout
                });

            rs.on('error', function (err) {
                reject(err);
            }).on('end', function () {
                resolve(false);
            });

            rl.on('line', function (line) {
                if (line.indexOf(url) >= 0) {
                    resolve(true);
                }
            });
        });
    }

    function log (url) {
        return _exists(url).then(function (exists) {
            if (!exists) {
                return _append(url);
            }
            return RSVP.defer().resolve();
        });
    }

    /**
     * restore renames the recovery file, fetches each url, and logs the result.
     *
     * @param fetch Function that "fetches" the url
     * @param log Function that "logs" the result
     * @returns {RSVP.Promise}
     */
    function restore (fetch, log) {
        return new RSVP.Promise(function (resolve, reject) {
            if (!fs.existsSync(file)) {
                return resolve();
            }
            var tempFile = file + 'tmp';
            fs.renameSync(file, tempFile);
            var rs = fs.createReadStream(tempFile),
                rl = readline.createInterface({
                    input: rs,
                    output: process.stdout
                });

            rs.on('error', function (err) {
                reject(err);
            }).on('end', function () {
                fs.unlink(tempFile, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });

            rl.on('line', function (url) {
                fetch(url).then(log).catch(reject);
            });
        });
    }

    return {
        log: log,
        restore: restore
    };
};
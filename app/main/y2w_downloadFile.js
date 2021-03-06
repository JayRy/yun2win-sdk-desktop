const electron = require('electron');
const app = electron.app;
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const request = require('request');

var download = function (url, dest, cb, key) {
    var fileName = path.basename(dest);
    var cachePath = getCachePath(key || encodeURIComponent(url), fileName);

    // 如果目录下已经有了
    if (fs.existsSync(dest)) {
        if (cb) {
            cb();
        }
        return;
    }

    var file = fs.createWriteStream(cachePath);
    var sendReq = request.get(url);

    sendReq.on('response', function (response) {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });

    sendReq.on('error', function (err) {
        fs.unlink(cachePath);

        if (cb) {
            return cb(err.message);
        }
    });

    sendReq.pipe(file);

    file.on('finish', function () {
        file.close(function () {
            fse.copy(cachePath, dest, cb);
        });
    });

    file.on('error', function (err) {
        fs.unlink(cachePath);

        if (cb) {
            return cb(err.message);
        }
    });
};

function getCachePath(key, name) {
    var cachePath = path.join(app.getPath('temp'), app.getName(), key);
    if (!fs.existsSync(cachePath)) {
        fse.mkdirsSync(cachePath);
    }
    return path.join(cachePath, name);
}

module.exports = download;
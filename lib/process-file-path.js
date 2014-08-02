(function () {
    'use strict';

    var utils = require('./utils.js'),
        path = require('path'),
        rename = require('rename'),
        colorTrans = utils.colorTrans,
        getDisplayPath = utils.getDisplayPath;

    module.exports = function (filePath, opts) {
        opts = opts || {};

        var display = opts.display || 'rel',
            beforeEach = opts.beforeEach,
            afterEach = opts.afterEach,
            prefix = opts.prefix,
            suffix = opts.suffix,
            extname = opts.extname,
            basename = opts.basename,
            renameConfig = {},
            filePathToProcess = [],
            oldBasename,
            newBasename;

        filePathToProcess.push(colorTrans(getDisplayPath(filePath, display), 'gray'));

        // Basename

        oldBasename = path.basename(filePath);

        if (prefix) {
            renameConfig.prefix = colorTrans(prefix, 'magenta');
        }

        if (suffix) {
            renameConfig.suffix = colorTrans(suffix, 'magenta');
        }

        if (extname) {
            renameConfig.extname = colorTrans(extname, 'magenta');
        }

        if (basename) {
            renameConfig.basename = colorTrans(basename, 'magenta');
        }

        if (Object.keys(renameConfig).length) {
            newBasename = colorTrans(path.basename(rename(filePath, renameConfig)), 'gray');
        } else {
            newBasename = colorTrans(oldBasename, 'gray');
        }

        filePathToProcess.push(newBasename);

        filePathToProcess = filePathToProcess.join('');

        if (beforeEach) {
            filePathToProcess = colorTrans(beforeEach, 'yellow') + filePathToProcess;
        }

        if (afterEach) {
            filePathToProcess = filePathToProcess + colorTrans(afterEach, 'yellow');
        }

        console.log(filePathToProcess);
    };
}());

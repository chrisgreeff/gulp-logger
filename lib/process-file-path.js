(function () {
    'use strict';

    var utils = require('./utils.js'),
        path = require('path'),
        rename = require('rename'),
        colorTrans = utils.colorTrans;

    module.exports = function (filePath, opts) {
        var display = opts.display || 'rel',
            beforeEach = opts.beforeEach,
            afterEach = opts.afterEach,
            prefix = opts.prefix,
            suffix = opts.suffix,
            extname = opts.extname,
            basename = opts.basename,
            renameConfig = {},
            filePathToProcess = [],
            newPath,
            oldBasename,
            newBasename;

        // Path
        switch (display) {
            case 'name':
                newPath = '';
                break;
            case 'abs':
                newPath = path.dirname(filePath) + '/';
                break;
            case 'rel':
            default:
                newPath = path.dirname(utils.getRelativePath(filePath)) + '/';
                break;
        }

        filePathToProcess.push(colorTrans(newPath, 'gray'));

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

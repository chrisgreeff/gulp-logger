/*globals module, require */
(function() {
    'use strict';

    var path = require('path'),
        through = require('through2'),
        chalk = require('chalk'),
        utils = require('./lib/utils.js'),
        rename = require('rename'),

        beforeComplete = false,
        colorsEnabled = true,

        GulpLogger;

    GulpLogger = function(fnOpts, opts) {

        function colorTrans(message, color) {
            if (colorsEnabled) {
                return chalk[color](message);
            } else {
                return message;
            }
        };

        function processOptions(filePath) {
            var display = fnOpts.display || 'rel',
                before = fnOpts.before,
                beforeEach = fnOpts.beforeEach,
                afterEach = fnOpts.afterEach,
                prefix = fnOpts.prefix,
                suffix = fnOpts.suffix,
                extname = fnOpts.extname,
                basename = fnOpts.basename,
                colors = fnOpts.colors,
                renameConfig = {},
                filePathToProcess = [],
                newPath,
                oldBasename,
                newBasename;

            if (typeof colors !== 'undefined') {
                colorsEnabled = colors;
            }

            if (before && !beforeComplete) {
                console.log(colorTrans(before, 'cyan'));
                beforeComplete = true;
            }

            // Path
            switch (display) {
                case 'name':
                    newPath = '';
                    break;
                case 'abs':
                    newPath = path.dirname(filePath) + '/';
                    break;
                case 'rel':
                    newPath = path.dirname(utils.getRelativePath(filePath)) + '/';
                    break;;
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
        }

        function loggerEndHandler(flushCallback) {
            if (typeof fnOpts === 'object' && fnOpts.after) {
                console.log(colorTrans(fnOpts.after, 'cyan'));
            }

            flushCallback();
        }

        return through.obj(function(file, ext, streamCallback) {
            var filePath = file.path;

            if (typeof fnOpts === 'function') {
                // @todo Implement later.
                // processFnOptions({
                //     fn: fnOpts,
                //     opts: opts,
                //     filePath: filePath
                // });
            } else if (typeof fnOpts === 'object') {
                processOptions(filePath);
            } else {
                console.log(utils.getRelativePath(filePath));
            }

            streamCallback(null, file);
        }, loggerEndHandler);
    };

    module.exports = GulpLogger;

}());

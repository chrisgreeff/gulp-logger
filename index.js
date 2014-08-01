/*globals module, require */
(function() {
    'use strict';

    var path = require('path'),
        through = require('through2'),
        chalk = require('chalk'),
        utils = require('./lib/utils.js'),

        beforeComplete = false,

        GulpLogger;

    GulpLogger = function(fnOpts, opts) {

        function processOptions(filePath) {
            var display = fnOpts.display || 'rel',
                before = fnOpts.before,
                beforeEach = fnOpts.beforeEach,
                afterEach = fnOpts.afterEach,
                prefix = fnOpts.prefix,
                suffix = fnOpts.suffix,
                filePathToProcess;

            filePathToProcess = filePath;

            if (before && !beforeComplete) {
                console.log(before);
                beforeComplete = true;
            }

            if (afterEach) {
                filePathToProcess = filePathToProcess + afterEach;
            }

            if (prefix) {
                filePathToProcess = utils.addPrefix({
                    filePath: filePathToProcess,
                    prefix: prefix
                });
            }

            if (suffix) {
                filePathToProcess = utils.addSuffix({
                    filePath: filePath,
                    filePathToProcess: filePathToProcess,
                    suffix: suffix
                });
            }

            switch (display) {
                case 'abs':
                    break;
                case 'name':
                    filePathToProcess = path.basename(filePathToProcess);
                    break;
                case 'rel':
                default:
                    filePathToProcess = utils.getRelativePath(filePathToProcess);
                    break;
            }

            if (beforeEach) {
                filePathToProcess = beforeEach + filePathToProcess;
            }

            console.log(filePathToProcess);
        }

        function loggerEndHandler(flushCallback) {
            if (typeof fnOpts === 'object' && fnOpts.after) {
                console.log(fnOpts.after);
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

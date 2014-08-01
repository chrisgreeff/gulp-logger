/*globals module, require */
(function() {
    'use strict';

    var path = require('path'),
        through = require('through2'),
        chalk = require('chalk'),
        utils = require('./lib/utils.js'),
        rename = require('rename'),

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
                extname = fnOpts.extname,
                basename = fnOpts.basename,
                renameConfig = {},
                filePathToProcess = [],
                newPath,
                oldBasename,
                newBasename;

            if (before && !beforeComplete) {
                console.log(chalk.cyan(before));
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

            filePathToProcess.push(chalk.gray(newPath));

            // Basename

            oldBasename = path.basename(filePath);

            if (prefix) {
                renameConfig.prefix = chalk.magenta(prefix);
            }

            if (suffix) {
                renameConfig.suffix = chalk.magenta(suffix);
            }

            if (extname) {
                renameConfig.extname = chalk.magenta(extname);
            }

            if (basename) {
                renameConfig.basename = chalk.magenta(basename);
            }

            if (Object.keys(renameConfig).length) {
                newBasename = chalk.gray(path.basename(rename(filePath, renameConfig)));
            } else {
                newBasename = chalk.gray(oldBasename);
            }

            filePathToProcess.push(newBasename);

            filePathToProcess = filePathToProcess.join('');

            if (beforeEach) {
                filePathToProcess = chalk.yellow(beforeEach) + filePathToProcess;
            }

            if (afterEach) {
                filePathToProcess = filePathToProcess + chalk.yellow(afterEach);
            }

            console.log(filePathToProcess);
        }

        function loggerEndHandler(flushCallback) {
            if (typeof fnOpts === 'object' && fnOpts.after) {
                console.log(chalk.cyan(fnOpts.after));
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

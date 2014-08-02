/*globals module, require */
(function() {
    'use strict';

    var path = require('path'),
        through = require('through2'),
        chalk = require('chalk'),
        utils = require('./lib/utils.js'),
        colorTrans = utils.colorTrans,
        processFilePath = require('./lib/process-file-path.js'),

        beforeComplete = false,
        colorsEnabled = true,

        GulpLogger;

    GulpLogger = function(fnOpts, opts) {

        if (typeof fnOpts === 'object' && typeof fnOpts.colors !== 'undefined') {
            utils.colorsEnabled = fnOpts.colors;
        }

        if (typeof fnOpts === 'object' && fnOpts.before && !beforeComplete) {
            console.log(colorTrans(fnOpts.before, 'cyan'));
            beforeComplete = true;
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
                processFilePath(filePath, fnOpts);
            } else {
                console.log(utils.getRelativePath(filePath));
            }

            streamCallback(null, file);
        }, loggerEndHandler);
    };

    module.exports = GulpLogger;

}());

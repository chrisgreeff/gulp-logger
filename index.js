/*globals module, require */
(function() {
    'use strict';

    var through = require('through2'),
        utils = require('./lib/utils.js'),
        colorTrans = utils.colorTrans,
        processFilePath = require('./lib/process-file-path.js'),
        processFunction = require('./lib/process-function.js'),

        GulpLogger;

    GulpLogger = function(fnOpts, opts) {
        var options = typeof fnOpts === 'object' ? fnOpts : opts;

        if (options) {
            utils.colorsEnabled = typeof options.colors !== 'undefined' ? options.colors : true;

            if (options.before) {
                console.log(colorTrans(options.before, 'cyan'));
            }
        }

        function loggerEndHandler(flushCallback) {
            if (options && options.after) {
                console.log(colorTrans(options.after, 'cyan'));
            }

            flushCallback();
        }

        return through.obj(function(file, ext, streamCallback) {
            var filePath = file.path;

            if (typeof fnOpts === 'function') {
                processFunction(filePath, fnOpts, opts);
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

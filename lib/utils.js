(function() {
    'use strict';

    var path = require('path'),
        chalk = require('chalk');

    module.exports = {
        getRelativePath: function(filePath) {
            return path.relative(process.cwd(), filePath);
        },

        addPrefix: function (opts) {
            var filePath = opts.filePath,
                prefix = opts.prefix,
                basename = path.basename(filePath);

            return filePath.substring(0, filePath.lastIndexOf('/') + 1) + prefix + basename;
        },

        addSuffix: function (opts) {
            var filePath = opts.filePath,
                suffix = opts.suffix,
                basename = path.basename(filePath);

            return filePath.substring(0, filePath.lastIndexOf('/') + 1) + basename + suffix;
        }
    };
}());

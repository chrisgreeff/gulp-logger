(function() {
    'use strict';

    var path = require('path'),
        chalk = require('chalk');

    module.exports = {
        getRelativePath: function(filePath) {
            return path.relative(process.cwd(), filePath);
        }
    };
}());

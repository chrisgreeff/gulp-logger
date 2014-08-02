(function() {
    'use strict';

    var path = require('path'),
        chalk = require('chalk'),

        Utils;

    Utils = {
        getRelativePath: function(filePath) {
            return path.relative(process.cwd(), filePath);
        },

        colorsEnabled: true,

        colorTrans: function (message, color) {
            if (Utils.colorsEnabled) {
                return chalk[color](message);
            } else {
                return message;
            }
        },

        getDisplayPath: function (filePath, display) {
            var newPath;

            switch (display) {
                case 'name':
                    newPath = '';
                    break;
                case 'abs':
                    newPath = path.dirname(filePath) + '/';
                    break;
                case 'rel':
                default:
                    newPath = path.dirname(Utils.getRelativePath(filePath)) + '/';
                    break;
            }

            return newPath;
        }
    };

    module.exports = Utils;
}());

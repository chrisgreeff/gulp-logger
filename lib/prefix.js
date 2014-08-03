(function() {
    'use strict';

    var test = require('colored-tape'),
        gulp = require('gulp'),
        logger = require('../index.js'),
        runOptionsTest = require('./common.js').runOptionsTest;

    test('prefix', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger({
                prefix: 'prefixTest!'
            })).on('data', function () {}).on('end', function () { t.equals(true, true); });
    });
}());

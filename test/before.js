(function() {
    'use strict';

    var test = require('colored-tape'),
        gulp = require('gulp'),
        logger = require('../index.js'),
        FILES_TO_STREAM = 'test/files-to-stream/**/*.js';

    test('before', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger({
                before: 'beforeTest!'
            })).on('data', function () {}).on('end', function () { t.equals(true, true); });
    });
}());
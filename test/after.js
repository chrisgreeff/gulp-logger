(function() {
    'use strict';

    var test = require('colored-tape'),
        gulp = require('gulp'),
        logger = require('../index.js'),
        FILES_TO_STREAM = 'test/files-to-stream/**/*.js';

    test('after', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger({
                after: 'afterTest!'
            })).on('data', function () {}).on('end', function () {t.equals(true, true);});
    });
}());
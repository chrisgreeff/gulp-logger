(function() {
    'use strict';

    var test = require('colored-tape'),
        gulp = require('gulp'),
        logger = require('../index.js'),
        FILES_TO_STREAM = 'test/files-to-stream/**/*.js';

    test('display:default', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger({}))
            .on('data', function () {}).on('end', function () { t.equals(true, true); });
    });

    test('display:relative', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger({
                display: 'rel'
            }))
            .on('data', function () {}).on('end', function () { t.equals(true, true); });
    });

    test('display:absolute', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger({
                display: 'abs'
            }))
            .on('data', function () {}).on('end', function () { t.equals(true, true); });
    });

    test('display:filename', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger({
                display: 'name'
            }))
            .on('data', function () {}).on('end', function () { t.equals(true, true); });
    });
}());

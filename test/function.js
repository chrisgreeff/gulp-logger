(function() {
    'use strict';

    var test = require('colored-tape'),
        gulp = require('gulp'),
        logger = require('../index.js'),
        FILES_TO_STREAM = 'test/files-to-stream/**/*.js';

    test('function:default', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger(function (filePath) {
                console.log(filePath);
            })).on('data', function () {}).on('end', function () { t.equals(true, true); });
    });

    test('function:relative', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger(function (filePath) {
                console.log(filePath);
            }, {
                display: 'rel'
            })).on('data', function () {}).on('end', function () { t.equals(true, true); });
    });

    test('function:absolute', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger(function (filePath) {
                console.log(filePath);
            }, {
                display: 'abs'
            })).on('data', function () {}).on('end', function () { t.equals(true, true); });
    });

    test('function:filename', function (t) {
        t.plan(1);

        gulp.src(FILES_TO_STREAM)
            .pipe(logger(function (filePath) {
                console.log(filePath);
            }, {
                display: 'name'
            })).on('data', function () {}).on('end', function () { t.equals(true, true); });
    });
}());

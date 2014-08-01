(function() {
    var test = require('colored-tape'),
        gulp = require('gulp'),
        logger = require('../../index.js');

    test('before', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                before: 'beforeTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('after', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                after: 'afterTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('beforeEach', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                beforeEach: 'beforeEachTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('afterEach', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                afterEach: 'afterEachTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('prefix', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                prefix: 'prefixTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('suffix', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                suffix: 'suffixTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('extname', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                extname: '.extnameTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('basename', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                basename: 'basenameTest!'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });


    test('display:default', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({}))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('display:relative', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                display: 'rel'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('display:absolute', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                display: 'abs'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('display:filename', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                display: 'name'
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

    test('colors disabled', function (t) {
        t.plan(1);

        gulp.src('test/gulp-logger/files-to-stream/**/*.js')
            .pipe(logger({
                colors: false
            }))
            .on('data', function () {})
            .on('end', function () {
                t.equals(true, true);
            });
    });

}());

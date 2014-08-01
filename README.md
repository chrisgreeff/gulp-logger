gulp-logger
===========

Logger plugin for [gulp](http://gulpjs.com/) for logging stream stages, transformations and progress.

# Install

```bash
$ npm install gulp-logger --save
```

# Basic Usage

Something like this:

```js
var gulp = require('gulp'),
    gzip = require('gulp-gzip'),
    logger = require('gulp-logger');

gulp.task('gzip', function () {
    gulp.src('./js/**/*.js')
        .pipe(logger({
            before: 'Starting Gzip...',
            after: 'Gzipping complete!',
            suffix: '.gz'
        }))
        .pipe(gzip());
});
```

# Options

#### `before` *String*
The message you want to show before the chunks are shown.

#### `after` *String*
The message you want to show after the chunks are shown.

#### `beforeEach` *String*
The message you want to show before each chunk.

#### `afterEach` *String*
The message you want to show after each chunk.

#### `prefix` *String*
A constant value to prefix to each filename in the chunk.

#### `suffix` *String*
A constant value to suffix to each filename in the chunk.

#### `extname` *String*
A constant value to set as the extension for each filename in the chunk.

#### `basename` *String*
A constant value to set as the basename for each filename in the chunk.

#### `colors=true` *Boolean*
Whether or not to turn off colors on the output.

#### `display='rel'` *String*

How you want the path of the chunk to show.
- `'rel'`: Relative path
- `'abs'`: Absolute path
- `'name'`: Filename

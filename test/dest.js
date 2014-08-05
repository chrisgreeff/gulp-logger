(function() {
    'use strict';

    var test = require('colored-tape'),
        runOptionsTest = require('./common.js').runOptionsTest;

    test('dest:relative', function(t) {
        runOptionsTest(t, {
            dest: 'new/location'
        });
    });

    test('dest:absolute', function(t) {
        runOptionsTest(t, {
            display: 'abs',
            dest: 'new/location'
        });
    });

    test('dest:filename', function(t) {
        runOptionsTest(t, {
            display: 'name',
            dest: 'new/location'
        });
    });
}());

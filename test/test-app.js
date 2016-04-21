'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

var checkFiles = function () {
  it('creates files', function () {
    assert.file([
      '.gitignore',
      'LICENSE',
      'README.md',
      'config/default.js',
      'gulpfile.js',
      'package.json',
      'particles/assets',
      'particles/conditions',
      'particles/cftemplates',
      'particles/helpers',
      'particles/mappings',
      'particles/metadata',
      'particles/outputs',
      'particles/parameters',
      'particles/resources',
      'particles/sets',
      'particles/partials'
    ]);
  });
};

describe('condensation:project', function () {
  describe('with prompt', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/project'))
        .withPrompts({ projectName: 'test' })
        .on('end', done);
    });
    checkFiles();
  });

  describe('with argument', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/project'))
        .withArguments('test')
        .on('end', done);
    });
    checkFiles();
  });

});

'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('condensation:particles', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/particles'))
      .withOptions({ skipInstall: true })
      .withPrompts({ projectName: 'test' })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      'LICENSE',
      'README.md',
      'config/default.js',
      'gulpfile.js',
      'package.json'
    ]);
  });
});

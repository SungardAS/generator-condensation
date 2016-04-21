'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var npmName = require('npm-name');
var yosay = require('yosay');
var _s = require('underscore.string');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('projectName', {type: String, required: false});
  },
  prompting: {

    askForProjectName: function () {
      var done = this.async();

      if (this.projectName) {
        return done();
      }

      var prompts = [{
        name: 'projectName',
        message: 'What\'s the name of your project?'
      }];

      this.prompt(prompts, function (props) {
        if (props.askNameAgain) {
          return this.prompting.askForProjectName.call(this);
        }

        this.projectName = props.projectName;
        //this.appname = _s.slugify('project-' + this.projectName);

        done();
      }.bind(this));
    }
  },
  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath(this.projectName,'package.json'),
        {projectName: this.projectName}
      );
    },

    projectFiles: function () {
      mkdirp.sync(this.destinationPath(this.projectName,'particles','assets'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','conditions'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','cftemplates'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','helpers'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','mappings'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','metadata'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','outputs'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','parameters'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','resources'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','sets'));
      mkdirp.sync(this.destinationPath(this.projectName,'particles','partials'));

      this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath(this.projectName,'README.md'),
        {projectName: this.projectName}
      );
      this.fs.copyTpl(
        this.templatePath('_changelog.md'),
        this.destinationPath(this.projectName,'CHANGELOG.md'),
        {projectName: this.projectName}
      );
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath(this.projectName,'gulpfile.js'),
        {projectName: this.projectName}
      );
      this.fs.copyTpl(
        this.templatePath('_default_config.js'),
        this.destinationPath(this.projectName,'config/default.js'),
        {projectName: this.projectName}
      );
      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath(this.projectName,'.gitignore'),
        {projectName: this.projectName}
      );
      this.fs.copyTpl(
        this.templatePath('_LICENSE'),
        this.destinationPath(this.projectName,'LICENSE')
      );
    }
  },

  install: function () {
    var origDir = process.cwd();
    var npmdir = path.join(process.cwd(),this.projectName) ;
    process.chdir(npmdir);
    this.installDependencies();
  }
});

'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var npmName = require('npm-name');
var yosay = require('yosay');
var _s = require('underscore.string');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: {

    askForProjectName: function () {
      var done = this.async();

      var prompts = [{
        name: 'projectName',
        message: 'What\'s the name of your project?'
      }, {
        type: 'confirm',
        name: 'askNameAgain',
        message: 'The name above already exists on npm, choose another?',
        default: true,
        when: function (answers) {
          var done = this.async();
          var name = 'particles-' + answers.projectName;

          npmName(name, function (err, available) {
            if (!available) {
              done(true);
            }

            done(false);
          });
        }
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
      this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath(this.projectName,'README.md'),
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

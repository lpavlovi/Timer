module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['project/**/*.*', './project/*.*'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/*.js', 'app/services/*.js', 'app/timer/*.js'],
      options: {
        jshintrc: '.jshintrc',
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};

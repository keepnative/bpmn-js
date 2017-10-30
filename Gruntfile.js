'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      sources: 'lib',
      tests: 'test',
      dist: 'dist'
    },

    eslint: {
      check: {
        src: [
          '{lib,test}/**/*.js'
        ]
      },
      fix: {
        src: [
          '{lib,test}/**/*.js'
        ],
        options: {
          fix: true
        }
      }
    },

    release: {
      options: {
        tagName: 'v<%= version %>',
        commitMessage: 'chore(project): release v<%= version %>',
        tagMessage: 'chore(project): tag v<%= version %>'
      }
    },

    karma: {
      options: {
        configFile: '<%= config.tests %>/config/karma.unit.js'
      },
      single: {
        singleRun: true,
        autoWatch: false
      },
      unit: { },
      translations: {
        singleRun: true,
        autoWatch: false,

        reporters: [ 'dots', 'translation-reporter' ],

        plugins: [
          'karma-*',
          require('./test/config/translation-reporter')
        ],

        envPreprocessor: [
          'TRANSLATIONS'
        ]
      }
    },

    copy: {
      bpmn_js: {
        files: [
          { expand: true, cwd: 'assets', src: [ '**' ], dest: '<%= config.dist %>/assets' }
        ]
      },

      diagram_js: {
        files: [
          { expand: true, cwd: 'node_modules/diagram-js/assets', src: [ '**' ], dest: '<%= config.dist %>/assets' }
        ]
      }
    }
  });


  // tasks
  grunt.registerTask('extract-translations', [ 'karma:translations' ]);

  grunt.registerTask('test', [ 'karma:single' ]);

  grunt.registerTask('lint', [ 'eslint:check' ]);

  grunt.registerTask('auto-test', [ 'karma:unit' ]);

  grunt.registerTask('build', [ 'copy' ]);

  grunt.registerTask('default', [ 'lint', 'test', 'build' ]);
};

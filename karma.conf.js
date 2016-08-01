// Karma configuration
// Generated on Tue Jul 26 2016 10:15:25 GMT+0800 (中国标准时间)
'use strict'

var argv = require('yargs').argv

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/sinon/pkg/sinon.js',
      {
        // pattern: 'tests/**/nd-grid.spec.js',
        pattern: 'tests/**/*.spec.js',
        watched: false,
        served: true,
        included: true
      }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/**/*.spec.js': ['webpack', 'sourcemap']
    },


    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        root: './',
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
      },
      module: {
        preLoaders: [{
          test: /\.js$/,
          loader: 'isparta',
          exclude: /node_modules|tests/
        }],
        loaders: [{
          test: /\.handlebars$/,
          loader: 'handlebars'
        }, {
          test: /\.gif$/,
          loader: 'url?limit=8192'
        }, {
          test: /\.html$/,
          loader: 'html'
        }]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !argv.watch,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // optionally, configure the reporter
    coverageReporter: {
      reporters: [
        { type: 'text-summary' },
        { type: 'lcov', dir: 'coverage' }
      ],
      check: {
        global: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50
        },
        each: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50
        }
      }
    }
  })
}

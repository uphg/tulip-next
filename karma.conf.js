// var webpackConfig = require('./webpack.common.js')
var webpackConfig = require('./webpack.dev.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: ['test/**/*.spec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec'],

    browsers: ['ChromeHeadless']
  })
}

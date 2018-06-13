'use strict'

const path    = require('path')
const babel   = require('rollup-plugin-babel')

const pkg     = require(path.resolve(__dirname, '../package.json'))

const fileDest  = 'technoart.js'
const external = ['jquery']
const plugins = [
  babel({
    exclude: 'node_modules/**', // Only transpile our source code
    externalHelpersWhitelist: [ // Include only required helpers
      'defineProperties',
      'createClass',
      'inheritsLoose',
      'defineProperty',
      'objectSpread'
    ]
  })
]
const globals = {
  jquery: 'jQuery' // Ensure we use jQuery which is always available even in noConflict mode
}

module.exports = {
  input: path.resolve(__dirname, '../src/js/index.js'),
  output: {
    banner: `/**
 * Technoart v${pkg.version} (${pkg.homepage})
 * Copyright 2018-present ${pkg.author}
 * Licensed under MIT (https://github.com/technoprodev/technoart/blob/master/LICENSE)
 */`,
    file: path.resolve(__dirname, `../dist/js/${fileDest}`),
    format: 'umd',
    globals,
    name: 'technoart'
  },
  external,
  plugins
}

'use strict';

var base = require('./webpack.config');

module.exports = Object.assign(base, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].polyfill.js',
    chunkFilename: '[name].chunk.polyfill.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: ['whatwg-fetch', 'fetch'],
      Promise: ['es6-promise', 'Promise'],
    }),
  ],
});

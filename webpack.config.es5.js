'use strict';

var base = require('./webpack.config');
var path = require('path');

module.exports = Object.assign(base, {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].es5.js',
    chunkFilename: '[name].chunk.es5.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.es5.json'
            }
          },
        ],
      },
    ],
  }
});

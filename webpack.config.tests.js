'use strict';

const base = require('./webpack.config');
const path = require('path');

module.exports = Object.assign(base, {});
module.exports.module.rules.push({
  test: /\.ts$/,
  enforce: 'post',
  include: [path.resolve('src/**.*.ts'), path.resolve('test/**.*.ts')],
  exclude: path.resolve('node_modules/'),
  loader: 'istanbul-instrumenter-loader',
  options: {
    esModules: true
  }
});

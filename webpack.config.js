var path = require('path');

module.exports = {
  mode: 'production',
  context: __dirname + '/src',
  entry: {
    index: [
      './plastic-bag.ts',
      './injectors/script/index.ts',
      './injectors/iframe/index.ts',
      './injectors/html-fragment/index.ts',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: './',
    inline: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.webpack.js', '.web.js'],
  },
};

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.base');

module.exports = merge(common, {
  mode: 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server.js')
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.js$/,
        exclude: [
          path.join(__dirname, '../node_modules')
        ],
        loader: 'babel-loader'
      }
    ]
  }
});

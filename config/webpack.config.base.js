const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
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
}

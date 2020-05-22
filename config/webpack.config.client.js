const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

const config = merge(common, {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
});

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public', // 删除dist目录
    historyApiFallback: {
      index: '/public/index.html'
    }
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;

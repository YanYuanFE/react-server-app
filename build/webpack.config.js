const path = require('path');

module.exports = {
	entry: {
		app: path.join(__dirname, '../client/index.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public'
	}
}
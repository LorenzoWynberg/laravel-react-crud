const path = require("path");

module.exports = {
	resolve: {
		extensions: ['js', 'ts', 'jsx', 'tsx'],
		alias: {
			'@': path.resolve(__dirname, 'resources/js'),
			'~': path.resolve(__dirname, 'resources/css'),
			'@routes': path.resolve(__dirname, 'resources/js/routes'),
			'@layouts': path.resolve(__dirname, 'resources/js/layouts'),
			'@pages': path.resolve(__dirname, 'resources/js/pages'),
			'@components': path.resolve(__dirname, 'resources/js/components'),
			'@services': path.resolve(__dirname, 'resources/js/services'),
		}
	}
}
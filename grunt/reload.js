'use strict';
module.exports = function(grunt) {
	grunt.config.set('reload', {
		reload: {
			port: 8080,
			proxy: {
				host: 'localhost',
			}
		}
	});
};
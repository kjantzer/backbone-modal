module.exports = function(grunt) {

	require('jit-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		less: {
			demo: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"style.css": "style.less"
				}
			}
		},
		
		uglify: {
			demo: {
				src: [
					'node_modules/jquery/dist/jquery.js',
					'node_modules/underscore/underscore.js',
					'node_modules/backbone/backbone.js',
					'lib/spin/spin.min.js',
					'lib/spin/jquery.spin.js',
					'src/Modal.js'
				],
				dest: 'demo-build.js'
			},
		},
			
		watch: {
			less: {
				files: ['src/**/*.less', 'lib/**/*.less', 'style.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			},
			js: {
				files: ['src/**/*.js'],
				tasks: ['uglify'],
				options: {
					nospawn: true
				}
			}
		}
	});

	grunt.registerTask('default', ['less', 'uglify']);
	grunt.registerTask('dev', ['watch']);
};
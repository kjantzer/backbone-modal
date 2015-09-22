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
			
		watch: {
			less: {
				files: ['src/**/*.less', 'lib/**/*.less', 'style.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		}
	});

	grunt.registerTask('default', ['less']);
	grunt.registerTask('dev', ['watch']);
};
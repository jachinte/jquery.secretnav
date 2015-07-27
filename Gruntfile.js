module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner:'/*!\n' +
                ' * <%= pkg.name %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.author.email %> | <%= pkg.author.url %>\n' +
                ' * Licensed under the MIT license.\n' +
                ' * <%= pkg.repository.url %>\n' +
                ' * @author <%= pkg.author.name %>\n' +
                ' * @version v<%= pkg.version %>\n' +
                ' */\n'
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/js/jquery.secretnav.js"],
				dest: "dist/js/jquery.secretnav.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/js/jquery.secretnav.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/js/jquery.secretnav.js"],
				dest: "dist/js/jquery.secretnav.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Sass files
		sass: {
			dist: {
		    	options: {
		        	style: 'expanded'
		      	},
		      	files: {
		      		// 'destination': 'source'
		        	'dist/css/jquery.secretnav.css': 'src/sass/jquery.secretnav.scss'
				}
			}
		},

		// watch for changes to source
		// (call 'grunt watch')
		watch: {
		    files: ['src/js/*', 'src/sass/*'],
		    tasks: ['default']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("build", ["concat", "uglify", "sass"]);
	grunt.registerTask("default", ["jshint", "build"]);
	grunt.registerTask("travis", ["default"]);

};

module.exports = function(grunt){

	grunt.initConfig({
		sass:{
			dist:{
				files:{
					'public/css/global.css':'resources/global/global.scss'
				}
			}		
		},
		uglify:{
			my_target:{
					options:{
						beautify: false
					},

					files:{
						'public/javascripts/assetTracker.min.js':['public/javascripts/*.js']
					}
		    },
		    my_advanced_target:{
		    		options:{
		    			beautify:{
		    				width: 80,
		    				beautify: true
		    		}
		    	},

		    		files:{
		    			'public/javascripts/assetTracker.js':['public/javascripts/*.js']
		    		}
		    }
		},
		watch:{
			files: ['resources/base/*.scss','resources/base/common/*.scss'],
			tasks: ['sass']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default',function(){
		grunt.log.write("Grunt Executed Task").ok();
	});
};
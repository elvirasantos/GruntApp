'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['tmp/*'],

    coffee: {
      files: {
        'scripts/js/all.compiled.js': ['scripts/coffee/*.coffee'] // compile and concat into a single file
      }
    },

    jshint:{
      options:{
        //force : true,
        // error codes
        // '-W069': false, 
        // '-W004': false,
        ignores: ['scripts/js/ignored.js'],
        reporterOutput : 'jshint.txt'
      },
      files:['scripts/js/all.compiled.js']
    },

    uglify: {
      development: {
        files: {
          'scripts/min/all.min.js': ['scripts/js/all.compiled.js']
        }
      },
      options: {
        mangle: false,
        compress: {
          drop_console: true
        },  
          //beautify: true,
        }
      }, 

      htmlhint: {
        templates: {
          options: {
            htmlhintrc: ".htmlhintrc"
          },
          src: ['templates/tmpl/*.html']
        }
      },      

      htmlmin: {    
        dev: {
          options: {
            removeEmptyAttributes: true,
            removeEmptyElements: true,                                   
            removeRedundantAttributes : true,
            removeComments : true,                         
            removeOptionalTags : true,
            collapseWhitespace: true,
          },                
          files: [{
            expand: true,
            cwd:    "templates/tmpl/",
            dest:  "templates/min/",
            src:    ["*.tmpl.html"],
            ext:    ".min.html",
            extDot: "last"
          }]  
        }
      },

      less: {
        development: {
          options: {
            cleancss: false,
            compress: false
              // ,    
              // modifyVars: {
              //  "text-color": "tc"
              // }
            },
            files: [ {
              expand: true,
              cwd:    "styles/less/",
              dest:  "styles/css/",
              src:    ["*.less"],
              ext:    ".css",
              extDot: "last"
            } ] 
          }
        },

        csslint: {
          strict: {
            options: {
            },
            src: ['styles/css/*.css']
          },
          laxed: {
            options: {
              csslintrc: ".csslintrc"
            },
            src: ['styles/css/*.css']
          }
        },  
        
        cssmin: {
          minify: {
            expand: true,
            cwd: 'styles/css/',
            src: ["*.css", "!*.min.css"],
            dest: 'styles/min/',
            ext: '.min.css',
            extDot: 'last'
          },
          concat: {
            options: {
            },
            files: {
              'styles/min/all.min.css': ['styles/css/*.css']
            }
          }
        }

      });

  // These plugins provide the necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['clean','coffee','jshint', 'uglify', 'htmlhint', 'htmlmin', 'less', 'csslint', 'cssmin']);

};

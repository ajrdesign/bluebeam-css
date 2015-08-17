module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 2. Our tasks and what they do 
        // Compiles all the JS into one file so we only have one http request
        /*concat: {   
            dist: {
                src: [
                    'docs/assets/js/*.js'
                ],
                dest: 'docs/assets/js/production/bluebeam-core.js',
            }
        },*/
        // CSS Preprocessing
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    // Output:Input (Yes backwards I know...)
                    'bluebeam-core.css': 'sass/core/core-import.scss'
                }
            } 
        },
        // Minimizing our whitespace to reduce the size of our files
        /*uglify: {
            dist: {
                files: {
                    // Output:Input
                    'assets/js/production/bluebeam-core.min.js': 'assets/js/production/bluebeam-core.js'
                }
            }
        },*/
        // Copy changed files from the sass folder into the Docs folders so they remain constantly up to date
        copy: {
          main: {
            files: [
              // includes files within path 
              {expand: true,
               cwd: 'sass/core/', 
               src: ['**/*'], 
               dest: 'docs/_sass/'}
            ],
          },
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    })
                ] 
            },
            dist: {
                src: '*.min.css'
            }
        },
        // Automatically run tasks when certain files are updated.
        watch: {
            /*scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },*/
            sass: {
                files: ['sass/core/*.scss',
                        'sass/core/basics/*.scss', 
                        'sass/core/atoms/*.scss',
                        'sass/core/organisms/*.scss',
                        'sass/core/molecules/*.scss'],
                tasks: ['sass', 'copy', 'postcss'],
                options: {
                    spawn: false,
                },
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [/*'concat',*/'sass', 'postcss', /*'uglify',*/ 'copy', 'watch']);

};
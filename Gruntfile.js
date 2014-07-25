module.exports = function(grunt) {

    grunt.initConfig({
        concat:{
            js:{
                src:['assets/js/**/*.js'],
                dest:'dist/built.js'
            },
            css:{
                src:['assets/css/**/*.css'],
                dest:'dist/built.css'
            }
        },
        watch:{
            options:{
                livereload:true
            },
            files:'*',
            tasks:['concat']
        },
        connect:{
            server:{
                options:{
                    port:8080,
                    hostname:'127.0.0.1'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat:js', 'concat:css', 'connect','watch']);
};

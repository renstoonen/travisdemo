module.exports = function(grunt)
{
    // Configuration.
    grunt.initConfig({

        // Import package information.
        package: grunt.file.readJSON('package.json'),

        // Merge includes to 'build/derived'.
        includes:
        {
            options:
            { includeRegexp: /(\s*)include\s*[(]\s*['"](\S+)['"]\s*[)]\s*;?\s*$/, },

            files:
            {
                src: ['Classes/**/*.js', 'Test/suite/**/*.js'],
                dest: 'build/derived',
            }
        },

        // Minifiy 'build/derived' results.
        uglify:
        {

            /**
             * eppz!js with all the goodies.
             */
            eppz_js :
            {
                options:
                { banner: '/* <%= package.name %> <%= package.version %> */\n' },

                files :
                {
                    'build/<%= package.name %>.min.js' :
                        [ 'build/derived/Classes/<%= package.name %>.js' ],

                    'build/<%= package.version %>/<%= package.name %>_<%= package.version %>.min.js' :
                        [ 'build/derived/Classes/<%= package.name %>.js' ],
                },
            },

            /**
             * eppz!js Objective-JavaScript class implementation.
             */
            eppz_js_class :
            {
                options:
                { banner: '/* <%= package.name %>!class <%= package.version %> */\n' },

                files :
                {
                    'build/<%= package.name %>!class.min.js' : [ 'build/derived/Classes/eppz!js/Class.js' ]
                },
            },

        },

        // Test.
        mocha:
        {
            test:
            {
                options:
                {
                    run: true,
                    debug: true,
                    reporter: 'Spec',
                },

                src: [ 'test.js' ]
            }
        },

        // Watch.
        watch:
        {
            // Build product.
            default:
            {
                files: ['Classes/**', 'Test/**'],
                tasks: ['includes', 'uglify', 'mocha'],
            },

            // Run tests only.
            test:
            {
                files: ['Test/**'],
                tasks: ['mocha'],
            }
        }

    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // `default` task for the everyday.
    grunt.registerTask('default', ['watch:default']);

    // `watch_test` task for watch tests only.
    grunt.registerTask('watch_test', ['watch:test']);

    // `build`, `test` task for Travis CI.
    grunt.registerTask('build', ['includes', 'uglify']);
    grunt.registerTask('test', ['mocha']);

};

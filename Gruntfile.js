module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'travisCIdemo.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');

};

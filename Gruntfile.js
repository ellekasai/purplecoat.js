module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    uglify: {
      options: {
        banner: '/*! purplecoat.js <%= pkg.version %> by Elle Kasai (MIT License).*/\n'
      },
      dist: {
        files: {
          'purplecoat.min.js': 'purplecoat.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};

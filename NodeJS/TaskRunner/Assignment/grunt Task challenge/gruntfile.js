module.exports = function (grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "public/css",
            src: ["*.css", "!*.min.css"],
            dest: "public/minified/",
            ext: ".min.css"
          }
        ]
      }
    },
    uglify: {
      target: {
        files: {
          'public/minified/minified.js': ['public/js/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin'); // Fixed typo in the task name
  grunt.loadNpmTasks('grunt-contrib-uglify'); // Fixed typo in the task name

  // Default task: minify CSS and JavaScript
  grunt.registerTask('default', ['cssmin', 'uglify']); // Fixed typo in the task names
};

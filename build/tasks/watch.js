var gulp;

gulp = require("gulp");

module.exports = function() {
  return gulp.task("watch", ["livereload:run", "copy:watch", "coffee:watch", "less:watch", "bundle:watch", "forever:run", "nodemon:run", "tests:watch"]);
};

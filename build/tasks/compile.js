var gulp;

gulp = require("gulp");

module.exports = function() {
  return gulp.task("compile", ["bundle:compile", "coffee:compile", "copy:compile", "documentation:compile", "less:compile"]);
};

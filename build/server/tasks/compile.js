var gulp, runSequence;

gulp = require("gulp");

runSequence = require("run-sequence");

module.exports = function() {
  return gulp.task("compile", function(cb) {
    runSequence(["clean:server"], ["bundle:compile", "coffee:compile", "copy:compile", "documentation:compile", "less:compile"], function() {
      cb();
      return process.exit();
    });
  });
};

var gulp, runSequence;

gulp = require("gulp");

runSequence = require("run-sequence");

module.exports = function() {
  return gulp.task("default", function(cb) {
    return runSequence(["clean:server"], ["bundle:vendor", "coffee:compile", "copy:compile", "documentation:compile", "less:compile"], ["livereload:run", "copy:watch", "less:watch", "coffee:watch", "bundle:watch", "forever:run", "nodemon:run", "tests:watch"], cb);
  });
};

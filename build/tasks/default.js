var gulp;

gulp = require("gulp");

gulp.task("default", ["clean"], function() {
  return gulp.start("watch");
});

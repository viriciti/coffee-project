var gulp;

gulp = require("gulp");

gulp.task("watch", ["copy:watch", "coffee:watch", "browserify:watch", "forever:run", "less:watch", "tests:watch"]);

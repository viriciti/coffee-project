var async, gulp;

async = require("async");

gulp = require("gulp");

gulp.task("compile", ["browserify:compile", "coffee:compile", "copy:compile", "documentation:compile", "less:compile"]);

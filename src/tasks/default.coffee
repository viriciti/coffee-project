gulp = require "gulp"

gulp.task "default", [ "clean" ], ->
	gulp.start "watch"

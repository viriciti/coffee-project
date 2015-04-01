gulp = require "gulp"

gulp.task "watch", [
	"copy:watch"
	"coffee:watch"
	"browserify:watch"
	"forever:run"
	"nodemon:run"
	"less:watch"
	"tests:watch"
]

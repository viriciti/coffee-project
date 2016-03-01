gulp        = require "gulp"
runSequence = require "run-sequence"

module.exports = ->
	gulp.task "default", (cb) ->
		runSequence [
			"clean:server"
		], [
			"bundle:vendor"
			"coffee:compile"
			"copy:compile"
			"documentation:compile"
			"less:compile"
		], [
			"livereload:run"
			"copy:watch"
			"less:watch"
			"coffee:watch"
			"bundle:watch"
			"forever:run"
			"nodemon:run"
			"tests:watch"
		], cb
gulp        = require "gulp"
runSequence = require "run-sequence"

module.exports = ->
	gulp.task "compile", (cb) ->
		runSequence [
			"clean:server"
		], [
			"bundle:compile"
			"coffee:compile"
			"copy:compile"
			"documentation:compile"
			"less:compile"
		], ->
			cb()

			process.exit()

		return
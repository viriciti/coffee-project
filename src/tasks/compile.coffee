gulp = require "gulp"

module.exports = ->
	gulp.task "compile", [
		"bundle:compile"
		"coffee:compile"
		"copy:compile"
		"documentation:compile"
		"less:compile"
	]

path = require "path"
gulp = require "gulp"

srcWatch  = null
testWatch = null

options             = coffeeProjectOptions.watch
sourceDirectoryPath = path.resolve options.sourceDirectoryPath
testDirectoryPath   = path.resolve options.testDirectoryPath

module.exports =
	src: ->
		srcWatch or= gulp.watch "#{sourceDirectoryPath}/**/*", read: false
		srcWatch

	test: ->
		testWatch or= gulp.watch "#{testDirectoryPath}/**/*",  read: false
		testWatch

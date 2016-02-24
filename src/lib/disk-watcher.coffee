path  = require "path"
gulp  = require "gulp"
watch = require "gulp-watch"

srcWatch  = null
testWatch = null

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.watch
	sourceDirectoryPath = path.resolve options.sourceDirectoryPath
	testDirectoryPath   = path.resolve options.testDirectoryPath

	src: ->
		srcWatch or= gulp
			.src "#{sourceDirectoryPath}/**/*"
			.pipe watch "#{sourceDirectoryPath}/**/*"

		srcWatch

	test: ->
		testWatch or= gulp
			.src "#{testDirectoryPath}/**/*"
			.pipe watch "#{testDirectoryPath}/**/*"

		testWatch

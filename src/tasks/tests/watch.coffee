fs   = require "fs"
path = require "path"
gulp = require "gulp"

log         = require "../../lib/log"
diskWatcher = require "../../lib/disk-watcher"
tests       = require "../../lib/tests"

module.exports = (coffeeProjectOptions) ->
	options       = coffeeProjectOptions.tests
	enabled       = options.enabled
	directoryPath = path.resolve options.directoryPath
	watchEnabled  = coffeeProjectOptions.watch.enabled
	sourceWatcher = diskWatcher(coffeeProjectOptions).src()
	testWatcher   = diskWatcher(coffeeProjectOptions).test()

	runTests = (somePath) ->
		somePath or= directoryPath

		unless 0 is somePath.indexOf directoryPath
			filename     = somePath.split("/").pop()
			testFilePath = path.resolve directoryPath, "./", "#{filename.split(".").shift()}_test.coffee"
			if fs.existsSync testFilePath
				somePath = testFilePath

		tests somePath, false, "spec", ->

	changeHandler = (filePath) ->
		return unless filePath.match /\.coffee/
		runTests filePath

	gulp.task "tests:watch", (cb) ->
		unless enabled and watchEnabled
			log.info "Skipping tests:watch: Disabled."
			return cb()

		log.debug "[tests:watch] Directory path: `#{directoryPath}`."

		sourceWatcher.on "change", changeHandler
		sourceWatcher.on "add",    changeHandler
		sourceWatcher.on "unlink", changeHandler

		testWatcher.on   "change", changeHandler
		testWatcher.on   "add",    changeHandler
		testWatcher.on   "unlink", changeHandler

		runTests()

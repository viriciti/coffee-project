log = require "./lib/log"
lsr = require "lsr"

defaults = {}

sourceDirectoryPath       = "src"
targetDirectoryPath       = "build"
testDirectoryPath         = "test"
sourceClientDirectoryPath = "#{sourceDirectoryPath}/client"
sourceServerDirectoryPath = "#{sourceDirectoryPath}/server"
targetClientDirectoryPath = "#{targetDirectoryPath}/client"
targetServerDirectoryPath = "#{targetDirectoryPath}/server"

defaults.browserify =
	enabled:             true
	entryFilePath:       "#{targetDirectoryPath}/client/js/app/app.js"
	targetDirectoryPath: "#{targetClientDirectoryPath}/js"
	targetFilename:      "app.bundle.js"
	paths:               [ "#{targetClientDirectoryPath}/js/app" ]

defaults.clean =
	enabled:             true
	targetDirectoryPath: targetDirectoryPath

defaults.coffee =
	enabled:             true
	sourceDirectoryPath: sourceDirectoryPath
	targetDirectoryPath: targetDirectoryPath

defaults.copy =
	enabled:             true
	excluded:            [ "**/*.coffee", "**/*.less" ]
	sourceDirectoryPath: sourceDirectoryPath
	targetDirectoryPath: targetDirectoryPath

defaults.documentation =
	enabled:             true
	sourceDirectoryPath: sourceDirectoryPath
	targetDirectoryPath: targetDirectoryPath

defaults.less =
	enabled:             true
	entryFilePath:       "#{sourceClientDirectoryPath}/less/app.less"
	targetDirectoryPath: "#{targetClientDirectoryPath}/css"

defaults.livereload =
	enabled:             true

defaults.nodemon =
  enabled:             false,
  entryFilePath:       "app.js",
  watchGlob:           ["#{sourceServerDirectoryPath}/**/*.js"]

defaults.forever =
	enabled:             true
	entryFilePath:       "app.js"
	watchDirectoryPath:  sourceServerDirectoryPath

defaults.tests =
	enabled:             true
	directoryPath:       "test"

defaults.watch =
	enabled:             true
	sourceDirectoryPath: sourceDirectoryPath
	testDirectoryPath:   testDirectoryPath

applyDefaults = (options) ->
	for task, taskOptions of defaults
		if typeof taskOptions is "object"
			for k, v of taskOptions
				unless options[task]?
					options[task] = {}

				unless options[task][k]?
					options[task][k] = v
		else
			options[task] = taskOptions

module.exports = (options = {}) ->
	tasksDirectoryPath = "#{__dirname}/tasks"

	applyDefaults options

	global.coffeeProjectOptions = options

	stats = lsr.sync tasksDirectoryPath

	for stat in stats
		unless stat.isDirectory()
			log.debug "Requiring module", stat.fullPath

			require stat.fullPath

	return

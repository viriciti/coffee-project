_   = require "lodash"
lsr = require "lsr"

log = require "./lib/log"

sourceDirectoryPath       = "src"
targetDirectoryPath       = "build"
testDirectoryPath         = "test"
documentationPath         = "docs"
sourceClientDirectoryPath = "#{sourceDirectoryPath}/client"
sourceServerDirectoryPath = "#{sourceDirectoryPath}/server"
targetClientDirectoryPath = "#{targetDirectoryPath}/client"
targetServerDirectoryPath = "#{targetDirectoryPath}/server"

defaults =
	bundle:
		enabled:    true
		sourcemaps: true
		externals:  []
		vendor:
			entry:  "#{sourceClientDirectoryPath}/js/vendor/vendor.coffee"
			target: "#{targetClientDirectoryPath}/js"
			bundle: "vendor.bundle.js"
			source: "#{sourceClientDirectoryPath}/js/app/vendor"
		app:
			entry:      "#{sourceClientDirectoryPath}/js/app/app.coffee"
			target:     "#{targetClientDirectoryPath}/js"
			bundle:     "app.bundle.js"
			paths:      [ "#{sourceClientDirectoryPath}/js/app" ]
			extensions: [ ".coffee", ".jade", ".cjsx" ]
			transforms: [ "coffee-reactify", "jadeify" ]

	clean:
		enabled:             true
		targetDirectoryPath: targetDirectoryPath
		clientDirectoryPath: targetClientDirectoryPath
		serverDirectoryPath: targetServerDirectoryPath

	coffee:
		enabled:             true
		sourceDirectoryPath: sourceServerDirectoryPath
		targetDirectoryPath: targetServerDirectoryPath

	copy:
		enabled:             true
		excluded:            [ "**/*.coffee", "**/*.less", "**/*.cjsx", "src/client/js{,/**}" ]
		sourceDirectoryPath: sourceDirectoryPath
		targetDirectoryPath: targetDirectoryPath

	documentation:
		enabled:             true
		sourceDirectoryPath: sourceDirectoryPath
		targetDirectoryPath: documentationPath

	less:
		enabled:             true
		theme:               false
		sourceDirectoryPath: "#{sourceClientDirectoryPath}/less"
		targetDirectoryPath: "#{targetClientDirectoryPath}/css"

	livereload:
		enabled:             true

	nodemon:
		enabled:             true,
		entryFilePath:       "app.js",
		watchGlob:           [ "#{targetServerDirectoryPath}/**/*" ]
		extra:               [ "cfg.js", "app.js", "gulpfile.coffee" ]
		extensions:          [ "js", "jade" ]

	forever:
		enabled:             false
		entryFilePath:       "app.js"
		watchDirectoryPath:  sourceServerDirectoryPath

	tests:
		enabled:             true
		directoryPath:       "test"

	watch:
		enabled:             true
		sourceDirectoryPath: sourceDirectoryPath
		testDirectoryPath:   testDirectoryPath

module.exports = (options = {}) ->
	env = {}
	env.less = theme: process.env.APP_THEME if process.env.APP_THEME

	for stat in lsr.sync "#{__dirname}/tasks"
		continue if stat.isDirectory()
		require(stat.fullPath) _.merge defaults, options, env

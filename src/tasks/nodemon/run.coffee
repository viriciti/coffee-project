fs   = require "fs"
path = require "path"

gulp        = require "gulp"
gulpNodemon = require "gulp-nodemon"

log = require "../../lib/log"

options       = coffeeProjectOptions.nodemon
enabled       = options.enabled
entryFilePath = path.resolve options.entryFilePath
watchGlob     = options.watchGlob

watchNodemon = ->
	gulpNodemon
		verbose: true
		script: entryFilePath
		watch:  watchGlob
		ext:    "jade js",
		ignore: [ ".git/**/*", "node_modules/**/*", "src/**/*" ]

gulp.task "nodemon:run", [ "compile" ], (cb) ->
	unless enabled is true
		log.info "Skipping nodemon:run: Disabled."
		return cb()

	log.debug "[nodemon:run] Entry file path: `#{entryFilePath}`."
	log.debug "[nodemon:run] Watch Globs: `#{watchGlob.join ","}`."

	watchNodemon()

	cb()

	return

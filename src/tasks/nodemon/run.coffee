fs   = require "fs"
path = require "path"

gulp        = require "gulp"
gulpNodemon = require "gulp-nodemon"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options       = coffeeProjectOptions.nodemon
	enabled       = options.enabled
	entryFilePath = path.resolve options.entryFilePath
	watchGlob     = options.watchGlob
	watchGlob     = watchGlob.concat options.extra if options.extra

	watchNodemon = ->
		gulpNodemon
			verbose: not not +process.env.DEBUG
			script:  entryFilePath
			watch:   watchGlob
			ext:     "jade js"

	gulp.task "nodemon:run", (cb) ->
		unless enabled
			log.info "Skipping nodemon:run: Disabled."
			return cb()

		log.debug "[nodemon:run] Entry file path: `#{entryFilePath}`."
		log.debug "[nodemon:run] Watch Globs: `#{watchGlob.join ","}`."

		watchNodemon()

		cb()

		return

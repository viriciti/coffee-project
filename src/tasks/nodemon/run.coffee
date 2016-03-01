fs   = require "fs"
path = require "path"

gulp       = require "gulp"
nodemon    = require "gulp-nodemon"
livereload = require "gulp-livereload"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options       = coffeeProjectOptions.nodemon
	enabled       = options.enabled
	entryFilePath = path.resolve options.entryFilePath
	watchGlob     = options.watchGlob
	watchGlob     = watchGlob.concat options.extra if options.extra
	extensions    = options.extensions or []

	watchNodemon = ->
		nodemon
			verbose: not not +process.env.DEBUG
			script:  entryFilePath
			watch:   watchGlob
			ext:     extensions.join " "
		.on "restart", (paths) ->
			return unless coffeeProjectOptions.livereload?.enabled

			setTimeout ->
				livereload().write path: paths[0] if paths and paths[0]
			, 1000

	gulp.task "nodemon:run", (cb) ->
		unless enabled
			log.info "Skipping nodemon:run: Disabled."
			return cb()

		log.debug "[nodemon:run] Entry file path: `#{entryFilePath}`."
		log.debug "[nodemon:run] Watch Globs: `#{watchGlob.join ","}`."

		watchNodemon()

		cb()

		return

fs   = require "fs"
path = require "path"

browserify     = require "browserify"
coffeeReactify = require "coffee-reactify"
debowerify     = require "debowerify"
gulp           = require "gulp"
gulpLivereload = require "gulp-livereload"
gulpTap        = require "gulp-tap"
jadeify        = require "jadeify"
vinylSource    = require "vinyl-source-stream"
watchify       = require "watchify"

log = require "../../lib/log"

options             = coffeeProjectOptions.browserify
enabled             = options.enabled
entryFilePath       = path.resolve options.entryFilePath
targetDirectoryPath = path.resolve options.targetDirectoryPath
targetFilename      = options.targetFilename
watchEnabled        = coffeeProjectOptions.watch.enabled
paths               = options.paths

gulp.task "browserify:watch", [ "browserify:compile", "livereload:run" ], (cb) ->
	unless enabled and watchEnabled
		log.info "Skipping browserify:watch: Disabled."
		return cb()

	log.debug "[browserify:watch] Entry file: `#{entryFilePath}`."
	log.debug "[browserify:watch] Target directory path: `#{targetDirectoryPath}`."
	log.debug "[browserify:watch] Target filename: `#{targetFilename}`."

	fs.exists entryFilePath, (exists) ->
		unless exists
			log.info "[browserify:watch] Entry file `#{entryFilePath}` not found."
			return cb()

		bundler = watchify browserify
			cache:        {}
			packageCache: {}
			fullPaths:    true
			extensions:   [ ".js", ".jade" ]
			paths:        paths

		bundler.transform jadeify
		bundler.transform debowerify
		bundler.transform coffeeReactify

		bundler.add entryFilePath

		compile = ->
			bundler.bundle()
				.pipe vinylSource targetFilename
				.pipe gulpTap (file) ->
					log.debug "[browserify:watch] Compiled `#{file.path}`."
				.pipe gulp.dest targetDirectoryPath
				.pipe gulpLivereload auto: false

		bundler.on "update", compile

		compile()

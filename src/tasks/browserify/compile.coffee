fs   = require "fs"
path = require "path"

browserify    = require "browserify"
gulp          = require "gulp"
gulpTap       = require "gulp-tap"
vinylSource   = require "vinyl-source-stream"
{ Transform } = require "stream"

log = require "../../lib/log"

options             = coffeeProjectOptions.browserify
enabled             = options.enabled
entryFilePath       = path.resolve options.entryFilePath
targetDirectoryPath = path.resolve options.targetDirectoryPath
targetFilename      = options.targetFilename

gulp.task "browserify:compile", [ "coffee:compile", "copy:compile" ], (cb) ->
	unless enabled is true
		log.info "[browserify:compile] Disabled."
		return cb()

	log.debug "[browserify:compile] Entry file: `#{entryFilePath}`."
	log.debug "[browserify:compile] Target directory path: `#{targetDirectoryPath}`."
	log.debug "[browserify:compile] Target filename: `#{targetFilename}`."

	fs.exists entryFilePath, (exists) ->
		unless exists
			log.info "[browserify:compile] Entry file `#{entryFilePath}` not found."
			return cb()

		bundler = browserify
			paths:      options.paths
			entries:    [ entryFilePath ]
			extensions: [ ".coffee", ".js", ".json", ".jade" ]

		bundler.transform "jadeify"
		bundler.transform "debowerify"

		bundle = bundler.bundle debug: true

		bundle.on "error", log.error.bind log

		bundle
			.pipe vinylSource targetFilename
			.pipe gulpTap (file) ->
				log.debug "[browserify:compile] Compiled `#{file.path}`."
				return

			.pipe gulp.dest targetDirectoryPath
			.on "end", cb

		return

	return

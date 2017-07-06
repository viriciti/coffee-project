async = require "async"
_              = require "underscore"
fs             = require "fs"
gulp           = require "gulp"
gulpCoffee     = require "gulp-coffee"
gulpSourcemaps = require "gulp-sourcemaps"
path           = require "path"

log         = require "../../lib/log"
diskWatcher = require "../../lib/disk-watcher"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.coffee
	enabled             = options.enabled
	watchEnabled        = coffeeProjectOptions.watch.enabled
	isProduction        = process.env.NODE_ENV is "production"
	noSourcemaps        = if isProduction then true else (not not options.noSourcemaps)

	gulp.task "coffee:watch", (cb) ->
		unless enabled and watchEnabled
			log.info "Skipping browserify:watch: Disabled."
			return cb()

		sourceDirectoryPath = options.sourceDirectoryPath
		targetDirectoryPath = options.targetDirectoryPath
		sourceDirectoryPath = [ sourceDirectoryPath ] unless Array.isArray sourceDirectoryPath
		targetDirectoryPath = [ targetDirectoryPath ] unless Array.isArray targetDirectoryPath

		async.each (_.zip sourceDirectoryPath, targetDirectoryPath), ([source, target], cb) ->
			log.debug "[coffee:watch] Source directory path: `#{source}`."
			log.debug "[coffee:watch] Target directory path: `#{target}`."

			source = path.resolve source
			target = path.resolve target


			compilePath = (sourcePath) ->
				coffeeCompiler = gulpCoffee bare: true

				coffeeCompiler.on "error", log.error.bind log

				sourceDirectory = path.dirname sourcePath
				targetDirectory = sourceDirectory.replace source, target

				s = gulp.src sourcePath
				s = s.pipe gulpSourcemaps.init() unless noSourcemaps
				s = s.pipe coffeeCompiler
				s = s.pipe gulpSourcemaps.write() unless noSourcemaps

				s.pipe gulp.dest targetDirectory

			removePath = (sourcePath) ->
				targetPath = sourcePath
					.replace source, target
					.replace ".coffee", ".js"

				fs.unlink targetPath, (error) ->
					log.error error if error

			watcher = diskWatcher(coffeeProjectOptions).src()

			watcher.on "change", (filePath) ->
				return unless filePath.match /\.coffee$/
				return unless filePath.match new RegExp source
				log.info "[coffee:watch] Compiling `#{filePath}`."
				compilePath filePath

			watcher.on "add", (filePath) ->
				return unless filePath.match /\.coffee$/
				return unless filePath.match new RegExp source
				log.info "[coffee:watch] Compiling `#{filePath}`."
				compilePath filePath

			watcher.on "unlink", (filePath) ->
				return unless filePath.match /\.coffee$/
				return unless filePath.match new RegExp source
				log.info "[coffee:watch] Removing `#{filePath}`."
				removePath filePath

			cb()

		return

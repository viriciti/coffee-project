_ = require "underscore"
async = require "async"
path           = require "path"
gulp           = require "gulp"
gulpCoffee     = require "gulp-coffee"
gulpSourcemaps = require "gulp-sourcemaps"
gulpTap        = require "gulp-tap"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.coffee
	enabled             = options.enabled
	isProduction        = process.env.NODE_ENV is "production"
	noSourcemaps        = if isProduction then true else (not not options.noSourcemaps)

	gulp.task "coffee:compile", (cb) ->
		unless enabled is true
			log.info "Skipping coffee:compile: Disabled."
			return cb()

		sourceDirectoryPath = options.sourceDirectoryPath
		targetDirectoryPath = options.targetDirectoryPath
		sourceDirectoryPath = [ sourceDirectoryPath ] unless Array.isArray sourceDirectoryPath
		targetDirectoryPath = [ targetDirectoryPath ] unless Array.isArray targetDirectoryPath

		async.each (_.zip sourceDirectoryPath, targetDirectoryPath), ([source, target], cb) ->

			source = path.resolve source
			target = path.resolve target

			log.debug "[coffee:compile] Source directory path: `#{source}`."
			log.debug "[coffee:compile] Target directory path: `#{target}`."

			coffeeCompiler = gulpCoffee bare: true

			coffeeCompiler.on "error", log.error.bind log

			s = gulp.src "#{source}/**/*.coffee"
				.pipe gulpTap (file) ->
					log.debug "[coffee:compile] Compiling `#{file.path}`."

			s = s.pipe gulpSourcemaps.init() unless noSourcemaps

			s = s.pipe coffeeCompiler

			s = s.pipe gulpSourcemaps.write() unless noSourcemaps

			s
				.pipe gulp.dest target
				.once "end", cb
		, cb

		return

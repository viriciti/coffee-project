path           = require "path"
gulp           = require "gulp"
gulpCoffee     = require "gulp-coffee"
gulpSourcemaps = require "gulp-sourcemaps"
gulpTap        = require "gulp-tap"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.coffee
	enabled             = options.enabled
	sourceDirectoryPath = path.resolve options.sourceDirectoryPath
	targetDirectoryPath = path.resolve options.targetDirectoryPath
	isProduction        = process.env.NODE_ENV is "production"
	noSourcemaps        = if isProduction then true else (not not options.noSourcemaps)

	gulp.task "coffee:compile", (cb) ->
		unless enabled is true
			log.info "Skipping coffee:compile: Disabled."
			return cb()

		log.debug "[coffee:compile] Source directory path: `#{sourceDirectoryPath}`."
		log.debug "[coffee:compile] Target directory path: `#{targetDirectoryPath}`."

		coffeeCompiler = gulpCoffee bare: true

		coffeeCompiler.on "error", log.error.bind log

		s = gulp.src "#{sourceDirectoryPath}/**/*.coffee"
			.pipe gulpTap (file) ->
				log.debug "[coffee:compile] Compiling `#{file.path}`."

		s = s.pipe gulpSourcemaps.init() unless noSourcemaps

		s = s.pipe coffeeCompiler

		s = s.pipe gulpSourcemaps.write() unless noSourcemaps

		s
			.pipe gulp.dest targetDirectoryPath
			.once "end", cb

		return

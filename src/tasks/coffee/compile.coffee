path       = require "path"
gulp       = require "gulp"
gulpCoffee = require "gulp-coffee"
gulpTap    = require "gulp-tap"

log = require "../../lib/log"

options             = coffeeProjectOptions.coffee
enabled             = options.enabled
sourceDirectoryPath = path.resolve options.sourceDirectoryPath
targetDirectoryPath = path.resolve options.targetDirectoryPath

gulp.task "coffee:compile", (cb) ->
	unless enabled is true
		log.info "Skipping coffee:compile: Disabled."
		return cb()

	log.debug "[coffee:compile] Source directory path: `#{sourceDirectoryPath}`."
	log.debug "[coffee:compile] Target directory path: `#{targetDirectoryPath}`."

	coffeeCompiler = gulpCoffee bare: true

	coffeeCompiler.on "error", log.error.bind log

	gulp.src "#{sourceDirectoryPath}/**/*.coffee"
		.pipe gulpTap (file) ->
			log.debug "[coffee:compile] Compiling `#{file.path}`."
			return

		.pipe coffeeCompiler
		.pipe gulp.dest targetDirectoryPath
		.on "end", cb

	return

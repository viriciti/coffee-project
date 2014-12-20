fs             = require "fs"
path           = require "path"
gulp           = require "gulp"
gulpCoffee     = require "gulp-coffee"
gulpLivereload = require "gulp-livereload"

log         = require "../../lib/log"
diskWatcher = require "../../lib/disk-watcher"

options             = coffeeProjectOptions.coffee
enabled             = options.enabled
sourceDirectoryPath = path.resolve options.sourceDirectoryPath
targetDirectoryPath = path.resolve options.targetDirectoryPath
watchEnabled        = coffeeProjectOptions.watch.enabled

gulp.task "coffee:watch", [ "coffee:compile", "livereload:run" ], (cb) ->
	unless enabled is true and watchEnabled is true
		log.info "Skipping browserify:watch: Disabled."
		return cb()

	log.debug "[coffee:watch] Source directory path: `#{sourceDirectoryPath}`."
	log.debug "[coffee:watch] Target directory path: `#{targetDirectoryPath}`."

	compilePath = (sourcePath) ->
		coffeeCompiler = gulpCoffee bare: true

		coffeeCompiler.on "error", log.error.bind log

		sourceDirectory = path.dirname sourcePath
		targetDirectory  = sourceDirectory.replace sourceDirectoryPath, targetDirectoryPath

		gulp.src sourcePath
			.pipe coffeeCompiler
			.pipe gulp.dest targetDirectory

	removePath = (sourcePath) ->
		targetPath = sourcePath
			.replace sourceDirectoryPath, targetDirectoryPath
			.replace ".coffee", ".js"

		fs.unlink targetPath, (error) ->
			log.error error if error

	diskWatcher.src().on "change", (options) ->
		return unless options.path.match /\.coffee$/

		switch options.type
			when "changed"
				log.debug "[coffee:watch] Compiling `#{options.path}`."

				compilePath options.path

			when "added"
				log.debug "[coffee:watch] Compiling `#{options.path}`."

				compilePath options.path

			when "deleted"
				log.debug "[coffee:watch] Removing `#{options.path}`."

				removePath options.path

	return

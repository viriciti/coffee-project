fs             = require "fs"
path           = require "path"
gulp           = require "gulp"
gulpLess       = require "gulp-less"
gulpLivereload = require "gulp-livereload"

log         = require "../../lib/log"
diskWatcher = require "../../lib/disk-watcher"

options             = coffeeProjectOptions.less
enabled             = options.enabled
entryFilePath       = path.resolve options.entryFilePath
targetDirectoryPath = path.resolve options.targetDirectoryPath
watchEnabled        = coffeeProjectOptions.watch.enabled

gulp.task "less:watch", [ "less:compile", "livereload:run" ], (cb) ->
	unless enabled is true and watchEnabled is true
		log.info "Skipping less:watch: Disabled."
		return cb()

	log.debug "[less:watch] Entry file path: `#{entryFilePath}`."
	log.debug "[less:watch] Target directory path: `#{targetDirectoryPath}`."

	fs.exists entryFilePath, (exists) ->
		unless exists
			log.info "Skipping less:compile: File `#{entryFilePath}` not found."
			return cb()

		compile = ->
			gulp.src entryFilePath
				.pipe gulpLess()
				.pipe gulp.dest targetDirectoryPath
				.pipe gulpLivereload auto: false

		diskWatcher.src().on "change", (options) ->
			return unless options.path.match /\.less/

			log.debug "[less:watch] Compiling `#{entryFilePath}`."

			# Compile in all cases (changed, added, deleted).
			compile()

	return

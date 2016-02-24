fs             = require "fs"
gulp           = require "gulp"
gulpLess       = require "gulp-less"
gulpLivereload = require "gulp-livereload"

log         = require "../../lib/log"
diskWatcher = require "../../lib/disk-watcher"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.less
	enabled             = options.enabled
	entryFilePath       = options.entryFilePath
	targetDirectoryPath = options.targetDirectoryPath
	watchEnabled        = coffeeProjectOptions.watch.enabled
	watcher             = diskWatcher(coffeeProjectOptions).src()

	gulp.task "less:watch", (cb) ->
		unless enabled and watchEnabled
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

			watcher.on "change", (filePath) ->
				return unless filePath.match /\.less/
				log.debug "[less:watch] Compiling `#{entryFilePath}`."
				compile()

			watcher.on "add", (filePath) ->
				return unless filePath.match /\.less/
				log.debug "[less:watch] Compiling `#{entryFilePath}`."
				compile()

			watcher.on "unlink", (filePath) ->
				return unless filePath.match /\.less/
				log.debug "[less:watch] Compiling `#{entryFilePath}`."
				compile()

		return

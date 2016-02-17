fs        = require "fs"
gulp      = require "gulp"
minimatch = require "minimatch"

log          = require "../../lib/log"
diskWatcher  = require "../../lib/disk-watcher"
{ copy, rm } = require "../../lib/files"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.copy
	enabled             = options.enabled
	excluded            = options.excluded
	sourceDirectoryPath = options.sourceDirectoryPath
	targetDirectoryPath = options.targetDirectoryPath
	watchEnabled        = coffeeProjectOptions.watch.enabled

	gulp.task "copy:watch", (cb) ->
		unless enabled and watchEnabled
			log.info "Skipping copy:watch: Disabled."
			return cb()

		log.debug "[copy:watch] Source directory path: `#{sourceDirectoryPath}`."
		log.debug "[copy:watch] Target directory path: `#{targetDirectoryPath}`."

		watcher = diskWatcher(coffeeProjectOptions).src()

		watcher.on "change", (filePath) ->
			for exclude in excluded
				return if minimatch filePath, exclude

			log.debug "[copy:watch] Copying: `#{filePath}`."

			copy filePath, sourceDirectoryPath, targetDirectoryPath, (error) ->
				log.error error if error

		watcher.on "add", (filePath) ->
			for exclude in excluded
				return if minimatch filePath, exclude

			log.debug "[copy:watch] Copying: `#{filePath}`."

			copy filePath, sourceDirectoryPath, targetDirectoryPath, (error) ->
				log.error error if error

		watcher.on "unlink", (filePath) ->
			for exclude in excluded
				return if minimatch filePath, exclude

			log.debug "[copy:watch] Removing: `#{filePath}`."

			console.log filePath
			console.log sourceDirectoryPath
			console.log targetDirectoryPath

			rm filePath, sourceDirectoryPath, targetDirectoryPath, (error) ->
				log.error error if error

		return
fs   = require "fs"
path = require "path"

gulp           = require "gulp"
gulpLivereload = require "gulp-livereload"
gulpTap        = require "gulp-tap"
minimatch      = require "minimatch"

log          = require "../../lib/log"
diskWatcher  = require "../../lib/disk-watcher"
{ copy, rm } = require "../../lib/files"

options             = coffeeProjectOptions.copy
enabled             = options.enabled
excluded            = options.excluded
sourceDirectoryPath = path.resolve options.sourceDirectoryPath
targetDirectoryPath = path.resolve options.targetDirectoryPath
watchEnabled        = coffeeProjectOptions.watch.enabled

reloadPath = (path) ->
	return if path.match /\.jade$/

	gulpLivereload auto: false
		.write
			path: path

gulp.task "copy:watch", [ "copy:compile", "livereload:run" ], (cb) ->
	unless enabled is true and watchEnabled is true
		log.info "Skipping copy:watch: Disabled."
		return cb()

	log.debug "[copy:watch] Source directory path: `#{sourceDirectoryPath}`."
	log.debug "[copy:watch] Target directory path: `#{targetDirectoryPath}`."

	diskWatcher.src().on "change", (options) ->
		for exclude in excluded
			if minimatch options.path, exclude
				return

		switch options.type
			when "changed"
				log.debug "[copy:watch] Copying: `#{options.path}`."

				copy options.path, sourceDirectoryPath, targetDirectoryPath, (error) ->
					log.error error if error

					reloadPath options.path

			when "added"
				log.debug "[copy:watch] Copying: `#{options.path}`."

				copy options.path, sourceDirectoryPath, targetDirectoryPath, (error) ->
					log.error error if error

					reloadPath options.path

			when "deleted"
				log.debug "[copy:watch] Removing: `#{options.path}`."

				rm options.path, targetDirectoryPath, (error) ->
					log.error error if error

	return

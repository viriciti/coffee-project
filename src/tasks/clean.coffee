path = require "path"
gulp = require "gulp"

log = require "../lib/log"

{ cleanBuildDirectory } = require "../lib/clean"

options             = coffeeProjectOptions.clean
enabled             = options.enabled
targetDirectoryPath = path.resolve options.targetDirectoryPath

gulp.task "clean", (cb) ->
	unless enabled is true
		log.info "Skipping clean: Disabled."
		return cb()

	log.debug "[clean] Cleaning `#{targetDirectoryPath}`."

	cleanBuildDirectory targetDirectoryPath, cb

	return

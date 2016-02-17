path = require "path"
gulp = require "gulp"

log = require "../lib/log"

{ cleanBuildDirectory } = require "../lib/clean"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.clean
	enabled             = options.enabled
	targetDirectoryPath = path.resolve options.targetDirectoryPath

	gulp.task "clean", (cb) ->
		unless enabled
			log.info "Skipping clean: Disabled."
			return cb()

		log.debug "[clean] Cleaning `#{targetDirectoryPath}`."

		cleanBuildDirectory targetDirectoryPath, cb
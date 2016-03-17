path = require "path"
gulp = require "gulp"

log = require "../lib/log"

{ cleanBuildDirectory } = require "../lib/clean"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.clean
	enabled             = options.enabled
	targetDirectoryPath = path.resolve options.targetDirectoryPath
	clientDirectoryPath = path.resolve options.clientDirectoryPath
	serverDirectoryPath = path.resolve options.serverDirectoryPath

	gulp.task "clean:client", (cb) ->
		unless enabled
			log.info "Skipping clean client: Disabled."
			return cb()

		log.debug "[clean] Cleaning client build path `#{clientDirectoryPath}`."

		cleanBuildDirectory clientDirectoryPath, cb

		return

	gulp.task "clean:server", (cb) ->
		unless enabled
			log.info "Skipping clean server: Disabled."
			return cb()

		log.debug "[clean] Cleaning server build path `#{serverDirectoryPath}`."

		cleanBuildDirectory serverDirectoryPath, cb

		return

	gulp.task "clean", ["clean:client", "clean:server"], (cb) ->
		cb()

		process.exit()

		return


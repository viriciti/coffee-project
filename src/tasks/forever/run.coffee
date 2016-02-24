forever = require "forever-monitor"
fs      = require "fs"
gulp    = require "gulp"
path    = require "path"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options            = coffeeProjectOptions.forever
	enabled            = options.enabled
	entryFilePath      = path.resolve options.entryFilePath
	watchDirectoryPath = options.watchDirectoryPath

	child = null

	gulp.task "forever:run", (cb) ->
		unless enabled is true
			log.info "Skipping forever:run: Disabled."
			return cb()

		child = new forever.Monitor entryFilePath,
			watch:          true
			watchDirectory: watchDirectoryPath
			minUptime:      2000
			spinSleepTime:  1000

		child.start()

		cb()

		return

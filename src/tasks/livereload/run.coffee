net            = require "net"
gulp           = require "gulp"
gulpLivereload = require "gulp-livereload"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options = coffeeProjectOptions.livereload
	enabled = options.enabled

	gulp.task "livereload:run", (cb) ->
		unless enabled is true
			log.info "Skipping livereload:run: Disabled."
			return cb()

		# Attempt a connection.
		connection = net.connect 35729

		# When successful, continue.
		connection.on "connect", ->
			log.info "Livereload server already running."
			cb()

		# When unsuccessful, spawn a new server.
		connection.on "error", ->
			log.info "Livereload server not yet running. Starting one."
			gulpLivereload.listen()
			cb()

		return

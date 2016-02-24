gulp = require "gulp"
path = require "path"

log   = require "../../lib/log"
tests = require "../../lib/tests"

module.exports = (coffeeProjectOptions) ->
	options       = coffeeProjectOptions.tests
	enabled       = options.enabled
	directoryPath = path.resolve options.directoryPath

	gulp.task "tests:run", (cb) ->
		unless enabled
			log.info "Skipping tests:run: Disabled."
			return cb()

		log.debug "[tests:run] Directory path: `#{directoryPath}`."

		tests directoryPath, true, "spec", cb

		return

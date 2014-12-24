path = require "path"

gulp = require "gulp"

log  = require "../../lib/log"
docs = require "../../lib/docs"

options             = coffeeProjectOptions.documentation
enabled             = options.enabled
sourceDirectoryPath = path.resolve options.sourceDirectoryPath
targetDirectoryPath = path.resolve options.targetDirectoryPath

gulp.task "documentation:compile", (cb) ->
	unless enabled is true
		log.info "Skipping documentation:compile: Disabled."
		return cb()

	log.debug "[documentation:compile] Source directory path: `#{sourceDirectoryPath}`."
	log.debug "[documentation:compile] Target directory path: `#{targetDirectoryPath}`."

	log.debug "[documentation:compile] Compiling."

	docs sourceDirectoryPath, targetDirectoryPath, false, cb

	return

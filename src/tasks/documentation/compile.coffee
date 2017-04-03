gulp   = require "gulp"
path   = require "path"
apidoc = require "gulp-apidoc"

log  = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
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

		apidoc
			src:            sourceDirectoryPath
			dest:           targetDirectoryPath
			includeFilters: [".*\\.coffee$"]
		, cb
		
		return

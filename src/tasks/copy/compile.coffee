path    = require "path"
gulp    = require "gulp"
gulpTap = require "gulp-tap"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.copy
	enabled             = options.enabled
	excluded            = options.excluded
	sourceDirectoryPath = options.sourceDirectoryPath
	targetDirectoryPath = options.targetDirectoryPath

	gulp.task "copy:compile", (cb) ->
		unless enabled is true
			log.info "Skipping copy:compile: Disabled."
			return cb()

		log.debug "[copy:compile] Source directory path: `#{sourceDirectoryPath}`."
		log.debug "[copy:compile] Target directory path: `#{targetDirectoryPath}`."

		excluded   = (excluded or []).map (x) -> "!#{x}"
		sourceGlob = [ "#{sourceDirectoryPath}/**/*" ].concat excluded

		gulp.src sourceGlob
			.pipe gulpTap (file) ->
				log.debug "[copy:compile] Copying `#{file.path}`."
				return

			.pipe gulp.dest targetDirectoryPath
			.on "end", cb

		return

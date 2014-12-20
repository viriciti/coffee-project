fs = require "fs"
path = require "path"

gulp     = require "gulp"
gulpLess = require "gulp-less"
gulpTap  = require "gulp-tap"

log = require "../../lib/log"

options             = coffeeProjectOptions.less
enabled             = options.enabled
entryFilePath       = path.resolve options.entryFilePath
targetDirectoryPath = path.resolve options.targetDirectoryPath

gulp.task "less:compile", (cb) ->
	unless enabled is true
		log.info "Skipping less:compile: Disabled."
		return cb()

	log.debug "[less:compile] Entry file path: `#{entryFilePath}`."
	log.debug "[less:compile] Target directory path: `#{targetDirectoryPath}`."

	fs.exists entryFilePath, (exists) ->
		unless exists
			log.info "[less:compile] Entry file `#{entryFilePath}` not found."
			return cb()

		gulp.src entryFilePath
			.pipe gulpTap (file) ->
				log.debug "[less:compile] Compiling `#{file.path}`."
				return

			.pipe gulpLess()
			.pipe gulp.dest targetDirectoryPath
			.on "end", cb

	return

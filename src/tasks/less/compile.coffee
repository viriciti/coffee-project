async       = require "async"
fs          = require "fs"
gulp        = require "gulp"
gulpCssnano = require "gulp-cssnano"
gulpLess    = require "gulp-less"
gulpTap     = require "gulp-tap"
lsr         = require "lsr"
path        = require "path"
   
log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.less
	enabled             = options.enabled
	theme               = options.theme
	sourceDirectoryPath = path.resolve options.sourceDirectoryPath
	themesDirectoryPath = path.resolve sourceDirectoryPath, "themes"
	targetDirectoryPath = path.resolve options.targetDirectoryPath
	entryFilePath       = path.resolve sourceDirectoryPath, "themes/#{theme}/theme.less"

	unless theme
		entryFilePath = path.resolve sourceDirectoryPath, "app.less"

	gulp.task "less:themes", (cb) ->
		unless enabled is true
			log.info "Skipping less:themes: Disabled."
			return cb()
		
		unless theme
			log.info "Skipping less:themes: No theme specified."
			return cb()

		lsr themesDirectoryPath, (error, stats) ->
			return cb error if error

			async.each stats, (stat, cb) ->
				return cb() unless stat.isDirectory()

				console.log themesDirectoryPath, stat.name, "theme.less"
				themeFilePath = path.resolve themesDirectoryPath, stat.name, "theme.less"

				fs.exists themeFilePath, (exists) ->
					unless exists
						log.warn "[less:themes] Entry file `#{themeFilePath}` not found."
						return cb()

					gulp.src themeFilePath
						.pipe gulpTap (file) ->
							log.debug "[less:themes] Compiling `#{file.path}`."
							return

						.pipe gulpLess()
						.pipe gulpCssnano()
						.pipe gulp.dest targetDirectoryPath
						.on "end", cb
			, ->
				console.log "done!"
				process.exit()

				cb()

		return

	gulp.task "less:compile", (cb) ->
		unless enabled
			log.info "Skipping less:compile: Disabled."
			return cb()

		log.debug "[less:compile] Entry file path: `#{entryFilePath}`."
		log.debug "[less:compile] Target directory path: `#{targetDirectoryPath}`."

		fs.exists entryFilePath, (exists) ->
			unless exists
				log.warn "[less:compile] Entry file `#{entryFilePath}` not found."
				return cb()

			gulp.src entryFilePath
				.pipe gulpTap (file) ->
					log.debug "[less:compile] Compiling `#{file.path}`."
					return

				.pipe gulpLess()
				.pipe gulp.dest targetDirectoryPath
				.on "end", cb

		return

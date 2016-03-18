async       = require "async"
fs          = require "fs"
gulp        = require "gulp"
gulpCssnano = require "gulp-cssnano"
gulpLess    = require "gulp-less"
gulpRename  = require "gulp-rename"
gulpTap     = require "gulp-tap"
lsr         = require "lsr"
path        = require "path"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.less
	enabled             = options.enabled
	theme               = options.theme or "default"
	sourceDirectoryPath = path.resolve options.sourceDirectoryPath
	themesDirectoryPath = path.resolve sourceDirectoryPath, "themes"
	targetDirectoryPath = path.resolve options.targetDirectoryPath
	isProduction        = process.env.NODE_ENV is "production"

	buildAllThemes = (cb) ->
		lsr themesDirectoryPath, (error, stats) ->
			return cb error if error

			async.eachSeries stats, (stat, cb) ->
				return cb() unless stat.isDirectory()

				theme = stat.name

				log.debug ""

				themeFilePath = path.resolve themesDirectoryPath, theme, "theme.less"

				fs.exists themeFilePath, (exists) ->
					unless exists
						log.warn "[less:themes] Entry file `#{themeFilePath}` not found."
						return cb()

					s = gulp.src themeFilePath
						.pipe gulpTap (file) ->
							log.debug "[less:compile] Compiling `#{file.path}`."
							return
						.pipe gulpLess()

					s = s.pipe gulpCssnano() if isProduction

					s
						.pipe gulpRename "#{theme}.css"
						.pipe gulp.dest targetDirectoryPath
						.on "end", cb
			, cb

	buildCurrentTheme = (cb) ->
		entryFilePath = path.resolve sourceDirectoryPath, "themes/#{theme}/theme.less"

		fs.exists entryFilePath, (exists) ->
			unless exists
				log.warn "[less:compile] Entry file `#{entryFilePath}` not found."
				return cb()

			s = gulp.src entryFilePath
				.pipe gulpTap (file) ->
					log.debug "[less:compile] Compiling `#{file.path}`."
					return
				.pipe gulpLess()

			s = s.pipe gulpCssnano() if isProduction

			s
				.pipe gulpRename "#{theme}.css"
				.pipe gulp.dest targetDirectoryPath
				.on "end", cb

	handleThemesCompile = (cb) ->
		if isProduction
			buildAllThemes cb
		else
			buildCurrentTheme cb

	handleCompile = (cb) ->
		log.debug "[less:compile] Entry file path: `#{entryFilePath}`."
		log.debug "[less:compile] Target directory path: `#{targetDirectoryPath}`."

		entryFilePath = path.resolve sourceDirectoryPath, "app.less"

		fs.exists entryFilePath, (exists) ->
			unless exists
				log.warn "[less:compile] Entry file `#{entryFilePath}` not found."
				return cb()

			s = gulp.src entryFilePath
				.pipe gulpTap (file) ->
					log.debug "[less:compile] Compiling `#{file.path}`."
					return
				.pipe gulpLess()

			s = s.pipe gulpCssnano() if isProduction

			s.pipe gulp.dest targetDirectoryPath
				.on "end", cb

	gulp.task "less:compile", (cb) ->
		unless enabled
			log.info "[less:compile] Skipping : Disabled."
			return cb()

		fs.exists themesDirectoryPath, (themesFolderExists) ->
			log.debug "[less:compile] Theme folder does#{if themesFolderExists then "" else " not"} exist."

			if themesFolderExists
				handleThemesCompile cb
			else
				handleCompile cb

		return


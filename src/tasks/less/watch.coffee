fs             = require "fs"
gulp           = require "gulp"
gulpLess       = require "gulp-less"
gulpLivereload = require "gulp-livereload"
gulpRename     = require "gulp-rename"
path           = require "path"

log         = require "../../lib/log"
diskWatcher = require "../../lib/disk-watcher"

module.exports = (coffeeProjectOptions) ->
	options             = coffeeProjectOptions.less
	enabled             = options.enabled
	theme               = options.theme or "default"
	sourceDirectoryPath = path.resolve options.sourceDirectoryPath
	themesDirectoryPath = path.resolve sourceDirectoryPath, "themes"
	targetDirectoryPath = path.resolve options.targetDirectoryPath
	watchEnabled        = coffeeProjectOptions.watch.enabled
	watcher             = diskWatcher(coffeeProjectOptions).src()

	unless theme
		entryFilePath = path.resolve sourceDirectoryPath, "app.less"

	gulp.task "less:watch", (cb) ->
		unless enabled and watchEnabled
			log.info "Skipping less:watch: Disabled."
			return cb()

		fs.exists themesDirectoryPath, (themesFolderExists) ->
			log.debug "[less:watch] Theme folder does#{if themesFolderExists then "" else " not"} exist."

			if themesFolderExists
				entryFilePath = path.resolve sourceDirectoryPath, "themes/#{theme}/theme.less"
			else
				entryFilePath = path.resolve sourceDirectoryPath, "app.less"

			log.debug "[less:watch] Entry file path: `#{entryFilePath}`."
			log.debug "[less:watch] Target directory path: `#{targetDirectoryPath}`."

			fs.exists entryFilePath, (exists) ->
				unless exists
					log.info "Skipping less:compile: File `#{entryFilePath}` not found."
					return cb()

				compile = ->
					gulp.src entryFilePath
						.pipe gulpLess()
						.pipe gulpRename "#{theme}.css"
						.pipe gulp.dest targetDirectoryPath
						.pipe gulpLivereload auto: false

				watcher.on "change", (filePath) ->
					return unless filePath.match /\.less/
					log.debug "[less:watch] Compiling `#{entryFilePath}`."
					compile()

				watcher.on "add", (filePath) ->
					return unless filePath.match /\.less/
					log.debug "[less:watch] Compiling `#{entryFilePath}`."
					compile()

				watcher.on "unlink", (filePath) ->
					return unless filePath.match /\.less/
					log.debug "[less:watch] Compiling `#{entryFilePath}`."
					compile()

				cb()

		return

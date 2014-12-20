mkdirp = require "mkdirp"
rimraf = require "rimraf"

cleanBuildDirectory = (buildDirectoryPath, cb) ->
	rimraf buildDirectoryPath, (error) ->
		return cb error if error
		mkdirp buildDirectoryPath, cb

module.exports =
	cleanBuildDirectory: cleanBuildDirectory

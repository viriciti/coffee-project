fs     = require "fs"
rimraf = require "rimraf"

copy = (path, sourcePath, targetPath, cb) ->
	targetPath = path.replace sourcePath, targetPath

	readStream  = fs.createReadStream path
	writeStream = fs.createWriteStream targetPath

	readStream.on  "error",  cb
	writeStream.on "error",  cb
	writeStream.on "finish", cb

	readStream
		.pipe writeStream

rm = (path, sourcePath, targetPath, cb) ->
	targetPath = path.replace sourcePath, targetPath

	rimraf targetPath, cb

module.exports =
	rm:   rm
	copy: copy

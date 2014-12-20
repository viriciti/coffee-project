cp = require "child_process"

docs = (sourcePath, targetPath, exit, cb) ->
	childProcess = cp.spawn "#{__dirname}/../../node_modules/.bin/codo", [
		"--output"
		targetPath
		"--undocumented"
		"--private"
		sourcePath
	]

	childProcess.stdout.on "data", (chunk) ->
		#process.stdout.write chunk

	childProcess.stderr.on "data", (chunk) ->
		process.stderr.write chunk

	childProcess.once "close", ->
		if exit
			process.exit()
		else
			cb()

module.exports = docs

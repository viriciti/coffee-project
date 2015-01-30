fs   = require "fs"
path = require "path"
cp   = require "child_process"

log         = require "./log"
pathToMocha = path.resolve "#{__dirname}/../../node_modules/.bin/mocha"

tests = (directory, exit, reporter, cb) ->
	fs.exists directory, (exists) ->
		unless exists
			log.info "Skipping mocha: Directory `#{directory}` not found."
			return cb()

		childProcess = cp.spawn pathToMocha, [
			"--recursive"
			"--compilers"
			"coffee:coffee-script/register"
			"--reporter"
			reporter
			directory
		]

		childProcess.stdout.on "data", (chunk) ->
			process.stdout.write chunk

		childProcess.stderr.on "data", (chunk) ->
			process.stderr.write chunk

		childProcess.once "close", ->
			if exit
				process.exit()
			else
				cb()

module.exports = tests

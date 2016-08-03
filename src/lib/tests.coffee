_     = require "lodash"
async = require "async"
fs    = require "fs"
path  = require "path"
cp    = require "child_process"

log = require "./log"

possibleMochaPaths = [
	path.resolve __dirname, "./node_modules/.bin/mocha"
	path.resolve __dirname, "../node_modules/.bin/mocha"
	path.resolve __dirname, "../../node_modules/.bin/mocha"
	path.resolve __dirname, "../../../node_modules/.bin/mocha"
	path.resolve __dirname, "../../../../node_modules/.bin/mocha"
]

tests = (directory, exit, reporter, cb) ->
	async.map possibleMochaPaths, (pathToMocha, cb) ->
		fs.exists pathToMocha, (exists) ->
			cb null, if exists then pathToMocha else false
	, (error, result) ->
		return cb error if error

		pathToMocha = _.find result
		log.debug "Found mocha at: #{pathToMocha}"

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

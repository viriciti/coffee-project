_              = require "lodash"
browserify     = require "browserify"
coffeeify      = require "coffeeify"
coffeeReactify = require "coffee-reactify"
fs             = require "fs"
gulp           = require "gulp"
gulpTap        = require "gulp-tap"
jadeify        = require "jadeify"
path           = require "path"
vinylSource    = require "vinyl-source-stream"

log = require "../../lib/log"

module.exports = (coffeeProjectOptions) ->
	options      = coffeeProjectOptions.bundle
	enabled      = options.enabled
	externals    = options.externals or []
	isProduction = process.env.NODE_ENV is "production"

	gulp.task "bundle:vendor:rm", (cb) ->
		target     = options.vendor.target
		bundle     = options.vendor.bundle
		bundlePath = path.resolve "#{target}/#{bundle}"

		fs.exists bundlePath, (exists) ->
			unless exists
				log.debug "[bundle:vendor:rm] Not there, nothing to remove."
				return cb()

			fs.unlink bundlePath, (error) ->
				log.debug "[bundle:vendor:rm] Removed #{bundlePath}"
				cb error

	gulp.task "bundle:vendor", (cb) ->
		unless enabled
			log.info "[bundle:compile] Disabled."
			return cb()

		target     = options.vendor.target
		bundle     = options.vendor.bundle
		source     = options.vendor.source
		bundlePath = "#{target}/#{bundle}"

		fs.exists bundlePath, (bundleExists) ->
			unless isProduction
				if bundleExists
					log.info "[bundle:compile] [vendor] Bundle already there. Skipping."
					return cb()

			log.debug "[bundle:compile] [vendor] Target directory: `#{target}`."
			log.debug "[bundle:compile] [vendor] Target bundle:    `#{bundle}`."
			log.debug "[bundle:compile] [vendor] Source:           `#{source}`."

			bundler = browserify
				debug: false

			bundler.transform coffeeify

			_.each externals, (external) ->
				if external.expose
					bundler.require external.require, expose: external.expose
				else
					bundler.require external.require

			bundler.bundle()
				.pipe vinylSource bundle
				.pipe gulpTap (file) ->
					log.debug "[bundle:compile] [vendor] Compiled `#{file.path}`."
				.pipe gulp.dest target
				.on "end", cb

		return

	gulp.task "bundle:compile", ["bundle:vendor"], (cb) ->
		unless enabled
			log.info "[bundle:compile] Disabled."
			return cb()

		entry      = options.app.entry
		target     = options.app.target
		bundle     = options.app.bundle
		paths      = options.app.paths
		extensions = options.app.extensions
		transforms = options.app.transforms

		log.debug "[bundle:compile] [app] Entry file:       `#{entry}`."
		log.debug "[bundle:compile] [app] Target directory: `#{target}`."
		log.debug "[bundle:compile] [app] Target bundle:    `#{bundle}`."
		log.debug "[bundle:compile] [app] extensions:       `#{(extensions or []).join ", "}`."
		log.debug "[bundle:compile] [app] transforms:       `#{(transforms or []).join ", "}`."

		fs.exists entry, (exists) ->
			unless exists
				log.info "[bundle:compile] [app] Entry file `#{entry}` not found."
				return cb()

			bundler = browserify
				extensions: extensions
				paths:      paths
				debug:      not isProduction

			_.each externals, (external) ->
				bundler.external external.expose or external.require

			for transform in transforms or []
				switch transform
					when "coffee-reactify" then	bundler.transform coffeeReactify
					when "jadeify"         then bundler.transform jadeify

			bundler.add entry

			bundler.bundle()
				.pipe vinylSource bundle
				.pipe gulpTap (file) ->
					log.debug "[bundle:compile] [app] Compiled `#{file.path}`."
				.pipe gulp.dest target
				.on "end", cb

		return
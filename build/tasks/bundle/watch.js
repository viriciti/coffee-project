var _, browserify, coffeeReactify, fs, gulp, gulpLivereload, gulpTap, jadeify, log, vinylSource, watchify;

_ = require("lodash");

browserify = require("browserify");

coffeeReactify = require("coffee-reactify");

fs = require("fs");

gulp = require("gulp");

gulpLivereload = require("gulp-livereload");

gulpTap = require("gulp-tap");

jadeify = require("jadeify");

vinylSource = require("vinyl-source-stream");

watchify = require("watchify");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, externals, options, watchEnabled;
  options = coffeeProjectOptions.bundle;
  enabled = options.enabled;
  externals = options.externals || [];
  watchEnabled = coffeeProjectOptions.watch.enabled;
  return gulp.task("bundle:watch", function(cb) {
    var bundle, entry, extensions, paths, target, transforms;
    if (!(enabled && watchEnabled)) {
      log.info("[bundle:watch] Disabled.");
      return cb();
    }
    entry = options.app.entry;
    target = options.app.target;
    bundle = options.app.bundle;
    paths = options.app.paths;
    extensions = options.app.extensions;
    transforms = options.app.transforms;
    log.debug("[bundle:watch] Entry file:       `" + entry + "`.");
    log.debug("[bundle:watch] Target directory: `" + target + "`.");
    log.debug("[bundle:watch] Target bundle:    `" + bundle + "`.");
    log.debug("[bundle:watch] extensions:       `" + ((extensions || []).join(", ")) + "`.");
    log.debug("[bundle:watch] transforms:       `" + ((transforms || []).join(", ")) + "`.");
    fs.exists(entry, function(exists) {
      var bundler, compile, i, len, ref, transform;
      if (!exists) {
        log.info("[bundle:watch] [app] Entry file `" + entry + "` not found.");
        return cb();
      }
      bundler = watchify(browserify({
        cache: {},
        packageCache: {},
        extensions: extensions,
        paths: paths,
        debug: true
      }));
      _.each(externals, function(external) {
        return bundler.external(external.expose || external.require);
      });
      ref = transforms || [];
      for (i = 0, len = ref.length; i < len; i++) {
        transform = ref[i];
        switch (transform) {
          case "coffee-reactify":
            bundler.transform(coffeeReactify);
            break;
          case "jadeify":
            bundler.transform(jadeify);
        }
      }
      bundler.add(entry);
      compile = function() {
        var bundlerStream;
        bundlerStream = bundler.bundle();
        bundlerStream.on("error", function(error) {
          return log.error("[bundle:watch]: " + error.message);
        });
        return bundlerStream.pipe(vinylSource(bundle)).pipe(gulpTap(function(file) {
          return log.debug("[bundle:watch] Compiled `" + file.path + "`.");
        })).pipe(gulp.dest(target)).pipe(gulpLivereload({
          auto: false
        }));
      };
      bundler.on("update", compile);
      compile();
    });
  });
};

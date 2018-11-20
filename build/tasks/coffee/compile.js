var _, async, gulp, gulpCoffee, gulpSourcemaps, gulpTap, log, path;

_ = require("underscore");

async = require("async");

path = require("path");

gulp = require("gulp");

gulpCoffee = require("gulp-coffee");

gulpSourcemaps = require("gulp-sourcemaps");

gulpTap = require("gulp-tap");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, isProduction, noSourcemaps, options;
  options = coffeeProjectOptions.coffee;
  enabled = options.enabled;
  isProduction = process.env.NODE_ENV === "production";
  noSourcemaps = isProduction ? true : !!options.noSourcemaps;
  return gulp.task("coffee:compile", function(cb) {
    var sourceDirectoryPath, targetDirectoryPath;
    if (enabled !== true) {
      log.info("Skipping coffee:compile: Disabled.");
      return cb();
    }
    sourceDirectoryPath = options.sourceDirectoryPath;
    targetDirectoryPath = options.targetDirectoryPath;
    if (!Array.isArray(sourceDirectoryPath)) {
      sourceDirectoryPath = [sourceDirectoryPath];
    }
    if (!Array.isArray(targetDirectoryPath)) {
      targetDirectoryPath = [targetDirectoryPath];
    }
    async.each(_.zip(sourceDirectoryPath, targetDirectoryPath), function(arg, cb) {
      var coffeeCompiler, s, source, target;
      source = arg[0], target = arg[1];
      source = path.resolve(source);
      target = path.resolve(target);
      log.debug("[coffee:compile] Source directory path: `" + source + "`.");
      log.debug("[coffee:compile] Target directory path: `" + target + "`.");
      coffeeCompiler = gulpCoffee({
        bare: true
      });
      coffeeCompiler.on("error", log.error.bind(log));
      s = gulp.src(source + "/**/*.coffee").pipe(gulpTap(function(file) {
        return log.debug("[coffee:compile] Compiling `" + file.path + "`.");
      }));
      if (!noSourcemaps) {
        s = s.pipe(gulpSourcemaps.init());
      }
      s = s.pipe(coffeeCompiler);
      if (!noSourcemaps) {
        s = s.pipe(gulpSourcemaps.write());
      }
      return s.pipe(gulp.dest(target)).once("end", cb);
    }, cb);
  });
};

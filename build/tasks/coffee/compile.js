var gulp, gulpCoffee, gulpSourcemaps, gulpTap, log, path;

path = require("path");

gulp = require("gulp");

gulpCoffee = require("gulp-coffee");

gulpSourcemaps = require("gulp-sourcemaps");

gulpTap = require("gulp-tap");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, isProduction, noSourcemaps, options, sourceDirectoryPath, targetDirectoryPath;
  options = coffeeProjectOptions.coffee;
  enabled = options.enabled;
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  isProduction = process.env.NODE_ENV === "production";
  noSourcemaps = isProduction ? true : !!options.noSourcemaps;
  return gulp.task("coffee:compile", function(cb) {
    var coffeeCompiler, s;
    if (enabled !== true) {
      log.info("Skipping coffee:compile: Disabled.");
      return cb();
    }
    log.debug("[coffee:compile] Source directory path: `" + sourceDirectoryPath + "`.");
    log.debug("[coffee:compile] Target directory path: `" + targetDirectoryPath + "`.");
    coffeeCompiler = gulpCoffee({
      bare: true
    });
    coffeeCompiler.on("error", log.error.bind(log));
    s = gulp.src(sourceDirectoryPath + "/**/*.coffee").pipe(gulpTap(function(file) {
      return log.debug("[coffee:compile] Compiling `" + file.path + "`.");
    }));
    if (!noSourcemaps) {
      s = s.pipe(gulpSourcemaps.init());
    }
    s = s.pipe(coffeeCompiler);
    if (!noSourcemaps) {
      s = s.pipe(gulpSourcemaps.write());
    }
    s.pipe(gulp.dest(targetDirectoryPath)).once("end", cb);
  });
};

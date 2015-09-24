var enabled, gulp, gulpCoffee, gulpTap, log, options, path, sourceDirectoryPath, targetDirectoryPath;

path = require("path");

gulp = require("gulp");

gulpCoffee = require("gulp-coffee");

gulpTap = require("gulp-tap");

log = require("../../lib/log");

options = coffeeProjectOptions.coffee;

enabled = options.enabled;

sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

gulp.task("coffee:compile", function(cb) {
  var coffeeCompiler;
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
  gulp.src(sourceDirectoryPath + "/**/*.coffee").pipe(gulpTap(function(file) {
    log.debug("[coffee:compile] Compiling `" + file.path + "`.");
  })).pipe(coffeeCompiler).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
});

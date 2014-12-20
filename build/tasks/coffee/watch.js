var diskWatcher, enabled, fs, gulp, gulpCoffee, gulpLivereload, log, options, path, sourceDirectoryPath, targetDirectoryPath, watchEnabled;

fs = require("fs");

path = require("path");

gulp = require("gulp");

gulpCoffee = require("gulp-coffee");

gulpLivereload = require("gulp-livereload");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

options = coffeeProjectOptions.coffee;

enabled = options.enabled;

sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

watchEnabled = coffeeProjectOptions.watch.enabled;

gulp.task("coffee:watch", ["coffee:compile", "livereload:run"], function(cb) {
  var compilePath, removePath;
  if (!(enabled === true && watchEnabled === true)) {
    log.info("Skipping browserify:watch: Disabled.");
    return cb();
  }
  log.debug("[coffee:watch] Source directory path: `" + sourceDirectoryPath + "`.");
  log.debug("[coffee:watch] Target directory path: `" + targetDirectoryPath + "`.");
  compilePath = function(sourcePath) {
    var coffeeCompiler, sourceDirectory, targetDirectory;
    coffeeCompiler = gulpCoffee({
      bare: true
    });
    coffeeCompiler.on("error", log.error.bind(log));
    sourceDirectory = path.dirname(sourcePath);
    targetDirectory = sourceDirectory.replace(sourceDirectoryPath, targetDirectoryPath);
    return gulp.src(sourcePath).pipe(coffeeCompiler).pipe(gulp.dest(targetDirectory));
  };
  removePath = function(sourcePath) {
    var targetPath;
    targetPath = sourcePath.replace(sourceDirectoryPath, targetDirectoryPath).replace(".coffee", ".js");
    return fs.unlink(targetPath, function(error) {
      if (error) {
        return log.error(error);
      }
    });
  };
  diskWatcher.src().on("change", function(options) {
    if (!options.path.match(/\.coffee$/)) {
      return;
    }
    switch (options.type) {
      case "changed":
        log.debug("[coffee:watch] Compiling `" + options.path + "`.");
        return compilePath(options.path);
      case "added":
        log.debug("[coffee:watch] Compiling `" + options.path + "`.");
        return compilePath(options.path);
      case "deleted":
        log.debug("[coffee:watch] Removing `" + options.path + "`.");
        return removePath(options.path);
    }
  });
});

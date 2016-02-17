var diskWatcher, fs, gulp, gulpCoffee, log, path;

fs = require("fs");

gulp = require("gulp");

gulpCoffee = require("gulp-coffee");

path = require("path");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

module.exports = function(coffeeProjectOptions) {
  var enabled, options, sourceDirectoryPath, targetDirectoryPath, watchEnabled;
  options = coffeeProjectOptions.coffee;
  enabled = options.enabled;
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  watchEnabled = coffeeProjectOptions.watch.enabled;
  return gulp.task("coffee:watch", function(cb) {
    var compilePath, removePath, watcher;
    if (!(enabled && watchEnabled)) {
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
    watcher = diskWatcher(coffeeProjectOptions).src();
    watcher.on("change", function(filePath) {
      if (!filePath.match(/\.coffee$/)) {
        return;
      }
      if (!filePath.match(new RegExp(sourceDirectoryPath))) {
        return;
      }
      log.debug("[coffee:watch] Compiling `" + filePath + "`.");
      return compilePath(filePath);
    });
    watcher.on("add", function(filePath) {
      if (!filePath.match(/\.coffee$/)) {
        return;
      }
      if (!filePath.match(new RegExp(sourceDirectoryPath))) {
        return;
      }
      log.debug("[coffee:watch] Compiling `" + filePath + "`.");
      return compilePath(filePath);
    });
    watcher.on("unlink", function(filePath) {
      if (!filePath.match(/\.coffee$/)) {
        return;
      }
      if (!filePath.match(new RegExp(sourceDirectoryPath))) {
        return;
      }
      log.debug("[coffee:watch] Removing `" + filePath + "`.");
      return removePath(filePath);
    });
  });
};

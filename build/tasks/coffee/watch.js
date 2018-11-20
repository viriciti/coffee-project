var _, async, diskWatcher, fs, gulp, gulpCoffee, gulpSourcemaps, log, path;

async = require("async");

_ = require("underscore");

fs = require("fs");

gulp = require("gulp");

gulpCoffee = require("gulp-coffee");

gulpSourcemaps = require("gulp-sourcemaps");

path = require("path");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

module.exports = function(coffeeProjectOptions) {
  var enabled, isProduction, noSourcemaps, options, watchEnabled;
  options = coffeeProjectOptions.coffee;
  enabled = options.enabled;
  watchEnabled = coffeeProjectOptions.watch.enabled;
  isProduction = process.env.NODE_ENV === "production";
  noSourcemaps = isProduction ? true : !!options.noSourcemaps;
  return gulp.task("coffee:watch", function(cb) {
    var sourceDirectoryPath, targetDirectoryPath;
    if (!(enabled && watchEnabled)) {
      log.info("Skipping browserify:watch: Disabled.");
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
      var compilePath, removePath, source, target, watcher;
      source = arg[0], target = arg[1];
      log.debug("[coffee:watch] Source directory path: `" + source + "`.");
      log.debug("[coffee:watch] Target directory path: `" + target + "`.");
      source = path.resolve(source);
      target = path.resolve(target);
      compilePath = function(sourcePath) {
        var coffeeCompiler, s, sourceDirectory, targetDirectory;
        coffeeCompiler = gulpCoffee({
          bare: true
        });
        coffeeCompiler.on("error", log.error.bind(log));
        sourceDirectory = path.dirname(sourcePath);
        targetDirectory = sourceDirectory.replace(source, target);
        s = gulp.src(sourcePath);
        if (!noSourcemaps) {
          s = s.pipe(gulpSourcemaps.init());
        }
        s = s.pipe(coffeeCompiler);
        if (!noSourcemaps) {
          s = s.pipe(gulpSourcemaps.write());
        }
        return s.pipe(gulp.dest(targetDirectory));
      };
      removePath = function(sourcePath) {
        var targetPath;
        targetPath = sourcePath.replace(source, target).replace(".coffee", ".js");
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
        if (!filePath.match(new RegExp(source))) {
          return;
        }
        log.info("[coffee:watch] Compiling `" + filePath + "`.");
        return compilePath(filePath);
      });
      watcher.on("add", function(filePath) {
        if (!filePath.match(/\.coffee$/)) {
          return;
        }
        if (!filePath.match(new RegExp(source))) {
          return;
        }
        log.info("[coffee:watch] Compiling `" + filePath + "`.");
        return compilePath(filePath);
      });
      watcher.on("unlink", function(filePath) {
        if (!filePath.match(/\.coffee$/)) {
          return;
        }
        if (!filePath.match(new RegExp(source))) {
          return;
        }
        log.info("[coffee:watch] Removing `" + filePath + "`.");
        return removePath(filePath);
      });
      return cb();
    });
  });
};

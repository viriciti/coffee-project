var diskWatcher, fs, gulp, gulpLess, gulpLivereload, log, path;

fs = require("fs");

gulp = require("gulp");

gulpLess = require("gulp-less");

gulpLivereload = require("gulp-livereload");

path = require("path");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

module.exports = function(coffeeProjectOptions) {
  var enabled, entryFilePath, options, sourceDirectoryPath, targetDirectoryPath, theme, watchEnabled, watcher;
  options = coffeeProjectOptions.less;
  enabled = options.enabled;
  theme = options.theme;
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  entryFilePath = path.resolve(sourceDirectoryPath, "themes/" + theme + "/" + theme + ".less");
  watchEnabled = coffeeProjectOptions.watch.enabled;
  watcher = diskWatcher(coffeeProjectOptions).src();
  if (!theme) {
    entryFilePath = path.resolve(sourceDirectoryPath, "app.less");
  }
  return gulp.task("less:watch", function(cb) {
    if (!(enabled && watchEnabled)) {
      log.info("Skipping less:watch: Disabled.");
      return cb();
    }
    log.debug("[less:watch] Entry file path: `" + entryFilePath + "`.");
    log.debug("[less:watch] Target directory path: `" + targetDirectoryPath + "`.");
    fs.exists(entryFilePath, function(exists) {
      var compile;
      if (!exists) {
        log.info("Skipping less:compile: File `" + entryFilePath + "` not found.");
        return cb();
      }
      compile = function() {
        return gulp.src(entryFilePath).pipe(gulpLess()).pipe(gulp.dest(targetDirectoryPath)).pipe(gulpLivereload({
          auto: false
        }));
      };
      watcher.on("change", function(filePath) {
        if (!filePath.match(/\.less/)) {
          return;
        }
        log.debug("[less:watch] Compiling `" + entryFilePath + "`.");
        return compile();
      });
      watcher.on("add", function(filePath) {
        if (!filePath.match(/\.less/)) {
          return;
        }
        log.debug("[less:watch] Compiling `" + entryFilePath + "`.");
        return compile();
      });
      return watcher.on("unlink", function(filePath) {
        if (!filePath.match(/\.less/)) {
          return;
        }
        log.debug("[less:watch] Compiling `" + entryFilePath + "`.");
        return compile();
      });
    });
  });
};

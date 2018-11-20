var copy, diskWatcher, fs, gulp, log, minimatch, ref, rm;

fs = require("fs");

gulp = require("gulp");

minimatch = require("minimatch");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

ref = require("../../lib/files"), copy = ref.copy, rm = ref.rm;

module.exports = function(coffeeProjectOptions) {
  var enabled, excluded, options, sourceDirectoryPath, targetDirectoryPath, watchEnabled;
  options = coffeeProjectOptions.copy;
  enabled = options.enabled;
  excluded = options.excluded;
  sourceDirectoryPath = options.sourceDirectoryPath;
  targetDirectoryPath = options.targetDirectoryPath;
  watchEnabled = coffeeProjectOptions.watch.enabled;
  return gulp.task("copy:watch", function(cb) {
    var watcher;
    if (!(enabled && watchEnabled)) {
      log.info("Skipping copy:watch: Disabled.");
      return cb();
    }
    log.debug("[copy:watch] Source directory path: `" + sourceDirectoryPath + "`.");
    log.debug("[copy:watch] Target directory path: `" + targetDirectoryPath + "`.");
    watcher = diskWatcher(coffeeProjectOptions).src();
    watcher.on("change", function(filePath) {
      var exclude, i, len;
      for (i = 0, len = excluded.length; i < len; i++) {
        exclude = excluded[i];
        if (minimatch(filePath, exclude)) {
          return;
        }
      }
      log.debug("[copy:watch] Copying: `" + filePath + "`.");
      return copy(filePath, sourceDirectoryPath, targetDirectoryPath, function(error) {
        if (error) {
          return log.error(error);
        }
      });
    });
    watcher.on("add", function(filePath) {
      var exclude, i, len;
      for (i = 0, len = excluded.length; i < len; i++) {
        exclude = excluded[i];
        if (minimatch(filePath, exclude)) {
          return;
        }
      }
      log.debug("[copy:watch] Copying: `" + filePath + "`.");
      return copy(filePath, sourceDirectoryPath, targetDirectoryPath, function(error) {
        if (error) {
          return log.error(error);
        }
      });
    });
    watcher.on("unlink", function(filePath) {
      var exclude, i, len;
      for (i = 0, len = excluded.length; i < len; i++) {
        exclude = excluded[i];
        if (minimatch(filePath, exclude)) {
          return;
        }
      }
      log.debug("[copy:watch] Removing: `" + filePath + "`.");
      return rm(filePath, sourceDirectoryPath, targetDirectoryPath, function(error) {
        if (error) {
          return log.error(error);
        }
      });
    });
  });
};

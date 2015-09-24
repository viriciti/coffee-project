var copy, diskWatcher, enabled, excluded, fs, gulp, gulpLivereload, gulpTap, log, minimatch, options, path, ref, reloadPath, rm, sourceDirectoryPath, targetDirectoryPath, watchEnabled;

fs = require("fs");

path = require("path");

gulp = require("gulp");

gulpLivereload = require("gulp-livereload");

gulpTap = require("gulp-tap");

minimatch = require("minimatch");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

ref = require("../../lib/files"), copy = ref.copy, rm = ref.rm;

options = coffeeProjectOptions.copy;

enabled = options.enabled;

excluded = options.excluded;

sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

watchEnabled = coffeeProjectOptions.watch.enabled;

reloadPath = function(path) {
  if (path.match(/\.jade$/)) {
    return;
  }
  return gulpLivereload({
    auto: false
  }).write({
    path: path
  });
};

gulp.task("copy:watch", ["copy:compile", "livereload:run"], function(cb) {
  if (!(enabled === true && watchEnabled === true)) {
    log.info("Skipping copy:watch: Disabled.");
    return cb();
  }
  log.debug("[copy:watch] Source directory path: `" + sourceDirectoryPath + "`.");
  log.debug("[copy:watch] Target directory path: `" + targetDirectoryPath + "`.");
  diskWatcher.src().on("change", function(options) {
    var exclude, i, len;
    for (i = 0, len = excluded.length; i < len; i++) {
      exclude = excluded[i];
      if (minimatch(options.path, exclude)) {
        return;
      }
    }
    switch (options.type) {
      case "changed":
        log.debug("[copy:watch] Copying: `" + options.path + "`.");
        return copy(options.path, sourceDirectoryPath, targetDirectoryPath, function(error) {
          if (error) {
            log.error(error);
          }
          return reloadPath(options.path);
        });
      case "added":
        log.debug("[copy:watch] Copying: `" + options.path + "`.");
        return copy(options.path, sourceDirectoryPath, targetDirectoryPath, function(error) {
          if (error) {
            log.error(error);
          }
          return reloadPath(options.path);
        });
      case "deleted":
        log.debug("[copy:watch] Removing: `" + options.path + "`.");
        return rm(options.path, targetDirectoryPath, function(error) {
          if (error) {
            return log.error(error);
          }
        });
    }
  });
});

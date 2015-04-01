var child, enabled, entryFilePath, forever, fs, gulp, log, options, path, watchDirectoryPath;

fs = require("fs");

path = require("path");

forever = require("forever-monitor");

gulp = require("gulp");

log = require("../../lib/log");

options = coffeeProjectOptions.forever;

enabled = options.enabled;

entryFilePath = path.resolve(options.entryFilePath);

options = coffeeProjectOptions.forever;

watchDirectoryPath = path.resolve(options.watchDirectoryPath);

child = null;

gulp.task("forever:run", ["compile"], function(cb) {
  if (enabled !== true) {
    log.info("Skipping forever:run: Disabled.");
    return cb();
  }
  child = new forever.Monitor(entryFilePath, {
    watch: true,
    watchDirectory: watchDirectoryPath,
    minUptime: 2000,
    spinSleepTime: 1000
  });
  child.start();
  return cb();
});

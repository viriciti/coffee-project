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
    watchDirectory: watchDirectoryPath
  });
  child.start();
  return cb();
});

var forever, fs, gulp, log, path;

forever = require("forever-monitor");

fs = require("fs");

gulp = require("gulp");

path = require("path");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var child, enabled, entryFilePath, options, watchDirectoryPath;
  options = coffeeProjectOptions.forever;
  enabled = options.enabled;
  entryFilePath = path.resolve(options.entryFilePath);
  watchDirectoryPath = options.watchDirectoryPath;
  child = null;
  return gulp.task("forever:run", function(cb) {
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
    cb();
  });
};

var cleanBuildDirectory, gulp, log, path;

path = require("path");

gulp = require("gulp");

log = require("../lib/log");

cleanBuildDirectory = require("../lib/clean").cleanBuildDirectory;

module.exports = function(coffeeProjectOptions) {
  var clientDirectoryPath, enabled, options, serverDirectoryPath, targetDirectoryPath;
  options = coffeeProjectOptions.clean;
  enabled = options.enabled;
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  clientDirectoryPath = path.resolve(options.clientDirectoryPath);
  serverDirectoryPath = path.resolve(options.serverDirectoryPath);
  gulp.task("clean:client", function(cb) {
    if (!enabled) {
      log.info("Skipping clean client: Disabled.");
      return cb();
    }
    log.debug("[clean] Cleaning client build path `" + clientDirectoryPath + "`.");
    cleanBuildDirectory(clientDirectoryPath, cb);
  });
  gulp.task("clean:server", function(cb) {
    if (!enabled) {
      log.info("Skipping clean server: Disabled.");
      return cb();
    }
    log.debug("[clean] Cleaning server build path `" + serverDirectoryPath + "`.");
    cleanBuildDirectory(serverDirectoryPath, cb);
  });
  return gulp.task("clean", ["clean:client", "clean:server"], function(cb) {
    cb();
    process.exit();
  });
};

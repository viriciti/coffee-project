var cleanBuildDirectory, gulp, log, path;

path = require("path");

gulp = require("gulp");

log = require("../lib/log");

cleanBuildDirectory = require("../lib/clean").cleanBuildDirectory;

module.exports = function(coffeeProjectOptions) {
  var enabled, options, targetDirectoryPath;
  options = coffeeProjectOptions.clean;
  enabled = options.enabled;
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  return gulp.task("clean", function(cb) {
    if (!enabled) {
      log.info("Skipping clean: Disabled.");
      return cb();
    }
    log.debug("[clean] Cleaning `" + targetDirectoryPath + "`.");
    return cleanBuildDirectory(targetDirectoryPath, cb);
  });
};

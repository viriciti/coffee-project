var cleanBuildDirectory, enabled, gulp, log, options, path, targetDirectoryPath;

path = require("path");

gulp = require("gulp");

log = require("../lib/log");

cleanBuildDirectory = require("../lib/clean").cleanBuildDirectory;

options = coffeeProjectOptions.clean;

enabled = options.enabled;

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

gulp.task("clean", function(cb) {
  if (enabled !== true) {
    log.info("Skipping clean: Disabled.");
    return cb();
  }
  log.debug("[clean] Cleaning `" + targetDirectoryPath + "`.");
  cleanBuildDirectory(targetDirectoryPath, cb);
});

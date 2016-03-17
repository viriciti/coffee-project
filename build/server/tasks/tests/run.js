var gulp, log, path, tests;

gulp = require("gulp");

path = require("path");

log = require("../../lib/log");

tests = require("../../lib/tests");

module.exports = function(coffeeProjectOptions) {
  var directoryPath, enabled, options;
  options = coffeeProjectOptions.tests;
  enabled = options.enabled;
  directoryPath = path.resolve(options.directoryPath);
  return gulp.task("tests:run", function(cb) {
    if (!enabled) {
      log.info("Skipping tests:run: Disabled.");
      return cb();
    }
    log.debug("[tests:run] Directory path: `" + directoryPath + "`.");
    tests(directoryPath, true, "spec", cb);
  });
};

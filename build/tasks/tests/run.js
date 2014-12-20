var directoryPath, enabled, gulp, log, options, path, tests;

gulp = require("gulp");

path = require("path");

log = require("../../lib/log");

tests = require("../../lib/tests");

options = coffeeProjectOptions.tests;

enabled = options.enabled;

directoryPath = path.resolve(options.directoryPath);

gulp.task("tests:run", ["compile"], function(cb) {
  if (!enabled) {
    log.info("Skipping tests:run: Disabled.");
    return cb();
  }
  log.debug("[tests:run] Directory path: `" + directoryPath + "`.");
  tests(directoryPath, true, "spec", cb);
});

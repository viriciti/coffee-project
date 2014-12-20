var changeHandler, directoryPath, diskWatcher, enabled, fs, gulp, log, options, path, runTests, tests, watchEnabled;

fs = require("fs");

path = require("path");

gulp = require("gulp");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

tests = require("../../lib/tests");

options = coffeeProjectOptions.tests;

enabled = options.enabled;

directoryPath = path.resolve(options.directoryPath);

watchEnabled = coffeeProjectOptions.watch.enabled;

runTests = function() {
  return tests(directoryPath, false, "spec", function() {});
};

changeHandler = function(options) {
  if (!options.path.match(/\.coffee/)) {
    return;
  }
  return runTests();
};

gulp.task("tests:watch", ["compile"], function(cb) {
  if (!(enabled && watchEnabled)) {
    log.info("Skipping tests:watch: Disabled.");
    return cb();
  }
  log.debug("[tests:watch] Directory path: `" + directoryPath + "`.");
  diskWatcher.src().on("change", changeHandler);
  diskWatcher.test().on("change", changeHandler);
  runTests();
});

var diskWatcher, fs, gulp, log, path, tests;

fs = require("fs");

path = require("path");

gulp = require("gulp");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

tests = require("../../lib/tests");

module.exports = function(coffeeProjectOptions) {
  var changeHandler, directoryPath, enabled, options, runTests, sourceWatcher, testWatcher, watchEnabled;
  options = coffeeProjectOptions.tests;
  enabled = options.enabled;
  directoryPath = path.resolve(options.directoryPath);
  watchEnabled = coffeeProjectOptions.watch.enabled;
  sourceWatcher = diskWatcher(coffeeProjectOptions).src();
  testWatcher = diskWatcher(coffeeProjectOptions).test();
  runTests = function(somePath) {
    var filename, testFilePath;
    somePath || (somePath = directoryPath);
    if (0 !== somePath.indexOf(directoryPath)) {
      filename = somePath.split("/").pop();
      testFilePath = path.resolve(directoryPath, "./", (filename.split(".").shift()) + "_test.coffee");
      if (fs.existsSync(testFilePath)) {
        somePath = testFilePath;
      }
    }
    return tests(somePath, false, "spec", function() {});
  };
  changeHandler = function(filePath) {
    if (!filePath.match(/\.coffee/)) {
      return;
    }
    return runTests(filePath);
  };
  return gulp.task("tests:watch", function(cb) {
    if (!(enabled && watchEnabled)) {
      log.info("Skipping tests:watch: Disabled.");
      return cb();
    }
    log.debug("[tests:watch] Directory path: `" + directoryPath + "`.");
    sourceWatcher.on("change", changeHandler);
    sourceWatcher.on("add", changeHandler);
    sourceWatcher.on("unlink", changeHandler);
    testWatcher.on("change", changeHandler);
    testWatcher.on("add", changeHandler);
    testWatcher.on("unlink", changeHandler);
    return runTests();
  });
};

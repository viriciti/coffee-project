var applyDefaults, defaults, log, lsr, sourceClientDirectoryPath, sourceDirectoryPath, sourceServerDirectoryPath, targetClientDirectoryPath, targetDirectoryPath, targetServerDirectoryPath, testDirectoryPath;

log = require("./lib/log");

lsr = require("lsr");

defaults = {};

sourceDirectoryPath = "src";

targetDirectoryPath = "build";

testDirectoryPath = "test";

sourceClientDirectoryPath = sourceDirectoryPath + "/client";

sourceServerDirectoryPath = sourceDirectoryPath + "/server";

targetClientDirectoryPath = targetDirectoryPath + "/client";

targetServerDirectoryPath = targetDirectoryPath + "/server";

defaults.browserify = {
  enabled: true,
  entryFilePath: targetDirectoryPath + "/client/js/app/app.js",
  targetDirectoryPath: targetClientDirectoryPath + "/js",
  targetFilename: "app.bundle.js",
  paths: [targetClientDirectoryPath + "/js/app"]
};

defaults.clean = {
  enabled: true,
  targetDirectoryPath: targetDirectoryPath
};

defaults.coffee = {
  enabled: true,
  sourceDirectoryPath: sourceDirectoryPath,
  targetDirectoryPath: targetDirectoryPath
};

defaults.copy = {
  enabled: true,
  excluded: ["**/*.coffee", "**/*.less"],
  sourceDirectoryPath: sourceDirectoryPath,
  targetDirectoryPath: targetDirectoryPath
};

defaults.documentation = {
  enabled: true,
  sourceDirectoryPath: sourceDirectoryPath,
  targetDirectoryPath: targetDirectoryPath
};

defaults.less = {
  enabled: true,
  entryFilePath: sourceClientDirectoryPath + "/less/app.less",
  targetDirectoryPath: targetClientDirectoryPath + "/css"
};

defaults.livereload = {
  enabled: true
};

defaults.nodemon = {
  enabled: false,
  entryFilePath: "app.js",
  watchGlob: [sourceServerDirectoryPath + "/**/*.js"]
};

defaults.forever = {
  enabled: true,
  entryFilePath: "app.js",
  watchDirectoryPath: sourceServerDirectoryPath
};

defaults.tests = {
  enabled: true,
  directoryPath: "test"
};

defaults.watch = {
  enabled: true,
  sourceDirectoryPath: sourceDirectoryPath,
  testDirectoryPath: testDirectoryPath
};

applyDefaults = function(options) {
  var k, results, task, taskOptions, v;
  results = [];
  for (task in defaults) {
    taskOptions = defaults[task];
    if (typeof taskOptions === "object") {
      results.push((function() {
        var results1;
        results1 = [];
        for (k in taskOptions) {
          v = taskOptions[k];
          if (options[task] == null) {
            options[task] = {};
          }
          if (options[task][k] == null) {
            results1.push(options[task][k] = v);
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      })());
    } else {
      results.push(options[task] = taskOptions);
    }
  }
  return results;
};

module.exports = function(options) {
  var i, len, stat, stats, tasksDirectoryPath;
  if (options == null) {
    options = {};
  }
  tasksDirectoryPath = __dirname + "/tasks";
  applyDefaults(options);
  global.coffeeProjectOptions = options;
  stats = lsr.sync(tasksDirectoryPath);
  for (i = 0, len = stats.length; i < len; i++) {
    stat = stats[i];
    if (!stat.isDirectory()) {
      log.debug("Requiring module", stat.fullPath);
      require(stat.fullPath);
    }
  }
};

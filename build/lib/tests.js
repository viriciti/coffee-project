var cp, fs, log, path, pathToMocha, tests;

fs = require("fs");

path = require("path");

cp = require("child_process");

log = require("./log");

pathToMocha = path.resolve("" + __dirname + "/../../node_modules/.bin/mocha");

tests = function(directory, exit, reporter, cb) {
  return fs.exists(directory, function(exists) {
    var childProcess;
    if (!exists) {
      log.info("Skipping mocha: Directory `" + directory + "` not found.");
      return cb();
    }
    childProcess = cp.spawn(pathToMocha, ["--recursive", "--compilers", "coffee:coffee-script/register", "--reporter", reporter, "test"]);
    childProcess.stdout.on("data", function(chunk) {
      return process.stdout.write(chunk);
    });
    childProcess.stderr.on("data", function(chunk) {
      return process.stderr.write(chunk);
    });
    return childProcess.once("close", function() {
      if (exit) {
        return process.exit();
      } else {
        return cb();
      }
    });
  });
};

module.exports = tests;

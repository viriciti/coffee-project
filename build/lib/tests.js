var _, async, cp, fs, log, path, possibleMochaPaths, tests;

_ = require("lodash");

async = require("async");

fs = require("fs");

path = require("path");

cp = require("child_process");

log = require("./log");

possibleMochaPaths = [path.resolve(__dirname, "./node_modules/.bin/mocha"), path.resolve(__dirname, "../node_modules/.bin/mocha"), path.resolve(__dirname, "../../node_modules/.bin/mocha"), path.resolve(__dirname, "../../../node_modules/.bin/mocha"), path.resolve(__dirname, "../../../../node_modules/.bin/mocha")];

tests = function(directory, exit, reporter, cb) {
  return async.map(possibleMochaPaths, function(pathToMocha, cb) {
    return fs.exists(pathToMocha, function(exists) {
      return cb(null, exists ? pathToMocha : false);
    });
  }, function(error, result) {
    var pathToMocha;
    if (error) {
      return cb(error);
    }
    pathToMocha = _.find(result);
    log.debug("Found mocha at: " + pathToMocha);
    return fs.exists(directory, function(exists) {
      var childProcess;
      if (!exists) {
        log.info("Skipping mocha: Directory `" + directory + "` not found.");
        return cb();
      }
      childProcess = cp.spawn(pathToMocha, ["--recursive", "--compilers", "coffee:coffee-script/register", "--reporter", reporter, directory]);
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
  });
};

module.exports = tests;

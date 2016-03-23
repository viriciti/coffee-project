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
    if (0 === somePath.indexOf(directoryPath)) {
      return tests(somePath, false, "spec", function() {});
    } else {
      filename = somePath.split("/").pop();
      testFilePath = path.resolve(directoryPath, "./", (filename.split(".").shift()) + "_test.coffee");
      if (fs.existsSync(testFilePath)) {
        return tests(testFilePath, false, "spec", function() {});
      }
    }
  };
  changeHandler = function(filePath) {
    if (!filePath.match(/\.coffee/)) {
      return;
    }
    log.debug("[tests:watch] responded to `" + filePath + "`");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tzL3Rlc3RzL3dhdGNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEVBQUEsR0FBTyxPQUFBLENBQVEsSUFBUjs7QUFDUCxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0FBQ1AsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztBQUVQLEdBQUEsR0FBYyxPQUFBLENBQVEsZUFBUjs7QUFDZCxXQUFBLEdBQWMsT0FBQSxDQUFRLHdCQUFSOztBQUNkLEtBQUEsR0FBYyxPQUFBLENBQVEsaUJBQVI7O0FBRWQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxvQkFBRDtBQUNoQixNQUFBO0VBQUEsT0FBQSxHQUFnQixvQkFBb0IsQ0FBQztFQUNyQyxPQUFBLEdBQWdCLE9BQU8sQ0FBQztFQUN4QixhQUFBLEdBQWdCLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLGFBQXJCO0VBQ2hCLFlBQUEsR0FBZ0Isb0JBQW9CLENBQUMsS0FBSyxDQUFDO0VBQzNDLGFBQUEsR0FBZ0IsV0FBQSxDQUFZLG9CQUFaLENBQWlDLENBQUMsR0FBbEMsQ0FBQTtFQUNoQixXQUFBLEdBQWdCLFdBQUEsQ0FBWSxvQkFBWixDQUFpQyxDQUFDLElBQWxDLENBQUE7RUFFaEIsUUFBQSxHQUFXLFNBQUMsUUFBRDtBQUNWLFFBQUE7SUFBQSxhQUFBLFdBQWE7SUFFYixJQUFHLENBQUEsS0FBSyxRQUFRLENBQUMsT0FBVCxDQUFpQixhQUFqQixDQUFSO2FBQ0MsS0FBQSxDQUFNLFFBQU4sRUFBZ0IsS0FBaEIsRUFBdUIsTUFBdkIsRUFBK0IsU0FBQSxHQUFBLENBQS9CLEVBREQ7S0FBQSxNQUFBO01BR0MsUUFBQSxHQUFlLFFBQVEsQ0FBQyxLQUFULENBQWUsR0FBZixDQUFtQixDQUFDLEdBQXBCLENBQUE7TUFDZixZQUFBLEdBQWUsSUFBSSxDQUFDLE9BQUwsQ0FBYSxhQUFiLEVBQTRCLElBQTVCLEVBQW9DLENBQUMsUUFBUSxDQUFDLEtBQVQsQ0FBZSxHQUFmLENBQW1CLENBQUMsS0FBcEIsQ0FBQSxDQUFELENBQUEsR0FBNkIsY0FBakU7TUFDZixJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsWUFBZCxDQUFIO2VBQ0MsS0FBQSxDQUFNLFlBQU4sRUFBb0IsS0FBcEIsRUFBMkIsTUFBM0IsRUFBbUMsU0FBQSxHQUFBLENBQW5DLEVBREQ7T0FMRDs7RUFIVTtFQVdYLGFBQUEsR0FBZ0IsU0FBQyxRQUFEO0lBQ2YsSUFBQSxDQUFjLFFBQVEsQ0FBQyxLQUFULENBQWUsVUFBZixDQUFkO0FBQUEsYUFBQTs7SUFDQSxHQUFHLENBQUMsS0FBSixDQUFVLDhCQUFBLEdBQStCLFFBQS9CLEdBQXdDLEdBQWxEO1dBQ0EsUUFBQSxDQUFTLFFBQVQ7RUFIZTtTQUtoQixJQUFJLENBQUMsSUFBTCxDQUFVLGFBQVYsRUFBeUIsU0FBQyxFQUFEO0lBQ3hCLElBQUEsQ0FBQSxDQUFPLE9BQUEsSUFBWSxZQUFuQixDQUFBO01BQ0MsR0FBRyxDQUFDLElBQUosQ0FBUyxpQ0FBVDtBQUNBLGFBQU8sRUFBQSxDQUFBLEVBRlI7O0lBSUEsR0FBRyxDQUFDLEtBQUosQ0FBVSxpQ0FBQSxHQUFrQyxhQUFsQyxHQUFnRCxJQUExRDtJQUVBLGFBQWEsQ0FBQyxFQUFkLENBQWlCLFFBQWpCLEVBQTJCLGFBQTNCO0lBQ0EsYUFBYSxDQUFDLEVBQWQsQ0FBaUIsS0FBakIsRUFBMkIsYUFBM0I7SUFDQSxhQUFhLENBQUMsRUFBZCxDQUFpQixRQUFqQixFQUEyQixhQUEzQjtJQUVBLFdBQVcsQ0FBQyxFQUFaLENBQWlCLFFBQWpCLEVBQTJCLGFBQTNCO0lBQ0EsV0FBVyxDQUFDLEVBQVosQ0FBaUIsS0FBakIsRUFBMkIsYUFBM0I7SUFDQSxXQUFXLENBQUMsRUFBWixDQUFpQixRQUFqQixFQUEyQixhQUEzQjtXQUVBLFFBQUEsQ0FBQTtFQWZ3QixDQUF6QjtBQXhCZ0IiLCJmaWxlIjoidGFza3MvdGVzdHMvd2F0Y2guanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJmcyAgID0gcmVxdWlyZSBcImZzXCJcbnBhdGggPSByZXF1aXJlIFwicGF0aFwiXG5ndWxwID0gcmVxdWlyZSBcImd1bHBcIlxuXG5sb2cgICAgICAgICA9IHJlcXVpcmUgXCIuLi8uLi9saWIvbG9nXCJcbmRpc2tXYXRjaGVyID0gcmVxdWlyZSBcIi4uLy4uL2xpYi9kaXNrLXdhdGNoZXJcIlxudGVzdHMgICAgICAgPSByZXF1aXJlIFwiLi4vLi4vbGliL3Rlc3RzXCJcblxubW9kdWxlLmV4cG9ydHMgPSAoY29mZmVlUHJvamVjdE9wdGlvbnMpIC0+XG5cdG9wdGlvbnMgICAgICAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy50ZXN0c1xuXHRlbmFibGVkICAgICAgID0gb3B0aW9ucy5lbmFibGVkXG5cdGRpcmVjdG9yeVBhdGggPSBwYXRoLnJlc29sdmUgb3B0aW9ucy5kaXJlY3RvcnlQYXRoXG5cdHdhdGNoRW5hYmxlZCAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy53YXRjaC5lbmFibGVkXG5cdHNvdXJjZVdhdGNoZXIgPSBkaXNrV2F0Y2hlcihjb2ZmZWVQcm9qZWN0T3B0aW9ucykuc3JjKClcblx0dGVzdFdhdGNoZXIgICA9IGRpc2tXYXRjaGVyKGNvZmZlZVByb2plY3RPcHRpb25zKS50ZXN0KClcblxuXHRydW5UZXN0cyA9IChzb21lUGF0aCkgLT5cblx0XHRzb21lUGF0aCBvcj0gZGlyZWN0b3J5UGF0aFxuXG5cdFx0aWYgMCBpcyBzb21lUGF0aC5pbmRleE9mIGRpcmVjdG9yeVBhdGhcblx0XHRcdHRlc3RzIHNvbWVQYXRoLCBmYWxzZSwgXCJzcGVjXCIsIC0+XG5cdFx0ZWxzZVxuXHRcdFx0ZmlsZW5hbWUgICAgID0gc29tZVBhdGguc3BsaXQoXCIvXCIpLnBvcCgpXG5cdFx0XHR0ZXN0RmlsZVBhdGggPSBwYXRoLnJlc29sdmUgZGlyZWN0b3J5UGF0aCwgXCIuL1wiLCBcIiN7ZmlsZW5hbWUuc3BsaXQoXCIuXCIpLnNoaWZ0KCl9X3Rlc3QuY29mZmVlXCJcblx0XHRcdGlmIGZzLmV4aXN0c1N5bmMgdGVzdEZpbGVQYXRoXG5cdFx0XHRcdHRlc3RzIHRlc3RGaWxlUGF0aCwgZmFsc2UsIFwic3BlY1wiLCAtPlxuXG5cdGNoYW5nZUhhbmRsZXIgPSAoZmlsZVBhdGgpIC0+XG5cdFx0cmV0dXJuIHVubGVzcyBmaWxlUGF0aC5tYXRjaCAvXFwuY29mZmVlL1xuXHRcdGxvZy5kZWJ1ZyBcIlt0ZXN0czp3YXRjaF0gcmVzcG9uZGVkIHRvIGAje2ZpbGVQYXRofWBcIlxuXHRcdHJ1blRlc3RzIGZpbGVQYXRoXG5cblx0Z3VscC50YXNrIFwidGVzdHM6d2F0Y2hcIiwgKGNiKSAtPlxuXHRcdHVubGVzcyBlbmFibGVkIGFuZCB3YXRjaEVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgdGVzdHM6d2F0Y2g6IERpc2FibGVkLlwiXG5cdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0bG9nLmRlYnVnIFwiW3Rlc3RzOndhdGNoXSBEaXJlY3RvcnkgcGF0aDogYCN7ZGlyZWN0b3J5UGF0aH1gLlwiXG5cblx0XHRzb3VyY2VXYXRjaGVyLm9uIFwiY2hhbmdlXCIsIGNoYW5nZUhhbmRsZXJcblx0XHRzb3VyY2VXYXRjaGVyLm9uIFwiYWRkXCIsICAgIGNoYW5nZUhhbmRsZXJcblx0XHRzb3VyY2VXYXRjaGVyLm9uIFwidW5saW5rXCIsIGNoYW5nZUhhbmRsZXJcblxuXHRcdHRlc3RXYXRjaGVyLm9uICAgXCJjaGFuZ2VcIiwgY2hhbmdlSGFuZGxlclxuXHRcdHRlc3RXYXRjaGVyLm9uICAgXCJhZGRcIiwgICAgY2hhbmdlSGFuZGxlclxuXHRcdHRlc3RXYXRjaGVyLm9uICAgXCJ1bmxpbmtcIiwgY2hhbmdlSGFuZGxlclxuXG5cdFx0cnVuVGVzdHMoKVxuIl19

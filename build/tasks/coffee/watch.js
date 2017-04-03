var diskWatcher, fs, gulp, gulpCoffee, gulpSourcemaps, log, path;

fs = require("fs");

gulp = require("gulp");

gulpCoffee = require("gulp-coffee");

gulpSourcemaps = require("gulp-sourcemaps");

path = require("path");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

module.exports = function(coffeeProjectOptions) {
  var enabled, isProduction, noSourcemaps, options, sourceDirectoryPath, targetDirectoryPath, watchEnabled;
  options = coffeeProjectOptions.coffee;
  enabled = options.enabled;
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  watchEnabled = coffeeProjectOptions.watch.enabled;
  isProduction = process.env.NODE_ENV === "production";
  noSourcemaps = isProduction ? true : !!options.noSourcemaps;
  return gulp.task("coffee:watch", function(cb) {
    var compilePath, removePath, watcher;
    if (!(enabled && watchEnabled)) {
      log.info("Skipping browserify:watch: Disabled.");
      return cb();
    }
    log.debug("[coffee:watch] Source directory path: `" + sourceDirectoryPath + "`.");
    log.debug("[coffee:watch] Target directory path: `" + targetDirectoryPath + "`.");
    compilePath = function(sourcePath) {
      var coffeeCompiler, s, sourceDirectory, targetDirectory;
      coffeeCompiler = gulpCoffee({
        bare: true
      });
      coffeeCompiler.on("error", log.error.bind(log));
      sourceDirectory = path.dirname(sourcePath);
      targetDirectory = sourceDirectory.replace(sourceDirectoryPath, targetDirectoryPath);
      s = gulp.src(sourcePath);
      if (!noSourcemaps) {
        s = s.pipe(gulpSourcemaps.init());
      }
      s = s.pipe(coffeeCompiler);
      if (!noSourcemaps) {
        s = s.pipe(gulpSourcemaps.write());
      }
      return s.pipe(gulp.dest(targetDirectory));
    };
    removePath = function(sourcePath) {
      var targetPath;
      targetPath = sourcePath.replace(sourceDirectoryPath, targetDirectoryPath).replace(".coffee", ".js");
      return fs.unlink(targetPath, function(error) {
        if (error) {
          return log.error(error);
        }
      });
    };
    watcher = diskWatcher(coffeeProjectOptions).src();
    watcher.on("change", function(filePath) {
      if (!filePath.match(/\.coffee$/)) {
        return;
      }
      if (!filePath.match(new RegExp(sourceDirectoryPath))) {
        return;
      }
      log.info("[coffee:watch] Compiling `" + filePath + "`.");
      return compilePath(filePath);
    });
    watcher.on("add", function(filePath) {
      if (!filePath.match(/\.coffee$/)) {
        return;
      }
      if (!filePath.match(new RegExp(sourceDirectoryPath))) {
        return;
      }
      log.info("[coffee:watch] Compiling `" + filePath + "`.");
      return compilePath(filePath);
    });
    watcher.on("unlink", function(filePath) {
      if (!filePath.match(/\.coffee$/)) {
        return;
      }
      if (!filePath.match(new RegExp(sourceDirectoryPath))) {
        return;
      }
      log.info("[coffee:watch] Removing `" + filePath + "`.");
      return removePath(filePath);
    });
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvY29mZmVlL3dhdGNoLmpzIiwic291cmNlcyI6WyJ0YXNrcy9jb2ZmZWUvd2F0Y2guY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFpQixPQUFBLENBQVEsSUFBUjs7QUFDakIsSUFBQSxHQUFpQixPQUFBLENBQVEsTUFBUjs7QUFDakIsVUFBQSxHQUFpQixPQUFBLENBQVEsYUFBUjs7QUFDakIsY0FBQSxHQUFpQixPQUFBLENBQVEsaUJBQVI7O0FBQ2pCLElBQUEsR0FBaUIsT0FBQSxDQUFRLE1BQVI7O0FBRWpCLEdBQUEsR0FBYyxPQUFBLENBQVEsZUFBUjs7QUFDZCxXQUFBLEdBQWMsT0FBQSxDQUFRLHdCQUFSOztBQUVkLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsb0JBQUQ7QUFDaEIsTUFBQTtFQUFBLE9BQUEsR0FBc0Isb0JBQW9CLENBQUM7RUFDM0MsT0FBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxPQUFPLENBQUMsbUJBQXJCO0VBQ3RCLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLG1CQUFyQjtFQUN0QixZQUFBLEdBQXNCLG9CQUFvQixDQUFDLEtBQUssQ0FBQztFQUNqRCxZQUFBLEdBQXNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBWixLQUF3QjtFQUM5QyxZQUFBLEdBQXlCLFlBQUgsR0FBcUIsSUFBckIsR0FBZ0MsQ0FBSSxDQUFJLE9BQU8sQ0FBQztTQUV0RSxJQUFJLENBQUMsSUFBTCxDQUFVLGNBQVYsRUFBMEIsU0FBQyxFQUFEO0FBQ3pCLFFBQUE7SUFBQSxJQUFBLENBQUEsQ0FBTyxPQUFBLElBQVksWUFBbkIsQ0FBQTtNQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsc0NBQVQ7QUFDQSxhQUFPLEVBQUEsQ0FBQSxFQUZSOztJQUlBLEdBQUcsQ0FBQyxLQUFKLENBQVUseUNBQUEsR0FBMEMs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ICAgICAgICA9IHJlcXVpcmUgXCJmc1wiXG5ndWxwICAgICAgICAgICA9IHJlcXVpcmUgXCJndWxwXCJcbmd1bHBDb2ZmZWUgICAgID0gcmVxdWlyZSBcImd1bHAtY29mZmVlXCJcbmd1bHBTb3VyY2VtYXBzID0gcmVxdWlyZSBcImd1bHAtc291cmNlbWFwc1wiXG5wYXRoICAgICAgICAgICA9IHJlcXVpcmUgXCJwYXRoXCJcblxubG9nICAgICAgICAgPSByZXF1aXJlIFwiLi4vLi4vbGliL2xvZ1wiXG5kaXNrV2F0Y2hlciA9IHJlcXVpcmUgXCIuLi8uLi9saWIvZGlzay13YXRjaGVyXCJcblxubW9kdWxlLmV4cG9ydHMgPSAoY29mZmVlUHJvamVjdE9wdGlvbnMpIC0+XG5cdG9wdGlvbnMgICAgICAgICAgICAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy5jb2ZmZWVcblx0ZW5hYmxlZCAgICAgICAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHRzb3VyY2VEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMuc291cmNlRGlyZWN0b3J5UGF0aFxuXHR0YXJnZXREaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMudGFyZ2V0RGlyZWN0b3J5UGF0aFxuXHR3YXRjaEVuYWJsZWQgICAgICAgID0gY29mZmVlUHJvamVjdE9wdGlvbnMud2F0Y2guZW5hYmxlZFxuXHRpc1Byb2R1Y3Rpb24gICAgICAgID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgaXMgXCJwcm9kdWN0aW9uXCJcblx0bm9Tb3VyY2VtYXBzICAgICAgICA9IGlmIGlzUHJvZHVjdGlvbiB0aGVuIHRydWUgZWxzZSAobm90IG5vdCBvcHRpb25zLm5vU291cmNlbWFwcylcblxuXHRndWxwLnRhc2sgXCJjb2ZmZWU6d2F0Y2hcIiwgKGNiKSAtPlxuXHRcdHVubGVzcyBlbmFibGVkIGFuZCB3YXRjaEVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgYnJvd3NlcmlmeTp3YXRjaDogRGlzYWJsZWQuXCJcblx0XHRcdHJldHVybiBjYigpXG5cblx0XHRsb2cuZGVidWcgXCJbY29mZmVlOndhdGNoXSBTb3VyY2UgZGlyZWN0b3J5IHBhdGg6IGAje3NvdXJjZURpcmVjdG9yeVBhdGh9YC5cIlxuXHRcdGxvZy5kZWJ1ZyBcIltjb2ZmZWU6d2F0Y2hdIFRhcmdldCBkaXJlY3RvcnkgcGF0aDogYCN7dGFyZ2V0RGlyZWN0b3J5UGF0aH1gLlwiXG5cblx0XHRjb21waWxlUGF0aCA9IChzb3VyY2VQYXRoKSAtPlxuXHRcdFx0Y29mZmVlQ29tcGlsZXIgPSBndWxwQ29mZmVlIGJhcmU6IHRydWVcblxuXHRcdFx0Y29mZmVlQ29tcGlsZXIub24gXCJlcnJvclwiLCBsb2cuZXJyb3IuYmluZCBsb2dcblxuXHRcdFx0c291cmNlRGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lIHNvdXJjZVBhdGhcblx0XHRcdHRhcmdldERpcmVjdG9yeSA9IHNvdXJjZURpcmVjdG9yeS5yZXBsYWNlIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGhcblxuXHRcdFx0cyA9IGd1bHAuc3JjIHNvdXJjZVBhdGhcblx0XHRcdHMgPSBzLnBpcGUgZ3VscFNvdXJjZW1hcHMuaW5pdCgpIHVubGVzcyBub1NvdXJjZW1hcHNcblx0XHRcdHMgPSBzLnBpcGUgY29mZmVlQ29tcGlsZXJcblx0XHRcdHMgPSBzLnBpcGUgZ3VscFNvdXJjZW1hcHMud3JpdGUoKSB1bmxlc3Mgbm9Tb3VyY2VtYXBzXG5cblx0XHRcdHMucGlwZSBndWxwLmRlc3QgdGFyZ2V0RGlyZWN0b3J5XG5cblx0XHRyZW1vdmVQYXRoID0gKHNvdXJjZVBhdGgpIC0+XG5cdFx0XHR0YXJnZXRQYXRoID0gc291cmNlUGF0aFxuXHRcdFx0XHQucmVwbGFjZSBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoXG5cdFx0XHRcdC5yZXBsYWNlIFwiLmNvZmZlZVwiLCBcIi5qc1wiXG5cblx0XHRcdGZzLnVubGluayB0YXJnZXRQYXRoLCAoZXJyb3IpIC0+XG5cdFx0XHRcdGxvZy5lcnJvciBlcnJvciBpZiBlcnJvclxuXG5cdFx0d2F0Y2hlciA9IGRpc2tXYXRjaGVyKGNvZmZlZVByb2plY3RPcHRpb25zKS5zcmMoKVxuXG5cdFx0d2F0Y2hlci5vbiBcImNoYW5nZVwiLCAoZmlsZVBhdGgpIC0+XG5cdFx0XHRyZXR1cm4gdW5sZXNzIGZpbGVQYXRoLm1hdGNoIC9cXC5jb2ZmZWUkL1xuXHRcdFx0cmV0dXJuIHVubGVzcyBmaWxlUGF0aC5tYXRjaCBuZXcgUmVnRXhwIHNvdXJjZURpcmVjdG9yeVBhdGhcblx0XHRcdGxvZy5pbmZvIFwiW2NvZmZlZTp3YXRjaF0gQ29tcGlsaW5nIGAje2ZpbGVQYXRofWAuXCJcblx0XHRcdGNvbXBpbGVQYXRoIGZpbGVQYXRoXG5cblx0XHR3YXRjaGVyLm9uIFwiYWRkXCIsIChmaWxlUGF0aCkgLT5cblx0XHRcdHJldHVybiB1bmxlc3MgZmlsZVBhdGgubWF0Y2ggL1xcLmNvZmZlZSQvXG5cdFx0XHRyZXR1cm4gdW5sZXNzIGZpbGVQYXRoLm1hdGNoIG5ldyBSZWdFeHAgc291cmNlRGlyZWN0b3J5UGF0aFxuXHRcdFx0bG9nLmluZm8gXCJbY29mZmVlOndhdGNoXSBDb21waWxpbmcgYCN7ZmlsZVBhdGh9YC5cIlxuXHRcdFx0Y29tcGlsZVBhdGggZmlsZVBhdGhcblxuXHRcdHdhdGNoZXIub24gXCJ1bmxpbmtcIiwgKGZpbGVQYXRoKSAtPlxuXHRcdFx0cmV0dXJuIHVubGVzcyBmaWxlUGF0aC5tYXRjaCAvXFwuY29mZmVlJC9cblx0XHRcdHJldHVybiB1bmxlc3MgZmlsZVBhdGgubWF0Y2ggbmV3IFJlZ0V4cCBzb3VyY2VEaXJlY3RvcnlQYXRoXG5cdFx0XHRsb2cuaW5mbyBcIltjb2ZmZWU6d2F0Y2hdIFJlbW92aW5nIGAje2ZpbGVQYXRofWAuXCJcblx0XHRcdHJlbW92ZVBhdGggZmlsZVBhdGhcblxuXHRcdHJldHVyblxuIl19

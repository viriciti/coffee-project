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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tzL2NvZmZlZS93YXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxFQUFBLEdBQWlCLE9BQUEsQ0FBUSxJQUFSOztBQUNqQixJQUFBLEdBQWlCLE9BQUEsQ0FBUSxNQUFSOztBQUNqQixVQUFBLEdBQWlCLE9BQUEsQ0FBUSxhQUFSOztBQUNqQixjQUFBLEdBQWlCLE9BQUEsQ0FBUSxpQkFBUjs7QUFDakIsSUFBQSxHQUFpQixPQUFBLENBQVEsTUFBUjs7QUFFakIsR0FBQSxHQUFjLE9BQUEsQ0FBUSxlQUFSOztBQUNkLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVI7O0FBRWQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxvQkFBRDtBQUNoQixNQUFBO0VBQUEsT0FBQSxHQUFzQixvQkFBb0IsQ0FBQztFQUMzQyxPQUFBLEdBQXNCLE9BQU8sQ0FBQztFQUM5QixtQkFBQSxHQUFzQixJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxtQkFBckI7RUFDdEIsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxPQUFPLENBQUMsbUJBQXJCO0VBQ3RCLFlBQUEsR0FBc0Isb0JBQW9CLENBQUMsS0FBSyxDQUFDO0VBQ2pELFlBQUEsR0FBc0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFaLEtBQXdCO0VBQzlDLFlBQUEsR0FBeUIsWUFBSCxHQUFxQixJQUFyQixHQUFnQyxDQUFJLENBQUksT0FBTyxDQUFDO1NBRXRFLElBQUksQ0FBQyxJQUFMLENBQVUsY0FBVixFQUEwQixTQUFDLEVBQUQ7QUFDekIsUUFBQTtJQUFBLElBQUEsQ0FBQSxDQUFPLE9BQUEsSUFBWSxZQUFuQixDQUFBO01BQ0MsR0FBRyxDQUFDLElBQUosQ0FBUyxzQ0FBVDtBQUNBLGFBQU8sRUFBQSxDQUFBLEVBRlI7O0lBSUEsR0FBRyxDQUFDLEtBQUosQ0FBVSx5Q0FBQSxHQUEwQyxtQkFBMUMsR0FBOEQsSUFBeEU7SUFDQSxHQUFHLENB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ZS8iLCJzb3VyY2VzQ29udGVudCI6WyJmcyAgICAgICAgICAgICA9IHJlcXVpcmUgXCJmc1wiXG5ndWxwICAgICAgICAgICA9IHJlcXVpcmUgXCJndWxwXCJcbmd1bHBDb2ZmZWUgICAgID0gcmVxdWlyZSBcImd1bHAtY29mZmVlXCJcbmd1bHBTb3VyY2VtYXBzID0gcmVxdWlyZSBcImd1bHAtc291cmNlbWFwc1wiXG5wYXRoICAgICAgICAgICA9IHJlcXVpcmUgXCJwYXRoXCJcblxubG9nICAgICAgICAgPSByZXF1aXJlIFwiLi4vLi4vbGliL2xvZ1wiXG5kaXNrV2F0Y2hlciA9IHJlcXVpcmUgXCIuLi8uLi9saWIvZGlzay13YXRjaGVyXCJcblxubW9kdWxlLmV4cG9ydHMgPSAoY29mZmVlUHJvamVjdE9wdGlvbnMpIC0+XG5cdG9wdGlvbnMgICAgICAgICAgICAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy5jb2ZmZWVcblx0ZW5hYmxlZCAgICAgICAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHRzb3VyY2VEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMuc291cmNlRGlyZWN0b3J5UGF0aFxuXHR0YXJnZXREaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMudGFyZ2V0RGlyZWN0b3J5UGF0aFxuXHR3YXRjaEVuYWJsZWQgICAgICAgID0gY29mZmVlUHJvamVjdE9wdGlvbnMud2F0Y2guZW5hYmxlZFxuXHRpc1Byb2R1Y3Rpb24gICAgICAgID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgaXMgXCJwcm9kdWN0aW9uXCJcblx0bm9Tb3VyY2VtYXBzICAgICAgICA9IGlmIGlzUHJvZHVjdGlvbiB0aGVuIHRydWUgZWxzZSAobm90IG5vdCBvcHRpb25zLm5vU291cmNlbWFwcylcblxuXHRndWxwLnRhc2sgXCJjb2ZmZWU6d2F0Y2hcIiwgKGNiKSAtPlxuXHRcdHVubGVzcyBlbmFibGVkIGFuZCB3YXRjaEVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgYnJvd3NlcmlmeTp3YXRjaDogRGlzYWJsZWQuXCJcblx0XHRcdHJldHVybiBjYigpXG5cblx0XHRsb2cuZGVidWcgXCJbY29mZmVlOndhdGNoXSBTb3VyY2UgZGlyZWN0b3J5IHBhdGg6IGAje3NvdXJjZURpcmVjdG9yeVBhdGh9YC5cIlxuXHRcdGxvZy5kZWJ1ZyBcIltjb2ZmZWU6d2F0Y2hdIFRhcmdldCBkaXJlY3RvcnkgcGF0aDogYCN7dGFyZ2V0RGlyZWN0b3J5UGF0aH1gLlwiXG5cblx0XHRjb21waWxlUGF0aCA9IChzb3VyY2VQYXRoKSAtPlxuXHRcdFx0Y29mZmVlQ29tcGlsZXIgPSBndWxwQ29mZmVlIGJhcmU6IHRydWVcblxuXHRcdFx0Y29mZmVlQ29tcGlsZXIub24gXCJlcnJvclwiLCBsb2cuZXJyb3IuYmluZCBsb2dcblxuXHRcdFx0c291cmNlRGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lIHNvdXJjZVBhdGhcblx0XHRcdHRhcmdldERpcmVjdG9yeSA9IHNvdXJjZURpcmVjdG9yeS5yZXBsYWNlIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGhcblxuXHRcdFx0cyA9IGd1bHAuc3JjIHNvdXJjZVBhdGhcblx0XHRcdHMgPSBzLnBpcGUgZ3VscFNvdXJjZW1hcHMuaW5pdCgpIHVubGVzcyBub1NvdXJjZW1hcHNcblx0XHRcdHMgPSBzLnBpcGUgY29mZmVlQ29tcGlsZXJcblx0XHRcdHMgPSBzLnBpcGUgZ3VscFNvdXJjZW1hcHMud3JpdGUoKSB1bmxlc3Mgbm9Tb3VyY2VtYXBzXG5cblx0XHRcdHMucGlwZSBndWxwLmRlc3QgdGFyZ2V0RGlyZWN0b3J5XG5cblx0XHRyZW1vdmVQYXRoID0gKHNvdXJjZVBhdGgpIC0+XG5cdFx0XHR0YXJnZXRQYXRoID0gc291cmNlUGF0aFxuXHRcdFx0XHQucmVwbGFjZSBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoXG5cdFx0XHRcdC5yZXBsYWNlIFwiLmNvZmZlZVwiLCBcIi5qc1wiXG5cblx0XHRcdGZzLnVubGluayB0YXJnZXRQYXRoLCAoZXJyb3IpIC0+XG5cdFx0XHRcdGxvZy5lcnJvciBlcnJvciBpZiBlcnJvclxuXG5cdFx0d2F0Y2hlciA9IGRpc2tXYXRjaGVyKGNvZmZlZVByb2plY3RPcHRpb25zKS5zcmMoKVxuXG5cdFx0d2F0Y2hlci5vbiBcImNoYW5nZVwiLCAoZmlsZVBhdGgpIC0+XG5cdFx0XHRyZXR1cm4gdW5sZXNzIGZpbGVQYXRoLm1hdGNoIC9cXC5jb2ZmZWUkL1xuXHRcdFx0cmV0dXJuIHVubGVzcyBmaWxlUGF0aC5tYXRjaCBuZXcgUmVnRXhwIHNvdXJjZURpcmVjdG9yeVBhdGhcblx0XHRcdGxvZy5pbmZvIFwiW2NvZmZlZTp3YXRjaF0gQ29tcGlsaW5nIGAje2ZpbGVQYXRofWAuXCJcblx0XHRcdGNvbXBpbGVQYXRoIGZpbGVQYXRoXG5cblx0XHR3YXRjaGVyLm9uIFwiYWRkXCIsIChmaWxlUGF0aCkgLT5cblx0XHRcdHJldHVybiB1bmxlc3MgZmlsZVBhdGgubWF0Y2ggL1xcLmNvZmZlZSQvXG5cdFx0XHRyZXR1cm4gdW5sZXNzIGZpbGVQYXRoLm1hdGNoIG5ldyBSZWdFeHAgc291cmNlRGlyZWN0b3J5UGF0aFxuXHRcdFx0bG9nLmluZm8gXCJbY29mZmVlOndhdGNoXSBDb21waWxpbmcgYCN7ZmlsZVBhdGh9YC5cIlxuXHRcdFx0Y29tcGlsZVBhdGggZmlsZVBhdGhcblxuXHRcdHdhdGNoZXIub24gXCJ1bmxpbmtcIiwgKGZpbGVQYXRoKSAtPlxuXHRcdFx0cmV0dXJuIHVubGVzcyBmaWxlUGF0aC5tYXRjaCAvXFwuY29mZmVlJC9cblx0XHRcdHJldHVybiB1bmxlc3MgZmlsZVBhdGgubWF0Y2ggbmV3IFJlZ0V4cCBzb3VyY2VEaXJlY3RvcnlQYXRoXG5cdFx0XHRsb2cuaW5mbyBcIltjb2ZmZWU6d2F0Y2hdIFJlbW92aW5nIGAje2ZpbGVQYXRofWAuXCJcblx0XHRcdHJlbW92ZVBhdGggZmlsZVBhdGhcblxuXHRcdHJldHVyblxuIl19

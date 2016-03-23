var diskWatcher, fs, gulp, gulpLess, gulpLivereload, gulpRename, log, path;

fs = require("fs");

gulp = require("gulp");

gulpLess = require("gulp-less");

gulpLivereload = require("gulp-livereload");

gulpRename = require("gulp-rename");

path = require("path");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

module.exports = function(coffeeProjectOptions) {
  var enabled, entryFilePath, options, sourceDirectoryPath, targetDirectoryPath, theme, themesDirectoryPath, watchEnabled, watcher;
  options = coffeeProjectOptions.less;
  enabled = options.enabled;
  theme = options.theme || "default";
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  themesDirectoryPath = path.resolve(sourceDirectoryPath, "themes");
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  watchEnabled = coffeeProjectOptions.watch.enabled;
  watcher = diskWatcher(coffeeProjectOptions).src();
  if (!theme) {
    entryFilePath = path.resolve(sourceDirectoryPath, "app.less");
  }
  return gulp.task("less:watch", function(cb) {
    if (!(enabled && watchEnabled)) {
      log.info("Skipping less:watch: Disabled.");
      return cb();
    }
    fs.exists(themesDirectoryPath, function(themesFolderExists) {
      log.debug("[less:watch] Theme folder does" + (themesFolderExists ? "" : " not") + " exist.");
      if (themesFolderExists) {
        entryFilePath = path.resolve(sourceDirectoryPath, "themes/" + theme + "/theme.less");
      } else {
        entryFilePath = path.resolve(sourceDirectoryPath, "app.less");
      }
      log.debug("[less:watch] Entry file path: `" + entryFilePath + "`.");
      log.debug("[less:watch] Target directory path: `" + targetDirectoryPath + "`.");
      return fs.exists(entryFilePath, function(exists) {
        var compile;
        if (!exists) {
          log.info("Skipping less:compile: File `" + entryFilePath + "` not found.");
          return cb();
        }
        compile = function() {
          return gulp.src(entryFilePath).pipe(gulpLess()).pipe(gulpRename(theme + ".css")).pipe(gulp.dest(targetDirectoryPath)).pipe(gulpLivereload({
            auto: false
          }));
        };
        watcher.on("change", function(filePath) {
          if (!filePath.match(/\.less/)) {
            return;
          }
          log.debug("[less:watch] Compiling `" + entryFilePath + "`.");
          return compile();
        });
        watcher.on("add", function(filePath) {
          if (!filePath.match(/\.less/)) {
            return;
          }
          log.debug("[less:watch] Compiling `" + entryFilePath + "`.");
          return compile();
        });
        watcher.on("unlink", function(filePath) {
          if (!filePath.match(/\.less/)) {
            return;
          }
          log.debug("[less:watch] Compiling `" + entryFilePath + "`.");
          return compile();
        });
        return cb();
      });
    });
  });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tzL2xlc3Mvd2F0Y2guY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFpQixPQUFBLENBQVEsSUFBUjs7QUFDakIsSUFBQSxHQUFpQixPQUFBLENBQVEsTUFBUjs7QUFDakIsUUFBQSxHQUFpQixPQUFBLENBQVEsV0FBUjs7QUFDakIsY0FBQSxHQUFpQixPQUFBLENBQVEsaUJBQVI7O0FBQ2pCLFVBQUEsR0FBaUIsT0FBQSxDQUFRLGFBQVI7O0FBQ2pCLElBQUEsR0FBaUIsT0FBQSxDQUFRLE1BQVI7O0FBRWpCLEdBQUEsR0FBYyxPQUFBLENBQVEsZUFBUjs7QUFDZCxXQUFBLEdBQWMsT0FBQSxDQUFRLHdCQUFSOztBQUVkLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsb0JBQUQ7QUFDaEIsTUFBQTtFQUFBLE9BQUEsR0FBc0Isb0JBQW9CLENBQUM7RUFDM0MsT0FBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsS0FBQSxHQUFzQixPQUFPLENBQUMsS0FBUixJQUFpQjtFQUN2QyxtQkFBQSxHQUFzQixJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxtQkFBckI7RUFDdEIsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxtQkFBYixFQUFrQyxRQUFsQztFQUN0QixtQkFBQSxHQUFzQixJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxtQkFBckI7RUFDdEIsWUFBQSxHQUFzQixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7RUFDakQsT0FBQSxHQUFzQixXQUFBLENBQVksb0JBQVosQ0FBaUMsQ0FBQyxHQUFsQyxDQUFBO0VBRXRCLElBQUEsQ0FBTyxLQUFQO0lBQ0MsYUFBQSxHQUFnQixJQUFJLENBQUMsT0FBTCxDQUFhLG1CQUFiLEVBQWtDLFVBQWxDLEVBRGpCOztTQUdBLElBQUksQ0FBQyxJQUFMLENBQVUsWUFBVixFQUF3QixTQUFDLEVBQUQ7SUFDdkIsSUFBQSxDQUFBLENBQU8sT0FBQSxJQUFZLFlBQW5CLENBQUE7TUFDQyxHQUFHLENBQUMsSUFBSixDQUFTLGdDQUFUO0FBQ0EsYUFBTyxFQUFBLENBQUEsRUFGUjs7SUFJQSxFQUFFLENBQUMsTUFBSCxDQUFVLG1CQUFWLEVBQStCLFNBQUMsa0JBQUQ7TUFDOUIsR0FBRyxDQUFDLEtBQUosQ0FBVSxnQ0FBQSxHQUFnQyxDQUFJLGtCQUFILEdBQTJCLEVBQTNCLEdBQW1DLE1BQXBDLENBQWhDLEdBQTJFLFNBQXJGO01BRUEsSUFBRyxrQkFBSDtRQUNDLGFBQUEsR0FBZ0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxtQkFBYixFQUFrQyxTQUFBLEdBQVUsS0FBVixHQUFnQixhQUFsRCxFQURqQjtPQUFBLE1BQUE7UUFHQyxhQUFBLEdBQWdCLElBQUksQ0FBQyxPQUFMLENBQWEsbUJBQWIsRUFBa0MsVUFBbEMsRUFIakI7O01BS0EsR0FBRyxDQUFDLEtBQUosQ0FBVSxpQ0FBQSxHQUFrQyxhQUFsQyxHQUFnRCxJQUExRDtNQUNBLEdBQUcsQ0FBQyxLQUFKLENBQVUsdUNBQUEsR0FBd0MsbUJBQXhDLEdBQTRELElBQXRFO2FBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxhQUFWLEVBQXlCLFNBQUMsTUFBRDtBQUN4QixZQUFBO1FBQUEsSUFBQSxDQUFPLE1BQVA7VUFDQyxHQUFHLENBQUMsSUFBSixDQUFTLCtCQUFBLEdBQWdDLGFBQWhDLEdBQThDLGNBQXZEO0FBQ0EsaUJBQU8sRUFBQSxDQUFBLEVBRlI7O1FBSUEsT0FBQSxHQUFVLFNBQUE7aUJBQ1QsSUFBSSxDQUFDLEdBQUwsQ0FBUyxhQUFULENBQ0MsQ0FBQyxJQURGLENBQ08sUUFBQSxDQUFBLENBRFAsQ0FFQyxDQUFDLElBRkYsQ0FFTyxVQUFBLENBQWMsS0FBRCxHQUFPLE1BQXBCLENBRlAsQ0FHQyxDQUFDLElBSEYsQ0FHTyxJQUFJLENBQUMsSUFBTCxDQUFVLG1CQUFWLENBSFAsQ0FJQyxDQUFDLElBSkYsQ0FJTyxjQUFBLENBQWU7WUFBQSxJQUFBLEVBQU0sS0FBTjtXQUFmLENBSlA7UUFEUztRQU9WLE9BQU8sQ0FBQyxFQUFSLENBQVcsUUFBWCxFQUFxQixTQUFDLFFBQUQ7VUFDcEIsSUFBQSxDQUFjLFFBQVEsQ0FBQyxLQUFULENBQWUsUUFBZixDQUFkO0FBQUEsbUJBQUE7O1VBQ0EsR0FBRyxDQUFDLEtBQUosQ0FBVSwwQkFBQSxHQUEyQixhQUEzQixHQUF5QyxJQUFuRDtpQkFDQSxPQUFBLENBQUE7UUFIb0IsQ0FBckI7UUFLQSxPQUFPLENBQUMsRUFBUixDQUFXLEtBQVgsRUFBa0IsU0FBQyxRQUFEO1VBQ2pCLElBQUEsQ0FBYyxRQUFRLENBQUMsS0FBVCxDQUFlLFFBQWYsQ0FBZDtBQUFBLG1CQUFBOztVQUNBLEdBQUcsQ0FBQyxLQUFKLENBQVUsMEJBQUEsR0FBMkIsYUFBM0IsR0FBeUMsSUFBbkQ7aUJBQ0EsT0FBQSxDQUFBO1FBSGlCLENBQWxCO1FBS0EsT0FBTyxDQUFDLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFNBQUMsUUFBRDtVQUNwQixJQUFBLENBQWMsUUFBUSxDQUFDLEtBQVQsQ0FBZSxRQUFmLENBQWQ7QUFBQSxtQkFBQTs7VUFDQSxHQUFHLENBQUMsS0FBSixDQUFVLDBCQUFBLEdBQTJCLGFBQTNCLEdBQXlDLElBQW5EO2lCQUNBLE9BQUEsQ0FBQTtRQUhvQixDQUFyQjtlQUtBLEVBQUEsQ0FBQTtNQTNCd0IsQ0FBekI7SUFYOEIsQ0FBL0I7RUFMdUIsQ0FBeEI7QUFiZ0IiLCJmaWxlIjoidGFza3MvbGVzcy93YXRjaC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImZzICAgICAgICAgICAgID0gcmVxdWlyZSBcImZzXCJcbmd1bHAgICAgICAgICAgID0gcmVxdWlyZSBcImd1bHBcIlxuZ3VscExlc3MgICAgICAgPSByZXF1aXJlIFwiZ3VscC1sZXNzXCJcbmd1bHBMaXZlcmVsb2FkID0gcmVxdWlyZSBcImd1bHAtbGl2ZXJlbG9hZFwiXG5ndWxwUmVuYW1lICAgICA9IHJlcXVpcmUgXCJndWxwLXJlbmFtZVwiXG5wYXRoICAgICAgICAgICA9IHJlcXVpcmUgXCJwYXRoXCJcblxubG9nICAgICAgICAgPSByZXF1aXJlIFwiLi4vLi4vbGliL2xvZ1wiXG5kaXNrV2F0Y2hlciA9IHJlcXVpcmUgXCIuLi8uLi9saWIvZGlzay13YXRjaGVyXCJcblxubW9kdWxlLmV4cG9ydHMgPSAoY29mZmVlUHJvamVjdE9wdGlvbnMpIC0+XG5cdG9wdGlvbnMgICAgICAgICAgICAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy5sZXNzXG5cdGVuYWJsZWQgICAgICAgICAgICAgPSBvcHRpb25zLmVuYWJsZWRcblx0dGhlbWUgICAgICAgICAgICAgICA9IG9wdGlvbnMudGhlbWUgb3IgXCJkZWZhdWx0XCJcblx0c291cmNlRGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZSBvcHRpb25zLnNvdXJjZURpcmVjdG9yeVBhdGhcblx0dGhlbWVzRGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZSBzb3VyY2VEaXJlY3RvcnlQYXRoLCBcInRoZW1lc1wiXG5cdHRhcmdldERpcmVjdG9yeVBhdGggPSBwYXRoLnJlc29sdmUgb3B0aW9ucy50YXJnZXREaXJlY3RvcnlQYXRoXG5cdHdhdGNoRW5hYmxlZCAgICAgICAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy53YXRjaC5lbmFibGVkXG5cdHdhdGNoZXIgICAgICAgICAgICAgPSBkaXNrV2F0Y2hlcihjb2ZmZWVQcm9qZWN0T3B0aW9ucykuc3JjKClcblxuXHR1bmxlc3MgdGhlbWVcblx0XHRlbnRyeUZpbGVQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwiYXBwLmxlc3NcIlxuXG5cdGd1bHAudGFzayBcImxlc3M6d2F0Y2hcIiwgKGNiKSAtPlxuXHRcdHVubGVzcyBlbmFibGVkIGFuZCB3YXRjaEVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgbGVzczp3YXRjaDogRGlzYWJsZWQuXCJcblx0XHRcdHJldHVybiBjYigpXG5cblx0XHRmcy5leGlzdHMgdGhlbWVzRGlyZWN0b3J5UGF0aCwgKHRoZW1lc0ZvbGRlckV4aXN0cykgLT5cblx0XHRcdGxvZy5kZWJ1ZyBcIltsZXNzOndhdGNoXSBUaGVtZSBmb2xkZXIgZG9lcyN7aWYgdGhlbWVzRm9sZGVyRXhpc3RzIHRoZW4gXCJcIiBlbHNlIFwiIG5vdFwifSBleGlzdC5cIlxuXG5cdFx0XHRpZiB0aGVtZXNGb2xkZXJFeGlzdHNcblx0XHRcdFx0ZW50cnlGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZSBzb3VyY2VEaXJlY3RvcnlQYXRoLCBcInRoZW1lcy8je3RoZW1lfS90aGVtZS5sZXNzXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZW50cnlGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZSBzb3VyY2VEaXJlY3RvcnlQYXRoLCBcImFwcC5sZXNzXCJcblxuXHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6d2F0Y2hdIEVudHJ5IGZpbGUgcGF0aDogYCN7ZW50cnlGaWxlUGF0aH1gLlwiXG5cdFx0XHRsb2cuZGVidWcgXCJbbGVzczp3YXRjaF0gVGFyZ2V0IGRpcmVjdG9yeSBwYXRoOiBgI3t0YXJnZXREaXJlY3RvcnlQYXRofWAuXCJcblxuXHRcdFx0ZnMuZXhpc3RzIGVudHJ5RmlsZVBhdGgsIChleGlzdHMpIC0+XG5cdFx0XHRcdHVubGVzcyBleGlzdHNcblx0XHRcdFx0XHRsb2cuaW5mbyBcIlNraXBwaW5nIGxlc3M6Y29tcGlsZTogRmlsZSBgI3tlbnRyeUZpbGVQYXRofWAgbm90IGZvdW5kLlwiXG5cdFx0XHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdFx0XHRjb21waWxlID0gLT5cblx0XHRcdFx0XHRndWxwLnNyYyBlbnRyeUZpbGVQYXRoXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwTGVzcygpXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwUmVuYW1lIFwiI3t0aGVtZX0uY3NzXCJcblx0XHRcdFx0XHRcdC5waXBlIGd1bHAuZGVzdCB0YXJnZXREaXJlY3RvcnlQYXRoXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwTGl2ZXJlbG9hZCBhdXRvOiBmYWxzZVxuXG5cdFx0XHRcdHdhdGNoZXIub24gXCJjaGFuZ2VcIiwgKGZpbGVQYXRoKSAtPlxuXHRcdFx0XHRcdHJldHVybiB1bmxlc3MgZmlsZVBhdGgubWF0Y2ggL1xcLmxlc3MvXG5cdFx0XHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6d2F0Y2hdIENvbXBpbGluZyBgI3tlbnRyeUZpbGVQYXRofWAuXCJcblx0XHRcdFx0XHRjb21waWxlKClcblxuXHRcdFx0XHR3YXRjaGVyLm9uIFwiYWRkXCIsIChmaWxlUGF0aCkgLT5cblx0XHRcdFx0XHRyZXR1cm4gdW5sZXNzIGZpbGVQYXRoLm1hdGNoIC9cXC5sZXNzL1xuXHRcdFx0XHRcdGxvZy5kZWJ1ZyBcIltsZXNzOndhdGNoXSBDb21waWxpbmcgYCN7ZW50cnlGaWxlUGF0aH1gLlwiXG5cdFx0XHRcdFx0Y29tcGlsZSgpXG5cblx0XHRcdFx0d2F0Y2hlci5vbiBcInVubGlua1wiLCAoZmlsZVBhdGgpIC0+XG5cdFx0XHRcdFx0cmV0dXJuIHVubGVzcyBmaWxlUGF0aC5tYXRjaCAvXFwubGVzcy9cblx0XHRcdFx0XHRsb2cuZGVidWcgXCJbbGVzczp3YXRjaF0gQ29tcGlsaW5nIGAje2VudHJ5RmlsZVBhdGh9YC5cIlxuXHRcdFx0XHRcdGNvbXBpbGUoKVxuXG5cdFx0XHRcdGNiKClcblxuXHRcdHJldHVyblxuIl19

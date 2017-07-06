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
        theme = "app";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvbGVzcy93YXRjaC5qcyIsInNvdXJjZXMiOlsidGFza3MvbGVzcy93YXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxFQUFBLEdBQWlCLE9BQUEsQ0FBUSxJQUFSOztBQUNqQixJQUFBLEdBQWlCLE9BQUEsQ0FBUSxNQUFSOztBQUNqQixRQUFBLEdBQWlCLE9BQUEsQ0FBUSxXQUFSOztBQUNqQixjQUFBLEdBQWlCLE9BQUEsQ0FBUSxpQkFBUjs7QUFDakIsVUFBQSxHQUFpQixPQUFBLENBQVEsYUFBUjs7QUFDakIsSUFBQSxHQUFpQixPQUFBLENBQVEsTUFBUjs7QUFFakIsR0FBQSxHQUFjLE9BQUEsQ0FBUSxlQUFSOztBQUNkLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVI7O0FBRWQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxvQkFBRDtBQUNoQixNQUFBO0VBQUEsT0FBQSxHQUFzQixvQkFBb0IsQ0FBQztFQUMzQyxPQUFBLEdBQXNCLE9BQU8sQ0FBQztFQUM5QixLQUFBLEdBQXNCLE9BQU8sQ0FBQyxLQUFSLElBQWlCO0VBQ3ZDLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLG1CQUFyQjtFQUN0QixtQkFBQSxHQUFzQixJQUFJLENBQUMsT0FBTCxDQUFhLG1CQUFiLEVBQWtDLFFBQWxDO0VBQ3RCLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLG1CQUFyQjtFQUN0QixZQUFBLEdBQXNCLG9CQUFvQixDQUFDLEtBQUssQ0FBQztFQUNqRCxPQUFBLEdBQXNCLFdBQUEsQ0FBWSxvQkFBWixDQUFpQyxDQUFDLEdBQWxDLENBQUE7RUFFdEIsSUFBQSxDQUFPLEtBQVA7SUFDQyxhQUFBLEdBQWdCLElBQUksQ0FBQyxPQUFMLENBQWEsbUJBQWIsRUFBa0MsVUFBbEMsRUFEakI7O1NBR0EsSUFBSSxDQUFDLElBQUwsQ0FBVSxZQUFWLEVBQXdCLFNBQUMsRUFBRDtJQUN2QixJQUFBLENBQUEsQ0FBTyxPQUFBLElBQVksWUFBbkIsQ0FBQTtNQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsZ0NBQVQ7QUFDQSxhQUFPLEVBQUEsQ0FBQSxFQUZSOztJQUlBLEVBQUUsQ0FBQyxNQUFILENBQVUsbUJBQVYsRUFBK0IsU0FBQyxrQkFBRDtNQUM5QixHQUFHLENBQUMsS0FBSixDQUFVLGdDQUFBLEdBQWdDLENBQUksa0JBQUgsR0FBMkIsRUFBM0IsR0FBbUMsTUFBcEMsQ0FBaEMsR0FBMkUsU0FBckY7TUFFQSxJQUFHLGtCQUFIO1FBQ0MsYUFBQSxHQUFnQixJQUFJLENBQUMsT0FBTCxDQUFhLG1CQUFiLEVBQWtDLFNBQUEsR0FBVSxLQUFWLEdBQWdCLGFBQWxELEVBRGpCO09BQUEsTUFBQTtRQUdDLEtBQUEsR0FBZ0I7UUFDaEIsYUFBQSxHQUFnQixJQUFJLENBQUMsT0FBTCxDQUFhLG1CQUFiLEVBQWtDLFVBQWxDLEVBSmpCOztNQU1BLEdBQUcsQ0FBQyxLQUFKLENBQVUsaUNBQUEsR0FBa0MsYUFBbEMsR0FBZ0QsSUFBMUQ7TUFDQSxHQUFHLENBQUMsS0FBSixDQUFVLHVDQUFBLEdBQXdDLG1CQUF4QyxHQUE0RCxJQUF0RTthQUVBLEVBQUUsQ0FBQyxNQUFILENBQVUsYUFBVixFQUF5QixTQUFDLE1BQUQ7QUFDeEIsWUFBQTtRQUFBLElBQUEsQ0FBTyxNQUFQO1VBQ0MsR0FBRyxDQUFDLElBQUosQ0FBUywrQkFBQSxHQUFnQyxhQUFoQyxHQUE4QyxjQUF2RDtBQUNBLGlCQUFPLEVBQUEsQ0FBQSxFQUZSOztRQUlBLE9BQUEsR0FBVSxTQUFBO2lCQUNULElBQUksQ0FBQyxHQUFMLENBQVMsYUFBVCxDQUNDLENBQUMsSUFERixDQUNPLFFBQUEsQ0FBQSxDQURQLENBRUMsQ0FBQyxJQUZGLENBRU8sVUFBQSxDQUFjLEtBQUQsR0FBTyxNQUFwQixDQUZQLENBR0MsQ0FBQyxJQUhGLENBR08sSUFBSSxDQUFDLElBQUwsQ0FBVSxtQkFBVixDQUhQLENBSUMsQ0FBQyxJQUpGLENBSU8sY0FBQSxDQUFlO1lBQUEsSUFBQSxFQUFNLEtBQU47V0FBZixDQUpQO1FBRFM7UUFPVixPQUFPLENBQUMsRUFBUixDQUFXLFFBQVgsRUFBcUIsU0FBQyxRQUFEO1VBQ3BCLElBQUEsQ0FBYyxRQUFRLENBQUMsS0FBVCxDQUFlLFFBQWYsQ0FBZDtBQUFBLG1CQUFBOztVQUNBLEdBQUcsQ0FBQyxLQUFKLENBQVUsMEJBQUEsR0FBMkIsYUFBM0IsR0FBeUMsSUFBbkQ7aUJBQ0EsT0FBQSxDQUFBO1FBSG9CLENBQXJCO1FBS0EsT0FBTyxDQUFDLEVBQVIsQ0FBVyxLQUFYLEVBQWtCLFNBQUMsUUFBRDtVQUNqQixJQUFBLENBQWMsUUFBUSxDQUFDLEtBQVQsQ0FBZSxRQUFmLENBQWQ7QUFBQSxtQkFBQTs7VUFDQSxHQUFHLENBQUMsS0FBSixDQUFVLDBCQUFBLEdBQTJCLGFBQTNCLEdBQXlDLElBQW5EO2lCQUNBLE9BQUEsQ0FBQTtRQUhpQixDQUFsQjtRQUtBLE9BQU8sQ0FBQyxFQUFSLENBQVcsUUFBWCxFQUFxQixTQUFDLFFBQUQ7VUFDcEIsSUFBQSxDQUFjLFFBQVEsQ0FBQyxLQUFULENBQWUsUUFBZixDQUFkO0FBQUEsbUJBQUE7O1VBQ0EsR0FBRyxDQUFDLEtBQUosQ0FBVSwwQkFBQSxHQUEyQixhQUEzQixHQUF5QyxJQUFuRDtpQkFDQSxPQUFBLENBQUE7UUFIb0IsQ0FBckI7ZUFLQSxFQUFBLENBQUE7TUEzQndCLENBQXpCO0lBWjhCLENBQS9CO0VBTHVCLENBQXhCO0FBYmdCIiwic291cmNlc0NvbnRlbnQiOlsiZnMgICAgICAgICAgICAgPSByZXF1aXJlIFwiZnNcIlxuZ3VscCAgICAgICAgICAgPSByZXF1aXJlIFwiZ3VscFwiXG5ndWxwTGVzcyAgICAgICA9IHJlcXVpcmUgXCJndWxwLWxlc3NcIlxuZ3VscExpdmVyZWxvYWQgPSByZXF1aXJlIFwiZ3VscC1saXZlcmVsb2FkXCJcbmd1bHBSZW5hbWUgICAgID0gcmVxdWlyZSBcImd1bHAtcmVuYW1lXCJcbnBhdGggICAgICAgICAgID0gcmVxdWlyZSBcInBhdGhcIlxuXG5sb2cgICAgICAgICA9IHJlcXVpcmUgXCIuLi8uLi9saWIvbG9nXCJcbmRpc2tXYXRjaGVyID0gcmVxdWlyZSBcIi4uLy4uL2xpYi9kaXNrLXdhdGNoZXJcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IChjb2ZmZWVQcm9qZWN0T3B0aW9ucykgLT5cblx0b3B0aW9ucyAgICAgICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLmxlc3Ncblx0ZW5hYmxlZCAgICAgICAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHR0aGVtZSAgICAgICAgICAgICAgID0gb3B0aW9ucy50aGVtZSBvciBcImRlZmF1bHRcIlxuXHRzb3VyY2VEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMuc291cmNlRGlyZWN0b3J5UGF0aFxuXHR0aGVtZXNEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwidGhlbWVzXCJcblx0dGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZSBvcHRpb25zLnRhcmdldERpcmVjdG9yeVBhdGhcblx0d2F0Y2hFbmFibGVkICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLndhdGNoLmVuYWJsZWRcblx0d2F0Y2hlciAgICAgICAgICAgICA9IGRpc2tXYXRjaGVyKGNvZmZlZVByb2plY3RPcHRpb25zKS5zcmMoKVxuXG5cdHVubGVzcyB0aGVtZVxuXHRcdGVudHJ5RmlsZVBhdGggPSBwYXRoLnJlc29sdmUgc291cmNlRGlyZWN0b3J5UGF0aCwgXCJhcHAubGVzc1wiXG5cblx0Z3VscC50YXNrIFwibGVzczp3YXRjaFwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWQgYW5kIHdhdGNoRW5hYmxlZFxuXHRcdFx0bG9nLmluZm8gXCJTa2lwcGluZyBsZXNzOndhdGNoOiBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGZzLmV4aXN0cyB0aGVtZXNEaXJlY3RvcnlQYXRoLCAodGhlbWVzRm9sZGVyRXhpc3RzKSAtPlxuXHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6d2F0Y2hdIFRoZW1lIGZvbGRlciBkb2VzI3tpZiB0aGVtZXNGb2xkZXJFeGlzdHMgdGhlbiBcIlwiIGVsc2UgXCIgbm90XCJ9IGV4aXN0LlwiXG5cblx0XHRcdGlmIHRoZW1lc0ZvbGRlckV4aXN0c1xuXHRcdFx0XHRlbnRyeUZpbGVQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwidGhlbWVzLyN7dGhlbWV9L3RoZW1lLmxlc3NcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGVtZSAgICAgICAgID0gXCJhcHBcIlxuXHRcdFx0XHRlbnRyeUZpbGVQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwiYXBwLmxlc3NcIlxuXG5cdFx0XHRsb2cuZGVidWcgXCJbbGVzczp3YXRjaF0gRW50cnkgZmlsZSBwYXRoOiBgI3tlbnRyeUZpbGVQYXRofWAuXCJcblx0XHRcdGxvZy5kZWJ1ZyBcIltsZXNzOndhdGNoXSBUYXJnZXQgZGlyZWN0b3J5IHBhdGg6IGAje3RhcmdldERpcmVjdG9yeVBhdGh9YC5cIlxuXG5cdFx0XHRmcy5leGlzdHMgZW50cnlGaWxlUGF0aCwgKGV4aXN0cykgLT5cblx0XHRcdFx0dW5sZXNzIGV4aXN0c1xuXHRcdFx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgbGVzczpjb21waWxlOiBGaWxlIGAje2VudHJ5RmlsZVBhdGh9YCBub3QgZm91bmQuXCJcblx0XHRcdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0XHRcdGNvbXBpbGUgPSAtPlxuXHRcdFx0XHRcdGd1bHAuc3JjIGVudHJ5RmlsZVBhdGhcblx0XHRcdFx0XHRcdC5waXBlIGd1bHBMZXNzKClcblx0XHRcdFx0XHRcdC5waXBlIGd1bHBSZW5hbWUgXCIje3RoZW1lfS5jc3NcIlxuXHRcdFx0XHRcdFx0LnBpcGUgZ3VscC5kZXN0IHRhcmdldERpcmVjdG9yeVBhdGhcblx0XHRcdFx0XHRcdC5waXBlIGd1bHBMaXZlcmVsb2FkIGF1dG86IGZhbHNlXG5cblx0XHRcdFx0d2F0Y2hlci5vbiBcImNoYW5nZVwiLCAoZmlsZVBhdGgpIC0+XG5cdFx0XHRcdFx0cmV0dXJuIHVubGVzcyBmaWxlUGF0aC5tYXRjaCAvXFwubGVzcy9cblx0XHRcdFx0XHRsb2cuZGVidWcgXCJbbGVzczp3YXRjaF0gQ29tcGlsaW5nIGAje2VudHJ5RmlsZVBhdGh9YC5cIlxuXHRcdFx0XHRcdGNvbXBpbGUoKVxuXG5cdFx0XHRcdHdhdGNoZXIub24gXCJhZGRcIiwgKGZpbGVQYXRoKSAtPlxuXHRcdFx0XHRcdHJldHVybiB1bmxlc3MgZmlsZVBhdGgubWF0Y2ggL1xcLmxlc3MvXG5cdFx0XHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6d2F0Y2hdIENvbXBpbGluZyBgI3tlbnRyeUZpbGVQYXRofWAuXCJcblx0XHRcdFx0XHRjb21waWxlKClcblxuXHRcdFx0XHR3YXRjaGVyLm9uIFwidW5saW5rXCIsIChmaWxlUGF0aCkgLT5cblx0XHRcdFx0XHRyZXR1cm4gdW5sZXNzIGZpbGVQYXRoLm1hdGNoIC9cXC5sZXNzL1xuXHRcdFx0XHRcdGxvZy5kZWJ1ZyBcIltsZXNzOndhdGNoXSBDb21waWxpbmcgYCN7ZW50cnlGaWxlUGF0aH1gLlwiXG5cdFx0XHRcdFx0Y29tcGlsZSgpXG5cblx0XHRcdFx0Y2IoKVxuXG5cdFx0cmV0dXJuXG4iXX0=

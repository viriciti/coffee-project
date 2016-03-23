var copy, diskWatcher, fs, gulp, log, minimatch, ref, rm;

fs = require("fs");

gulp = require("gulp");

minimatch = require("minimatch");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

ref = require("../../lib/files"), copy = ref.copy, rm = ref.rm;

module.exports = function(coffeeProjectOptions) {
  var enabled, excluded, options, sourceDirectoryPath, targetDirectoryPath, watchEnabled;
  options = coffeeProjectOptions.copy;
  enabled = options.enabled;
  excluded = options.excluded;
  sourceDirectoryPath = options.sourceDirectoryPath;
  targetDirectoryPath = options.targetDirectoryPath;
  watchEnabled = coffeeProjectOptions.watch.enabled;
  return gulp.task("copy:watch", function(cb) {
    var watcher;
    if (!(enabled && watchEnabled)) {
      log.info("Skipping copy:watch: Disabled.");
      return cb();
    }
    log.debug("[copy:watch] Source directory path: `" + sourceDirectoryPath + "`.");
    log.debug("[copy:watch] Target directory path: `" + targetDirectoryPath + "`.");
    watcher = diskWatcher(coffeeProjectOptions).src();
    watcher.on("change", function(filePath) {
      var exclude, i, len;
      for (i = 0, len = excluded.length; i < len; i++) {
        exclude = excluded[i];
        if (minimatch(filePath, exclude)) {
          return;
        }
      }
      log.debug("[copy:watch] Copying: `" + filePath + "`.");
      return copy(filePath, sourceDirectoryPath, targetDirectoryPath, function(error) {
        if (error) {
          return log.error(error);
        }
      });
    });
    watcher.on("add", function(filePath) {
      var exclude, i, len;
      for (i = 0, len = excluded.length; i < len; i++) {
        exclude = excluded[i];
        if (minimatch(filePath, exclude)) {
          return;
        }
      }
      log.debug("[copy:watch] Copying: `" + filePath + "`.");
      return copy(filePath, sourceDirectoryPath, targetDirectoryPath, function(error) {
        if (error) {
          return log.error(error);
        }
      });
    });
    watcher.on("unlink", function(filePath) {
      var exclude, i, len;
      for (i = 0, len = excluded.length; i < len; i++) {
        exclude = excluded[i];
        if (minimatch(filePath, exclude)) {
          return;
        }
      }
      log.debug("[copy:watch] Removing: `" + filePath + "`.");
      return rm(filePath, sourceDirectoryPath, targetDirectoryPath, function(error) {
        if (error) {
          return log.error(error);
        }
      });
    });
  });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tzL2NvcHkvd2F0Y2guY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFZLE9BQUEsQ0FBUSxJQUFSOztBQUNaLElBQUEsR0FBWSxPQUFBLENBQVEsTUFBUjs7QUFDWixTQUFBLEdBQVksT0FBQSxDQUFRLFdBQVI7O0FBRVosR0FBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSOztBQUNmLFdBQUEsR0FBZSxPQUFBLENBQVEsd0JBQVI7O0FBQ2YsTUFBZSxPQUFBLENBQVEsaUJBQVIsQ0FBZixFQUFFLFdBQUEsSUFBRixFQUFRLFNBQUE7O0FBRVIsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxvQkFBRDtBQUNoQixNQUFBO0VBQUEsT0FBQSxHQUFzQixvQkFBb0IsQ0FBQztFQUMzQyxPQUFBLEdBQXNCLE9BQU8sQ0FBQztFQUM5QixRQUFBLEdBQXNCLE9BQU8sQ0FBQztFQUM5QixtQkFBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsbUJBQUEsR0FBc0IsT0FBTyxDQUFDO0VBQzlCLFlBQUEsR0FBc0Isb0JBQW9CLENBQUMsS0FBSyxDQUFDO1NBRWpELElBQUksQ0FBQyxJQUFMLENBQVUsWUFBVixFQUF3QixTQUFDLEVBQUQ7QUFDdkIsUUFBQTtJQUFBLElBQUEsQ0FBQSxDQUFPLE9BQUEsSUFBWSxZQUFuQixDQUFBO01BQ0MsR0FBRyxDQUFDLElBQUosQ0FBUyxnQ0FBVDtBQUNBLGFBQU8sRUFBQSxDQUFBLEVBRlI7O0lBSUEsR0FBRyxDQUFDLEtBQUosQ0FBVSx1Q0FBQSxHQUF3QyxtQkFBeEMsR0FBNEQsSUFBdEU7SUFDQSxHQUFHLENBQUMsS0FBSixDQUFVLHVDQUFBLEdBQXdDLG1CQUF4QyxHQUE0RCxJQUF0RTtJQUVBLE9BQUEsR0FBVSxXQUFBLENBQVksb0JBQVosQ0FBaUMsQ0FBQyxHQUFsQyxDQUFBO0lBRVYsT0FBTyxDQUFDLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFNBQUMsUUFBRDtBQUNwQixVQUFBO0FBQUEsV0FBQSwwQ0FBQTs7UUFDQyxJQUFVLFNBQUEsQ0FBVSxRQUFWLEVBQW9CLE9BQXBCLENBQVY7QUFBQSxpQkFBQTs7QUFERDtNQUdBLEdBQUcsQ0FBQyxLQUFKLENBQVUseUJBQUEsR0FBMEIsUUFBMUIsR0FBbUMsSUFBN0M7YUFFQSxJQUFBLENBQUssUUFBTCxFQUFlLG1CQUFmLEVBQW9DLG1CQUFwQyxFQUF5RCxTQUFDLEtBQUQ7UUFDeEQsSUFBbUIsS0FBbkI7aUJBQUEsR0FBRyxDQUFDLEtBQUosQ0FBVSxLQUFWLEVBQUE7O01BRHdELENBQXpEO0lBTm9CLENBQXJCO0lBU0EsT0FBTyxDQUFDLEVBQVIsQ0FBVyxLQUFYLEVBQWtCLFNBQUMsUUFBRDtBQUNqQixVQUFBO0FBQUEsV0FBQSwwQ0FBQTs7UUFDQyxJQUFVLFNBQUEsQ0FBVSxRQUFWLEVBQW9CLE9BQXBCLENBQVY7QUFBQSxpQkFBQTs7QUFERDtNQUdBLEdBQUcsQ0FBQyxLQUFKLENBQVUseUJBQUEsR0FBMEIsUUFBMUIsR0FBbUMsSUFBN0M7YUFFQSxJQUFBLENBQUssUUFBTCxFQUFlLG1CQUFmLEVBQW9DLG1CQUFwQyxFQUF5RCxTQUFDLEtBQUQ7UUFDeEQsSUFBbUIsS0FBbkI7aUJBQUEsR0FBRyxDQUFDLEtBQUosQ0FBVSxLQUFWLEVBQUE7O01BRHdELENBQXpEO0lBTmlCLENBQWxCO0lBU0EsT0FBTyxDQUFDLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFNBQUMsUUFBRDtBQUNwQixVQUFBO0FBQUEsV0FBQSwwQ0FBQTs7UUFDQyxJQUFVLFNBQUEsQ0FBVSxRQUFWLEVBQW9CLE9BQXBCLENBQVY7QUFBQSxpQkFBQTs7QUFERDtNQUdBLEdBQUcsQ0FBQyxLQUFKLENBQVUsMEJBQUEsR0FBMkIsUUFBM0IsR0FBb0MsSUFBOUM7YUFFQSxFQUFBLENBQUcsUUFBSCxFQUFhLG1CQUFiLEVBQWtDLG1CQUFsQyxFQUF1RCxTQUFDLEtBQUQ7UUFDdEQsSUFBbUIsS0FBbkI7aUJBQUEsR0FBRyxDQUFDLEtBQUosQ0FBVSxLQUFWLEVBQUE7O01BRHNELENBQXZEO0lBTm9CLENBQXJCO0VBNUJ1QixDQUF4QjtBQVJnQiIsImZpbGUiOiJ0YXNrcy9jb3B5L3dhdGNoLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZnMgICAgICAgID0gcmVxdWlyZSBcImZzXCJcbmd1bHAgICAgICA9IHJlcXVpcmUgXCJndWxwXCJcbm1pbmltYXRjaCA9IHJlcXVpcmUgXCJtaW5pbWF0Y2hcIlxuXG5sb2cgICAgICAgICAgPSByZXF1aXJlIFwiLi4vLi4vbGliL2xvZ1wiXG5kaXNrV2F0Y2hlciAgPSByZXF1aXJlIFwiLi4vLi4vbGliL2Rpc2std2F0Y2hlclwiXG57IGNvcHksIHJtIH0gPSByZXF1aXJlIFwiLi4vLi4vbGliL2ZpbGVzXCJcblxubW9kdWxlLmV4cG9ydHMgPSAoY29mZmVlUHJvamVjdE9wdGlvbnMpIC0+XG5cdG9wdGlvbnMgICAgICAgICAgICAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy5jb3B5XG5cdGVuYWJsZWQgICAgICAgICAgICAgPSBvcHRpb25zLmVuYWJsZWRcblx0ZXhjbHVkZWQgICAgICAgICAgICA9IG9wdGlvbnMuZXhjbHVkZWRcblx0c291cmNlRGlyZWN0b3J5UGF0aCA9IG9wdGlvbnMuc291cmNlRGlyZWN0b3J5UGF0aFxuXHR0YXJnZXREaXJlY3RvcnlQYXRoID0gb3B0aW9ucy50YXJnZXREaXJlY3RvcnlQYXRoXG5cdHdhdGNoRW5hYmxlZCAgICAgICAgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy53YXRjaC5lbmFibGVkXG5cblx0Z3VscC50YXNrIFwiY29weTp3YXRjaFwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWQgYW5kIHdhdGNoRW5hYmxlZFxuXHRcdFx0bG9nLmluZm8gXCJTa2lwcGluZyBjb3B5OndhdGNoOiBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGxvZy5kZWJ1ZyBcIltjb3B5OndhdGNoXSBTb3VyY2UgZGlyZWN0b3J5IHBhdGg6IGAje3NvdXJjZURpcmVjdG9yeVBhdGh9YC5cIlxuXHRcdGxvZy5kZWJ1ZyBcIltjb3B5OndhdGNoXSBUYXJnZXQgZGlyZWN0b3J5IHBhdGg6IGAje3RhcmdldERpcmVjdG9yeVBhdGh9YC5cIlxuXG5cdFx0d2F0Y2hlciA9IGRpc2tXYXRjaGVyKGNvZmZlZVByb2plY3RPcHRpb25zKS5zcmMoKVxuXG5cdFx0d2F0Y2hlci5vbiBcImNoYW5nZVwiLCAoZmlsZVBhdGgpIC0+XG5cdFx0XHRmb3IgZXhjbHVkZSBpbiBleGNsdWRlZFxuXHRcdFx0XHRyZXR1cm4gaWYgbWluaW1hdGNoIGZpbGVQYXRoLCBleGNsdWRlXG5cblx0XHRcdGxvZy5kZWJ1ZyBcIltjb3B5OndhdGNoXSBDb3B5aW5nOiBgI3tmaWxlUGF0aH1gLlwiXG5cblx0XHRcdGNvcHkgZmlsZVBhdGgsIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgsIChlcnJvcikgLT5cblx0XHRcdFx0bG9nLmVycm9yIGVycm9yIGlmIGVycm9yXG5cblx0XHR3YXRjaGVyLm9uIFwiYWRkXCIsIChmaWxlUGF0aCkgLT5cblx0XHRcdGZvciBleGNsdWRlIGluIGV4Y2x1ZGVkXG5cdFx0XHRcdHJldHVybiBpZiBtaW5pbWF0Y2ggZmlsZVBhdGgsIGV4Y2x1ZGVcblxuXHRcdFx0bG9nLmRlYnVnIFwiW2NvcHk6d2F0Y2hdIENvcHlpbmc6IGAje2ZpbGVQYXRofWAuXCJcblxuXHRcdFx0Y29weSBmaWxlUGF0aCwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCwgKGVycm9yKSAtPlxuXHRcdFx0XHRsb2cuZXJyb3IgZXJyb3IgaWYgZXJyb3JcblxuXHRcdHdhdGNoZXIub24gXCJ1bmxpbmtcIiwgKGZpbGVQYXRoKSAtPlxuXHRcdFx0Zm9yIGV4Y2x1ZGUgaW4gZXhjbHVkZWRcblx0XHRcdFx0cmV0dXJuIGlmIG1pbmltYXRjaCBmaWxlUGF0aCwgZXhjbHVkZVxuXG5cdFx0XHRsb2cuZGVidWcgXCJbY29weTp3YXRjaF0gUmVtb3Zpbmc6IGAje2ZpbGVQYXRofWAuXCJcblxuXHRcdFx0cm0gZmlsZVBhdGgsIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgsIChlcnJvcikgLT5cblx0XHRcdFx0bG9nLmVycm9yIGVycm9yIGlmIGVycm9yXG5cblx0XHRyZXR1cm4iXX0=

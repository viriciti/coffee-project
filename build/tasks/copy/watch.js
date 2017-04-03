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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvY29weS93YXRjaC5qcyIsInNvdXJjZXMiOlsidGFza3MvY29weS93YXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxFQUFBLEdBQVksT0FBQSxDQUFRLElBQVI7O0FBQ1osSUFBQSxHQUFZLE9BQUEsQ0FBUSxNQUFSOztBQUNaLFNBQUEsR0FBWSxPQUFBLENBQVEsV0FBUjs7QUFFWixHQUFBLEdBQWUsT0FBQSxDQUFRLGVBQVI7O0FBQ2YsV0FBQSxHQUFlLE9BQUEsQ0FBUSx3QkFBUjs7QUFDZixNQUFlLE9BQUEsQ0FBUSxpQkFBUixDQUFmLEVBQUUsZUFBRixFQUFROztBQUVSLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsb0JBQUQ7QUFDaEIsTUFBQTtFQUFBLE9BQUEsR0FBc0Isb0JBQW9CLENBQUM7RUFDM0MsT0FBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsUUFBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsbUJBQUEsR0FBc0IsT0FBTyxDQUFDO0VBQzlCLG1CQUFBLEdBQXNCLE9BQU8sQ0FBQztFQUM5QixZQUFBLEdBQXNCLG9CQUFvQixDQUFDLEtBQUssQ0FBQztTQUVqRCxJQUFJLENBQUMsSUFBTCxDQUFVLFlBQVYsRUFBd0IsU0FBQyxFQUFEO0FBQ3ZCLFFBQUE7SUFBQSxJQUFBLENBQUEsQ0FBTyxPQUFBLElBQVksWUFBbkIsQ0FBQTtNQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsZ0NBQVQ7QUFDQSxhQUFPLEVBQUEsQ0FBQSxFQUZSOztJQUlBLEdBQUcsQ0FBQyxLQUFKLENBQVUsdUNBQUEsR0FBd0MsbUJBQXhDLEdBQTRELElBQXRFO0lBQ0EsR0FBRyxDQUFDLEtBQUosQ0FBVSx1Q0FBQSxHQUF3QyxtQkFBeEMsR0FBNEQsSUFBdEU7SUFFQSxPQUFBLEdBQVUsV0FBQSxDQUFZLG9CQUFaLENBQWlDLENBQUMsR0FBbEMsQ0FBQTtJQUVWLE9BQU8sQ0FBQyxFQUFSLENBQVcsUUFBWCxFQUFxQixTQUFDLFFBQUQ7QUFDcEIsVUFBQTtBQUFBLFdBQUEsMENBQUE7O1FBQ0MsSUFBVSxTQUFBLENBQVUsUUFBVixFQUFvQixPQUFwQixDQUFWO0FBQUEsaUJBQUE7O0FBREQ7TUFHQSxHQUFHLENBQUMsS0FBSixDQUFVLHlCQUFBLEdBQTBCLFFBQTFCLEdBQW1DLElBQTdDO2FBRUEsSUFBQSxDQUFLLFFBQUwsRUFBZSxtQkFBZixFQUFvQyxtQkFBcEMsRUFBeUQsU0FBQyxLQUFEO1FBQ3hELElBQW1CLEtBQW5CO2lCQUFBLEdBQUcsQ0FBQyxLQUFKLENBQVUsS0FBVixFQUFBOztNQUR3RCxDQUF6RDtJQU5vQixDQUFyQjtJQVNBLE9BQU8sQ0FBQyxFQUFSLENBQVcsS0FBWCxFQUFrQixTQUFDLFFBQUQ7QUFDakIsVUFBQTtBQUFBLFdBQUEsMENBQUE7O1FBQ0MsSUFBVSxTQUFBLENBQVUsUUFBVixFQUFvQixPQUFwQixDQUFWO0FBQUEsaUJBQUE7O0FBREQ7TUFHQSxHQUFHLENBQUMsS0FBSixDQUFVLHlCQUFBLEdBQTBCLFFBQTFCLEdBQW1DLElBQTdDO2FBRUEsSUFBQSxDQUFLLFFBQUwsRUFBZSxtQkFBZixFQUFvQyxtQkFBcEMsRUFBeUQsU0FBQyxLQUFEO1FBQ3hELElBQW1CLEtBQW5CO2lCQUFBLEdBQUcsQ0FBQyxLQUFKLENBQVUsS0FBVixFQUFBOztNQUR3RCxDQUF6RDtJQU5pQixDQUFsQjtJQVNBLE9BQU8sQ0FBQyxFQUFSLENBQVcsUUFBWCxFQUFxQixTQUFDLFFBQUQ7QUFDcEIsVUFBQTtBQUFBLFdBQUEsMENBQUE7O1FBQ0MsSUFBVSxTQUFBLENBQVUsUUFBVixFQUFvQixPQUFwQixDQUFWO0FBQUEsaUJBQUE7O0FBREQ7TUFHQSxHQUFHLENBQUMsS0FBSixDQUFVLDBCQUFBLEdBQTJCLFFBQTNCLEdBQW9DLElBQTlDO2FBRUEsRUFBQSxDQUFHLFFBQUgsRUFBYSxtQkFBYixFQUFrQyxtQkFBbEMsRUFBdUQsU0FBQyxLQUFEO1FBQ3RELElBQW1CLEtBQW5CO2lCQUFBLEdBQUcsQ0FBQyxLQUFKLENBQVUsS0FBVixFQUFBOztNQURzRCxDQUF2RDtJQU5vQixDQUFyQjtFQTVCdUIsQ0FBeEI7QUFSZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJmcyAgICAgICAgPSByZXF1aXJlIFwiZnNcIlxuZ3VscCAgICAgID0gcmVxdWlyZSBcImd1bHBcIlxubWluaW1hdGNoID0gcmVxdWlyZSBcIm1pbmltYXRjaFwiXG5cbmxvZyAgICAgICAgICA9IHJlcXVpcmUgXCIuLi8uLi9saWIvbG9nXCJcbmRpc2tXYXRjaGVyICA9IHJlcXVpcmUgXCIuLi8uLi9saWIvZGlzay13YXRjaGVyXCJcbnsgY29weSwgcm0gfSA9IHJlcXVpcmUgXCIuLi8uLi9saWIvZmlsZXNcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IChjb2ZmZWVQcm9qZWN0T3B0aW9ucykgLT5cblx0b3B0aW9ucyAgICAgICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLmNvcHlcblx0ZW5hYmxlZCAgICAgICAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHRleGNsdWRlZCAgICAgICAgICAgID0gb3B0aW9ucy5leGNsdWRlZFxuXHRzb3VyY2VEaXJlY3RvcnlQYXRoID0gb3B0aW9ucy5zb3VyY2VEaXJlY3RvcnlQYXRoXG5cdHRhcmdldERpcmVjdG9yeVBhdGggPSBvcHRpb25zLnRhcmdldERpcmVjdG9yeVBhdGhcblx0d2F0Y2hFbmFibGVkICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLndhdGNoLmVuYWJsZWRcblxuXHRndWxwLnRhc2sgXCJjb3B5OndhdGNoXCIsIChjYikgLT5cblx0XHR1bmxlc3MgZW5hYmxlZCBhbmQgd2F0Y2hFbmFibGVkXG5cdFx0XHRsb2cuaW5mbyBcIlNraXBwaW5nIGNvcHk6d2F0Y2g6IERpc2FibGVkLlwiXG5cdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0bG9nLmRlYnVnIFwiW2NvcHk6d2F0Y2hdIFNvdXJjZSBkaXJlY3RvcnkgcGF0aDogYCN7c291cmNlRGlyZWN0b3J5UGF0aH1gLlwiXG5cdFx0bG9nLmRlYnVnIFwiW2NvcHk6d2F0Y2hdIFRhcmdldCBkaXJlY3RvcnkgcGF0aDogYCN7dGFyZ2V0RGlyZWN0b3J5UGF0aH1gLlwiXG5cblx0XHR3YXRjaGVyID0gZGlza1dhdGNoZXIoY29mZmVlUHJvamVjdE9wdGlvbnMpLnNyYygpXG5cblx0XHR3YXRjaGVyLm9uIFwiY2hhbmdlXCIsIChmaWxlUGF0aCkgLT5cblx0XHRcdGZvciBleGNsdWRlIGluIGV4Y2x1ZGVkXG5cdFx0XHRcdHJldHVybiBpZiBtaW5pbWF0Y2ggZmlsZVBhdGgsIGV4Y2x1ZGVcblxuXHRcdFx0bG9nLmRlYnVnIFwiW2NvcHk6d2F0Y2hdIENvcHlpbmc6IGAje2ZpbGVQYXRofWAuXCJcblxuXHRcdFx0Y29weSBmaWxlUGF0aCwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCwgKGVycm9yKSAtPlxuXHRcdFx0XHRsb2cuZXJyb3IgZXJyb3IgaWYgZXJyb3JcblxuXHRcdHdhdGNoZXIub24gXCJhZGRcIiwgKGZpbGVQYXRoKSAtPlxuXHRcdFx0Zm9yIGV4Y2x1ZGUgaW4gZXhjbHVkZWRcblx0XHRcdFx0cmV0dXJuIGlmIG1pbmltYXRjaCBmaWxlUGF0aCwgZXhjbHVkZVxuXG5cdFx0XHRsb2cuZGVidWcgXCJbY29weTp3YXRjaF0gQ29weWluZzogYCN7ZmlsZVBhdGh9YC5cIlxuXG5cdFx0XHRjb3B5IGZpbGVQYXRoLCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoLCAoZXJyb3IpIC0+XG5cdFx0XHRcdGxvZy5lcnJvciBlcnJvciBpZiBlcnJvclxuXG5cdFx0d2F0Y2hlci5vbiBcInVubGlua1wiLCAoZmlsZVBhdGgpIC0+XG5cdFx0XHRmb3IgZXhjbHVkZSBpbiBleGNsdWRlZFxuXHRcdFx0XHRyZXR1cm4gaWYgbWluaW1hdGNoIGZpbGVQYXRoLCBleGNsdWRlXG5cblx0XHRcdGxvZy5kZWJ1ZyBcIltjb3B5OndhdGNoXSBSZW1vdmluZzogYCN7ZmlsZVBhdGh9YC5cIlxuXG5cdFx0XHRybSBmaWxlUGF0aCwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCwgKGVycm9yKSAtPlxuXHRcdFx0XHRsb2cuZXJyb3IgZXJyb3IgaWYgZXJyb3JcblxuXHRcdHJldHVybiJdfQ==

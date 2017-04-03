var async, fs, gulp, gulpCssnano, gulpLess, gulpRename, gulpTap, log, lsr, path;

async = require("async");

fs = require("fs");

gulp = require("gulp");

gulpCssnano = require("gulp-cssnano");

gulpLess = require("gulp-less");

gulpRename = require("gulp-rename");

gulpTap = require("gulp-tap");

lsr = require("lsr");

path = require("path");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var buildAllThemes, buildCurrentTheme, enabled, handleCompile, handleThemesCompile, isProduction, options, sourceDirectoryPath, targetDirectoryPath, theme, themesDirectoryPath;
  options = coffeeProjectOptions.less;
  enabled = options.enabled;
  theme = options.theme || "default";
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  themesDirectoryPath = path.resolve(sourceDirectoryPath, "themes");
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  isProduction = process.env.NODE_ENV === "production";
  buildAllThemes = function(cb) {
    return lsr(themesDirectoryPath, function(error, stats) {
      if (error) {
        return cb(error);
      }
      return async.eachSeries(stats, function(stat, cb) {
        var themeFilePath;
        if (!stat.isDirectory()) {
          return cb();
        }
        theme = stat.name;
        log.debug("");
        themeFilePath = path.resolve(themesDirectoryPath, theme, "theme.less");
        return fs.exists(themeFilePath, function(exists) {
          var s;
          if (!exists) {
            log.warn("[less:themes] Entry file `" + themeFilePath + "` not found.");
            return cb();
          }
          s = gulp.src(themeFilePath).pipe(gulpTap(function(file) {
            log.debug("[less:compile] Compiling `" + file.path + "`.");
          })).pipe(gulpLess());
          if (isProduction) {
            s = s.pipe(gulpCssnano());
          }
          return s.pipe(gulpRename(theme + ".css")).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
        });
      }, cb);
    });
  };
  buildCurrentTheme = function(cb) {
    var entryFilePath;
    entryFilePath = path.resolve(sourceDirectoryPath, "themes/" + theme + "/theme.less");
    return fs.exists(entryFilePath, function(exists) {
      var s;
      if (!exists) {
        log.warn("[less:compile] Entry file `" + entryFilePath + "` not found.");
        return cb();
      }
      s = gulp.src(entryFilePath).pipe(gulpTap(function(file) {
        log.debug("[less:compile] Compiling `" + file.path + "`.");
      })).pipe(gulpLess());
      if (isProduction) {
        s = s.pipe(gulpCssnano());
      }
      return s.pipe(gulpRename(theme + ".css")).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
    });
  };
  handleThemesCompile = function(cb) {
    if (isProduction) {
      return buildAllThemes(cb);
    } else {
      return buildCurrentTheme(cb);
    }
  };
  handleCompile = function(cb) {
    var entryFilePath;
    log.debug("[less:compile] Entry file path: `" + entryFilePath + "`.");
    log.debug("[less:compile] Target directory path: `" + targetDirectoryPath + "`.");
    entryFilePath = path.resolve(sourceDirectoryPath, "app.less");
    return fs.exists(entryFilePath, function(exists) {
      var s;
      if (!exists) {
        log.warn("[less:compile] Entry file `" + entryFilePath + "` not found.");
        return cb();
      }
      s = gulp.src(entryFilePath).pipe(gulpTap(function(file) {
        log.debug("[less:compile] Compiling `" + file.path + "`.");
      })).pipe(gulpLess());
      if (isProduction) {
        s = s.pipe(gulpCssnano());
      }
      return s.pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
    });
  };
  return gulp.task("less:compile", function(cb) {
    if (!enabled) {
      log.info("[less:compile] Skipping : Disabled.");
      return cb();
    }
    fs.exists(themesDirectoryPath, function(themesFolderExists) {
      log.debug("[less:compile] Theme folder does" + (themesFolderExists ? "" : " not") + " exist.");
      if (themesFolderExists) {
        return handleThemesCompile(cb);
      } else {
        return handleCompile(cb);
      }
    });
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvbGVzcy9jb21waWxlLmpzIiwic291cmNlcyI6WyJ0YXNrcy9sZXNzL2NvbXBpbGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsS0FBQSxHQUFjLE9BQUEsQ0FBUSxPQUFSOztBQUNkLEVBQUEsR0FBYyxPQUFBLENBQVEsSUFBUjs7QUFDZCxJQUFBLEdBQWMsT0FBQSxDQUFRLE1BQVI7O0FBQ2QsV0FBQSxHQUFjLE9BQUEsQ0FBUSxjQUFSOztBQUNkLFFBQUEsR0FBYyxPQUFBLENBQVEsV0FBUjs7QUFDZCxVQUFBLEdBQWMsT0FBQSxDQUFRLGFBQVI7O0FBQ2QsT0FBQSxHQUFjLE9BQUEsQ0FBUSxVQUFSOztBQUNkLEdBQUEsR0FBYyxPQUFBLENBQVEsS0FBUjs7QUFDZCxJQUFBLEdBQWMsT0FBQSxDQUFRLE1BQVI7O0FBRWQsR0FBQSxHQUFNLE9BQUEsQ0FBUSxlQUFSOztBQUVOLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsb0JBQUQ7QUFDaEIsTUFBQTtFQUFBLE9BQUEsR0FBc0Isb0JBQW9CLENBQUM7RUFDM0MsT0FBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsS0FBQSxHQUFzQixPQUFPLENBQUMsS0FBUixJQUFpQjtFQUN2QyxtQkFBQSxHQUFzQixJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxtQkFBckI7RUFDdEIsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxtQkFBYixFQUFrQyxRQUFsQztFQUN0QixtQkFBQSxHQUFzQixJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxtQkFBckI7RUFDdEIsWUFBQSxHQUFzQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVosS0FBd0I7RUFFOUMsY0FBQSxHQUFpQixTQUFDLEVBQUQ7V0FDaEIsR0FBQSxDQUFJLG1CQUFKLEVBQXlCLFNBQUMsS0FBRCxFQUFRLEtBQVI7TUFDeEIsSUFBbUIsS0FBbkI7QUFBQSxlQUFPLEVBQUEsQ0FBRyxLQUFI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QTZFLFNBQXZGO01BRUEsSUFBRyxrQkFBSDtlQUNDLG1CQUFBLENBQW9CLEVBQXBCLEVBREQ7T0FBQSxNQUFBO2VBR0MsYUFBQSxDQUFjLEVBQWQsRUFIRDs7SUFIOEIsQ0FBL0I7RUFMeUIsQ0FBMUI7QUExRmdCIiwic291cmNlc0NvbnRlbnQiOlsiYXN5bmMgICAgICAgPSByZXF1aXJlIFwiYXN5bmNcIlxuZnMgICAgICAgICAgPSByZXF1aXJlIFwiZnNcIlxuZ3VscCAgICAgICAgPSByZXF1aXJlIFwiZ3VscFwiXG5ndWxwQ3NzbmFubyA9IHJlcXVpcmUgXCJndWxwLWNzc25hbm9cIlxuZ3VscExlc3MgICAgPSByZXF1aXJlIFwiZ3VscC1sZXNzXCJcbmd1bHBSZW5hbWUgID0gcmVxdWlyZSBcImd1bHAtcmVuYW1lXCJcbmd1bHBUYXAgICAgID0gcmVxdWlyZSBcImd1bHAtdGFwXCJcbmxzciAgICAgICAgID0gcmVxdWlyZSBcImxzclwiXG5wYXRoICAgICAgICA9IHJlcXVpcmUgXCJwYXRoXCJcblxubG9nID0gcmVxdWlyZSBcIi4uLy4uL2xpYi9sb2dcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IChjb2ZmZWVQcm9qZWN0T3B0aW9ucykgLT5cblx0b3B0aW9ucyAgICAgICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLmxlc3Ncblx0ZW5hYmxlZCAgICAgICAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHR0aGVtZSAgICAgICAgICAgICAgID0gb3B0aW9ucy50aGVtZSBvciBcImRlZmF1bHRcIlxuXHRzb3VyY2VEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMuc291cmNlRGlyZWN0b3J5UGF0aFxuXHR0aGVtZXNEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwidGhlbWVzXCJcblx0dGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZSBvcHRpb25zLnRhcmdldERpcmVjdG9yeVBhdGhcblx0aXNQcm9kdWN0aW9uICAgICAgICA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIGlzIFwicHJvZHVjdGlvblwiXG5cblx0YnVpbGRBbGxUaGVtZXMgPSAoY2IpIC0+XG5cdFx0bHNyIHRoZW1lc0RpcmVjdG9yeVBhdGgsIChlcnJvciwgc3RhdHMpIC0+XG5cdFx0XHRyZXR1cm4gY2IgZXJyb3IgaWYgZXJyb3JcblxuXHRcdFx0YXN5bmMuZWFjaFNlcmllcyBzdGF0cywgKHN0YXQsIGNiKSAtPlxuXHRcdFx0XHRyZXR1cm4gY2IoKSB1bmxlc3Mgc3RhdC5pc0RpcmVjdG9yeSgpXG5cblx0XHRcdFx0dGhlbWUgPSBzdGF0Lm5hbWVcblxuXHRcdFx0XHRsb2cuZGVidWcgXCJcIlxuXG5cdFx0XHRcdHRoZW1lRmlsZVBhdGggPSBwYXRoLnJlc29sdmUgdGhlbWVzRGlyZWN0b3J5UGF0aCwgdGhlbWUsIFwidGhlbWUubGVzc1wiXG5cblx0XHRcdFx0ZnMuZXhpc3RzIHRoZW1lRmlsZVBhdGgsIChleGlzdHMpIC0+XG5cdFx0XHRcdFx0dW5sZXNzIGV4aXN0c1xuXHRcdFx0XHRcdFx0bG9nLndhcm4gXCJbbGVzczp0aGVtZXNdIEVudHJ5IGZpbGUgYCN7dGhlbWVGaWxlUGF0aH1gIG5vdCBmb3VuZC5cIlxuXHRcdFx0XHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdFx0XHRcdHMgPSBndWxwLnNyYyB0aGVtZUZpbGVQYXRoXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwVGFwIChmaWxlKSAtPlxuXHRcdFx0XHRcdFx0XHRsb2cuZGVidWcgXCJbbGVzczpjb21waWxlXSBDb21waWxpbmcgYCN7ZmlsZS5wYXRofWAuXCJcblx0XHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwTGVzcygpXG5cblx0XHRcdFx0XHRzID0gcy5waXBlIGd1bHBDc3NuYW5vKCkgaWYgaXNQcm9kdWN0aW9uXG5cblx0XHRcdFx0XHRzXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwUmVuYW1lIFwiI3t0aGVtZX0uY3NzXCJcblx0XHRcdFx0XHRcdC5waXBlIGd1bHAuZGVzdCB0YXJnZXREaXJlY3RvcnlQYXRoXG5cdFx0XHRcdFx0XHQub24gXCJlbmRcIiwgY2Jcblx0XHRcdCwgY2JcblxuXHRidWlsZEN1cnJlbnRUaGVtZSA9IChjYikgLT5cblx0XHRlbnRyeUZpbGVQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwidGhlbWVzLyN7dGhlbWV9L3RoZW1lLmxlc3NcIlxuXG5cdFx0ZnMuZXhpc3RzIGVudHJ5RmlsZVBhdGgsIChleGlzdHMpIC0+XG5cdFx0XHR1bmxlc3MgZXhpc3RzXG5cdFx0XHRcdGxvZy53YXJuIFwiW2xlc3M6Y29tcGlsZV0gRW50cnkgZmlsZSBgI3tlbnRyeUZpbGVQYXRofWAgbm90IGZvdW5kLlwiXG5cdFx0XHRcdHJldHVybiBjYigpXG5cblx0XHRcdHMgPSBndWxwLnNyYyBlbnRyeUZpbGVQYXRoXG5cdFx0XHRcdC5waXBlIGd1bHBUYXAgKGZpbGUpIC0+XG5cdFx0XHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6Y29tcGlsZV0gQ29tcGlsaW5nIGAje2ZpbGUucGF0aH1gLlwiXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdC5waXBlIGd1bHBMZXNzKClcblxuXHRcdFx0cyA9IHMucGlwZSBndWxwQ3NzbmFubygpIGlmIGlzUHJvZHVjdGlvblxuXG5cdFx0XHRzXG5cdFx0XHRcdC5waXBlIGd1bHBSZW5hbWUgXCIje3RoZW1lfS5jc3NcIlxuXHRcdFx0XHQucGlwZSBndWxwLmRlc3QgdGFyZ2V0RGlyZWN0b3J5UGF0aFxuXHRcdFx0XHQub24gXCJlbmRcIiwgY2JcblxuXHRoYW5kbGVUaGVtZXNDb21waWxlID0gKGNiKSAtPlxuXHRcdGlmIGlzUHJvZHVjdGlvblxuXHRcdFx0YnVpbGRBbGxUaGVtZXMgY2Jcblx0XHRlbHNlXG5cdFx0XHRidWlsZEN1cnJlbnRUaGVtZSBjYlxuXG5cdGhhbmRsZUNvbXBpbGUgPSAoY2IpIC0+XG5cdFx0bG9nLmRlYnVnIFwiW2xlc3M6Y29tcGlsZV0gRW50cnkgZmlsZSBwYXRoOiBgI3tlbnRyeUZpbGVQYXRofWAuXCJcblx0XHRsb2cuZGVidWcgXCJbbGVzczpjb21waWxlXSBUYXJnZXQgZGlyZWN0b3J5IHBhdGg6IGAje3RhcmdldERpcmVjdG9yeVBhdGh9YC5cIlxuXG5cdFx0ZW50cnlGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZSBzb3VyY2VEaXJlY3RvcnlQYXRoLCBcImFwcC5sZXNzXCJcblxuXHRcdGZzLmV4aXN0cyBlbnRyeUZpbGVQYXRoLCAoZXhpc3RzKSAtPlxuXHRcdFx0dW5sZXNzIGV4aXN0c1xuXHRcdFx0XHRsb2cud2FybiBcIltsZXNzOmNvbXBpbGVdIEVudHJ5IGZpbGUgYCN7ZW50cnlGaWxlUGF0aH1gIG5vdCBmb3VuZC5cIlxuXHRcdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0XHRzID0gZ3VscC5zcmMgZW50cnlGaWxlUGF0aFxuXHRcdFx0XHQucGlwZSBndWxwVGFwIChmaWxlKSAtPlxuXHRcdFx0XHRcdGxvZy5kZWJ1ZyBcIltsZXNzOmNvbXBpbGVdIENvbXBpbGluZyBgI3tmaWxlLnBhdGh9YC5cIlxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHQucGlwZSBndWxwTGVzcygpXG5cblx0XHRcdHMgPSBzLnBpcGUgZ3VscENzc25hbm8oKSBpZiBpc1Byb2R1Y3Rpb25cblxuXHRcdFx0cy5waXBlIGd1bHAuZGVzdCB0YXJnZXREaXJlY3RvcnlQYXRoXG5cdFx0XHRcdC5vbiBcImVuZFwiLCBjYlxuXG5cdGd1bHAudGFzayBcImxlc3M6Y29tcGlsZVwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiW2xlc3M6Y29tcGlsZV0gU2tpcHBpbmcgOiBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGZzLmV4aXN0cyB0aGVtZXNEaXJlY3RvcnlQYXRoLCAodGhlbWVzRm9sZGVyRXhpc3RzKSAtPlxuXHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6Y29tcGlsZV0gVGhlbWUgZm9sZGVyIGRvZXMje2lmIHRoZW1lc0ZvbGRlckV4aXN0cyB0aGVuIFwiXCIgZWxzZSBcIiBub3RcIn0gZXhpc3QuXCJcblxuXHRcdFx0aWYgdGhlbWVzRm9sZGVyRXhpc3RzXG5cdFx0XHRcdGhhbmRsZVRoZW1lc0NvbXBpbGUgY2Jcblx0XHRcdGVsc2Vcblx0XHRcdFx0aGFuZGxlQ29tcGlsZSBjYlxuXG5cdFx0cmV0dXJuXG5cbiJdfQ==

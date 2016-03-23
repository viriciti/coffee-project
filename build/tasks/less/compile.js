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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tzL2xlc3MvY29tcGlsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxLQUFBLEdBQWMsT0FBQSxDQUFRLE9BQVI7O0FBQ2QsRUFBQSxHQUFjLE9BQUEsQ0FBUSxJQUFSOztBQUNkLElBQUEsR0FBYyxPQUFBLENBQVEsTUFBUjs7QUFDZCxXQUFBLEdBQWMsT0FBQSxDQUFRLGNBQVI7O0FBQ2QsUUFBQSxHQUFjLE9BQUEsQ0FBUSxXQUFSOztBQUNkLFVBQUEsR0FBYyxPQUFBLENBQVEsYUFBUjs7QUFDZCxPQUFBLEdBQWMsT0FBQSxDQUFRLFVBQVI7O0FBQ2QsR0FBQSxHQUFjLE9BQUEsQ0FBUSxLQUFSOztBQUNkLElBQUEsR0FBYyxPQUFBLENBQVEsTUFBUjs7QUFFZCxHQUFBLEdBQU0sT0FBQSxDQUFRLGVBQVI7O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxvQkFBRDtBQUNoQixNQUFBO0VBQUEsT0FBQSxHQUFzQixvQkFBb0IsQ0FBQztFQUMzQyxPQUFBLEdBQXNCLE9BQU8sQ0FBQztFQUM5QixLQUFBLEdBQXNCLE9BQU8sQ0FBQyxLQUFSLElBQWlCO0VBQ3ZDLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLG1CQUFyQjtFQUN0QixtQkFBQSxHQUFzQixJQUFJLENBQUMsT0FBTCxDQUFhLG1CQUFiLEVBQWtDLFFBQWxDO0VBQ3RCLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLG1CQUFyQjtFQUN0QixZQUFBLEdBQXNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBWixLQUF3QjtFQUU5QyxjQUFBLEdBQWlCLFNBQUMsRUFBRDtXQUNoQixHQUFBLENBQUksbUJBQUosRUFBeUIsU0FBQyxLQUFELEVBQVEsS0FBUjtNQUN4QixJQUFtQixLQUFuQjtBQUFBLGVBQU8sRUFBQSxDQUFHLEtBQUgsRUFBUDs7YUFFQSxLQUFLLENBQUMsVUFBTixDQUFp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bUJBQUEsQ0FBb0IsRUFBcEIsRUFERDtPQUFBLE1BQUE7ZUFHQyxhQUFBLENBQWMsRUFBZCxFQUhEOztJQUg4QixDQUEvQjtFQUx5QixDQUExQjtBQTFGZ0IiLCJmaWxlIjoidGFza3MvbGVzcy9jb21waWxlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXN5bmMgICAgICAgPSByZXF1aXJlIFwiYXN5bmNcIlxuZnMgICAgICAgICAgPSByZXF1aXJlIFwiZnNcIlxuZ3VscCAgICAgICAgPSByZXF1aXJlIFwiZ3VscFwiXG5ndWxwQ3NzbmFubyA9IHJlcXVpcmUgXCJndWxwLWNzc25hbm9cIlxuZ3VscExlc3MgICAgPSByZXF1aXJlIFwiZ3VscC1sZXNzXCJcbmd1bHBSZW5hbWUgID0gcmVxdWlyZSBcImd1bHAtcmVuYW1lXCJcbmd1bHBUYXAgICAgID0gcmVxdWlyZSBcImd1bHAtdGFwXCJcbmxzciAgICAgICAgID0gcmVxdWlyZSBcImxzclwiXG5wYXRoICAgICAgICA9IHJlcXVpcmUgXCJwYXRoXCJcblxubG9nID0gcmVxdWlyZSBcIi4uLy4uL2xpYi9sb2dcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IChjb2ZmZWVQcm9qZWN0T3B0aW9ucykgLT5cblx0b3B0aW9ucyAgICAgICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLmxlc3Ncblx0ZW5hYmxlZCAgICAgICAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHR0aGVtZSAgICAgICAgICAgICAgID0gb3B0aW9ucy50aGVtZSBvciBcImRlZmF1bHRcIlxuXHRzb3VyY2VEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMuc291cmNlRGlyZWN0b3J5UGF0aFxuXHR0aGVtZXNEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwidGhlbWVzXCJcblx0dGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZSBvcHRpb25zLnRhcmdldERpcmVjdG9yeVBhdGhcblx0aXNQcm9kdWN0aW9uICAgICAgICA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIGlzIFwicHJvZHVjdGlvblwiXG5cblx0YnVpbGRBbGxUaGVtZXMgPSAoY2IpIC0+XG5cdFx0bHNyIHRoZW1lc0RpcmVjdG9yeVBhdGgsIChlcnJvciwgc3RhdHMpIC0+XG5cdFx0XHRyZXR1cm4gY2IgZXJyb3IgaWYgZXJyb3JcblxuXHRcdFx0YXN5bmMuZWFjaFNlcmllcyBzdGF0cywgKHN0YXQsIGNiKSAtPlxuXHRcdFx0XHRyZXR1cm4gY2IoKSB1bmxlc3Mgc3RhdC5pc0RpcmVjdG9yeSgpXG5cblx0XHRcdFx0dGhlbWUgPSBzdGF0Lm5hbWVcblxuXHRcdFx0XHRsb2cuZGVidWcgXCJcIlxuXG5cdFx0XHRcdHRoZW1lRmlsZVBhdGggPSBwYXRoLnJlc29sdmUgdGhlbWVzRGlyZWN0b3J5UGF0aCwgdGhlbWUsIFwidGhlbWUubGVzc1wiXG5cblx0XHRcdFx0ZnMuZXhpc3RzIHRoZW1lRmlsZVBhdGgsIChleGlzdHMpIC0+XG5cdFx0XHRcdFx0dW5sZXNzIGV4aXN0c1xuXHRcdFx0XHRcdFx0bG9nLndhcm4gXCJbbGVzczp0aGVtZXNdIEVudHJ5IGZpbGUgYCN7dGhlbWVGaWxlUGF0aH1gIG5vdCBmb3VuZC5cIlxuXHRcdFx0XHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdFx0XHRcdHMgPSBndWxwLnNyYyB0aGVtZUZpbGVQYXRoXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwVGFwIChmaWxlKSAtPlxuXHRcdFx0XHRcdFx0XHRsb2cuZGVidWcgXCJbbGVzczpjb21waWxlXSBDb21waWxpbmcgYCN7ZmlsZS5wYXRofWAuXCJcblx0XHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwTGVzcygpXG5cblx0XHRcdFx0XHRzID0gcy5waXBlIGd1bHBDc3NuYW5vKCkgaWYgaXNQcm9kdWN0aW9uXG5cblx0XHRcdFx0XHRzXG5cdFx0XHRcdFx0XHQucGlwZSBndWxwUmVuYW1lIFwiI3t0aGVtZX0uY3NzXCJcblx0XHRcdFx0XHRcdC5waXBlIGd1bHAuZGVzdCB0YXJnZXREaXJlY3RvcnlQYXRoXG5cdFx0XHRcdFx0XHQub24gXCJlbmRcIiwgY2Jcblx0XHRcdCwgY2JcblxuXHRidWlsZEN1cnJlbnRUaGVtZSA9IChjYikgLT5cblx0XHRlbnRyeUZpbGVQYXRoID0gcGF0aC5yZXNvbHZlIHNvdXJjZURpcmVjdG9yeVBhdGgsIFwidGhlbWVzLyN7dGhlbWV9L3RoZW1lLmxlc3NcIlxuXG5cdFx0ZnMuZXhpc3RzIGVudHJ5RmlsZVBhdGgsIChleGlzdHMpIC0+XG5cdFx0XHR1bmxlc3MgZXhpc3RzXG5cdFx0XHRcdGxvZy53YXJuIFwiW2xlc3M6Y29tcGlsZV0gRW50cnkgZmlsZSBgI3tlbnRyeUZpbGVQYXRofWAgbm90IGZvdW5kLlwiXG5cdFx0XHRcdHJldHVybiBjYigpXG5cblx0XHRcdHMgPSBndWxwLnNyYyBlbnRyeUZpbGVQYXRoXG5cdFx0XHRcdC5waXBlIGd1bHBUYXAgKGZpbGUpIC0+XG5cdFx0XHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6Y29tcGlsZV0gQ29tcGlsaW5nIGAje2ZpbGUucGF0aH1gLlwiXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdC5waXBlIGd1bHBMZXNzKClcblxuXHRcdFx0cyA9IHMucGlwZSBndWxwQ3NzbmFubygpIGlmIGlzUHJvZHVjdGlvblxuXG5cdFx0XHRzXG5cdFx0XHRcdC5waXBlIGd1bHBSZW5hbWUgXCIje3RoZW1lfS5jc3NcIlxuXHRcdFx0XHQucGlwZSBndWxwLmRlc3QgdGFyZ2V0RGlyZWN0b3J5UGF0aFxuXHRcdFx0XHQub24gXCJlbmRcIiwgY2JcblxuXHRoYW5kbGVUaGVtZXNDb21waWxlID0gKGNiKSAtPlxuXHRcdGlmIGlzUHJvZHVjdGlvblxuXHRcdFx0YnVpbGRBbGxUaGVtZXMgY2Jcblx0XHRlbHNlXG5cdFx0XHRidWlsZEN1cnJlbnRUaGVtZSBjYlxuXG5cdGhhbmRsZUNvbXBpbGUgPSAoY2IpIC0+XG5cdFx0bG9nLmRlYnVnIFwiW2xlc3M6Y29tcGlsZV0gRW50cnkgZmlsZSBwYXRoOiBgI3tlbnRyeUZpbGVQYXRofWAuXCJcblx0XHRsb2cuZGVidWcgXCJbbGVzczpjb21waWxlXSBUYXJnZXQgZGlyZWN0b3J5IHBhdGg6IGAje3RhcmdldERpcmVjdG9yeVBhdGh9YC5cIlxuXG5cdFx0ZW50cnlGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZSBzb3VyY2VEaXJlY3RvcnlQYXRoLCBcImFwcC5sZXNzXCJcblxuXHRcdGZzLmV4aXN0cyBlbnRyeUZpbGVQYXRoLCAoZXhpc3RzKSAtPlxuXHRcdFx0dW5sZXNzIGV4aXN0c1xuXHRcdFx0XHRsb2cud2FybiBcIltsZXNzOmNvbXBpbGVdIEVudHJ5IGZpbGUgYCN7ZW50cnlGaWxlUGF0aH1gIG5vdCBmb3VuZC5cIlxuXHRcdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0XHRzID0gZ3VscC5zcmMgZW50cnlGaWxlUGF0aFxuXHRcdFx0XHQucGlwZSBndWxwVGFwIChmaWxlKSAtPlxuXHRcdFx0XHRcdGxvZy5kZWJ1ZyBcIltsZXNzOmNvbXBpbGVdIENvbXBpbGluZyBgI3tmaWxlLnBhdGh9YC5cIlxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHQucGlwZSBndWxwTGVzcygpXG5cblx0XHRcdHMgPSBzLnBpcGUgZ3VscENzc25hbm8oKSBpZiBpc1Byb2R1Y3Rpb25cblxuXHRcdFx0cy5waXBlIGd1bHAuZGVzdCB0YXJnZXREaXJlY3RvcnlQYXRoXG5cdFx0XHRcdC5vbiBcImVuZFwiLCBjYlxuXG5cdGd1bHAudGFzayBcImxlc3M6Y29tcGlsZVwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiW2xlc3M6Y29tcGlsZV0gU2tpcHBpbmcgOiBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGZzLmV4aXN0cyB0aGVtZXNEaXJlY3RvcnlQYXRoLCAodGhlbWVzRm9sZGVyRXhpc3RzKSAtPlxuXHRcdFx0bG9nLmRlYnVnIFwiW2xlc3M6Y29tcGlsZV0gVGhlbWUgZm9sZGVyIGRvZXMje2lmIHRoZW1lc0ZvbGRlckV4aXN0cyB0aGVuIFwiXCIgZWxzZSBcIiBub3RcIn0gZXhpc3QuXCJcblxuXHRcdFx0aWYgdGhlbWVzRm9sZGVyRXhpc3RzXG5cdFx0XHRcdGhhbmRsZVRoZW1lc0NvbXBpbGUgY2Jcblx0XHRcdGVsc2Vcblx0XHRcdFx0aGFuZGxlQ29tcGlsZSBjYlxuXG5cdFx0cmV0dXJuXG5cbiJdfQ==

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

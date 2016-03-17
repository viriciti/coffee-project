var async, fs, gulp, gulpCssnano, gulpLess, gulpTap, log, lsr, path;

async = require("async");

fs = require("fs");

gulp = require("gulp");

gulpCssnano = require("gulp-cssnano");

gulpLess = require("gulp-less");

gulpTap = require("gulp-tap");

lsr = require("lsr");

path = require("path");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, entryFilePath, options, sourceDirectoryPath, targetDirectoryPath, theme, themesDirectoryPath;
  options = coffeeProjectOptions.less;
  enabled = options.enabled;
  theme = options.theme;
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  themesDirectoryPath = path.resolve(sourceDirectoryPath, "themes");
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  entryFilePath = path.resolve(sourceDirectoryPath, "themes/" + theme + "/theme.less");
  if (!theme) {
    entryFilePath = path.resolve(sourceDirectoryPath, "app.less");
  }
  gulp.task("less:themes", function(cb) {
    if (enabled !== true) {
      log.info("Skipping less:themes: Disabled.");
      return cb();
    }
    if (!theme) {
      log.info("Skipping less:themes: No theme specified.");
      return cb();
    }
    lsr(themesDirectoryPath, function(error, stats) {
      if (error) {
        return cb(error);
      }
      return async.each(stats, function(stat, cb) {
        var themeFilePath;
        if (!stat.isDirectory()) {
          return cb();
        }
        console.log(themesDirectoryPath, stat.name, "theme.less");
        themeFilePath = path.resolve(themesDirectoryPath, stat.name, "theme.less");
        return fs.exists(themeFilePath, function(exists) {
          if (!exists) {
            log.warn("[less:themes] Entry file `" + themeFilePath + "` not found.");
            return cb();
          }
          return gulp.src(themeFilePath).pipe(gulpTap(function(file) {
            log.debug("[less:themes] Compiling `" + file.path + "`.");
          })).pipe(gulpLess()).pipe(gulpCssnano()).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
        });
      }, function() {
        console.log("done!");
        process.exit();
        return cb();
      });
    });
  });
  return gulp.task("less:compile", function(cb) {
    if (!enabled) {
      log.info("Skipping less:compile: Disabled.");
      return cb();
    }
    log.debug("[less:compile] Entry file path: `" + entryFilePath + "`.");
    log.debug("[less:compile] Target directory path: `" + targetDirectoryPath + "`.");
    fs.exists(entryFilePath, function(exists) {
      if (!exists) {
        log.warn("[less:compile] Entry file `" + entryFilePath + "` not found.");
        return cb();
      }
      return gulp.src(entryFilePath).pipe(gulpTap(function(file) {
        log.debug("[less:compile] Compiling `" + file.path + "`.");
      })).pipe(gulpLess()).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
    });
  });
};

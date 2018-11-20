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

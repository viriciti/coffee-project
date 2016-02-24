var fs, gulp, gulpLess, gulpTap, log, path;

fs = require("fs");

gulp = require("gulp");

gulpLess = require("gulp-less");

gulpTap = require("gulp-tap");

path = require("path");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, entryFilePath, options, targetDirectoryPath;
  options = coffeeProjectOptions.less;
  enabled = options.enabled;
  entryFilePath = path.resolve(options.entryFilePath);
  targetDirectoryPath = path.resolve(options.targetDirectoryPath);
  return gulp.task("less:compile", function(cb) {
    if (enabled !== true) {
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

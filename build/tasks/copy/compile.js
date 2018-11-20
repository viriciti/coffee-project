var gulp, gulpTap, log, path;

path = require("path");

gulp = require("gulp");

gulpTap = require("gulp-tap");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, excluded, options, sourceDirectoryPath, targetDirectoryPath;
  options = coffeeProjectOptions.copy;
  enabled = options.enabled;
  excluded = options.excluded;
  sourceDirectoryPath = options.sourceDirectoryPath;
  targetDirectoryPath = options.targetDirectoryPath;
  return gulp.task("copy:compile", function(cb) {
    var sourceGlob;
    if (enabled !== true) {
      log.info("Skipping copy:compile: Disabled.");
      return cb();
    }
    log.debug("[copy:compile] Source directory path: `" + sourceDirectoryPath + "`.");
    log.debug("[copy:compile] Target directory path: `" + targetDirectoryPath + "`.");
    excluded = (excluded || []).map(function(x) {
      return "!" + x;
    });
    sourceGlob = [sourceDirectoryPath + "/**/*"].concat(excluded);
    gulp.src(sourceGlob).pipe(gulpTap(function(file) {
      log.debug("[copy:compile] Copying `" + file.path + "`.");
    })).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
  });
};

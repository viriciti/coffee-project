var enabled, excluded, gulp, gulpTap, log, options, path, sourceDirectoryPath, targetDirectoryPath;

path = require("path");

gulp = require("gulp");

gulpTap = require("gulp-tap");

log = require("../../lib/log");

options = coffeeProjectOptions.copy;

enabled = options.enabled;

excluded = options.excluded;

sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

gulp.task("copy:compile", function(cb) {
  var sourceGlob;
  if (enabled !== true) {
    log.info("Skipping copy:compile: Disabled.");
    return cb();
  }
  log.debug("[copy:compile] Source directory path: `" + sourceDirectoryPath + "`.");
  log.debug("[copy:compile] Target directory path: `" + targetDirectoryPath + "`.");
  excluded = excluded.map(function(x) {
    return "!" + x;
  });
  sourceGlob = ["" + sourceDirectoryPath + "/**/*"].concat(excluded);
  gulp.src(sourceGlob).pipe(gulpTap(function(file) {
    log.debug("[copy:compile] Copying `" + file.path + "`.");
  })).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
});

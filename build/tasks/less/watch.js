var diskWatcher, enabled, entryFilePath, fs, gulp, gulpLess, gulpLivereload, log, options, path, targetDirectoryPath, watchEnabled;

fs = require("fs");

path = require("path");

gulp = require("gulp");

gulpLess = require("gulp-less");

gulpLivereload = require("gulp-livereload");

log = require("../../lib/log");

diskWatcher = require("../../lib/disk-watcher");

options = coffeeProjectOptions.less;

enabled = options.enabled;

entryFilePath = path.resolve(options.entryFilePath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

watchEnabled = coffeeProjectOptions.watch.enabled;

gulp.task("less:watch", ["less:compile", "livereload:run"], function(cb) {
  if (!(enabled === true && watchEnabled === true)) {
    log.info("Skipping less:watch: Disabled.");
    return cb();
  }
  log.debug("[less:watch] Entry file path: `" + entryFilePath + "`.");
  log.debug("[less:watch] Target directory path: `" + targetDirectoryPath + "`.");
  fs.exists(entryFilePath, function(exists) {
    var compile;
    if (!exists) {
      log.info("Skipping less:compile: File `" + entryFilePath + "` not found.");
      return cb();
    }
    compile = function() {
      return gulp.src(entryFilePath).pipe(gulpLess()).pipe(gulp.dest(targetDirectoryPath)).pipe(gulpLivereload({
        auto: false
      }));
    };
    return diskWatcher.src().on("change", function(options) {
      if (!options.path.match(/\.less/)) {
        return;
      }
      log.debug("[less:watch] Compiling `" + entryFilePath + "`.");
      return compile();
    });
  });
});

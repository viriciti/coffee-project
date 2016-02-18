var fs, gulp, gulpNodemon, log, path;

fs = require("fs");

path = require("path");

gulp = require("gulp");

gulpNodemon = require("gulp-nodemon");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, entryFilePath, extensions, options, watchGlob, watchNodemon;
  options = coffeeProjectOptions.nodemon;
  enabled = options.enabled;
  entryFilePath = path.resolve(options.entryFilePath);
  watchGlob = options.watchGlob;
  if (options.extra) {
    watchGlob = watchGlob.concat(options.extra);
  }
  extensions = options.extensions || [];
  watchNodemon = function() {
    return gulpNodemon({
      verbose: !!+process.env.DEBUG,
      script: entryFilePath,
      watch: watchGlob,
      ext: extensions.join(" ")
    });
  };
  return gulp.task("nodemon:run", function(cb) {
    if (!enabled) {
      log.info("Skipping nodemon:run: Disabled.");
      return cb();
    }
    log.debug("[nodemon:run] Entry file path: `" + entryFilePath + "`.");
    log.debug("[nodemon:run] Watch Globs: `" + (watchGlob.join(",")) + "`.");
    watchNodemon();
    cb();
  });
};

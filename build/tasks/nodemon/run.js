var fs, gulp, livereload, log, nodemon, path;

fs = require("fs");

path = require("path");

gulp = require("gulp");

nodemon = require("gulp-nodemon");

livereload = require("gulp-livereload");

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
    return nodemon({
      verbose: !!+process.env.DEBUG,
      script: entryFilePath,
      watch: watchGlob,
      ext: extensions.join(" ")
    }).on("restart", function(paths) {
      var ref;
      if (!((ref = coffeeProjectOptions.livereload) != null ? ref.enabled : void 0)) {
        return;
      }
      return setTimeout(function() {
        return livereload().write({
          path: paths[0]
        });
      }, 1000);
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

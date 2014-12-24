var browserify, enabled, entryFilePath, fs, gulp, gulpLivereload, gulpTap, jadeify, log, options, path, targetDirectoryPath, targetFilename, vinylSource, watchEnabled, watchify;

fs = require("fs");

path = require("path");

gulp = require("gulp");

gulpTap = require("gulp-tap");

gulpLivereload = require("gulp-livereload");

vinylSource = require("vinyl-source-stream");

watchify = require("watchify");

browserify = require("browserify");

jadeify = require("jadeify");

log = require("../../lib/log");

options = coffeeProjectOptions.browserify;

enabled = options.enabled;

entryFilePath = path.resolve(options.entryFilePath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

targetFilename = options.targetFilename;

watchEnabled = coffeeProjectOptions.watch.enabled;

gulp.task("browserify:watch", ["browserify:compile", "livereload:run"], function(cb) {
  if (!(enabled === true && watchEnabled === true)) {
    log.info("Skipping browserify:watch: Disabled.");
    return cb();
  }
  log.debug("[browserify:watch] Entry file: `" + entryFilePath + "`.");
  log.debug("[browserify:watch] Target directory path: `" + targetDirectoryPath + "`.");
  log.debug("[browserify:watch] Target filename: `" + targetFilename + "`.");
  fs.exists(entryFilePath, function(exists) {
    var bundle, bundler, compile;
    if (!exists) {
      log.info("[browserify:watch] Entry file `" + entryFilePath + "` not found.");
      return cb();
    }
    bundler = watchify(browserify({
      paths: options.paths,
      entries: [entryFilePath],
      extensions: [".coffee", ".js", ".json", ".jade"],
      debug: true
    }));
    bundler.transform(jadeify);
    bundle = bundler.bundle();
    compile = function() {
      bundle.on("error", log.error.bind(log));
      return bundle.pipe(vinylSource(targetFilename)).pipe(gulpTap(function(file) {
        log.debug("[browserify:watch] Compiled `" + file.path + "`.");
      })).pipe(gulp.dest(targetDirectoryPath)).pipe(gulpLivereload({
        auto: false
      }));
    };
    bundler.on("update", compile);
    compile();
  });
});

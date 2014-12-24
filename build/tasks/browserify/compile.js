var Transform, browserify, enabled, entryFilePath, fs, gulp, gulpTap, jadeify, log, options, path, targetDirectoryPath, targetFilename, vinylSource;

fs = require("fs");

path = require("path");

browserify = require("browserify");

jadeify = require("jadeify");

gulp = require("gulp");

gulpTap = require("gulp-tap");

vinylSource = require("vinyl-source-stream");

Transform = require("stream").Transform;

log = require("../../lib/log");

options = coffeeProjectOptions.browserify;

enabled = options.enabled;

entryFilePath = path.resolve(options.entryFilePath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

targetFilename = options.targetFilename;

gulp.task("browserify:compile", ["coffee:compile", "copy:compile"], function(cb) {
  if (enabled !== true) {
    log.info("[browserify:compile] Disabled.");
    return cb();
  }
  log.debug("[browserify:compile] Entry file: `" + entryFilePath + "`.");
  log.debug("[browserify:compile] Target directory path: `" + targetDirectoryPath + "`.");
  log.debug("[browserify:compile] Target filename: `" + targetFilename + "`.");
  fs.exists(entryFilePath, function(exists) {
    var bundle, bundler;
    if (!exists) {
      log.warn("[browserify:compile] Entry file `" + entryFilePath + "` not found.");
      return cb();
    }
    bundler = browserify({
      paths: options.paths,
      entries: [entryFilePath],
      extensions: [".coffee", ".js", ".json", ".jade"],
      debug: true
    });
    bundler.transform(jadeify);
    bundle = bundler.bundle();
    bundle.on("error", log.error.bind(log));
    bundle.pipe(vinylSource(targetFilename)).pipe(gulpTap(function(file) {
      log.debug("[browserify:compile] Compiled `" + file.path + "`.");
    })).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
  });
});

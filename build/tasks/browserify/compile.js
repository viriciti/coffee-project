var browserify, coffeeReactify, enabled, entryFilePath, fs, gulp, gulpTap, jadeify, log, options, path, paths, targetDirectoryPath, targetFilename, vinylSource;

fs = require("fs");

path = require("path");

browserify = require("browserify");

coffeeReactify = require("coffee-reactify");

gulp = require("gulp");

gulpTap = require("gulp-tap");

jadeify = require("jadeify");

vinylSource = require("vinyl-source-stream");

log = require("../../lib/log");

options = coffeeProjectOptions.browserify;

enabled = options.enabled;

entryFilePath = path.resolve(options.entryFilePath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

targetFilename = options.targetFilename;

paths = options.paths;

gulp.task("browserify:compile", ["coffee:compile", "copy:compile"], function(cb) {
  if (enabled !== true) {
    log.info("[browserify:compile] Disabled.");
    return cb();
  }
  log.debug("[browserify:compile] Entry file: `" + entryFilePath + "`.");
  log.debug("[browserify:compile] Target directory path: `" + targetDirectoryPath + "`.");
  log.debug("[browserify:compile] Target filename: `" + targetFilename + "`.");
  return fs.exists(entryFilePath, function(exists) {
    var bundler;
    if (!exists) {
      log.warn("[browserify:compile] Entry file `" + entryFilePath + "` not found.");
      return cb();
    }
    bundler = browserify({
      extensions: [".js", ".jade"],
      paths: paths
    });
    bundler.transform(jadeify);
    bundler.transform(coffeeReactify);
    bundler.add(entryFilePath);
    return bundler.bundle().pipe(vinylSource(targetFilename)).pipe(gulpTap(function(file) {
      return log.debug("[browserify:compile] Compiled `" + file.path + "`.");
    })).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
  });
});

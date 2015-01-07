var browserify, debowerify, enabled, entryFilePath, fs, gulp, gulpLivereload, gulpTap, jadeify, log, options, path, paths, targetDirectoryPath, targetFilename, vinylSource, watchEnabled, watchify;

fs = require("fs");

path = require("path");

browserify = require("browserify");

jadeify = require("jadeify");

debowerify = require("debowerify");

gulp = require("gulp");

gulpTap = require("gulp-tap");

vinylSource = require("vinyl-source-stream");

gulpLivereload = require("gulp-livereload");

watchify = require("watchify");

log = require("../../lib/log");

options = coffeeProjectOptions.browserify;

enabled = options.enabled;

entryFilePath = path.resolve(options.entryFilePath);

targetDirectoryPath = path.resolve(options.targetDirectoryPath);

targetFilename = options.targetFilename;

watchEnabled = coffeeProjectOptions.watch.enabled;

paths = options.paths;

gulp.task("browserify:watch", ["browserify:compile", "livereload:run"], function(cb) {
  if (!(enabled && watchEnabled)) {
    log.info("Skipping browserify:watch: Disabled.");
    return cb();
  }
  log.debug("[browserify:watch] Entry file: `" + entryFilePath + "`.");
  log.debug("[browserify:watch] Target directory path: `" + targetDirectoryPath + "`.");
  log.debug("[browserify:watch] Target filename: `" + targetFilename + "`.");
  return fs.exists(entryFilePath, function(exists) {
    var bundler, compile;
    if (!exists) {
      log.info("[browserify:watch] Entry file `" + entryFilePath + "` not found.");
      return cb();
    }
    bundler = watchify(browserify({
      cache: {},
      packageCache: {},
      fullPaths: true,
      extensions: [".js", ".jade"],
      paths: paths
    }));
    bundler.transform(jadeify);
    bundler.transform(debowerify);
    bundler.add(entryFilePath);
    compile = function() {
      return bundler.bundle().pipe(vinylSource(targetFilename)).pipe(gulpTap(function(file) {
        return log.debug("[browserify:watch] Compiled `" + file.path + "`.");
      })).pipe(gulp.dest(targetDirectoryPath)).pipe(gulpLivereload({
        auto: false
      }));
    };
    bundler.on("update", compile);
    return compile();
  });
});

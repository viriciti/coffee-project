var gulp, path, srcWatch, testWatch, watch;

path = require("path");

gulp = require("gulp");

watch = require("gulp-watch");

srcWatch = null;

testWatch = null;

module.exports = function(coffeeProjectOptions) {
  var options, sourceDirectoryPath, testDirectoryPath;
  options = coffeeProjectOptions.watch;
  sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);
  testDirectoryPath = path.resolve(options.testDirectoryPath);
  return {
    src: function() {
      srcWatch || (srcWatch = gulp.src(sourceDirectoryPath + "/**/*").pipe(watch(sourceDirectoryPath + "/**/*")));
      return srcWatch;
    },
    test: function() {
      testWatch || (testWatch = gulp.src(testDirectoryPath + "/**/*").pipe(watch(testDirectoryPath + "/**/*")));
      return testWatch;
    }
  };
};

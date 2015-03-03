var gulp, options, path, sourceDirectoryPath, srcWatch, testDirectoryPath, testWatch;

path = require("path");

gulp = require("gulp");

srcWatch = null;

testWatch = null;

options = coffeeProjectOptions.watch;

sourceDirectoryPath = path.resolve(options.sourceDirectoryPath);

testDirectoryPath = path.resolve(options.testDirectoryPath);

module.exports = {
  src: function() {
    srcWatch || (srcWatch = gulp.watch(sourceDirectoryPath + "/**/*", {
      read: false
    }));
    return srcWatch;
  },
  test: function() {
    testWatch || (testWatch = gulp.watch(testDirectoryPath + "/**/*", {
      read: false
    }));
    return testWatch;
  }
};

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliL2Rpc2std2F0Y2hlci5qcyIsInNvdXJjZXMiOlsibGliL2Rpc2std2F0Y2hlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxJQUFBLEdBQVEsT0FBQSxDQUFRLE1BQVI7O0FBQ1IsSUFBQSxHQUFRLE9BQUEsQ0FBUSxNQUFSOztBQUNSLEtBQUEsR0FBUSxPQUFBLENBQVEsWUFBUjs7QUFFUixRQUFBLEdBQVk7O0FBQ1osU0FBQSxHQUFZOztBQUVaLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsb0JBQUQ7QUFDaEIsTUFBQTtFQUFBLE9BQUEsR0FBc0Isb0JBQW9CLENBQUM7RUFDM0MsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxPQUFPLENBQUMsbUJBQXJCO0VBQ3RCLGlCQUFBLEdBQXNCLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLGlCQUFyQjtTQUV0QjtJQUFBLEdBQUEsRUFBSyxTQUFBO01BQ0osYUFBQSxXQUFhLElBQ1osQ0FBQyxHQURXLENBQ0osbUJBQUQsR0FBcUIsT0FEaEIsQ0FFWixDQUFDLElBRlcsQ0FFTixLQUFBLENBQVMsbUJBQUQsR0FBcUIsT0FBN0IsQ0FGTTthQUliO0lBTEksQ0FBTDtJQU9BLElBQUEsRUFBTSxTQUFBO01BQ0wsY0FBQSxZQUFjLElBQ2IsQ0FBQyxHQURZLENBQ0wsaUJBQUQsR0FBbUIsT0FEYixDQUViLENBQUMsSUFGWSxDQUVQLEtBQUEsQ0FBUyxpQkFBRCxHQUFtQixPQUEzQixDQUZPO2FBSWQ7SUFMSyxDQVBOOztBQUxnQiIsInNvdXJjZXNDb250ZW50IjpbInBhdGggID0gcmVxdWlyZSBcInBhdGhcIlxuZ3VscCAgPSByZXF1aXJlIFwiZ3VscFwiXG53YXRjaCA9IHJlcXVpcmUgXCJndWxwLXdhdGNoXCJcblxuc3JjV2F0Y2ggID0gbnVsbFxudGVzdFdhdGNoID0gbnVsbFxuXG5tb2R1bGUuZXhwb3J0cyA9IChjb2ZmZWVQcm9qZWN0T3B0aW9ucykgLT5cblx0b3B0aW9ucyAgICAgICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLndhdGNoXG5cdHNvdXJjZURpcmVjdG9yeVBhdGggPSBwYXRoLnJlc29sdmUgb3B0aW9ucy5zb3VyY2VEaXJlY3RvcnlQYXRoXG5cdHRlc3REaXJlY3RvcnlQYXRoICAgPSBwYXRoLnJlc29sdmUgb3B0aW9ucy50ZXN0RGlyZWN0b3J5UGF0aFxuXG5cdHNyYzogLT5cblx0XHRzcmNXYXRjaCBvcj0gZ3VscFxuXHRcdFx0LnNyYyBcIiN7c291cmNlRGlyZWN0b3J5UGF0aH0vKiovKlwiXG5cdFx0XHQucGlwZSB3YXRjaCBcIiN7c291cmNlRGlyZWN0b3J5UGF0aH0vKiovKlwiXG5cblx0XHRzcmNXYXRjaFxuXG5cdHRlc3Q6IC0+XG5cdFx0dGVzdFdhdGNoIG9yPSBndWxwXG5cdFx0XHQuc3JjIFwiI3t0ZXN0RGlyZWN0b3J5UGF0aH0vKiovKlwiXG5cdFx0XHQucGlwZSB3YXRjaCBcIiN7dGVzdERpcmVjdG9yeVBhdGh9LyoqLypcIlxuXG5cdFx0dGVzdFdhdGNoXG4iXX0=

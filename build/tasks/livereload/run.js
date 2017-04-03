var gulp, gulpLivereload, log, net;

net = require("net");

gulp = require("gulp");

gulpLivereload = require("gulp-livereload");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, options;
  options = coffeeProjectOptions.livereload;
  enabled = options.enabled;
  return gulp.task("livereload:run", function(cb) {
    var connection;
    if (enabled !== true) {
      log.info("Skipping livereload:run: Disabled.");
      return cb();
    }
    connection = net.connect(35729);
    connection.on("connect", function() {
      log.info("Livereload server already running.");
      return cb();
    });
    connection.on("error", function() {
      log.info("Livereload server not yet running. Starting one.");
      gulpLivereload.listen();
      return cb();
    });
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvbGl2ZXJlbG9hZC9ydW4uanMiLCJzb3VyY2VzIjpbInRhc2tzL2xpdmVyZWxvYWQvcnVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEdBQUEsR0FBaUIsT0FBQSxDQUFRLEtBQVI7O0FBQ2pCLElBQUEsR0FBaUIsT0FBQSxDQUFRLE1BQVI7O0FBQ2pCLGNBQUEsR0FBaUIsT0FBQSxDQUFRLGlCQUFSOztBQUVqQixHQUFBLEdBQU0sT0FBQSxDQUFRLGVBQVI7O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxvQkFBRDtBQUNoQixNQUFBO0VBQUEsT0FBQSxHQUFVLG9CQUFvQixDQUFDO0VBQy9CLE9BQUEsR0FBVSxPQUFPLENBQUM7U0FFbEIsSUFBSSxDQUFDLElBQUwsQ0FBVSxnQkFBVixFQUE0QixTQUFDLEVBQUQ7QUFDM0IsUUFBQTtJQUFBLElBQU8sT0FBQSxLQUFXLElBQWxCO01BQ0MsR0FBRyxDQUFDLElBQUosQ0FBUyxvQ0FBVDtBQUNBLGFBQU8sRUFBQSxDQUFBLEVBRlI7O0lBS0EsVUFBQSxHQUFhLEdBQUcsQ0FBQyxPQUFKLENBQVksS0FBWjtJQUdiLFVBQVUsQ0FBQyxFQUFYLENBQWMsU0FBZCxFQUF5QixTQUFBO01BQ3hCLEdBQUcsQ0FBQyxJQUFKLENBQVMsb0NBQVQ7YUFDQSxFQUFBLENBQUE7SUFGd0IsQ0FBekI7SUFLQSxVQUFVLENBQUMsRUFBWCxDQUFjLE9BQWQsRUFBdUIsU0FBQTtNQUN0QixHQUFHLENBQUMsSUFBSixDQUFTLGtEQUFUO01BQ0EsY0FBYyxDQUFDLE1BQWYsQ0FBQTthQUNBLEVBQUEsQ0FBQTtJQUhzQixDQUF2QjtFQWQyQixDQUE1QjtBQUpnQiIsInNvdXJjZXNDb250ZW50IjpbIm5ldCAgICAgICAgICAgID0gcmVxdWlyZSBcIm5ldFwiXG5ndWxwICAgICAgICAgICA9IHJlcXVpcmUgXCJndWxwXCJcbmd1bHBMaXZlcmVsb2FkID0gcmVxdWlyZSBcImd1bHAtbGl2ZXJlbG9hZFwiXG5cbmxvZyA9IHJlcXVpcmUgXCIuLi8uLi9saWIvbG9nXCJcblxubW9kdWxlLmV4cG9ydHMgPSAoY29mZmVlUHJvamVjdE9wdGlvbnMpIC0+XG5cdG9wdGlvbnMgPSBjb2ZmZWVQcm9qZWN0T3B0aW9ucy5saXZlcmVsb2FkXG5cdGVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWRcblxuXHRndWxwLnRhc2sgXCJsaXZlcmVsb2FkOnJ1blwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWQgaXMgdHJ1ZVxuXHRcdFx0bG9nLmluZm8gXCJTa2lwcGluZyBsaXZlcmVsb2FkOnJ1bjogRGlzYWJsZWQuXCJcblx0XHRcdHJldHVybiBjYigpXG5cblx0XHQjIEF0dGVtcHQgYSBjb25uZWN0aW9uLlxuXHRcdGNvbm5lY3Rpb24gPSBuZXQuY29ubmVjdCAzNTcyOVxuXG5cdFx0IyBXaGVuIHN1Y2Nlc3NmdWwsIGNvbnRpbnVlLlxuXHRcdGNvbm5lY3Rpb24ub24gXCJjb25uZWN0XCIsIC0+XG5cdFx0XHRsb2cuaW5mbyBcIkxpdmVyZWxvYWQgc2VydmVyIGFscmVhZHkgcnVubmluZy5cIlxuXHRcdFx0Y2IoKVxuXG5cdFx0IyBXaGVuIHVuc3VjY2Vzc2Z1bCwgc3Bhd24gYSBuZXcgc2VydmVyLlxuXHRcdGNvbm5lY3Rpb24ub24gXCJlcnJvclwiLCAtPlxuXHRcdFx0bG9nLmluZm8gXCJMaXZlcmVsb2FkIHNlcnZlciBub3QgeWV0IHJ1bm5pbmcuIFN0YXJ0aW5nIG9uZS5cIlxuXHRcdFx0Z3VscExpdmVyZWxvYWQubGlzdGVuKClcblx0XHRcdGNiKClcblxuXHRcdHJldHVyblxuIl19

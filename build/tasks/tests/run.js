var gulp, log, path, tests;

gulp = require("gulp");

path = require("path");

log = require("../../lib/log");

tests = require("../../lib/tests");

module.exports = function(coffeeProjectOptions) {
  var directoryPath, enabled, options;
  options = coffeeProjectOptions.tests;
  enabled = options.enabled;
  directoryPath = path.resolve(options.directoryPath);
  return gulp.task("tests:run", function(cb) {
    if (!enabled) {
      log.info("Skipping tests:run: Disabled.");
      return cb();
    }
    log.debug("[tests:run] Directory path: `" + directoryPath + "`.");
    tests(directoryPath, true, "spec", cb);
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvdGVzdHMvcnVuLmpzIiwic291cmNlcyI6WyJ0YXNrcy90ZXN0cy9ydW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztBQUNQLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7QUFFUCxHQUFBLEdBQVEsT0FBQSxDQUFRLGVBQVI7O0FBQ1IsS0FBQSxHQUFRLE9BQUEsQ0FBUSxpQkFBUjs7QUFFUixNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLG9CQUFEO0FBQ2hCLE1BQUE7RUFBQSxPQUFBLEdBQWdCLG9CQUFvQixDQUFDO0VBQ3JDLE9BQUEsR0FBZ0IsT0FBTyxDQUFDO0VBQ3hCLGFBQUEsR0FBZ0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxPQUFPLENBQUMsYUFBckI7U0FFaEIsSUFBSSxDQUFDLElBQUwsQ0FBVSxXQUFWLEVBQXVCLFNBQUMsRUFBRDtJQUN0QixJQUFBLENBQU8sT0FBUDtNQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsK0JBQVQ7QUFDQSxhQUFPLEVBQUEsQ0FBQSxFQUZSOztJQUlBLEdBQUcsQ0FBQyxLQUFKLENBQVUsK0JBQUEsR0FBZ0MsYUFBaEMsR0FBOEMsSUFBeEQ7SUFFQSxLQUFBLENBQU0sYUFBTixFQUFxQixJQUFyQixFQUEyQixNQUEzQixFQUFtQyxFQUFuQztFQVBzQixDQUF2QjtBQUxnQiIsInNvdXJjZXNDb250ZW50IjpbImd1bHAgPSByZXF1aXJlIFwiZ3VscFwiXG5wYXRoID0gcmVxdWlyZSBcInBhdGhcIlxuXG5sb2cgICA9IHJlcXVpcmUgXCIuLi8uLi9saWIvbG9nXCJcbnRlc3RzID0gcmVxdWlyZSBcIi4uLy4uL2xpYi90ZXN0c1wiXG5cbm1vZHVsZS5leHBvcnRzID0gKGNvZmZlZVByb2plY3RPcHRpb25zKSAtPlxuXHRvcHRpb25zICAgICAgID0gY29mZmVlUHJvamVjdE9wdGlvbnMudGVzdHNcblx0ZW5hYmxlZCAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHRkaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMuZGlyZWN0b3J5UGF0aFxuXG5cdGd1bHAudGFzayBcInRlc3RzOnJ1blwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgdGVzdHM6cnVuOiBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGxvZy5kZWJ1ZyBcIlt0ZXN0czpydW5dIERpcmVjdG9yeSBwYXRoOiBgI3tkaXJlY3RvcnlQYXRofWAuXCJcblxuXHRcdHRlc3RzIGRpcmVjdG9yeVBhdGgsIHRydWUsIFwic3BlY1wiLCBjYlxuXG5cdFx0cmV0dXJuXG4iXX0=

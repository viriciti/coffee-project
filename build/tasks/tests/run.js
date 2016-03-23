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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tzL3Rlc3RzL3J1bi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0FBQ1AsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztBQUVQLEdBQUEsR0FBUSxPQUFBLENBQVEsZUFBUjs7QUFDUixLQUFBLEdBQVEsT0FBQSxDQUFRLGlCQUFSOztBQUVSLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsb0JBQUQ7QUFDaEIsTUFBQTtFQUFBLE9BQUEsR0FBZ0Isb0JBQW9CLENBQUM7RUFDckMsT0FBQSxHQUFnQixPQUFPLENBQUM7RUFDeEIsYUFBQSxHQUFnQixJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxhQUFyQjtTQUVoQixJQUFJLENBQUMsSUFBTCxDQUFVLFdBQVYsRUFBdUIsU0FBQyxFQUFEO0lBQ3RCLElBQUEsQ0FBTyxPQUFQO01BQ0MsR0FBRyxDQUFDLElBQUosQ0FBUywrQkFBVDtBQUNBLGFBQU8sRUFBQSxDQUFBLEVBRlI7O0lBSUEsR0FBRyxDQUFDLEtBQUosQ0FBVSwrQkFBQSxHQUFnQyxhQUFoQyxHQUE4QyxJQUF4RDtJQUVBLEtBQUEsQ0FBTSxhQUFOLEVBQXFCLElBQXJCLEVBQTJCLE1BQTNCLEVBQW1DLEVBQW5DO0VBUHNCLENBQXZCO0FBTGdCIiwiZmlsZSI6InRhc2tzL3Rlc3RzL3J1bi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImd1bHAgPSByZXF1aXJlIFwiZ3VscFwiXG5wYXRoID0gcmVxdWlyZSBcInBhdGhcIlxuXG5sb2cgICA9IHJlcXVpcmUgXCIuLi8uLi9saWIvbG9nXCJcbnRlc3RzID0gcmVxdWlyZSBcIi4uLy4uL2xpYi90ZXN0c1wiXG5cbm1vZHVsZS5leHBvcnRzID0gKGNvZmZlZVByb2plY3RPcHRpb25zKSAtPlxuXHRvcHRpb25zICAgICAgID0gY29mZmVlUHJvamVjdE9wdGlvbnMudGVzdHNcblx0ZW5hYmxlZCAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHRkaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlIG9wdGlvbnMuZGlyZWN0b3J5UGF0aFxuXG5cdGd1bHAudGFzayBcInRlc3RzOnJ1blwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgdGVzdHM6cnVuOiBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGxvZy5kZWJ1ZyBcIlt0ZXN0czpydW5dIERpcmVjdG9yeSBwYXRoOiBgI3tkaXJlY3RvcnlQYXRofWAuXCJcblxuXHRcdHRlc3RzIGRpcmVjdG9yeVBhdGgsIHRydWUsIFwic3BlY1wiLCBjYlxuXG5cdFx0cmV0dXJuXG4iXX0=

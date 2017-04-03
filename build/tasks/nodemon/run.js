var fs, gulp, livereload, log, nodemon, path;

fs = require("fs");

path = require("path");

gulp = require("gulp");

nodemon = require("gulp-nodemon");

livereload = require("gulp-livereload");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, entryFilePath, extensions, options, watchGlob, watchNodemon;
  options = coffeeProjectOptions.nodemon;
  enabled = options.enabled;
  entryFilePath = path.resolve(options.entryFilePath);
  watchGlob = options.watchGlob;
  if (options.extra) {
    watchGlob = watchGlob.concat(options.extra);
  }
  extensions = options.extensions || [];
  watchNodemon = function() {
    return nodemon({
      verbose: !!+process.env.DEBUG,
      script: entryFilePath,
      watch: watchGlob,
      ext: extensions.join(" ")
    }).on("restart", function(paths) {
      var ref;
      if (!((ref = coffeeProjectOptions.livereload) != null ? ref.enabled : void 0)) {
        return;
      }
      return setTimeout(function() {
        if (paths && paths[0]) {
          return livereload().write({
            path: paths[0]
          });
        }
      }, 1000);
    });
  };
  return gulp.task("nodemon:run", function(cb) {
    if (!enabled) {
      log.info("Skipping nodemon:run: Disabled.");
      return cb();
    }
    log.debug("[nodemon:run] Entry file path: `" + entryFilePath + "`.");
    log.debug("[nodemon:run] Watch Globs: `" + (watchGlob.join(",")) + "`.");
    watchNodemon();
    cb();
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3Mvbm9kZW1vbi9ydW4uanMiLCJzb3VyY2VzIjpbInRhc2tzL25vZGVtb24vcnVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEVBQUEsR0FBTyxPQUFBLENBQVEsSUFBUjs7QUFDUCxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0FBRVAsSUFBQSxHQUFhLE9BQUEsQ0FBUSxNQUFSOztBQUNiLE9BQUEsR0FBYSxPQUFBLENBQVEsY0FBUjs7QUFDYixVQUFBLEdBQWEsT0FBQSxDQUFRLGlCQUFSOztBQUViLEdBQUEsR0FBTSxPQUFBLENBQVEsZUFBUjs7QUFFTixNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLG9CQUFEO0FBQ2hCLE1BQUE7RUFBQSxPQUFBLEdBQWdCLG9CQUFvQixDQUFDO0VBQ3JDLE9BQUEsR0FBZ0IsT0FBTyxDQUFDO0VBQ3hCLGFBQUEsR0FBZ0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxPQUFPLENBQUMsYUFBckI7RUFDaEIsU0FBQSxHQUFnQixPQUFPLENBQUM7RUFDeEIsSUFBa0QsT0FBTyxDQUFDLEtBQTFEO0lBQUEsU0FBQSxHQUFnQixTQUFTLENBQUMsTUFBVixDQUFpQixPQUFPLENBQUMsS0FBekIsRUFBaEI7O0VBQ0EsVUFBQSxHQUFnQixPQUFPLENBQUMsVUFBUixJQUFzQjtFQUV0QyxZQUFBLEdBQWUsU0FBQTtXQUNkLE9BQUEsQ0FDQztNQUFBLE9BQUEsRUFBUyxDQUFJLENBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQTlCO01BQ0EsTUFBQSxFQUFTLGFBRFQ7TUFFQSxLQUFBLEVBQVMsU0FGVDtNQUdBLEdBQUEsRUFBUyxVQUFVLENBQUMsSUFBWCxDQUFnQixHQUFoQixDQUhUO0tBREQsQ0FLQSxDQUFDLEVBTEQsQ0FLSSxTQUxKLEVBS2UsU0FBQyxLQUFEO0FBQ2QsVUFBQTtNQUFBLElBQUEsdURBQTZDLENBQUUsaUJBQS9DO0FBQUEsZUFBQTs7YUFFQSxVQUFBLENBQVcsU0FBQTtRQUNWLElBQXFDLEtBQUEsSUFBVSxLQUFNLENBQUEsQ0FBQSxDQUFyRDtpQkFBQSxVQUFBLENBQUEsQ0FBWSxDQUFDLEtBQWIsQ0FBbUI7WUFBQSxJQUFBLEVBQU0sS0FBTSxDQUFBLENBQUEsQ0FBWjtXQUFuQixFQUFBOztNQURVLENBQVgsRUFFRSxJQUZGO0lBSGMsQ0FMZjtFQURjO1NBYWYsSUFBSSxDQUFDLElBQUwsQ0FBVSxhQUFWLEVBQXlCLFNBQUMsRUFBRDtJQUN4QixJQUFBLENBQU8sT0FBUDtNQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsaUNBQVQ7QUFDQSxhQUFPLEVBQUEsQ0FBQSxFQUZSOztJQUlBLEdBQUcsQ0FBQyxLQUFKLENBQVUsa0NBQUEsR0FBbUMsYUFBbkMsR0FBaUQsSUFBM0Q7SUFDQSxHQUFHLENBQUMsS0FBSixDQUFVLDhCQUFBLEdBQThCLENBQUMsU0FBUyxDQUFDLElBQVYsQ0FBZSxHQUFmLENBQUQsQ0FBOUIsR0FBa0QsSUFBNUQ7SUFFQSxZQUFBLENBQUE7SUFFQSxFQUFBLENBQUE7RUFWd0IsQ0FBekI7QUFyQmdCIiwic291cmNlc0NvbnRlbnQiOlsiZnMgICA9IHJlcXVpcmUgXCJmc1wiXG5wYXRoID0gcmVxdWlyZSBcInBhdGhcIlxuXG5ndWxwICAgICAgID0gcmVxdWlyZSBcImd1bHBcIlxubm9kZW1vbiAgICA9IHJlcXVpcmUgXCJndWxwLW5vZGVtb25cIlxubGl2ZXJlbG9hZCA9IHJlcXVpcmUgXCJndWxwLWxpdmVyZWxvYWRcIlxuXG5sb2cgPSByZXF1aXJlIFwiLi4vLi4vbGliL2xvZ1wiXG5cbm1vZHVsZS5leHBvcnRzID0gKGNvZmZlZVByb2plY3RPcHRpb25zKSAtPlxuXHRvcHRpb25zICAgICAgID0gY29mZmVlUHJvamVjdE9wdGlvbnMubm9kZW1vblxuXHRlbmFibGVkICAgICAgID0gb3B0aW9ucy5lbmFibGVkXG5cdGVudHJ5RmlsZVBhdGggPSBwYXRoLnJlc29sdmUgb3B0aW9ucy5lbnRyeUZpbGVQYXRoXG5cdHdhdGNoR2xvYiAgICAgPSBvcHRpb25zLndhdGNoR2xvYlxuXHR3YXRjaEdsb2IgICAgID0gd2F0Y2hHbG9iLmNvbmNhdCBvcHRpb25zLmV4dHJhIGlmIG9wdGlvbnMuZXh0cmFcblx0ZXh0ZW5zaW9ucyAgICA9IG9wdGlvbnMuZXh0ZW5zaW9ucyBvciBbXVxuXG5cdHdhdGNoTm9kZW1vbiA9IC0+XG5cdFx0bm9kZW1vblxuXHRcdFx0dmVyYm9zZTogbm90IG5vdCArcHJvY2Vzcy5lbnYuREVCVUdcblx0XHRcdHNjcmlwdDogIGVudHJ5RmlsZVBhdGhcblx0XHRcdHdhdGNoOiAgIHdhdGNoR2xvYlxuXHRcdFx0ZXh0OiAgICAgZXh0ZW5zaW9ucy5qb2luIFwiIFwiXG5cdFx0Lm9uIFwicmVzdGFydFwiLCAocGF0aHMpIC0+XG5cdFx0XHRyZXR1cm4gdW5sZXNzIGNvZmZlZVByb2plY3RPcHRpb25zLmxpdmVyZWxvYWQ/LmVuYWJsZWRcblxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRsaXZlcmVsb2FkKCkud3JpdGUgcGF0aDogcGF0aHNbMF0gaWYgcGF0aHMgYW5kIHBhdGhzWzBdXG5cdFx0XHQsIDEwMDBcblxuXHRndWxwLnRhc2sgXCJub2RlbW9uOnJ1blwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgbm9kZW1vbjpydW46IERpc2FibGVkLlwiXG5cdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0bG9nLmRlYnVnIFwiW25vZGVtb246cnVuXSBFbnRyeSBmaWxlIHBhdGg6IGAje2VudHJ5RmlsZVBhdGh9YC5cIlxuXHRcdGxvZy5kZWJ1ZyBcIltub2RlbW9uOnJ1bl0gV2F0Y2ggR2xvYnM6IGAje3dhdGNoR2xvYi5qb2luIFwiLFwifWAuXCJcblxuXHRcdHdhdGNoTm9kZW1vbigpXG5cblx0XHRjYigpXG5cblx0XHRyZXR1cm5cbiJdfQ==

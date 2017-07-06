var _, browserify, coffeeReactify, coffeeify, fs, gulp, gulpStreamify, gulpTap, gulpUglify, jadeify, log, path, vinylSource;

_ = require("lodash");

browserify = require("browserify");

coffeeify = require("coffeeify");

coffeeReactify = require("coffee-reactify");

fs = require("fs");

gulp = require("gulp");

gulpStreamify = require("gulp-streamify");

gulpTap = require("gulp-tap");

gulpUglify = require("gulp-uglify");

jadeify = require("jadeify");

path = require("path");

vinylSource = require("vinyl-source-stream");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, externals, isProduction, options, sourcemaps;
  options = coffeeProjectOptions.bundle;
  enabled = options.enabled;
  sourcemaps = options.sourcemaps;
  externals = options.externals || [];
  isProduction = process.env.NODE_ENV === "production";
  gulp.task("bundle:vendor:rm", function(cb) {
    var bundle, bundlePath, target;
    target = options.vendor.target;
    bundle = options.vendor.bundle;
    bundlePath = path.resolve(target + "/" + bundle);
    return fs.exists(bundlePath, function(exists) {
      if (!exists) {
        log.debug("[bundle:vendor:rm] Not there, nothing to remove.");
        return cb();
      }
      return fs.unlink(bundlePath, function(error) {
        log.debug("[bundle:vendor:rm] Removed " + bundlePath);
        return cb(error);
      });
    });
  });
  gulp.task("bundle:vendor", function(cb) {
    var bundle, bundlePath, source, target;
    if (!enabled) {
      log.info("[bundle:compile] [vendor] Disabled.");
      return cb();
    }
    if (!(externals != null ? externals.length : void 0)) {
      log.info("[bundle:compile] [vendor] No externals defined. Skipping.");
      return cb();
    }
    target = options.vendor.target;
    bundle = options.vendor.bundle;
    source = options.vendor.source;
    bundlePath = target + "/" + bundle;
    fs.exists(bundlePath, function(bundleExists) {
      var bundler, s;
      if (!isProduction) {
        if (bundleExists) {
          log.info("[bundle:compile] [vendor] Bundle already there. Skipping.");
          return cb();
        }
      }
      log.debug("[bundle:compile] [vendor] Target directory: `" + target + "`.");
      log.debug("[bundle:compile] [vendor] Target bundle:    `" + bundle + "`.");
      log.debug("[bundle:compile] [vendor] Source:           `" + source + "`.");
      bundler = browserify({
        debug: false
      });
      bundler.transform(coffeeify);
      _.each(externals, function(external) {
        if (typeof external === "string") {
          external = {
            require: external
          };
        }
        if (external.expose) {
          return bundler.require(external.require, {
            expose: external.expose
          });
        } else {
          console.log;
          return bundler.require(external.require);
        }
      });
      s = bundler.bundle().pipe(vinylSource(bundle)).pipe(gulpTap(function(file) {
        return log.debug("[bundle:compile] [vendor] Compiled `" + file.path + "`.");
      }));
      if (isProduction) {
        s = s.pipe(gulpStreamify(gulpUglify()));
      }
      return s.pipe(gulp.dest(target)).on("end", cb);
    });
  });
  return gulp.task("bundle:compile", ["bundle:vendor"], function(cb) {
    var bundle, entry, extensions, paths, target, transforms;
    if (!enabled) {
      log.info("[bundle:compile] Disabled.");
      return cb();
    }
    entry = options.app.entry;
    target = options.app.target;
    bundle = options.app.bundle;
    paths = options.app.paths;
    extensions = options.app.extensions;
    transforms = options.app.transforms;
    log.debug("[bundle:compile] [app] Entry file:       `" + entry + "`.");
    log.debug("[bundle:compile] [app] Target directory: `" + target + "`.");
    log.debug("[bundle:compile] [app] Target bundle:    `" + bundle + "`.");
    log.debug("[bundle:compile] [app] extensions:       `" + ((extensions || []).join(", ")) + "`.");
    log.debug("[bundle:compile] [app] transforms:       `" + ((transforms || []).join(", ")) + "`.");
    fs.exists(entry, function(exists) {
      var bundler, i, len, ref, s, transform;
      if (!exists) {
        log.info("[bundle:compile] [app] Entry file `" + entry + "` not found.");
        return cb();
      }
      bundler = browserify({
        extensions: extensions,
        paths: paths,
        debug: isProduction ? false : sourcemaps
      });
      _.each(externals, function(external) {
        if (typeof external === "string") {
          external = {
            require: external
          };
        }
        return bundler.external(external.expose || external.require);
      });
      ref = transforms || [];
      for (i = 0, len = ref.length; i < len; i++) {
        transform = ref[i];
        switch (transform) {
          case "coffee-reactify":
            bundler.transform(coffeeReactify);
            break;
          case "jadeify":
            bundler.transform(jadeify);
        }
      }
      bundler.add(entry);
      s = bundler.bundle().pipe(vinylSource(bundle)).pipe(gulpTap(function(file) {
        return log.debug("[bundle:compile] [app] Compiled `" + file.path + "`.");
      }));
      if (isProduction) {
        s = s.pipe(gulpStreamify(gulpUglify()));
      }
      return s.pipe(gulp.dest(target)).on("end", cb);
    });
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvYnVuZGxlL2NvbXBpbGUuanMiLCJzb3VyY2VzIjpbInRhc2tzL2J1bmRsZS9jb21waWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLENBQUEsR0FBaUIsT0FBQSxDQUFRLFFBQVI7O0FBQ2pCLFVBQUEsR0FBaUIsT0FBQSxDQUFRLFlBQVI7O0FBQ2pCLFNBQUEsR0FBaUIsT0FBQSxDQUFRLFdBQVI7O0FBQ2pCLGNBQUEsR0FBaUIsT0FBQSxDQUFRLGlCQUFSOztBQUNqQixFQUFBLEdBQWlCLE9BQUEsQ0FBUSxJQUFSOztBQUNqQixJQUFBLEdBQWlCLE9BQUEsQ0FBUSxNQUFSOztBQUNqQixhQUFBLEdBQWlCLE9BQUEsQ0FBUSxnQkFBUjs7QUFDakIsT0FBQSxHQUFpQixPQUFBLENBQVEsVUFBUjs7QUFDakIsVUFBQSxHQUFpQixPQUFBLENBQVEsYUFBUjs7QUFDakIsT0FBQSxHQUFpQixPQUFBLENBQVEsU0FBUjs7QUFDakIsSUFBQSxHQUFpQixPQUFBLENBQVEsTUFBUjs7QUFDakIsV0FBQSxHQUFpQixPQUFBLENBQVEscUJBQVI7O0FBRWpCLEdBQUEsR0FBTSxPQUFBLENBQVEsZUFBUjs7QUFFTixNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLG9CQUFEO0FBQ2hCLE1BQUE7RUFBQSxPQUFBLEdBQWUsb0JBQW9CLENBQUM7RUFDcEMsT0FBQSxHQUFlLE9BQU8sQ0FBQztFQUN2QixVQUFBLEdBQWUsT0FBTyxDQUFDO0VBQ3ZCLFNBQUEsR0FBZSxPQUFPLENBQUMsU0FBUixJQUFxQjtFQUNwQyxZQUFBLEdBQWUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFaLEtBQXdCO0VBRXZDLElBQUksQ0FBQyxJQUFMLENBQVUsa0JBQVYsRUFBOEIsU0FBQyxFQUFEO0FBQzdCLFFBQUE7SUFBQSxNQUFBLEdBQWEsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM1QixNQUFBLEdBQWEsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM1QixV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Q1ksRUFEWjtJQTVCZ0IsQ0FBakI7RUFsQjhDLENBQS9DO0FBdkVnQiIsInNvdXJjZXNDb250ZW50IjpbIl8gICAgICAgICAgICAgID0gcmVxdWlyZSBcImxvZGFzaFwiXG5icm93c2VyaWZ5ICAgICA9IHJlcXVpcmUgXCJicm93c2VyaWZ5XCJcbmNvZmZlZWlmeSAgICAgID0gcmVxdWlyZSBcImNvZmZlZWlmeVwiXG5jb2ZmZWVSZWFjdGlmeSA9IHJlcXVpcmUgXCJjb2ZmZWUtcmVhY3RpZnlcIlxuZnMgICAgICAgICAgICAgPSByZXF1aXJlIFwiZnNcIlxuZ3VscCAgICAgICAgICAgPSByZXF1aXJlIFwiZ3VscFwiXG5ndWxwU3RyZWFtaWZ5ICA9IHJlcXVpcmUgXCJndWxwLXN0cmVhbWlmeVwiXG5ndWxwVGFwICAgICAgICA9IHJlcXVpcmUgXCJndWxwLXRhcFwiXG5ndWxwVWdsaWZ5ICAgICA9IHJlcXVpcmUgXCJndWxwLXVnbGlmeVwiXG5qYWRlaWZ5ICAgICAgICA9IHJlcXVpcmUgXCJqYWRlaWZ5XCJcbnBhdGggICAgICAgICAgID0gcmVxdWlyZSBcInBhdGhcIlxudmlueWxTb3VyY2UgICAgPSByZXF1aXJlIFwidmlueWwtc291cmNlLXN0cmVhbVwiXG5cbmxvZyA9IHJlcXVpcmUgXCIuLi8uLi9saWIvbG9nXCJcblxubW9kdWxlLmV4cG9ydHMgPSAoY29mZmVlUHJvamVjdE9wdGlvbnMpIC0+XG5cdG9wdGlvbnMgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLmJ1bmRsZVxuXHRlbmFibGVkICAgICAgPSBvcHRpb25zLmVuYWJsZWRcblx0c291cmNlbWFwcyAgID0gb3B0aW9ucy5zb3VyY2VtYXBzXG5cdGV4dGVybmFscyAgICA9IG9wdGlvbnMuZXh0ZXJuYWxzIG9yIFtdXG5cdGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIGlzIFwicHJvZHVjdGlvblwiXG5cblx0Z3VscC50YXNrIFwiYnVuZGxlOnZlbmRvcjpybVwiLCAoY2IpIC0+XG5cdFx0dGFyZ2V0ICAgICA9IG9wdGlvbnMudmVuZG9yLnRhcmdldFxuXHRcdGJ1bmRsZSAgICAgPSBvcHRpb25zLnZlbmRvci5idW5kbGVcblx0XHRidW5kbGVQYXRoID0gcGF0aC5yZXNvbHZlIFwiI3t0YXJnZXR9LyN7YnVuZGxlfVwiXG5cblx0XHRmcy5leGlzdHMgYnVuZGxlUGF0aCwgKGV4aXN0cykgLT5cblx0XHRcdHVubGVzcyBleGlzdHNcblx0XHRcdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTp2ZW5kb3I6cm1dIE5vdCB0aGVyZSwgbm90aGluZyB0byByZW1vdmUuXCJcblx0XHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdFx0ZnMudW5saW5rIGJ1bmRsZVBhdGgsIChlcnJvcikgLT5cblx0XHRcdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTp2ZW5kb3I6cm1dIFJlbW92ZWQgI3tidW5kbGVQYXRofVwiXG5cdFx0XHRcdGNiIGVycm9yXG5cblx0Z3VscC50YXNrIFwiYnVuZGxlOnZlbmRvclwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiW2J1bmRsZTpjb21waWxlXSBbdmVuZG9yXSBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdHVubGVzcyBleHRlcm5hbHM/Lmxlbmd0aFxuXHRcdFx0bG9nLmluZm8gXCJbYnVuZGxlOmNvbXBpbGVdIFt2ZW5kb3JdIE5vIGV4dGVybmFscyBkZWZpbmVkLiBTa2lwcGluZy5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdHRhcmdldCAgICAgPSBvcHRpb25zLnZlbmRvci50YXJnZXRcblx0XHRidW5kbGUgICAgID0gb3B0aW9ucy52ZW5kb3IuYnVuZGxlXG5cdFx0c291cmNlICAgICA9IG9wdGlvbnMudmVuZG9yLnNvdXJjZVxuXHRcdGJ1bmRsZVBhdGggPSBcIiN7dGFyZ2V0fS8je2J1bmRsZX1cIlxuXG5cdFx0ZnMuZXhpc3RzIGJ1bmRsZVBhdGgsIChidW5kbGVFeGlzdHMpIC0+XG5cdFx0XHR1bmxlc3MgaXNQcm9kdWN0aW9uXG5cdFx0XHRcdGlmIGJ1bmRsZUV4aXN0c1xuXHRcdFx0XHRcdGxvZy5pbmZvIFwiW2J1bmRsZTpjb21waWxlXSBbdmVuZG9yXSBCdW5kbGUgYWxyZWFkeSB0aGVyZS4gU2tpcHBpbmcuXCJcblx0XHRcdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0XHRsb2cuZGVidWcgXCJbYnVuZGxlOmNvbXBpbGVdIFt2ZW5kb3JdIFRhcmdldCBkaXJlY3Rvcnk6IGAje3RhcmdldH1gLlwiXG5cdFx0XHRsb2cuZGVidWcgXCJbYnVuZGxlOmNvbXBpbGVdIFt2ZW5kb3JdIFRhcmdldCBidW5kbGU6ICAgIGAje2J1bmRsZX1gLlwiXG5cdFx0XHRsb2cuZGVidWcgXCJbYnVuZGxlOmNvbXBpbGVdIFt2ZW5kb3JdIFNvdXJjZTogICAgICAgICAgIGAje3NvdXJjZX1gLlwiXG5cblx0XHRcdGJ1bmRsZXIgPSBicm93c2VyaWZ5XG5cdFx0XHRcdGRlYnVnOiBmYWxzZVxuXG5cdFx0XHRidW5kbGVyLnRyYW5zZm9ybSBjb2ZmZWVpZnlcblxuXHRcdFx0Xy5lYWNoIGV4dGVybmFscywgKGV4dGVybmFsKSAtPlxuXHRcdFx0XHRleHRlcm5hbCA9IHJlcXVpcmU6IGV4dGVybmFsIGlmIHR5cGVvZiBleHRlcm5hbCBpcyBcInN0cmluZ1wiXG5cblx0XHRcdFx0aWYgZXh0ZXJuYWwuZXhwb3NlXG5cdFx0XHRcdFx0YnVuZGxlci5yZXF1aXJlIGV4dGVybmFsLnJlcXVpcmUsIGV4cG9zZTogZXh0ZXJuYWwuZXhwb3NlXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRjb25zb2xlLmxvZ1xuXHRcdFx0XHRcdGJ1bmRsZXIucmVxdWlyZSBleHRlcm5hbC5yZXF1aXJlXG5cblx0XHRcdHMgPSBidW5kbGVyLmJ1bmRsZSgpXG5cdFx0XHRcdC5waXBlIHZpbnlsU291cmNlIGJ1bmRsZVxuXHRcdFx0XHQucGlwZSBndWxwVGFwIChmaWxlKSAtPlxuXHRcdFx0XHRcdGxvZy5kZWJ1ZyBcIltidW5kbGU6Y29tcGlsZV0gW3ZlbmRvcl0gQ29tcGlsZWQgYCN7ZmlsZS5wYXRofWAuXCJcblxuXHRcdFx0cyA9IHMucGlwZSBndWxwU3RyZWFtaWZ5IGd1bHBVZ2xpZnkoKSBpZiBpc1Byb2R1Y3Rpb25cblxuXHRcdFx0cy5waXBlIGd1bHAuZGVzdCB0YXJnZXRcblx0XHRcdFx0Lm9uIFwiZW5kXCIsIGNiXG5cblx0XHRyZXR1cm5cblxuXHRndWxwLnRhc2sgXCJidW5kbGU6Y29tcGlsZVwiLCBbXCJidW5kbGU6dmVuZG9yXCJdLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWRcblx0XHRcdGxvZy5pbmZvIFwiW2J1bmRsZTpjb21waWxlXSBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGVudHJ5ICAgICAgPSBvcHRpb25zLmFwcC5lbnRyeVxuXHRcdHRhcmdldCAgICAgPSBvcHRpb25zLmFwcC50YXJnZXRcblx0XHRidW5kbGUgICAgID0gb3B0aW9ucy5hcHAuYnVuZGxlXG5cdFx0cGF0aHMgICAgICA9IG9wdGlvbnMuYXBwLnBhdGhzXG5cdFx0ZXh0ZW5zaW9ucyA9IG9wdGlvbnMuYXBwLmV4dGVuc2lvbnNcblx0XHR0cmFuc2Zvcm1zID0gb3B0aW9ucy5hcHAudHJhbnNmb3Jtc1xuXG5cdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTpjb21waWxlXSBbYXBwXSBFbnRyeSBmaWxlOiAgICAgICBgI3tlbnRyeX1gLlwiXG5cdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTpjb21waWxlXSBbYXBwXSBUYXJnZXQgZGlyZWN0b3J5OiBgI3t0YXJnZXR9YC5cIlxuXHRcdGxvZy5kZWJ1ZyBcIltidW5kbGU6Y29tcGlsZV0gW2FwcF0gVGFyZ2V0IGJ1bmRsZTogICAgYCN7YnVuZGxlfWAuXCJcblx0XHRsb2cuZGVidWcgXCJbYnVuZGxlOmNvbXBpbGVdIFthcHBdIGV4dGVuc2lvbnM6ICAgICAgIGAjeyhleHRlbnNpb25zIG9yIFtdKS5qb2luIFwiLCBcIn1gLlwiXG5cdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTpjb21waWxlXSBbYXBwXSB0cmFuc2Zvcm1zOiAgICAgICBgI3sodHJhbnNmb3JtcyBvciBbXSkuam9pbiBcIiwgXCJ9YC5cIlxuXG5cdFx0ZnMuZXhpc3RzIGVudHJ5LCAoZXhpc3RzKSAtPlxuXHRcdFx0dW5sZXNzIGV4aXN0c1xuXHRcdFx0XHRsb2cuaW5mbyBcIltidW5kbGU6Y29tcGlsZV0gW2FwcF0gRW50cnkgZmlsZSBgI3tlbnRyeX1gIG5vdCBmb3VuZC5cIlxuXHRcdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0XHRidW5kbGVyID0gYnJvd3NlcmlmeVxuXHRcdFx0XHRleHRlbnNpb25zOiBleHRlbnNpb25zXG5cdFx0XHRcdHBhdGhzOiAgICAgIHBhdGhzXG5cdFx0XHRcdGRlYnVnOiAgICAgIGlmIGlzUHJvZHVjdGlvbiB0aGVuIGZhbHNlIGVsc2Ugc291cmNlbWFwc1xuXG5cdFx0XHRfLmVhY2ggZXh0ZXJuYWxzLCAoZXh0ZXJuYWwpIC0+XG5cdFx0XHRcdGV4dGVybmFsID0gcmVxdWlyZTogZXh0ZXJuYWwgaWYgdHlwZW9mIGV4dGVybmFsIGlzIFwic3RyaW5nXCJcblx0XHRcdFx0YnVuZGxlci5leHRlcm5hbCBleHRlcm5hbC5leHBvc2Ugb3IgZXh0ZXJuYWwucmVxdWlyZVxuXG5cdFx0XHRmb3IgdHJhbnNmb3JtIGluIHRyYW5zZm9ybXMgb3IgW11cblx0XHRcdFx0c3dpdGNoIHRyYW5zZm9ybVxuXHRcdFx0XHRcdHdoZW4gXCJjb2ZmZWUtcmVhY3RpZnlcIiB0aGVuXHRidW5kbGVyLnRyYW5zZm9ybSBjb2ZmZWVSZWFjdGlmeVxuXHRcdFx0XHRcdHdoZW4gXCJqYWRlaWZ5XCIgICAgICAgICB0aGVuIGJ1bmRsZXIudHJhbnNmb3JtIGphZGVpZnlcblxuXHRcdFx0YnVuZGxlci5hZGQgZW50cnlcblxuXHRcdFx0cyA9IGJ1bmRsZXIuYnVuZGxlKClcblx0XHRcdFx0LnBpcGUgdmlueWxTb3VyY2UgYnVuZGxlXG5cdFx0XHRcdC5waXBlIGd1bHBUYXAgKGZpbGUpIC0+XG5cdFx0XHRcdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTpjb21waWxlXSBbYXBwXSBDb21waWxlZCBgI3tmaWxlLnBhdGh9YC5cIlxuXG5cdFx0XHRzID0gcy5waXBlIGd1bHBTdHJlYW1pZnkgZ3VscFVnbGlmeSgpIGlmIGlzUHJvZHVjdGlvblxuXG5cdFx0XHRzLnBpcGUgZ3VscC5kZXN0IHRhcmdldFxuXHRcdFx0XHQub24gXCJlbmRcIiwgY2JcblxuXHRcdHJldHVybiJdfQ==

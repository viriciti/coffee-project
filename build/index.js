var _, defaults, log, lsr, sourceClientDirectoryPath, sourceDirectoryPath, sourceServerDirectoryPath, targetClientDirectoryPath, targetDirectoryPath, targetServerDirectoryPath, testDirectoryPath;

_ = require("lodash");

lsr = require("lsr");

log = require("./lib/log");

sourceDirectoryPath = "src";

targetDirectoryPath = "build";

testDirectoryPath = "test";

sourceClientDirectoryPath = sourceDirectoryPath + "/client";

sourceServerDirectoryPath = sourceDirectoryPath + "/server";

targetClientDirectoryPath = targetDirectoryPath + "/client";

targetServerDirectoryPath = targetDirectoryPath + "/server";

defaults = {
  bundle: {
    enabled: true,
    sourcemaps: true,
    externals: [],
    vendor: {
      entry: sourceClientDirectoryPath + "/js/vendor/vendor.coffee",
      target: targetClientDirectoryPath + "/js",
      bundle: "vendor.bundle.js",
      source: sourceClientDirectoryPath + "/js/app/vendor"
    },
    app: {
      entry: sourceClientDirectoryPath + "/js/app/app.coffee",
      target: targetClientDirectoryPath + "/js",
      bundle: "app.bundle.js",
      paths: [sourceClientDirectoryPath + "/js/app"],
      extensions: [".coffee", ".jade", ".cjsx"],
      transforms: ["coffee-reactify", "jadeify"]
    }
  },
  clean: {
    enabled: true,
    targetDirectoryPath: targetDirectoryPath,
    clientDirectoryPath: targetClientDirectoryPath,
    serverDirectoryPath: targetServerDirectoryPath
  },
  coffee: {
    enabled: true,
    sourceDirectoryPath: sourceServerDirectoryPath,
    targetDirectoryPath: targetServerDirectoryPath
  },
  copy: {
    enabled: true,
    excluded: ["**/*.coffee", "**/*.less", "**/*.cjsx", "src/client/js{,/**}"],
    sourceDirectoryPath: sourceDirectoryPath,
    targetDirectoryPath: targetDirectoryPath
  },
  documentation: {
    enabled: true,
    sourceDirectoryPath: sourceDirectoryPath,
    targetDirectoryPath: targetDirectoryPath
  },
  less: {
    enabled: true,
    theme: false,
    sourceDirectoryPath: sourceClientDirectoryPath + "/less",
    targetDirectoryPath: targetClientDirectoryPath + "/css"
  },
  livereload: {
    enabled: true
  },
  nodemon: {
    enabled: true,
    entryFilePath: "app.js",
    watchGlob: [targetServerDirectoryPath + "/**/*"],
    extra: ["cfg.js", "app.js", "gulpfile.coffee"],
    extensions: ["js", "jade"]
  },
  forever: {
    enabled: false,
    entryFilePath: "app.js",
    watchDirectoryPath: sourceServerDirectoryPath
  },
  tests: {
    enabled: true,
    directoryPath: "test"
  },
  watch: {
    enabled: true,
    sourceDirectoryPath: sourceDirectoryPath,
    testDirectoryPath: testDirectoryPath
  }
};

module.exports = function(options) {
  var env, i, len, ref, results, stat;
  if (options == null) {
    options = {};
  }
  env = {};
  if (process.env.APP_THEME) {
    env.less = {
      theme: process.env.APP_THEME
    };
  }
  ref = lsr.sync(__dirname + "/tasks");
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    stat = ref[i];
    if (stat.isDirectory()) {
      continue;
    }
    results.push(require(stat.fullPath)(_.merge(defaults, options, env)));
  }
  return results;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLENBQUEsR0FBTSxPQUFBLENBQVEsUUFBUjs7QUFDTixHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVI7O0FBRU4sR0FBQSxHQUFNLE9BQUEsQ0FBUSxXQUFSOztBQUVOLG1CQUFBLEdBQTRCOztBQUM1QixtQkFBQSxHQUE0Qjs7QUFDNUIsaUJBQUEsR0FBNEI7O0FBQzVCLHlCQUFBLEdBQStCLG1CQUFELEdBQXFCOztBQUNuRCx5QkFBQSxHQUErQixtQkFBRCxHQUFxQjs7QUFDbkQseUJBQUEsR0FBK0IsbUJBQUQsR0FBcUI7O0FBQ25ELHlCQUFBLEdBQStCLG1CQUFELEdBQXFCOztBQUVuRCxRQUFBLEdBQ0M7RUFBQSxNQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQVksSUFBWjtJQUNBLFVBQUEsRUFBWSxJQURaO0lBRUEsU0FBQSxFQUFZLEVBRlo7SUFHQSxNQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQVcseUJBQUQsR0FBMkIsMEJBQXJDO01BQ0EsTUFBQSxFQUFXLHlCQUFELEdBQTJCLEtBRHJDO01BRUEsTUFBQSxFQUFRLGtCQUZSO01BR0EsTUFBQSxFQUFXLHlCQUFELEdBQTJCLGdCQUhyQztLQUpGO0lBUUEsR0FBQSxFQUNFO01BQUEsS0FBQSxFQUFlLHlCQUFELEdBQTJCLG9CQUF6QztNQUNBLE1BQUEsRUFBZSx5QkFBRCxHQUEyQixLQUR6QztNQUVBLE1BQUEsRUFBWSxlQUZaO01BR0EsS0FBQSxFQUFZLENBQUsseUJBQUQsR0FBMkIsU0FBL0IsQ0FIWjtNQUlBLFVBQUEsRUFBWSxDQUFFLFNBQUYsRUFBYSxPQUFiLEVBQXNCLE9BQXRCLENBSlo7TUFLQSxVQUFBLEVBQVksQ0FBRSxpQkFBRixFQUFxQixTQUFyQixDQUxaO0tBVEY7R0FERDtFQWlCQSxLQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0lBQ0EsbUJBQUEsRUFBcUIsbUJBRHJCO0lBRUEsbUJBQUEsRUFBcUIseUJBRnJCO0lBR0EsbUJBQUEsRUFBcUIseUJBSHJCO0dBbEJEO0VBdUJBLE1BQUEsRUFDQztJQUFBLE9BQUEsRUFBcUIsSUFBckI7SUFDQSxtQkFBQSxFQUFxQix5QkFEckI7SUFFQSxtQkFBQSxFQUFxQix5QkFGckI7R0F4QkQ7RUE0QkEsSUFBQSxFQUNDO0lBQUEsT0FBQSxFQUFxQixJQUFyQjtJQUNBLFFBQUEsRUFBcUIsQ0FBRSxhQUFGLEVBQWlCLFdBQWpCLEVBQThCLFdBQTlCLEVBQTJDLHFCQUEzQyxDQURyQjtJQUVBLG1CQUFBLEVBQXFCLG1CQUZyQjtJQUdBLG1CQUFBLEVBQXFCLG1CQUhyQjtHQTdCRDtFQWtDQSxhQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0lBQ0EsbUJBQUEsRUFBcUIsbUJBRHJCO0lBRUEsbUJBQUEsRUFBcUIsbUJBRnJCO0dBbkNEO0VBdUNBLElBQUEsRUFDQztJQUFBLE9BQUEsRUFBcUIsSUFBckI7SUFDQSxLQUFBLEVBQXFCLEtBRHJCO0lBRUEsbUJBQUEsRUFBd0IseUJBQUQsR0FBMkIsT0FGbEQ7SUFHQSxtQkFBQSxFQUF3Qix5QkFBRCxHQUEyQixNQUhsRDtHQXhDRDtFQTZDQSxVQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0dBOUNEO0VBZ0RBLE9BQUEsRUFDQztJQUFBLE9BQUEsRUFBcUIsSUFBckI7SUFDQSxhQUFBLEVBQXFCLFFBRHJCO0lBRUEsU0FBQSxFQUFxQixDQUFLLHlCQUFELEdBQTJCLE9BQS9CLENBRnJCO0lBR0EsS0FBQSxFQUFxQixDQUFFLFFBQUYsRUFBWSxRQUFaLEVBQXNCLGlCQUF0QixDQUhyQjtJQUlBLFVBQUEsRUFBcUIsQ0FBRSxJQUFGLEVBQVEsTUFBUixDQUpyQjtHQWpERDtFQXVEQSxPQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLEtBQXJCO0lBQ0EsYUFBQSxFQUFxQixRQURyQjtJQUVBLGtCQUFBLEVBQXFCLHlCQUZyQjtHQXhERDtFQTREQSxLQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0lBQ0EsYUFBQSxFQUFxQixNQURyQjtHQTdERDtFQWdFQSxLQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0lBQ0EsbUJBQUEsRUFBcUIsbUJBRHJCO0lBRUEsaUJBQUEsRUFBcUIsaUJBRnJCO0dBakVEOzs7QUFxRUQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxPQUFEO0FBQ2hCLE1BQUE7O0lBRGlCLFVBQVU7O0VBQzNCLEdBQUEsR0FBTTtFQUNOLElBQTJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBdkQ7SUFBQSxHQUFHLENBQUMsSUFBSixHQUFXO01BQUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBbkI7TUFBWDs7QUFFQTtBQUFBO09BQUEscUNBQUE7O0lBQ0MsSUFBWSxJQUFJLENBQUMsV0FBTCxDQUFBLENBQVo7QUFBQSxlQUFBOztpQkFDQSxPQUFBLENBQVEsSUFBSSxDQUFDLFFBQWIsQ0FBQSxDQUF1QixDQUFDLENBQUMsS0FBRixDQUFRLFFBQVIsRUFBa0IsT0FBbEIsRUFBMkIsR0FBM0IsQ0FBdkI7QUFGRDs7QUFKZ0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJfICAgPSByZXF1aXJlIFwibG9kYXNoXCJcbmxzciA9IHJlcXVpcmUgXCJsc3JcIlxuXG5sb2cgPSByZXF1aXJlIFwiLi9saWIvbG9nXCJcblxuc291cmNlRGlyZWN0b3J5UGF0aCAgICAgICA9IFwic3JjXCJcbnRhcmdldERpcmVjdG9yeVBhdGggICAgICAgPSBcImJ1aWxkXCJcbnRlc3REaXJlY3RvcnlQYXRoICAgICAgICAgPSBcInRlc3RcIlxuc291cmNlQ2xpZW50RGlyZWN0b3J5UGF0aCA9IFwiI3tzb3VyY2VEaXJlY3RvcnlQYXRofS9jbGllbnRcIlxuc291cmNlU2VydmVyRGlyZWN0b3J5UGF0aCA9IFwiI3tzb3VyY2VEaXJlY3RvcnlQYXRofS9zZXJ2ZXJcIlxudGFyZ2V0Q2xpZW50RGlyZWN0b3J5UGF0aCA9IFwiI3t0YXJnZXREaXJlY3RvcnlQYXRofS9jbGllbnRcIlxudGFyZ2V0U2VydmVyRGlyZWN0b3J5UGF0aCA9IFwiI3t0YXJnZXREaXJlY3RvcnlQYXRofS9zZXJ2ZXJcIlxuXG5kZWZhdWx0cyA9XG5cdGJ1bmRsZTpcblx0XHRlbmFibGVkOiAgICB0cnVlXG5cdFx0c291cmNlbWFwczogdHJ1ZVxuXHRcdGV4dGVybmFsczogIFtdXG5cdFx0dmVuZG9yOlxuXHRcdFx0XHRlbnRyeTogIFwiI3tzb3VyY2VDbGllbnREaXJlY3RvcnlQYXRofS9qcy92ZW5kb3IvdmVuZG9yLmNvZmZlZVwiXG5cdFx0XHRcdHRhcmdldDogXCIje3RhcmdldENsaWVudERpcmVjdG9yeVBhdGh9L2pzXCJcblx0XHRcdFx0YnVuZGxlOiBcInZlbmRvci5idW5kbGUuanNcIlxuXHRcdFx0XHRzb3VyY2U6IFwiI3tzb3VyY2VDbGllbnREaXJlY3RvcnlQYXRofS9qcy9hcHAvdmVuZG9yXCJcblx0XHRhcHA6XG5cdFx0XHRcdGVudHJ5OiAgICAgIFwiI3tzb3VyY2VDbGllbnREaXJlY3RvcnlQYXRofS9qcy9hcHAvYXBwLmNvZmZlZVwiXG5cdFx0XHRcdHRhcmdldDogICAgIFwiI3t0YXJnZXRDbGllbnREaXJlY3RvcnlQYXRofS9qc1wiXG5cdFx0XHRcdGJ1bmRsZTogICAgIFwiYXBwLmJ1bmRsZS5qc1wiXG5cdFx0XHRcdHBhdGhzOiAgICAgIFsgXCIje3NvdXJjZUNsaWVudERpcmVjdG9yeVBhdGh9L2pzL2FwcFwiIF1cblx0XHRcdFx0ZXh0ZW5zaW9uczogWyBcIi5jb2ZmZWVcIiwgXCIuamFkZVwiLCBcIi5janN4XCIgXVxuXHRcdFx0XHR0cmFuc2Zvcm1zOiBbIFwiY29mZmVlLXJlYWN0aWZ5XCIsIFwiamFkZWlmeVwiIF1cblxuXHRjbGVhbjpcblx0XHRlbmFibGVkOiAgICAgICAgICAgICB0cnVlXG5cdFx0dGFyZ2V0RGlyZWN0b3J5UGF0aDogdGFyZ2V0RGlyZWN0b3J5UGF0aFxuXHRcdGNsaWVudERpcmVjdG9yeVBhdGg6IHRhcmdldENsaWVudERpcmVjdG9yeVBhdGhcblx0XHRzZXJ2ZXJEaXJlY3RvcnlQYXRoOiB0YXJnZXRTZXJ2ZXJEaXJlY3RvcnlQYXRoXG5cblx0Y29mZmVlOlxuXHRcdGVuYWJsZWQ6ICAgICAgICAgICAgIHRydWVcblx0XHRzb3VyY2VEaXJlY3RvcnlQYXRoOiBzb3VyY2VTZXJ2ZXJEaXJlY3RvcnlQYXRoXG5cdFx0dGFyZ2V0RGlyZWN0b3J5UGF0aDogdGFyZ2V0U2VydmVyRGlyZWN0b3J5UGF0aFxuXG5cdGNvcHk6XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgdHJ1ZVxuXHRcdGV4Y2x1ZGVkOiAgICAgICAgICAgIFsgXCIqKi8qLmNvZmZlZVwiLCBcIioqLyoubGVzc1wiLCBcIioqLyouY2pzeFwiLCBcInNyYy9jbGllbnQvanN7LC8qKn1cIiBdXG5cdFx0c291cmNlRGlyZWN0b3J5UGF0aDogc291cmNlRGlyZWN0b3J5UGF0aFxuXHRcdHRhcmdldERpcmVjdG9yeVBhdGg6IHRhcmdldERpcmVjdG9yeVBhdGhcblxuXHRkb2N1bWVudGF0aW9uOlxuXHRcdGVuYWJsZWQ6ICAgICAgICAgICAgIHRydWVcblx0XHRzb3VyY2VEaXJlY3RvcnlQYXRoOiBzb3VyY2VEaXJlY3RvcnlQYXRoXG5cdFx0dGFyZ2V0RGlyZWN0b3J5UGF0aDogdGFyZ2V0RGlyZWN0b3J5UGF0aFxuXG5cdGxlc3M6XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgdHJ1ZVxuXHRcdHRoZW1lOiAgICAgICAgICAgICAgIGZhbHNlXG5cdFx0c291cmNlRGlyZWN0b3J5UGF0aDogXCIje3NvdXJjZUNsaWVudERpcmVjdG9yeVBhdGh9L2xlc3NcIlxuXHRcdHRhcmdldERpcmVjdG9yeVBhdGg6IFwiI3t0YXJnZXRDbGllbnREaXJlY3RvcnlQYXRofS9jc3NcIlxuXG5cdGxpdmVyZWxvYWQ6XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgdHJ1ZVxuXG5cdG5vZGVtb246XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgdHJ1ZSxcblx0XHRlbnRyeUZpbGVQYXRoOiAgICAgICBcImFwcC5qc1wiLFxuXHRcdHdhdGNoR2xvYjogICAgICAgICAgIFsgXCIje3RhcmdldFNlcnZlckRpcmVjdG9yeVBhdGh9LyoqLypcIiBdXG5cdFx0ZXh0cmE6ICAgICAgICAgICAgICAgWyBcImNmZy5qc1wiLCBcImFwcC5qc1wiLCBcImd1bHBmaWxlLmNvZmZlZVwiIF1cblx0XHRleHRlbnNpb25zOiAgICAgICAgICBbIFwianNcIiwgXCJqYWRlXCIgXVxuXG5cdGZvcmV2ZXI6XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgZmFsc2Vcblx0XHRlbnRyeUZpbGVQYXRoOiAgICAgICBcImFwcC5qc1wiXG5cdFx0d2F0Y2hEaXJlY3RvcnlQYXRoOiAgc291cmNlU2VydmVyRGlyZWN0b3J5UGF0aFxuXG5cdHRlc3RzOlxuXHRcdGVuYWJsZWQ6ICAgICAgICAgICAgIHRydWVcblx0XHRkaXJlY3RvcnlQYXRoOiAgICAgICBcInRlc3RcIlxuXG5cdHdhdGNoOlxuXHRcdGVuYWJsZWQ6ICAgICAgICAgICAgIHRydWVcblx0XHRzb3VyY2VEaXJlY3RvcnlQYXRoOiBzb3VyY2VEaXJlY3RvcnlQYXRoXG5cdFx0dGVzdERpcmVjdG9yeVBhdGg6ICAgdGVzdERpcmVjdG9yeVBhdGhcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucyA9IHt9KSAtPlxuXHRlbnYgPSB7fVxuXHRlbnYubGVzcyA9IHRoZW1lOiBwcm9jZXNzLmVudi5BUFBfVEhFTUUgaWYgcHJvY2Vzcy5lbnYuQVBQX1RIRU1FXG5cblx0Zm9yIHN0YXQgaW4gbHNyLnN5bmMgXCIje19fZGlybmFtZX0vdGFza3NcIlxuXHRcdGNvbnRpbnVlIGlmIHN0YXQuaXNEaXJlY3RvcnkoKVxuXHRcdHJlcXVpcmUoc3RhdC5mdWxsUGF0aCkgXy5tZXJnZSBkZWZhdWx0cywgb3B0aW9ucywgZW52XG4iXX0=

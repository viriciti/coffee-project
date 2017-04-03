var _, defaults, documentationPath, log, lsr, sourceClientDirectoryPath, sourceDirectoryPath, sourceServerDirectoryPath, targetClientDirectoryPath, targetDirectoryPath, targetServerDirectoryPath, testDirectoryPath;

_ = require("lodash");

lsr = require("lsr");

log = require("./lib/log");

sourceDirectoryPath = "src";

targetDirectoryPath = "build";

testDirectoryPath = "test";

documentationPath = "docs";

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
    targetDirectoryPath: documentationPath
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLENBQUEsR0FBTSxPQUFBLENBQVEsUUFBUjs7QUFDTixHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVI7O0FBRU4sR0FBQSxHQUFNLE9BQUEsQ0FBUSxXQUFSOztBQUVOLG1CQUFBLEdBQTRCOztBQUM1QixtQkFBQSxHQUE0Qjs7QUFDNUIsaUJBQUEsR0FBNEI7O0FBQzVCLGlCQUFBLEdBQTRCOztBQUM1Qix5QkFBQSxHQUErQixtQkFBRCxHQUFxQjs7QUFDbkQseUJBQUEsR0FBK0IsbUJBQUQsR0FBcUI7O0FBQ25ELHlCQUFBLEdBQStCLG1CQUFELEdBQXFCOztBQUNuRCx5QkFBQSxHQUErQixtQkFBRCxHQUFxQjs7QUFFbkQsUUFBQSxHQUNDO0VBQUEsTUFBQSxFQUNDO0lBQUEsT0FBQSxFQUFZLElBQVo7SUFDQSxVQUFBLEVBQVksSUFEWjtJQUVBLFNBQUEsRUFBWSxFQUZaO0lBR0EsTUFBQSxFQUNDO01BQUEsS0FBQSxFQUFXLHlCQUFELEdBQTJCLDBCQUFyQztNQUNBLE1BQUEsRUFBVyx5QkFBRCxHQUEyQixLQURyQztNQUVBLE1BQUEsRUFBUSxrQkFGUjtNQUdBLE1BQUEsRUFBVyx5QkFBRCxHQUEyQixnQkFIckM7S0FKRDtJQVFBLEdBQUEsRUFDQztNQUFBLEtBQUEsRUFBZSx5QkFBRCxHQUEyQixvQkFBekM7TUFDQSxNQUFBLEVBQWUseUJBQUQsR0FBMkIsS0FEekM7TUFFQSxNQUFBLEVBQVksZUFGWjtNQUdBLEtBQUEsRUFBWSxDQUFLLHlCQUFELEdBQTJCLFNBQS9CLENBSFo7TUFJQSxVQUFBLEVBQVksQ0FBRSxTQUFGLEVBQWEsT0FBYixFQUFzQixPQUF0QixDQUpaO01BS0EsVUFBQSxFQUFZLENBQUUsaUJBQUYsRUFBcUIsU0FBckIsQ0FMWjtLQVREO0dBREQ7RUFpQkEsS0FBQSxFQUNDO0lBQUEsT0FBQSxFQUFxQixJQUFyQjtJQUNBLG1CQUFBLEVBQXFCLG1CQURyQjtJQUVBLG1CQUFBLEVBQXFCLHlCQUZyQjtJQUdBLG1CQUFBLEVBQXFCLHlCQUhyQjtHQWxCRDtFQXVCQSxNQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0lBQ0EsbUJBQUEsRUFBcUIseUJBRHJCO0lBRUEsbUJBQUEsRUFBcUIseUJBRnJCO0dBeEJEO0VBNEJBLElBQUEsRUFDQztJQUFBLE9BQUEsRUFBcUIsSUFBckI7SUFDQSxRQUFBLEVBQXFCLENBQUUsYUFBRixFQUFpQixXQUFqQixFQUE4QixXQUE5QixFQUEyQyxxQkFBM0MsQ0FEckI7SUFFQSxtQkFBQSxFQUFxQixtQkFGckI7SUFHQSxtQkFBQSxFQUFxQixtQkFIckI7R0E3QkQ7RUFrQ0EsYUFBQSxFQUNDO0lBQUEsT0FBQSxFQUFxQixJQUFyQjtJQUNBLG1CQUFBLEVBQXFCLG1CQURyQjtJQUVBLG1CQUFBLEVBQXFCLGlCQUZyQjtHQW5DRDtFQXVDQSxJQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0lBQ0EsS0FBQSxFQUFxQixLQURyQjtJQUVBLG1CQUFBLEVBQXdCLHlCQUFELEdBQTJCLE9BRmxEO0lBR0EsbUJBQUEsRUFBd0IseUJBQUQsR0FBMkIsTUFIbEQ7R0F4Q0Q7RUE2Q0EsVUFBQSxFQUNDO0lBQUEsT0FBQSxFQUFxQixJQUFyQjtHQTlDRDtFQWdEQSxPQUFBLEVBQ0M7SUFBQSxPQUFBLEVBQXFCLElBQXJCO0lBQ0EsYUFBQSxFQUFxQixRQURyQjtJQUVBLFNBQUEsRUFBcUIsQ0FBSyx5QkFBRCxHQUEyQixPQUEvQixDQUZyQjtJQUdBLEtBQUEsRUFBcUIsQ0FBRSxRQUFGLEVBQVksUUFBWixFQUFzQixpQkFBdEIsQ0FIckI7SUFJQSxVQUFBLEVBQXFCLENBQUUsSUFBRixFQUFRLE1BQVIsQ0FKckI7R0FqREQ7RUF1REEsT0FBQSxFQUNDO0lBQUEsT0FBQSxFQUFxQixLQUFyQjtJQUNBLGFBQUEsRUFBcUIsUUFEckI7SUFFQSxrQkFBQSxFQUFxQix5QkFGckI7R0F4REQ7RUE0REEsS0FBQSxFQUNDO0lBQUEsT0FBQSxFQUFxQixJQUFyQjtJQUNBLGFBQUEsRUFBcUIsTUFEckI7R0E3REQ7RUFnRUEsS0FBQSxFQUNDO0lBQUEsT0FBQSxFQUFxQixJQUFyQjtJQUNBLG1CQUFBLEVBQXFCLG1CQURyQjtJQUVBLGlCQUFBLEVBQXFCLGlCQUZyQjtHQWpFRDs7O0FBcUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsT0FBRDtBQUNoQixNQUFBOztJQURpQixVQUFVOztFQUMzQixHQUFBLEdBQU07RUFDTixJQUEyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQXZEO0lBQUEsR0FBRyxDQUFDLElBQUosR0FBVztNQUFBLEtBQUEsRUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQW5CO01BQVg7O0FBRUE7QUFBQTtPQUFBLHFDQUFBOztJQUNDLElBQVksSUFBSSxDQUFDLFdBQUwsQ0FBQSxDQUFaO0FBQUEsZUFBQTs7aUJBQ0EsT0FBQSxDQUFRLElBQUksQ0FBQyxRQUFiLENBQUEsQ0FBdUIsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxRQUFSLEVBQWtCLE9BQWxCLEVBQTJCLEdBQTNCLENBQXZCO0FBRkQ7O0FBSmdCIiwic291cmNlc0NvbnRlbnQiOlsiXyAgID0gcmVxdWlyZSBcImxvZGFzaFwiXG5sc3IgPSByZXF1aXJlIFwibHNyXCJcblxubG9nID0gcmVxdWlyZSBcIi4vbGliL2xvZ1wiXG5cbnNvdXJjZURpcmVjdG9yeVBhdGggICAgICAgPSBcInNyY1wiXG50YXJnZXREaXJlY3RvcnlQYXRoICAgICAgID0gXCJidWlsZFwiXG50ZXN0RGlyZWN0b3J5UGF0aCAgICAgICAgID0gXCJ0ZXN0XCJcbmRvY3VtZW50YXRpb25QYXRoICAgICAgICAgPSBcImRvY3NcIlxuc291cmNlQ2xpZW50RGlyZWN0b3J5UGF0aCA9IFwiI3tzb3VyY2VEaXJlY3RvcnlQYXRofS9jbGllbnRcIlxuc291cmNlU2VydmVyRGlyZWN0b3J5UGF0aCA9IFwiI3tzb3VyY2VEaXJlY3RvcnlQYXRofS9zZXJ2ZXJcIlxudGFyZ2V0Q2xpZW50RGlyZWN0b3J5UGF0aCA9IFwiI3t0YXJnZXREaXJlY3RvcnlQYXRofS9jbGllbnRcIlxudGFyZ2V0U2VydmVyRGlyZWN0b3J5UGF0aCA9IFwiI3t0YXJnZXREaXJlY3RvcnlQYXRofS9zZXJ2ZXJcIlxuXG5kZWZhdWx0cyA9XG5cdGJ1bmRsZTpcblx0XHRlbmFibGVkOiAgICB0cnVlXG5cdFx0c291cmNlbWFwczogdHJ1ZVxuXHRcdGV4dGVybmFsczogIFtdXG5cdFx0dmVuZG9yOlxuXHRcdFx0ZW50cnk6ICBcIiN7c291cmNlQ2xpZW50RGlyZWN0b3J5UGF0aH0vanMvdmVuZG9yL3ZlbmRvci5jb2ZmZWVcIlxuXHRcdFx0dGFyZ2V0OiBcIiN7dGFyZ2V0Q2xpZW50RGlyZWN0b3J5UGF0aH0vanNcIlxuXHRcdFx0YnVuZGxlOiBcInZlbmRvci5idW5kbGUuanNcIlxuXHRcdFx0c291cmNlOiBcIiN7c291cmNlQ2xpZW50RGlyZWN0b3J5UGF0aH0vanMvYXBwL3ZlbmRvclwiXG5cdFx0YXBwOlxuXHRcdFx0ZW50cnk6ICAgICAgXCIje3NvdXJjZUNsaWVudERpcmVjdG9yeVBhdGh9L2pzL2FwcC9hcHAuY29mZmVlXCJcblx0XHRcdHRhcmdldDogICAgIFwiI3t0YXJnZXRDbGllbnREaXJlY3RvcnlQYXRofS9qc1wiXG5cdFx0XHRidW5kbGU6ICAgICBcImFwcC5idW5kbGUuanNcIlxuXHRcdFx0cGF0aHM6ICAgICAgWyBcIiN7c291cmNlQ2xpZW50RGlyZWN0b3J5UGF0aH0vanMvYXBwXCIgXVxuXHRcdFx0ZXh0ZW5zaW9uczogWyBcIi5jb2ZmZWVcIiwgXCIuamFkZVwiLCBcIi5janN4XCIgXVxuXHRcdFx0dHJhbnNmb3JtczogWyBcImNvZmZlZS1yZWFjdGlmeVwiLCBcImphZGVpZnlcIiBdXG5cblx0Y2xlYW46XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgdHJ1ZVxuXHRcdHRhcmdldERpcmVjdG9yeVBhdGg6IHRhcmdldERpcmVjdG9yeVBhdGhcblx0XHRjbGllbnREaXJlY3RvcnlQYXRoOiB0YXJnZXRDbGllbnREaXJlY3RvcnlQYXRoXG5cdFx0c2VydmVyRGlyZWN0b3J5UGF0aDogdGFyZ2V0U2VydmVyRGlyZWN0b3J5UGF0aFxuXG5cdGNvZmZlZTpcblx0XHRlbmFibGVkOiAgICAgICAgICAgICB0cnVlXG5cdFx0c291cmNlRGlyZWN0b3J5UGF0aDogc291cmNlU2VydmVyRGlyZWN0b3J5UGF0aFxuXHRcdHRhcmdldERpcmVjdG9yeVBhdGg6IHRhcmdldFNlcnZlckRpcmVjdG9yeVBhdGhcblxuXHRjb3B5OlxuXHRcdGVuYWJsZWQ6ICAgICAgICAgICAgIHRydWVcblx0XHRleGNsdWRlZDogICAgICAgICAgICBbIFwiKiovKi5jb2ZmZWVcIiwgXCIqKi8qLmxlc3NcIiwgXCIqKi8qLmNqc3hcIiwgXCJzcmMvY2xpZW50L2pzeywvKip9XCIgXVxuXHRcdHNvdXJjZURpcmVjdG9yeVBhdGg6IHNvdXJjZURpcmVjdG9yeVBhdGhcblx0XHR0YXJnZXREaXJlY3RvcnlQYXRoOiB0YXJnZXREaXJlY3RvcnlQYXRoXG5cblx0ZG9jdW1lbnRhdGlvbjpcblx0XHRlbmFibGVkOiAgICAgICAgICAgICB0cnVlXG5cdFx0c291cmNlRGlyZWN0b3J5UGF0aDogc291cmNlRGlyZWN0b3J5UGF0aFxuXHRcdHRhcmdldERpcmVjdG9yeVBhdGg6IGRvY3VtZW50YXRpb25QYXRoXG5cblx0bGVzczpcblx0XHRlbmFibGVkOiAgICAgICAgICAgICB0cnVlXG5cdFx0dGhlbWU6ICAgICAgICAgICAgICAgZmFsc2Vcblx0XHRzb3VyY2VEaXJlY3RvcnlQYXRoOiBcIiN7c291cmNlQ2xpZW50RGlyZWN0b3J5UGF0aH0vbGVzc1wiXG5cdFx0dGFyZ2V0RGlyZWN0b3J5UGF0aDogXCIje3RhcmdldENsaWVudERpcmVjdG9yeVBhdGh9L2Nzc1wiXG5cblx0bGl2ZXJlbG9hZDpcblx0XHRlbmFibGVkOiAgICAgICAgICAgICB0cnVlXG5cblx0bm9kZW1vbjpcblx0XHRlbmFibGVkOiAgICAgICAgICAgICB0cnVlLFxuXHRcdGVudHJ5RmlsZVBhdGg6ICAgICAgIFwiYXBwLmpzXCIsXG5cdFx0d2F0Y2hHbG9iOiAgICAgICAgICAgWyBcIiN7dGFyZ2V0U2VydmVyRGlyZWN0b3J5UGF0aH0vKiovKlwiIF1cblx0XHRleHRyYTogICAgICAgICAgICAgICBbIFwiY2ZnLmpzXCIsIFwiYXBwLmpzXCIsIFwiZ3VscGZpbGUuY29mZmVlXCIgXVxuXHRcdGV4dGVuc2lvbnM6ICAgICAgICAgIFsgXCJqc1wiLCBcImphZGVcIiBdXG5cblx0Zm9yZXZlcjpcblx0XHRlbmFibGVkOiAgICAgICAgICAgICBmYWxzZVxuXHRcdGVudHJ5RmlsZVBhdGg6ICAgICAgIFwiYXBwLmpzXCJcblx0XHR3YXRjaERpcmVjdG9yeVBhdGg6ICBzb3VyY2VTZXJ2ZXJEaXJlY3RvcnlQYXRoXG5cblx0dGVzdHM6XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgdHJ1ZVxuXHRcdGRpcmVjdG9yeVBhdGg6ICAgICAgIFwidGVzdFwiXG5cblx0d2F0Y2g6XG5cdFx0ZW5hYmxlZDogICAgICAgICAgICAgdHJ1ZVxuXHRcdHNvdXJjZURpcmVjdG9yeVBhdGg6IHNvdXJjZURpcmVjdG9yeVBhdGhcblx0XHR0ZXN0RGlyZWN0b3J5UGF0aDogICB0ZXN0RGlyZWN0b3J5UGF0aFxuXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRpb25zID0ge30pIC0+XG5cdGVudiA9IHt9XG5cdGVudi5sZXNzID0gdGhlbWU6IHByb2Nlc3MuZW52LkFQUF9USEVNRSBpZiBwcm9jZXNzLmVudi5BUFBfVEhFTUVcblxuXHRmb3Igc3RhdCBpbiBsc3Iuc3luYyBcIiN7X19kaXJuYW1lfS90YXNrc1wiXG5cdFx0Y29udGludWUgaWYgc3RhdC5pc0RpcmVjdG9yeSgpXG5cdFx0cmVxdWlyZShzdGF0LmZ1bGxQYXRoKSBfLm1lcmdlIGRlZmF1bHRzLCBvcHRpb25zLCBlbnZcbiJdfQ==

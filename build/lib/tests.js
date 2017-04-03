var _, async, cp, fs, log, path, possibleMochaPaths, tests;

_ = require("lodash");

async = require("async");

fs = require("fs");

path = require("path");

cp = require("child_process");

log = require("./log");

possibleMochaPaths = [path.resolve(__dirname, "./node_modules/.bin/mocha"), path.resolve(__dirname, "../node_modules/.bin/mocha"), path.resolve(__dirname, "../../node_modules/.bin/mocha"), path.resolve(__dirname, "../../../node_modules/.bin/mocha"), path.resolve(__dirname, "../../../../node_modules/.bin/mocha")];

tests = function(directory, exit, reporter, cb) {
  return async.map(possibleMochaPaths, function(pathToMocha, cb) {
    return fs.exists(pathToMocha, function(exists) {
      return cb(null, exists ? pathToMocha : false);
    });
  }, function(error, result) {
    var pathToMocha;
    if (error) {
      return cb(error);
    }
    pathToMocha = _.find(result);
    log.debug("Found mocha at: " + pathToMocha);
    return fs.exists(directory, function(exists) {
      var childProcess;
      if (!exists) {
        log.info("Skipping mocha: Directory `" + directory + "` not found.");
        return cb();
      }
      childProcess = cp.spawn(pathToMocha, ["--recursive", "--compilers", "coffee:coffee-script/register", "--reporter", reporter, directory]);
      childProcess.stdout.on("data", function(chunk) {
        return process.stdout.write(chunk);
      });
      childProcess.stderr.on("data", function(chunk) {
        return process.stderr.write(chunk);
      });
      return childProcess.once("close", function() {
        if (exit) {
          return process.exit();
        } else {
          return cb();
        }
      });
    });
  });
};

module.exports = tests;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliL3Rlc3RzLmpzIiwic291cmNlcyI6WyJsaWIvdGVzdHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsQ0FBQSxHQUFRLE9BQUEsQ0FBUSxRQUFSOztBQUNSLEtBQUEsR0FBUSxPQUFBLENBQVEsT0FBUjs7QUFDUixFQUFBLEdBQVEsT0FBQSxDQUFRLElBQVI7O0FBQ1IsSUFBQSxHQUFRLE9BQUEsQ0FBUSxNQUFSOztBQUNSLEVBQUEsR0FBUSxPQUFBLENBQVEsZUFBUjs7QUFFUixHQUFBLEdBQU0sT0FBQSxDQUFRLE9BQVI7O0FBRU4sa0JBQUEsR0FBcUIsQ0FDcEIsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLDJCQUF4QixDQURvQixFQUVwQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsRUFBd0IsNEJBQXhCLENBRm9CLEVBR3BCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixFQUF3QiwrQkFBeEIsQ0FIb0IsRUFJcEIsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLGtDQUF4QixDQUpvQixFQUtwQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsRUFBd0IscUNBQXhCLENBTG9COztBQVFyQixLQUFBLEdBQVEsU0FBQyxTQUFELEVBQVksSUFBWixFQUFrQixRQUFsQixFQUE0QixFQUE1QjtTQUNQLEtBQUssQ0FBQyxHQUFOLENBQVUsa0JBQVYsRUFBOEIsU0FBQyxXQUFELEVBQWMsRUFBZDtXQUM3QixFQUFFLENBQUMsTUFBSCxDQUFVLFdBQVYsRUFBdUIsU0FBQyxNQUFEO2FBQ3RCLEVBQUEsQ0FBRyxJQUFILEVBQVksTUFBSCxHQUFlLFdBQWYsR0FBZ0MsS0FBekM7SUFEc0IsQ0FBdkI7RUFENkIsQ0FBOUIsRUFHRSxTQUFDLEtBQUQsRUFBUSxNQUFSO0FBQ0QsUUFBQTtJQUFBLElBQW1CLEtBQW5CO0FBQUEsYUFBTyxFQUFBLENBQUcsS0FBSCxFQUFQOztJQUVBLFdBQUEsR0FBYyxDQUFDLENBQUMsSUFBRixDQUFPLE1BQVA7SUFDZCxHQUFHLENBQUMsS0FBSixDQUFVLGtCQUFBLEdBQW1CLFdBQTdCO1dBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxTQUFWLEVBQXFCLFNBQUMsTUFBRDtBQUNwQixVQUFBO01BQUEsSUFBQSxDQUFPLE1BQVA7UUFDQyxHQUFHLENBQUMsSUFBSixDQUFTLDZCQUFBLEdBQThCLFNBQTlCLEdBQXdDLGNBQWpEO0FBQ0EsZUFBTyxFQUFBLENBQUEsRUFGUjs7TUFJQSxZQUFBLEdBQWUsRUFBRSxDQUFDLEtBQUgsQ0FBUyxXQUFULEVBQXNCLENBQ3BDLGFBRG9DLEVBRXBDLGFBRm9DLEVBR3BDLCtCQUhvQyxFQUlwQyxZQUpvQyxFQUtwQyxRQUxvQyxFQU1wQyxTQU5vQyxDQUF0QjtNQVNmLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBcEIsQ0FBdUIsTUFBdkIsRUFBK0IsU0FBQyxLQUFEO2VBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixDQUFxQixLQUFyQjtNQUQ4QixDQUEvQjtNQUdBLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBcEIsQ0FBdUIsTUFBdkIsRUFBK0IsU0FBQyxLQUFEO2VBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixDQUFxQixLQUFyQjtNQUQ4QixDQUEvQjthQUdBLFlBQVksQ0FBQyxJQUFiLENBQWtCLE9BQWxCLEVBQTJCLFNBQUE7UUFDMUIsSUFBRyxJQUFIO2lCQUNDLE9BQU8sQ0FBQyxJQUFSLENBQUEsRUFERDtTQUFBLE1BQUE7aUJBR0MsRUFBQSxDQUFBLEVBSEQ7O01BRDBCLENBQTNCO0lBcEJvQixDQUFyQjtFQU5DLENBSEY7QUFETzs7QUFvQ1IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJfICAgICA9IHJlcXVpcmUgXCJsb2Rhc2hcIlxuYXN5bmMgPSByZXF1aXJlIFwiYXN5bmNcIlxuZnMgICAgPSByZXF1aXJlIFwiZnNcIlxucGF0aCAgPSByZXF1aXJlIFwicGF0aFwiXG5jcCAgICA9IHJlcXVpcmUgXCJjaGlsZF9wcm9jZXNzXCJcblxubG9nID0gcmVxdWlyZSBcIi4vbG9nXCJcblxucG9zc2libGVNb2NoYVBhdGhzID0gW1xuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4vbm9kZV9tb2R1bGVzLy5iaW4vbW9jaGFcIlxuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4uL25vZGVfbW9kdWxlcy8uYmluL21vY2hhXCJcblx0cGF0aC5yZXNvbHZlIF9fZGlybmFtZSwgXCIuLi8uLi9ub2RlX21vZHVsZXMvLmJpbi9tb2NoYVwiXG5cdHBhdGgucmVzb2x2ZSBfX2Rpcm5hbWUsIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5iaW4vbW9jaGFcIlxuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8uYmluL21vY2hhXCJcbl1cblxudGVzdHMgPSAoZGlyZWN0b3J5LCBleGl0LCByZXBvcnRlciwgY2IpIC0+XG5cdGFzeW5jLm1hcCBwb3NzaWJsZU1vY2hhUGF0aHMsIChwYXRoVG9Nb2NoYSwgY2IpIC0+XG5cdFx0ZnMuZXhpc3RzIHBhdGhUb01vY2hhLCAoZXhpc3RzKSAtPlxuXHRcdFx0Y2IgbnVsbCwgaWYgZXhpc3RzIHRoZW4gcGF0aFRvTW9jaGEgZWxzZSBmYWxzZVxuXHQsIChlcnJvciwgcmVzdWx0KSAtPlxuXHRcdHJldHVybiBjYiBlcnJvciBpZiBlcnJvclxuXG5cdFx0cGF0aFRvTW9jaGEgPSBfLmZpbmQgcmVzdWx0XG5cdFx0bG9nLmRlYnVnIFwiRm91bmQgbW9jaGEgYXQ6ICN7cGF0aFRvTW9jaGF9XCJcblxuXHRcdGZzLmV4aXN0cyBkaXJlY3RvcnksIChleGlzdHMpIC0+XG5cdFx0XHR1bmxlc3MgZXhpc3RzXG5cdFx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgbW9jaGE6IERpcmVjdG9yeSBgI3tkaXJlY3Rvcnl9YCBub3QgZm91bmQuXCJcblx0XHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdFx0Y2hpbGRQcm9jZXNzID0gY3Auc3Bhd24gcGF0aFRvTW9jaGEsIFtcblx0XHRcdFx0XCItLXJlY3Vyc2l2ZVwiXG5cdFx0XHRcdFwiLS1jb21waWxlcnNcIlxuXHRcdFx0XHRcImNvZmZlZTpjb2ZmZWUtc2NyaXB0L3JlZ2lzdGVyXCJcblx0XHRcdFx0XCItLXJlcG9ydGVyXCJcblx0XHRcdFx0cmVwb3J0ZXJcblx0XHRcdFx0ZGlyZWN0b3J5XG5cdFx0XHRdXG5cblx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRvdXQub24gXCJkYXRhXCIsIChjaHVuaykgLT5cblx0XHRcdFx0cHJvY2Vzcy5zdGRvdXQud3JpdGUgY2h1bmtcblxuXHRcdFx0Y2hpbGRQcm9jZXNzLnN0ZGVyci5vbiBcImRhdGFcIiwgKGNodW5rKSAtPlxuXHRcdFx0XHRwcm9jZXNzLnN0ZGVyci53cml0ZSBjaHVua1xuXG5cdFx0XHRjaGlsZFByb2Nlc3Mub25jZSBcImNsb3NlXCIsIC0+XG5cdFx0XHRcdGlmIGV4aXRcblx0XHRcdFx0XHRwcm9jZXNzLmV4aXQoKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y2IoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RzXG4iXX0=

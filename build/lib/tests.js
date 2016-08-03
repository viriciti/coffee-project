var _, async, cp, fs, log, path, possibleMochaPaths, tests;

_ = require("lodash");

async = require("async");

fs = require("fs");

path = require("path");

cp = require("child_process");

log = require("./log");

possibleMochaPaths = [path.resolve(__dirname, "./node_modules/.bin/mocha"), path.resolve(__dirname, "../node_modules/.bin/mocha"), path.resolve(__dirname, "../../node_modules/.bin/mocha"), path.resolve(__dirname, "../../../node_modules/.bin/mocha")];

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
    console.log(result);
    pathToMocha = _.find(result);
    log.debug("Found mocha at " + pathToMocha);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBQVEsT0FBQSxDQUFRLFFBQVI7O0FBQ1IsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSOztBQUNSLEVBQUEsR0FBUSxPQUFBLENBQVEsSUFBUjs7QUFDUixJQUFBLEdBQVEsT0FBQSxDQUFRLE1BQVI7O0FBQ1IsRUFBQSxHQUFRLE9BQUEsQ0FBUSxlQUFSOztBQUVSLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7QUFFTixrQkFBQSxHQUFxQixDQUNwQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsRUFBd0IsMkJBQXhCLENBRG9CLEVBRXBCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixFQUF3Qiw0QkFBeEIsQ0FGb0IsRUFHcEIsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLCtCQUF4QixDQUhvQixFQUlwQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsRUFBd0Isa0NBQXhCLENBSm9COztBQU9yQixLQUFBLEdBQVEsU0FBQyxTQUFELEVBQVksSUFBWixFQUFrQixRQUFsQixFQUE0QixFQUE1QjtTQUNQLEtBQUssQ0FBQyxHQUFOLENBQVUsa0JBQVYsRUFBOEIsU0FBQyxXQUFELEVBQWMsRUFBZDtXQUM3QixFQUFFLENBQUMsTUFBSCxDQUFVLFdBQVYsRUFBdUIsU0FBQyxNQUFEO2FBQ3RCLEVBQUEsQ0FBRyxJQUFILEVBQVksTUFBSCxHQUFlLFdBQWYsR0FBZ0MsS0FBekM7SUFEc0IsQ0FBdkI7RUFENkIsQ0FBOUIsRUFHRSxTQUFDLEtBQUQsRUFBUSxNQUFSO0FBQ0QsUUFBQTtJQUFBLElBQW1CLEtBQW5CO0FBQUEsYUFBTyxFQUFBLENBQUcsS0FBSCxFQUFQOztJQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtJQUNBLFdBQUEsR0FBYyxDQUFDLENBQUMsSUFBRixDQUFPLE1BQVA7SUFDZCxHQUFHLENBQUMsS0FBSixDQUFVLGlCQUFBLEdBQWtCLFdBQTVCO1dBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxTQUFWLEVBQXFCLFNBQUMsTUFBRDtBQUNwQixVQUFBO01BQUEsSUFBQSxDQUFPLE1BQVA7UUFDQyxHQUFHLENBQUMsSUFBSixDQUFTLDZCQUFBLEdBQThCLFNBQTlCLEdBQXdDLGNBQWpEO0FBQ0EsZUFBTyxFQUFBLENBQUEsRUFGUjs7TUFJQSxZQUFBLEdBQWUsRUFBRSxDQUFDLEtBQUgsQ0FBUyxXQUFULEVBQXNCLENBQ3BDLGFBRG9DLEVBRXBDLGFBRm9DLEVBR3BDLCtCQUhvQyxFQUlwQyxZQUpvQyxFQUtwQyxRQUxvQyxFQU1wQyxTQU5vQyxDQUF0QjtNQVNmLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBcEIsQ0FBdUIsTUFBdkIsRUFBK0IsU0FBQyxLQUFEO2VBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixDQUFxQixLQUFyQjtNQUQ4QixDQUEvQjtNQUdBLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBcEIsQ0FBdUIsTUFBdkIsRUFBK0IsU0FBQyxLQUFEO2VBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixDQUFxQixLQUFyQjtNQUQ4QixDQUEvQjthQUdBLFlBQVksQ0FBQyxJQUFiLENBQWtCLE9BQWxCLEVBQTJCLFNBQUE7UUFDMUIsSUFBRyxJQUFIO2lCQUNDLE9BQU8sQ0FBQyxJQUFSLENBQUEsRUFERDtTQUFBLE1BQUE7aUJBR0MsRUFBQSxDQUFBLEVBSEQ7O01BRDBCLENBQTNCO0lBcEJvQixDQUFyQjtFQU5DLENBSEY7QUFETzs7QUFvQ1IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoibGliL3Rlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXyAgICAgPSByZXF1aXJlIFwibG9kYXNoXCJcbmFzeW5jID0gcmVxdWlyZSBcImFzeW5jXCJcbmZzICAgID0gcmVxdWlyZSBcImZzXCJcbnBhdGggID0gcmVxdWlyZSBcInBhdGhcIlxuY3AgICAgPSByZXF1aXJlIFwiY2hpbGRfcHJvY2Vzc1wiXG5cbmxvZyA9IHJlcXVpcmUgXCIuL2xvZ1wiXG5cbnBvc3NpYmxlTW9jaGFQYXRocyA9IFtcblx0cGF0aC5yZXNvbHZlIF9fZGlybmFtZSwgXCIuL25vZGVfbW9kdWxlcy8uYmluL21vY2hhXCJcblx0cGF0aC5yZXNvbHZlIF9fZGlybmFtZSwgXCIuLi9ub2RlX21vZHVsZXMvLmJpbi9tb2NoYVwiXG5cdHBhdGgucmVzb2x2ZSBfX2Rpcm5hbWUsIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5iaW4vbW9jaGFcIlxuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8uYmluL21vY2hhXCJcbl1cblxudGVzdHMgPSAoZGlyZWN0b3J5LCBleGl0LCByZXBvcnRlciwgY2IpIC0+XG5cdGFzeW5jLm1hcCBwb3NzaWJsZU1vY2hhUGF0aHMsIChwYXRoVG9Nb2NoYSwgY2IpIC0+XG5cdFx0ZnMuZXhpc3RzIHBhdGhUb01vY2hhLCAoZXhpc3RzKSAtPlxuXHRcdFx0Y2IgbnVsbCwgaWYgZXhpc3RzIHRoZW4gcGF0aFRvTW9jaGEgZWxzZSBmYWxzZVxuXHQsIChlcnJvciwgcmVzdWx0KSAtPlxuXHRcdHJldHVybiBjYiBlcnJvciBpZiBlcnJvclxuXHRcdGNvbnNvbGUubG9nIHJlc3VsdFxuXHRcdHBhdGhUb01vY2hhID0gXy5maW5kIHJlc3VsdFxuXHRcdGxvZy5kZWJ1ZyBcIkZvdW5kIG1vY2hhIGF0ICN7cGF0aFRvTW9jaGF9XCJcblxuXHRcdGZzLmV4aXN0cyBkaXJlY3RvcnksIChleGlzdHMpIC0+XG5cdFx0XHR1bmxlc3MgZXhpc3RzXG5cdFx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgbW9jaGE6IERpcmVjdG9yeSBgI3tkaXJlY3Rvcnl9YCBub3QgZm91bmQuXCJcblx0XHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdFx0Y2hpbGRQcm9jZXNzID0gY3Auc3Bhd24gcGF0aFRvTW9jaGEsIFtcblx0XHRcdFx0XCItLXJlY3Vyc2l2ZVwiXG5cdFx0XHRcdFwiLS1jb21waWxlcnNcIlxuXHRcdFx0XHRcImNvZmZlZTpjb2ZmZWUtc2NyaXB0L3JlZ2lzdGVyXCJcblx0XHRcdFx0XCItLXJlcG9ydGVyXCJcblx0XHRcdFx0cmVwb3J0ZXJcblx0XHRcdFx0ZGlyZWN0b3J5XG5cdFx0XHRdXG5cblx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRvdXQub24gXCJkYXRhXCIsIChjaHVuaykgLT5cblx0XHRcdFx0cHJvY2Vzcy5zdGRvdXQud3JpdGUgY2h1bmtcblxuXHRcdFx0Y2hpbGRQcm9jZXNzLnN0ZGVyci5vbiBcImRhdGFcIiwgKGNodW5rKSAtPlxuXHRcdFx0XHRwcm9jZXNzLnN0ZGVyci53cml0ZSBjaHVua1xuXG5cdFx0XHRjaGlsZFByb2Nlc3Mub25jZSBcImNsb3NlXCIsIC0+XG5cdFx0XHRcdGlmIGV4aXRcblx0XHRcdFx0XHRwcm9jZXNzLmV4aXQoKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y2IoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RzXG4iXX0=

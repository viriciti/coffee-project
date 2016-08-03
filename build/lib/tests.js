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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBQVEsT0FBQSxDQUFRLFFBQVI7O0FBQ1IsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSOztBQUNSLEVBQUEsR0FBUSxPQUFBLENBQVEsSUFBUjs7QUFDUixJQUFBLEdBQVEsT0FBQSxDQUFRLE1BQVI7O0FBQ1IsRUFBQSxHQUFRLE9BQUEsQ0FBUSxlQUFSOztBQUVSLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7QUFFTixrQkFBQSxHQUFxQixDQUNwQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsRUFBd0IsMkJBQXhCLENBRG9CLEVBRXBCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixFQUF3Qiw0QkFBeEIsQ0FGb0IsRUFHcEIsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLCtCQUF4QixDQUhvQixFQUlwQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsRUFBd0Isa0NBQXhCLENBSm9CLEVBS3BCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixFQUF3QixxQ0FBeEIsQ0FMb0I7O0FBUXJCLEtBQUEsR0FBUSxTQUFDLFNBQUQsRUFBWSxJQUFaLEVBQWtCLFFBQWxCLEVBQTRCLEVBQTVCO1NBQ1AsS0FBSyxDQUFDLEdBQU4sQ0FBVSxrQkFBVixFQUE4QixTQUFDLFdBQUQsRUFBYyxFQUFkO1dBQzdCLEVBQUUsQ0FBQyxNQUFILENBQVUsV0FBVixFQUF1QixTQUFDLE1BQUQ7YUFDdEIsRUFBQSxDQUFHLElBQUgsRUFBWSxNQUFILEdBQWUsV0FBZixHQUFnQyxLQUF6QztJQURzQixDQUF2QjtFQUQ2QixDQUE5QixFQUdFLFNBQUMsS0FBRCxFQUFRLE1BQVI7QUFDRCxRQUFBO0lBQUEsSUFBbUIsS0FBbkI7QUFBQSxhQUFPLEVBQUEsQ0FBRyxLQUFILEVBQVA7O0lBRUEsV0FBQSxHQUFjLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBUDtJQUNkLEdBQUcsQ0FBQyxLQUFKLENBQVUsa0JBQUEsR0FBbUIsV0FBN0I7V0FFQSxFQUFFLENBQUMsTUFBSCxDQUFVLFNBQVYsRUFBcUIsU0FBQyxNQUFEO0FBQ3BCLFVBQUE7TUFBQSxJQUFBLENBQU8sTUFBUDtRQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsNkJBQUEsR0FBOEIsU0FBOUIsR0FBd0MsY0FBakQ7QUFDQSxlQUFPLEVBQUEsQ0FBQSxFQUZSOztNQUlBLFlBQUEsR0FBZSxFQUFFLENBQUMsS0FBSCxDQUFTLFdBQVQsRUFBc0IsQ0FDcEMsYUFEb0MsRUFFcEMsYUFGb0MsRUFHcEMsK0JBSG9DLEVBSXBDLFlBSm9DLEVBS3BDLFFBTG9DLEVBTXBDLFNBTm9DLENBQXRCO01BU2YsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFwQixDQUF1QixNQUF2QixFQUErQixTQUFDLEtBQUQ7ZUFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFmLENBQXFCLEtBQXJCO01BRDhCLENBQS9CO01BR0EsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFwQixDQUF1QixNQUF2QixFQUErQixTQUFDLEtBQUQ7ZUFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFmLENBQXFCLEtBQXJCO01BRDhCLENBQS9CO2FBR0EsWUFBWSxDQUFDLElBQWIsQ0FBa0IsT0FBbEIsRUFBMkIsU0FBQTtRQUMxQixJQUFHLElBQUg7aUJBQ0MsT0FBTyxDQUFDLElBQVIsQ0FBQSxFQUREO1NBQUEsTUFBQTtpQkFHQyxFQUFBLENBQUEsRUFIRDs7TUFEMEIsQ0FBM0I7SUFwQm9CLENBQXJCO0VBTkMsQ0FIRjtBQURPOztBQW9DUixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJsaWIvdGVzdHMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJfICAgICA9IHJlcXVpcmUgXCJsb2Rhc2hcIlxuYXN5bmMgPSByZXF1aXJlIFwiYXN5bmNcIlxuZnMgICAgPSByZXF1aXJlIFwiZnNcIlxucGF0aCAgPSByZXF1aXJlIFwicGF0aFwiXG5jcCAgICA9IHJlcXVpcmUgXCJjaGlsZF9wcm9jZXNzXCJcblxubG9nID0gcmVxdWlyZSBcIi4vbG9nXCJcblxucG9zc2libGVNb2NoYVBhdGhzID0gW1xuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4vbm9kZV9tb2R1bGVzLy5iaW4vbW9jaGFcIlxuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4uL25vZGVfbW9kdWxlcy8uYmluL21vY2hhXCJcblx0cGF0aC5yZXNvbHZlIF9fZGlybmFtZSwgXCIuLi8uLi9ub2RlX21vZHVsZXMvLmJpbi9tb2NoYVwiXG5cdHBhdGgucmVzb2x2ZSBfX2Rpcm5hbWUsIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5iaW4vbW9jaGFcIlxuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8uYmluL21vY2hhXCJcbl1cblxudGVzdHMgPSAoZGlyZWN0b3J5LCBleGl0LCByZXBvcnRlciwgY2IpIC0+XG5cdGFzeW5jLm1hcCBwb3NzaWJsZU1vY2hhUGF0aHMsIChwYXRoVG9Nb2NoYSwgY2IpIC0+XG5cdFx0ZnMuZXhpc3RzIHBhdGhUb01vY2hhLCAoZXhpc3RzKSAtPlxuXHRcdFx0Y2IgbnVsbCwgaWYgZXhpc3RzIHRoZW4gcGF0aFRvTW9jaGEgZWxzZSBmYWxzZVxuXHQsIChlcnJvciwgcmVzdWx0KSAtPlxuXHRcdHJldHVybiBjYiBlcnJvciBpZiBlcnJvclxuXG5cdFx0cGF0aFRvTW9jaGEgPSBfLmZpbmQgcmVzdWx0XG5cdFx0bG9nLmRlYnVnIFwiRm91bmQgbW9jaGEgYXQ6ICN7cGF0aFRvTW9jaGF9XCJcblxuXHRcdGZzLmV4aXN0cyBkaXJlY3RvcnksIChleGlzdHMpIC0+XG5cdFx0XHR1bmxlc3MgZXhpc3RzXG5cdFx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgbW9jaGE6IERpcmVjdG9yeSBgI3tkaXJlY3Rvcnl9YCBub3QgZm91bmQuXCJcblx0XHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdFx0Y2hpbGRQcm9jZXNzID0gY3Auc3Bhd24gcGF0aFRvTW9jaGEsIFtcblx0XHRcdFx0XCItLXJlY3Vyc2l2ZVwiXG5cdFx0XHRcdFwiLS1jb21waWxlcnNcIlxuXHRcdFx0XHRcImNvZmZlZTpjb2ZmZWUtc2NyaXB0L3JlZ2lzdGVyXCJcblx0XHRcdFx0XCItLXJlcG9ydGVyXCJcblx0XHRcdFx0cmVwb3J0ZXJcblx0XHRcdFx0ZGlyZWN0b3J5XG5cdFx0XHRdXG5cblx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRvdXQub24gXCJkYXRhXCIsIChjaHVuaykgLT5cblx0XHRcdFx0cHJvY2Vzcy5zdGRvdXQud3JpdGUgY2h1bmtcblxuXHRcdFx0Y2hpbGRQcm9jZXNzLnN0ZGVyci5vbiBcImRhdGFcIiwgKGNodW5rKSAtPlxuXHRcdFx0XHRwcm9jZXNzLnN0ZGVyci53cml0ZSBjaHVua1xuXG5cdFx0XHRjaGlsZFByb2Nlc3Mub25jZSBcImNsb3NlXCIsIC0+XG5cdFx0XHRcdGlmIGV4aXRcblx0XHRcdFx0XHRwcm9jZXNzLmV4aXQoKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y2IoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RzXG4iXX0=

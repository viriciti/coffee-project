var _, async, cp, fs, log, path, possibleMochaPaths, tests;

_ = require("lodash");

async = require("async");

fs = require("fs");

path = require("path");

cp = require("child_process");

log = require("./log");

possibleMochaPaths = [path.resolve(__dirname, "../../node_modules/.bin/mocha"), path.resolve(__dirname, "../node_modules/.bin/mocha")];

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBQVEsT0FBQSxDQUFRLFFBQVI7O0FBQ1IsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSOztBQUNSLEVBQUEsR0FBUSxPQUFBLENBQVEsSUFBUjs7QUFDUixJQUFBLEdBQVEsT0FBQSxDQUFRLE1BQVI7O0FBQ1IsRUFBQSxHQUFRLE9BQUEsQ0FBUSxlQUFSOztBQUVSLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7QUFFTixrQkFBQSxHQUFxQixDQUNwQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsRUFBd0IsK0JBQXhCLENBRG9CLEVBRXBCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBYixFQUF3Qiw0QkFBeEIsQ0FGb0I7O0FBS3JCLEtBQUEsR0FBUSxTQUFDLFNBQUQsRUFBWSxJQUFaLEVBQWtCLFFBQWxCLEVBQTRCLEVBQTVCO1NBQ1AsS0FBSyxDQUFDLEdBQU4sQ0FBVSxrQkFBVixFQUE4QixTQUFDLFdBQUQsRUFBYyxFQUFkO1dBQzdCLEVBQUUsQ0FBQyxNQUFILENBQVUsV0FBVixFQUF1QixTQUFDLE1BQUQ7YUFDdEIsRUFBQSxDQUFHLElBQUgsRUFBWSxNQUFILEdBQWUsV0FBZixHQUFnQyxLQUF6QztJQURzQixDQUF2QjtFQUQ2QixDQUE5QixFQUdFLFNBQUMsS0FBRCxFQUFRLE1BQVI7QUFDRCxRQUFBO0lBQUEsSUFBbUIsS0FBbkI7QUFBQSxhQUFPLEVBQUEsQ0FBRyxLQUFILEVBQVA7O0lBRUEsV0FBQSxHQUFjLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBUDtXQUVkLEVBQUUsQ0FBQyxNQUFILENBQVUsU0FBVixFQUFxQixTQUFDLE1BQUQ7QUFDcEIsVUFBQTtNQUFBLElBQUEsQ0FBTyxNQUFQO1FBQ0MsR0FBRyxDQUFDLElBQUosQ0FBUyw2QkFBQSxHQUE4QixTQUE5QixHQUF3QyxjQUFqRDtBQUNBLGVBQU8sRUFBQSxDQUFBLEVBRlI7O01BSUEsWUFBQSxHQUFlLEVBQUUsQ0FBQyxLQUFILENBQVMsV0FBVCxFQUFzQixDQUNwQyxhQURvQyxFQUVwQyxhQUZvQyxFQUdwQywrQkFIb0MsRUFJcEMsWUFKb0MsRUFLcEMsUUFMb0MsRUFNcEMsU0FOb0MsQ0FBdEI7TUFTZixZQUFZLENBQUMsTUFBTSxDQUFDLEVBQXBCLENBQXVCLE1BQXZCLEVBQStCLFNBQUMsS0FBRDtlQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQWYsQ0FBcUIsS0FBckI7TUFEOEIsQ0FBL0I7TUFHQSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQXBCLENBQXVCLE1BQXZCLEVBQStCLFNBQUMsS0FBRDtlQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQWYsQ0FBcUIsS0FBckI7TUFEOEIsQ0FBL0I7YUFHQSxZQUFZLENBQUMsSUFBYixDQUFrQixPQUFsQixFQUEyQixTQUFBO1FBQzFCLElBQUcsSUFBSDtpQkFDQyxPQUFPLENBQUMsSUFBUixDQUFBLEVBREQ7U0FBQSxNQUFBO2lCQUdDLEVBQUEsQ0FBQSxFQUhEOztNQUQwQixDQUEzQjtJQXBCb0IsQ0FBckI7RUFMQyxDQUhGO0FBRE87O0FBbUNSLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImxpYi90ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIl8gICAgID0gcmVxdWlyZSBcImxvZGFzaFwiXG5hc3luYyA9IHJlcXVpcmUgXCJhc3luY1wiXG5mcyAgICA9IHJlcXVpcmUgXCJmc1wiXG5wYXRoICA9IHJlcXVpcmUgXCJwYXRoXCJcbmNwICAgID0gcmVxdWlyZSBcImNoaWxkX3Byb2Nlc3NcIlxuXG5sb2cgPSByZXF1aXJlIFwiLi9sb2dcIlxuXG5wb3NzaWJsZU1vY2hhUGF0aHMgPSBbXG5cdHBhdGgucmVzb2x2ZSBfX2Rpcm5hbWUsIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5iaW4vbW9jaGFcIlxuXHRwYXRoLnJlc29sdmUgX19kaXJuYW1lLCBcIi4uL25vZGVfbW9kdWxlcy8uYmluL21vY2hhXCJcbl1cblxudGVzdHMgPSAoZGlyZWN0b3J5LCBleGl0LCByZXBvcnRlciwgY2IpIC0+XG5cdGFzeW5jLm1hcCBwb3NzaWJsZU1vY2hhUGF0aHMsIChwYXRoVG9Nb2NoYSwgY2IpIC0+XG5cdFx0ZnMuZXhpc3RzIHBhdGhUb01vY2hhLCAoZXhpc3RzKSAtPlxuXHRcdFx0Y2IgbnVsbCwgaWYgZXhpc3RzIHRoZW4gcGF0aFRvTW9jaGEgZWxzZSBmYWxzZVxuXHQsIChlcnJvciwgcmVzdWx0KSAtPlxuXHRcdHJldHVybiBjYiBlcnJvciBpZiBlcnJvclxuXG5cdFx0cGF0aFRvTW9jaGEgPSBfLmZpbmQgcmVzdWx0XG5cblx0XHRmcy5leGlzdHMgZGlyZWN0b3J5LCAoZXhpc3RzKSAtPlxuXHRcdFx0dW5sZXNzIGV4aXN0c1xuXHRcdFx0XHRsb2cuaW5mbyBcIlNraXBwaW5nIG1vY2hhOiBEaXJlY3RvcnkgYCN7ZGlyZWN0b3J5fWAgbm90IGZvdW5kLlwiXG5cdFx0XHRcdHJldHVybiBjYigpXG5cblx0XHRcdGNoaWxkUHJvY2VzcyA9IGNwLnNwYXduIHBhdGhUb01vY2hhLCBbXG5cdFx0XHRcdFwiLS1yZWN1cnNpdmVcIlxuXHRcdFx0XHRcIi0tY29tcGlsZXJzXCJcblx0XHRcdFx0XCJjb2ZmZWU6Y29mZmVlLXNjcmlwdC9yZWdpc3RlclwiXG5cdFx0XHRcdFwiLS1yZXBvcnRlclwiXG5cdFx0XHRcdHJlcG9ydGVyXG5cdFx0XHRcdGRpcmVjdG9yeVxuXHRcdFx0XVxuXG5cdFx0XHRjaGlsZFByb2Nlc3Muc3Rkb3V0Lm9uIFwiZGF0YVwiLCAoY2h1bmspIC0+XG5cdFx0XHRcdHByb2Nlc3Muc3Rkb3V0LndyaXRlIGNodW5rXG5cblx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRlcnIub24gXCJkYXRhXCIsIChjaHVuaykgLT5cblx0XHRcdFx0cHJvY2Vzcy5zdGRlcnIud3JpdGUgY2h1bmtcblxuXHRcdFx0Y2hpbGRQcm9jZXNzLm9uY2UgXCJjbG9zZVwiLCAtPlxuXHRcdFx0XHRpZiBleGl0XG5cdFx0XHRcdFx0cHJvY2Vzcy5leGl0KClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGNiKClcblxubW9kdWxlLmV4cG9ydHMgPSB0ZXN0c1xuIl19

var cleanBuildDirectory, mkdirp, rimraf;

mkdirp = require("mkdirp");

rimraf = require("rimraf");

cleanBuildDirectory = function(buildDirectoryPath, cb) {
  return rimraf(buildDirectoryPath, function(error) {
    if (error) {
      return cb(error);
    }
    return mkdirp(buildDirectoryPath, cb);
  });
};

module.exports = {
  cleanBuildDirectory: cleanBuildDirectory
};

var copy, fs, rimraf, rm;

fs = require("fs");

rimraf = require("rimraf");

copy = function(path, sourcePath, targetPath, cb) {
  var readStream, writeStream;
  targetPath = path.replace(sourcePath, targetPath);
  readStream = fs.createReadStream(path);
  writeStream = fs.createWriteStream(targetPath);
  readStream.on("error", cb);
  writeStream.on("error", cb);
  writeStream.on("finish", cb);
  return readStream.pipe(writeStream);
};

rm = function(path, sourcePath, targetPath, cb) {
  targetPath = path.replace(sourcePath, targetPath);
  return rimraf(targetPath, cb);
};

module.exports = {
  rm: rm,
  copy: copy
};

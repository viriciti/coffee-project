var level, ref, winston;

winston = require("winston");

level = "info";

if ((ref = process.env.DEBUG) === "1" || ref === "true") {
  level = "debug";
}

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: level
    })
  ]
});

var level, winston, _ref;

winston = require("winston");

level = "info";

if ((_ref = process.env.DEBUG) === "1" || _ref === "true") {
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

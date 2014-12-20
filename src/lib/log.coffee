winston = require "winston"

level = "info"
level = "debug" if process.env.DEBUG in ["1", "true"]

module.exports = new winston.Logger
	transports: [
		new winston.transports.Console
			colorize: true
			level:    level
	]
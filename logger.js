const winston = require('winston');

const timestampFormat = () => (new Date()).toLocaleTimeString();

const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			colorize: true,
			timestamp: timestampFormat
		})
	]
});

module.exports = logger;
// logger.level = 'debug';

// logger.info("hello winston");
// logger.debug("debugging info");
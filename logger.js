const winston = require('winston');

const timestampFormat = () => (new Date()).toLocaleTimeString();

/*-- setting log format --*/
const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			colorize: true,
			timestamp: timestampFormat
		})
	]
});

module.exports = logger;
exports.log = (content, type = 'log') => {
	const timestamp = new Date()
		.toISOString()
		.replace(/T/, ' ') // replaces separating date and time
		.replace(/\..+/, ''); // removes everything after milliseconds

	switch(type) {
		case 'log':
			return console.log(`[${timestamp}]: [${type.toUpperCase()}] ${content}`);
			break;

		case 'error':
			return console.error(`[${timestamp}]: [\x1b[31m${type.toUpperCase()}\x1b[0m] ${content}`);
			break;

		case 'debug':
			return console.log(`[${timestamp}]: [\x1b[33m${type.toUpperCase()}\x1b[0m] ${content}`);
			break;

		case 'fatal':
			return console.error(`[${timestamp}]: [\x1b[31m${type.toUpperCase()}\x1b[0m] ${content}`);
			break;

		case 'info':
			return console.log(`[${timestamp}]: [${type.toUpperCase()}] ${content}`);
			break;

		default:
			throw new TypeError('Invalid logger type.');
			break;
	}
};

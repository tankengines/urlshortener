const Redis = require('ioredis');
const path = require('path');

module.exports = class Handler {
	constructor() {
		this.redis = new Redis({ host: 'redis', password: process.env.REDIS_PASSWORD });
	}

	async generateKey() {
		const characters = 'abcdefghijklmnopqrstuvwxyz';
		const keyLength = process.env.KEY_LENGTH || 6;
		let result;

		// Hash collision checking, so we don't overwrite previous URLs
		let collision = true;
		while (collision) {
			result = '';

			// 6 characters provide 165765600 permutations for just lowercase chars
			// In practice, if keys are exhausted, then just change key length
			for (let i = 0; i < keyLength; i++) {
				result += characters.charAt(Math.floor(Math.random() * characters.length));
			}

			const record = await this.redis.get(`link:${result}`);
			if (record === null) {
				collision = false;
			}
		}

		return result;
	}

	async getURL(req, res) {
		const url = await this.redis.get(`link:${req.params.key}`);
		if (!url) return res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
		console.log(`Fetched url for key ${req.params.key}`);
		res.redirect(url);
	}

	async setURL(req, res) {
		if (!this.validURL(req.body.url)) return res.status(400).json({ reason: 'Not a link' });
		const key = await this.generateKey();
		const set = await this.redis.set(`link:${key}`, req.body.url).catch(err => {
			res.status(500);
			err;
		});
		if (!set) return;
		res.send(key);
		console.log(`Successfully created key ${key} for url ${req.body.url}`);
	}

	validURL(str) {
		// Thank you random regex https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
		const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return pattern.test(str);
	}
};

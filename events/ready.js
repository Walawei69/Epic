const fs = require('fs')
module.exports = {
	name: 'ready',
	once: true,
	async execute(Discord, client) {

		client.user.setActivity(`${client.config.prefix}help`, { type: 'LISTENING' })
		console.log(`Logged in as ${client.user.tag}. Let's roll!`);
	},
};
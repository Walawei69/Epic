module.exports = {
	name: 'test',
	description: 'anything',
    aliases: [],
    usage: '',
    creatorOnly: true,
	async execute(message, args, Discord, client, prefix) {
		message.channel.send('There is no command to be tested for now.')
		
	}
}
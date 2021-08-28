const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection();
client.config = config

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, Discord, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, Discord, client));
	}
}

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		let command = require(`./commands/${folder}/${file}`);
        command.category = folder
		client.commands.set(command.name, command);
	}
}

let y = process.openStdin()
 y.addListener('data', res => {
     let x = res.toString().trim().split(/ +/g)
	 if(isNaN(x[0])) return console.log('Please provide channel ID.')
	 if(!x[1]) return console.log('Please provide content lmao.')
     const channel = client.channels.cache.get(x[0])
	 if(!channel) return console.log('Please provide valid channel ID.')
	 channel.send(x.slice(1).join(' ')).catch((e) => console.log(e))
 })

 
client.login(config.token)
const fs = require('fs')
const autoMod = require('../counters/autoMod')
const triggers = require('../counters/triggers')
module.exports = {
	name: 'message',
	async execute(message, Discord, client) {
        const { owners } = client.config
        const { prefix } = JSON.parse(fs.readFileSync(process.cwd() + "/config.json", "utf8"))

        autoMod(message, client)
        triggers(message, client)

        if (message.channel.type === 'dm' || !message.content.toLowerCase().startsWith(prefix) || !message.author || !message.content || message.author.bot || message.author.id === client.user.id) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
	    const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return 

        // Creator-only commands:
    if (command.creatorOnly && !owners.includes(message.author.id) ) return message.reply('this command is only executable by my creator for safety purposes.').then(msg => msg.delete( {timeout: 5000} ))

    if (!owners.includes(message.author.id)) {
        // Permissions:
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply(`you don\'t have the permission to use this command! (**${command.permissions}**)`).then(msg => msg.delete( {timeout: 5000} ))
                }
            }
    
        // Cooldowns: 
        const { cooldowns } = client;
    
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
    
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(msg => msg.delete( {timeout: 5000} ))
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
    
    try {
        command.execute(message, args, Discord, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!').then(msg => msg.delete( {timeout: 5000} ))
    }
    }
}
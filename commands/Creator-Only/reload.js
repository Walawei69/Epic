const fs = require('fs')
module.exports = {
    name:'reload',
    description:'Reloads a command',
    aliases:['rl'],
    usage:'< command >',
    creatorOnly: true,
    async execute(message, args, Discord, client){
    if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
    const commandName = args[0].toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return message.reply(`there is no command with name or alias \`${commandName}\`. Please try again.`);

    const commandFolders = fs.readdirSync('./commands');
    const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
	delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

    try {
        const newCommand = require(`../${folderName}/${command.name}.js`);
        newCommand.category = folderName

        
        client.commands.set(newCommand.name, newCommand);
        message.channel.send(`Command \`${command.name}\` was reloaded!`);
    } catch (error) {
        console.error(error);
        message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
    }
    }
}
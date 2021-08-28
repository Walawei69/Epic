module.exports = {
    name:'help',
    description:'Shows you my commands list!',
    aliases:[],
    usage:'[ command ]',
    async execute(message, args, Discord, client){
        const { commands, config } = client;
        message.react('✅')
        
        if (!args.length) {
            let commList = new Discord.MessageEmbed()
            .setTitle('My Epic Commands!')
            .setDescription(`If you are facing any problems, feel free to DM <@575252669443211264>!\nMy prefix is \`${config.prefix}\``)
            .addFields(
                {name:'General Commands:-', value: "`help` - This!\n`membercount` - Display the server\'s membercount"},
                {name:'Moderation Commands:-', value: "`ban` - Yeets a member out of existence\n`kick` - Kicks a member\n`mute` - Mutes an annoying member\n`purge` - Purges the provided amount of messages\n`warn` - Warns a disobedient member\n`unwarn` - Removes a member's warning\n`warnings` - Lists a member's warnings"}
            )
            .setColor('RANDOM')
            .setThumbnail(client.user.displayAvatarURL())
            message.channel.send(commList)
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if(!command) return message.reply(`there is no command with name or alias \`${name}\`. Please try again.`).then(msg => msg.delete( {timeout: 5000} ))
            .then(msg => {
            msg.delete({ timeout: 5000});
            })

            let cmdAlias = command.aliases.join('` `');

            if(!cmdAlias){
                cmdAlias = '-'
            }

            let cmdInfo = new Discord.MessageEmbed()
            .setTitle(config.prefix+command.name)
            .addFields(
                {name:'Description:', value:command.description},
                {name:'Category:', value:`\`${command.category}\``},
                {name:'Aliases:', value:`\`${cmdAlias}\``},
                {name:'Syntax:', value:`\`${config.prefix}${command.name} ${command.usage}\``}
            )
            .setFooter('Tips: <> = Required, [] = Optional, | = Or')
            .setColor('RANDOM')
            message.channel.send(cmdInfo)
        }
    }
}
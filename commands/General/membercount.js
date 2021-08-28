module.exports = {
    name:'membercount',
    description:'Display the server\'s membercount',
    aliases:[],
    usage:'',
    async execute(message, args, Discord, client){
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + "'s Membercount", message.guild.iconURL())
        .setDescription(`All Members: **${message.guild.memberCount}**\n- Humans: **${message.guild.members.cache.filter(m => !m.user.bot).size}**\n- Bots: **${message.guild.members.cache.filter(m => m.user.bot).size}**`)
        .setColor('RANDOM')

        message.channel.send(embed)
    }
}
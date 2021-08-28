const fs = require('fs')
module.exports = {
    name:'warnings',
    description:'Lists a member\'s warnings',
    aliases:[],
    usage:'< member\'s @ | Id >',
    async execute(message, args, Discord, client){
        const warnLog = JSON.parse(fs.readFileSync(process.cwd() + "/logs/warnlog.json", "utf8"))
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member

        let guildFilter = warnLog.filter(function(player) {
            return player.guildId == message.guild.id;
        })
        
        let warnCount = guildFilter.filter(function(player) {
            return player.offenderId == member.id;
        })

        let user = member.user
        if(!warnCount.length) {
            let warnings = new Discord.MessageEmbed()
        .setAuthor(`${user.tag}'s Warnings [0]`, user.displayAvatarURL())
        .setFooter(`ID: ${user.id} | Requested by ${message.author.tag}`)
        .setColor(member.roles.highest.hexColor)
            .setDescription(`This user has no warning.`)
            message.channel.send(warnings)
        } else {
        
        let warnings = new Discord.MessageEmbed()
        .setAuthor(`${user.tag}'s Warnings [${warnCount.length}]`, user.displayAvatarURL())
        .setFooter(`ID: ${user.id} | Requested by ${message.author.tag}`)
        .setColor(member.roles.highest.hexColor)
        
        let count = 10
        if(warnCount.length < count) {
            count = warnCount.length
        }
        for (let i = 0; i < count; i++){
            let memberWarns = warnCount[i]
            warnings.addField(`Case ID: ${memberWarns.id} | Date: ${memberWarns.date}`,`Moderator : \`${memberWarns.moderator}\`\nReason: \`${memberWarns.reason}\``)
        }
        message.channel.send(warnings)
            }
    }
}
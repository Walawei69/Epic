module.exports = {
    name:'kick',
    description:'Kicks a member',
    aliases:[],
    usage:'< member\'s @ | Id >',
    permissions:'KICK_MEMBERS',
    cooldown: 10,
    async execute(message, args, Discord, client){
        if(!args.length) return message.channel.send('Please provide a member to kick!').then(msg => msg.delete( {timeout: 5000} ))
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        
        if(!member) return message.channel.send(`I don\'t know that person. Please provide a valid member!`).then(msg => msg.delete( {timeout: 5000} ))
        if(member.user.id === message.author.id) return message.channel.send(`You can't kick yourself!`).then(msg => msg.delete( {timeout: 5000} ))
        if(member.user.id === client.user.id) return message.channel.send(`Don't kick me please :(`).then(msg => msg.delete( {timeout: 5000} ))
        if(!member.kickable) return message.channel.send(`I can't kick that user!`).then(msg => msg.delete( {timeout: 5000} ))

        
        let reason;
        if(!args[1]) {reason = 'No reason provided'}
        else { reason = args.slice(1).join(' ').replace(/`/g,"") }

        await member.send(`You just got kicked from **${message.guild.id}**. Reason: \`${reason}\``).catch(() => console.log(`Failed to kick message to ${member.user.tag}`))
        member.kick(`Kicked by ${message.author.tag}, reason: ${reason}`)
        .then(() => {
            return message.channel.send(`**${member.user.tag}** (${member.user.id}) just got kicked from the server. \nReason: \`${reason}\``)
        }).catch(err => {
            if (err) return message.channel.send(`⚠️ An error occured when kicking the user!`)
        })
    }
}
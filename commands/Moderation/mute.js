module.exports = {
    name:'mute',
    description:'Mutes an annoying member',
    aliases:[],
    usage:'< member\'s @ | Id >',
    permissions:'KICK_MEMBERS',
    cooldown: 5,
    async execute(message, args, Discord, client){

        if(!args.length) return message.channel.send('Who are you trying to mute?').then(msg => msg.delete( {timeout: 5000} ))
        const member =  message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === "muted")

        if(!member) return message.channel.send(`I don\'t know that person. Please provide a valid member!`).then(msg => msg.delete( {timeout: 5000} ))
        if(member.user.id === message.author.id) return message.channel.send(`Why would you mute yourself?`).then(msg => msg.delete( {timeout: 5000} ))
        if(member.user.id === client.user.id) return message.channel.send('You know that I have feelings too, right? :(').then(msg => msg.delete( {timeout: 5000} ))
        if (member.hasPermission('ADMINISTRATOR')) return message.channel.send('You\'re not allowed to mute another admin!').then(msg => msg.delete( {timeout: 5000} ))
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send('You can\'t mute this person!').then(msg => msg.delete( {timeout: 5000} ))
        if (member.roles.cache.get(role.id)) return message.channel.send('User is already muted!').then(msg => msg.delete( {timeout: 5000} ))
        
        let reason = args.slice(1).join(' ').replace(/`/g,"")
        if (!reason) reason = "No Reason Provided"

        try {
            member.roles.add(role)
            message.channel.send(`**${member.user.tag}** has been successfully muted. \nReason for mute: \`${reason}\``)
            member.send(`🤐 You just got muted in **${message.guild.id}**. Reason: \`${reason}\``).catch(() => console.log(`Failed to send mute message to ${member.user.tag}`))
        } catch(e) {
            message.channel.send('⚠️ An error occured when muting.').then(msg => msg.delete( {timeout: 5000} ))
            console.log(e)
        }
    }
}
module.exports = {
    name:'ban',
    description:'Yeets a member out of existence\n**Note:**  If you want to ban someone that\'s not on the server, please use ID to avoid errors.',
    aliases:[],
    usage:'< member\'s @ | Id > [reason]',
    permissions:'BAN_MEMBERS',
    cooldown: 10,
    async execute(message, args, Discord, client){
        if(!args.length) return message.channel.send('Please provide a user\'s mention/ID that you want to ban!').then(msg => msg.delete( {timeout: 5000} ))
        if(args[0] === client.user.id) return message.channel.send(`Don't ban me please :(`).then(msg => msg.delete( {timeout: 5000} ))
        if(args[0] === message.author.id) return message.channel.send(`You can't ban yourself!`).then(msg => msg.delete( {timeout: 5000} ))

        let reason;
        if(!args[1]) {reason = 'No reason provided'}
        else { reason = args.slice(1).join(' ').replace(/`/g,"") }

        if(!isNaN(args[0]) && !message.guild.members.cache.get(args[0])) {

            try {
                let res = await message.guild.members.ban(args[0], {reason:`Banned by ${message.author.tag}, Reason: ${reason}`})
                return message.channel.send(`**${res.tag}** (${res.id}) was banned from the server. Reason: \`${reason}\``)
            } catch(e) {
                console.error(e)
                return message.channel.send('⚠️ An error occured when banning the user!')
            }

        } else {
            const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
            try {
                await member.send(`You just got banned from **${message.guild.name}**. Reason: \`${reason}\``).catch(() => console.log(`Failed to send ban message to ${member.user.tag}`))
                let res = await message.guild.members.ban(member.id, {reason:`Banned by ${message.author.tag}, Reason: ${reason}`})
                return message.channel.send(`**${res.tag}** (${res.id}) was banned from the server. Reason: \`${reason}\``)
            } catch(e) {
                console.error(e)
                return message.channel.send(`⚠️ An error occured when banning the user!`)
            }
        }
    }
}
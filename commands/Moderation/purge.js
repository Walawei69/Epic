module.exports = {
    name:'purge',
    description:'Purges the provided amount of messages',
    aliases:['prune', 'clear'],
    usage:'< amount >',
    permissions:'MANAGE_MESSAGES',
    cooldown: 3,
    async execute(message, args, Discord, client){
        if(!args.length) return message.channel.send('Please provide the amount.').then(msg => msg.delete( {timeout: 5000} ))

        if(isNaN(args[0])) return message.channel.send('The amount must be a number.').then(msg => msg.delete( {timeout: 5000} ))
        if(args[0] < 1) return message.channel.send("You have to purge at least 1 message!").then(msg => msg.delete( {timeout: 5000} ))
        if(args[0] > 99) return message.channel.send("You can't purge more than 99 messages!").then(msg => msg.delete( {timeout: 5000} ))

        let num = parseInt(args[0])
        message.delete()
        await message.channel.messages.fetch({ limit: num })
        .then(async messages => {
            try {
                let count = 0 
                const purgemsg = await message.channel.send(`<a:partyblobcat:856507769808093215> Purging ${num} messages...`)
                const countmsg = await message.channel.send(`\`[ Progress: 0/${num} ]\``)
                await messages.forEach(m => {
                m.delete().catch(() => {})
                count++
                countmsg.edit(`\`[ Progress: ${count}/${num} ]\``)
            })
            countmsg.delete()
            purgemsg.edit(`✅ ${count-1 > 0 ? `${count} messages was succesfully` : "No message was"} purged.`).then(msg => msg.delete( {timeout: 5000} ))
            } catch(e) {
                message.channel.send('⚠️ An error occured when purging.').then(msg => msg.delete( {timeout: 5000} ))
                console.log(e)
            }
        })
    }
}
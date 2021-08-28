module.exports = {
    name:'verify',
    description:'Verifies yourself and gives you the verified role + perms!',
    aliases:[],
    usage:'',
    async execute(message, args, Discord, client){
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes('verified'))
        if(message.member.roles.cache.get(role.id)) return message.channel.send('You are already verified!')
        message.delete().catch(() => {})

        try {
            await message.member.roles.add(role)
            message.author.send(`Congratulations, <@${message.author.id}>. You are now a verified member in **${message.guild.name}**. Enjoy your stay!`).catch(() => {})
        } catch(e) {
            console.error(e)
            return message.channel.send('An error occured when verifying! Please try again later.')
        }
    }
}
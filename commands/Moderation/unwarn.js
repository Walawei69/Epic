const fs = require('fs')
module.exports = {
    name:'unwarn',
    description:'Removes a member\'s warnings',
    aliases:[],
    usage:'< Case ID >',
    permissions:'KICK_MEMBERS',
    cooldown: 5,
    async execute(message, args, Discord, client){
        const warnLog = JSON.parse(fs.readFileSync(process.cwd() + "/logs/warnlog.json", "utf8"))
        if(!args[0]) return message.channel.send('Please provide the Case ID.').then(msg => msg.delete( {timeout: 5000} ))

        let warn = warnLog.filter(function(player) {
            return player.id == args[0];
        })
        if(!warn.length) return message.channel.send(`Warn with Case ID \`${args[0]}\` does not exist. Please provide a valid one.`).then(msg => msg.delete( {timeout: 5000} ))

        let newLog = warnLog.filter(function(player) {
            return player.id != args[0];
        })

        fs.writeFile(process.cwd() + "/logs/warnlog.json", JSON.stringify(newLog, null, 2), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Warnlog is updated. (A warn was removed)')
                message.channel.send(`**${warn[0].offenderTag}**'s warn with ID \`${args[0]}\` has been removed.`)
            }
        })
    }
}
module.exports = async (message, client) => {
    if(message.author.bot || !message.author) return
    const ms = require('ms')
    let msg = message.content.toLowerCase()

    const BannedWords = ["fuck", "nigg", "shit", "bitch", "dick", "piss", "asshole", "bastard", "cunt", "bollocks", "bugger", "wanker", "tits", "titty", "🖕", "porn"]
    const inviteLinks = ["discord.gg", "dsc.gg/"]

    if (BannedWords.some(word => msg.replace(/ /g, "").replace(/-/g, "").replace(/1/g, "i").includes(word))) {
        message.delete()
          .catch(e => console.error("Couldn't delete message.")); 
        message.reply(`that word is not allowed in here!`)
          .then(msg => msg.delete({ timeout: 5000}))
        }
        
    if (inviteLinks.some(word => msg.includes(word)) && !message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")){
        message.delete()
          .catch(e => console.error("Couldn't delete message.")); 
        message.reply(`invite links are not allowed in here!`)
          .then(msg => msg.delete({ timeout: 5000}))
    }
}
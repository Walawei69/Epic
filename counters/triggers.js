module.exports = async (message, client) => {
    if(message.author.bot || !message.author) return
    const ms = require('ms')
    let msg = message.content.toLowerCase()

    if (msg === "ping me") return message.channel.send(`<@${message.author.id}>`)
}
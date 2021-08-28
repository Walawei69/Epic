const fs = require('fs')
module.exports = {
    name:'setprefix',
    description:'Sets a new prefix for me',
    aliases:['prefix'],
    usage:'< prefix >',
    cooldown: 30,
    creatorOnly: true,
    async execute(message, args, Discord, client){
        if(!args.length) return message.reply('please provide the new prefix.')
        if(args[0].length > 5) return message.channel.send('Prefix length can\'t be longer than 5 characters!')
        let config = JSON.parse(fs.readFileSync(process.cwd() + "/config.json", "utf8"))
        let newPref = args[0].toLowerCase().replace(/`/g,"")

        config.prefix = newPref
        fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
            if (err) {
                console.log(err)
                message.channel.send(`An error occured when changing my prefix!`)
            } else {
                client.config.prefix = newPref
                console.log(`Prefix is changed to ${newPref}`)
                message.channel.send(`My prefix is changed to \`${newPref}\`.`)
                client.user.setActivity(`${config.prefix}help`, { type: 'LISTENING' })
            }
        })

    }
}
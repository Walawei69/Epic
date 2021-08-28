const fs = require('fs')
module.exports = {
    name:'warn',
    description:'Warns a disobedient member',
    aliases:[],
    usage:'< member\'s @ | Id >',
    permissions:'KICK_MEMBERS',
    cooldown: 3,
    async execute(message, args, Discord, client){
        const warnLog = JSON.parse(fs.readFileSync(process.cwd() + "/logs/warnlog.json", "utf8"))

        if(!args.length) return message.channel.send('Who are you trying to warn?').then(msg => msg.delete( {timeout: 5000} ))
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()

        if(!member) return message.channel.send(`I don\'t know that person. Please provide a valid member!`).then(msg => msg.delete( {timeout: 5000} ))
        if(member.user.id === message.author.id) return message.channel.send(`You can't warn yourself!`).then(msg => msg.delete( {timeout: 5000} ))

        let user = member.user
        let reason = args.slice(1).join(' ').replace(/`/g,"")
        if (!reason) return message.channel.send('Please provide your reason for warning that member.').then(msg => msg.delete( {timeout: 5000} ))

        try {
        // Date:-
        var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = dd + '/' + mm + '/' + yyyy;

        // Id Generator:-
        function makeid(length) {
   			var result           = '';
   			var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   			var charactersLength = characters.length;
   			for ( var i = 0; i < length; i++ ) {
      			result += characters.charAt(Math.floor(Math.random() * charactersLength));
   			}
   			return result;
		}
        let randomID = makeid(10)

        // Data format:-
        let data = {
            guildId : message.guild.id,
            offenderTag: user.tag,
            offenderId: user.id,
            moderator : message.author.tag,
            reason : reason,
            date : today,
            id : randomID
        }

        warnLog.unshift(data)
        fs.writeFile(process.cwd() + "/logs/warnlog.json", JSON.stringify(warnLog, null, 2), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(
                    '\nWarnlog is updated. (A warn was created)\n' +
                    `Member Tag: ${user.tag}\n` +
                    `Member ID: ${user.id}\n` +
                    `Reason: ${reason}\n` +
                    `Moderator: ${message.author.tag}\n`
                    )
                message.channel.send(`**${user.tag}** (${user.id}) just got a warning by ${message.author.tag}. \nReason: \`${reason}\``)
        
                user.send(`:angry: You just got a warning in **${message.guild.name}**. Reason: \`${reason}\``)
                .catch(err => {
                    console.log(`Failed to send warn message to ${member.user.tag}`)
                })
            }
        })
        
    } catch{
        message.channel.send('An error occured.')
    }

    }
}
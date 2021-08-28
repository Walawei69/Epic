const SourceBin = require('sourcebin-wrapper');
const fs = require('fs')
const fetch = require('node-fetch')
module.exports = {
    name:'eval',
    description:'Evaluates the given script',
    aliases:[],
    usage:'< script >',
    creatorOnly: true,
    async execute(message, args, Discord, client){
        if(!args.length) return message.channel.send('Please provide the script to evaluate.')

        if(args.join(' ').includes("client.token")){
            if (!client.config.owners.includes(message.author.id)) return message.channel.send("I'm not gonna give you my token, noob!")
            message.author.send(`SHH! Here is my token!\n\`\`\`\n${client.token}\`\`\``)
            return message.channel.send(`Check out your DMs!`)
        }
        try {
        let evaled = eval(args.join(' '))
        if (evaled instanceof Promise) {
            evaled = await evaled;
        }
        function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }

        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        if(evaled.length < 1994) { message.channel.send(clean(evaled), {code:"xl"}) }
        else {
        SourceBin.create([
            new SourceBin.BinFile({
                name: 'Evaled Content',
                content: evaled,
                languageId: 'js'
            })
        ], {
            title: 'Content',
            description: 'This is awesome'
        })
            .then((result) => {
                const url = result.url;
             message.channel.send(`The output is too long. I converted it to SourceBin format: ${url}`) 
            })}
        } catch(e) {
            console.log(e)
            message.channel.send('An error occured:\n```\n'+e.message+'\n```')
        }

    }
}